package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Category;
import cn.com.oims.service.ICategoryService;
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
@RequestMapping({"oimsCategory"})
public class OimsCategoryController {
  private ICategoryService categoryService;
  
  @Autowired
  public void setCategoryService(ICategoryService categoryService) {
    this.categoryService = categoryService;
  }
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @RequestMapping(value = {"/findCategories.htm"}, method = {RequestMethod.GET})
  public void findOimsCategory(Integer fatherId, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取子类列表");
    try {
      List<Category> list = this.categoryService.findCategorysByFather(fatherId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage("OIMSERR_10002");
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveOimsCategory"}, method = {RequestMethod.POST})
  public void saveOrUpdateOimsCategory(Category category, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("修改或保存疾病分类");
    try {
      this.categoryService.saveOrUpdateCategory(category);
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
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getOimsCategoryById"}, method = {RequestMethod.POST})
  public void getOimsCategoryById(Category category, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("根据id获取疾病分类");
    try {
      category = this.categoryService.getCategoryById(category.getId());
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
    result.setObj(category);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
