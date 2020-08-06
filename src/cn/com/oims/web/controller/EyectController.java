package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Eyect;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyectService;
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
@RequestMapping({"Eyect"})
public class EyectController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IEyectService eyectservice;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyect.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyect(HttpServletResponse response, HttpServletRequest request, Eyect eyect, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "A超报告保存或者修改";
    try {
      Eyect eyectSelect = new Eyect();
      eyectSelect.setJcdId(eyect.getJcdId());
      eyectSelect = this.eyectservice
        .selectEyectByEyect(eyectSelect);
      Jcd jcd = this.jcdservice.getJcdById(eyect.getJcdId());
      if (eyectSelect == null) {
        Long bgId = (Long)this.eyectservice.saveEyect(eyect);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyect.getJcdId());
        baoGaoRelation.setClassName(Eyect.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyect.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyect.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyect.setFlowNo(eyectSelect.getFlowNo());
        this.eyectservice.updateEyect(eyect);
        updateEyectRelation(eyect, baogaoState);
      } 
      String jcgonghao = eyect.getDoctor();
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
  
  public void updateEyectRelation(Eyect eyect, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyect.getFlowNo());
    baoGaoRelation.setClassName(Eyect.class.getSimpleName());
    baoGaoRelation.setJcdId(eyect.getJcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyect.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyect.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
  
  @RequestMapping(value = {"/selectEyectByEyect.htm"}, method = {RequestMethod.POST})
  public void selectEyectByEyect(HttpServletResponse response, HttpServletRequest request, Eyect eyect) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据A超报告对象查询符合条件的A超报告对象";
    try {
      eyect = this.eyectservice.selectEyectByEyect(eyect);
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
    result.setObj(eyect);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
