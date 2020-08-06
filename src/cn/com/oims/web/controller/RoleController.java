package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.QuanXian;
import cn.com.oims.dao.pojo.Role;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IQuanXianService;
import cn.com.oims.service.IRoleService;
import cn.com.oims.service.IUserService;
import cn.com.oims.web.form.QuanXianConfigForm;
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
@RequestMapping({"role"})
public class RoleController extends BaseController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  private IRoleService roleService;
  
  private IOimsLogService oimsLogService;
  
  private IQuanXianService quanXianService;
  
  @Autowired
  private IUserService userService;
  
  @Autowired
  public void setRoleService(IRoleService roleService) {
    this.roleService = roleService;
  }
  
  @Autowired
  public void setOimsLogService(IOimsLogService oimsLogService) {
    this.oimsLogService = oimsLogService;
  }
  
  @Autowired
  public void setquanXianService(IQuanXianService quanXianService) {
    this.quanXianService = quanXianService;
  }
  
  @RequestMapping(value = {"findAllRole.htm"}, method = {RequestMethod.POST})
  public void findAllRole(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "查询所有角色信息";
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List roles = new ArrayList();
    try {
      roles = this.roleService.findAllRoles();
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
    result.setObj(roles);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllRoleByPage.htm"}, method = {RequestMethod.POST})
  public void findAllUserByPage(Page page, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "分页查询角色信息";
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    try {
      List list = this.roleService.findRolesMapByPage(page);
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
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findCurLoginUserQuanXiangToNo1.htm"}, method = {RequestMethod.POST})
  public void findCurLoginUserQuanXiangToNo1(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "查询当前用户所具有的一级菜单权限";
    List<QuanXian> list = new ArrayList<>();
    User user = new User();
    try {
      user = getCurrentUser(request);
      list = this.quanXianService.findCurLoginUserQuanXiangToNo1(user);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(list);
    result.setMessage(this.message);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findCurLoginUserQuanXiangToNo2.htm"}, method = {RequestMethod.POST})
  public void findCurLoginUserQuanXiangToNo2(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "根据父级权限ID得到该父级权限下所有的子权限";
    List<QuanXian> list = new ArrayList<>();
    User user = new User();
    try {
      user = getCurrentUser(request);
      list = this.quanXianService.findCurLoginUserQuanXiangToNo2(id, user);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(list);
    result.setMessage(this.message);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findCurLoginUserQuanXiangToNo3.htm"}, method = {RequestMethod.POST})
  public void findCurLoginUserQuanXiangToNo3(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "查询当前用户所具有的三级菜单权限";
    List<QuanXian> list = new ArrayList<>();
    User user = new User();
    try {
      user = getCurrentUser(request);
      list = this.quanXianService.findCurLoginUserQuanXiangToButton(id, user);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(list);
    result.setMessage(this.message);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/jiaoseConfig.htm"}, method = {RequestMethod.POST})
  public void quanXianConfig(QuanXianConfigForm quanXianConfigForm, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "新增角色信息";
    User user = new User();
    try {
      user = getCurrentUser(request);
      String jiaose = quanXianConfigForm.getJiaose();
      String quanxianIds = "-1";
      if (quanXianConfigForm.getQuanxian() != null) {
        String[] quanxianArray = quanXianConfigForm.getQuanxian();
        byte b;
        int i;
        String[] arrayOfString1;
        for (i = (arrayOfString1 = quanxianArray).length, b = 0; b < i; ) {
          String quanxianId = arrayOfString1[b];
          quanxianIds = String.valueOf(quanxianIds) + "," + quanxianId;
          b++;
        } 
      } 
      String quanxianIds_firstLevel = this.quanXianService
        .findQuanXianNo1StrByQuanXianIds(quanxianIds);
      if (!"".equals(quanxianIds_firstLevel))
        quanxianIds = String.valueOf(quanxianIds) + "," + quanxianIds_firstLevel; 
      Role role = new Role();
      role.setJiaose(jiaose);
      role.setQuanxian(quanxianIds);
      this.roleService.saveRole(role);
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
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/jiaoseUpdate.htm"}, method = {RequestMethod.POST})
  public void jiaoseUpdate(QuanXianConfigForm quanXianConfigForm, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "角色信息修改";
    User user = new User();
    try {
      user = getCurrentUser(request);
      String jiaose = quanXianConfigForm.getJiaose();
      Integer jiaoseId = quanXianConfigForm.getJiaoseId();
      String quanxianIds = "-1";
      if (quanXianConfigForm.getQuanxian() != null) {
        String[] quanxianArray = quanXianConfigForm.getQuanxian();
        byte b;
        int i;
        String[] arrayOfString1;
        for (i = (arrayOfString1 = quanxianArray).length, b = 0; b < i; ) {
          String quanxianId = arrayOfString1[b];
          quanxianIds = String.valueOf(quanxianIds) + "," + quanxianId;
          b++;
        } 
      } 
      String quanxianIds_firstLevel = this.quanXianService
        .findQuanXianNo1StrByQuanXianIds(quanxianIds);
      if (!"".equals(quanxianIds_firstLevel))
        quanxianIds = String.valueOf(quanxianIds) + "," + quanxianIds_firstLevel; 
      Role role = new Role();
      role.setId(jiaoseId);
      role.setJiaose(jiaose);
      role.setQuanxian(quanxianIds);
      this.roleService.updateRole(role);
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
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJiaoSeQuanXianById.htm"}, method = {RequestMethod.POST})
  public void findJiaoSeQuanXianById(HttpServletRequest request, HttpServletResponse response, Integer id) {
    MyResult result = new MyResult();
    this.doing = "根据角色ID查询角色信息对象";
    User user = new User();
    Role role = new Role();
    try {
      user = getCurrentUser(request);
      role = this.roleService.findRoleById(id);
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
    result.setObj(role);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delJiaoSe.htm"}, method = {RequestMethod.POST})
  public void delJiaoSe(HttpServletRequest request, HttpServletResponse response, String ids) {
    MyResult result = new MyResult();
    this.doing = "删除角色信息";
    User user = new User();
    try {
      user = getCurrentUser(request);
      String[] roleIds = ids.split(",");
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = roleIds).length, b = 0; b < i; ) {
        String roleId = arrayOfString1[b];
        boolean resule_isExistUserToRoleId = this.userService
          .isExistUserToRoleId(Integer.valueOf(Integer.parseInt(roleId)));
        if (resule_isExistUserToRoleId) {
          this.doState = 0;
          this.message = "操作失败，存在数据关联";
        } else {
          this.roleService.deleteRoleById(Integer.valueOf(Integer.parseInt(roleId)));
          this.doState = 1;
          this.message = "操作成功";
        } 
        b++;
      } 
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(user.getGonghao());
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteRoleById.htm"}, method = {RequestMethod.POST})
  public void deleteRoleById(HttpServletRequest request, HttpServletResponse response, Role role) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据主键ID删除角色信息";
    try {
      this.roleService.deleteRoleById(role.getId());
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
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
