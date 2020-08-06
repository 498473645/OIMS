package cn.com.oims.web.controller;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.common.SyncObject;
import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.EMRInHospitalCard;
import cn.com.oims.dao.pojo.ExamCheck;
import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.FollowedUp;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.InquiryComboTreeNode;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.JiBing;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.OutpPresc;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.TemplateVariable;
import cn.com.oims.dao.pojo.TestCheck;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YaoPinType;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IBaogaoService;
import cn.com.oims.service.ICategoryService;
import cn.com.oims.service.IDoctorsWorkstationService;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IJiBingService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IJzjlService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.utils.JsonUtil;
import cn.com.oims.web.form.HzjzForm;
import cn.com.oims.web.form.JCTSPaintForm;
import cn.com.oims.web.form.PaintForm;
import cn.com.oims.webservice.DocWebService;
import cn.com.oims.webservice.ExamWebService;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.LisWebService;
import cn.com.oims.webservice.pojo.Dept;
import cn.com.oims.webservice.pojo.InHospitalTransfer;
import cn.com.oims.webservice.pojo.OutpMr;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.ResponseObj;
import cn.com.oims.webservice.pojo.exam.ExamItem;
import cn.com.oims.webservice.pojo.exam.ExamItemClass;
import cn.com.oims.webservice.pojo.exam.ExamItemSubClass;
import cn.com.oims.webservice.pojo.exam.ExamResult;
import cn.com.oims.webservice.pojo.lis.Sample;
import cn.com.oims.webservice.pojo.lis.TestItem;
import cn.com.oims.webservice.pojo.lis.TestResult;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"emr"})
public class DoctorsWorkstation {

  private static final Logger LOG = LoggerFactory.getLogger(DoctorsWorkstation.class);

  @Autowired
  private ICategoryService categoryService;
  
  @Autowired
  private IDoctorsWorkstationService doctorsWorkstationService;
  
  @Autowired
  private IJiuzhenService jiuzhenService;
  
  @Autowired
  private IJcxmService jcxmService;
  
  @Autowired
  private IBaogaoService baogaoService;
  
  @Autowired
  private IJzjlService jzjlService;
  
  @Autowired
  private IJcdService jcdService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private IHuanZheXinXiService huanZheXinXiService;
  
  @Autowired
  private IJiBingService jiBingService;
  
  @Autowired
  private ExamWebService examWebService;
  
  @Autowired
  private LisWebService lisWebService;
  
  @Autowired
  private HisWebService hisWebService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private DocWebService docWebService;
  
  @Autowired
  private IEyeDao iEyeDao;
  
  private int tabsFatherId = 30000;
  
  private int tabsFatherId_qg = 30008;
  
  private int tabsFatherId_sg = 30009;
  
  private String regex = " ";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  private static Map<String, SyncObject> statistics = new HashMap<>();
  
  @RequestMapping(value = {"/getitemsbyparentid.htm"}, method = {RequestMethod.POST})
  public void getPhysicalItems(HttpServletRequest request, HttpServletResponse response) {
    int categoryId = Integer.parseInt(request.getParameter("categoryId"));
    List list = this.categoryService.findCategorysByFatherId(Integer.valueOf(categoryId));
    JSONArray items = JSONArray.fromObject(list);
    for (int i = 0; i < items.size(); i++) {
      JSONObject item = items.getJSONObject(i);
      List child = this.categoryService.findCategorysByFatherId(
          Integer.valueOf(item.getInt("categoryid")));
      item.put("child", JSONArray.fromObject(child));
    } 
    JSONWriterUtils.writeJSONList((List)items, response);
  }
  
