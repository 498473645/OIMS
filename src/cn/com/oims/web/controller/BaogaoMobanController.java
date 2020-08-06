package cn.com.oims.web.controller;

import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.dao.pojo.BaogaoMoban;
import cn.com.oims.service.IBaogaoMobanService;
import cn.com.oims.service.IOimsLogService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping({"baogaomoban"})
public class BaogaoMobanController implements ServletContextAware {
  private String path_baoGaoMoBanUpLoad = "/UpLoad_baogaomoban";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IBaogaoMobanService baoGaoMoBanService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  private ServletContext servletContext;
  
  public void setServletContext(ServletContext servletContext) {
    this.servletContext = servletContext;
  }
  
  @RequestMapping(value = {"/findAllBaogaoMobans.htm"}, method = {RequestMethod.POST})
  public void findAllBaogaoMobans(HttpServletResponse response, HttpServletRequest request, Page page) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<BaogaoMoban> baogaomobans = new ArrayList<>();
    this.doing = "查询所有报告模板信息";
    try {
      baogaomobans = this.baoGaoMoBanService.findAllBaogaoMobans();
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(baogaomobans);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllBaogaoMobansByPage.htm"}, method = {RequestMethod.POST})
  public void findAllBaogaoMobansByPage(HttpServletResponse response, HttpServletRequest request, Page page, BaogaoMoban baogaomoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "报告模版列表分页查询";
    try {
      map = this.baoGaoMoBanService.findAllBaogaoMobansByPage(page, 
          baogaomoban);
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
  
  @RequestMapping(value = {"/delBaogaoMoban.htm"}, method = {RequestMethod.POST})
  public void delBaogaoMoban(HttpServletResponse response, HttpServletRequest request, BaogaoMoban baogaomoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "报告模版删除操作";
    try {
      this.baoGaoMoBanService.delBaogaoMobanById(baogaomoban.getId());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(null);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"/saveBaogaoMoban.htm"})
  public void saveBaogaoMoban(HttpServletResponse response, HttpServletRequest request, BaogaoMoban baogaomoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    baogaomoban.setGonghao(gonghao);
    baogaomoban.setCategoryId(new Integer(0));
    MyResult result = new MyResult();
    this.doing = "报告模版新增操作";
    try {
      this.baoGaoMoBanService.saveBaogaoMoban(baogaomoban);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(null);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"/upLoadBaogaoMoban.htm"})
  public void upLoadBaogaoMoban(HttpServletResponse response, HttpServletRequest request, BaogaoMoban baogaomoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile file = multipartRequest.getFile("url_moban");
    String path_inZip = "";
    MyResult result = new MyResult();
    this.doing = "报告模版上传操作";
    try {
      String name_inZip = FileUpOrDownLoad.doFileUpLoad(
          file, 
          request.getSession().getServletContext()
          .getRealPath(this.path_baoGaoMoBanUpLoad));
      if (name_inZip != null)
        path_inZip = 
          String.valueOf(request.getSession().getServletContext().getRealPath(this.path_baoGaoMoBanUpLoad)) + 
          File.separator + name_inZip; 
      this.doState = 1;
      this.message = "报告模版上传操作成功";
    } catch (Exception e) {
      path_inZip = "";
      this.doState = 0;
      this.message = "报告模版上传操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(path_inZip);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"/updateBaogaoMoban.htm"})
  public void updateBaogaoMoban(HttpServletResponse response, HttpServletRequest request, BaogaoMoban baogaomoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    baogaomoban.setGonghao(gonghao);
    baogaomoban.setCategoryId(new Integer(0));
    MyResult result = new MyResult();
    this.doing = "报告模版修改操作";
    try {
      this.baoGaoMoBanService.updateBaogaoMoban(baogaomoban);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(null);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/openBaogaoMobanRarOfUpLoad.htm"}, method = {RequestMethod.POST})
  public void openBaogaoMobanRarOfUpLoad(HttpServletResponse response, HttpServletRequest request) {
    String moban_html = "";
    String path_inZip = request.getParameter("path_inZip");
    MyResult result = new MyResult();
    this.doing = "打开上传报告模版rar";
    try {
      File file_inZip = new File(path_inZip);
      if (file_inZip.exists()) {
        String format_zip = path_inZip.substring(path_inZip
            .lastIndexOf(".") + 1);
        if ("zip" == format_zip || "zip".endsWith(format_zip)) {
          ZipFile zipFile = new ZipFile(file_inZip);
          Enumeration<? extends ZipEntry> enumeration = zipFile.entries();
          while (enumeration
            .hasMoreElements()) {
            ZipEntry zipEntry = enumeration
              .nextElement();
            if (zipEntry.isDirectory())
              continue; 
            String zipEntryName = zipEntry.getName();
            String format_file = zipEntryName
              .substring(zipEntryName.lastIndexOf(".") + 1);
            if ("html" == format_file || 
              "html".endsWith(format_file)) {
              BufferedReader bufferedReader = new BufferedReader(
                  new InputStreamReader(
                    zipFile.getInputStream(zipEntry), 
                    "UTF-8"));
              while (bufferedReader.ready())
                moban_html = String.valueOf(moban_html) + bufferedReader.readLine(); 
            } 
          } 
        } 
      } else {
        moban_html = "文件上传路径存在问题，请设置IE,或者报告模板ZIP存在问题";
      } 
    } catch (Exception e) {
      this.doState = 0;
      moban_html = "模版内容错误";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(moban_html);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getBaogaoMobanById.htm"}, method = {RequestMethod.POST})
  public void getBaogaoMobanById(HttpServletResponse response, HttpServletRequest request, BaogaoMoban baogaomoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据报告模板ID查询报告模板对象";
    try {
      baogaomoban = this.baoGaoMoBanService
        .getBaogaoMobanById(baogaomoban.getId());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      baogaomoban = new BaogaoMoban();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(baogaomoban);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findBaogaoMobansByBaogaoMoban.htm"}, method = {RequestMethod.POST})
  public void findBaogaoMobansByBaogaoMoban(HttpServletResponse response, HttpServletRequest request, BaogaoMoban baogaomoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<BaogaoMoban> baogaomobans = new ArrayList<>();
    this.doing = "根据报告模板对象查询符合条件的报告模板对象";
    try {
      baogaomobans = this.baoGaoMoBanService
        .findBaogaoMobansByBaogaoMoban(baogaomoban);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(baogaomobans);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
