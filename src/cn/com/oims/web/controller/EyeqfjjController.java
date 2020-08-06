package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Eyeqfjj;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyeqfjjService;
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
@RequestMapping({"Eyeqfjj"})
public class EyeqfjjController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IEyeqfjjService eyeqfjjservice;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private ISheBeiService sheBeiService;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyeqfjj.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyeqfjj(HttpServletResponse response, HttpServletRequest request, Eyeqfjj eyeqfjj, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "前房角镜报告保存或者修改";
    try {
      Eyeqfjj eyeqfjjSelect = new Eyeqfjj();
      eyeqfjjSelect.setJcdId(eyeqfjj.getJcdId());
      eyeqfjjSelect = this.eyeqfjjservice
        .selectEyeqfjjByEyeqfjj(eyeqfjjSelect);
      if (eyeqfjjSelect == null) {
        Long bgId = (Long)this.eyeqfjjservice.saveEyeqfjj(eyeqfjj);
        String jcgonghao = eyeqfjj.getDoctor();
        YuanGong yuanGong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
        Jcd jcd = this.jcdservice.getJcdById(eyeqfjj.getJcdId());
        jcd.setJcys(jcgonghao);
        jcd.setJcksTime(new Date());
        jcd.setJcjsTime(new Date());
        jcd.setJcksId(yuanGong.getBumenId());
        jcd.setBiaoshi(Integer.valueOf(56));
        jcd.setState(Integer.valueOf(1));
        this.jcdservice.updateJcd(jcd);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyeqfjj.getJcdId());
        baoGaoRelation.setClassName(Eyeqfjj.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyeqfjj.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeqfjj.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyeqfjj.setFlowNo(eyeqfjjSelect.getFlowNo());
        this.eyeqfjjservice.updateEyeqfjj(eyeqfjj);
        updateEyeqfjjRelation(eyeqfjj, baogaoState);
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
    this.oimslogservice.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public void updateEyeqfjjRelation(Eyeqfjj eyeqfjj, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyeqfjj.getFlowNo());
    baoGaoRelation.setClassName(Eyeqfjj.class.getSimpleName());
    baoGaoRelation.setJcdId(eyeqfjj.getJcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyeqfjj.getCli_date();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeqfjj.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
  
  @RequestMapping(value = {"/selectEyeqfjjByEyeqfjj.htm"}, method = {RequestMethod.POST})
  public void selectEyeqfjjByEyeqfjj(HttpServletResponse response, HttpServletRequest request, Eyeqfjj eyeqfjj) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据前房角镜报告查询符合条件的前房角镜报告对象";
    try {
      eyeqfjj = this.eyeqfjjservice.selectEyeqfjjByEyeqfjj(eyeqfjj);
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
    result.setObj(eyeqfjj);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
