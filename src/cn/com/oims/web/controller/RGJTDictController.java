package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.RGJTChangjia;
import cn.com.oims.dao.pojo.RGJTCjtglx;
import cn.com.oims.dao.pojo.RGJTCrklx;
import cn.com.oims.dao.pojo.RGJTPanleixing;
import cn.com.oims.dao.pojo.RGJTXinghao;
import cn.com.oims.service.IRGJTDictService;
import cn.com.oims.web.form.RGJTSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"rgjtDict"})
public class RGJTDictController {
  @Autowired
  private IRGJTDictService dictService;
  
  @RequestMapping(value = {"saveOrUpdateRGJTChangjia.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateRGJTChangjia(RGJTChangjia cj, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存人工晶体生产厂家");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.saveOrUpdateRGJChangjia(cj);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findRGJCTChangjiaPageList.htm"}, method = {RequestMethod.POST})
  public void findRGJCTChangjiaPageList(String code, Integer category, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.dictService.findRGJTChangjia(code, page, category);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"getRGJCTChangjia.htm"}, method = {RequestMethod.GET})
  public void getRGJTChangjia(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存人工晶体生产厂家");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      RGJTChangjia cj = this.dictService.getRGJTChangjia(id);
      result.setObj(cj);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteRGJTChangjia.htm"}, method = {RequestMethod.POST})
  public void deleteRGJTChangjia(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除人工晶体生产厂家");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.deleteRGJTChangjia(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateRGJTXinhao.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateRGJTXinhao(RGJTXinghao xinghao, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存人工晶体型号");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.saveOrUpdateRGJTXinghao(xinghao);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findRGJTXinhaoPageList.htm"}, method = {RequestMethod.POST})
  public void findRGJTXinhaoPageList(String code, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.dictService.findRGJTXinhaoPageList(code, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"deleteRGJTXinhao.htm"}, method = {RequestMethod.POST})
  public void deleteRGJTXinhao(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除人工晶体生产型号");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.deleteRGJTXinhao(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateRGJTPlx.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateRGJTPlx(RGJTPanleixing plx, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存人工晶体襻类型");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.saveOrUpdateRGJTPanleixing(plx);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findRGJTPanleixingPageList.htm"}, method = {RequestMethod.POST})
  public void findRGJTPanleixingPageList(String code, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.dictService.findRGJTPanleixingPageList(code, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"deleteRGJTPanleixing.htm"}, method = {RequestMethod.POST})
  public void deleteRGJTPanleixing(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除人工晶体襻类型");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.deleteRGJTPanleixing(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateRGJTCjtglx.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateRGJTCjtglx(RGJTCjtglx cjtglx, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存生产厂家能提供的人工晶体");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.saveOrUpdateRGJTCjtglx(cjtglx);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findRGJTCjtglxPageList.htm"}, method = {RequestMethod.POST})
  public void findRGJTCjtglxPageList(RGJTSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.dictService.findRGJTCjtglx(form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"getRGJTCjtglx.htm"}, method = {RequestMethod.GET})
  public void getRGJTCjtglx(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取人工晶体生产厂家能提供的晶体类型");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      RGJTCjtglx cj = this.dictService.getRGJTCjtglx(id);
      result.setObj(cj);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteRGJTCjtglx.htm"}, method = {RequestMethod.POST})
  public void deleteRRGJTCjtglx(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除生产厂家能提供的人工晶体类型");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.deleteRGJTCjtglx(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateRGJTCrklx.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateRGJTCrklx(RGJTCrklx plx, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存出入库类型");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.saveOrUpdateRGJTCrklx(plx);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findRGJTCrklxPageList.htm"}, method = {RequestMethod.POST})
  public void findRGJTCrklxPageList(String code, Integer category, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.dictService.findRGJTCrklxPageList(code, category, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"deleteRGJTCrklx.htm"}, method = {RequestMethod.POST})
  public void deleteRGJTCrklx(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除人工晶体出入库类型");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      result.setGonghao(gonghao);
      this.dictService.deleteRGJTCrklx(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
