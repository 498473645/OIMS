package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.CertificateForm;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.CertificateSearchForm;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.pojo.Patient;
import cn.com.oims.webservice.pojo.his.Certificate;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"certificate"})
public class CertificateController {
  @Autowired
  private HisWebService hisWebService;
  
  @Autowired
  private IHuanZheXinXiService huanZheXinXiService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private IJiuzhenService jiuzhenService;
  
  @RequestMapping(value = {"/findDiagnosisCertificate.htm"}, method = {RequestMethod.POST})
  public void findDiagnosiCertificate(HttpServletResponse response, HttpServletRequest request, CertificateSearchForm form) {
    MyResult mr = new MyResult();
    String startDate = null;
    String endDate = null;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    List list = null;
    if (form.getStartDate() != null)
      startDate = sdf.format(MultiUtils.getStartTimeOfDay(form.getStartDate())); 
    if (form.getEndDate() != null)
      endDate = sdf.format(MultiUtils.getEndTimeOfDay(form.getEndDate())); 
    Patient p = this.hisWebService.getPatientById(form.getPatientId());
    if (p == null) {
      mr.setState(2);
    } else {
      list = this.hisWebService.findDiagnosiCertificate(startDate, endDate, form.getPatientId());
      mr.setObj(list);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/saveOrUpdateCertificate.htm"}, method = {RequestMethod.POST})
  public void saveOrUpateCertificate(HttpServletResponse response, HttpServletRequest request, CertificateForm form) {
    MyResult mr = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String doctor = this.yuanGongService.obtainYuanGongByGonghao(gonghao).getXingming();
    Certificate c = new Certificate();
    try {
      BeanUtils.copyProperties(form, c);
      c.setDoctor(doctor);
      this.hisWebService.saveOrUpdateCertificate(c);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findLastJiuzhen.htm"}, method = {RequestMethod.POST})
  public void findLastJiuzhen(HttpServletResponse response, HttpServletRequest request, String id) {
    MyResult mr = new MyResult();
    try {
      Jiuzhen jz = this.jiuzhenService.findLastJiuzhen(id);
      mr.setObj(jz);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/delCertificates.htm"}, method = {RequestMethod.POST})
  public void delCertificates(HttpServletResponse response, HttpServletRequest request, String patientId, String recNo) {
    MyResult mr = new MyResult();
    try {
      HttpSession session = request.getSession();
      Certificate c = new Certificate();
      c.setPatientId(patientId);
      c.setRecNo(recNo);
      String gonghao = (session.getAttribute("gonghao") != null) ? session
        .getAttribute("gonghao").toString() : null;
      String doctor = this.yuanGongService.obtainYuanGongByGonghao(gonghao).getXingming();
      c.setDoctor(doctor);
      this.hisWebService.delCertificates(c);
      mr.setObj(Boolean.valueOf(true));
    } catch (Exception e) {
      e.printStackTrace();
      mr.setObj(Boolean.valueOf(false));
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
}
