package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.RevProj;
import cn.com.oims.dao.pojo.RevProjDetail;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IRevProjDetailService;
import cn.com.oims.service.IRevProjService;
import cn.com.oims.service.IUserService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.RevProjForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"revproj"})
public class RevProjCotroller extends BaseController {
  @Autowired
  private IRevProjService revProjService;
  
  @Autowired
  private IRevProjDetailService revProjDetailService;
  
  @Autowired
  private IJcxmService jcxmService;
  
  @Autowired
  private IUserService userService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @RequestMapping(value = {"/getRevProjList.htm"}, method = {RequestMethod.POST})
  public void getRevProjList(HttpServletRequest request, HttpServletResponse response, Page page, RevProjForm form) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = null;
    try {
      list = this.revProjService.findRevProjByPage(page, form);
      map.put("list", list);
      map.put("page", page);
    } catch (Exception exception) {}
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getRevProjByUser.htm"}, method = {RequestMethod.POST})
  public void getRevProjByUser(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据用户工号获取所管理检查项目");
    List<Map<String, Object>> list = null;
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? 
      session.getAttribute("gonghao").toString() : null;
    try {
      list = this.revProjService
        .findRevProjByUser(gonghao);
      if (list != null) {
        result.setObj(list);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/addRevProj.htm"}, method = {RequestMethod.POST})
  public void addRevProj(HttpServletRequest request, HttpServletResponse response, RevProjForm form) {
    MyResult result = new MyResult();
    result.setDoing("根据类别获取所属检查项目");
    try {
      RevProj rp = null;
      if (form.getId() != null)
        rp = this.revProjService.getRevProjById(form.getId()); 
      rp = (rp == null) ? new RevProj() : rp;
      BeanUtils.copyProperties(rp, form);
      rp.setOpertm(new Date());
      rp.setOperUserId(getCurrentUser(request).getGonghao());
      Long revProjId = (Long)this.revProjService.saveRevProj(rp);
      RevProjDetail tmp = null;
      if (rp.getId() != null)
        this.revProjDetailService.delByRevProjId(rp.getId()); 
      String jcxmIds = form.getJcxmIds();
      String[] jcxmidArr = null;
      if (jcxmIds.indexOf(",") != -1) {
        jcxmidArr = jcxmIds.split(",");
      } else {
        tmp = new RevProjDetail();
        tmp.setJcxmId(Long.valueOf(Long.parseLong(jcxmIds)));
        Jcxm jcxm = this.jcxmService.getJcxmById(Integer.valueOf(Integer.parseInt(jcxmIds)));
        tmp.setJcxmmc(jcxm.getXmmc());
        tmp.setRevprojId(revProjId);
        this.revProjDetailService.saveRevProjDetail(tmp);
      } 
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = jcxmidArr).length, b = 0; b < i; ) {
        String l = arrayOfString1[b];
        tmp = new RevProjDetail();
        tmp.setJcxmId(Long.valueOf(Long.parseLong(l)));
        Jcxm jcxm = this.jcxmService.getJcxmById(Integer.valueOf(Integer.parseInt(l)));
        tmp.setJcxmmc(jcxm.getXmmc());
        tmp.setRevprojId(revProjId);
        this.revProjDetailService.saveRevProjDetail(tmp);
        b++;
      } 
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updRevProj.htm"}, method = {RequestMethod.POST})
  public void updRevProj(HttpServletRequest request, HttpServletResponse response, RevProjForm form) {
    MyResult result = new MyResult();
    result.setDoing("根据类别获取所属检查项目");
    try {
      RevProj rp = null;
      if (form.getId() != null)
        rp = this.revProjService.getRevProjById(form.getId()); 
      rp.setAmnum(form.getAmnum());
      rp.setPmnum(form.getPmnum());
      rp.setBumenId(form.getBumenId());
      rp.setUserId(form.getUserId());
      rp.setCheckAddr(form.getCheckAddr());
      rp.setProjName(form.getProjName());
      rp.setJcxmIds(form.getJcxmIds());
      rp.setOpertm(new Date());
      rp.setOperUserId(getCurrentUser(request).getGonghao());
      this.revProjService.updateRevProj(rp);
      RevProjDetail tmp = null;
      if (rp.getId() != null)
        this.revProjDetailService.delByRevProjId(rp.getId()); 
      String jcxmIds = form.getJcxmIds();
      String[] jcxmidArr = null;
      if (jcxmIds.indexOf(",") != -1) {
        jcxmidArr = jcxmIds.split(",");
      } else {
        tmp = new RevProjDetail();
        tmp.setJcxmId(Long.valueOf(Long.parseLong(jcxmIds)));
        Jcxm jcxm = this.jcxmService.getJcxmById(Integer.valueOf(Integer.parseInt(jcxmIds)));
        tmp.setJcxmmc(jcxm.getXmmc());
        tmp.setRevprojId(rp.getId());
        this.revProjDetailService.saveRevProjDetail(tmp);
      } 
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = jcxmidArr).length, b = 0; b < i; ) {
        String l = arrayOfString1[b];
        tmp = new RevProjDetail();
        tmp.setJcxmId(Long.valueOf(Long.parseLong(l)));
        Jcxm jcxm = this.jcxmService.getJcxmById(Integer.valueOf(Integer.parseInt(l)));
        tmp.setJcxmmc(jcxm.getXmmc());
        tmp.setRevprojId(rp.getId());
        this.revProjDetailService.saveRevProjDetail(tmp);
        b++;
      } 
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findByCategory.htm"}, method = {RequestMethod.POST})
  public void findByCategory(Integer categoryId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据类别获取所属检查项目");
    List<Jcxm> rs = this.jcxmService.findJcxmByCatetory(categoryId);
    if (rs != null && rs.size() > 0) {
      result.setObj(rs);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findRevProjDetailById.htm"}, method = {RequestMethod.POST})
  public void findRevProjDetailById(Long revProjId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据ID获取检查项目");
    List<RevProjDetail> obj = this.revProjDetailService.getRevProjDetailByRevProjId(revProjId);
    if (obj != null && obj.size() > 0) {
      result.setObj(obj);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findRevProjById.htm"}, method = {RequestMethod.POST})
  public void findRevProjById(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据ID获取检查项目");
    RevProj obj = this.revProjService.getRevProjById(id);
    if (obj != null) {
      result.setObj(obj);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcxmByRevProjDetail.htm"}, method = {RequestMethod.POST})
  public void getJcxmByRevProjDetail(Long revProjId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据ID获取检查项目");
    List<RevProjDetail> list = this.revProjDetailService.getRevProjDetailByRevProjId(revProjId);
    if (list != null && list.size() > 0) {
      result.setObj(list);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findUserYuanGongMap.htm"}, method = {RequestMethod.POST})
  public void findByCategory(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据负责人信息");
    List<Map<String, Object>> rs = getUserYuanGongMap();
    if (rs != null && rs.size() > 0) {
      result.setObj(rs);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delRevProj.htm"}, method = {RequestMethod.POST})
  public void delRevProj(Long[] ids, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    try {
      byte b;
      int i;
      Long[] arrayOfLong;
      for (i = (arrayOfLong = ids).length, b = 0; b < i; ) {
        Long id = arrayOfLong[b];
        this.revProjService.delRevProjById(id);
        b++;
      } 
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public List<Map<String, Object>> getUserYuanGongMap() {
    List<User> us = this.userService.findAllUsers();
    Map<String, Object> rs = new HashMap<>();
    List<Map<String, Object>> result = new ArrayList<>();
    for (User u : us) {
      rs = new HashMap<>();
      rs.put("uid", u.getUid());
      rs.put("yuangong", this.yuanGongService.obtainYuanGongByGonghao(u.getGonghao()));
      result.add(rs);
    } 
    return result;
  }
  
  public void setRevProjService(IRevProjService revProjService) {
    this.revProjService = revProjService;
  }
  
  public void setJcxmService(IJcxmService jcxmService) {
    this.jcxmService = jcxmService;
  }
  
  public void setUserService(IUserService userService) {
    this.userService = userService;
  }
  
  public void setYuanGongService(IYuanGongService yuanGongService) {
    this.yuanGongService = yuanGongService;
  }
  
  public void setRevProjDetailService(IRevProjDetailService revProjDetailService) {
    this.revProjDetailService = revProjDetailService;
  }
}
