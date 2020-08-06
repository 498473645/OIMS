package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.HistoryBaogaoRelation;
import cn.com.oims.service.IHistoryBaogaoRelationService;
import cn.com.oims.service.IOimsLogService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"HistoryInspectResult"})
public class HistoryInspectResultController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IHistoryBaogaoRelationService historyInspectResultService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @RequestMapping(value = {"/getAllJCXM.htm"}, method = {RequestMethod.POST})
  private void getAllJCXM(HttpServletRequest request, HttpServletResponse response) {
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request
      .getSession().getAttribute("gonghao").toString() : 
      null;
    MyResult result = new MyResult();
    this.doing = "获取所有的历史检查项目";
    try {
      List<Map<String, Object>> list = this.historyInspectResultService
        .getAllJCXM();
      result.setObj(list);
      this.doState = 1;
      this.message = "查询成功！";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "查询失败！";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setGonghao(gonghao);
    result.setState(this.doState);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJCXMStateByBinglihao.htm"}, method = {RequestMethod.POST})
  private void getJCXMStateByBinglihao(HttpServletRequest request, HttpServletResponse response, String binglihao) {
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request
      .getSession().getAttribute("gonghao").toString() : 
      null;
    MyResult result = new MyResult();
    this.doing = "根据病历号获取某单项检查做了多少次";
    try {
      List<Map<String, Object>> list = this.historyInspectResultService
        .getJCXMStateByBingLiHao(binglihao);
      result.setObj(list);
      this.doState = 1;
      this.message = "查询成功！";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "查询失败！";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setGonghao(gonghao);
    result.setState(this.doState);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJCJGByBingLiHao.htm"}, method = {RequestMethod.POST})
  private void getJCJGByBingLiHao(HttpServletRequest request, HttpServletResponse response, String binglihao, int jcxmId) {
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request
      .getSession().getAttribute("gonghao").toString() : 
      null;
    MyResult result = new MyResult();
    this.doing = "根据病历号获取某单项检查做了多少次";
    try {
      Map<String, Object> list = this.historyInspectResultService
        .getJCJGByBingLiHao(binglihao, jcxmId);
      result.setObj(list);
      this.doState = 1;
      this.message = "查询成功！";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "查询失败！";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setGonghao(gonghao);
    result.setState(this.doState);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJCJGByBingLiHaoAndDate.htm"}, method = {RequestMethod.POST})
  private void getJCJGByBingLiHaoAndDate(HttpServletRequest request, HttpServletResponse response, String binglihao, String date, int jcxmId) {
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request
      .getSession().getAttribute("gonghao").toString() : 
      null;
    MyResult result = new MyResult();
    this.doing = "根据病历号获取检查结果";
    try {
      Map<String, Object> list = this.historyInspectResultService
        .getJCJGByBingLiHaoAndDate(binglihao, date, jcxmId);
      result.setObj(list);
      this.doState = 1;
      this.message = "查询成功！";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "查询失败！";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setGonghao(gonghao);
    result.setState(this.doState);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getHistoryBaogaoRelationByJCXM.htm"}, method = {RequestMethod.POST})
  private void getHistoryBaogaoRelationByJCXM(HttpServletRequest request, HttpServletResponse response, String jcxmid) {
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request
      .getSession().getAttribute("gonghao").toString() : 
      null;
    MyResult result = new MyResult();
    this.doing = "根据病历号获取检查结果";
    try {
      HistoryBaogaoRelation historyBaogaoRelation = this.historyInspectResultService.getHistoryBaogaoRelationByJCXM(jcxmid);
      result.setObj(historyBaogaoRelation);
      this.doState = 1;
      this.message = "查询成功！";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "查询失败！";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setGonghao(gonghao);
    result.setState(this.doState);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
