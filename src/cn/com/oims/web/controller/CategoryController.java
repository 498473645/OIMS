package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Category;
import cn.com.oims.service.ICategoryService;
import cn.com.oims.service.IOimsLogService;
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
@RequestMapping({"category"})
public class CategoryController {
  private static final int level_log_select = 1;
  
  private static final int level_log_save = 2;
  
  private static final int level_log_update = 2;
  
  private static final int level_log_delete = 2;
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private ICategoryService categoryService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @RequestMapping(value = {"/findCategorysByFatherId.htm"}, method = {RequestMethod.POST})
  public void findCategorysByFatherId(HttpServletResponse response, HttpServletRequest request, Category category) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据fatherid查询该fatherid下所有的码表信息";
    List categorys = new ArrayList();
    try {
      categorys = this.categoryService.findCategorysByFatherId(category.getFatherid());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(categorys);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getCategoryById.htm"}, method = {RequestMethod.POST})
  public void getCategoryById(HttpServletResponse response, HttpServletRequest request, Category category) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据主键ID查询分类实体对象";
    try {
      category = this.categoryService.getCategoryById(category.getId());
      this.message = "操作成功";
      this.doState = 1;
    } catch (Exception e) {
      e.printStackTrace();
      this.message = "操作失败";
      this.doState = 0;
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(category);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findCategoriesOfJcxmflByPageAndCategory.htm"}, method = {RequestMethod.POST})
  public void findCategoriesOfJcxmflByPageAndCategory(HttpServletResponse response, HttpServletRequest request, Page page, Category category) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "分页查询检查项目分类信息";
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.categoryService.findCategoriesOfJcxmflByPageAndCategory(page, category);
      this.message = "操作成功";
      this.doState = 1;
    } catch (Exception e) {
      e.printStackTrace();
      this.message = "操作失败";
      this.doState = 0;
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(map);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/saveCategory.htm"}, method = {RequestMethod.POST})
  public void saveCategory(HttpServletResponse response, HttpServletRequest request, Category category) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "新增分类信息";
    try {
      this.categoryService.saveCategory(category);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(null);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateCategory.htm"}, method = {RequestMethod.POST})
  public void updateCategory(HttpServletResponse response, HttpServletRequest request, Category category) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "修改检查项目分类信息";
    try {
      this.categoryService.updateCategory(category);
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
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delCategoryById.htm"}, method = {RequestMethod.POST})
  public void delCategoryById(HttpServletResponse response, HttpServletRequest request, Category category) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "删除检查项目分类信息";
    try {
      this.categoryService.delCategoryById(category.getId());
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
  
  @RequestMapping(value = {"/findChildren.htm"}, method = {RequestMethod.POST})
  public void findChildren(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取类别子类");
    List<Category> cs = this.categoryService.findCategorysByFather(id);
    if (cs != null && cs.size() > 0) {
      result.setObj(cs);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findCategoryByFatherId.htm"}, method = {RequestMethod.GET})
  public void findCategoryByFatherId(Long fatherId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据FATHERID查询分类");
    try {
      List<Map<String, Object>> cs = this.categoryService.findCategoryByFatherId(fatherId);
      result.setState(1);
      result.setObj(cs);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
