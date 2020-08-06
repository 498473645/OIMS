package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Eyejmspjs;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyejmspjsService;
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
@RequestMapping({"Eyejmspjs"})
public class EyejmspjsController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IEyejmspjsService eyejmspjsservice;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyejmspjs.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyejmspjs(HttpServletResponse response, HttpServletRequest request, Eyejmspjs eyejmspjs, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "角膜内皮计数报告保存或者修改";
    try {
      Eyejmspjs eyejmspjsSelect = new Eyejmspjs();
      eyejmspjsSelect.setJcdId(eyejmspjs.getJcdId());
      eyejmspjsSelect = this.eyejmspjsservice
        .selectEyejmspjsByEyejmspjs(eyejmspjsSelect);
      Jcd jcd = this.jcdservice.getJcdById(eyejmspjs.getJcdId());
      if (eyejmspjsSelect == null) {
        Long bgId = (Long)this.eyejmspjsservice.saveEyejmspjs(eyejmspjs);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyejmspjs.getJcdId());
        baoGaoRelation.setClassName(Eyejmspjs.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyejmspjs.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyejmspjs.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyejmspjs.setFlowNo(eyejmspjsSelect.getFlowNo());
        this.eyejmspjsservice.updateEyejmspjs(eyejmspjs);
        updateEyejmspjsRelation(eyejmspjs, baogaoState);
      } 
      String jcgonghao = eyejmspjs.getDoctor();
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
  
  public void updateEyejmspjsRelation(Eyejmspjs eyejmspjs, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyejmspjs.getFlowNo());
    baoGaoRelation.setClassName(Eyejmspjs.class.getSimpleName());
    baoGaoRelation.setJcdId(eyejmspjs.getJcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyejmspjs.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyejmspjs.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
  
  @RequestMapping(value = {"/selectEyejmspjsByEyejmspjs.htm"}, method = {RequestMethod.POST})
  public void selectEyejmspjsByEyejmspjs(HttpServletResponse response, HttpServletRequest request, Eyejmspjs eyejmspjs) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据角膜内皮计数对象查询符合条件的角膜内皮计数对象";
    try {
      eyejmspjs = this.eyejmspjsservice.selectEyejmspjsByEyejmspjs(eyejmspjs);
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
    result.setObj(eyejmspjs);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
