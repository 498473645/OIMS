package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.EyeFERG;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyeFERGService;
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
@RequestMapping({"EyeFERG"})
public class EyeFERGController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IEyeFERGService eyefergService;
  
  @Autowired
  private IJcdService jcdService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyeFERG.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyeFERG(HttpServletRequest request, HttpServletResponse response, EyeFERG eyeFERG, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "FERG报告保存或者修改";
    try {
      EyeFERG eyeFERGSelect = new EyeFERG();
      eyeFERGSelect.setjcdId(eyeFERG.getjcdId());
      eyeFERGSelect = this.eyefergService
        .selectEyeFERGByEyeFERG(eyeFERGSelect);
      Jcd jcd = this.jcdService.getJcdById(eyeFERG.getjcdId());
      if (eyeFERGSelect == null) {
        Long bgId = (Long)this.eyefergService.saveEyeFERG(eyeFERG);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyeFERG.getjcdId());
        baoGaoRelation.setClassName(EyeFERG.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyeFERG.getcliDate();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeFERG.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyeFERG.setflowNo(eyeFERGSelect.getflowNo());
        this.eyefergService.updateEyeFERG(eyeFERG);
        updateEyeFERGRelation(eyeFERG, baogaoState);
      } 
      String jcgonghao = eyeFERG.getDoctor();
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
      this.jcdService.updateJcd(jcd);
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
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public void updateEyeFERGRelation(EyeFERG eyeFERG, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyeFERG.getflowNo());
    baoGaoRelation.setClassName(EyeFERG.class.getSimpleName());
    baoGaoRelation.setJcdId(eyeFERG.getjcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyeFERG.getcliDate();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeFERG.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
  
  @RequestMapping(value = {"/selectEyeFERGByEyeFERG.htm"}, method = {RequestMethod.POST})
  public void selectEyeFERGByEyeFERG(HttpServletResponse response, HttpServletRequest request, EyeFERG eyeFERG) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据FERG对象查询符合条件的FERG报告对象";
    try {
      eyeFERG = this.eyefergService.selectEyeFERGByEyeFERG(eyeFERG);
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
    result.setObj(eyeFERG);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
