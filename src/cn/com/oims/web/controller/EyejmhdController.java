package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Eyejmhd;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyejmhdService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IYuanGongService;
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
@RequestMapping({"Eyejmhd"})
public class EyejmhdController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IEyejmhdService eyejmhdservice;
  
  @Autowired
  private IJcdService jcdService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private ISheBeiService sheBeiService;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyejmhd.htm"}, method = {RequestMethod.POST})
  private void saveOrUpdateEyejmhd(HttpServletRequest request, HttpServletResponse response, Eyejmhd eyejmhd, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "角膜厚度报告保存或者修改";
    try {
      Eyejmhd eyejmhdSelect = new Eyejmhd();
      eyejmhdSelect.setJcdId(eyejmhd.getJcdId());
      eyejmhdSelect = this.eyejmhdservice.selectEyejmhdByEyejmhd(eyejmhdSelect);
      if (eyejmhdSelect == null) {
        Long bgId = (Long)this.eyejmhdservice.saveEyejmhd(eyejmhd);
        String jcgonghao = eyejmhd.getDoctor();
        YuanGong yuanGong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
        Jcd jcd = this.jcdService.getJcdById(eyejmhd.getJcdId());
        jcd.setJcys(jcgonghao);
        jcd.setJcksTime(new Date());
        jcd.setJcjsTime(new Date());
        jcd.setJcksId(yuanGong.getBumenId());
        jcd.setBiaoshi(Integer.valueOf(56));
        jcd.setState(Integer.valueOf(1));
        this.jcdService.updateJcd(jcd);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyejmhd.getJcdId());
        baoGaoRelation.setClassName(Eyejmhd.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyejmhd.getCliDate();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyejmhd.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyejmhd.setFlowNo(eyejmhdSelect.getFlowNo());
        this.eyejmhdservice.updateEyejmhd(eyejmhd);
        updateEyejmhdRelation(eyejmhd, baogaoState);
      } 
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
  
  public void updateEyejmhdRelation(Eyejmhd eyejmhd, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyejmhd.getFlowNo());
    baoGaoRelation.setClassName(Eyejmhd.class.getSimpleName());
    baoGaoRelation.setJcdId(eyejmhd.getJcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyejmhd.getCliDate();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyejmhd.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
  
  @RequestMapping(value = {"/selectEyejmhdByEyejmhd.htm"}, method = {RequestMethod.POST})
  public void selectEyejmhdByEyejmhd(HttpServletResponse response, HttpServletRequest request, Eyejmhd eyejmhd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据角膜厚度报告对象查询符合条件的报告对象";
    try {
      eyejmhd = this.eyejmhdservice.selectEyejmhdByEyejmhd(eyejmhd);
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
    result.setObj(eyejmhd);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
