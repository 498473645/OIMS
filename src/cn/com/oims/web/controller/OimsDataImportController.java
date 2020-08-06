package cn.com.oims.web.controller;

import cn.com.oims.common.CheckTeleFormat;
import cn.com.oims.common.ExcelAnalysis;
import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.common.ListClass;
import cn.com.oims.common.getListForPage;
import cn.com.oims.dao.pojo.Baogao;
import cn.com.oims.dao.pojo.BaogaoMoban;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.service.IBaogaoMobanService;
import cn.com.oims.service.IBaogaoService;
import cn.com.oims.service.IBuMenService;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IOimsDataService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.ISheBeiService;
import cn.com.oims.service.IShuruMobanService;
import cn.com.oims.service.IUserService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.HuanZheForm;
import cn.com.oims.web.form.UserForm;
import cn.com.oims.web.form.YgForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping({"oims_data_import"})
public class OimsDataImportController {
  private IOimsDataService oimsdataService;
  
  private IBuMenService bumenService;
  
  private IYuanGongService yuangongService;
  
  private IOimsLogService logService;
  
  private IUserService userservice;
  
  private ISheBeiService shebeiService;
  
  private IHuanZheXinXiService patientService;
  
  private IJcxmService jcxmService;
  
  private IJcdService jcdService;
  
  private IBaogaoMobanService baogaoService;
  
  private IShuruMobanService shurumobanService;
  
  private IBaogaoService bgxxService;
  
  @Autowired
  public void setShurumobanService(IShuruMobanService shurumobanService) {
    this.shurumobanService = shurumobanService;
  }
  
  @Autowired
  public void setPatientService(IHuanZheXinXiService patientService) {
    this.patientService = patientService;
  }
  
  @Autowired
  public void setBaogaoService(IBaogaoMobanService baogaoService) {
    this.baogaoService = baogaoService;
  }
  
  @Autowired
  public void setJcdService(IJcdService jcdService) {
    this.jcdService = jcdService;
  }
  
  @Autowired
  public void setJcxmService(IJcxmService jcxmService) {
    this.jcxmService = jcxmService;
  }
  
