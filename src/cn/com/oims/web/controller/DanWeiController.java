package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.DanWei;
import cn.com.oims.service.IDanWeiService;
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
@RequestMapping({"danwei"})
public class DanWeiController {
  private IDanWeiService danweiService;
  
  private IOimsLogService oimslogService;
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  public void setOimslogService(IOimsLogService oimslogService) {
    this.oimslogService = oimslogService;
  }
  
  @Autowired
  public void setDanweiService(IDanWeiService danweiService) {
    this.danweiService = danweiService;
  }
  
  @RequestMapping(value = {"/findAllDanWeiByPage.htm"}, method = {RequestMethod.POST})
  public void findDanWeiByPage(HttpServletRequest request, HttpServletResponse response, Page page) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "分页查询当前单位所有信息";
    try {
      map = this.danweiService.findAllDanWei4Page(page);
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
    this.oimslogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/addDanwei.htm"}, method = {RequestMethod.POST})
  public void saveDanWei(HttpServletRequest request, HttpServletResponse response, DanWei danwei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "添加单位信息";
    try {
      this.danweiService.saveDanWei(danwei);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(danwei);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delDanwei.htm"}, method = {RequestMethod.POST})
  public void delDanWei(HttpServletRequest request, HttpServletResponse response, int id) {
    MyResult result = new MyResult();
    result.setDoing("删除单位信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    try {
      this.danweiService.delDanWeiById(Integer.valueOf(id));
      result.setState(1);
      result.setMessage("成功");
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("失败");
    } 
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getDanWeiByID.htm"}, method = {RequestMethod.GET})
  public void findDanWeiByID(HttpServletRequest request, HttpServletResponse response, Integer id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "查询单位信息根据ID";
    DanWei danwei = new DanWei();
    try {
      danwei = this.danweiService.getDanWeiById(id);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(danwei);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateDanwei.htm"}, method = {RequestMethod.POST})
  public void updateDanWei(HttpServletRequest request, HttpServletResponse response, DanWei danwei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "修改单位信息";
    try {
      this.danweiService.updateDanWei(danwei);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(danwei);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllDanWei.htm"}, method = {RequestMethod.POST})
  public void findAllDanWei(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List danweis = new ArrayList();
    this.doing = "查询所有单位信息";
    try {
      danweis = this.danweiService.findAllDanWei();
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      danweis = new ArrayList();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(danweis);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimslogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
