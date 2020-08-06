package cn.com.oims.web.controller;

import cn.com.oims.common.Utils;
import cn.com.oims.common.XLSHead;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IBuMenService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IOperationDictService;
import cn.com.oims.service.ITJService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.BlTjForm;
import cn.com.oims.web.form.DiseaseForm;
import cn.com.oims.web.form.HzTjForm;
import cn.com.oims.web.form.TJForm;
import cn.com.oims.web.form.TongJiForm;
import cn.com.oims.webservice.TJWebService;
import cn.com.oims.webservice.pojo.his.HospitalTj;
import com.codesnet.common.FileUtils;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"tj"})
public class TJController extends BaseController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  private String path_Zip = "/Zip/xls";
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @Autowired
  private TJWebService tjWebService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private IBuMenService buMenService;
  
  private ITJService service;
  
  @Autowired
  private IOperationDictService operationDictService;
  
  @Autowired
  public void setService(ITJService service) {
    this.service = service;
  }
  
  @RequestMapping(value = {"chart.htm"}, method = {RequestMethod.POST})
  public void chart(TJForm f, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("页面报表数据支持", req);
    try {
      mrSuccess(mr, this.service.chart(f));
      writeLog(mr, level_find);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
      writeLog(mr, level_exception);
    } 
    JSONWriterUtils.writeJSONObj(mr, res);
  }
  
  @RequestMapping(value = {"chartEx.htm"}, method = {RequestMethod.POST})
  public void chartEx(TJForm f, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("页面报表数据支持", req);
    try {
      mrSuccess(mr, this.service.chartEx(f));
      writeLog(mr, level_find);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
      writeLog(mr, level_exception);
    } 
    JSONWriterUtils.writeJSONObj(mr, res);
  }
  
  @RequestMapping(value = {"list.htm"}, method = {RequestMethod.POST})
  public void list(TJForm f, Page page, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("页面报表数据支持", req);
    try {
      mrSuccess(mr, this.service.list(f, page));
      writeLog(mr, level_find);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
      writeLog(mr, level_exception);
    } 
    JSONWriterUtils.writeJSONObj(mr.getObj(), res);
  }
  
  @RequestMapping(value = {"pro.htm"}, method = {RequestMethod.POST})
  public void pro(TJForm f, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("统计导出数据", req);
    try {
      List<Map<String, Object>> data = this.service.pro(f);
      Vector<XLSHead> vs = this.service.headVector(f);
      exportXls(data, vs, req, res);
      Utils.tLog((new StringBuilder(String.valueOf(data.size()))).toString(), "pro");
      writeLog(mr, level_find);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
      writeLog(mr, level_exception);
    } 
  }
  
  @RequestMapping(value = {"findYuanGongByBumen.htm"}, method = {RequestMethod.POST})
  public void findYuanGongByBumen(String bumenId, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("以部门查询员工", req);
    try {
      mr.setObj(this.service.findYuanGongByBumen(bumenId));
      mrSuccess(mr);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    JSONWriterUtils.writeJSONObj(mr, res);
    writeLog(mr, level_find);
  }
  
  @RequestMapping(value = {"findSheBieByBumen.htm"}, method = {RequestMethod.POST})
  public void findSheBieByBumen(String bumenId, String bgsId, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("以部门查询设备", req);
    try {
      mr.setObj(this.service.findSheBieByBumen(bumenId, bgsId));
      mrSuccess(mr);
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e, mr);
    } 
    JSONWriterUtils.writeJSONObj(mr, res);
    writeLog(mr, level_find);
  }
  
  @RequestMapping(value = {"/tjBaoGaoNumByDoctor.htm"}, method = {RequestMethod.POST})
  public void tjBaoGaoNumByDoctor(HttpServletRequest request, HttpServletResponse response, TongJiForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件查询医生出报告的数量";
    try {
      List<Map<String, Object>> list = this.service
        .tjBaoGaoNumByDoctor(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjBaoGaoNumAndWeek.htm"}, method = {RequestMethod.POST})
  public void tjBaoGaoNumAndWeek(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件查询本周的医生出报告的数量";
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      TongJiForm form = new TongJiForm();
      form.setTimeType("sj");
      form.setfTime1(sdf.format(MultiUtils.getSunday()));
      form.setfTime2(sdf.format(MultiUtils.getCurrentSaturday()));
      List<Map<String, Object>> list = this.service
        .tjBaoGaoNumByDoctor(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjBaoGaoNumByDoctorAndJcxm.htm"}, method = {RequestMethod.POST})
  public void tjBaoGaoNumByDoctorAndJcxm(HttpServletRequest request, HttpServletResponse response, TongJiForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件查询检查医生和检查项目的报告数量";
    try {
      Map<String, Object> map = this.service.tjBaoGaoNumAndJcxm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(map);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjBaoGaoNumByJcxm.htm"}, method = {RequestMethod.POST})
  public void tjBaoGaoNumByJcxm(HttpServletRequest request, HttpServletResponse response, TongJiForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件查询检查项目的报告数量";
    try {
      Map<String, Object> map = this.service.tjBaoGaoNumByJcxm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(map);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportExecel.htm"}, method = {RequestMethod.POST})
  public void exportExecel(HttpServletRequest request, HttpServletResponse response, TongJiForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件查询检查项目的报告数量";
    try {
      String path = request.getSession().getServletContext()
        .getRealPath("/").replace("\\", "/");
      String proPath = String.valueOf(path) + "/template/XiNan2excel.properties";
      String execelPath = String.valueOf(path) + "/template/excel.xls";
      String tempPath = String.valueOf(path) + this.path_Zip;
      File xls = new File(tempPath);
      xls.mkdirs();
      File suorceFile = new File(execelPath);
      String fileName_Zip = 
        String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".xls";
      String tempFilePath = String.valueOf(xls.getAbsolutePath()) + "/" + fileName_Zip;
      FileUtils.copyFile(suorceFile, new File(tempFilePath));
      this.service
        .expBaoGaoCountByTongJiForm(proPath, tempFilePath, form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(String.valueOf(this.path_Zip) + "/" + fileName_Zip);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportMzysExecel.htm"}, method = {RequestMethod.POST})
  public void exportMzysExecel(HttpServletRequest request, HttpServletResponse response, String mzgzltj, String blwctj) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "导出门诊医生工作量的数据";
    try {
      String path = request.getSession().getServletContext()
        .getRealPath("/").replace("\\", "/");
      String tempPath = String.valueOf(path) + this.path_Zip;
      File xls = new File(tempPath);
      xls.mkdirs();
      String fileName = String.valueOf(MultiUtils.getTimeRodem()) + ".xls";
      String tempFilePath = String.valueOf(xls.getAbsolutePath()) + "/" + fileName;
      this.service.exportMzysExecel(tempFilePath, mzgzltj, blwctj);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(String.valueOf(this.path_Zip) + "/" + fileName);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjMzGongZuoLiang.htm"}, method = {RequestMethod.POST})
  public void tjMzGongZuoLiang(HttpServletRequest request, HttpServletResponse response, TongJiForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件统计门诊接诊量";
    try {
      List<Map<String, Object>> list = this.service
        .tjJiuZhenNumByTongJi(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjBLFinishNumByTongJi.htm"}, method = {RequestMethod.POST})
  public void tjBLFinishNumByTongJi(HttpServletRequest request, HttpServletResponse response, TongJiForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件统计门诊病历完成情况";
    try {
      List<Map<String, Object>> noList = this.service
        .tjBLFinishNumByTongJi(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(noList);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjRealPatsInHospitalNum.htm"}, method = {RequestMethod.POST})
  public void tjRealPatsInHospitalNum(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "统计眼科住院患者的各个病区的住院情况";
    try {
      List<Map<String, Object>> list = new ArrayList<>();
      createTJRealPatsInHospitalNum("A区", "230303", list);
      createTJRealPatsInHospitalNum("B区", "230304", list);
      createTJRealPatsInHospitalNum("C区", "230305", list);
      createTJRealPatsInHospitalNum("R区", "230307", list);
      createTJRealPatsInHospitalNum("日间病房", "230306", list);
      Long total = Long.valueOf(0L);
      for (int i = 0; i < list.size(); i++) {
        Map<String, Object> aMap = new HashMap<>();
        aMap = list.get(i);
        total = Long.valueOf(total.longValue() + ((Long)aMap.get("y")).longValue());
      } 
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private void createTJRealPatsInHospitalNum(String areaName, String areaDept, List<Map<String, Object>> list) {
    Long y = Long.valueOf(this.tjWebService.patsInHospitalNumByDeptCode(areaDept));
    Map<String, Object> aMap = new HashMap<>();
    aMap.put("name", areaName);
    aMap.put("dept", areaDept);
    aMap.put("y", y);
    list.add(aMap);
  }
  
  @RequestMapping(value = {"/getRealPatsInHospitalInfo.htm"}, method = {RequestMethod.POST})
  public void getRealPatsInHospitalInfo(HttpServletRequest request, HttpServletResponse response, String dept, String isToday) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据病区的编码获取具体的床位信息";
    try {
      List<HospitalTj> hospitalTjs = this.tjWebService.patsInHospitalByDeptCode(dept, isToday);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(hospitalTjs);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjPatsInHospitalAndGroup.htm"}, method = {RequestMethod.POST})
  public void tjPatsInHospitalAndGroup(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "统计各个组收录了人数信息";
    List<Map<String, Object>> results = new ArrayList<>();
    Map<String, Object> map = new HashMap<>();
    Map<Object, Object> map_details = new HashMap<>();
    try {
      List<HospitalTj> list = this.tjWebService.patsInHospital();
      for (HospitalTj hospitalTj : list) {
        YuanGong yg = new YuanGong();
        yg.setXingming(hospitalTj.getDoctorName());
        List<YuanGong> ygs = this.yuanGongService.findYuanGongsByYuanGong(yg);
        if (ygs.size() > 0) {
          yg = ygs.get(0);
          List<Map<String, Object>> group_list = this.operationDictService.findOperationGroupInforByGonghao(yg.getGonghao());
          if (group_list == null || group_list.size() == 0) {
            map.put("未分组", Long.valueOf(((map.get("未分组") == null) ? 0L : Integer.parseInt(map.get("未分组").toString())) + hospitalTj.getCount()));
            continue;
          } 
          if (group_list.size() > 1)
            System.out.println(String.valueOf(yg.getXingming()) + "所属分组多于一个"); 
          Iterator<Map.Entry> iter = ((Map)group_list.get(0)).entrySet().iterator();
          while (iter.hasNext()) {
            Map.Entry entry = iter.next();
            map.put(entry.getValue().toString(), Long.valueOf(((map.get(entry.getValue()) == null) ? 0L : Integer.parseInt(map.get(entry.getValue()).toString())) + hospitalTj.getCount()));
            Map<Object, Object> map_temp_detail = new HashMap<>();
            map_temp_detail.put(yg.getXingming(), Long.valueOf(hospitalTj.getCount()));
            List<Map<Object, Object>> list_details = (List)map_details.get(entry.getValue());
            if (list_details == null || list_details.size() == 0) {
              list_details = new ArrayList();
              list_details.add(map_temp_detail);
              map_details.put(entry.getValue().toString(), list_details);
              continue;
            } 
            list_details.add(map_temp_detail);
            map_details.put(entry.getValue().toString(), list_details);
          } 
        } 
      } 
      Set<String> set = map.keySet();
      for (String key : set) {
        Map<String, Object> rt = new HashMap<>();
        rt.put("name", key);
        rt.put("y", map.get(key));
        rt.put("details", map_details.get(key));
        results.add(rt);
      } 
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjpatVisitInAndOutHospital.htm"}, method = {RequestMethod.POST})
  public void tjpatVisitInAndOutHospital(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "出入院患者信息统计";
    List<Map<String, Object>> results = new ArrayList<>();
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      String date = sdf.format(new Date());
      String dept = "230303,230304,230305,230307";
      Map<String, Object> mapOut = new HashMap<>();
      mapOut.put("name", "出院");
      Long inCount = Long.valueOf(this.tjWebService.patVisitOutHospital(date, dept));
      mapOut.put("y", inCount);
      mapOut.put("type", "OUT");
      results.add(mapOut);
      Map<String, Object> mapIn = new HashMap<>();
      mapIn.put("name", "入院");
      Long outCount = Long.valueOf(this.tjWebService.patVisitInHospital(date, dept));
      mapIn.put("y", outCount);
      mapIn.put("type", "IN");
      results.add(mapIn);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjpatVisitInHospital.htm"}, method = {RequestMethod.POST})
  public void tjpatVisitInHospital(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "入院患者信息统计";
    List<Map<String, Object>> results = new ArrayList<>();
    try {
      createPatVisitInHospital("A区", "230303", 
          results);
      createPatVisitInHospital("B区", "230304", 
          results);
      createPatVisitInHospital("C区", "230305", 
          results);
      createPatVisitInHospital("R区", "230307", 
          results);
      createPatVisitInHospital("日间病房", "230306", results);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private void createPatVisitInHospital(String area, String areaDept, List<Map<String, Object>> results) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String date = sdf.format(new Date());
    Map<String, Object> map = new HashMap<>();
    map.put("name", area);
    map.put("dept", areaDept);
    map.put("y", Long.valueOf(this.tjWebService.patVisitInHospital(date, areaDept)));
    results.add(map);
  }
  
  @RequestMapping(value = {"/tjpatVisitOutHospital.htm"}, method = {RequestMethod.POST})
  public void tjpatVisitOutHospital(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "出院患者信息统计";
    List<Map<String, Object>> results = new ArrayList<>();
    try {
      createPatVisitOutHospital("A区", "230303", 
          results);
      createPatVisitOutHospital("B区", "230304", 
          results);
      createPatVisitOutHospital("C区", "230305", 
          results);
      createPatVisitOutHospital("R区", "230307", 
          results);
      createPatVisitOutHospital("日间病房", "230306", results);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private void createPatVisitOutHospital(String area, String areaDept, List<Map<String, Object>> results) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String date = sdf.format(new Date());
    Map<String, Object> map = new HashMap<>();
    map.put("name", area);
    map.put("dept", areaDept);
    map.put("y", Long.valueOf(this.tjWebService.patVisitOutHospital(date, areaDept)));
    results.add(map);
  }
  
  @RequestMapping(value = {"/tjJcdState.htm"}, method = {RequestMethod.POST})
  public void tjJcdState(TongJiForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单状态统计";
    try {
      List<Map<String, Object>> results = this.service
        .groupJcdStrateByTongJiForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjJcdType.htm"}, method = {RequestMethod.POST})
  public void tjJcdType(TongJiForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查单的患者类型";
    try {
      List<Map<String, Object>> results = this.service
        .groupJcdTypeByTongJiForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjCheckDoctor.htm"}, method = {RequestMethod.POST})
  public void tjCheckDoctor(TongJiForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查医生统计";
    try {
      List<Map<String, Object>> results = this.service
        .groupCheckDoctorByTongJiForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjCheckJcxm.htm"}, method = {RequestMethod.POST})
  public void tjCheckJcxm(TongJiForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查医生统计";
    try {
      List<Map<String, Object>> results = this.service
        .groupCheckJcxmByTongJiForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjCheckDevice.htm"}, method = {RequestMethod.POST})
  public void tjCheckDevice(TongJiForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "检查医生统计";
    try {
      List<Map<String, Object>> results = this.service
        .groupCheckDeviceByTongJiForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"tjDiseaseByDiseaseForm.htm"}, method = {RequestMethod.POST})
  public void tjDiseaseByDiseaseForm(DiseaseForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "统计疾病信息";
    try {
      List<Map<String, Object>> list = this.service
        .tjDiseaseByDiseaseForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"tjXingBieByJiBingId.htm"}, method = {RequestMethod.POST})
  public void tjXingBieByJiBingId(String jibingId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "疾病id统计患病患者的性别信息";
    try {
      List<Map<String, Object>> list = this.service
        .tjXingBieByJiBingId(jibingId);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"tjdrugDictByJiBingId.htm"}, method = {RequestMethod.POST})
  public void tjdrugDictByJiBingId(String jibingId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "疾病id统计患病患者的用药信息";
    try {
      List<Map<String, Object>> list = this.service
        .tjdrugDictByJiBingId(jibingId);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"tjAgeByJiBingId.htm"}, method = {RequestMethod.POST})
  public void tjAgeByJiBingId(String jibingId, String strAgeInfos, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据疾病Id统计患者年龄";
    try {
      List<Map<String, Object>> list = new ArrayList<>();
      JSONArray strJsonArray = JSONArray.fromObject(strAgeInfos);
      list = (List<Map<String, Object>>)JSONArray.toCollection(strJsonArray, Map.class);
      List<Map<String, Object>> datas = this.service.tjJiuZhenAgeByJiBingId(jibingId, list);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(datas);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"tjHuanZheXinXiByHzTjForm.htm"}, method = {RequestMethod.POST})
  public void tjHuanZheXinXiByHzTjForm(HzTjForm hzTjForm, String strAgeInfos, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据患者统计form统计患者的分布区域";
    try {
      List<Map<String, Object>> list = this.service.tjHuanZheXinXiByHzTjForm(hzTjForm);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"showWenZhenByBlTjForm.htm"}, method = {RequestMethod.POST})
  public void showWenZhenByBlTjForm(BlTjForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据病历统计form统计问诊情况";
    try {
      List<List<String>> list = this.service.showWenZhenByBlTjForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"showZKJCByBlTjForm.htm"}, method = {RequestMethod.POST})
  public void showZKJCByBlTjForm(BlTjForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据病历统计form统计专科检查情况";
    try {
      List<List<String>> list = this.service.showZKJCByBlTjForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"showJzZhenDuanByBlTjForm.htm"}, method = {RequestMethod.POST})
  public void showJzZhenDuanByBlTjForm(BlTjForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据病历统计form统计诊断情况";
    try {
      List<List<String>> list = this.service.showJzZhenDuanByBlTjForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"showChuZhiByBlTjForm.htm"}, method = {RequestMethod.POST})
  public void showChuZhiByBlTjForm(BlTjForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据病历统计form统计诊断情况";
    try {
      List<List<String>> list = this.service.showChuZhiByBlTjForm(form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(list);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportWenZhenExcel.htm"}, method = {RequestMethod.POST})
  public void exportWenZhenExcel(HttpServletRequest request, HttpServletResponse response, BlTjForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件导出问诊";
    try {
      String path = request.getSession().getServletContext()
        .getRealPath("/").replace("\\", "/");
      String tempPath = String.valueOf(path) + this.path_Zip;
      File xls = new File(tempPath);
      xls.mkdirs();
      String fileName_Zip = 
        String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".xls";
      String tempFilePath = String.valueOf(xls.getAbsolutePath()) + "/" + fileName_Zip;
      this.service.exportWenZhenExcel(tempFilePath, form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(String.valueOf(this.path_Zip) + "/" + fileName_Zip);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportZKJCExcel.htm"}, method = {RequestMethod.POST})
  public void exportZKJCExcel(HttpServletRequest request, HttpServletResponse response, BlTjForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件导出专科检查";
    try {
      String path = request.getSession().getServletContext()
        .getRealPath("/").replace("\\", "/");
      String tempPath = String.valueOf(path) + this.path_Zip;
      File xls = new File(tempPath);
      xls.mkdirs();
      String fileName_Zip = 
        String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".xls";
      String tempFilePath = String.valueOf(xls.getAbsolutePath()) + "/" + fileName_Zip;
      this.service.exportZKJCExcel(tempFilePath, form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(String.valueOf(this.path_Zip) + "/" + fileName_Zip);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportJzZhenDuanExcel.htm"}, method = {RequestMethod.POST})
  public void exportJzZhenDuanExcel(HttpServletRequest request, HttpServletResponse response, BlTjForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件导出就诊诊断";
    try {
      String path = request.getSession().getServletContext()
        .getRealPath("/").replace("\\", "/");
      String tempPath = String.valueOf(path) + this.path_Zip;
      File xls = new File(tempPath);
      xls.mkdirs();
      String fileName_Zip = 
        String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".xls";
      String tempFilePath = String.valueOf(xls.getAbsolutePath()) + "/" + fileName_Zip;
      this.service.exportJzZhenDuanExcel(tempFilePath, form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(String.valueOf(this.path_Zip) + "/" + fileName_Zip);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/exportChuZhiExcel.htm"}, method = {RequestMethod.POST})
  public void exportChuZhiExcel(HttpServletRequest request, HttpServletResponse response, BlTjForm form) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据条件导出处置";
    try {
      String path = request.getSession().getServletContext()
        .getRealPath("/").replace("\\", "/");
      String tempPath = String.valueOf(path) + this.path_Zip;
      File xls = new File(tempPath);
      xls.mkdirs();
      String fileName_Zip = 
        String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".xls";
      String tempFilePath = String.valueOf(xls.getAbsolutePath()) + "/" + fileName_Zip;
      this.service.exportChuZhiExcel(tempFilePath, form);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(String.valueOf(this.path_Zip) + "/" + fileName_Zip);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/tjPersonalTJ.htm"}, method = {RequestMethod.POST})
  public void tjPersonalTJ(String gonghao, HttpServletRequest request, HttpServletResponse response, String startDate, String endDate) {
    MyResult result = new MyResult();
    Map<String, Object> results = new HashMap<>();
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      results = this.service.tjPersonalTJ(gonghao, sdf.parse(startDate), 
          sdf.parse(endDate));
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(results);
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setState(this.doState);
    result.setGonghao(gonghao);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 
        1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
