package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.service.IShiLiService;
import cn.com.oims.web.form.ShiLiForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"ShiLi"})
public class ShiLiController {
  private IShiLiService shiLiService;
  
  @Autowired
  public void setShiLiService(IShiLiService shiLiService) {
    this.shiLiService = shiLiService;
  }
  
  @RequestMapping(value = {"/getShiLiList.htm"}, method = {RequestMethod.POST})
  public void getJiuZhenHuanZheList(Page page, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    String factor = request.getParameter("state");
    page.setFactor(factor);
    Map map = new HashMap<>();
    map = this.shiLiService.findAllShiLi4Page(page);
    if (map != null) {
      result.setState(1);
      result.setMessage("成功");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/saveShili.htm"}, method = {RequestMethod.POST})
  public void saveShiLi(ShiLiForm shiliForm, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    try {
      ShiLi shili = new ShiLi();
      BeanUtils.copyProperties(shiliForm, shili, new String[] { "jcsj", "lgg", "rgg" });
      shili.setJcys(gonghao);
      shili.setJcsj(new Date());
      this.shiLiService.saveOrUpdateShiLi(shili);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findShili.htm"}, method = {RequestMethod.GET})
  public void findShiliList(Long patientId, Integer max, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    try {
      result.setObj(this.shiLiService.findShiLi(patientId, max));
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShili.htm"}, method = {RequestMethod.GET})
  public void getShili(Long jcdId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    try {
      result.setObj(this.shiLiService.getShiliByJcdId(jcdId));
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShiliByJiuzhenId.htm"}, method = {RequestMethod.GET})
  public void getShiliByJiuzhenId(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    try {
      result.setObj(this.shiLiService.getShiliByJiuzhenId(jiuzhenId));
      result.setState(1);
      result.setGonghao(gonghao);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShiliByHzId.htm"}, method = {RequestMethod.GET})
  public void getShiliByHzId(Long hzId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    try {
      result.setObj(this.shiLiService.getShiliByHzId(hzId));
      result.setState(1);
      result.setGonghao(gonghao);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
