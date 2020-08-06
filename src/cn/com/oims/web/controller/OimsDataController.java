package cn.com.oims.web.controller;

import cn.com.oims.common.Copy_2_of_ExcelUtilLogInfo;
import cn.com.oims.common.ListClass;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.service.IBaogaoMobanService;
import cn.com.oims.service.IBaogaoService;
import cn.com.oims.service.IBgXxService;
import cn.com.oims.service.IBuMenService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsDataService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IUserService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.BaogaoXinxiSearchForm;
import cn.com.oims.web.form.BgMbSearchForm;
import cn.com.oims.web.form.BuMenSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import cn.com.oims.web.form.JcXmSearchForm;
import cn.com.oims.web.form.JcdSearchForm;
import cn.com.oims.web.form.LogSearchForm;
import cn.com.oims.web.form.SheBeiSearchForm;
import cn.com.oims.web.form.SrMbSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import cn.com.oims.web.form.YuanGongSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
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
@RequestMapping({"oims_data"})
public class OimsDataController {
  private IOimsDataService oimsdataService;
  
  private IBuMenService bumenService;
  
  private IYuanGongService yuangongService;
  
  private IOimsLogService logService;
  
  private IUserService userservice;
  
  private IBaogaoMobanService bgService;
  
  private IBgXxService bgxxService;
  
  private IJcdService JcdService;
  
  private ISheBeiService shebeiService;
  
  private IBaogaoService baogaoService;
  
  private IBaogaoMobanService bgmbService;
  
  @Autowired
  public void setBgmbService(IBaogaoMobanService bgmbService) {
    this.bgmbService = bgmbService;
  }
  
  @Autowired
  public void setBaogaoService(IBaogaoService baogaoService) {
    this.baogaoService = baogaoService;
  }
  
  @Autowired
  public void setShebeiService(ISheBeiService shebeiService) {
    this.shebeiService = shebeiService;
  }
  
  @Autowired
  public void setJcdService(IJcdService jcdService) {
    this.JcdService = jcdService;
  }
  
  @Autowired
  public void setBgxxService(IBgXxService bgxxService) {
    this.bgxxService = bgxxService;
  }
  
  @Autowired
  public void setOimsdataService(IOimsDataService oimsdataService) {
    this.oimsdataService = oimsdataService;
  }
  
  @Autowired
  public void setBumenService(IBuMenService bumenService) {
    this.bumenService = bumenService;
  }
  
  @Autowired
  public void setYuangongService(IYuanGongService yuangongService) {
    this.yuangongService = yuangongService;
  }
  
  @Autowired
  public void setLogService(IOimsLogService logService) {
    this.logService = logService;
  }
  
  @Autowired
  public void setUserservice(IUserService userservice) {
    this.userservice = userservice;
  }
  
  @Autowired
  public void setBgService(IBaogaoMobanService bgService) {
    this.bgService = bgService;
  }
  
