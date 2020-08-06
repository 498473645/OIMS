package cn.com.oims.web.controller;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.pojo.Manageitem;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.UserOnline;
import cn.com.oims.dao.pojo.Yhpz;
import cn.com.oims.service.IManageItemService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IUserOnlineService;
import cn.com.oims.service.IUserService;
import cn.com.oims.service.IYhpzService;
import cn.com.oims.web.form.UserForm;
import cn.com.oims.web.form.UserLoginForm;
import cn.com.oims.web.form.YuanGongForm;
import cn.com.oims.web.form.pwdResetForm;
import cn.com.oims.web.validation.UserFormValidation;
import com.codesnet.common.IPUtils;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping({"user"})
public class UserController extends BaseController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IUserService userService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IUserOnlineService userOnlineService;
  
  @Autowired
  private IManageItemService manageItemService;
  
  @Autowired
  private IYhpzService yhpzService;
  
  @RequestMapping(value = {"/userLogin.htm"}, method = {RequestMethod.POST})
  public void userLogin(UserLoginForm ulf, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("用户登录");
    if (UserFormValidation.userLoginFormValidation(ulf)) {
      String ip = IPUtils.getIpAddrByRequest(request);
      ulf.setIp(ip);
      try {
        User user = this.userService.userLogin(ulf);
        if (user != null) {
          HttpSession session = request.getSession();
          session.setAttribute("uid", user.getUid());
          session.setAttribute("gonghao", user.getGonghao());
          session.setAttribute("currentUser", user);
          result.setState(1);
          result.setGonghao(user.getGonghao());
          result.setMessage("成功，登录用户" + user.getUid());
          this.oimsLogService.saveOimsLog(result, 1);
        } else {
          result.setObj("用户名或密码错误！");
        } 
      } catch (Exception e) {
        result.setObj("用户已登录！");
        e.printStackTrace();
      } 
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  @RequestMapping(value = {"/userCheckLogin.htm"}, method = {RequestMethod.POST})
  public void userCheckLogin(UserLoginForm ulf, HttpServletRequest request, HttpServletResponse response) {
    String ip = IPUtils.getIpAddrByRequest(request);
    ulf.setIp(ip);
    MyResult result = new MyResult();
    result.setDoing("用户检查登录");
    if (UserFormValidation.userLoginFormValidation(ulf)) {
      try {
        User user = this.userService.userLogin(ulf);
        if (user != null) {
          result.setState(1);
          result.setGonghao(user.getGonghao());
          result.setMessage("成功，登录用户" + user.getUid());
          this.oimsLogService.saveOimsLog(result, 1);
        } else {
          result.setObj("用户名或密码错误！");
        } 
      } catch (Exception e) {
        result.setObj("用户已登录！");
      } 
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  @RequestMapping(value = {"/getUserData.htm"}, method = {RequestMethod.GET})
  public void getUserData(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取用户数据");
    HttpSession session = request.getSession();
    Object uo = session.getAttribute("uid");
    if (uo == null) {
      result.setMessage("OIMSERR_10003");
    } else {
      result.setObj(this.userService.getUserData(uo.toString()));
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/userLoginOut.htm"}, method = {RequestMethod.POST})
  public void userLogin(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("用户退出登录");
    try {
      HttpSession session = request.getSession();
      UserOnline user = this.userOnlineService.findUserOnlineById(session
          .getAttribute("uid").toString());
      user.setOnline(false);
      this.userOnlineService.updateUserOnline(user);
      session.removeAttribute("uid");
      session.removeAttribute("gonghao");
      session.removeAttribute("currentUser");
      result.setState(1);
    } catch (Exception e) {
      result.setObj(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/userSmallScreenLogin.htm"}, method = {RequestMethod.POST})
  public ModelAndView userSmallScreenLogin(UserLoginForm ulf, HttpServletRequest request, HttpServletResponse response) throws Exception {
    MyResult result = new MyResult();
    result.setDoing("用户小屏检查登录");
    ModelAndView mav = new ModelAndView();
    mav.setViewName("manager/xiaoping");
    if (UserFormValidation.userLoginFormValidation(ulf)) {
      String ip = IPUtils.getIpAddrByRequest(request);
      ulf.setIp(ip);
      try {
        User user = this.userService.userLogin(ulf);
        if (user != null) {
          HttpSession session = request.getSession();
          session.setAttribute("uid", user.getUid());
          session.setAttribute("gonghao", user.getGonghao());
          session.setAttribute("currentUser", user);
          result.setState(1);
        } 
      } catch (Exception e) {
        e.printStackTrace();
        result.setObj(e.getMessage());
      } 
    } 
    return mav;
  }
  
  @RequestMapping(value = {"/userSmallScreenNewLogin.htm"}, method = {RequestMethod.POST})
  public ModelAndView userSmallScreenNewLogin(UserLoginForm ulf, HttpServletRequest request, HttpServletResponse response) throws Exception {
    MyResult result = new MyResult();
    result.setDoing("用户小屏检查登录");
    ModelAndView mav = new ModelAndView();
    mav.setViewName("../../xiaoping/xiaoping");
    if (UserFormValidation.userLoginFormValidation(ulf)) {
      String ip = IPUtils.getIpAddrByRequest(request);
      ulf.setIp(ip);
      try {
        User user = this.userService.userSmallScreenLogin(ulf);
        if (user != null) {
          HttpSession session = request.getSession();
          session.setAttribute("uid", user.getUid());
          session.setAttribute("gonghao", user.getGonghao());
          session.setAttribute("currentUser", user);
          result.setState(1);
        } 
      } catch (Exception e) {
        e.printStackTrace();
        result.setObj(e.getMessage());
      } 
    } 
    return mav;
  }
  
  @RequestMapping(value = {"/userBigScreenLogin.htm"}, method = {RequestMethod.GET})
  public ModelAndView userBigScreenLogin(UserLoginForm ulf, HttpServletRequest request, HttpServletResponse response) throws Exception {
    MyResult result = new MyResult();
    result.setDoing("用户大屏浏览登录");
    ModelAndView mav = new ModelAndView();
    mav.setViewName("../../picbrowser/bigView");
    if (UserFormValidation.userLoginFormValidation(ulf)) {
      String ip = IPUtils.getIpAddrByRequest(request);
      ulf.setIp(ip);
      try {
        User user = this.userService.userSmallScreenLogin(ulf);
        if (user != null) {
          HttpSession session = request.getSession();
          session.setAttribute("uid", user.getUid());
          session.setAttribute("gonghao", user.getGonghao());
          session.setAttribute("currentUser", user);
          result.setState(1);
        } 
      } catch (Exception e) {
        e.printStackTrace();
        result.setObj(e.getMessage());
      } 
    } 
    return mav;
  }
  
  @RequestMapping(value = {"/findAllUserByPage.htm"}, method = {RequestMethod.POST})
  public void findAllUserByPage(Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>(0);
    this.doing = "分页查询用户列表";
    String search = request.getParameter("search");
    String qiyongflag = request.getParameter("qiyongflag");
    page.setFactor(String.valueOf(search) + "," + qiyongflag);
    try {
      List list = this.userService.findAllUserByPage(page);
      map.put("list", list);
      map.put("page", page);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(map);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findAllUser.htm"}, method = {RequestMethod.GET})
  public void findAllUser(String key, Page p, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询用户", req);
    try {
      mr = this.userService.findUsersByPage(mr, key, p);
      mrSuccess(mr);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e.getMessage(), mr);
    } 
    writeLog(mr);
    writeObjectJson(mr.getObj(), res);
  }
  
  @RequestMapping(value = {"hasUid.htm"}, method = {RequestMethod.POST})
  public void hasUid(String uid, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    this.doing = "判断登录名是否已经存在于数据库中";
    User user = null;
    try {
      user = this.userService.findUserByUid(uid);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(user);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"hasGonghao.htm"}, method = {RequestMethod.POST})
  public void hasGonghao(String gonghao, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("User gonghao是否被占用", req);
    try {
      mrSuccess(mr, this.userService.findUserByGongHao(gonghao));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e.getMessage(), mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"updateUserPassword.htm"}, method = {RequestMethod.POST})
  public void updatePwd(HttpServletRequest request, HttpServletResponse response, User user) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "用户密码重置";
    try {
      User userUpdate = this.userService.findUserById(user.getUid());
      userUpdate.setPassword((new MultiUtils()).getPasswordString(user
            .getPassword()));
      this.userService.updateUser(userUpdate);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(user);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"modifyUserPwd.htm"}, method = {RequestMethod.POST})
  public void modifyUserPwd(pwdResetForm uf, HttpServletRequest req, HttpServletResponse res) {
    // Byte code:
    //   0: new com/codesnet/common/MyResult
    //   3: dup
    //   4: invokespecial <init> : ()V
    //   7: astore #4
    //   9: aload #4
    //   11: ldc_w '修改用户密码'
    //   14: invokevirtual setDoing : (Ljava/lang/String;)V
    //   17: aload_2
    //   18: invokeinterface getSession : ()Ljavax/servlet/http/HttpSession;
    //   23: astore #5
    //   25: aload #5
    //   27: ldc 'gonghao'
    //   29: invokeinterface getAttribute : (Ljava/lang/String;)Ljava/lang/Object;
    //   34: ifnull -> 52
    //   37: aload #5
    //   39: ldc 'gonghao'
    //   41: invokeinterface getAttribute : (Ljava/lang/String;)Ljava/lang/Object;
    //   46: invokevirtual toString : ()Ljava/lang/String;
    //   49: goto -> 53
    //   52: aconst_null
    //   53: astore #6
    //   55: aload #5
    //   57: ldc 'uid'
    //   59: invokeinterface getAttribute : (Ljava/lang/String;)Ljava/lang/Object;
    //   64: ifnull -> 82
    //   67: aload #5
    //   69: ldc 'uid'
    //   71: invokeinterface getAttribute : (Ljava/lang/String;)Ljava/lang/Object;
    //   76: invokevirtual toString : ()Ljava/lang/String;
    //   79: goto -> 83
    //   82: aconst_null
    //   83: astore #7
    //   85: aload #7
    //   87: ifnull -> 184
    //   90: aload_0
    //   91: getfield userService : Lcn/com/oims/service/IUserService;
    //   94: aload #7
    //   96: invokeinterface findUserByUid : (Ljava/lang/String;)Lcn/com/oims/dao/pojo/User;
    //   101: astore #8
    //   103: aload #8
    //   105: ifnull -> 133
    //   108: aload #8
    //   110: invokevirtual getPassword : ()Ljava/lang/String;
    //   113: new com/codesnet/common/MultiUtils
    //   116: dup
    //   117: invokespecial <init> : ()V
    //   120: aload_1
    //   121: invokevirtual getOldPwd : ()Ljava/lang/String;
    //   124: invokevirtual getPasswordString : (Ljava/lang/String;)Ljava/lang/String;
    //   127: invokevirtual equals : (Ljava/lang/Object;)Z
    //   130: ifne -> 144
    //   133: aload #4
    //   135: ldc_w '原密码输入不正确！'
    //   138: invokevirtual setMessage : (Ljava/lang/String;)V
    //   141: goto -> 184
    //   144: aload_1
    //   145: aload #7
    //   147: invokevirtual setUid : (Ljava/lang/String;)V
    //   150: aload_0
    //   151: getfield userService : Lcn/com/oims/service/IUserService;
    //   154: aload_1
    //   155: invokeinterface modifyUserPwd : (Lcn/com/oims/web/form/pwdResetForm;)V
    //   160: aload #4
    //   162: ldc_w '密码修改成功！'
    //   165: invokevirtual setMessage : (Ljava/lang/String;)V
    //   168: aload #4
    //   170: iconst_1
    //   171: invokevirtual setState : (I)V
    //   174: goto -> 184
    //   177: astore #8
    //   179: aload #8
    //   181: invokevirtual printStackTrace : ()V
    //   184: aload #4
    //   186: aload #6
    //   188: invokevirtual setGonghao : (Ljava/lang/String;)V
    //   191: aload_0
    //   192: getfield oimsLogService : Lcn/com/oims/service/IOimsLogService;
    //   195: aload #4
    //   197: iconst_1
    //   198: invokeinterface saveOimsLog : (Lcom/codesnet/common/MyResult;I)Ljava/io/Serializable;
    //   203: pop
    //   204: aload #4
    //   206: aload_3
    //   207: invokestatic writeJSONObj : (Ljava/lang/Object;Ljavax/servlet/http/HttpServletResponse;)V
    //   210: return
    // Line number table:
    //   Java source line number -> byte code offset
    //   #438	-> 0
    //   #439	-> 9
    //   #440	-> 17
    //   #441	-> 25
    //   #442	-> 39
    //   #441	-> 53
    //   #443	-> 55
    //   #444	-> 69
    //   #443	-> 83
    //   #446	-> 85
    //   #447	-> 90
    //   #448	-> 103
    //   #449	-> 108
    //   #450	-> 113
    //   #451	-> 121
    //   #450	-> 124
    //   #449	-> 127
    //   #451	-> 130
    //   #452	-> 133
    //   #453	-> 141
    //   #454	-> 144
    //   #455	-> 150
    //   #456	-> 160
    //   #457	-> 168
    //   #461	-> 174
    //   #462	-> 179
    //   #464	-> 184
    //   #465	-> 191
    //   #466	-> 204
    //   #467	-> 210
    // Local variable table:
    //   start	length	slot	name	descriptor
    //   0	211	0	this	Lcn/com/oims/web/controller/UserController;
    //   0	211	1	uf	Lcn/com/oims/web/form/pwdResetForm;
    //   0	211	2	req	Ljavax/servlet/http/HttpServletRequest;
    //   0	211	3	res	Ljavax/servlet/http/HttpServletResponse;
    //   9	202	4	result	Lcom/codesnet/common/MyResult;
    //   25	186	5	session	Ljavax/servlet/http/HttpSession;
    //   55	156	6	gonghao	Ljava/lang/String;
    //   85	126	7	uid	Ljava/lang/String;
    //   103	71	8	user	Lcn/com/oims/dao/pojo/User;
    //   179	5	8	e	Ljava/lang/Exception;
    // Exception table:
    //   from	to	target	type
    //   85	174	177	java/lang/Exception
  }
  
  @RequestMapping(value = {"updateJiaose.htm"}, method = {RequestMethod.POST})
  public void updateJiaose(UserForm uf, HttpServletRequest request, HttpServletResponse response, User user) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "用户角色信息修改";
    try {
      User userUpdate = this.userService.findUserById(user.getUid());
      userUpdate.setJiaose(user.getJiaose());
      this.userService.updateUser(userUpdate);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(user);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"addUser.htm"}, method = {RequestMethod.POST})
  public void addUser(UserForm uf, YuanGongForm yf, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "用户信息新增";
    try {
      yf.setEmail(request.getParameter("y_email"));
      Yhpz yhpz = new Yhpz();
      yhpz.setGonghao(uf.getGonghao());
      yhpz.setYuyan(Integer.valueOf(24));
      yhpz.setXssj(true);
      Manageitem manageitem = this.manageItemService.getUserConfState(true, 
          OimsCategoryConfig.DEFAULT_UYPZ_POWER.intValue());
      if (manageitem != null) {
        String vals = manageitem.getVals();
        if (vals != null && !"".equals(vals)) {
          String[] val = vals.split(",");
          yhpz.setHyc(val[0].substring(val[0].indexOf(":") + 1)
              .replaceAll("\"", ""));
          yhpz.setGzt(val[1].substring(val[1].indexOf(":") + 1)
              .replaceAll("\"", ""));
          yhpz.setXslx(Integer.valueOf(Integer.parseInt(val[2].substring(val[2]
                    .indexOf(":") + 1))));
          yhpz.setXssj(true);
          yhpz.setYuyan(Integer.valueOf(Integer.parseInt(val[4].substring(val[4]
                    .indexOf(":") + 1))));
        } 
      } 
      this.userService.addUser(uf, yf, yhpz);
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
  
  @RequestMapping(value = {"updateUser.htm"}, method = {RequestMethod.POST})
  public void updateUser(UserForm uf, YuanGongForm yf, String ygdetail, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "用户信息修改";
    try {
      yf.setEmail(request.getParameter("y_email"));
      this.userService.updateUser(uf, yf, ygdetail);
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
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findUserById.htm"}, method = {RequestMethod.POST})
  public void findUserById(String uid, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("uid查询用户", req);
    try {
      mrSuccess(mr, this.userService.findUserById(uid));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e.getMessage(), mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"findUserByGongHao.htm"}, method = {RequestMethod.POST})
  public void findUserByGongHao(String gonghao, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao_session = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    User user = new User();
    this.doing = "根据用户工号查询用户信息";
    try {
      user = this.userService.findUserByGongHao(gonghao);
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
    result.setObj(user);
    result.setGonghao(gonghao_session);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/hasYhQx.htm"}, method = {RequestMethod.GET})
  public void hasYhQx(HttpServletRequest request, HttpServletResponse response, String qxid) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    this.doing = "判断用户是否具有某种指定权限";
    try {
      if (this.userService.isQuanXianToUser(gonghao, qxid)) {
        this.doState = 1;
        this.message = "用户存在该权限" + qxid;
      } else {
        this.doState = 0;
        this.message = "用户不存在该权限" + qxid;
      } 
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(qxid);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/qiYongUser.htm"}, method = {RequestMethod.POST})
  public void qiYongUser(HttpServletRequest request, HttpServletResponse response, User user) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "启用户操作";
    try {
      user = this.userService.findUserById(user.getUid());
      user.setQiyong(true);
      this.userService.updateUser(user);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(user);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/jingYongUser.htm"}, method = {RequestMethod.POST})
  public void jingYongUser(HttpServletRequest request, HttpServletResponse response, User user) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "禁用用户操作";
    try {
      user = this.userService.findUserById(user.getUid());
      user.setQiyong(false);
      this.userService.updateUser(user);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(user);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteUser.htm"}, method = {RequestMethod.POST})
  public void deleteUser(HttpServletRequest request, HttpServletResponse response, User user) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "删除用户操作";
    try {
      this.userService.deleteUser(user.getUid());
      this.yhpzService.deleteYhpzById(user.getGonghao());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(user);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/selectUsersByUser.htm"}, method = {RequestMethod.POST})
  public void selectUsersByUser(HttpServletRequest request, HttpServletResponse response, User user) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<User> list = null;
    this.doing = "根据User对象查询符合条件的User对象集合";
    try {
      list = this.userService.selectUsersByUser(user);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(list);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/showJCPanel.htm"}, method = {RequestMethod.GET})
  public ModelAndView showJCPanel(String ip, String gonghao, String JCDH, String FILE_WATCH, HttpServletRequest request, HttpServletResponse response) {
    ModelAndView mav = new ModelAndView();
    mav.setViewName("/oimsCapture/showPanel");
    HttpSession session = request.getSession();
    User user = this.userService.findUserByGongHao(gonghao);
    if (user != null) {
      session.setAttribute("uid", user.getUid());
      session.setAttribute("gonghao", user.getGonghao());
      session.setAttribute("currentUser", user);
    } 
    try {
      request.getRequestDispatcher("/oimsCapture/patientTitle.jsp?gonghao=" + gonghao + "&ip=" + ip + "&JCDH=" + JCDH + "&FILE_WATCH=" + FILE_WATCH).forward((ServletRequest)request, (ServletResponse)response);
    } catch (IOException e) {
      e.printStackTrace();
    } catch (ServletException e) {
      e.printStackTrace();
    } 
    return null;
  }
  
  @RequestMapping(value = {"/studyViewer.htm"}, method = {RequestMethod.GET})
  public void paceLogin(String userName, String password, String blh, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    User user = this.userService.findUserByUid(userName);
    session.setAttribute("uid", user.getUid());
    session.setAttribute("gonghao", user.getGonghao());
    session.setAttribute("currentUser", user);
    try {
      request.getRequestDispatcher("/picbrowser/index.jsp?blh=" + blh).forward((ServletRequest)request, (ServletResponse)response);
    } catch (IOException e) {
      e.printStackTrace();
    } catch (ServletException e) {
      e.printStackTrace();
    } 
  }
  
  @RequestMapping(value = {"findUserQXByGongHao.htm"}, method = {RequestMethod.POST})
  public void findUserQXByGongHao(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult myResult = new MyResult();
    myResult.setDoing("根据用户查询用户角色");
    try {
      User user = this.userService.findUserByGongHao(gonghao);
      myResult.setState(1);
      myResult.setObj(user);
    } catch (Exception e) {
      myResult.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(myResult, response);
  }
}
