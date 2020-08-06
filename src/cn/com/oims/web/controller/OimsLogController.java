package cn.com.oims.web.controller;

import cn.com.oims.common.Copy_2_of_ExcelUtilLogInfo;
import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.LogSearchForm;
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
@RequestMapping({"oims_log"})
public class OimsLogController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @RequestMapping(value = {"/findAllLogInfoByPage.htm"}, method = {RequestMethod.POST})
  public void findLogInfoByPage(HttpServletRequest request, HttpServletResponse response, Page page, LogSearchForm lsf) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "分页查询日志信息";
    try {
      map = this.oimsLogService.findAllOimsLog4Page(page, lsf);
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
  
  @RequestMapping(value = {"/getLogInfoList.htm"}, method = {RequestMethod.POST})
  public void getLogInfoList(HttpServletRequest request, HttpServletResponse response, LogSearchForm lsf) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing(" 查询日志列表");
    session.setAttribute("lsf", lsf);
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsLogService.getLogInfoList(lsf);
      if (list != null) {
        result.setState(1);
        result.setMessage("成功");
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/viewLogInfoByID.htm"}, method = {RequestMethod.POST})
  public void findLogInfoById(HttpServletRequest request, HttpServletResponse response, Long id) {
    OimsLog oimslog;
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "作废检查单报告";
    try {
      oimslog = this.oimsLogService.getOimsLogById(id);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      oimslog = new OimsLog();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(oimslog);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportLogInfo.htm"}, method = {RequestMethod.POST})
  public void exportLogInfo(HttpServletRequest request, HttpServletResponse response, LogSearchForm logsearchform) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    String exportPath = "";
    this.doing = "根据查询条件导出日志信息";
    try {
      String path = 
        String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
        "temp";
      List oimslogs = this.oimsLogService.getLogInfoList(logsearchform);
      Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
      List<List> list = new ArrayList<>();
      List<String> list0 = new ArrayList();
      List<String> list1 = new ArrayList();
      list1.add("id");
      list0.add("序号");
      list1.add("cznr");
      list0.add("操作内容");
      list1.add("czr");
      list0.add("操作人");
      list1.add("czsj");
      list0.add("操作时间");
      list1.add("rzjb");
      list0.add("日志级别");
      list1.add("czjg");
      list0.add("操作结果");
      list.add(list0);
      list.add(list1);
      exportPath = eu.exportLogInfo(path, oimslogs, list).getName();
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
    result.setObj(exportPath);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
