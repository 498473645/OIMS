package cn.com.oims.web.controller;

import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMRLisSample;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.JcxmFenlei;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IJcxmFenleiService;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IYuanGongService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.io.Serializable;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping({"jcxm"})
public class JcxmController {
  private String path_jcxmUpLoad = "/exam_photos";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcxmService jcxmService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private IJcxmFenleiService jcxmFenleiService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private ISheBeiService sheBeiService;
  
  @RequestMapping(value = {"/synchJcxm.htm"}, method = {RequestMethod.GET})
  public void synchJcxm(HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      this.jcxmService.synchJcxmItem();
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmZhixingkeshi.htm"}, method = {RequestMethod.GET})
  public void findJcxmZhixingkeshi(Integer jcxmId, Integer categoryId, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      List<BanGongShi> list = this.jcxmService.findJcxmZhixingkeshi(jcxmId, categoryId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findBgsByCategoryId.htm"}, method = {RequestMethod.GET})
  public void findBgsByCategoryId(Integer categoryId, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      List<BanGongShi> list = this.jcxmService.findBgsByCategoryId(categoryId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmCategoryByBgsId.htm"}, method = {RequestMethod.GET})
  public void findJcxmCategoryByBgsId(Integer bgsId, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      List<Category> list = this.jcxmService.findJcxmCategoryByBgsId(bgsId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmSample.htm"}, method = {RequestMethod.GET})
  public void findJcxmSample(Integer jcxmId, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      List<EMRLisSample> list = this.jcxmService.findJcxmSample(jcxmId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmOptions.htm"}, method = {RequestMethod.GET})
  public void findJcxmOptions(Integer jcxmId, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      List<EMRJcxmFushu> list = this.jcxmService.findJcxmOptions(jcxmId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllJcxm.htm"}, method = {RequestMethod.POST})
  public void findAllJcxm(Integer categoryId, Page page, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List jcxms = new ArrayList();
    this.doing = "查询所有检查项目信息";
    String search = request.getParameter("search");
    try {
      jcxms = this.jcxmService.findAllJcxm(categoryId, page, search);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(jcxms);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmsByPageAndJcxm.htm"}, method = {RequestMethod.POST})
  public void findJcxmsByPageAndJcxm(HttpServletResponse response, HttpServletRequest request, Page page, Jcxm jcxm) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "根据查询条件分页查询符合条件的检查项目（联合查询）";
    try {
      map = this.jcxmService.findJcxmsByPageAndJcxm(page, jcxm);
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
  
  @RequestMapping({"/saveJcxm.htm"})
  public void saveJcxm(HttpServletResponse response, HttpServletRequest request, Jcxm jcxm) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    String jbflIds = request.getParameter("jbfl_ids").toString();
    JcxmFenlei jcxmfenlei = null;
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile file_leftPicPath = multipartRequest
      .getFile("file_leftPicPath");
    MultipartFile file_rightPicPath = multipartRequest
      .getFile("file_rightPicPath");
    this.doing = "新增检查项目";
    try {
      String string_leftPicPath = FileUpOrDownLoad.doFileUpLoad(
          file_leftPicPath, request.getSession().getServletContext()
          .getRealPath(this.path_jcxmUpLoad));
      String string_rightPicPath = FileUpOrDownLoad.doFileUpLoad(
          file_rightPicPath, request.getSession().getServletContext()
          .getRealPath(this.path_jcxmUpLoad));
      if (string_leftPicPath != null)
        jcxm.setLeftPicPath(String.valueOf(this.path_jcxmUpLoad) + File.separator + 
            string_leftPicPath); 
      if (string_rightPicPath != null)
        jcxm.setRightPicPath(String.valueOf(this.path_jcxmUpLoad) + File.separator + 
            string_rightPicPath); 
      Serializable jcxmId = this.jcxmService.saveJcxm(jcxm);
      if (!"".equals(jbflIds)) {
        String[] jbflId = jbflIds.split(",");
        for (int i = 0; i < jbflId.length; i++) {
          jcxmfenlei = new JcxmFenlei();
          jcxmfenlei.setJcxmId(Integer.valueOf(Integer.parseInt(jcxmId.toString())));
          jcxmfenlei.setJbflId(Integer.valueOf(Integer.parseInt(jbflId[i])));
          jcxmfenlei.setXuhao(Integer.valueOf(i));
          this.jcxmFenleiService.saveJcxmFenlei(jcxmfenlei);
        } 
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
    result.setObj(jcxm);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    result.setObj(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateJcxm.htm"}, method = {RequestMethod.POST})
  public void updateJcxm(HttpServletResponse response, HttpServletRequest request, Jcxm jcxm) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    String jbflIds = request.getParameter("jbfl_ids").toString();
    JcxmFenlei jcxmfenlei = null;
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile file_leftPicPath = multipartRequest
      .getFile("file_leftPicPath");
    MultipartFile file_rightPicPath = multipartRequest
      .getFile("file_rightPicPath");
    this.doing = "修改检查项目";
    try {
      Jcxm old_jcxm = this.jcxmService.getJcxmById(jcxm.getId());
      String string_leftPicPath = FileUpOrDownLoad.doFileUpLoad(
          file_leftPicPath, request.getSession().getServletContext()
          .getRealPath(this.path_jcxmUpLoad));
      String string_rightPicPath = FileUpOrDownLoad.doFileUpLoad(
          file_rightPicPath, request.getSession().getServletContext()
          .getRealPath(this.path_jcxmUpLoad));
      if (string_leftPicPath == null) {
        jcxm.setLeftPicPath(old_jcxm.getLeftPicPath());
      } else {
        jcxm.setLeftPicPath(String.valueOf(this.path_jcxmUpLoad) + File.separator + 
            string_leftPicPath);
      } 
      if (string_rightPicPath == null) {
        jcxm.setRightPicPath(old_jcxm.getRightPicPath());
      } else {
        jcxm.setRightPicPath(String.valueOf(this.path_jcxmUpLoad) + File.separator + 
            string_rightPicPath);
      } 
      this.jcxmService.updateJcxm(jcxm);
      JcxmFenlei delete_jcxmfenlei = new JcxmFenlei();
      delete_jcxmfenlei.setJcxmId(jcxm.getId());
      this.jcxmFenleiService.deleteJcxmFenlei(delete_jcxmfenlei);
      if (!jbflIds.equals("")) {
        String[] jbflId = jbflIds.split(",");
        for (int i = 0; i < jbflId.length; i++) {
          jcxmfenlei = new JcxmFenlei();
          jcxmfenlei.setJcxmId(jcxm.getId());
          jcxmfenlei.setJbflId(Integer.valueOf(Integer.parseInt(jbflId[i])));
          jcxmfenlei.setXuhao(Integer.valueOf(i));
          this.jcxmFenleiService.saveJcxmFenlei(jcxmfenlei);
        } 
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
    result.setObj(jcxm);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    result.setObj(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delJcxmById.htm"}, method = {RequestMethod.POST})
  public void delJcxmById(HttpServletResponse response, HttpServletRequest request, Jcxm jcxm) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "删除检查项目";
    try {
      this.jcxmService.delJcxmById(jcxm.getId());
      JcxmFenlei delete_jcxmfenlei = new JcxmFenlei();
      delete_jcxmfenlei.setJcxmId(jcxm.getId());
      this.jcxmFenleiService.deleteJcxmFenlei(delete_jcxmfenlei);
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
    result.setObj(jcxm);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findByCategory.htm"}, method = {RequestMethod.POST})
  public void findByCategory(Long categoryId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据类别获取所属检查项目");
    List<Jcxm> rs = this.jcxmService.findJcxmByCatetory(categoryId);
    if (rs != null && rs.size() > 0) {
      result.setObj(rs);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcxmListByGonghao.htm"}, method = {RequestMethod.POST})
  public void getJcxmListByGonghao(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<Jcxm> list = null;
    this.doing = "根据员工工号获取对应的检查项目";
    try {
      int bumenId = 0;
      YuanGong yuangong = this.yuanGongService
        .obtainYuanGongByGonghao(gonghao);
      if (yuangong != null)
        bumenId = yuangong.getBumenId().intValue(); 
      list = this.jcxmService.getJcxmListByBmid(bumenId);
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
    result.setObj(list);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcxmById.htm"}, method = {RequestMethod.POST})
  public void getJcxmById(HttpServletRequest request, HttpServletResponse response, Jcxm jcxm) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据检查项目ID获取检查项目信息";
    try {
      jcxm = this.jcxmService.getJcxmById(jcxm.getId());
      if (jcxm.getLeftPicPath() != null && 
        !jcxm.getLeftPicPath().equals("")) {
        jcxm.setLeftPicPath(jcxm.getLeftPicPath());
      } else {
        jcxm.setLeftPicPath("");
      } 
      if (jcxm.getRightPicPath() != null && 
        !jcxm.getRightPicPath().equals("")) {
        jcxm.setRightPicPath(jcxm.getRightPicPath());
      } else {
        jcxm.setRightPicPath("");
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
    result.setObj(jcxm);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"/upLoadLeftOrRightPic.htm"})
  public void upLoadLeftOrRightPic(HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    Jcxm jcxm = new Jcxm();
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile file_leftPicPath = multipartRequest
      .getFile("file_leftPicPath");
    MultipartFile file_rightPicPath = multipartRequest
      .getFile("file_rightPicPath");
    String path_leftPicPath = "";
    String path_rightPicPath = "";
    MyResult result = new MyResult();
    this.doing = "检查项目左眼右眼图片上传操作";
    try {
      String name_leftPicPath = FileUpOrDownLoad.doFileUpLoad(
          file_leftPicPath, request.getSession().getServletContext()
          .getRealPath(this.path_jcxmUpLoad));
      if (name_leftPicPath != null && !name_leftPicPath.equals(""))
        path_leftPicPath = String.valueOf(this.path_jcxmUpLoad) + 
          System.getProperty("file.separator") + 
          name_leftPicPath; 
      String name_rightPicPath = FileUpOrDownLoad.doFileUpLoad(
          file_rightPicPath, request.getSession().getServletContext()
          .getRealPath(this.path_jcxmUpLoad));
      if (name_rightPicPath != null && !name_rightPicPath.equals(""))
        path_rightPicPath = String.valueOf(this.path_jcxmUpLoad) + 
          System.getProperty("file.separator") + 
          name_rightPicPath; 
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      path_leftPicPath = "";
      path_rightPicPath = "";
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    jcxm.setLeftPicPath(path_leftPicPath);
    jcxm.setRightPicPath(path_rightPicPath);
    result.setObj(jcxm);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmsByJcxm.htm"}, method = {RequestMethod.POST})
  public void findJcxmsByJcxm(HttpServletRequest request, HttpServletResponse response, Jcxm jcxm) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<Jcxm> jcxms = new ArrayList<>();
    this.doing = "据检查项目查询符合条件的检查项目集合";
    try {
      jcxms = this.jcxmService.findJcxmsByJcxm(jcxm);
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
    result.setObj(jcxms);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmsByBmId.htm"}, method = {RequestMethod.POST})
  public void findJcxmsByBmId(HttpServletRequest request, HttpServletResponse response, SheBei shebei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<Jcxm> jcxms = new ArrayList<>();
    this.doing = "根据部门ID，查询该部门下所有可以做的检查项目";
    try {
      List<SheBei> shebeis = new ArrayList<>();
      shebeis = this.sheBeiService.getShebeisBySheBei(shebei);
      String jcxmIds = "-1";
      for (SheBei object_shebei : shebeis) {
        if (object_shebei.getJcxmIds() != null && 
          !"".equals(object_shebei.getJcxmIds()))
          jcxmIds = String.valueOf(jcxmIds) + "," + object_shebei.getJcxmIds(); 
      } 
      jcxms = this.jcxmService.findJcxmsByIds(jcxmIds);
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
    result.setObj(jcxms);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmsBySheBeiId.htm"}, method = {RequestMethod.POST})
  public void findJcxmsBySheBeiId(HttpServletRequest request, HttpServletResponse response, SheBei shebei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<Jcxm> jcxms = new ArrayList<>();
    this.doing = "根据设备ID，查询该设备下可以做的检查项目";
    try {
      shebei = this.sheBeiService.findSheBeiById(shebei.getId());
      String jcxmIds = "-1";
      if (shebei.getJcxmIds() != null && 
        !"null".equals(shebei.getJcxmIds()) && 
        !"".equals(shebei.getJcxmIds()))
        jcxmIds = String.valueOf(jcxmIds) + "," + shebei.getJcxmIds(); 
      jcxms = this.jcxmService.findJcxmsByIds(jcxmIds);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      jcxms = new ArrayList<>();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(jcxms);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcxmListByBgsId.htm"}, method = {RequestMethod.POST})
  public void getJcxmListByBgsId(HttpServletRequest request, HttpServletResponse response, int bgsId) {
    MyResult result = new MyResult();
    result.setDoing("根据办公室Id获取所属检查项目");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List<Jcxm> jcxmlist = this.jcxmService.getJcxmListByBgsId(bgsId);
    if (jcxmlist != null && jcxmlist.size() > 0) {
      result.setObj(jcxmlist);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmList.htm"}, method = {RequestMethod.POST})
  public void findJcxmList(Page page, Integer categoryId, Integer bgsId, String search, String cyxm, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("查询项目清单");
    try {
      List<Jcxm> list = this.jcxmService.findJcxmList(page, categoryId, bgsId, search, cyxm);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmsByGH.htm"}, method = {RequestMethod.POST})
  public void findJcxmsByGH(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<Jcxm> jcxms = new ArrayList<>();
    this.doing = "根据员工工号所有可以做的检查项目";
    try {
      jcxms = this.jcxmService.findJcxmsByGH(gonghao);
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
    result.setObj(jcxms);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
