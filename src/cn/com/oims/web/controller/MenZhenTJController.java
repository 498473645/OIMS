package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.User;
import cn.com.oims.service.IMenZhenTJService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IUserService;
import cn.com.oims.web.form.UserLoginForm;
import com.codesnet.common.IPUtils;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MenZhenTJController {
  private IUserService userService;
  
  private IOimsLogService oimsLogService;
  
  private IMenZhenTJService MenZhenService;
  
  private JdbcTemplate jdbcTemplate;
  
  @Autowired
  public void setUserService(IUserService userService) {
    this.userService = userService;
  }
  
  @Autowired
  public void setOimsLogService(IOimsLogService oimsLogService) {
    this.oimsLogService = oimsLogService;
  }
  
  @Autowired
  public void setMenZhenService(IMenZhenTJService menZhenService) {
    this.MenZhenService = menZhenService;
  }
  
  @Autowired
  public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }
  
  @RequestMapping({"/tj_index.htm"})
  public ModelAndView manager(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("his用户登录");
    HttpSession session = request.getSession();
    String ip = IPUtils.getIpAddrByRequest(request);
    String doctor_id_str = (request.getParameter("doctor_id") != null) ? request.getParameter("doctor_id").toString() : null;
    String patient_id_str = (request.getParameter("patient_id") != null) ? request.getParameter("patient_id").toString() : null;
    String doctor_id = String.valueOf(Integer.parseInt(doctor_id_str));
    String patient_id = String.valueOf(Integer.parseInt(patient_id_str));
    String password = (request.getParameter("password") != null) ? request.getParameter("password").toString() : "123";
    String uuid = (request.getParameter("uuid") != null) ? request.getParameter("uuid").toString() : "";
    int loginType = 0;
    session.setAttribute("gonghao", doctor_id);
    UserLoginForm ulf = new UserLoginForm();
    ulf.setIp(ip);
    ulf.setInput(doctor_id);
    ulf.setPwd(password);
    ulf.setLoginType(loginType);
    User user = new User();
    try {
      user = this.userService.userLogin(ulf);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    if (user != null) {
      session.setAttribute("uid", user.getUid());
      session.setAttribute("gonghao", user.getGonghao());
      session.setAttribute("currentUser", user);
      session.setAttribute("his_patient_id", patient_id);
      session.setAttribute("his_flag", "10A");
      result.setState(1);
      result.setGonghao(user.getGonghao());
      result.setMessage("成功，登录用户" + user.getUid());
      this.oimsLogService.saveOimsLog(result, 1);
    } 
    List<Map<String, Object>> list = new ArrayList<>();
    String sql = "select * from menzhentxt a where a.uuid = ?";
    list = this.jdbcTemplate.queryForList(sql, new Object[] { uuid });
    if (list.size() > 0) {
      session.setAttribute("chufang", ((Map)list.get(0)).get("chufang"));
      session.setAttribute("zhenduan", ((Map)list.get(0)).get("zhenduan"));
    } 
    ModelAndView mav = new ModelAndView();
    mav.setViewName("manager/index");
    return mav;
  }
  
  @RequestMapping(value = {"/tj_getPatientInfo.htm"}, method = {RequestMethod.POST})
  public void getPatientInfo(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取患者详细信息");
    String patient_id = (request.getParameter("patient_id") != null) ? request.getParameter("patient_id").toString() : null;
    Map<String, Object> remap = new HashMap<>();
    remap = this.MenZhenService.getPatientInfo(patient_id);
    result.setState(1);
    result.setObj(remap);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSessionHisFlag.htm"}, method = {RequestMethod.POST})
  public void getSessionHisFlag(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取是否是his系统进入");
    String hisflag = (request.getSession().getAttribute("his_flag") != null) ? request.getSession().getAttribute("his_flag").toString() : "10X";
    result.setObj(hisflag);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSessionHisPatientId.htm"}, method = {RequestMethod.POST})
  public void getSessionHisPatientId(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取his系统患者id");
    String pid = (request.getSession().getAttribute("his_patient_id") != null) ? request.getSession().getAttribute("his_patient_id").toString() : "0";
    result.setObj(pid);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
