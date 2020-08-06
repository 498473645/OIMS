package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.EyeMfERG;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IEyeMfERGService;
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
@RequestMapping({"EyeMfERG"})
public class EyeMfERGController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IEyeMfERGService eyeMfErgService;
  
  @Autowired
  private IJcdService jcdService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/saveOrUpdateEyeMfERG.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyeMfERG(HttpServletRequest request, HttpServletResponse response, EyeMfERG eyeMfErg, String baogaoState) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "MfErg报告保存或者修改";
    try {
      EyeMfERG eyeMfErgSelect = new EyeMfERG();
      eyeMfErgSelect.setjcdId(eyeMfErg.getjcdId());
      eyeMfErgSelect = this.eyeMfErgService
        .selectEyeMfErgByEyeMfErg(eyeMfErgSelect);
      Jcd jcd = this.jcdService.getJcdById(eyeMfErg.getjcdId());
      if (eyeMfErgSelect == null) {
        Long bgId = (Long)this.eyeMfErgService.saveEyeMfErg(eyeMfErg);
        BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
        baoGaoRelation.setBgId(bgId);
        baoGaoRelation.setJcdId(eyeMfErg.getjcdId());
        baoGaoRelation.setClassName(EyeMfERG.class.getSimpleName());
        baoGaoRelation.setState(1007);
        baoGaoRelation.setJcxmId(jcd.getJcxmIds());
        String jc_date = eyeMfErg.getcliDate();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeMfErg.getDoctor());
        this.baoGaoRelationService.saveBaoGaoRelation(baoGaoRelation);
      } else {
        eyeMfErg.setflowNo(eyeMfErgSelect.getflowNo());
        this.eyeMfErgService.updateEyeMfErg(eyeMfErg);
        updateEyeMfERGRelation(eyeMfErg, baogaoState);
      } 
      String jcgonghao = eyeMfErg.getDoctor();
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
  
  public void updateEyeMfERGRelation(EyeMfERG eyeMfERG, String baogaoState) {
    BaoGaoRelation baoGaoRelation = new BaoGaoRelation();
    baoGaoRelation.setBgId(eyeMfERG.getflowNo());
    baoGaoRelation.setClassName(EyeMfERG.class.getSimpleName());
    baoGaoRelation.setJcdId(eyeMfERG.getjcdId());
    List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
    baoGaoRelation = (list.size() > 0) ? list.get(0) : null;
    if (baoGaoRelation != null)
      try {
        String jc_date = eyeMfERG.getcliDate();
        Date date_ = (new SimpleDateFormat("yyyy-MM-dd")).parse(jc_date);
        baoGaoRelation.setInsertDate(date_);
        baoGaoRelation.setInsertUser(eyeMfERG.getDoctor());
        baoGaoRelation.setState((baogaoState != null) ? Integer.parseInt(baogaoState) : 1007);
        this.baoGaoRelationService.updateBaoGaoRelation(baoGaoRelation);
      } catch (ParseException e) {
        e.printStackTrace();
      }  
  }
  
  @RequestMapping(value = {"/selectEyeMfERGByEyeMfERG.htm"}, method = {RequestMethod.POST})
  public void selectEyeMfERGByEyeMfERG(HttpServletResponse response, HttpServletRequest request, EyeMfERG eyeMfErg) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据MfErg报告对象查询符合条件的MfErg报告对象";
    try {
      eyeMfErg = this.eyeMfErgService.selectEyeMfErgByEyeMfErg(eyeMfErg);
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
    result.setObj(eyeMfErg);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
