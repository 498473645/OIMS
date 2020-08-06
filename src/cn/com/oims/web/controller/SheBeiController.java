package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.UserOnline;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IUserOnlineService;
import cn.com.oims.service.IYuanGongService;
import com.codesnet.common.IPUtils;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"shebei"})
public class SheBeiController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private ISheBeiService shebeiService;
  
  @Autowired
  private IUserOnlineService userOnlineService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @RequestMapping(value = {"/getShebeiListForUser.htm"}, method = {RequestMethod.GET})
  public void getShebeiList(HttpServletRequest request, HttpServletResponse response) {
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request
      .getSession().getAttribute("gonghao").toString() : 
      null;
    List list = this.shebeiService.getShebeiListByManagerUser(gonghao);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/saveSheBei.htm"}, method = {RequestMethod.POST})
  public void saveSheBei(HttpServletResponse response, HttpServletRequest request, SheBei shebei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "设备信息添加";
    try {
      shebei.setQiyong(true);
      this.shebeiService.saveSheBei(shebei);
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
    result.setObj(null);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateSheBei.htm"}, method = {RequestMethod.POST})
  public void updateSheBei(HttpServletResponse response, HttpServletRequest request, SheBei shebei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "设备信息修改";
    try {
      this.shebeiService.updateSheBei(shebei);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(null);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteSheBeiById.htm"}, method = {RequestMethod.POST})
  public void deleteSheBeiById(HttpServletResponse response, HttpServletRequest request, SheBei shebei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "设备信息删除";
    try {
      this.shebeiService.deleteSheBeiById(shebei.getId());
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
    result.setObj(null);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateSheBeiBySheBei.htm"}, method = {RequestMethod.POST})
  public void updateSheBeiBySheBei(HttpServletResponse response, HttpServletRequest request, SheBei shebei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "设备信息修改";
    shebei.setManageUser(gonghao);
    try {
      this.shebeiService.updateSheBeiBySheBei(shebei);
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
    result.setObj(null);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllSheBeisByPageAndSheBei.htm"}, method = {RequestMethod.POST})
  public void findAllSheBeisByPageAndSheBei(HttpServletResponse response, HttpServletRequest request, Page page, SheBei shebei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    MyResult result = new MyResult();
    this.doing = "根据查询条件分页查询符合条件的设备信息（联合查询）";
    try {
      map = this.shebeiService
        .findAllSheBeisByPageAndSheBei(page, shebei);
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
    result.setObj(map);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findAllSheBeis.htm"}, method = {RequestMethod.POST})
  public void findAllSheBeis(HttpServletResponse response, HttpServletRequest request, SheBei shebei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<SheBei> shebeis = new ArrayList<>();
    this.doing = "查询所有设备实体信息";
    try {
      shebeis = this.shebeiService.findAllSheBeis();
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
    result.setObj(shebeis);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShebeiListForUserAndIp.htm"}, method = {RequestMethod.POST})
  public void getShebeiListForUserAndIp(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List list = null;
    this.doing = "判断该登陆用户设备配置是否正确";
    try {
      String ip = IPUtils.getIpAddrByRequest(request);
      list = this.shebeiService.getShebeiListByManagerUserAndIp(gonghao, 
          ip);
      if (list != null && list.size() > 0) {
        this.doState = 1;
        this.message = "操作成功 工号IP设备配置正确";
      } else {
        this.doState = 0;
        this.message = "操作成功 工号IP设备配置错误";
      } 
    } catch (Exception e) {
      list = new ArrayList();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(list);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShebeiForLoginUserAndIp.htm"}, method = {RequestMethod.GET})
  public void getShebeiForLoginUserAndIp(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request
      .getSession().getAttribute("gonghao").toString() : 
      null;
    String uid = (request.getSession().getAttribute("uid") != null) ? request
      .getSession().getAttribute("uid").toString() : 
      null;
    UserOnline userOnline = null;
    if (uid != null)
      userOnline = this.userOnlineService.findUserOnlineById(uid); 
    SheBei shebei = null;
    if (userOnline != null) {
      shebei = this.shebeiService.getShebeiByLoginUserAndIp(gonghao, 
          userOnline.getIp());
      if (shebei != null) {
        result.setState(1);
        result.setObj(shebei);
      } 
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getBgsByJcxmidAndBumenid.htm"}, method = {RequestMethod.POST})
  public void getBgsByJcxmidAndBumenid(HttpServletRequest request, HttpServletResponse response, String jcxmId) {
    MyResult result = new MyResult();
    result.setDoing("根据检查项目ID和登记员工所在科室获取所属办公室");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    int bumenid = 0;
    YuanGong yuangong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
    if (yuangong != null)
      bumenid = yuangong.getBumenId().intValue(); 
    String bgsid = this.shebeiService
      .getBgsIdByJcxmidAndBumenid(jcxmId, bumenid);
    if (!"".equals(bgsid)) {
      result.setObj(bgsid);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSheBeiUsersByShebei.htm"}, method = {RequestMethod.POST})
  public void getSheBeiUserByShebei(HttpServletRequest request, HttpServletResponse response, String shebei_users) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<YuanGong> yuangongs = new ArrayList<>();
    this.doing = "根据检查设备查找管理用户";
    try {
      if (shebei_users.indexOf(",") != -1) {
        String[] array = shebei_users.split(",");
        for (int i = 0; i < array.length; i++) {
          YuanGong yuangong = this.yuanGongService
            .obtainYuanGongByGonghao(array[i]);
          yuangongs.add(yuangong);
        } 
      } else {
        YuanGong yuangong = this.yuanGongService
          .obtainYuanGongByGonghao(shebei_users);
        yuangongs.add(yuangong);
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
    result.setObj(yuangongs);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSpecialLocation.htm"}, method = {RequestMethod.POST})
  public void getSpecialLocation(HttpServletRequest request, HttpServletResponse response, Integer jcxmId) {
    MyResult mr = new MyResult();
    try {
      BanGongShi location = this.shebeiService.getSpecialLocation(jcxmId);
      mr.setObj(location);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
}
