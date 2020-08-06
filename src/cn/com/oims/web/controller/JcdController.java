package cn.com.oims.web.controller;

import cn.com.oims.common.CommonFunction;
import cn.com.oims.common.FileTool;
import cn.com.oims.common.TopconFileUtils;
import cn.com.oims.common.ZipTool;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Paidui;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IJzjlService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IPaiduiService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.JcdDengJiForm;
import cn.com.oims.web.form.JcdExecuteForm;
import cn.com.oims.web.form.JcdSearchForm;
import cn.com.oims.web.form.UploadBean;
import com.codesnet.common.FileUtils;
import com.codesnet.common.IPUtils;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import com.codesnet.common.PhotoUtilsImpl;
import com.codesnet.common.VideoExportUtils;
import java.awt.image.BufferedImage;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping({"jcd"})
public class JcdController {
  private String path_Jcd = "/UploadFile";
  
  private String path_Zip = "/Zip";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService iJcdService;
  
  @Autowired
  private IPaiduiService iPaiduiService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IHuanZheXinXiService huanZheXinxiService;
  
  @Autowired
  private IJiuzhenService jiuzhenService;
  
  @Autowired
  private IJcxmService jcxmService;
  
  @Autowired
  private IJzjlService jzjlService;
  
  @Autowired
  private ISheBeiService sheBeiService;
  
