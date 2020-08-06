package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Paiban;
import cn.com.oims.service.IPaibanService;
import cn.com.oims.web.form.PaibanForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping({"paibanNew"})
public class PaibanController {
  @Autowired
  private IPaibanService paibanService;
  
  @RequestMapping(value = {"findPaibanValues.htm"}, method = {RequestMethod.POST})
  public void findPaibanValues(@DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate, @RequestParam("leibie") Integer category, Integer officeId, Integer child, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("员工排班查询！");
    result.setGonghao(gonghao);
    try {
      List<Paiban> list = this.paibanService.findPaibanValues(startDate, endDate, category, officeId, child);
      result.setState(1);
      result.setObj(list);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("失败！");
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"savePaiban.htm"}, method = {RequestMethod.POST})
  public void savePaiban(PaibanForm paiban, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("员工排班保存！");
    result.setGonghao(gonghao);
    try {
      Long id = this.paibanService.savePaiban(paiban);
      result.setState(1);
      result.setObj(id);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("失败！");
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deletePaiban.htm"}, method = {RequestMethod.POST})
  public void deletePaiban(Long id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("员工排班删除！");
    result.setGonghao(gonghao);
    try {
      this.paibanService.deletePaiban(id);
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("失败！");
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
