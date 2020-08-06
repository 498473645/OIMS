package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Eyegcsy;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyegcsyService;
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
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
@RequestMapping({"Eyegcsy"})
public class EyegcsyController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdService;
  
  @Autowired
  private IEyegcsyService eyegcsyService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyegcsy.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyegcsy(HttpServletRequest request, HttpServletResponse response, Eyegcsy eyegcsy, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "视野检查保存和修改";
    try {
      Eyegcsy eyegcsySelect = new Eyegcsy();
      eyegcsySelect.setJcdId(eyegcsy.getJcdId());
      eyegcsySelect = this.eyegcsyService
        .selectEyegcsyByEyegcsy(eyegcsySelect);
      Jcd jcd = this.jcdService.getJcdById(eyegcsy.getJcdId());
      if (eyegcsySelect == null) {
        Long bgId = (Long)this.eyegcsyService.saveEyegcsy(eyegcsy);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyegcsy.getJcdId());
        baoGaoRelation.setClassName(Eyegcsy.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyegcsy.getCliDate();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyegcsy.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyegcsy.setFlowNo(eyegcsySelect.getFlowNo());
        this.eyegcsyService.updateEyegcsy(eyegcsy);
        updateEyegcsyRelation(eyegcsy, baogaoState);
      } 
      String jcgonghao = eyegcsy.getDoctor();
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public void updateEyegcsyRelation(Eyegcsy eyegcsy, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyegcsy.getFlowNo());
    baoGaoRelation.setClassName(Eyegcsy.class.getSimpleName());
    baoGaoRelation.setJcdId(eyegcsy.getJcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyegcsy.getCliDate();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyegcsy.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
  
  @RequestMapping(value = {"/selectEyegcsyByEyegcsy"}, method = {RequestMethod.POST})
  public void selectEyegcsyByEyegcsy(HttpServletRequest request, HttpServletResponse reponse, Eyegcsy eyegcsy) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据视野检查对象查询符合条件的视野检查报告";
    try {
      eyegcsy = this.eyegcsyService.selectEyegcsyByEyegcsy(eyegcsy);
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
    result.setObj(eyegcsy);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, reponse);
  }
}
