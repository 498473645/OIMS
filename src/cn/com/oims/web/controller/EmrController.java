package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Suifang;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IDoctorsWorkstationService;
import cn.com.oims.service.IEMRService;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.pojo.OutpMr;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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
@RequestMapping({"_emr"})
public class EmrController {
  @Autowired
  private IDoctorsWorkstationService doctorsWorkstationService;
  
  @Autowired
  private IJiuzhenService jiuzhenService;
  
  @Autowired
  private IEMRService emrService;
  
  @Autowired
  private IHuanZheXinXiService huanZheXinXiService;
  
  @Autowired
  private IYuanGongService yuangongservice;
  
  @Autowired
  private HisWebService hisWebService;
  
  @RequestMapping(value = {"synchDrug.htm"}, method = {RequestMethod.GET})
  public void synchDrug(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("手动同步药品！");
    try {
      this.emrService.synchDrug(request);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"removeDiagnosis.htm"}, method = {RequestMethod.POST})
  public void deleteDiagnosis(HttpServletRequest request, HttpServletResponse response) {
    String diagnosis = request.getParameter("diagnosis");
    MyResult result = new MyResult();
    result.setDoing("保存诊断信息！");
    try {
      this.doctorsWorkstationService.deleteDiagnosis(diagnosis);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findSuifang.htm"}, method = {RequestMethod.GET})
  public void findSuifang(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取随访记录！");
    try {
      Suifang suifang = this.emrService.getSuifang(jiuzhenId);
      result.setObj(suifang);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveSuifang.htm"}, method = {RequestMethod.POST})
  public void saveSuifang(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存诊断信息！");
    try {
      HttpSession session = request.getSession();
      String gonghao = session.getAttribute("gonghao").toString();
      YuanGong yg = this.yuangongservice.obtainYuanGongByGonghao(session.getAttribute("gonghao").toString());
      Suifang suifang = new Suifang();
      suifang.setJiuzhenId(jiuzhenId);
      suifang.setGonghao(gonghao);
      suifang.setInsertDate(new Date());
      String ms = request.getParameter("day");
      String yyrq = request.getParameter("yyrq");
      if (ms != null) {
        Date date;
        if (ms.equals("0")) {
          try {
            if (!"".equals(yyrq.trim())) {
              date = (new SimpleDateFormat("yyyy-MM-dd")).parse(yyrq);
            } else {
              date = null;
            } 
          } catch (ParseException pe) {
            throw new RuntimeException("日期格式不对！");
          } 
        } else {
          Calendar cal = Calendar.getInstance();
          Integer m = Integer.valueOf(Integer.parseInt(ms));
          cal.add(5, m.intValue());
          date = cal.getTime();
        } 
        suifang.setYyrq(date);
      } 
      suifang.setZhuyi(request.getParameter("zysx"));
      this.emrService.saveOrUpdateSuifang(suifang);
      Jiuzhen jz = this.jiuzhenService.getJiuzhenById(jiuzhenId);
      String zy = suifang.getZhuyi();
      if (jz.getHaoma() != null && !jz.getHaoma().startsWith("OIMS") && zy != null && !zy.trim().isEmpty()) {
        OutpMr om = this.hisWebService.findOUTPMR(jz.getCaozuoTime(), Integer.valueOf(Integer.parseInt(jz.getHaoma())));
        if (om != null) {
          om.setAdvice(zy);
          om.setLast_doctor(yg.getXingming());
          this.hisWebService.updateOUTPMR(om);
        } else {
          om = new OutpMr();
          HuanZheXinXi hzxx = this.huanZheXinXiService.findHuanZheById(jz.getHuanzheId());
          om.setPatient_id(hzxx.getBinglihao());
          om.setVisit_date(jz.getCaozuoTime());
          om.setVisit_no(Integer.valueOf(Integer.parseInt(jz.getHaoma())));
          om.setAdvice(zy);
          om.setDoctor(yg.getXingming());
          this.hisWebService.addOUTPMR(om);
        } 
      } 
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findEYEJianchashi.htm"}, method = {RequestMethod.GET})
  public void findEYEJianchashi(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取眼科检查室！");
    try {
      List list = this.emrService.findEYEJianchashi();
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
