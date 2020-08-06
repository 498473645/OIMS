package cn.com.oims.web.controller;

import cn.com.oims.common.CheckTeleFormat;
import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.service.IBanGongShiService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.BanGongShiSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
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
@RequestMapping({"bangongshi"})
public class BanGongShiController {
  private String path_wztpUpLoad = "/UpLoad_Bgs";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IBanGongShiService banGongShiService = null;
  
  @RequestMapping(value = {"/findAllBanGongShiByPage.htm"}, method = {RequestMethod.POST})
  public void findAllBanGongShiByPage(HttpServletRequest request, HttpServletResponse response, Page page, BanGongShiSearchForm bgs) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "分页查询办公室信息";
    try {
      map = this.banGongShiService.findAllBanGongShi4Page(page, bgs);
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
  
  @RequestMapping(value = {"/findAllBanGongShi.htm"}, method = {RequestMethod.POST})
  public void findAllBanGongShi(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "查询所有办公室信息（科室信息）";
    result.setDoing(this.doing);
    List list = null;
    try {
      list = this.banGongShiService.findAllBanGongShi();
      if (list != null) {
        result.setState(1);
        result.setObj(list);
        result.setMessage("成功");
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getBanGongShiById.htm"}, method = {RequestMethod.POST})
  public void getBanGongShiById(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "查询所有检查项目信息";
    BanGongShi bangongshi = new BanGongShi();
    try {
      bangongshi = this.banGongShiService.getBanGongShiById(Integer.valueOf(id));
      String path = request.getSession().getServletContext()
        .getRealPath("/");
      String wztppath = bangongshi.getWztp();
      if (CheckTeleFormat.checkFileName(String.valueOf(path) + wztppath)) {
        bangongshi.setWztp(wztppath);
      } else {
        bangongshi.setWztp("");
      } 
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      bangongshi = new BanGongShi();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(bangongshi);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/bgsIsExist.htm"}, method = {RequestMethod.POST})
  public void bgsIsExist(HttpServletRequest request, HttpServletResponse response, String bgs) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    this.doing = "判断办公室名称是否存在，在添加办公室的时候进行判断验证(整理)";
    BanGongShi bangongshi = null;
    try {
      bangongshi = this.banGongShiService.findBanGongShiByBgs(bgs);
      if (bangongshi != null) {
        this.doState = 1;
        this.message = "操作成功（数据库中存在该办公室名称）";
      } else {
        this.doState = 0;
        this.message = "操作成功（数据库中不存在该办公室名称）";
      } 
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(bangongshi);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/addBanGongShi.htm"}, method = {RequestMethod.POST})
  public void saveBanGongShi(HttpServletRequest request, HttpServletResponse response, BanGongShi bangongshi) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_wztp = multipartRequest.getFile("url_wztp");
    this.doing = "办公室信息新增";
    try {
      String string_wztp = FileUpOrDownLoad.doFileUpLoad(
          url_wztp, 
          request.getSession().getServletContext()
          .getRealPath(this.path_wztpUpLoad));
      if (string_wztp != null)
        bangongshi.setWztp(String.valueOf(this.path_wztpUpLoad) + File.separator + 
            string_wztp); 
      this.banGongShiService.saveBanGongShi(bangongshi);
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
    result.setObj(bangongshi);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    result.setObj(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/DelBanGongShi.htm"}, method = {RequestMethod.POST})
  public void delBanGongShi(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据办公室ID主键删除办公室信息";
    try {
      this.banGongShiService.delBanGongShiById(Integer.valueOf(id));
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
  
  @RequestMapping(value = {"/updateBanGongShi.htm"}, method = {RequestMethod.POST})
  public void updateBanGongShi(HttpServletRequest request, HttpServletResponse response, BanGongShi bangongshi) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_wztp = multipartRequest.getFile("url_wztp");
    this.doing = "修改办公室信息";
    try {
      String string_wztp = FileUpOrDownLoad.doFileUpLoad(
          url_wztp, 
          request.getSession().getServletContext()
          .getRealPath(this.path_wztpUpLoad));
      if (string_wztp != null) {
        bangongshi.setWztp(String.valueOf(this.path_wztpUpLoad) + File.separator + 
            string_wztp);
      } else {
        BanGongShi bangongshiselect = this.banGongShiService
          .getBanGongShiById(bangongshi.getId());
        bangongshi.setWztp(bangongshiselect.getWztp());
      } 
      this.banGongShiService.updateBanGongShi(bangongshi);
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
    result.setObj(bangongshi);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    result.setObj(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllBanGongShiByBuMenInfo.htm"}, method = {RequestMethod.POST})
  public void findAllBanGongShiByBuMenID(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据部门ID查询该部门下所有的办公室返回办公室名称字符串";
    String string = "";
    try {
      List<BanGongShi> list = this.banGongShiService.findAllBanGongShiByBuMenID(id);
      for (int i = 0; i < list.size(); i++) {
        BanGongShi bangongshi = list.get(i);
        if (i + 1 == list.size()) {
          string = String.valueOf(string) + bangongshi.getBgs();
        } else {
          string = String.valueOf(string) + bangongshi.getBgs() + ",";
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
    result.setGonghao(gonghao);
    result.setObj(string);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllBanGongShiByBuMenID.htm"}, method = {RequestMethod.POST})
  public void findAllBanGongShiByBuMenChange(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据检查项目ID查询相关的项目归类信息";
    List bangongshis = new ArrayList();
    try {
      bangongshis = this.banGongShiService.findAllBanGongShiByBuMenID(id);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(bangongshis);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"/upLoadWzTp.htm"})
  public void upLoadBgsWzTpPic(HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    BanGongShi bgs = new BanGongShi();
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile bgs_WzTp = multipartRequest.getFile("url_wztp");
    String bgs_WzYpPath = "";
    MyResult result = new MyResult();
    this.doing = "位置图片上传操作";
    try {
      String name_bgsPicPath = FileUpOrDownLoad.doFileUpLoad(
          bgs_WzTp, 
          request.getSession().getServletContext()
          .getRealPath(this.path_wztpUpLoad));
      if (name_bgsPicPath != null && !name_bgsPicPath.equals(""))
        bgs_WzYpPath = String.valueOf(this.path_wztpUpLoad) + 
          System.getProperty("file.separator") + 
          name_bgsPicPath; 
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      bgs_WzYpPath = "";
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    bgs.setWztp(bgs_WzYpPath);
    result.setObj(bgs);
    this.oimsLogService.saveOimsLog(result, 
        2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
