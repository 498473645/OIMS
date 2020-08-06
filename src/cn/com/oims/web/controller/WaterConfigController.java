package cn.com.oims.web.controller;

import cn.com.oims.common.CheckTeleFormat;
import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.dao.pojo.Waterconfig;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IWaterService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
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

@Controller
@RequestMapping({"water"})
public class WaterConfigController {
  private String path_water = "/water_photos";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IWaterService waterService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @RequestMapping({"add.htm"})
  public void addWaterConfig(Waterconfig waterconfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String ytName = request.getParameter("ytPath");
    String slName = request.getParameter("slPath");
    waterconfig.setWfilename(ytName);
    waterconfig.setWthumbfilename(slName);
    MyResult result = new MyResult();
    this.doing = "水印配置信息新增";
    try {
      this.waterService.add(waterconfig);
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
  
  @RequestMapping(value = {"findAll.htm"}, method = {RequestMethod.POST})
  public void findAll(Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "分页查询输入模版信息";
    try {
      List list = this.waterService.findAll(new Waterconfig(), page);
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
  
  @RequestMapping(value = {"deleteWaterconfigById.htm"}, method = {RequestMethod.POST})
  public void dels(Waterconfig waterconfig, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据主键删除水印配置信息";
    try {
      this.waterService.deleteWaterconfigById(waterconfig.getId());
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
  
  @RequestMapping(value = {"update.htm"}, method = {RequestMethod.POST})
  public void update(Waterconfig waterconfig, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String ytName = request.getParameter("ytPath");
    String slName = request.getParameter("slPath");
    waterconfig.setWfilename(ytName);
    waterconfig.setWthumbfilename(slName);
    MyResult result = new MyResult();
    this.doing = "水印配置信息修改";
    try {
      this.waterService.update(waterconfig);
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
  
  @RequestMapping(value = {"getById.htm"}, method = {RequestMethod.POST})
  public void getById(Waterconfig waterconfig, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据主键ID查询水印配置信息";
    try {
      waterconfig = this.waterService.getById(waterconfig.getId());
      String path = request.getSession().getServletContext()
        .getRealPath("/");
      String wfilename = waterconfig.getWfilename();
      if (CheckTeleFormat.checkFileName(String.valueOf(path) + wfilename)) {
        waterconfig.setWfilename(wfilename);
      } else {
        waterconfig.setWfilename("");
      } 
      String wthumbfilename = waterconfig.getWthumbfilename();
      if (CheckTeleFormat.checkFileName(String.valueOf(path) + wthumbfilename)) {
        waterconfig.setWthumbfilename(wthumbfilename);
      } else {
        waterconfig.setWthumbfilename("");
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
    result.setObj(waterconfig);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"fileUpload.htm"}, method = {RequestMethod.POST})
  public void fileUpload(MultipartFile oimsUpload, String uploadTag, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String path = "";
    MyResult result = new MyResult();
    this.doing = "水印图片上传操作";
    try {
      String name = FileUpOrDownLoad.doFileUpLoad(oimsUpload, request
          .getSession().getServletContext().getRealPath(this.path_water));
      if (name != null && !name.equals(""))
        path = String.valueOf(this.path_water) + System.getProperty("file.separator") + name; 
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      path = "";
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(path);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