  @Autowired
  public void setShebeiService(ISheBeiService shebeiService) {
    this.shebeiService = shebeiService;
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
  public void setBgxxService(IBaogaoService bgxxService) {
    this.bgxxService = bgxxService;
  }
  
  DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
  
  int maxNum = 15;
  
  int pageNum = 0;
  
  public List ValiateUser(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String jiaose = map.get("jiaose").toString();
      String gonghao = map.get("gonghao").toString();
      String email = map.get("email").toString();
      String jishu = map.get("jishu").toString();
      String qiyong = map.get("qiyong").toString();
      boolean a = (!jiaose.isEmpty() && CheckTeleFormat.checkStringToInt(jiaose));
      boolean c = (!gonghao.isEmpty() && !gonghao.equals("null"));
      boolean t = (!qiyong.equals("null") && !qiyong.equals(""));
      boolean y = (!jishu.equals("") && CheckTeleFormat.checkStringToInt(jishu));
      if (a && c && t && y) {
        b = true;
      } else {
        b = false;
      } 
      if (b && this.userservice.findUserByGongHao(gonghao) == null) {
        User u = new User();
        u.setUid(((String)map.get("uid")).equals("") ? "abc" : (String)map
            .get("uid"));
        u.setPassword(((String)map.get("password")).equals("") ? "abc" : 
            (String)map.get("password"));
        u.setGonghao(gonghao);
        u.setEmail(email);
        u.setJiaose(Integer.valueOf(jiaose));
        u.setQiyong(((String)map.get("qiyong")).equals("启用"));
        u.setJishu(Integer.valueOf(jishu));
        u.setQuanxian(((String)map.get("quanxian") == "null") ? "" : (String)map.get("quanxian"));
        try {
          this.userservice.updateUser(u);
        } catch (Exception e) {
          this.userservice.saveUser(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongUserInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongUserDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongUser");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importUserInfo.htm"}, method = {RequestMethod.POST})
  public void importUserDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
    System.out.println("上传结束服务器路径" + uploadPath + "开始解析");
    try {
      List<Map<String, Object>> userList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getUserList().get(1),
                (List) ListClass.getUserList().get(0));
      if (userList == null) {
        result.setState(2);
      } else {
        List l = ValiateUser(userList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongUser", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  @RequestMapping(value = {"/importYuanGongInfo.htm"}, method = {RequestMethod.POST})
  public void importYuanGongDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
    try {
      List<Map<String, Object>> YgList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath, 
                (List) ListClass.getYuanGongList().get(1),
                (List) ListClass.getYuanGongList().get(0));
      if (YgList == null) {
        result.setState(2);
      } else {
        List l = ValiateYuanGong(YgList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongYuanGong", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List ValiateYuanGong(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String bumenId = map.get("bumenId").toString();
      String bgsId = map.get("bgsId").toString();
      String shengri = map.get("shengri").toString();
      String email = map.get("email").toString();
      String gonghao = map.get("gonghao").toString();
      boolean a = (!id.equals("") && CheckTeleFormat.checkStringToInt(id));
      boolean d = !((bumenId.equals("") || !CheckTeleFormat.checkStringToInt(bumenId.toString())) && !bumenId.isEmpty() && !bumenId.equals("null"));
      boolean c = !((bgsId.equals("") || !CheckTeleFormat.checkStringToInt(bgsId.toString())) && !bgsId.isEmpty() && !bgsId.equals("null"));
      boolean f = (!gonghao.equals("") && CheckTeleFormat.checkStringToInt(gonghao));
      if (a && c && d && f) {
        b = true;
      } else {
        b = false;
      } 
      if (b && this.yuangongService.obtainYuanGongByGonghao(gonghao) == null) {
        YgForm u = new YgForm();
        UserForm y = new UserForm();
        u.setId(id);
        u.setYggonghao((String)map.get("gonghao"));
        u.setBumenId((map.get("bumenId").toString().equals("") || map.get("bumenId").toString().equals("null")) ? null : bumenId);
//        u.setBgsId((map.get("bgsId").toString().equals("") || map.get("bumenId").toString().equals("null")) ? null : bgsId);
        u.setXingming((String)map.get("xingming"));
        u.setZhiwu((String)map.get("zhiwu"));
        u.setShengri(CheckTeleFormat.getDateString(shengri));
        u.setDiqu((String)map.get("diqu"));
        u.setSfzh((String)map.get("sfzh"));
        String dianhua = (String)map.get("dianhua");
        String shouji = (String)map.get("shouji");
        u.setDianhua(CheckTeleFormat.checkphone(dianhua));
        u.setShouji(CheckTeleFormat.checkphone(shouji));
        u.setJtdz((String)map.get("jtdz"));
        u.setYgemail(email);
        u.setJianjie((String)map.get("jianjie"));
        u.setXingbie(((String)map.get("xingbie") == "男") ? "1 " : "0");
        try {
          this.yuangongService.updateYuanGong(u, y);
        } catch (Exception t) {
          this.yuangongService.saveYuanGong(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongYuanGongInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongYuanGongDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongYuanGong");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importBuMenInfo.htm"}, method = {RequestMethod.POST})
  public void importBuMenDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      List<Map<String, Object>> BuMenList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getBuMenList().get(1),
                (List) ListClass.getBuMenList().get(0));
      if (BuMenList == null) {
        result.setState(2);
      } else {
        List l = ValiateBuMen(BuMenList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongBuMen", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List ValiateBuMen(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String dwid = map.get("dwid").toString();
      boolean a = (!id.equals("") && CheckTeleFormat.checkStringToInt(id));
      boolean c = !((dwid.equals("") || !CheckTeleFormat.checkStringToInt(dwid)) && !dwid.isEmpty());
      if (a && c) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        BuMen u = new BuMen();
        u.setId(Integer.valueOf(id));
        u.setDwid(Integer.valueOf(dwid));
        u.setOfficeId((String)map.get("officeId"));
        u.setBmbm((String)map.get("bmbm"));
        u.setBmmc((String)map.get("bmmc"));
        u.setLxr((String)map.get("lxr"));
        u.setLxdh(CheckTeleFormat.checkphone((String)map.get("lxdh")));
        u.setYwfw((String)map.get("ywfw"));
        try {
          this.bumenService.updateBuMen(u);
        } catch (Exception e) {
          this.bumenService.saveBuMen(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongBuMenInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongBuMenDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongBuMen");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importSheBeiInfo.htm"}, method = {RequestMethod.POST})
  public void importSheBeiDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      List<Map<String, Object>> SheBeiList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getSheBeiList().get(1),
                (List) ListClass.getSheBeiList().get(0));
      if (SheBeiList == null) {
        result.setState(2);
      } else {
        List l = ValiateSheBei(SheBeiList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongSheBei", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List ValiateSheBei(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String bmId = map.get("bmId").toString();
      String protocol = map.get("protocol").toString();
      boolean a = (!id.equals("") && CheckTeleFormat.checkStringToInt(id));
      boolean c = (!bmId.equals("") && CheckTeleFormat.checkStringToInt(bmId));
      boolean d = (!protocol.equals("") && CheckTeleFormat.checkStringToInt(protocol));
      if (a && c && d) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        SheBei u = new SheBei();
        u.setId(Integer.valueOf(id));
        u.setSbmc((String)map.get("sbmc"));
        u.setGgxh((String)map.get("ggxh"));
        u.setBmId(Integer.valueOf(bmId));
        u.setBgsId((String)map.get("bgsId"));
        u.setIp((String)map.get("ip"));
        u.setSmbUser((String)map.get("smbUser"));
        u.setSmbPassword((String)map.get("smbPassword"));
        u.setSmbName((String)map.get("smbName"));
        u.setOnline(((String)map.get("online") == "在线"));
        u.setManageUser((String)map.get("manageUser"));
        u.setProtocol(Integer.valueOf(protocol));
        u.setJcxmIds((String)map.get("jcxmIds"));
        u.setQiyong(((String)map.get("qiyong") == "启用"));
        try {
          this.shebeiService.updateSheBei(u);
        } catch (Exception e) {
          this.shebeiService.saveSheBei(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongSheBeiInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongSheBeiDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongSheBei");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importPatientInfo.htm"}, method = {RequestMethod.POST})
  public void importPatientDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      List<Map<String, Object>> PatientList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getPatientList().get(1),
                (List) ListClass.getPatientList().get(0));
      if (PatientList == null) {
        result.setState(2);
      } else {
        List l = Valiatepatient(PatientList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongpatient", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List Valiatepatient(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String binglihao = map.get("binglihao").toString();
      String xingming = map.get("xingming").toString();
      String diquId = map.get("diquId").toString();
      String shengri = map.get("shengri").toString();
      String zcrq = map.get("zcrq").toString();
      String jilvren = map.get("jilvren").toString();
      String laiyuan = map.get("laiyuan").toString();
      String postcode = map.get("youbian").toString();
      String shouji = map.get("shouji").toString();
      boolean a = (id != null && CheckTeleFormat.checkStringToInt(id));
      boolean c = !((diquId.equals("") || !CheckTeleFormat.checkStringToInt(diquId)) && !diquId.equals(""));
      boolean d = (!laiyuan.equals("") && CheckTeleFormat.checkStringToInt(laiyuan));
      boolean e = !((postcode.equals("") || !CheckTeleFormat.checkPostcode(postcode)) && !postcode.isEmpty() && !postcode.equals("null"));
      boolean g = (!binglihao.equals("") && !binglihao.equals("null"));
      boolean h = (!xingming.equals("") && !xingming.equals("null"));
      boolean k = (!jilvren.equals("") && !jilvren.equals("null"));
      if (a && c && d && e && g && h && k) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        HuanZheForm u = new HuanZheForm();
        u.setId(id);
        u.setDiquId(diquId.equals("") ? null : diquId);
        u.setBinglihao((String)map.get("binglihao"));
        u.setXingming((String)map.get("xingming"));
        u.setXingbie(((String)map.get("xingbie") == "男") ? "1" : "0");
        u.setShengri(CheckTeleFormat.getDateString(shengri));
        u.setDiqu((String)map.get("diqu"));
        u.setSfzh((String)map.get("sfzh"));
        u.setGzdw((String)map.get("gzdw"));
        u.setDwyb((String)map.get("dwyb"));
        u.setDwdz((String)map.get("dwdz"));
        u.setDwdh((String)map.get("dwdh"));
        u.setJtdz((String)map.get("jtdz"));
        u.setYoubian((postcode.equals("") || postcode.equals("null")) ? null : postcode);
        u.setShouji(CheckTeleFormat.checkphone(shouji));
        u.setDianhua((String)map.get("dianhua"));
        u.setHzlxr((String)map.get("hzlxr"));
        u.setHzlxrdh((String)map.get("hzlxrdh"));
        u.setYhzgx((String)map.get("yhzgx"));
        u.setYibao(((String)map.get("yibao") == "是") ? "1" : "0");
        u.setShangbao(((String)map.get("shangbao") == "是") ? "1" : 
            "0");
        u.setGongfei(((String)map.get("gongfei") == "是") ? "1" : "0");
        u.setZcrq(CheckTeleFormat.getDateString(zcrq));
        u.setJilvren(jilvren);
        u.setBeizhu((String)map.get("beizhu"));
        u.setLaiyuan(laiyuan);
        try {
          this.patientService.updateHuanZhe(u);
        } catch (Exception t) {
          this.patientService.saveHuanZhe(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongpatientInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongpatientDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongpatient");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setPageSize(Integer.valueOf(this.maxNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importJcXmInfo.htm"}, method = {RequestMethod.POST})
  public void importJcXmDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      List<Map<String, Object>> JcXmList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getJcXmList().get(1),
                (List) ListClass.getJcXmList().get(0));
      if (JcXmList == null) {
        result.setState(2);
      } else {
        List l = Valiatejcxm(JcXmList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongJcXm", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List Valiatejcxm(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String fatherId = map.get("fatherId").toString();
      String categoryId = map.get("categoryId").toString();
      String bianma = (String)map.get("bianma");
      String xmmc = (String)map.get("xmmc");
      boolean a = (id != null && CheckTeleFormat.checkStringToInt(id));
      boolean c = (!fatherId.equals("") && CheckTeleFormat.checkStringToInt(fatherId));
      boolean d = (!categoryId.equals("") && CheckTeleFormat.checkStringToInt(categoryId));
      boolean e = (!bianma.equals("") && !bianma.equals("null"));
      boolean f = (!xmmc.equals("") && !xmmc.equals("null"));
      if (a && c && d && e && f) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        Jcxm u = new Jcxm();
        u.setId(Integer.valueOf(id));
        u.setBianma(bianma);
        u.setXmmc(xmmc);
        u.setXmms((String)map.get("xmms"));
        u.setFatherId(Integer.valueOf(fatherId));
        u.setCategoryId(Integer.valueOf(categoryId));
        u.setLeftPicPath((String)map.get("leftPicPath"));
        u.setRightPicPath((String)map.get("rightPicPath"));
        try {
          this.jcxmService.updateJcxm(u);
        } catch (Exception t) {
          this.jcxmService.saveJcxm(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongjcxmInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongjcxmDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongJcXm");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setPageSize(Integer.valueOf(this.maxNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importJcdInfo.htm"}, method = {RequestMethod.POST})
  public void importJcdInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      List<Map<String, Object>> JcdList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getJcdList().get(1),
                (List) ListClass.getJcdList().get(0));
      if (JcdList == null) {
        result.setState(2);
      } else {
        List l = ValiateJcd(JcdList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongJcd", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List ValiateJcd(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String jiuzhenId = map.get("jiuzhenId").toString();
      String jcsbId = map.get("jcsbId").toString();
      String huanzheId = map.get("huanzheId").toString();
      String kdksId = map.get("kdksId").toString();
      String biaoti = (String)map.get("biaoti");
      String biaoshi = map.get("biaoshi").toString();
      String yanbie = map.get("yanbie").toString();
      String state = map.get("state").toString();
      String kdTime = (String)map.get("kdTime");
      String jcksTime = (String)map.get("jcksTime");
      String jcjsTime = (String)map.get("jcjsTime");
      String jcdh = (String)map.get("jcdh");
      String jcxmIds = (String)map.get("jcxmIds");
      String kdys = (String)map.get("kdys");
      boolean a = (id != null && CheckTeleFormat.checkStringToInt(id));
      boolean g = (!jcdh.equals("null") && !jcdh.equals(""));
      boolean c = (!jiuzhenId.equals("null") && !jiuzhenId.equals("") && CheckTeleFormat.checkStringToInt(jiuzhenId));
      boolean k = (!biaoti.equals("null") && !biaoti.equals(""));
      boolean d = (!jcsbId.equals("") && CheckTeleFormat.checkStringToInt(jcsbId));
      boolean e = (!huanzheId.equals("") && CheckTeleFormat.checkStringToInt(huanzheId));
      boolean f = (!kdksId.equals("") && CheckTeleFormat.checkStringToInt(kdksId));
      boolean h = (!biaoshi.equals("") && CheckTeleFormat.checkStringToInt(biaoshi));
      boolean i = (!yanbie.equals("") && CheckTeleFormat.checkStringToInt(yanbie));
      boolean j = !((state.equals("") || !CheckTeleFormat.checkStringToInt(state)) && !state.equals("") && !state.equals("null"));
      boolean n = (!jcxmIds.equals("null") && !jcxmIds.equals(""));
      boolean p = (!kdys.equals("null") && !kdys.equals(""));
      boolean q = (!kdTime.equals("") && !kdTime.equals("null"));
      if (a && c && d && e && f && g && h && i && j && k && n && p && q) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        Jcd u = new Jcd();
        u.setId(Long.valueOf(id));
        u.setJcdh(jcdh);
        u.setJiuzhenId(Long.valueOf(jiuzhenId));
        u.setBiaoti(biaoti);
        u.setJcsbId(Integer.valueOf(jcsbId));
        u.setHuanzheId(Long.valueOf(huanzheId));
        u.setJcxmIds(jcxmIds);
        u.setKdksId(Integer.valueOf(kdksId));
        u.setKdys(kdys);
        u.setKdTime(CheckTeleFormat.checkDate(kdTime));
        u.setJcys((String)map.get("jcys"));
        u.setJcksTime(CheckTeleFormat.checkDate(jcksTime));
        u.setJcjsTime(CheckTeleFormat.checkDate(jcjsTime));
        u.setLeftPic((String)map.get("leftPic"));
        u.setRightPic((String)map.get("rightPic"));
        u.setJfbs(((String)map.get("jfbs") == "是"));
        u.setBiaoshi(Integer.valueOf(biaoshi));
        u.setYanbie(Integer.valueOf(yanbie));
        u.setJcyq((String)map.get("jcyq"));
        u.setState((state.equals("") || state.equals("null")) ? null : Integer.valueOf(state));
        try {
          this.jcdService.updateJcd(u);
        } catch (Exception t) {
          this.jcdService.saveJcd(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongJcdInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongJcdDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongJcd");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setPageSize(Integer.valueOf(this.maxNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importBaoGaoInfo.htm"}, method = {RequestMethod.POST})
  public void importBaoGaoDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      List<Map<String, Object>> BaoGaoList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getBaoGaoList().get(1),
                (List) ListClass.getBaoGaoList().get(0));
      if (BaoGaoList == null) {
        result.setState(2);
      } else {
        List l = ValiateBaoGao(BaoGaoList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongBaoGao", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List ValiateBaoGao(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String bgys = (String)map.get("bgys");
      String bgTime = (String)map.get("bgTime");
      String jckj = (String)map.get("jckj");
      String jcts = (String)map.get("jcts");
      String state = map.get("state").toString();
      String mobanId = map.get("mobanId").toString();
      String jcdId = map.get("jcdId").toString();
      boolean a = (id != null && CheckTeleFormat.checkStringToInt(id));
      boolean c = !((state.equals("") || !CheckTeleFormat.checkStringToInt(state)) && !state.equals("") && !state.equals("null"));
      boolean d = !((mobanId.equals("") || !CheckTeleFormat.checkStringToInt(mobanId)) && !mobanId.equals("") && !mobanId.equals("null"));
      boolean e = (!jcdId.equals("") && CheckTeleFormat.checkStringToInt(jcdId));
      boolean f = (!bgys.equals("null") && !bgys.equals(""));
      boolean g = (!bgTime.equals("null") && !bgTime.equals(""));
      boolean h = (!jckj.equals("null") && !jckj.equals(""));
      boolean q = (!jcts.equals("null") && !jcts.equals(""));
      if (a && c && d && e && f && g && h && q) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        Baogao u = new Baogao();
        u.setId(Long.valueOf(id));
        u.setJcdId(Long.valueOf(jcdId));
        u.setBgys(bgys);
        String shTime = (String)map.get("shTime");
        u.setBgTime(CheckTeleFormat.checkDate(bgTime));
        u.setShTime(CheckTeleFormat.checkDate(shTime));
        u.setShys((String)map.get("shys"));
        u.setJckj(jckj);
        u.setJcts(jcts);
        u.setState((state.equals("") || state.equals("null")) ? null : Integer.valueOf(state));
        u.setMobanId((mobanId.equals("") || mobanId.equals("null")) ? null : Long.valueOf(mobanId));
        try {
          this.bgxxService.updateBaogao(u);
        } catch (Exception e2) {
          this.bgxxService.saveBaogao(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongBaoGaoInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongBaoGaoDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongBaoGao");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setPageSize(Integer.valueOf(this.maxNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importShuRuMoBanInfo.htm"}, method = {RequestMethod.POST})
  public void importShuRuMoBanInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      List<Map<String, Object>> SrMbList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getShuRuMoBanList().get(1),
                (List) ListClass.getShuRuMoBanList().get(0));
      if (SrMbList == null) {
        result.setState(2);
      } else {
        List l = ValiateShuRuMoBan(SrMbList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongSrMb", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List ValiateShuRuMoBan(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String shuru = (String)map.get("shuru");
      String suoyin = (String)map.get("suoyin");
      String bmId = map.get("bmId").toString();
      String jibie = map.get("jibie").toString();
      String addtime = map.get("addTime").toString();
      String categoryId = map.get("categoryId").toString();
      String jcxmId = map.get("jcxmId").toString();
      String gonghao = (String)map.get("gonghao");
      boolean a = (id != null && CheckTeleFormat.checkStringToInt(id));
      boolean c = (!bmId.equals("") && CheckTeleFormat.checkStringToInt(bmId));
      boolean d = (!jibie.equals("") && CheckTeleFormat.checkStringToInt(jibie));
      boolean e = (!categoryId.equals("") && CheckTeleFormat.checkStringToInt(categoryId));
      boolean f = (!jcxmId.equals("") && CheckTeleFormat.checkStringToInt(jcxmId));
      boolean g = (!shuru.equals("") && !shuru.equals("null"));
      boolean sy = (!suoyin.equals("") && !suoyin.equals("null"));
      boolean gh = (!gonghao.equals("") && !gonghao.equals("null"));
      boolean at = (!addtime.equals("") && !addtime.equals("null"));
      if (a && c && d && e && f && g && sy && gh && at) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        ShuruMoban u = new ShuruMoban();
        u.setId(Long.valueOf(id));
        u.setShuru(shuru);
        u.setSuoyin(suoyin);
        u.setBmId(Integer.valueOf(bmId));
        u.setJibie(Integer.valueOf(jibie));
        u.setCategoryId(Integer.valueOf(categoryId));
        u.setJcxmId(Integer.valueOf(jcxmId));
        u.setAddTime(CheckTeleFormat.checkDate(addtime));
        u.setGonghao(gonghao);
        try {
          this.shurumobanService.updateShuruMoban(u);
        } catch (Exception e2) {
          this.shurumobanService.saveShuruMoban(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongShuRuMoBanInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongShuRuMoBanDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongSrMb");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setPageSize(Integer.valueOf(this.maxNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importLogInfo.htm"}, method = {RequestMethod.POST})
  public void importLogDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      System.out.println("上传结束:" + uploadPath);
      List<Map<String, Object>> LogList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getLogList().get(1),
                (List) ListClass.getLogList().get(0));
      if (LogList == null) {
        result.setState(2);
      } else {
        List l = ValiateLog(LogList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongLog", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List ValiateLog(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String cznr = map.get("cznr").toString();
      String czr = map.get("czr").toString();
      String czsj = map.get("czsj").toString();
      String rzjb = map.get("rzjb").toString();
      boolean a = (id != null && CheckTeleFormat.checkStringToInt(id));
      boolean c = (!cznr.equals("") && !cznr.equals("null"));
      boolean d = (!czr.equals("null") && !czr.equals(""));
      boolean e = (!rzjb.equals("") && !rzjb.equals("null"));
      boolean f = (!czsj.equals("") && !czsj.equals("null"));
      if (a && c && d && e && f) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        OimsLog u = new OimsLog();
        u.setId(Long.valueOf(id));
        u.setCznr(cznr);
        u.setCzr(czr);
        u.setCzjg(((String)map.get("czjg") == "true"));
        u.setCzsj(CheckTeleFormat.checkDate(czsj));
        if (((String)map.get("rzjb")).equals("普通")) {
          u.setRzjb(Integer.valueOf(0));
        } else if (((String)map.get("rzjb")).equals("中等")) {
          u.setRzjb(Integer.valueOf(1));
        } else {
          u.setRzjb(Integer.valueOf(2));
        } 
        try {
          this.logService.updateOimsLog(u);
        } catch (Exception e2) {
          this.logService.saveOimsLog(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongLogInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongLogDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongLog");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setPageSize(Integer.valueOf(this.maxNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/importBaoGaoMoBanInfo.htm"}, method = {RequestMethod.POST})
  public void importBaogaoMobanDataInfo(HttpServletRequest request, HttpServletResponse response) {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("导入信息");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    try {
      String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
      List<Map<String, Object>> baogaoMoBanList = 
        ExcelAnalysis.importExcelToObject(String.valueOf(path) + "/" + uploadPath,
                (List) ListClass.getBaoGaoMoBanList().get(1),
                (List) ListClass.getBaoGaoMoBanList().get(0));
      if (baogaoMoBanList == null) {
        result.setState(2);
      } else {
        List l = ValiateBaogaoMoban(baogaoMoBanList);
        if (l.size() == 0) {
          result.setState(1);
        } else {
          session.setAttribute("wrongBgMb", l);
          result.setState(0);
        } 
      } 
    } catch (IndexOutOfBoundsException e) {
      result.setMessage("数据列数超出范围");
      e.printStackTrace();
    } catch (NumberFormatException e) {
      result.setMessage("数字不合法");
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  public List ValiateBaogaoMoban(List<Map<String, Object>> m) {
    boolean b = false;
    List<Map<String, Object>> l = new ArrayList<>();
    for (Map<String, Object> map : m) {
      String id = map.get("id").toString();
      String biaoti = (String)map.get("biaoti");
      String jibie = map.get("jibie").toString();
      String bumenId = map.get("bumenId").toString();
      String gonghao = (String)map.get("gonghao");
      String jcxmids = (String)map.get("jcxmIds");
      String categoryId = map.get("categoryId").toString();
      boolean a = (id != null && CheckTeleFormat.checkStringToInt(id));
      boolean c = (!jibie.equals("") && CheckTeleFormat.checkStringToInt(jibie));
      boolean d = (!bumenId.equals("") && CheckTeleFormat.checkStringToInt(bumenId));
      boolean e = (!categoryId.equals("") && CheckTeleFormat.checkStringToInt(categoryId));
      boolean bt = (!gonghao.equals("") && !gonghao.equals("null"));
      boolean gh = (!biaoti.equals("null") && !biaoti.equals(""));
      boolean jc = (!jcxmids.equals("") && !jcxmids.equals("null"));
      if (a && c && d && e && bt && gh && jc) {
        b = true;
      } else {
        b = false;
      } 
      if (b) {
        BaogaoMoban u = new BaogaoMoban();
        u.setId(Long.valueOf(id));
        u.setBiaoti(biaoti);
        u.setBumenId(bumenId.equals("") ? null : Integer.valueOf(bumenId));
        u.setCategoryId(categoryId.equals("") ? null : Integer.valueOf(categoryId));
        u.setGonghao(gonghao);
        u.setJibie(jibie.equals("") ? null : Integer.valueOf(jibie));
        u.setJcxmIds(jcxmids);
        u.setMoban((String)map.get("moban"));
        u.setUrl((String)map.get("url"));
        try {
          this.baogaoService.updateBaogaoMoban(u);
        } catch (Exception e2) {
          this.baogaoService.saveBaogaoMoban(u);
        } 
        continue;
      } 
      l.add(map);
    } 
    return l;
  }
  
  @RequestMapping(value = {"/getWrongBgMbInfo.htm"}, method = {RequestMethod.POST})
  public void getWrongBaogaoMobanDataInfo(HttpServletRequest request, HttpServletResponse response, Page p) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setDoing("获取错误信息");
    List list = (List)session.getAttribute("wrongBgMb");
    if (list.size() % this.maxNum == 0) {
      this.pageNum = list.size() / this.maxNum;
    } else {
      this.pageNum = list.size() / this.maxNum + 1;
    } 
    List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), this.maxNum, 
        this.pageNum);
    p.setCurrentPage(p.getCurrentPage());
    p.setPageCount(Integer.valueOf(this.pageNum));
    p.setPageSize(Integer.valueOf(this.maxNum));
    p.setRowsCount(Integer.valueOf(list.size()));
    p.setStartRow(p.getStartRow());
    Map<String, Object> map = new HashMap<>();
    map.put("list", l);
    map.put("page", p);
    JSONWriterUtils.writeJSONObj(map, response);
  }
}
