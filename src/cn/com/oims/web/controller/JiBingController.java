package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.JiBing;
import cn.com.oims.service.ICategoryService;
import cn.com.oims.service.IJiBingService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.utils.Cn2Spell;
import cn.com.oims.web.form.JiBingSearchForm;
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

@Controller
@RequestMapping({"jibing"})
public class JiBingController {
  @Autowired
  private IOimsLogService oimsLogService = null;
  
  @Autowired
  private IJiBingService jiBingService = null;
  
  @Autowired
  private ICategoryService categoryService;
  
  private String doing = "";
  
  private String message = "";
  
  private Integer doState = Integer.valueOf(1);
  
  @RequestMapping({"/findAllJiBingByPage.htm"})
  public void findAllJiBingByPage(HttpServletRequest request, HttpServletResponse response, Page page, JiBingSearchForm jbsf) {
    MyResult result = new MyResult();
    result.setDoing("分页查询疾病信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.jiBingService.findAllJiBing4Page(page, jbsf);
      if (map != null) {
        result.setState(1);
        result.setObj(map);
        result.setMessage("成功");
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getJiBingById.htm"}, method = {RequestMethod.POST})
  public void getJiBingById(HttpServletRequest request, HttpServletResponse response, String id) {
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request
      .getSession().getAttribute("gonghao").toString() : 
      null;
    MyResult result = new MyResult();
    this.doing = "根据id查询疾病信息";
    JiBing jb = null;
    try {
      jb = this.jiBingService.findJiBingById(Integer.valueOf(Integer.parseInt(id)));
      this.doState = Integer.valueOf(1);
      this.message = "成功";
    } catch (Exception e) {
      this.doState = Integer.valueOf(0);
      this.message = "失败";
      e.printStackTrace();
    } 
    result.setObj(jb);
    result.setState(this.doState.intValue());
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/addJiBing.htm"}, method = {RequestMethod.POST})
  public void saveJiBing(HttpServletRequest request, HttpServletResponse response, JiBing jb) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "新增疾病";
    try {
      jb.setInputUser(gonghao);
      result.setObj(this.jiBingService.saveJiBing(jb));
      this.doState = Integer.valueOf(1);
      this.message = "保存成功！";
    } catch (Exception e) {
      this.doState = Integer.valueOf(0);
      this.message = "保存失败！";
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    result.setDoing(this.doing);
    result.setMessage(this.message);
    result.setState(this.doState.intValue());
    this.oimsLogService.saveOimsLog(result, 
        2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delJiBing.htm"}, method = {RequestMethod.POST})
  public void delJiBing(HttpServletRequest request, HttpServletResponse response, int id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "删除疾病信息";
    try {
      this.jiBingService.delJiBing(Integer.valueOf(id));
      this.doState = Integer.valueOf(1);
      this.message = "删除成功！";
    } catch (Exception e) {
      this.doState = Integer.valueOf(0);
      this.message = "删除失败！";
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    result.setDoing(this.doing);
    result.setMessage(this.message);
    result.setState(this.doState.intValue());
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateJiBing.htm"}, method = {RequestMethod.POST})
  public void updateJiBing(HttpServletRequest request, HttpServletResponse response, JiBing jb) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "修改疾病信息";
    try {
      jb.setInputUser(gonghao);
      this.jiBingService.updateJiBing(jb);
      this.doState = Integer.valueOf(1);
      this.message = "修改成功";
    } catch (Exception e) {
      this.message = "失败";
      this.doState = Integer.valueOf(0);
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    result.setDoing(this.doing);
    result.setMessage(this.message);
    result.setState(this.doState.intValue());
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findDiseases.htm"}, method = {RequestMethod.POST})
  public void findDiseasesCategory(Integer fatherId, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取疾病子类列表");
    try {
      List<JiBing> list = this.jiBingService.findDiseasesByFather(fatherId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage("OIMSERR_10002");
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/compositeTemplateSearchDiseasesByPY.htm"}, method = {RequestMethod.POST})
  public void compositeTemplateSearchDiseasesByPY(HttpServletRequest request, HttpServletResponse response, String fatherId, String pinyin) {
    MyResult mr = new MyResult();
    try {
      List<JiBing> list = this.jiBingService
        .compositeTemplateSearchDiseasesByPY(fatherId, pinyin);
      for (JiBing jb : list)
        System.out.println(jb.getDisease()); 
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findMyDiseases.htm"}, method = {RequestMethod.POST})
  public void findDiseases(String search, Integer categoryId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    MyResult result = new MyResult();
    result.setDoing("获取疾病诊断信息");
    try {
      result.setObj(this.jiBingService.findDiseaseByGonghao(
            (String)session.getAttribute("gonghao"), categoryId, 
            search));
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delCategoryAndDiseaseById.htm"}, method = {RequestMethod.POST})
  public void delCategoryAndDiseaseById(Category category, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "删除制定分类下的所有的分类以及对应的疾病";
    try {
      this.jiBingService.delCategoryAndDiseaseById(category.getId());
      this.doState = Integer.valueOf(1);
      this.message = "删除成功！";
    } catch (Exception e) {
      this.doState = Integer.valueOf(0);
      this.message = "删除失败！";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState.intValue());
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/validateIsExistNextLevel.htm"}, method = {RequestMethod.POST})
  public void validateIsExistNextLevel(Integer id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    this.message = "";
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "验证该节点是否存在子节点";
    try {
      List<Category> categories = this.categoryService
        .findCategorysByFather(id);
      if (categories.size() > 0) {
        this.message = "存在子分类,是否删除该分类下的所有的子分类以及疾病";
      } else {
        List<JiBing> jiBings = this.jiBingService
          .findDiseasesByCategory(id);
        if (jiBings.size() > 0)
          this.message = "该分类下存在疾病，是否删除该分类下的所有的疾病"; 
      } 
      this.doState = Integer.valueOf(1);
    } catch (Exception e) {
      this.message = "验证失败";
      this.doState = Integer.valueOf(0);
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState.intValue());
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"updateJIBINGPinyin.htm"}, method = {RequestMethod.GET})
  public void deleteAllChufang(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据疾病名称修改相应的拼音！");
    try {
      List<JiBing> list = this.jiBingService.findAllDiseases();
      for (JiBing jibing : list) {
        String name = jibing.getDisease();
        String pinyin = Cn2Spell.toUpperCaseByOne(Cn2Spell.converterToFirstSpell(name));
        pinyin = pinyin.toUpperCase();
        jibing.setPinyin(pinyin);
        this.jiBingService.updateJiBing(jibing);
      } 
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
