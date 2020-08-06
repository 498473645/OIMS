package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.EyeRetcam;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyeRetcamService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"EyeRetcam"})
public class EyeRetcamController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IEyeRetcamService eyeRetcamservice;
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyeRetcam.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyeRetcam(HttpServletRequest request, HttpServletResponse response, EyeRetcam eyeRetcam, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "前方深度报告保存或者修改";
    try {
      EyeRetcam eyeRetcamSelect = new EyeRetcam();
      eyeRetcamSelect.setJcdId(eyeRetcam.getJcdId());
      eyeRetcamSelect = this.eyeRetcamservice
        .selectEyeRetcamByEyeRetcam(eyeRetcamSelect);
      Jcd jcd = this.jcdservice.getJcdById(eyeRetcam.getJcdId());
      if (eyeRetcamSelect == null) {
        Long bgId = (Long)this.eyeRetcamservice.saveEyeRetcam(eyeRetcam);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyeRetcam.getJcdId());
        baoGaoRelation.setClassName(EyeRetcam.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyeRetcam.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeRetcam.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyeRetcam.setFlowNo(eyeRetcamSelect.getFlowNo());
        this.eyeRetcamservice.updateEyeRetcam(eyeRetcam);
        updateEyeRetcamRelation(eyeRetcam, baogaoState);
      } 
      String jcgonghao = eyeRetcam.getDoctor();
      jcd.setJcys(jcgonghao);
      jcd.setState(Integer.valueOf(1));
      Integer biaoshiold = jcd.getBiaoshi();
      if (biaoshiold.intValue() == 50) {
        jcd.setBiaoshi(Integer.valueOf(51));
        if (jcd.getJcksTime() == null)
          jcd.setJcksTime(new Date()); 
        if (jcd.getJcjsTime() == null)
          jcd.setJcjsTime(new Date()); 
      } 
      this.jcdservice.updateJcd(jcd);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimslogservice.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/selectEyeRetcamByEyeRetcam.htm"}, method = {RequestMethod.POST})
  public void selectEyeRetcamByEyeRetcam(HttpServletResponse response, HttpServletRequest request, EyeRetcam eyeRetcam) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据前方深度对象查询符合条件的前方深度报告对象";
    try {
      eyeRetcam = this.eyeRetcamservice.selectEyeRetcamByEyeRetcam(eyeRetcam);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(eyeRetcam);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public void updateEyeRetcamRelation(EyeRetcam eyeRetcam, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyeRetcam.getFlowNo());
    baoGaoRelation.setClassName(EyeRetcam.class.getSimpleName());
    baoGaoRelation.setJcdId(eyeRetcam.getJcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyeRetcam.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeRetcam.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
}