  @RequestMapping(value = {"/exportUserInfo.htm"}, method = {RequestMethod.POST})
  public void exportUserDataInfo(HttpServletRequest request, HttpServletResponse response, UserSearchForm usf) {
    request.getParameter("job");
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(String.valueOf(usf.getJob()) + "controller层获取的角色");
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    String u = request.getParameter("userjiaose");
    System.out.println("判断usf是否为空，控制层：" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new UserSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsdataService.getUserInfoList(usf);
      if (list.size() == 0) {
        result.setMessage("没有相应记录不能导出");
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getUserList();
        File exportPath = eu.exportLogInfo(path, list, l);
        result.setObj(exportPath.getName());
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportYuanGongInfo.htm"}, method = {RequestMethod.POST})
  public void exportYuanGongDataInfo(HttpServletRequest request, HttpServletResponse response, YuanGongSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("判断YuanGongusf是否为空，控制层：" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new YuanGongSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.yuangongService.getYuanGongList(usf);
      if (list.size() == 0) {
        result.setMessage("没有相应记录不能导出");
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getYuanGongList();
        File exportPath = eu.exportLogInfo(path, list, l);
        result.setObj(exportPath.getName());
        System.out
          .println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportBuMenInfo.htm"}, method = {RequestMethod.POST})
  public void exportBuMenDataInfo(HttpServletRequest request, HttpServletResponse response, BuMenSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("判断bmUSF是否为空，控制层" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new BuMenSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.bumenService.getBuMenList(usf);
      if (list.size() == 0) {
        result.setMessage("没有相应记录不能导出");
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getBuMenList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        System.out
          .println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportSheBeiInfo.htm"}, method = {RequestMethod.POST})
  public void exportSheBeiDataInfo(HttpServletRequest request, HttpServletResponse response, SheBeiSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("判断bmUSF是否为空，控制层" + ((usf == null) ? 1 : 0));
    System.out.println(String.valueOf(usf.getBumenId()) + "部门id");
    if (usf == null)
      usf = new SheBeiSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsdataService.getSheBeiInfoList(usf);
      if (list.size() == 0) {
        result.setMessage("没有相应记录不能导出");
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getSheBeiList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportPatientInfo.htm"}, method = {RequestMethod.POST})
  public void exportPatientDataInfo(HttpServletRequest request, HttpServletResponse response, HzXxSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("判断bmUSF是否为空，控制层" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new HzXxSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsdataService.getHuanZheInfoList(usf);
      if (list.size() == 0) {
        result.setMessage("没有相应记录不能导出");
        System.out.println(String.valueOf(list.size()) + "list长度");
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getPatientList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        System.out
          .println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportJcXmInfo.htm"}, method = {RequestMethod.POST})
  public void exportJcXmDataInfo(HttpServletRequest request, HttpServletResponse response, JcXmSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("判断bmUSF是否为空，控制层" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new JcXmSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsdataService.getJcXmInfoList(usf);
      if (list.size() == 0) {
        result.setMessage("没有相应记录不能导出");
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getJcXmList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        System.out
          .println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportJcdInfo.htm"}, method = {RequestMethod.POST})
  public void exportJcdDataInfo(HttpServletRequest request, HttpServletResponse response, JcdSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("usf是否为空" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new JcdSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsdataService.getJcdInfoList(usf);
      if (list.size() == 0) {
        result.setMessage("没有相应记录不能导出");
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getJcdList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        System.out
          .println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcdBypage.htm"}, method = {RequestMethod.POST})
  public void findJcdByPage(HttpServletRequest request, HttpServletResponse response, Page page) {
    Map<String, Object> map = new HashMap<>();
    MyResult result = new MyResult();
    result.setDoing("分页查询检查单");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    try {
      map = this.JcdService.findJcdByPage(page);
      if (map != null) {
        result.setState(1);
        result.setMessage("成功");
        result.setObj(map);
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findBgXxBypage.htm"}, method = {RequestMethod.POST})
  public void findBgXxByPage(HttpServletRequest request, HttpServletResponse response, Page page) {
    Map<String, Object> map = new HashMap<>();
    MyResult result = new MyResult();
    result.setDoing("分页查询报告信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    try {
      map = this.bgxxService.findBgXx4Page(page);
      if (map != null) {
        result.setState(1);
        result.setMessage("成功");
        result.setObj(map);
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/exportBgXxInfo.htm"}, method = {RequestMethod.POST})
  public void exportBgXxDataInfo(HttpServletRequest request, HttpServletResponse response, BaogaoXinxiSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("报告是否为空" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new BaogaoXinxiSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsdataService.getbgxxInfoList(usf);
      if (list.size() == 0) {
        result.setMessage("没有相应记录不能导出");
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getBaoGaoList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        System.out
          .println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportSrMbInfo.htm"}, method = {RequestMethod.POST})
  public void exportSrMbDataInfo(HttpServletRequest request, HttpServletResponse response, SrMbSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("判断是否为空" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new SrMbSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsdataService.getSrMbInfoList(usf);
      if (list.size() == 0) {
        result.setMessage("没有要导出的记录");
        System.out.println(list.size());
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getShuRuMoBanList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        System.out
          .println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportLogInfo.htm"}, method = {RequestMethod.POST})
  public void exportLogDataInfo(HttpServletRequest request, HttpServletResponse response, LogSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("判断是否为空" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new LogSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      System.out.println("将要卡死============================");
      list = this.logService.getLogInfoList(usf);
      System.out.println("没有卡死============================");
      if (list.size() == 0) {
        result.setMessage("没有要导出的记录");
        System.out.println(list.size());
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getLogList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        System.out.println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
      System.out.println("有异常======================");
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportBgMbInfo.htm"}, method = {RequestMethod.POST})
  public void exportBgMbDataInfo(HttpServletRequest request, HttpServletResponse response, BgMbSearchForm usf) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    System.out.println(path);
    System.out.println(String.valueOf(usf.getJcxmIds()) + "jcxmIds");
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导出信息");
    System.out.println("usf是否为空" + ((usf == null) ? 1 : 0));
    if (usf == null)
      usf = new BgMbSearchForm(); 
    List<Map<String, Object>> list = null;
    try {
      list = this.oimsdataService.getBgMbInfoList(usf);
      if (list.size() == 0) {
        result.setMessage("没有要导出的记录");
        System.out.println(list.size());
      } else {
        Copy_2_of_ExcelUtilLogInfo eu = new Copy_2_of_ExcelUtilLogInfo();
        List l = ListClass.getBaoGaoMoBanList();
        String exportPath = eu.exportLogInfo(path, list, l).getName();
        result.setObj(exportPath);
        System.out.println("导出结束+==================================================================");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllSheBeiDataImport.htm"}, method = {RequestMethod.POST})
  public void findAllSheBeiByPage(HttpServletRequest req, HttpServletResponse res, Page page) {
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("查询所有设备信息");
    Map map = new HashMap<>();
    SheBei shebei = new SheBei();
    shebei.setSbmc("");
    shebei.setQiyong(true);
    try {
      map = this.shebeiService.findAllSheBeisByPageAndSheBei(page, shebei);
      if (map != null)
        result.setState(1); 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, res);
  }
  
  @RequestMapping(value = {"/findAllBgXxByPage.htm"}, method = {RequestMethod.POST})
  public void findAllBgXxByPage(HttpServletRequest req, HttpServletResponse res, Page page) {
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("查询所有报告信息");
    Map map = null;
    try {
      map = this.bgxxService.findBgXx4Page(page);
      if (map != null)
        result.setState(1); 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, res);
  }
  
  @RequestMapping(value = {"/findAllBgXx.htm"}, method = {RequestMethod.POST})
  public void findAllBaogao(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("查询所有报告信息");
    try {
      List list = new ArrayList();
      list = this.baogaoService.findAllBaogao();
      if (list != null) {
        result.setObj(list);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findManHasSomeQX.htm"}, method = {RequestMethod.POST})
  public void findManHasSomeQX(HttpServletRequest request, HttpServletResponse response, int quanxianID) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("查询所有报告信息");
    List list = new ArrayList();
    list = this.oimsdataService.getDoctorHasCheckList(quanxianID);
    if (list != null) {
      result.setObj(list);
      result.setState(1);
    } else {
      result.setMessage("没有相应的权限");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllbgmb.htm"}, method = {RequestMethod.POST})
  public void findAllBgMb(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("查询所有报告信息");
    List list = new ArrayList();
    list = this.bgmbService.findAllBaogaoMobans();
    if (list != null && list.size() != 0) {
      result.setObj(list);
      result.setState(1);
    } else {
      result.setMessage("没有可用模版");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getBuMenBaoGaoInfo"}, method = {RequestMethod.POST})
  public void findBuMenBaoGaoInfo(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("查询所有报告信息");
    List list = new ArrayList();
    list = this.oimsdataService.getBuMenBaoGaoInfo();
    System.out.println("controller层list的长度" + list.size());
    System.out.println();
    if (list != null) {
      result.setObj(list);
      result.setState(1);
    } else {
      result.setMessage("没有相应的权限");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getBuMenJcxmInfo.htm"}, method = {RequestMethod.POST})
  public void getBuMenJcxmInfo(HttpServletRequest request, HttpServletResponse response, int id) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("查询所有报告信息");
    List list = new ArrayList();
    System.out.println("controller层list的长度" + list.size());
    System.out.println();
    if (list != null) {
      result.setObj(list);
      result.setState(1);
    } else {
      result.setMessage("没有相应的权限");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findSheBeisInBuMen.htm"}, method = {RequestMethod.POST})
  public void findJcxmsInBuMen(HttpServletRequest request, HttpServletResponse response, String buMenId) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("查询部门下的检查项目信息");
    List<SheBei> list = new ArrayList();
    list = this.oimsdataService.getSheBeisInBuMen(buMenId);
    if (list != null){
      for (int i = 0; i < list.size(); i++){
        SheBei sheBei = list.get(i);
      }
    }
    if (list != null) {
      result.setObj(list);
      result.setState(1);
    } else {
      result.setMessage("没有查到对应设备");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcXmsInSheBei.htm"}, method = {RequestMethod.POST})
  public void findJcXmsInSheBei(HttpServletRequest request, HttpServletResponse response, String buMenId) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("查询某个科室下的检查项目信息");
    List<SheBei> list = new ArrayList<>();
    list = this.oimsdataService.getSheBeisInBuMen(buMenId);
    System.out.println(result.getDoing());
    String jcxmIds = "";
    if (list != null && list.size() > 0)
      for (int i = 0; i < list.size(); i++) {
        SheBei s = list.get(i);
        if (s.getJcxmIds() != null && !s.getJcxmIds().equals("")) {
          jcxmIds = String.valueOf(jcxmIds) + s.getJcxmIds() + ",";
          System.out.println(String.valueOf(jcxmIds) + "=========检查项目===============");
        } 
      }  
    if (jcxmIds != null && !jcxmIds.isEmpty()) {
      jcxmIds = jcxmIds.substring(0, jcxmIds.lastIndexOf(","));
      list = this.oimsdataService.getJcxmsInSheBei(jcxmIds);
    } 
    if (list != null) {
      result.setState(1);
      result.setObj(list);
    } else {
      result.setState(0);
    } 
    result.setMessage("请选择一个检查科室");
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