  @RequestMapping(value = {"/getJiWangMenZhenBingLi.htm"}, method = {RequestMethod.POST})
  public void getJiWangMenZhenBingLi(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取既往门诊病历");
    String patientId = request.getParameter("patientId");
    try {
      List<EyeInfoOutpClinic> list = this.doctorsWorkstationService
        .getEyeInfoOutpClinicList(patientId);
      if (list != null && list.size() > 0) {
        result.setObj(list);
      } else {
        result.setObj(null);
      } 
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveorupdateentryitem.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEntryItem(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存或更新就诊记录");
    HttpSession session = request.getSession();
    Object obj = session.getAttribute("gonghao");
    if (obj != null) {
      String id = request.getParameter("id");
      String jiuzhen_id = request.getParameter("jiuzhen_id");
      String category_id = request.getParameter("category_id");
      String jilu = request.getParameter("jilu");
      String picPath = request.getParameter("picPath");
      Jzjl jzjl = new Jzjl();
      jzjl.setId((id != "") ? Long.valueOf(Long.parseLong(id)) : null);
      jzjl.setJiuzhenId(Long.valueOf(Long.parseLong(jiuzhen_id)));
      jzjl.setCategoryId(Integer.valueOf(Integer.parseInt(category_id)));
      jzjl.setJilu(jilu);
      jzjl.setJlren(obj.toString());
      jzjl.setJlTime(new Date());
      jzjl.setPicPath(picPath);
      try {
        Long jzjl_id = this.doctorsWorkstationService
          .saveOrUpdate_Inquiry(jzjl);
        result.setObj(jzjl_id);
        result.setState(1);
      } catch (Exception e) {
        result.setMessage("sava or update error！");
      } 
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  @RequestMapping(value = {"/autofindurl.htm"}, method = {RequestMethod.POST})
  public void autofind(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("根据拼音简写查询数据库");
    String category_id = request.getParameter("category_id");
    String pinyin = request.getParameter("pinyin");
    System.out.println(String.valueOf(category_id) + "##" + pinyin);
    try {
      List<ShuruMoban> list = this.doctorsWorkstationService.findTemplate(
          Integer.parseInt(category_id), pinyin);
      if (list != null && list.size() > 0) {
        result.setObj(list);
        for (ShuruMoban s : list)
          System.out.println(s.getShuru()); 
      } else {
        result.setObj(null);
      } 
      result.setState(1);
      JSONWriterUtils.writeJSONList(list, response);
    } catch (Exception e) {
      result.setState(0);
      e.printStackTrace();
    } 
  }
  
  @RequestMapping({"/autofindurlwithvariable.htm"})
  public void autofindurlwithvariable(HttpServletRequest request, HttpServletResponse response) {
    String categoryId = request.getParameter("categoryId");
    String pinyin = request.getParameter("pinyin");
    try {
      List<ShuruMoban> list = this.doctorsWorkstationService.findTemplate(
          Integer.parseInt(categoryId), pinyin);
      JSONArray items = JSONArray.fromObject(list);
      if (list.size() > 0)
        for (int i = 0; i < items.size(); i++) {
          JSONObject item = items.getJSONObject(i);
          Long id = Long.valueOf(item.getLong("id"));
          System.out.println(id);
          List<TemplateVariable> list1 = this.doctorsWorkstationService
            .findTemplateVariable(id);
          JSONArray array = new JSONArray();
          for (TemplateVariable tv : list1) {
            String var = tv.getVariable().trim();
            String[] temp = var.split(this.regex);
            JSONArray arrayvariable = JSONArray.fromObject(temp);
            array.add(arrayvariable);
          } 
          item.put("child", array);
        }  
      System.out.println(items);
      JSONWriterUtils.writeJSONList((List)items, response);
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  @Deprecated
  @RequestMapping(value = {"/getinputtemplet.htm"}, method = {RequestMethod.POST})
  public void getInputTemplet(HttpServletRequest request, HttpServletResponse response) {
    String categoryId = request.getParameter("categoryid");
    HttpSession session = request.getSession();
    User currentUser = (User)session.getAttribute("currentUser");
    List<ShuruMoban> list = this.doctorsWorkstationService.getInputTemplet(
        categoryId, currentUser);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/saveorupdatephysicalitem.htm"}, method = {RequestMethod.POST})
  public void savePhysicalItemContent(HttpServletRequest request, HttpServletResponse response) {
    String categoryId = request.getParameter("categoryid");
    String content = request.getParameter("content");
    String visitId = request.getParameter("visitid");
    this.doctorsWorkstationService.savePhysicalItemContent(categoryId, content, 
        visitId);
  }
  
  @RequestMapping(value = {"/gettabs.htm"}, method = {RequestMethod.POST})
  public void getTabs(HttpServletRequest request, HttpServletResponse response) {
    List<Category> list = this.categoryService
      .findCategorysByFather(Integer.valueOf(this.tabsFatherId));
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/gettabs_qg.htm"}, method = {RequestMethod.POST})
  public void getTabs_qg(HttpServletRequest request, HttpServletResponse response) {
    List<Category> list = this.categoryService
      .findCategorysByFather(Integer.valueOf(this.tabsFatherId_qg));
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/gettabs_sg.htm"}, method = {RequestMethod.POST})
  public void getTabs_sg(HttpServletRequest request, HttpServletResponse response) {
    List<Category> list = this.categoryService
      .findCategorysByFather(Integer.valueOf(this.tabsFatherId_sg));
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/getquantity.htm"}, method = {RequestMethod.POST})
  public void getQuantityInfo(HttpServletRequest request, HttpServletResponse response) {
    String jobNum = request.getParameter("gonghao");
    if (statistics.get(jobNum) != null && ((SyncObject)statistics.get(jobNum)).getObj() != null) {
      JSONWriterUtils.writeJSONList((List)((SyncObject)statistics.get(jobNum)).getObj(), response);
      return;
    } 
    int wait = this.doctorsWorkstationService.getNumberByVisitState(
        String.valueOf(27), jobNum);
    int again = this.doctorsWorkstationService
      .getNumberByVisitState(
        String.valueOf(28), 
        jobNum);
    int pass = this.doctorsWorkstationService.getNumberByVisitState(
        String.valueOf(30), 
        jobNum);
    int finish = this.doctorsWorkstationService.getNumberByVisitState(
        String.valueOf(29), 
        jobNum);
    int total = wait + again + pass + finish;
    int nodone = this.doctorsWorkstationService.getHisNumberByVisitState(
        String.valueOf(String.valueOf(30)) + "," + String.valueOf(27), 
        null);
    int done = this.doctorsWorkstationService.getHisNumberByVisitState(
        String.valueOf(String.valueOf(28)) + "," + String.valueOf(29) + "," + String.valueOf(94), 
        null);
    JSONArray quantity = new JSONArray();
    quantity.add(Integer.valueOf(nodone + done));
    quantity.add(Integer.valueOf(done));
    quantity.add(Integer.valueOf(nodone));
    quantity.add(Integer.valueOf(total));
    quantity.add(Integer.valueOf(wait));
    quantity.add(Integer.valueOf(again));
    quantity.add(Integer.valueOf(pass));
    quantity.add(Integer.valueOf(finish));
    statistics.put(jobNum, new SyncObject(quantity));
    JSONWriterUtils.writeJSONList((List)quantity, response);
  }
  
  @RequestMapping(value = {"/getpatientinfo.htm"}, method = {RequestMethod.POST})
  public void getPatientInfo(HttpServletRequest request, HttpServletResponse response) {
    String jobNum = request.getParameter("gonghao").toString();
    String currentVisitID = request.getParameter("currentVisitID");
    String state = request.getParameter("state");
    JSONObject patientObj = this.doctorsWorkstationService
      .getDiagnosisPatientInfo(jobNum, currentVisitID, state);
    JSONWriterUtils.writeJSONObj(patientObj, response);
  }
  
  @RequestMapping(value = {"/getinspectitems.htm"}, method = {RequestMethod.POST})
  public void getInspectItems(HttpServletRequest request, HttpServletResponse response) {
    String categoryId = request.getParameter("categoryId");
    String pinyin = request.getParameter("pinyin");
    List itemList = this.doctorsWorkstationService.getInspectsByCategory(
        categoryId, pinyin);
    JSONWriterUtils.writeJSONList(itemList, response);
  }
  
  @RequestMapping(value = {"/getvisitlistbystate.htm"}, method = {RequestMethod.POST})
  public void getPatientList(HttpServletRequest request, HttpServletResponse response, Page page) {
    LOG.info("************************getvisitlistbystate******************");
    HttpSession session = request.getSession();
    String jobNum = request.getParameter("gonghao");
    String search = (request.getParameter("searchText") != null) ? request
      .getParameter("searchText").toString() : "";
    String path = request.getSession().getServletContext().getRealPath("/");
    Integer fenzhenkaidan = (request.getParameter("fenzhenkaidan") == null) ? null : Integer.valueOf(Integer.parseInt(request.getParameter("fenzhenkaidan").toString()));
    String state = request.getParameter("state");
    if (state != null)
      if (state.equals("80001")) {
        state = "27,30";
      } else if (state.equals("80002")) {
        state = "28,29,94";
      }  
    String style = request.getParameter("style");
    String fucha = request.getParameter("fucha");
    if ("card".equals(style)) {
      MyResult result = new MyResult();
      List list = this.jiuzhenService.getPatientListToday(state, jobNum, 
          search, path);
      result.setObj(list);
      result.setState(1);
      JSONWriterUtils.writeJSONObj(result, response);
    } else {
      List<Map<String, Object>> list = new ArrayList<>();
      if (fucha == null) {
        list = this.jiuzhenService
          .getPatientListTodayByPage(state, jobNum, page, search, 
            path);
      } else {
        list = this.jiuzhenService.getPatientListFuChaByPage(state, jobNum, page, search, 
            path, fenzhenkaidan);
      } 
      Map<String, Object> map = new HashMap<>();
      map.put("list", list.subList(1, list.size()));
      map.put("page", ((Map)list.get(0)).get("page"));
      JSONWriterUtils.writeJSONObj(map, response);
    } 
  }
  
  @RequestMapping(value = {"/saveinspectorder.htm"}, method = {RequestMethod.POST})
  public void saveInspectOrder(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String jobNum = session.getAttribute("gonghao").toString();
    String inspectInfoStr = request.getParameter("inspectInfo");
    JSONObject inspectObj = JSONObject.fromObject(inspectInfoStr);
    inspectObj.put("kdys", jobNum);
    JSONArray reulst = this.doctorsWorkstationService
      .saveInspcetOrder(inspectObj);
    JSONWriterUtils.writeJSONList((List)reulst, response);
  }
  
  @RequestMapping(value = {"/updatepaintandtip.htm"}, method = {RequestMethod.POST})
  public void updateInspectPaintAndTip(HttpServletRequest request, HttpServletResponse response) {
    String pictruePath = request.getParameter("pictruePath");
    String eyeSort = request.getParameter("eyeSort");
    String order = request.getParameter("order");
    String tip = request.getParameter("tip");
    this.doctorsWorkstationService.updateInspectPicPathAndTip(order, eyeSort, 
        pictruePath, tip);
    MyResult result = new MyResult();
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/savepaint.htm"}, method = {RequestMethod.POST})
  public void savePaint(HttpServletRequest request, HttpServletResponse response, PaintForm paintForm) throws Exception {
    HttpSession session = request.getSession();
    paintForm.setWorkNo((String)session.getAttribute("gonghao"));
    String path = this.doctorsWorkstationService.savePaint(paintForm, request);
    MyResult result = new MyResult();
    JSONObject obj = new JSONObject();
    obj.put("eyeSort", paintForm.getEyes());
    obj.put("visitId", paintForm.getRegId());
    obj.put("categoryid", Integer.valueOf(paintForm.getCategoryId()));
    obj.put("pictruePath", path);
    result.setDoing("保存画图");
    result.setState(1);
    result.setObj(obj);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveJCTSPaint.htm"}, method = {RequestMethod.POST})
  public void saveJCTSPaint(JCTSPaintForm pf, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    MyResult result = new MyResult();
    result.setDoing("保存检查提示画图");
    try {
      this.doctorsWorkstationService.saveJCTSPaint(pf, request);
      result.setState(1);
      result.setObj(pf);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getprintdata.htm"}, method = {RequestMethod.POST})
  public void getPatientPrintData(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    HashMap<String, Object> result = this.doctorsWorkstationService
      .getPrintData(visitId);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getreporttempletdata.htm"}, method = {RequestMethod.POST})
  public void getRecordTemplet(HttpServletRequest request, HttpServletResponse response) {
    String inspectId = request.getParameter("inspectId");
    JSONObject reportJson = this.doctorsWorkstationService
      .getReportDataByInspectId(inspectId);
    JSONWriterUtils.writeJSONObj(reportJson, response);
  }
  
  @RequestMapping(value = {"/patientpass.htm"}, method = {RequestMethod.POST})
  public void patientPassNum(HttpServletRequest request, HttpServletResponse response) {
    Long visitId = Long.valueOf(request.getParameter("visitId"));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    Jiuzhen visit = this.jiuzhenService.getJiuzhenById(visitId);
    visit.setState(Integer.valueOf(30));
    this.jiuzhenService.updateJiuzhen(visit);
  }
  
  @RequestMapping(value = {"/patientfinish.htm"}, method = {RequestMethod.POST})
  public void patientFinish(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    List<Map<String, Object>> list = this.jiuzhenService
      .getZhenDuanList(visitId);
    MyResult result = new MyResult();
    result.setDoing("完成就诊");
    if (list != null && list.size() > 0) {
      Jiuzhen visit = this.jiuzhenService
        .getJiuzhenById(Long.valueOf(visitId));
      if (visit.getState().intValue() == 29) {
        result.setState(0);
        result.setMessage("该患者已由其他医生完成诊断！");
      } else {
        visit.setState(Integer.valueOf(29));
        this.jiuzhenService.updateJiuzhen(visit);
        this.doctorsWorkstationService.saveOldEyeSysClinic(visit.getId());
        result.setState(1);
      } 
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getcomparedata.htm"}, method = {RequestMethod.POST})
  public void getCompareData(HttpServletRequest request, HttpServletResponse response) {
    String visitIds = request.getParameter("visitIds");
    JSONArray jsonArray = this.doctorsWorkstationService
      .getCompareData(visitIds);
    JSONWriterUtils.writeJSONList((List)jsonArray, response);
  }
  
  @RequestMapping(value = {"/getorderlist.htm"}, method = {RequestMethod.POST})
  public void getOrderList(HttpServletRequest request, HttpServletResponse response) {
    String visit = request.getParameter("visit");
    List list = this.doctorsWorkstationService.getOrderListByVisitId(visit);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/findPrescriptionList.htm"}, method = {RequestMethod.POST})
  public void findPrescriptionList(HttpServletRequest request, HttpServletResponse response) {
    List<YaoPinType> list = this.doctorsWorkstationService
      .findPrescriptionList();
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/findMedicines.htm"}, method = {RequestMethod.POST})
  public void findMedicines(HttpServletRequest request, HttpServletResponse response, String input, String rows, String page) {
    System.out.println("请求每页" + rows + "行" + "\t" + "当前要返回第" + page + "页");
    Map<String, Object> map = new HashMap<>();
    if (!"".equals(input)) {
      map = this.doctorsWorkstationService.findMedicines(input, rows, page);
      System.out.println(JSONObject.fromObject(map));
    } else {
      map.put("total", Integer.valueOf(0));
      map.put("rows", new JSONArray());
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/savePrescription.htm"}, method = {RequestMethod.POST})
  public void savePrescription(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String binglihao = request.getParameter("binglihao");
    String visitId = request.getParameter("visitId");
    String prescrptionArr = request.getParameter("prescrptionArr");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : "";
    try {
      List<OutpPresc> obj = this.doctorsWorkstationService.savePrescription(
          binglihao, visitId, prescrptionArr, gonghao);
      System.out.println(obj.size());
      mr.setObj(obj);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/deleteMedicines"}, method = {RequestMethod.POST})
  public void deleteMedicines(HttpServletRequest request, HttpServletResponse response) {
    String ids = request.getParameter("ids");
    JSONArray ja = JSONArray.fromObject(ids);
    System.out.println(ja);
    List<Long> list = new ArrayList<>();
    for (int i = 0; i < ja.size(); i++) {
      Long id = Long.valueOf(Long.parseLong(ja.get(i).toString()));
      list.add(id);
    } 
    MyResult mr = new MyResult();
    try {
      this.doctorsWorkstationService.deleteMedicines(list);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findSubmitMedicines.htm"}, method = {RequestMethod.POST})
  public void findSubmitMedicines(HttpServletRequest request, HttpServletResponse response, String jiuzhenId) {
    MyResult mr = new MyResult();
    try {
      List<OutpPresc> list = this.doctorsWorkstationService
        .findSubmitMedicines(jiuzhenId);
      mr.setObj(list);
      System.out.println(JSONArray.fromObject(list));
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"getjcxmpertainitems.htm"}, method = {RequestMethod.POST})
  public void getJcxmPertainItems(HttpServletRequest request, HttpServletResponse response) {
    String jcxmId = request.getParameter("jcxmId");
    List<Map<String, Object>> list = this.doctorsWorkstationService
      .getJcxmPertainItemsByJcxmId(Integer.valueOf(Integer.parseInt(jcxmId)), 
        OimsCategoryConfig.specialCategory);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"getApplyList.htm"}, method = {RequestMethod.POST})
  public void getUnpayApplyList(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    String orders = request.getParameter("orders");
    String gonghao = request.getSession().getAttribute("gonghao")
      .toString();
    YuanGong yuangong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
    JSONArray result = this.doctorsWorkstationService.getUnpayApplyOrderList(
        visitId, orders);
    List<Map<String, Object>> list = this.jiuzhenService
      .getZhenDuanList(visitId);
    StringBuilder diagnose = new StringBuilder();
    for (int i = 0; i < list.size(); i++) {
      if (i > 0)
        diagnose.append(","); 
      diagnose.append(((Map)list.get(i)).get("zdflname"));
    } 
    JSONObject obj = new JSONObject();
    obj.put("doctor", yuangong.getXingming());
    obj.put("printDate", (
        new SimpleDateFormat("yyyy-MM-dd")).format(new Date()));
    obj.put("list", result);
    obj.put("diagnose", diagnose.toString());
    JSONWriterUtils.writeJSONObj(obj, response);
  }
  
  @RequestMapping(value = {"updatepatientmobile.htm"}, method = {RequestMethod.POST})
  public void updatePatientMobile(HttpServletRequest request, HttpServletResponse response) {
    String patientId = request.getParameter("patientId");
    String mobile = request.getParameter("mobile");
    HuanZheXinXi patient = this.huanZheXinXiService.findHuanZheById(
        Long.valueOf(patientId));
    patient.setShouji(mobile);
    this.huanZheXinXiService.updateHuanZheXingXi(patient);
    MyResult result = new MyResult();
    result.setState(1);
    result.setDoing("更新患者手机号");
    result.setObj(mobile);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveDiagnosis.htm"}, method = {RequestMethod.POST})
  public void saveDiagnosis(HttpServletRequest request, HttpServletResponse response, String zkjc) {
    MyResult mr = new MyResult();
    String visitId = request.getParameter("visitId");
    String[] diseaseIds = request.getParameterValues("diseaseId");
    String[] eyes = request.getParameterValues("eye");
    String[] states = request.getParameterValues("state");
    String doctor = request.getSession().getAttribute("gonghao").toString();
    YuanGong yg = this.yuanGongService.obtainYuanGongByGonghao(doctor);
    StringBuffer sb = new StringBuffer("");
    JSONArray diagnosis = new JSONArray();
    if (diseaseIds != null)
      for (int i = 0; i < diseaseIds.length; i++) {
        JSONObject jo = new JSONObject();
        jo.put("visitId", visitId);
        jo.put("diseaseId", diseaseIds[i]);
        jo.put("eye", eyes[i]);
        jo.put("state", states[i]);
        sb.append(String.valueOf(eyes[i]) + this.jiBingService.findJiBingById(Integer.valueOf(Integer.parseInt(diseaseIds[i]))).getDisease() + (states[i].trim().equals("1") ? "" : "？"));
        if (i != diseaseIds.length - 1)
          sb.append(","); 
        diagnosis.add(jo);
      }  
    try {
      List result = this.doctorsWorkstationService.saveDiagnosis(
          diagnosis.toString(), doctor);
      Jiuzhen jz = this.jiuzhenService.getJiuzhenById(Long.valueOf(Long.parseLong(visitId)));
      String diag = (sb != null) ? sb.toString() : null;
      if (jz.getHaoma() != null && !jz.getHaoma().startsWith("OIMS") && diag != null) {
        OutpMr om = this.hisWebService.findOUTPMR(jz.getCaozuoTime(), Integer.valueOf(Integer.parseInt(jz.getHaoma())));
        if (om != null) {
          om.setDiag_desc(diag);
          om.setLast_doctor(yg.getXingming());
          this.hisWebService.updateOUTPMR(om);
        } else {
          om = new OutpMr();
          HuanZheXinXi hzxx = this.huanZheXinXiService.findHuanZheById(jz.getHuanzheId());
          om.setPatient_id(hzxx.getBinglihao());
          om.setVisit_date(jz.getCaozuoTime());
          om.setVisit_no(Integer.valueOf(Integer.parseInt(jz.getHaoma())));
          om.setDiag_desc(diag);
          om.setDoctor(yg.getXingming());
          om.setLast_doctor(yg.getXingming());
          this.hisWebService.addOUTPMR(om);
        } 
      } 
      this.jiuzhenService.setPatientState(Long.valueOf(Long.parseLong(visitId)), Integer.valueOf(94));
      mr.setObj(result);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"removeDiagnosis.htm"}, method = {RequestMethod.POST})
  public void deleteDiagnosis(HttpServletRequest request, HttpServletResponse response) {
    String diagnosis = request.getParameter("diagnosis");
    this.doctorsWorkstationService.deleteDiagnosis(diagnosis);
  }
  
  @RequestMapping(value = {"getExistsDiagnosis.htm"}, method = {RequestMethod.POST})
  public void getDiagnosis(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    List<Map<String, Object>> list = this.jiuzhenService
      .getZhenDuanList(visitId);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/findAdministrations.htm"}, method = {RequestMethod.POST})
  public void findAdministrations(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    List<Map<String, Object>> list = this.doctorsWorkstationService
      .findAdministrations();
    mr.setObj(list);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateVision.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateVision(HttpServletRequest request, HttpServletResponse response) {
    String vision = request.getParameter("vision");
    String doctor = request.getSession().getAttribute("gonghao").toString();
    String id = this.doctorsWorkstationService
      .saveOrUpdateVision(vision, doctor);
    MyResult result = new MyResult();
    result.setObj(id);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findFrequencys.htm"}, method = {RequestMethod.POST})
  public void findFrequencys(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    List<Map<String, Object>> list = this.doctorsWorkstationService
      .findFrequencys();
    mr.setObj(list);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateIop.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateIop(HttpServletRequest request, HttpServletResponse response) {
    String iop = request.getParameter("iop");
    String doctor = request.getSession().getAttribute("gonghao").toString();
    String id = this.doctorsWorkstationService.saveOrUpdateIop(iop, doctor);
    MyResult result = new MyResult();
    result.setObj(id);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"getOptometry.htm"}, method = {RequestMethod.POST})
  public void getOptometry(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    List list = this.jiuzhenService.getYanGuangUrl(visitId);
    if (list.size() > 0) {
      String[] exincludes = { "id", "jcdid", "jcsj", "jcys", 
          "jiuzhenid" };
      JSONObject result = JSONObject.fromObject(list.get(0), 
          JsonUtil.ignoreProperty(exincludes));
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  @RequestMapping(value = {"getInspectPhoto.htm"}, method = {RequestMethod.POST})
  public void getInspectPhotos(HttpServletRequest request, HttpServletResponse response) {
    String path = request.getSession().getServletContext().getRealPath("/");
    String inspectId = request.getParameter("inspectId");
    List<Map<String, Object>> list = this.jiuzhenService.getStudy(inspectId, 
        path);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"getDiseasesByPinyin.htm"}, method = {RequestMethod.POST})
  public void getDiseasesByPinyin(HttpServletRequest request, HttpServletResponse response) {
    String search = request.getParameter("search");
    List<JiBing> list = this.jiBingService.getDiseasesBySearch(search);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"getLastTimeInfo.htm"}, method = {RequestMethod.POST})
  public void getLastTimeInfo(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    String patientId = request.getParameter("patientId");
    JSONObject result = this.doctorsWorkstationService.getLastTimeInfo(visitId, 
        patientId);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"validateTabSwitch.htm"}, method = {RequestMethod.POST})
  public void validateTabSwitch(HttpServletRequest request, HttpServletResponse response) {
    String categoryId = request.getParameter("categoryId");
    String visitId = request.getParameter("visitId");
    JSONObject result = this.doctorsWorkstationService.validateTabSwitch(
        visitId, categoryId);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"invalidInspectOrder.htm"}, method = {RequestMethod.POST})
  public void invalidInspectOrder(HttpServletRequest request, HttpServletResponse response) {
    String orders = request.getParameter("orders");
    MyResult result = new MyResult();
    result.setState(0);
    int flag = 0;
    if (orders != null) {
      String[] orderArr = orders.split(",");
      for (int i = 0; i < orderArr.length; i++) {
        Jcd jcd = this.jcdService.getJcdById(Long.valueOf(orderArr[i]));
        if (jcd != null && 
          jcd.getBiaoshi().intValue() == 50) {
          this.jcdService.deleteJcd(jcd);
        } else if (jcd != null && 
          jcd.getBiaoshi().intValue() != 50) {
          flag++;
        } 
      } 
      if (flag != orderArr.length) {
        result.setState(1);
        result.setMessage("已删除未检查的检查单");
      } else {
        result.setMessage("所选检查单均已执行，不能删除");
      } 
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getFzysToday.htm"}, method = {RequestMethod.POST})
  public void getFzysToday(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    List<YuanGong> list = null;
    String gonghao = request.getSession().getAttribute("gonghao").toString();
    try {
      this.doing = "在患者列表初始化的时候查询此刻所有的fzys";
      list = this.doctorsWorkstationService.getFzysToday();
      YuanGong self = null;
      for (int i = 0; i < list.size(); i++) {
        YuanGong employee = list.get(i);
        if (employee.getGonghao().equals(gonghao))
          self = employee; 
      } 
      this.doState = 1;
      this.message = "查询成功！";
    } catch (Exception e) {
      this.doState = 0;
      this.message = e.getMessage();
      e.printStackTrace();
    } 
    mr.setDoing(this.doing);
    mr.setState(this.doState);
    mr.setMessage(this.message);
    mr.setDate(new Date());
    mr.setGonghao(gonghao);
    mr.setObj(list);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"getPrescPrintData.htm"}, method = {RequestMethod.POST})
  public void getPrescPrintData(HttpServletRequest request, HttpServletResponse response) {
    String medicalNum = request.getParameter("medicalNum");
    String visitId = request.getParameter("visitId");
    String gonghao = request.getSession().getAttribute("gonghao")
      .toString();
    JSONObject result = this.doctorsWorkstationService.getPrescPrintData(
        medicalNum, visitId, gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"getHandleProject.htm"}, method = {RequestMethod.POST})
  public void getHandleProject(HttpServletRequest request, HttpServletResponse response) {
    String pinyin = request.getParameter("pinyin");
    String validable = request.getParameter("validable");
    List list = this.doctorsWorkstationService.getHandleProjectByPinyin(pinyin, 
        Boolean.valueOf(validable).booleanValue());
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"getHandlePertain.htm"}, method = {RequestMethod.POST})
  public void getHandlePertain(HttpServletRequest request, HttpServletResponse response) {
    String handleId = request.getParameter("handleId");
    List list = this.doctorsWorkstationService.getHandlePertain(handleId, 
        OimsCategoryConfig.handleCategory);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"saveHandleOrders.htm"}, method = {RequestMethod.POST})
  public void saveHandleOrders(HttpServletRequest request, HttpServletResponse response) {
    String handleOrders = request.getParameter("handleOrders");
    String gonghao = request.getSession().getAttribute("gonghao")
      .toString();
    String visitId = request.getParameter("visitId");
    List list = this.doctorsWorkstationService.saveHandleOrders(handleOrders, 
        gonghao, visitId);
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"getExistHandleOrders.htm"}, method = {RequestMethod.POST})
  public void getExistHandleOrders(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    List result = this.doctorsWorkstationService.getExistHandleOrders(visitId);
    JSONWriterUtils.writeJSONList(result, response);
  }
  
  @RequestMapping(value = {"delHandleOrders.htm"}, method = {RequestMethod.POST})
  public void delHandleOrders(HttpServletRequest request, HttpServletResponse response) {
    String orders = request.getParameter("orders");
    List result = this.doctorsWorkstationService.delHandleOrders(orders);
    JSONWriterUtils.writeJSONList(result, response);
  }
  
  @RequestMapping(value = {"getHandlePrintData.htm"}, method = {RequestMethod.POST})
  public void getHandlePrintData(HttpServletRequest request, HttpServletResponse response) {
    String orders = request.getParameter("orders");
    String visitId = request.getParameter("visitId");
    String gonghao = request.getSession().getAttribute("gonghao")
      .toString();
    JSONArray result = this.doctorsWorkstationService.getHandlePrintData(
        Long.valueOf(visitId), orders);
    YuanGong yuangong = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
    List<Map<String, Object>> list = this.jiuzhenService
      .getZhenDuanList(visitId);
    StringBuilder diagnose = new StringBuilder();
    for (int i = 0; i < list.size(); i++) {
      if (i > 0)
        diagnose.append(","); 
      diagnose.append(((Map)list.get(i)).get("zdflname"));
    } 
    JSONObject obj = new JSONObject();
    obj.put("doctor", yuangong.getXingming());
    obj.put("printDate", (
        new SimpleDateFormat("yyyy-MM-dd")).format(new Date()));
    obj.put("list", result);
    obj.put("diagnose", diagnose.toString());
    JSONWriterUtils.writeJSONObj(obj, response);
  }
  
  @RequestMapping(value = {"clearPaint.htm"}, method = {RequestMethod.POST})
  public void clearPaint(HttpServletRequest request, HttpServletResponse response) {
    String categoryId = request.getParameter("categoryId");
    String visitId = request.getParameter("visitId");
    String realPath = request.getSession().getServletContext()
      .getRealPath("");
    this.doctorsWorkstationService.clearPaint(categoryId, visitId, realPath);
    MyResult result = new MyResult();
    result.setState(1);
    result.setDoing("清除体格检查画图结果");
    result.setMessage("操作成功");
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveFollowedUp.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateFollowedUp(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    String content = request.getParameter("content");
    String followed_time = request.getParameter("followed_time");
    this.doctorsWorkstationService.saveOrUpdateFollowedUp(visitId, content, 
        followed_time);
  }
  
  @RequestMapping(value = {"findFollowdUpByVisitId.htm"}, method = {RequestMethod.POST})
  public void findFollowdUpByVisitId(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String visitId = request.getParameter("visitId");
    FollowedUp fu = this.doctorsWorkstationService
      .findFollowdUpByVisitId(visitId);
    mr.setObj(fu);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/savebingliprint.htm"}, method = {RequestMethod.POST})
  public void savebingliprint(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String jiuzhen_id = request.getParameter("id");
    this.doctorsWorkstationService.savebingliprint(gonghao, jiuzhen_id);
  }
  
  @RequestMapping(value = {"/bingliprintnum.htm"}, method = {RequestMethod.POST})
  public void bingliprintnum(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String jiuzhen_id = request.getParameter("id");
    Integer i = this.doctorsWorkstationService.bingliprintnum(jiuzhen_id);
    mr.setObj(i);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/finishandupdateclinic.htm"}, method = {RequestMethod.POST})
  public void finishandupdateclinic(HttpServletRequest request, HttpServletResponse response) {
    String visitId = request.getParameter("visitId");
    List<Map<String, Object>> list = this.jiuzhenService
      .getZhenDuanList(visitId);
    MyResult result = new MyResult();
    result.setDoing("24小时内修改了病史");
    if (list != null && list.size() > 0) {
      Jiuzhen visit = this.jiuzhenService
        .getJiuzhenById(Long.valueOf(visitId));
      this.doctorsWorkstationService.updateOldEyeSysClinic(visit.getId());
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findExamItemClass.htm"}, method = {RequestMethod.POST})
  public void findExamItemClass(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    try {
      List<ExamItemClass> list = this.examWebService.findExamItemClass();
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findExamItemsSubClass.htm"}, method = {RequestMethod.POST})
  public void findExamItemsSubClass(HttpServletRequest request, HttpServletResponse response, Page page) {
    String classCode = request.getParameter("classCode");
    String keyword = request.getParameter("keyword");
    page = new Page();
    page.setCurrentPage(Integer.valueOf(1));
    page.setPageSize(Integer.valueOf(5));
    MyResult mr = new MyResult();
    try {
      List<ExamItemSubClass> list = this.examWebService.findExamItemsSubClass(
          classCode, keyword, null, page.getCurrentPage().intValue(), 
          page.getPageSize().intValue());
      for (ExamItemSubClass eisc : list)
        System.out.println(String.valueOf(eisc.getItemCode()) + "\t" + eisc.getName()); 
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findExamItems.htm"}, method = {RequestMethod.POST})
  public void findExamItems(HttpServletRequest request, HttpServletResponse response, Page page) {
    MyResult mr = new MyResult();
    String classId = request.getParameter("classId");
    String subClassId = request.getParameter("subClassId");
    String keyword = request.getParameter("keyword");
    if (page.getCurrentPage() == null)
      page.setCurrentPage(Integer.valueOf(1)); 
    if (page.getPageSize() == null)
      page.setPageSize(Integer.valueOf(100)); 
    try {
      List<ExamItem> list = this.examWebService.findExamItems(classId, 
          subClassId, keyword, null, page.getCurrentPage().intValue(), 
          page.getPageSize().intValue());
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/addExamItem.htm"}, method = {RequestMethod.POST})
  public void addExamItem(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String items = request.getParameter("items");
    JSONArray ja = JSONArray.fromObject(items);
    try {
      List<ResponseObj> list = this.doctorsWorkstationService.addExamItem(ja);
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/deleteExamItem.htm"}, method = {RequestMethod.POST})
  public void deleteExamItem(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String examNo = request.getParameter("examNo");
    JSONArray ja = JSONArray.fromObject(examNo);
    try {
      this.doctorsWorkstationService.deleteExamItem(ja);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findExamItemResult.htm"}, method = {RequestMethod.POST})
  public void findExamItemResult(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String exam = request.getParameter("examNo");
    try {
      List<ExamResult> list = this.examWebService.findExamItemResult(exam);
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findExamDept.htm"}, method = {RequestMethod.POST})
  public void findExamDept(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String examCode = request.getParameter("examCode");
    try {
      List<Dept> depts = this.examWebService.findExamDept(examCode);
      mr.setObj(depts);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findTestItems.htm"}, method = {RequestMethod.POST})
  public void findTestItems(HttpServletRequest request, HttpServletResponse response, Page page) {
    MyResult mr = new MyResult();
    String classId = request.getParameter("classId");
    String keyword = request.getParameter("keyword");
    page = new Page();
    page.setCurrentPage(Integer.valueOf(1));
    page.setPageSize(Integer.valueOf(5));
    try {
      List<TestItem> list = this.lisWebService.findTestItems(classId, keyword, 
          null, page.getCurrentPage().intValue(), page.getPageSize().intValue());
      for (TestItem ti : list)
        System.out.println(String.valueOf(ti.getItemCode()) + "\t" + ti.getItemTitle()); 
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/addTestItem.htm"}, method = {RequestMethod.POST})
  public void addTestItem(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String items = request.getParameter("items");
    JSONArray ja = JSONArray.fromObject(items);
    try {
      List<String> testNo = this.doctorsWorkstationService.addTestItem(ja);
      mr.setObj(testNo);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/deleteTestItem.htm"}, method = {RequestMethod.POST})
  public void deleteTestItem(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String testNo = request.getParameter("testNo");
    JSONArray ja = JSONArray.fromObject(testNo);
    try {
      this.doctorsWorkstationService.deleteTestItem(ja);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findTestItemResult.htm"}, method = {RequestMethod.POST})
  public void findTestItemResult(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String testNo = request.getParameter("testNo");
    try {
      List<TestResult> list = this.lisWebService.findTestItemResult(testNo);
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findTestDept.htm"}, method = {RequestMethod.POST})
  public void findTestDept(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String testCode = request.getParameter("testCode");
    try {
      List<Dept> list = this.lisWebService.findTestDept(testCode);
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findSampleByItemId.htm"}, method = {RequestMethod.POST})
  public void findSampleByItemId(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String itemCode = request.getParameter("itemCode");
    try {
      List<Sample> list = this.lisWebService.findSampleByItemId(itemCode);
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/getExamItemPaymentFlag.htm"}, method = {RequestMethod.POST})
  public void getExamItemPaymentFlag(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String examNo = request.getParameter("examNo");
    try {
      Integer i = Integer.valueOf(this.examWebService.getExamItemPaymentFlag(examNo));
      mr.setObj(i);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findSubmitExamItems.htm"}, method = {RequestMethod.POST})
  public void findSubmitExamItems(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String jiuzhenId = request.getParameter("jiuzhenId");
    try {
      List<ExamCheck> list = this.doctorsWorkstationService
        .findSubmitExamItems(jiuzhenId);
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findSubmitLis.htm"}, method = {RequestMethod.POST})
  public void findSubmitLis(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String jiuzhenId = request.getParameter("jiuzhenId");
    try {
      List<TestCheck> list = this.doctorsWorkstationService
        .findSubmitLis(jiuzhenId);
      mr.setObj(list);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/showDoctorWorkstation.htm"}, method = {RequestMethod.POST})
  public void showDoctorWorkstation(HzjzForm form, HttpServletRequest request, HttpServletResponse response, String fenzhenkaidan) {
    MyResult result = new MyResult();
    result.setDoing("修改");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      Map<String, Object> map = this.jiuzhenService.getDoctorWorkstationIndexData(form, gonghao);
      result.setObj(map);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getMedicalRecord.htm"}, method = {RequestMethod.POST})
  public void getPatientMC(Jzjl jzjlForm, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("修改");
    try {
      String gonghao = request.getSession().getAttribute("gonghao")
        .toString();
      result.setGonghao(gonghao);
      Jzjl jzjl = this.jiuzhenService.getPatientMC(jzjlForm);
      result.setObj(jzjl);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getPriceByJcxmIdAndEyE.htm"}, method = {RequestMethod.POST})
  public void getPriceByJcxmIdAndEyE(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String jcxmId = request.getParameter("jcxmId");
    String eye = request.getParameter("eye");
    try {
      Float f = this.doctorsWorkstationService.getPriceByJcxmIdAndEyE(jcxmId, 
          eye);
      mr.setObj(f);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findInquiryAndPhysicalCategory.htm"}, method = {RequestMethod.POST})
  public void findInquiryAndPhysicalCategory(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String id = request.getParameter("id");
    try {
      List<InquiryComboTreeNode> list = this.doctorsWorkstationService
        .findInquiryAndPhysicalCategory(id);
      mr.setState(1);
      mr.setObj(list);
    } catch (Exception e) {
      mr.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findInquiryAndPhsicalNode.htm"}, method = {RequestMethod.POST})
  public void findInquiryAndPhsicalNode(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult mr = new MyResult();
    String fatherId = request.getParameter("fatherId");
    String search = request.getParameter("search");
    try {
      JSONArray ja = this.doctorsWorkstationService.findInquiryAndPhsicalNode(
          fatherId, search, gonghao);
      mr.setState(1);
      mr.setObj(ja);
    } catch (Exception e) {
      mr.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/showPrescriptions.htm"}, method = {RequestMethod.POST})
  public void showPrescription(HttpServletRequest request, HttpServletResponse response, Page page) {
    String search = request.getParameter("search");
    MyResult mr = new MyResult();
    try {
      Map<String, Object> map = this.doctorsWorkstationService
        .showPrescription(search, page);
      mr.setObj(map);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/handleProjectToJcxm.htm"}, method = {RequestMethod.POST})
  public void handleProjectToJcxm(HttpServletRequest request, HttpServletResponse response) {
    this.doctorsWorkstationService.handleProjectToJcxm();
  }
  
  @RequestMapping(value = {"/fuShuSyncro.htm"}, method = {RequestMethod.POST})
  public void fuShuSyncro(HttpServletRequest request, HttpServletResponse response) {
    this.doctorsWorkstationService.fuShuSyncro();
  }
  
  @RequestMapping(value = {"/syncroYuangongGonghao.htm"}, method = {RequestMethod.POST})
  public void syncroYuangongGonghao(HttpServletRequest request, HttpServletResponse response) {
    this.doctorsWorkstationService.syncroYuangongGonghao();
  }
  
  @RequestMapping(value = {"/syncroFuShu"}, method = {RequestMethod.POST})
  public void syncroFuShu(HttpServletRequest request, HttpServletResponse response) {
    this.doctorsWorkstationService.syncroFuShu();
  }
  
  @RequestMapping(value = {"/getZhuYuanPatient.htm"}, method = {RequestMethod.POST})
  public void getZhuYuanPatient(HttpServletRequest request, HttpServletResponse response, String binglihao) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghadoctorsWorkstationServiceo") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<PatientVistInfomation> lists = new ArrayList<>();
    try {
      lists = this.hisWebService.getPatientVisitInfoMationsByPatientId(binglihao);
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
    result.setObj(lists);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getBingliHTML.htm"}, method = {RequestMethod.POST})
  public void getBingliHTML(HttpServletRequest request, HttpServletResponse response, String binglihao, String visitID, Integer visitType, String visitDate, String typeID) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghadoctorsWorkstationServiceo") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    String html = null;
    try {
      Date visit_Date = (new SimpleDateFormat("yyyy-MM-dd")).parse(visitDate);
      html = this.docWebService.getBingliHTML(binglihao, visitID, visitType.intValue(), visit_Date, typeID);
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
    result.setObj(html);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getDoctorNameUrl.htm"}, method = {RequestMethod.POST})
  public void getDoctorName(HttpServletRequest request, HttpServletResponse response, String binglihao, String gonghao) {
    MyResult mr = new MyResult();
    try {
      YuanGong yg = this.yuanGongService.obtainYuanGongByGonghao(gonghao);
      mr.setObj(yg.getXingming());
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/eyePatient.htm"}, method = {RequestMethod.POST})
  public void eyePatient(HttpServletRequest request, HttpServletResponse response) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      HuanZheXinXi patient = this.huanZheXinXiService.findHuanZheById(Long.valueOf(35336L));
      this.iEyeDao.addPatientToEyeDatabase(patient);
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  @RequestMapping(value = {"/updateChargeType.htm"}, method = {RequestMethod.POST})
  public void updateChargeType(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
    Jiuzhen jz = this.jiuzhenService.getJiuzhenById(Long.valueOf(27152L));
    System.out.println(new String((new String(jz.getJzChargeType().getBytes())).getBytes("iso-8859-1"), "GBK"));
  }
  
  @RequestMapping(value = {"/resetList.htm"}, method = {RequestMethod.POST})
  public void resetList(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
    this.jiuzhenService.syncroPatientAndJiuzhen(request.getParameter("gonghao"), null);
  }
  
  @RequestMapping(value = {"/findZyzByJiuzhenId.htm"}, method = {RequestMethod.POST})
  public void findZyzByJiuzhenId(HttpServletRequest request, HttpServletResponse response, String jiuzhenId) {
    MyResult mr = new MyResult();
    try {
      EMRInHospitalCard emrInHospitalCard = this.doctorsWorkstationService.getEMRInHospitalCardByJiuZhenID(jiuzhenId);
      mr.setObj(emrInHospitalCard);
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/saveOrUpdateEMRInHospitalCard.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEMRInHospitalCard(HttpServletRequest request, HttpServletResponse response, EMRInHospitalCard emrInHospitalCard) {
    MyResult mr = new MyResult();
    try {
      Long l = this.doctorsWorkstationService.saveOrUpdateEMRInHospitalCard(emrInHospitalCard);
      if (l == null) {
        mr.setObj(null);
      } else {
        mr.setObj(emrInHospitalCard);
        InHospitalTransfer map = getEMRInHospitalCardMap(emrInHospitalCard);
        String hisback = null;
        if (emrInHospitalCard.getHisback() != null && emrInHospitalCard.getHisback().trim().length() > 0) {
          this.hisWebService.updateInHospitalCard(map);
          hisback = emrInHospitalCard.getJiuzhenId();
        } else {
          this.hisWebService.saveInHospitalCard(map);
          hisback = emrInHospitalCard.getJiuzhenId();
        } 
        if (hisback != null) {
          emrInHospitalCard = this.doctorsWorkstationService.getEMRInHospitalCardByJiuZhenID(emrInHospitalCard.getJiuzhenId());
          emrInHospitalCard.setHisback(hisback);
          l = this.doctorsWorkstationService.saveOrUpdateEMRInHospitalCard(emrInHospitalCard);
          if (l == null) {
            mr.setObj(null);
          } else {
            mr.setObj(emrInHospitalCard);
          } 
        } 
      } 
      mr.setState(1);
    } catch (Exception e) {
      mr.setState(0);
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  public InHospitalTransfer getEMRInHospitalCardMap(EMRInHospitalCard emrInHospitalCard) {
    InHospitalTransfer inHospitalTransfer = new InHospitalTransfer();
    inHospitalTransfer.setPriority(String.valueOf(emrInHospitalCard.getPriority()));
    inHospitalTransfer.setStatus(String.valueOf(emrInHospitalCard.getStatus()));
    inHospitalTransfer.setPre_condition(String.valueOf(emrInHospitalCard.getPreCondition()));
    inHospitalTransfer.setCreate_date((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(emrInHospitalCard.getCreateDate()));
    inHospitalTransfer.setPre_perment(String.valueOf(emrInHospitalCard.getPrePerment()));
    inHospitalTransfer.setDoctor_name(emrInHospitalCard.getDoctorName());
    inHospitalTransfer.setOrdered_by(emrInHospitalCard.getOrderedBy());
    inHospitalTransfer.setSpecial_desc(emrInHospitalCard.getSpecialDesc());
    inHospitalTransfer.setPre_dept(emrInHospitalCard.getPreDept());
    inHospitalTransfer.setPatient_id(emrInHospitalCard.getPatientID());
    inHospitalTransfer.setVisit_no(emrInHospitalCard.getVisitNo());
    inHospitalTransfer.setVisit_date((new SimpleDateFormat("yyyy-MM-dd")).format(emrInHospitalCard.getVisitDate()));
    inHospitalTransfer.setInpCardType(String.valueOf(emrInHospitalCard.getInpCardType()));
    inHospitalTransfer.setPatTypeCode(String.valueOf(emrInHospitalCard.getPatTypeCode()));
    inHospitalTransfer.setOutp_diagnosis(emrInHospitalCard.getOutpDiagnosis());
    return inHospitalTransfer;
  }
}
