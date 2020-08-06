package cn.com.oims.web.controller;

import cn.com.oims.common.ExcelAnalysis;
import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.dao.pojo.Yhpz;
import cn.com.oims.dao.pojo.YuYan;
import cn.com.oims.service.IYuYanService;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping({"yuyan"})
public class YuYanController {
  private int doState = 1;
  
  private String doing = "";
  
  private String doResult = "";
  
  private String path_yuyan = "D:\\YuYanUpLoad";
  
  @Autowired
  private IYuYanService yuYanService;
  
  @RequestMapping({"/demo/pageListUseDemo.htm"})
  public void pageListUseDemo(HttpServletResponse response, Page page) {
    System.out
      .println("===================================分页控件的使用方法===================================");
    List<YuYan> yuyans = new ArrayList<>();
    Map<String, Object> map = new HashMap<>();
    try {
      yuyans = this.yuYanService.findYuYansByPage(page);
      System.out.println("yuyans.size()" + yuyans.size());
      System.out.println("开始粘贴");
      List<YuYan> yuyanljy = this.yuYanService.findYuYansByPage(null);
      System.out.println("结束粘贴");
    } catch (Exception e) {
      e.printStackTrace();
    } 
    map.put("list", yuyans);
    map.put("page", page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping({"/findAllYuYansByPageAndYuYan.htm"})
  public void findAllYuYansByPageAndYuYan(HttpServletResponse response, Page page, YuYan yuyan) {
    Map<String, Object> map = this.yuYanService
      .findAllYuYansByPageAndYuYan(page, yuyan);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/deleteYuYanByIdAndFenLei.htm"}, method = {RequestMethod.POST})
  public void deleteYuYanByIdAndFenLei(HttpServletResponse response, YuYan yuyan) {
    MyResult result = new MyResult();
    this.doing = "系统语言配置信息删除操作";
    try {
      this.yuYanService.deleteYuYanByIdAndFenLei(yuyan.getId(), 
          yuyan.getFenlei());
      this.doState = 1;
      this.doResult = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.doResult = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(this.doResult);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveYuYan.htm"}, method = {RequestMethod.POST})
  public void saveYuYan(HttpServletRequest request, HttpServletResponse response, YuYan yuyan) {
    MyResult result = new MyResult();
    this.doing = "系统语言配置信息新增操作";
    try {
      this.yuYanService.saveYuYan(yuyan);
      this.doState = 1;
      this.doResult = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.doResult = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(this.doResult);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateYuYan.htm"}, method = {RequestMethod.POST})
  public void updateYuYan(HttpServletRequest request, HttpServletResponse response, YuYan yuyan) {
    MyResult result = new MyResult();
    this.doing = "系统语言配置信息修改操作";
    try {
      this.yuYanService.updateYuYan(yuyan);
      this.doState = 1;
      this.doResult = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.doResult = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(this.doResult);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findYuYanByIdAndFenLei.htm"}, method = {RequestMethod.GET})
  public void findYuYanByIdAndFenLei(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("");
    String yuyanId = request.getParameter("id");
    YuYan yuyan = null;
    Yhpz config = (Yhpz)request.getSession().getAttribute("userConfig");
    if (yuyanId != null) {
      yuyan = this.yuYanService.findYuYanByIdAndFenLei(
          Integer.valueOf(Integer.parseInt(yuyanId)), Integer.valueOf(24));
      if (yuyan != null) {
        result.setObj(yuyan.getWenzi());
        result.setState(1);
      } 
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllYuYansByYuYan.htm"}, method = {RequestMethod.POST})
  public void findAllYuYansByYuYan(HttpServletRequest request, HttpServletResponse response, YuYan yuyan) {
    MyResult result = new MyResult();
    List<YuYan> yuyans = new ArrayList<>();
    this.doing = "根据语言对象查询符合条件的语言集合";
    try {
      yuyans = this.yuYanService.findAllYuYansByYuYan(yuyan);
      this.doState = 1;
      this.doResult = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.doResult = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(yuyans);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"/importYuYans.htm"})
  public void importYuYans(HttpServletResponse response, HttpServletRequest request) {
    this.doing = "系统语言信息导入";
    MyResult result = new MyResult();
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile file_url_excel_yuyan = multipartRequest
      .getFile("url_excel_yuyan");
    try {
      String string_path_yuyan = FileUpOrDownLoad.doFileUpLoad(
          file_url_excel_yuyan, this.path_yuyan);
      List<YuYan> yuyans = ExcelAnalysis.exportYuYanToExcel(String.valueOf(this.path_yuyan) + 
          File.separator + string_path_yuyan);
      for (YuYan y : yuyans)
        this.yuYanService.saveOrUpdateYuYan(y); 
      this.doState = 1;
      this.doResult = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.doResult = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllYuYansByIdsAndFenlei.htm"}, method = {RequestMethod.POST})
  public void findAllYuYansByIdsAndFenlei(HttpServletRequest request, HttpServletResponse response, String ids, Integer fenlei) {
    MyResult result = new MyResult();
    List<YuYan> yuyans = new ArrayList<>();
    this.doing = "根据语言IDS和语言分类查询符合条件的语言集合";
    try {
      yuyans = this.yuYanService.findAllYuYansByIdsAndFenlei(ids, fenlei);
      this.doState = 1;
      this.doResult = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.doResult = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(yuyans);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
