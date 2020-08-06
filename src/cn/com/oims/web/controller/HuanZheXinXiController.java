package cn.com.oims.web.controller;

import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.common.XLSHead;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.service.IDoctorsWorkstationService;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.HuanZheForm;
import cn.com.oims.web.form.HuanZheSearchForm;
import cn.com.oims.web.server.HisService;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.pojo.Patient;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping({"huanZheXinXi"})
public class HuanZheXinXiController extends BaseController {
  private String path_photoUpLoad = "/huanzhexinxi_photos";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private HisService hisService;
  
  @Autowired
  private IHuanZheXinXiService huanzhexinxiService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IJiuzhenService jiuzhenService;
  
  @Autowired
  private HisWebService hisWebService;
  
  @Autowired
  private IHuanZheXinXiDao huanZheXinXiDao;
  
  @Autowired
  private IDoctorsWorkstationService doctorsWorkstationService;
  
  @RequestMapping(value = {"saveHuanZhe.htm"}, method = {RequestMethod.POST})
  public void saveHuanZhe(HuanZheForm hz, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghadoctorsWorkstationServiceo") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "患者信息新增";
    try {
      hz.setJilvren(gonghao);
      this.huanzhexinxiService.saveHuanZhe(hz);
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
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setGonghao(null);
    result.setObj(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateHuanZhe.htm"}, method = {RequestMethod.POST})
  public void updateHuanZhe(HuanZheForm hz, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "患者信息新增";
    try {
      hz.setJilvren(gonghao);
      this.huanzhexinxiService.updateHuanZhe(hz);
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
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setGonghao(null);
    result.setObj(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delHuanZhe.htm"}, method = {RequestMethod.POST})
  public void delHuanZhe(HttpServletRequest request, HttpServletResponse response, HuanZheXinXi huanzhexinxi) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "患者信息删除";
    try {
      boolean boo = this.jiuzhenService
        .isExistJiuZhenToHuanZheXinXi(huanzhexinxi.getId());
      this.doState = 1;
      if (boo) {
        this.message = "此患者存在就诊信息不能进行删除！";
      } else {
        this.huanzhexinxiService.deleteHuanZheXinXiByHzid(huanzhexinxi
            .getId());
        this.message = "操作成功";
      } 
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setObj(huanzhexinxi);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @Transactional
  @RequestMapping(value = {"/findHuanZheList.htm"}, method = {RequestMethod.POST})
  public void findHuanZhe(HuanZheSearchForm searchForm, Page page, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map_o = new HashMap<>();
    this.doing = "根据查询条件分页查询符合条件的检查项目（联合查询）";
    try {
      List<Map<String, Object>> list = this.huanzhexinxiService.getHuanZheXinXiListByPage(page, 
          searchForm);
      if (searchForm.getSearch() != null && !"".equals(searchForm.getSearch().trim())) {
        String sql_pat_master_index = "select * from pat_master_index where 1=1 and patient_id='" + 
          searchForm.getSearch() + "' or name='" + searchForm.getSearch() + "'";
        List<Map<String, Object>> patients = this.hisService
          .slectList(sql_pat_master_index);
        if (patients.size() > 0) {
          try {
            for (Map<String, Object> map_pat_master_index : patients) {
              String PATIENT_ID = (map_pat_master_index.get("PATIENT_ID") == null) ? "" : 
                map_pat_master_index.get("PATIENT_ID").toString()
                .trim();
              PATIENT_ID = new String(PATIENT_ID.getBytes("iso-8859-1"), 
                  "GBK");
              boolean b = true;
              for (Map<String, Object> map_local : list) {
                if (map_local.get("binglihao").toString().equals(PATIENT_ID)) {
                  b = false;
                  break;
                } 
              } 
              if (b) {
                String NAME = (map_pat_master_index.get("NAME") == null) ? "" : 
                  map_pat_master_index.get("NAME").toString()
                  .trim();
                NAME = new String(NAME.getBytes("iso-8859-1"), "GBK");
                String SEX = (map_pat_master_index.get("SEX") == null) ? "" : 
                  map_pat_master_index.get("SEX").toString().trim();
                SEX = new String(SEX.getBytes("iso-8859-1"), "GBK");
                String charge_type = (map_pat_master_index.get("charge_type") == null) ? "" : map_pat_master_index.get("charge_type").toString().trim();
                charge_type = new String(charge_type.getBytes("iso-8859-1"), "GBK");
                String DATE_OF_BIRTH = (map_pat_master_index
                  .get("DATE_OF_BIRTH") == null) ? "" : 
                  map_pat_master_index.get("DATE_OF_BIRTH")
                  .toString().trim();
                DATE_OF_BIRTH = new String(
                    DATE_OF_BIRTH.getBytes("iso-8859-1"), "GBK");
                String MAILING_ADDRESS = (map_pat_master_index
                  .get("MAILING_ADDRESS") == null) ? "" : 
                  map_pat_master_index.get("MAILING_ADDRESS")
                  .toString().trim();
                MAILING_ADDRESS = new String(
                    MAILING_ADDRESS.getBytes("iso-8859-1"), "GBK");
                String CREATE_DATE = (map_pat_master_index
                  .get("CREATE_DATE") == null) ? "" : 
                  map_pat_master_index.get("CREATE_DATE")
                  .toString().trim();
                CREATE_DATE = new String(
                    CREATE_DATE.getBytes("iso-8859-1"), "GBK");
                String idno = (map_pat_master_index.get("ID_NO") == null) ? "" : map_pat_master_index.get("ID_NO").toString();
                String phone = (map_pat_master_index.get("PHONE_NUMBER_HOME") == null) ? "" : map_pat_master_index.get("PHONE_NUMBER_HOME").toString();
                String phone1 = (map_pat_master_index.get("PHONE_NUMBER_BUSINESS") == null) ? "" : map_pat_master_index.get("PHONE_NUMBER_BUSINESS").toString();
                String phone2 = (map_pat_master_index.get("NEXT_OF_KIN_PHONE") == null) ? "" : map_pat_master_index.get("NEXT_OF_KIN_PHONE").toString();
                List<String> phone_list = new ArrayList<>();
                if (!"".equals(phone))
                  phone_list.add(phone); 
                if (!"".equals(phone1) && 
                  !phone1.equals(phone))
                  phone_list.add(phone1); 
                if (!"".equals(phone2) && 
                  !phone2.equals(phone) && !phone2.equals(phone1))
                  phone_list.add(phone2); 
                StringBuffer sb = new StringBuffer("");
                for (int i = 0; i < phone_list.size(); i++) {
                  if (i == 0) {
                    sb.append(phone_list.get(i));
                  } else {
                    sb.append("," + (String)phone_list.get(i));
                  } 
                } 
                HuanZheXinXi huanzhexinxi = new HuanZheXinXi();
                huanzhexinxi.setBinglihao(PATIENT_ID);
                huanzhexinxi.setXingming(NAME);
                huanzhexinxi.setShouji(sb.toString());
                huanzhexinxi.setSfzh(idno);
                huanzhexinxi.setCharge_type(charge_type);
                if ("男".equals(SEX)) {
                  huanzhexinxi.setXingbie(true);
                } else {
                  huanzhexinxi.setXingbie(false);
                } 
                huanzhexinxi.setShengri(this.jiuzhenService.stringToDate(DATE_OF_BIRTH));
                huanzhexinxi.setDiqu(MAILING_ADDRESS);
                huanzhexinxi.setJtdz(MAILING_ADDRESS);
                huanzhexinxi.setJilvren("10002");
                huanzhexinxi.setLaiyuan(Integer.valueOf(1006));
                if (CREATE_DATE != null && !"".equals(CREATE_DATE)) {
                  huanzhexinxi.setZcrq(this.jiuzhenService.stringToDateTime(CREATE_DATE));
                } else {
                  huanzhexinxi.setZcrq(new Date());
                } 
                huanzhexinxi.setBeizhu("数据同步");
                this.huanzhexinxiService.saveHuanZhe(huanzhexinxi);
              } 
            } 
          } catch (Exception e) {
            e.printStackTrace();
          } 
        } else {
          System.out.println("oracle患者信息不存在,无法从his同步");
        } 
      } 
      this.huanZheXinXiDao.evictHibernateTemplate(list);
      list = this.huanzhexinxiService.getHuanZheXinXiListByPage(page, 
          searchForm);
      map_o.put("list", list);
      map_o.put("page", page);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(map_o);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map_o, response);
  }
  
  @RequestMapping(value = {"/findHuanZheToExaminedByPageList.htm"}, method = {RequestMethod.POST})
  public void findHuanZheToExaminedByPageList(HuanZheSearchForm searchForm, Page page, HttpServletRequest req, HttpServletResponse res) {
    MyResult result = new MyResult();
    result.setDoing("获取患者信息列表!");
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List list = this.huanzhexinxiService.findHuanZheToExaminedByPageList(page, 
        searchForm);
    session.setAttribute("searchForm", searchForm);
    Map<Object, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, res);
  }
  
  @RequestMapping(value = {"/findHuanZheListByPage.htm"}, method = {RequestMethod.POST})
  public void findHuanZheListByPage(HuanZheSearchForm searchForm, Page page, HttpServletRequest req, HttpServletResponse res) {
    MyResult result = new MyResult();
    result.setDoing("获取患者信息列表!");
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List list = this.huanzhexinxiService.getHuanZheXinXiListByPage(page, 
        searchForm);
    Map<Object, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, res);
  }
  
  @RequestMapping(value = {"findHuanZheEx.htm"}, method = {RequestMethod.GET})
  public void findHuanZheEx(HuanZheForm hz, Page p, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("分页查询患者信息", req);
    req.getSession().setAttribute("hzf", hz);
    req.getSession().setAttribute("findType", "findHuanZheEx");
    writeLog(mr, level_find);
    writeObjectJson(mr.getObj(), res);
  }
  
  @RequestMapping(value = {"findHuanZheById.htm"}, method = {RequestMethod.POST})
  public void findHuanZheById(Long id, HttpServletRequest request, HttpServletResponse response) {
    HuanZheXinXi huanzhexinxi;
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据患者ID查询患者对象";
    try {
      huanzhexinxi = this.huanzhexinxiService.findHuanZheById(id);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      huanzhexinxi = new HuanZheXinXi();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(huanzhexinxi);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findHuanZhe4Export.htm"}, method = {RequestMethod.POST})
  public void findHuanZhe4Export(String where, HttpServletRequest req, HttpServletResponse res) throws Exception {
    MyResult mr = createResult("导出患者列表信息", req);
    HuanZheSearchForm hzf = (HuanZheSearchForm)req.getSession()
      .getAttribute("searchForm");
    List<Map<String, Object>> data = this.huanzhexinxiService
      .getHuanZheXinXiListByCondition(hzf, where);
    writeLog(mr, level_find);
    exportXls(data, createXlsHead(), req, res);
  }
  
  private Vector<XLSHead> createXlsHead() {
    Vector<XLSHead> hs = new Vector<>();
    XLSHead h = null;
    h = new XLSHead("binglihao", "病历号");
    hs.add(h);
    h = new XLSHead("xingming", "姓名");
    hs.add(h);
    h = new XLSHead("xingbie", "性别");
    hs.add(h);
    h = new XLSHead("shengri", "出生日期");
    hs.add(h);
    h = new XLSHead("sfzh", "身份证号");
    hs.add(h);
    h = new XLSHead("shouji", "手机号码");
    hs.add(h);
    h = new XLSHead("gzdw", "工作单位");
    hs.add(h);
    h = new XLSHead("zcrq", "注册时间");
    hs.add(h);
    h = new XLSHead("diqu", "所属地区");
    hs.add(h);
    return hs;
  }
  
  @RequestMapping(value = {"/getHuanZheXinXiBySearch.htm"}, method = {RequestMethod.GET})
  public void getHuanZheXinXiBySearch(@RequestParam("search") String search, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取患者信息");
    try {
      HuanZheXinXi hzxx = this.huanzhexinxiService
        .getHuanZheXinXiBySearch(search);
      if (hzxx != null) {
        result.setObj(hzxx);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getOneExamedHzxx.htm"}, method = {RequestMethod.GET})
  public void getOneExamedHzxx(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取一个患者信息");
    try {
      Long hzid = this.huanzhexinxiService.getOneExamedHzId();
      if (hzid != null) {
        result.setObj(hzid);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getHuanZheXinXiListBySearch.htm"}, method = {RequestMethod.POST})
  public void getHuanZheXinXiListBySearch(@RequestParam("search") String search, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取患者信息");
    try {
      List<HuanZheXinXi> hzxxlist = this.huanzhexinxiService
        .getHuanZheXinXiListBySearch(search);
      if (hzxxlist != null && hzxxlist.size() > 0) {
        result.setObj(hzxxlist);
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"photoUpload.htm"}, method = {RequestMethod.POST})
  public void photoUpload(MultipartFile oimsUpload, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String path_huanzhexinxiPhoto = "";
    MyResult result = new MyResult();
    this.doing = "患者头像图片上传";
    try {
      String name_huanzhexinxiPhoto = FileUpOrDownLoad.doFileUpLoad(
          oimsUpload, request.getSession().getServletContext()
          .getRealPath(this.path_photoUpLoad));
      if (name_huanzhexinxiPhoto != null && 
        !name_huanzhexinxiPhoto.equals(""))
        path_huanzhexinxiPhoto = String.valueOf(this.path_photoUpLoad) + 
          System.getProperty("file.separator") + 
          name_huanzhexinxiPhoto; 
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      path_huanzhexinxiPhoto = "";
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(path_huanzhexinxiPhoto);
    this.oimsLogService.saveOimsLog(result, 2);
    result.setDoing(null);
    result.setMessage(null);
    result.setGonghao(null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findJiuZhenByHuanZhe.htm"}, method = {RequestMethod.POST})
  public void findJiuZhenByHuanZhe(Long hzid, HttpServletRequest request, HttpServletResponse response) {
    Jiuzhen jiuzhen;
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "以患者id查询最后一次就诊记录";
    try {
      jiuzhen = this.jiuzhenService.findLastJiuZhenByHuanZhe(hzid);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      jiuzhen = new Jiuzhen();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(jiuzhen);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getHuanzhexinxiByBLH.htm"}, method = {RequestMethod.POST})
  public void getHuanzhexinxiByBLH(HuanZheXinXi huanzhexinxi, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据病历号查询符合条件的患者信息对象";
    try {
      huanzhexinxi = this.huanzhexinxiService
        .getHuanzhexinxiByBLH(huanzhexinxi.getBinglihao());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(huanzhexinxi);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getHuanzhexinxiByBLHToHis.htm"}, method = {RequestMethod.POST})
  public void getHuanzhexinxiByBLHToHis(String binglihao, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据病历号去his数据库查询符合条件的患者信息对象,保存到 本地数据库";
    Patient patient = null;
    try {
      patient = this.hisWebService.getPatientById(binglihao);
      if (patient != null) {
        HuanZheXinXi huanZheXinXi = syncronizePatientHisToLocal(patient, gonghao);
        this.huanzhexinxiService.saveHuanZhe(huanZheXinXi);
        result.setObj(huanZheXinXi);
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
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public HuanZheXinXi syncronizePatientHisToLocal(Patient patient, String gonghao) {
    String patientId = (patient.getPatientId() == null) ? "" : 
      patient.getPatientId().trim();
    String name = (patient.getName() == null) ? "" : 
      patient.getName().trim();
    String sex = (patient.getSex() == null) ? "" : 
      patient.getSex().trim();
    String idno = (patient.getPid() == null) ? "" : patient.getPid().toString();
    Date birthday = patient.getBirthday();
    String mobile = (patient.getMobile() == null) ? "" : patient.getMobile().toString();
    String tel = (patient.getTel() == null) ? "" : patient.getTel().toString();
    String address = (patient.getAddress() == null) ? "" : 
      patient.getAddress().trim();
    String shouji = "";
    if (mobile.length() > 0 && mobile.equals(tel)) {
      shouji = mobile;
    } else {
      shouji = String.valueOf(mobile) + "," + tel;
    } 
    HuanZheXinXi huanzhexinxi = new HuanZheXinXi();
    huanzhexinxi.setBinglihao(patientId);
    huanzhexinxi.setXingming(name);
    if ("男".equals(sex)) {
      huanzhexinxi.setXingbie(true);
    } else {
      huanzhexinxi.setXingbie(false);
    } 
    huanzhexinxi.setSfzh(idno);
    huanzhexinxi.setShengri(birthday);
    huanzhexinxi.setShouji(shouji);
    huanzhexinxi.setDiqu(address);
    huanzhexinxi.setJtdz(address);
    huanzhexinxi.setJilvren(gonghao);
    huanzhexinxi.setLaiyuan(Integer.valueOf(1006));
    huanzhexinxi.setZcrq(new Date());
    huanzhexinxi.setBeizhu("数据同步");
    return huanzhexinxi;
  }
  
  @RequestMapping(value = {"/updateHuanzhexinxi.htm"}, method = {RequestMethod.POST})
  public void updateHuanzhexinxi(HuanZheXinXi hzxx, String gonghao, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "更新手机号码";
    HuanZheXinXi hz = null;
    try {
      hz = this.huanzhexinxiService.findHuanZheById(hzxx.getId());
      hz.setShouji(hzxx.getShouji());
      this.huanzhexinxiService.updateHuanZheXingXi(hz);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(hz);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateHzxx_zfz.htm"}, method = {RequestMethod.POST})
  public void updateHzxx_zfz(HuanZheXinXi hzxx, String gonghao, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "更新手机号码";
    HuanZheXinXi hz = null;
    try {
      hz = this.huanzhexinxiService.findHuanZheById(hzxx.getId());
      hz.setJtdz(hzxx.getJtdz());
      hz.setJob(hzxx.getJob());
      hz.setQq(hzxx.getQq());
      hz.setShouji(hzxx.getShouji());
      this.huanzhexinxiService.updateHuanZheXingXi(hz);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(hz);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateHzxx_er.htm"}, method = {RequestMethod.POST})
  public void updateHzxx_er(HuanZheXinXi hzxx, String gonghao, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "更新手机号码";
    HuanZheXinXi hz = null;
    try {
      hz = this.huanzhexinxiService.findHuanZheById(hzxx.getId());
      hz.setJtdz(hzxx.getJtdz());
      hz.setShouji(hzxx.getShouji());
      this.huanzhexinxiService.updateHuanZheXingXi(hz);
      result.setState(this.doState);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setObj(hz);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getHuanzhexinxiByBLHForHistoryBaogao.htm"}, method = {RequestMethod.POST})
  public void getHuanzhexinxiByBLHForHistoryBaogao(String binglihao, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据病历号查询符合条件的患者信息对象";
    try {
      Map<String, Object> list = this.huanzhexinxiService.getHuanZheXinXiMapByBLH(binglihao);
      result.setObj(list);
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
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateHzxxDiqu.htm"}, method = {RequestMethod.POST})
  public void updateHzxx_er(Long patientId, int diquId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    this.doing = "更新患者地区ID";
    HuanZheXinXi hz = null;
    try {
      hz = this.huanzhexinxiService.findHuanZheById(patientId);
      hz.setDiquId(Integer.valueOf(diquId));
      this.huanzhexinxiService.updateHuanZheXingXi(hz);
      result.setDoing(this.doing);
      result.setState(this.doState);
      result.setObj(hz);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
