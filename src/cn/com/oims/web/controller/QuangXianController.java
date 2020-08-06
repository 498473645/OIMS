package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.QuanXian;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IQuanXianService;
import cn.com.oims.service.IUserService;
import cn.com.oims.web.form.QuanXianConfigForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"qx"})
public class QuangXianController extends BaseController {
  private IQuanXianService qxService;
  
  @Autowired
  private IUserService userService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  public void setQxService(IQuanXianService qxService) {
    this.qxService = qxService;
  }
  
  @RequestMapping(value = {"/findCurentLoginUserQuanxianToJiaoSe.htm"}, method = {RequestMethod.POST})
  public void findCurentLoginUserQuanxianToJiaoSe(String uid, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询当前用户与被配置权限差集", req);
    try {
      mrSuccess(mr, this.qxService.findCurentUserQuanxianDif(uid, getCurrentUser(req)));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"/findQuanxianCUserAndSelectedUserDif.htm"}, method = {RequestMethod.POST})
  public void findQuanxianCUserAndSelectedUserDif(String uid, HttpServletRequest req, HttpServletResponse res) {
    MyResult result = new MyResult();
    result.setDoing("查询当前登录用户和所操作用户权限差级");
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    try {
      String difStr = this.qxService.findQuanxianCUserAndSelectedUserDif(uid, getCurrentUser(req));
      if ("".equals(difStr))
        result.setState(1); 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, res);
  }
  
  @RequestMapping(value = {"/findCurLoginUserQuanXiangToNo1.htm"}, method = {RequestMethod.POST})
  public void findCurLoginUserQuanXiangToNo1(HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询当前用户所具有的一级菜单权限", req);
    try {
      String uid = req.getParameter("uid");
      List<QuanXian> list = this.qxService.findCurLoginUserQuanXiangToNo1(getCurrentUser(req));
      if (list != null)
        mrSuccess(mr, list); 
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"/findCurLoginUserQuanXiangToNo2.htm"}, method = {RequestMethod.POST})
  public void findCurLoginUserQuanXiangToNo2(Integer id, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询当前用户所具有的二级菜单权限", req);
    try {
      String uid = req.getParameter("uid");
      List<QuanXian> list = this.qxService.findCurLoginUserQuanXiangToNo2(id, getCurrentUser(req));
      if (list != null)
        mrSuccess(mr, list); 
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"/findCurLoginUserQuanXiangToNo3.htm"}, method = {RequestMethod.POST})
  public void findCurLoginUserQuanXiangToNo3(Integer id, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询当前用户所具有的三级菜单权限", req);
    try {
      String str = req.getParameter("uid");
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"/quanXianConfig.htm"}, method = {RequestMethod.POST})
  public void quanXianConfig(QuanXianConfigForm qxf, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("配置用户权限信息！", req);
    try {
      String[] quanxian = qxf.getQuanxian();
      String qxStr = "";
      if (quanxian != null) {
        int i;
        for (i = 0; i < quanxian.length - 1; i++)
          qxStr = String.valueOf(qxStr) + quanxian[i] + ","; 
        if (i == quanxian.length - 1)
          qxStr = String.valueOf(qxStr) + quanxian[i]; 
        String qxNo1Str = this.qxService.findQuanXianNo1StrByQuanXianIds(qxStr);
        if (!"".equals(qxStr))
          qxStr = String.valueOf(qxStr) + "," + qxNo1Str; 
        mrSuccess(mr, this.userService.updateUserQuanXian(qxf.getUid(), qxStr));
      } 
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"findCurentUserQuanxianDif.htm"}, method = {RequestMethod.POST})
  public void findCurentUserQuanxianDif(String uid, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("查询当前用户与被配置权限差集", req);
    try {
      mrSuccess(mr, this.qxService.findCurentUserQuanxianDif(uid, getCurrentUser(req)));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"findYuangonQuanXian.htm"}, method = {RequestMethod.POST})
  public void findYuangonQuanXian(String ids, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("以id查询当前用户权限", req);
    try {
      mrSuccess(mr, this.qxService.findYuangonQuanXian(ids, getCurrentUser(req)));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    writeLog(mr);
    writeObjectJson(mr, res);
  }
  
  @RequestMapping(value = {"/findUserQuanXianByUid.htm"}, method = {RequestMethod.POST})
  public void findUserQuanXianByUid(HttpServletRequest req, HttpServletResponse res) {
    MyResult result = new MyResult();
    result.setDoing("查询所选用户具有的权限");
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String uid = req.getParameter("uid");
    try {
      User user = this.userService.findUserById(uid);
      if (user != null) {
        result.setState(1);
        result.setObj(user);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, res);
  }
}