  @RequestMapping(value = {"/zhixingGetOne.htm"}, method = {RequestMethod.GET})
  public void getOneJcdNoProc(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("检查单执行");
    int bgsid = 0;
    YuanGong yuangong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
    if (yuangong != null)
      bgsid = yuangong.getBgsId().intValue(); 
    JcdExecuteForm jef = null;
    String jcsbid = request.getParameter("jcsbid");
    if (jcsbid != null)
      jef = this.iJcdService.getOneWJCjcd(Integer.parseInt(jcsbid), bgsid); 
    if (jef != null) {
      result.setObj(jef);
      result.setState(1);
    } else {
      result.setMessage("没有等待执行的检查单");
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcdById.htm"}, method = {RequestMethod.GET})
  public void getJcdById(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据ID提取检查单");
    Jcd jcd = this.iJcdService.getJcdById(id);
    if (jcd != null) {
      result.setObj(jcd);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcdByJcdh.htm"}, method = {RequestMethod.POST})
  public void getJcdByJcdh(String jcdh, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据检查单号提取检查单");
    Jcd jcd = this.iJcdService.findJcdByJCDH(jcdh);
    if (jcd != null) {
      result.setObj(jcd);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcdByJcd.htm"}, method = {RequestMethod.POST})
  public void getJcdByJcd(HttpServletRequest request, HttpServletResponse response, Jcd jcd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据检查单查询符合对象的检查单对象";
    try {
      jcd = this.iJcdService.getJcdById(jcd.getId());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(jcd);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/submitJcdById.htm"}, method = {RequestMethod.POST})
  public void submitJcdById(HttpServletRequest request, HttpServletResponse response, Jcd jcd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单提交操作";
    try {
      int bumenid = 0;
      YuanGong yuangong = this.yuanGongService
        .obtainYuanGongByGonghao(gonghao);
      if (yuangong != null)
        bumenid = yuangong.getBumenId().intValue(); 
      Jcd jcdSelect = this.iJcdService.getJcdById(jcd.getId());
      jcdSelect.setJcsbId(jcd.getJcsbId());
      jcdSelect.setBiaoshi(Integer.valueOf(56));
      jcdSelect.setJcksId(Integer.valueOf(bumenid));
      jcdSelect.setJcys(gonghao);
      jcdSelect.setJcksTime(new Date());
      jcdSelect.setJcjsTime(new Date());
      this.iJcdService.updateJcd(jcdSelect);
      this.iPaiduiService.delPaiduiById(jcd.getId());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(jcd);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/executeJcdStart.htm"}, method = {RequestMethod.POST})
  public void executeJcdStart(HttpServletRequest request, HttpServletResponse response, Jcd jcd, String jcksDate) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单开始操作";
    try {
      SimpleDateFormat dateFormat = new SimpleDateFormat(
          "yyyy-MM-dd HH:mm:ss");
      Jcd jcdSelect = this.iJcdService.getJcdById(jcd.getId());
      jcdSelect.setJcsbId(jcd.getJcsbId());
      jcdSelect.setJcys(jcd.getJcys());
      jcdSelect.setBiaoshi(Integer.valueOf(54));
      jcdSelect.setJcksTime(dateFormat.parse(jcksDate));
      this.iJcdService.updateJcd(jcdSelect);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(jcd);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getMaxJcdId.htm"}, method = {RequestMethod.POST})
  public void getMaxJcdId(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Long maxJcdId = new Long(0L);
    this.doing = "查询最大的检查单ID";
    try {
      maxJcdId = this.iJcdService.getMaxJcdId();
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(maxJcdId);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getUniqueJCDH.htm"}, method = {RequestMethod.POST})
  public void getUniqueJCDH(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    String jcdh = null;
    this.doing = "获取规则的检查单号";
    try {
      jcdh = this.iJcdService.getJcdhstr(0);
      System.out.println(jcdh);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(jcdh);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/executeJcdEnd.htm"}, method = {RequestMethod.POST})
  public void executeJcdEnd(HttpServletRequest request, HttpServletResponse response, Jcd jcd, String jcjsDate) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单结束检查操作";
    SimpleDateFormat dateFormat = new SimpleDateFormat(
        "yyyy-MM-dd HH:mm:ss");
    try {
      int bumenid = 0;
      YuanGong yuangong = this.yuanGongService.obtainYuanGongByGonghao(jcd
          .getJcys());
      if (yuangong != null)
        bumenid = yuangong.getBumenId().intValue(); 
      Jcd jcdSelect = this.iJcdService.getJcdById(jcd.getId());
      jcdSelect.setJcksId(Integer.valueOf(bumenid));
      jcdSelect.setJcys(jcd.getJcys());
      jcdSelect.setBiaoshi(Integer.valueOf(51));
      jcdSelect.setJcjsTime(dateFormat.parse(jcjsDate));
      this.iJcdService.updateJcd(jcdSelect);
      this.iPaiduiService.delPaiduiById(jcd.getId());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(jcd);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/executeJcdPass.htm"}, method = {RequestMethod.POST})
  public void executeJcdPass(HttpServletRequest request, HttpServletResponse response, Jcd jcd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "将检查单进行过号操作，并删除排队标识";
    try {
      jcd = this.iJcdService.getJcdById(jcd.getId());
      jcd.setBiaoshi(Integer.valueOf(53));
      this.iJcdService.updateJcd(jcd);
      this.iPaiduiService.delPaiduiById(jcd.getId());
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
    result.setObj(null);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/executeJcdReset.htm"}, method = {RequestMethod.POST})
  public void executeJcdReset(HttpServletRequest request, HttpServletResponse response, Jcd jcd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单终止操作";
    try {
      Jcd jcdSelect = this.iJcdService.getJcdById(jcd.getId());
      if (jcd.getBiaoshi() == null || jcd.getBiaoshi().intValue() == 0) {
        jcdSelect.setBiaoshi(Integer.valueOf(50));
      } else {
        jcdSelect.setBiaoshi(jcd.getBiaoshi());
      } 
      jcdSelect.setJcksId(null);
      jcdSelect.setJcys(null);
      jcdSelect.setJcksTime(null);
      jcdSelect.setJcjsTime(null);
      this.iJcdService.updateJcd(jcdSelect);
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
    result.setObj(null);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcdExecuteFormByJcd.htm"}, method = {RequestMethod.POST})
  public void getOneExcuteJcdByBlhOrJcdid(HttpServletRequest request, HttpServletResponse response, Jcd jcd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    JcdExecuteForm jcdexecuteform = null;
    this.doing = "根据查询条件获得jcdexecuteform对象";
    try {
      jcdexecuteform = this.iJcdService.getJcdExecuteFormByJcd(jcd);
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
    result.setObj(jcdexecuteform);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getOneExecuteJcdByJcdid.htm"}, method = {RequestMethod.GET})
  public void getOneExcuteJcdByJcdid(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("读取执行检查单!");
    String jcdid = request.getParameter("jcdid");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    int bumenid = 0;
    YuanGong yuangong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
    if (yuangong != null)
      bumenid = yuangong.getBumenId().intValue(); 
    JcdExecuteForm jef = this.iJcdService.getOneExcuteJcdByJcdid(jcdid, bumenid, 
        gonghao);
    if (jef != null) {
      result.setObj(jef);
      result.setMessage("提取成功！检查单ID：" + jef.getJcdid());
      result.setState(1);
    } else {
      result.setMessage("提取失败！");
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getExecuteJcdList.htm"}, method = {RequestMethod.POST})
  public void getExecuteJcdList(JcdSearchForm jcdsearchform, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "查询待检查单列表";
    try {
      int bumenId = 0;
      YuanGong yuangong = this.yuanGongService
        .obtainYuanGongByGonghao(gonghao);
      if (yuangong != null)
        bumenId = yuangong.getBumenId().intValue(); 
      List list = this.iJcdService.getJcdListByJcdSearchFormPaidui(page, 
          jcdsearchform);
      map.put("list", list);
      map.put("page", page);
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getFinishJcdList.htm"}, method = {RequestMethod.POST})
  public void getFinishJcdList(JcdSearchForm jcdsearchform, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "查询已检查检查单";
    try {
      int bumenId = 0;
      YuanGong yuangong = this.yuanGongService
        .obtainYuanGongByGonghao(gonghao);
      if (yuangong != null)
        bumenId = yuangong.getBumenId().intValue(); 
      jcdsearchform.setJcys(gonghao);
      jcdsearchform.setJcksId(Integer.valueOf(bumenId));
      List list = this.iJcdService.getJcdListByJcdSearchForm(page, 
          jcdsearchform);
      map.put("list", list);
      map.put("page", page);
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getGuoHaoJcdList.htm"}, method = {RequestMethod.POST})
  public void getGuoHaoJcdList(JcdSearchForm jcdsearchform, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "查询已过号检查单";
    try {
      List list = this.iJcdService.getJcdListByJcdSearchForm(page, 
          jcdsearchform);
      map.put("list", list);
      map.put("page", page);
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getBuChuanJcdList.htm"}, method = {RequestMethod.POST})
  public void getBuChuanJcdList(JcdSearchForm jcdsearchform, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "查询待补传的检查单";
    try {
      List list = this.iJcdService.getJcdListByJcdSearchForm(page, 
          jcdsearchform);
      map.put("list", list);
      map.put("page", page);
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getJianChaZhongJcdList.htm"}, method = {RequestMethod.POST})
  public void getJianChaZhongJcdList(JcdSearchForm jcdsearchform, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "查询检查中的检查单";
    try {
      List list = this.iJcdService.getJcdListByJcdSearchForm(page, 
          jcdsearchform);
      map.put("list", list);
      map.put("page", page);
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getDengJiJcdList.htm"}, method = {RequestMethod.POST})
  public void getDengJiJcdList(JcdSearchForm jcdsearchform, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "查询待登记的检查单";
    try {
      List list = this.iJcdService.getJcdListByJcdSearchForm(page, 
          jcdsearchform);
      map.put("list", list);
      map.put("page", page);
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importJcdPhoto.htm"}, method = {RequestMethod.POST})
  public void importJcdPhoto(UploadBean uploadbean, Jcd jcd, HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单手动导入图片操作";
    try {
      int bumenid = 0;
      YuanGong yuangong = this.yuanGongService
        .obtainYuanGongByGonghao(gonghao);
      if (yuangong != null)
        bumenid = yuangong.getBumenId().intValue(); 
      String path_UploadFile = request.getSession().getServletContext()
        .getRealPath(this.path_Jcd);
      FileItem fileitem = uploadbean.getFiledata().getFileItem();
      String realpath_Jcd = String.valueOf(path_UploadFile) + 
        System.getProperty("file.separator") + 
        jcd.getHuanzheId() + 
        System.getProperty("file.separator") + 
        jcd.getJiuzhenId() + 
        System.getProperty("file.separator") + 
        jcd.getId() + 
        System.getProperty("file.separator");
      if (!(new File(realpath_Jcd)).isDirectory())
        (new File(realpath_Jcd)).mkdirs(); 
      String path_thumb = String.valueOf(realpath_Jcd) + "thumb" + 
        System.getProperty("file.separator");
      if (!(new File(path_thumb)).exists())
        (new File(path_thumb)).mkdir(); 
      String fileName = fileitem
        .getName()
        .substring(
          fileitem.getName().lastIndexOf(File.separator) + 1);
      String subName = fileName.substring(fileName.lastIndexOf("."));
      if (CommonFunction.isContainChinese(fileName)) {
        Double x = Double.valueOf(Math.random() * 1000000.0D);
        fileName = String.valueOf(x.intValue()) + subName;
      } 
      String path_Big = String.valueOf(realpath_Jcd) + fileName;
      if (MultiUtils.isPhoto(fileName) || fileName.toLowerCase().endsWith("tif")) {
        File jpgFile, normalFile = new File(path_Big);
        fileitem.write(normalFile);
        if (!subName.toLowerCase().equals(".jpg")) {
          BufferedImage bi = ImageIO.read(normalFile);
          jpgFile = new File(normalFile.getAbsoluteFile() + ".jpg");
          ImageIO.write(bi, "jpg", jpgFile);
          System.out.println(jpgFile.getAbsolutePath());
        } else {
          jpgFile = normalFile;
        } 
        PhotoUtilsImpl photoUtilsImpl = new PhotoUtilsImpl();
        boolean result_exportSmallPhoto = photoUtilsImpl.exportSmallPhoto(
            jpgFile.getAbsolutePath(), 200, 200);
        if (result_exportSmallPhoto) {
          path_thumb = String.valueOf(path_thumb) + jpgFile.getName();
        } else {
          throw new Exception("导出缩略图失败！");
        } 
      } else if (MultiUtils.isVideo(fileName) || subName.toLowerCase().equals(".mp4") || 
        subName.toLowerCase().equals(".flv")) {
        fileitem.write(new File(path_Big));
        if (!fileName.toLowerCase().contains("flv")) {
          fileName = String.valueOf(fileName) + ".flv";
          path_thumb = String.valueOf(path_thumb) + fileName;
          try {
            VideoExportUtils.exportFlv(path_Big, path_thumb);
          } catch (Exception e) {
            throw new Exception("导出缩略视频失败！");
          } 
        } else {
          path_thumb = String.valueOf(path_thumb) + fileName;
          fileitem.write(new File(path_thumb));
        } 
      } else if (".pdf".equals(subName.toLowerCase())) {
        fileitem.write(new File(path_Big));
      } 
      System.out.println("path_thumb=" + path_thumb);
      Jcd jcdSelect = this.iJcdService.getJcdById(jcd.getId());
      if (jcdSelect.getBiaoshi().intValue() != 56) {
        jcdSelect.setJcsbId(jcd.getJcsbId());
        jcdSelect.setJcys(gonghao);
        jcdSelect.setJcksId(Integer.valueOf(bumenid));
        jcdSelect.setJcksTime(new Date());
        jcdSelect.setJcjsTime(new Date());
        jcdSelect.setBiaoshi(Integer.valueOf(56));
        this.iJcdService.updateJcd(jcdSelect);
        this.iPaiduiService.delPaiduiById(jcd.getId());
      } 
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      Jcd jcdSelect = this.iJcdService.getJcdById(jcd.getId());
      if (jcdSelect.getBiaoshi().intValue() != 50) {
        jcdSelect.setBiaoshi(Integer.valueOf(50));
        this.iJcdService.updateJcd(jcdSelect);
      } 
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getFileListByJcd.htm"}, method = {RequestMethod.POST})
  public void getFileListByJcd(HttpServletRequest request, HttpServletResponse response, Jcd jcd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List list = new ArrayList();
    this.doing = "查询该检查单服务器上关联的检查文件";
    try {
      jcd = this.iJcdService.getJcdById(jcd.getId());
      String path_UploadFile = request.getSession().getServletContext()
        .getRealPath(this.path_Jcd);
      String path_absolute_jcd_thumb = String.valueOf(path_UploadFile) + 
        System.getProperty("file.separator") + jcd.getHuanzheId() + 
        System.getProperty("file.separator") + jcd.getJiuzhenId() + 
        System.getProperty("file.separator") + jcd.getId() + 
        System.getProperty("file.separator") + "thumb";
      String path_relative_jcd_thumb = String.valueOf(this.path_Jcd) + 
        System.getProperty("file.separator") + jcd.getHuanzheId() + 
        System.getProperty("file.separator") + jcd.getJiuzhenId() + 
        System.getProperty("file.separator") + jcd.getId() + 
        System.getProperty("file.separator") + "thumb";
      list = FileUtils.getPhotoAndFlvFileList(path_absolute_jcd_thumb, 
          path_relative_jcd_thumb);
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
    result.setObj(list);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcdPhotoList.htm"}, method = {RequestMethod.GET})
  public void getJcdPhotoList(@RequestParam("jcdid") long jcdid, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("提取检查单影像信息!");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String vPath = "/UploadFile";
    String realPath = request.getSession().getServletContext()
      .getRealPath(vPath);
    Jcd jcd = this.iJcdService.getJcdById(Long.valueOf(jcdid));
    List list = null;
    if (jcd != null)
      list = this.iJcdService.getJcdFileList(Long.valueOf(jcdid), jcd.getHuanzheId(), 
          jcd.getJiuzhenId(), realPath, vPath); 
    result.setGonghao(gonghao);
    result.setMessage("检查单号：" + jcdid);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/getJcdPDFList.htm"}, method = {RequestMethod.POST})
  public void getJcdPDFList(long jcdid, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("提取检查单PDF报告信息!");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List list = new ArrayList();
    try {
      String vPath = "/UploadFile";
      String realPath = request.getSession().getServletContext()
        .getRealPath(vPath);
      Jcd jcd = this.iJcdService.getJcdById(Long.valueOf(jcdid));
      if (jcd != null)
        list = this.iJcdService.getJcdPDFList(Long.valueOf(jcdid), jcd.getHuanzheId(), 
            jcd.getJiuzhenId(), realPath, vPath); 
      for (Object object : list)
        System.out.println(object.toString()); 
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
    result.setObj(list);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/PhotoExport.htm"}, method = {RequestMethod.POST})
  public void photoExport(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单图片导出操作";
    String path = "";
    try {
      String[] path_relative_thumbs = request
        .getParameterValues("checkPhoto");
      String path_UploadFile = request.getSession().getServletContext()
        .getRealPath(this.path_Jcd);
      Long jcdid = Long.valueOf(request.getParameter("jcdid"));
      String binglihao = request.getParameter("binglihao");
      Jcd jcdSelect = this.iJcdService.getJcdById(jcdid);
      String jcxmmc = "";
      if (jcdSelect.getBiaoti() != null)
        jcxmmc = jcdSelect.getBiaoti(); 
      Date kdTime = jcdSelect.getKdTime();
      SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
      String kddate = sdf.format(kdTime);
      File tempFile = new File(String.valueOf(path_UploadFile) + "/temp");
      if (!tempFile.exists())
        tempFile.mkdir(); 
      String hzidpath = String.valueOf(path_UploadFile) + "/temp/" + binglihao;
      File hzidFile = new File(hzidpath);
      if (!hzidFile.exists())
        hzidFile.mkdir(); 
      File kdfile = new File(String.valueOf(path_UploadFile) + "/temp/" + binglihao + "/" + 
          kddate);
      if (!kdfile.exists())
        kdfile.mkdir(); 
      String xmnamepath = String.valueOf(path_UploadFile) + "/temp/" + binglihao + "/" + 
        kddate + "/" + jcxmmc;
      File xmnameFile = new File(xmnamepath);
      if (!xmnameFile.exists())
        xmnameFile.mkdir(); 
      FileTool tool = new FileTool();
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = path_relative_thumbs).length, b = 0; b < i; ) {
        String path_relative_thumb = arrayOfString1[b];
        String path_absolute_thumb = String.valueOf(path_UploadFile) + 
          path_relative_thumb.replaceFirst(
            String.valueOf(System.getProperty("file.separator")) + 
            this.path_Jcd, "");
        String path_absolute_big = path_absolute_thumb.replaceFirst(
            "thumb/", "");
        String filename = path_absolute_big.substring(path_absolute_big
            .lastIndexOf("\\"));
        File file_absolute_big = new File(path_absolute_big);
        if (file_absolute_big.isFile()) {
          tool.fileCopy_Transfer(path_absolute_big, String.valueOf(xmnamepath) + 
              filename);
        } else {
          path_absolute_big = path_absolute_big.replaceFirst(".flv", 
              "");
          file_absolute_big = new File(path_absolute_big);
          if (file_absolute_big.isFile())
            tool.fileCopy_Transfer(path_absolute_big, String.valueOf(xmnamepath) + 
                filename); 
        } 
        System.out.println("源文件的绝对路径=" + path_absolute_big);
        b++;
      } 
      String path_Zip = request.getSession().getServletContext()
        .getRealPath(this.path_Zip);
      File file_Zip = new File(path_Zip);
      if (!file_Zip.exists() && !file_Zip.isDirectory())
        file_Zip.mkdirs(); 
      String fileName_Zip = String.valueOf(binglihao) + ".zip";
      path = String.valueOf(this.path_Zip) + System.getProperty("file.separator") + 
        fileName_Zip;
      String path_outFile = String.valueOf(path_Zip) + 
        System.getProperty("file.separator") + fileName_Zip;
      ZipTool ziptoll = new ZipTool();
      ziptoll.zip(hzidpath, path_outFile);
      this.doState = 1;
      this.message = "操作成功";
      FileTool.deleteDirectory(String.valueOf(path_UploadFile) + "/temp");
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(path);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/PhotoExportAll.htm"}, method = {RequestMethod.POST})
  public void photoExportAll(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    MyResult result = new MyResult();
    FileTool tool = new FileTool();
    Jcd jcd = new Jcd();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    Date kdTime = new Date();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String path_UploadFile = request.getSession().getServletContext()
      .getRealPath(this.path_Jcd);
    File tempFile = new File(String.valueOf(path_UploadFile) + "/temp");
    this.doing = "检查单图片导出操作";
    String path = "";
    try {
      Long jcdid = Long.valueOf(request.getParameter("jcdid"));
      String binglihao = request.getParameter("binglihao");
      String jcxmmc = "";
      Jcd jcdSelect = this.iJcdService.getJcdById(jcdid);
      Long huanzheId = jcdSelect.getHuanzheId();
      List<Jcd> jcdlist = this.iJcdService.findJcdByHuanzheId(huanzheId.longValue());
      String skdtime = sdf.format(kdTime);
      if (!tempFile.exists())
        tempFile.mkdir(); 
      String hzidpath = String.valueOf(path_UploadFile) + "/temp/" + binglihao;
      File hzidFile = new File(hzidpath);
      if (!hzidFile.exists())
        hzidFile.mkdir(); 
      Long jiuzhenId = Long.valueOf(0L);
      String filepath = "";
      String hzIdpath = "";
      String jzIdpath = "";
      String jcdidpath = "";
      String xmfilepath = "";
      for (int j = 0; j < jcdlist.size(); j++) {
        jcd = jcdlist.get(j);
        if (jcd.getKdTime() != null) {
          kdTime = jcd.getKdTime();
          skdtime = sdf.format(kdTime);
        } 
        if (jcd.getJiuzhenId() != null)
          jiuzhenId = jcd.getJiuzhenId(); 
        if (jcd.getHuanzheId() != null)
          huanzheId = jcd.getHuanzheId(); 
        if (jcd.getBiaoti() != null)
          jcxmmc = jcd.getBiaoti(); 
        jcdid = jcd.getId();
        hzIdpath = String.valueOf(path_UploadFile) + "/" + huanzheId.toString();
        File hzIdfile = new File(hzIdpath);
        jzIdpath = String.valueOf(path_UploadFile) + "/" + huanzheId.toString() + "/" + 
          jiuzhenId.toString();
        File jzIdfile = new File(jzIdpath);
        jcdidpath = String.valueOf(path_UploadFile) + "/" + huanzheId.toString() + "/" + 
          jiuzhenId.toString() + "/" + jcdid.toString();
        File jcdidfile = new File(jcdidpath);
        if (hzIdfile.exists() && jzIdfile.exists() && 
          jcdidfile.exists()) {
          File kdIDfile = new File(String.valueOf(path_UploadFile) + "/temp/" + binglihao + 
              "/" + skdtime);
          xmfilepath = String.valueOf(path_UploadFile) + "/temp/" + binglihao + "/" + 
            skdtime + "/" + jcxmmc;
          File xmNmfile = new File(xmfilepath);
          if (!kdIDfile.exists())
            kdIDfile.mkdir(); 
          if (!xmNmfile.exists()) {
            xmNmfile.mkdir();
            File[] files = jcdidfile.listFiles();
            byte b;
            int i;
            File[] arrayOfFile1;
            for (i = (arrayOfFile1 = files).length, b = 0; b < i; ) {
              File file = arrayOfFile1[b];
              filepath = file.getAbsolutePath();
              String filename = filepath.substring(filepath
                  .lastIndexOf("\\"));
              if (file.isFile())
                tool.fileCopy_Transfer(filepath, String.valueOf(xmfilepath) + 
                    filename); 
              b++;
            } 
          } 
        } 
      } 
      String path_Zip = request.getSession().getServletContext()
        .getRealPath(this.path_Zip);
      File file_Zip = new File(path_Zip);
      if (!file_Zip.exists() && !file_Zip.isDirectory())
        file_Zip.mkdirs(); 
      String fileName_Zip = String.valueOf(binglihao) + ".zip";
      path = String.valueOf(this.path_Zip) + System.getProperty("file.separator") + 
        fileName_Zip;
      String path_outFile = String.valueOf(path_Zip) + 
        System.getProperty("file.separator") + fileName_Zip;
      ZipTool ziptoll = new ZipTool();
      ziptoll.zip(hzidpath, path_outFile);
      this.doState = 1;
      this.message = "操作成功";
      FileTool.deleteDirectory(String.valueOf(path_UploadFile) + "/temp");
      File tempfile = new File(String.valueOf(path_UploadFile) + "/temp");
      FileTool.deleteDir(tempfile);
    } catch (Exception e) {
      FileTool.deleteDirectory(String.valueOf(path_UploadFile) + "/temp");
      File tempfile = new File(String.valueOf(path_UploadFile) + "/temp");
      FileTool.deleteDir(tempfile);
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(path);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/PhotoChoice.htm"}, method = {RequestMethod.POST})
  public void PhotoChoice(HttpServletRequest request, HttpServletResponse response, JcdSearchForm jcdsearchform) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "影响数据筛选删除操作返回检查单对象";
    try {
      String[] path_relative_thumbs = request
        .getParameterValues("checkPhoto");
      String path_UploadFile = request.getSession().getServletContext()
        .getRealPath(this.path_Jcd);
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = path_relative_thumbs).length, b = 0; b < i; ) {
        String path_relative_thumb = arrayOfString1[b];
        String path_absolute_thumb = String.valueOf(path_UploadFile) + 
          path_relative_thumb.replaceFirst(
            String.valueOf(System.getProperty("file.separator")) + 
            this.path_Jcd, "");
        String path_absolute_big = path_absolute_thumb.replaceFirst(
            "thumb", "");
        String path_absolute_big_nojpf = "";
        String fileFormat = path_relative_thumb.substring(
            path_relative_thumb.lastIndexOf(".") + 1).toLowerCase();
        if (fileFormat.equals("jpg"))
          path_absolute_big_nojpf = path_absolute_big.replaceFirst(
              ".jpg", ""); 
        if (fileFormat.equals("flv")) {
          path_absolute_big = path_absolute_thumb.replaceFirst(
              "thumb", "");
          File file = new File(path_absolute_big);
          if (!file.isFile())
            path_absolute_big = path_absolute_big.replaceFirst(
                ".flv", ""); 
        } 
        File file_absolute_thumb = new File(path_absolute_thumb);
        if (file_absolute_thumb.isFile())
          file_absolute_thumb.delete(); 
        File file_absolute_big = new File(path_absolute_big);
        if (file_absolute_big.isFile())
          file_absolute_big.delete(); 
        File file_absolute_big_nojpf = new File(path_absolute_big_nojpf);
        if (file_absolute_big_nojpf.isFile())
          file_absolute_big_nojpf.delete(); 
        b++;
      } 
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
    result.setObj(jcdsearchform);
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public static void main(String[] args) {
    String a = "a/b.bmp.jpg";
    String b = a.substring(0, a.lastIndexOf("."));
    System.out.println(b);
  }
  
  @RequestMapping(value = {"/PhotoReset.htm"}, method = {RequestMethod.POST})
  public void PhotoReset(HttpServletRequest request, HttpServletResponse response, Jcd jcd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单重置操作";
    try {
      int bgsId = 0;
      YuanGong yuangong = this.yuanGongService
        .obtainYuanGongByGonghao(gonghao);
      if (yuangong != null)
        bgsId = yuangong.getBgsId().intValue(); 
      jcd = this.iJcdService.getJcdById(jcd.getId());
      String path_UploadFile = request.getSession().getServletContext()
        .getRealPath(this.path_Jcd);
      String realpath_Jcd = String.valueOf(path_UploadFile) + 
        System.getProperty("file.separator") + jcd.getHuanzheId() + 
        System.getProperty("file.separator") + jcd.getJiuzhenId() + 
        System.getProperty("file.separator") + jcd.getId();
      File file_realpath_Jcd = new File(realpath_Jcd);
      if (file_realpath_Jcd.isDirectory())
        FileTool.deleteDirectory(realpath_Jcd); 
      jcd.setBiaoshi(Integer.valueOf(50));
      jcd.setJcsbId(Integer.valueOf(0));
      jcd.setJcksTime(null);
      jcd.setJcjsTime(null);
      jcd.setJcksId(null);
      jcd.setJcys(null);
      this.iJcdService.updateJcd(jcd);
      Paidui paidui = new Paidui();
      paidui.setAddTime(new Date());
      paidui.setJcdId(jcd.getId());
      paidui.setOfficeId(Integer.valueOf(bgsId));
      paidui.setXuhao(Integer.valueOf(this.iPaiduiService.getMaxXuHaoByBumenId(Integer.valueOf(bgsId)) + 1));
      paidui.setYxjb(Integer.valueOf(1));
      this.iPaiduiService.savePaidui(paidui);
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
    result.setObj(jcd);
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/dengJiJcdPaiDui.htm"}, method = {RequestMethod.POST})
  public void dengJiJcdPaiDui(JcdDengJiForm jdf, HttpServletRequest request, HttpServletResponse response) {}
  
  @RequestMapping(value = {"/dengJiJcd.htm"}, method = {RequestMethod.POST})
  public void dengJiJcd(JcdDengJiForm jcddengjiform, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "患者检查单手动登记";
    String ip = IPUtils.getIpAddrByRequest(request);
    try {
      int bgsId = 0;
      List<SheBei> list = this.sheBeiService.findSheBeiByJcxmIdAndIP(jcddengjiform.getJcxmIds(), ip);
      if (list.size() > 0) {
        bgsId = Integer.parseInt(((SheBei)list.get(0)).getBgsId());
      } else {
        list = this.sheBeiService.findSheBeiByJcxmIdAndIP(jcddengjiform.getJcxmIds(), null);
        if (list.size() > 0) {
          bgsId = Integer.parseInt(((SheBei)list.get(0)).getBgsId());
        } else {
          throw new Exception("当前项目：" + jcddengjiform.getJcxmIds() + "=====没有对应的检查设备");
        } 
      } 
      int bumenId = 0;
      HuanZheXinXi huanzhexinxi = this.huanZheXinxiService
        .findHuanZheById(jcddengjiform.getHuanzhexinxiId());
      Long huanzheId = huanzhexinxi.getId();
      Jiuzhen jiuzhen = this.jiuzhenService.findLastJiuZhenByHuanZhe(huanzheId);
      Long jiuzhenId = null;
      if (jiuzhen == null) {
        jiuzhen = new Jiuzhen();
        jiuzhen.setHaoma(jcddengjiform.getHaoma());
        jiuzhen.setHuanzheId(huanzhexinxi.getId());
        jiuzhen.setCaozuoren(gonghao);
        jiuzhen.setCaozuoTime(new Date());
        jiuzhen.setFzys(jcddengjiform.getKdysId());
        jiuzhen.setState(Integer.valueOf(28));
        jiuzhen.setZhenbie(jcddengjiform.getZhenbie());
        jiuzhenId = (Long)this.jiuzhenService.saveJiuzhen(jiuzhen);
      } else {
        jiuzhenId = jiuzhen.getId();
        jiuzhen.setState(Integer.valueOf(28));
        this.jiuzhenService.updateJiuzhen(jiuzhen);
      } 
      Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmId(huanzheId, jiuzhenId, Integer.valueOf(Integer.parseInt((jcddengjiform.getJcxmIds() == null) ? "" : jcddengjiform.getJcxmIds())));
      if (jcd == null) {
        createJcd(huanzhexinxi, jcddengjiform, jiuzhenId, Integer.valueOf(bumenId), gonghao, bgsId);
      } else if (jcd.getState() != null && jcd.getState().intValue() == 1) {
        createJcd(huanzhexinxi, jcddengjiform, jiuzhenId, Integer.valueOf(bumenId), gonghao, bgsId);
      } 
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
    result.setObj(jcddengjiform);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public void createJcd(HuanZheXinXi huanzhexinxi, JcdDengJiForm jcddengjiform, Long jiuzhenId, Integer bumenId, String gonghao, int bgsId) {
    Jcd jcd = new Jcd();
    jcd.setHuanzheId(huanzhexinxi.getId());
    jcd.setJiuzhenId(jiuzhenId);
    jcd.setJcdh(jcddengjiform.getJcdh());
    jcd.setKdksId(bumenId);
    jcd.setKdys(jcddengjiform.getKdysId());
    jcd.setKdTime(new Date());
    jcd.setJcyq(jcddengjiform.getJcyq());
    jcd.setBiaoshi(Integer.valueOf(50));
    jcd.setYanbie(jcddengjiform.getYanbie());
    jcd.setJcsbId(Integer.valueOf(0));
    jcd.setJfbs(jcddengjiform.isJfbs());
    jcd.setInsertUser(gonghao);
    jcd.setInsertDate(new Date());
    Jcxm jcxm = this.jcxmService.getJcxmById(Integer.valueOf(Integer.parseInt(jcddengjiform
            .getJcxmIds())));
    if (jcxm != null) {
      jcd.setBiaoti(jcxm.getXmmc());
      jcd.setJcxmIds(jcddengjiform.getJcxmIds());
    } 
    Long jcdid = (Long)this.iJcdService.saveJcd(jcd);
    Paidui paidui = new Paidui();
    paidui.setOfficeId(Integer.valueOf(bgsId));
    paidui.setJcdId(jcdid);
    paidui.setAddTime(new Date());
    paidui.setXuhao(Integer.valueOf(this.iPaiduiService.getMaxXuHaoByBumenId(Integer.valueOf(bgsId)) + 1));
    paidui.setYxjb(Integer.valueOf(1));
    this.iPaiduiService.savePaidui(paidui);
  }
  
  @RequestMapping(value = {"/confirmJcd.htm"}, method = {RequestMethod.POST})
  public void confirmJcd(Long jcdid, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("检查单确认");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    int bumenid = 0;
    YuanGong yuangong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
    if (yuangong != null)
      bumenid = yuangong.getBumenId().intValue(); 
    try {
      Paidui paidui = new Paidui();
      paidui.setOfficeId(Integer.valueOf(bumenid));
      paidui.setJcdId(jcdid);
      paidui.setAddTime(new Date());
      paidui.setXuhao(Integer.valueOf(this.iPaiduiService.getMaxXuHaoByBumenId(Integer.valueOf(bumenid)) + 1));
      paidui.setYxjb(Integer.valueOf(1));
      this.iPaiduiService.savePaidui(paidui);
      result.setState(1);
      result.setMessage("成功！检查单ID：" + jcdid);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("失败！检查单ID：" + jcdid);
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/zhixingGetJcd.htm"}, method = {RequestMethod.GET})
  public void getJcdNoprocById(Long id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("小屏采集提取一个检查单");
    Jcd jcd = this.iJcdService.getJcdById(id);
    if (jcd != null) {
      result.setObj(jcd);
      result.setState(1);
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcdsByPageAndJcdAndHuanZheXinXi.htm"}, method = {RequestMethod.POST})
  public void findJcdsByPageAndJcdAndHuanZheXinXi(HttpServletResponse response, Page page, JcdSearchForm jcd, HuanZheXinXi huanzhexinxi, Integer haveBaogao) {
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.iJcdService.findJcdsByPageAndJcdAndHuanZheXinXi(page, 
          jcd, huanzhexinxi, haveBaogao);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getHzxxJiuzhenDateList.htm"}, method = {RequestMethod.GET})
  public void getHzxxJiuzhenDateList(@RequestParam("hzid") Long hzid, HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("得到患者所有做过的日期列表");
    String jcxmid = request.getParameter("jcxmid");
    Integer jcxmId = null;
    if (jcxmid != null)
      try {
        jcxmId = Integer.valueOf(Integer.parseInt(jcxmid));
      } catch (Exception exception) {} 
    List list = this.iJcdService.getHzxxJcsjList(hzid, jcxmId);
    if (list != null && list.size() > 0) {
      re.setState(1);
      re.setObj(list);
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/getHuanzheJiuzhenDateList.htm"}, method = {RequestMethod.GET})
  public void getHuanzheJiuzhenDateList(@RequestParam("hzid") Long hzid, HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("得到患者所有做过的日期列表");
    String jcxmid = request.getParameter("jcxmid");
    Integer jcxmId = null;
    if (jcxmid != null)
      try {
        jcxmId = Integer.valueOf(Integer.parseInt(jcxmid));
      } catch (Exception exception) {} 
    List list = this.iJcdService.getHuanzheJcsjList(hzid, jcxmId);
    if (list != null && list.size() > 0) {
      re.setState(1);
      re.setObj(list);
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/getHuanzheJcjgList.htm"}, method = {RequestMethod.GET})
  public void getHuanzheJcjgList(@RequestParam("hzid") Long hzid, HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("取得患者检查结果列表");
    HttpSession session = request.getSession();
    String gonghao = session.getAttribute("gonghao").toString();
    try {
      int jcxmid;
      String contextPath = request.getContextPath();
      String vPath = "/UploadFile";
      String realPath = request.getSession().getServletContext()
        .getRealPath(vPath);
      String jcxmidStr = request.getParameter("jcxmid");
      String date = request.getParameter("date");
      if (jcxmidStr != null && !jcxmidStr.isEmpty() && !"null".equals(jcxmidStr)) {
        jcxmid = Integer.parseInt(jcxmidStr);
      } else {
        jcxmid = 0;
      } 
      if (date != null && ("null".equals(date) || date.isEmpty()))
        date = null; 
      List list = this.iJcdService.getHuanzheJcjgList(
          String.valueOf(realPath) + System.getProperty("file.separator"), String.valueOf(contextPath) + 
          vPath + "/", "/thumb", hzid, jcxmid, date);
      re.setState(1);
      re.setObj(list);
    } catch (NumberFormatException e) {
      re.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/getHuanzhePDFJcjgList.htm"}, method = {RequestMethod.GET})
  public void getHuanzhePDFJcjgList(@RequestParam("hzid") Long hzid, HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("取得患者PDF检查结果列表");
    HttpSession session = request.getSession();
    String gonghao = session.getAttribute("gonghao").toString();
    try {
      int jcxmid;
      String vPath = "/UploadFile";
      String realPath = request.getSession().getServletContext()
        .getRealPath(vPath);
      String jcxmidStr = request.getParameter("jcxmid");
      String date = request.getParameter("date");
      if (jcxmidStr != null && !jcxmidStr.isEmpty() && !"null".equals(jcxmidStr)) {
        jcxmid = Integer.parseInt(jcxmidStr);
      } else {
        jcxmid = 0;
      } 
      if ("null".equals(date) || date.isEmpty())
        date = null; 
      List list = this.iJcdService.getHuanzhePDFJcjgList(realPath, vPath, hzid, jcxmid, date);
      re.setGonghao(gonghao);
      re.setState(1);
      re.setObj(list);
    } catch (NumberFormatException e) {
      re.setGonghao(gonghao);
      re.setState(1);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/getHuanzheJcxmByHzidList.htm"}, method = {RequestMethod.GET})
  public void getHuanzheJcxmByHzidList(@RequestParam("hzid") Long hzid, HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("取得患者所有已完成检查单");
    List list = this.iJcdService.getFinishHuanzheJcxmListByHzid(hzid);
    if (list.size() > 0) {
      re.setState(1);
      re.setObj(list);
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/getHzxxJcxmByHzidAndDateList.htm"}, method = {RequestMethod.GET})
  public void getFinishHzxxJcxmByHzidAndDateList(@RequestParam("hzid") Long hzid, HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("取得患者指定日期里的完成检查单");
    String date = request.getParameter("date");
    if ("".equals(date) || "null".equals(date))
      date = null; 
    List list = this.iJcdService.getFinishHzxxJcxmByHzidAndDateList(hzid, 
        date);
    if (list.size() > 0) {
      re.setState(1);
      re.setObj(list);
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/getHuanzheJcxmByHzidAndDateList.htm"}, method = {RequestMethod.GET})
  public void getHuanzheJcxmByHzidAndDateList(@RequestParam("hzid") Long hzid, HttpServletRequest request, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("取得患者指定日期里的完成检查单");
    String date = request.getParameter("date");
    List list = this.iJcdService.getFinishHuanzheJcxmByHzidAndDateList(
        hzid, date);
    if (list.size() > 0) {
      re.setState(1);
      re.setObj(list);
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"/getHzReportList.htm"}, method = {RequestMethod.GET})
  public void getHuanzheJcjgList(Long hzid, String date, Integer jcxmid, HttpServletResponse response) {
    MyResult re = new MyResult();
    re.setDoing("取得患者检查报告列表");
    Date d = new Date();
    try {
      d = (new SimpleDateFormat("yyyy-MM-dd")).parse(date);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    List list = this.iJcdService.getJcdListByJcxmidAndDate(hzid, d, jcxmid.intValue());
    if (list.size() > 0) {
      re.setState(1);
      re.setObj(list);
    } 
    JSONWriterUtils.writeJSONObj(re, response);
  }
  
  @RequestMapping(value = {"getTimeAndYb.htm"}, method = {RequestMethod.POST})
  public void getTimeAndYb(@RequestParam("url") String url, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取造影图片时间和眼别");
    Map map = new HashMap<>();
    String root = request.getSession().getServletContext().getRealPath("/");
    try {
      url = url.substring(url.indexOf("/UploadFile"));
      url = url.replaceAll("/thumb", "");
      map = TopconFileUtils.getTopconTimeAndYb(String.valueOf(root) + url);
      if (!map.isEmpty()) {
        result.setObj(map);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getListOfWatchJcdByJcdSearchForm.htm"}, method = {RequestMethod.POST})
  public void getListOfWatchJcdByJcdSearchForm(HttpServletRequest request, HttpServletResponse response, JcdSearchForm jcdsearchform) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    this.doing = "检查单结束时间集合阅片中使用到";
    MyResult result = new MyResult();
    List list = new ArrayList();
    try {
      list = this.iJcdService
        .getListOfWatchJcdByJcdSearchForm(jcdsearchform);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(list);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getExecuteJcdListForCapture.htm"}, method = {RequestMethod.POST})
  public void getExecuteJcdListForCapture(String ip, JcdSearchForm jcdsearchform, Page page, HttpServletRequest request, HttpServletResponse response) {
    String gonghao = jcdsearchform.getJcys();
    MyResult result = new MyResult();
    Map map = new HashMap<>();
    this.doing = "查询待检查单列表";
    try {
      Map shebeiMap = (Map) this.sheBeiService
        .getShebeiListByManagerUserAndIp(jcdsearchform.getJcys(), 
          ip).get(0);
      int shebeiId = -1;
      if (shebeiMap != null) {
        shebeiId = Integer.parseInt(shebeiMap.get("id").toString());
        jcdsearchform.setJcsbId(Integer.valueOf(shebeiId));
      } 
      jcdsearchform.setJcys("");
      List list = this.iJcdService.getJcdListByJcdSearchFormPaidui(page, 
          jcdsearchform);
      map.put("list", list);
      map.put("page", page);
      map.put("shebeiId", Integer.valueOf(shebeiId));
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
    result.setObj(map);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJCDInfoByjcdhForCapture.htm"}, method = {RequestMethod.POST})
  public void findJCDInfoByjcdhForCapture(String gonghao, String jcdh, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "根据检查单好查询相应的患者信息";
    List<Map<String, Object>> list = new ArrayList<>();
    try {
      list = this.iJcdService.findJCDInfoByjcdhForCapture(jcdh);
      Map<String, Object> mapJcd = (list.size() > 0) ? list.get(0) : null;
      String jiuzhenid = mapJcd.get("jiuzhenid").toString();
      List<Jzjl> jzjlList = this.jzjlService
        .getJzjlListByJiuzhenId(jiuzhenid);
      map.put("jcd", mapJcd);
      map.put("jzjls", jzjlList);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    result.setObj(map);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateBuChuanState"}, method = {RequestMethod.POST})
  public void updateBuChuanState(Jcd jcd, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "修改检查单的状态为待补传";
    try {
      Jcd jcdSelect = this.iJcdService.getJcdById(jcd.getId());
      jcdSelect.setBiaoshi(Integer.valueOf(52));
      this.iJcdService.updateJcd(jcdSelect);
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/deleteJcdByOneselfAdd.htm"}, method = {RequestMethod.POST})
  public void deleteJcdByOneselfAdd(Jcd jcd, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "删除自己添加的检查单";
    try {
      Jcd jcdSelect = this.iJcdService.getJcdById(jcd.getId());
      if (jcdSelect.getBiaoshi().intValue() == 50 && gonghao.equals(jcdSelect.getInsertUser())) {
        this.iJcdService.deleteJcd(jcdSelect);
        this.iPaiduiService.delPaiduiById(jcdSelect.getId());
        this.message = "操作成功";
        this.doState = 1;
      } else {
        this.doState = 0;
        this.message = "您没有权限删除该检查单！";
      } 
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcdsByPageAndJcdAndHuanZheXinXiXiNan.htm"}, method = {RequestMethod.POST})
  public void findJcdsByPageAndJcdAndHuanZheXinXiXiNan(HttpServletResponse response, Page page, JcdSearchForm jcd, HuanZheXinXi huanzhexinxi, Integer haveBaogao) {
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.iJcdService.findJcdsByPageAndJcdAndHuanZheXinXi(page, 
          jcd, huanzhexinxi, haveBaogao);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/deleteJcdByJcd.htm"}, method = {RequestMethod.POST})
  public void deleteJcdByJcd(Jcd jcd, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "删除相应的检查单";
    try {
      this.iJcdService.deleteJcd(jcd);
      this.iPaiduiService.delPaiduiById(jcd.getId());
      this.message = "操作成功";
      this.doState = 1;
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getTreatResult.htm"}, method = {RequestMethod.POST})
  public void getTreatResult(String patientId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    try {
      Map map = this.iJcdService.getTreatResult(patientId);
      result.setObj(map);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
