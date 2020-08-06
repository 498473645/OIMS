package cn.com.oims.service.impl;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.common.SyncObject;
import cn.com.oims.common.Utils;
import cn.com.oims.dao.IBanGongShiDao;
import cn.com.oims.dao.IBaogaoDao;
import cn.com.oims.dao.IBaogaoPicDao;
import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.IDoctorsWorkstationDao;
import cn.com.oims.dao.IEMRChufangDao;
import cn.com.oims.dao.IEMRDao;
import cn.com.oims.dao.IEMROrderDao;
import cn.com.oims.dao.IFollowedUpDao;
import cn.com.oims.dao.IHandleProjectDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJcdDao;
import cn.com.oims.dao.IJcxmDao;
import cn.com.oims.dao.IJcxmPertainItemDao;
import cn.com.oims.dao.IJcxmToHisItemDao;
import cn.com.oims.dao.IJiBingDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.IOutpOrdersDao;
import cn.com.oims.dao.IOutpPrescDao;
import cn.com.oims.dao.IOutpTreatRecDao;
import cn.com.oims.dao.ISheBeiDao;
import cn.com.oims.dao.IShiLiDao;
import cn.com.oims.dao.IUserDao;
import cn.com.oims.dao.IYanYaDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.jdbc.IEyeDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.Baogao;
import cn.com.oims.dao.pojo.BaogaoPic;
import cn.com.oims.dao.pojo.BingLiPrint;
import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.DrugStock;
import cn.com.oims.dao.pojo.EMRChufangQindan;
import cn.com.oims.dao.pojo.EMRInHospitalCard;
import cn.com.oims.dao.pojo.EMROrder;
import cn.com.oims.dao.pojo.ExamCheck;
import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.FollowedUp;
import cn.com.oims.dao.pojo.HandleProject;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.InquiryComboTreeNode;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.JcxmPertainItem;
import cn.com.oims.dao.pojo.JcxmToHisItem;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.JzZhenduan;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.OutpOrders;
import cn.com.oims.dao.pojo.OutpPresc;
import cn.com.oims.dao.pojo.OutpTreatRec;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.Suifang;
import cn.com.oims.dao.pojo.TemplateVariable;
import cn.com.oims.dao.pojo.TestCheck;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.dao.pojo.YaoPinType;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IDoctorsWorkstationService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.utils.DateUtils;
import cn.com.oims.utils.JsonUtil;
import cn.com.oims.web.form.Disgnosis;
import cn.com.oims.web.form.JCTSPaintForm;
import cn.com.oims.web.form.PaintForm;
import cn.com.oims.web.server.HisService;
import cn.com.oims.webservice.ExamWebService;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.LisWebService;
import cn.com.oims.webservice.MedicineWebService;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.ResponseObj;
import cn.com.oims.webservice.pojo.exam.ExamItem;
import cn.com.oims.webservice.pojo.his.PriceItem;
import cn.com.oims.webservice.pojo.lis.Sample;
import cn.com.oims.webservice.pojo.lis.TestItem;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;
import javax.annotation.Resource;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DoctorsWorkstationService implements IDoctorsWorkstationService {
  @Autowired
  private IUserDao userDao;
  
  @Autowired
  private IYuanGongDao yuanGongDao;
  
  @Autowired
  private IDoctorsWorkstationDao doctorsWorkstationDao;
  
  @Autowired
  private IHuanZheXinXiDao patientDao;
  
  @Autowired
  private IShiLiDao visionDao;
  
  @Autowired
  private IJzjlDao jzjlDao;
  
  @Autowired
  private IJcdDao jcdDao;
  
  @Autowired
  private IJiuzhenDao jiuzhenDao;
  
  @Autowired
  private ICategoryDao categoryDao;
  
  @Autowired
  private IBaogaoDao baogaoDao;
  
  @Autowired
  private IBaogaoPicDao baogaoPicDao;
  
  @Autowired
  private IJcxmPertainItemDao jcxmPertainItemDao;
  
  @Autowired
  private IJcxmToHisItemDao jcxmToHisItemDao;
  
  @Autowired
  private IOutpTreatRecDao outpTreatRecDao;
  
  @Autowired
  private ISheBeiDao sheBeiDao;
  
  @Autowired
  private IBanGongShiDao banGongShiDao;
  
  @Autowired
  private IJcxmDao jcxmDao;
  
  @Autowired
  private IYanYaDao iopDao;
  
  @Autowired
  private IOutpPrescDao outpPrescDao;
  
  @Autowired
  private IOutpOrdersDao outpOrdersDao;
  
  @Autowired
  private IHandleProjectDao handleProjectDao;
  
  @Autowired
  private IFollowedUpDao followedUpDao;
  
  @Autowired
  private IEyeDao eyeDao;
  
  @Autowired
  private IJcdService jcdService;
  
  @Autowired
  private HisService hisService;
  
  @Autowired
  private ExamWebService examWebService;
  
  @Autowired
  private LisWebService lisWebService;
  
  @Autowired
  private HisWebService hisWebService;
  
  @Autowired
  private MedicineWebService medicineWebService;
  
  @Autowired
  private IEMRDao iemrDao;
  
  @Autowired
  private IEMROrderDao iemrOrderDao;
  
  @Autowired
  private IEMRChufangDao chufangDao;
  
  @Autowired
  private IJiBingDao jiBingDao;
  
  private int RECORD = 30000;
  
  private int INQURIY = 30001;
  
  private int PHYSICAL = 30002;
  
  private final Integer[] NORMAL = new Integer[] { Integer.valueOf(82), Integer.valueOf(89) };
  
  private String language = "ISO-8859-1";
  
  private static SyncObject FZYS = null;
  
  @Resource
  public void setHisService(HisService hisService) {
    this.hisService = hisService;
  }
  
  @Override
  public List<ShuruMoban> getInputTemplet(String categoryId, User currentUser) {
    YuanGong employee = this.yuanGongDao.obtainYuanGongByGonghao(currentUser
        .getGonghao());
    List<ShuruMoban> list = this.doctorsWorkstationDao.getInputTemplet(
        categoryId, employee);
    list = (list == null) ? new ArrayList() : list;
    return list;
  }
  
  @Override
  @Transactional
  public boolean savePhysicalItemContent(String categoryId, String content, String visitId) {
    int result = this.doctorsWorkstationDao.savePhysicalItemContent(categoryId, 
        content, visitId);
    return (result > 0);
  }
  
  @Override
  @Transactional
  public Long saveOrUpdate_Inquiry(Jzjl jzjl) {
    return this.doctorsWorkstationDao.saveOrUpdate_Inquiry(jzjl);
  }
  
  @Override
  public List<ShuruMoban> findTemplate(int category_id, String value) {
    List<ShuruMoban> list = this.doctorsWorkstationDao.findTemplateNoVariable(
        category_id, value);
    return list;
  }
  
  @Override
  public List<TemplateVariable> findTemplateVariable(Long id) {
    return this.doctorsWorkstationDao.findTemplateVariable(id);
  }
  
  @Override
  public int getNumberByVisitState(String state, String jobNum) {
    return this.doctorsWorkstationDao.getNumberByVisitState(state, jobNum);
  }
  
  @Override
  @Transactional
  public JSONObject getDiagnosisPatientInfo(String jobNum, String currentVisitID, String state) {
    Integer serial_no = Integer.valueOf(0);
    if (!currentVisitID.equals("0")) {
      serial_no = this.jiuzhenDao.findJiuzhenById(
          Long.valueOf(Long.parseLong(currentVisitID))).getSerialNo();
    }
    Jiuzhen visit = this.doctorsWorkstationDao.getDiagnosisPatientVisitInfo(
        jobNum, currentVisitID, state, serial_no);
    if (visit != null) {
      visit.setFzys(jobNum);
      this.jiuzhenDao.updateJiuzhen(visit);
      SimpleDateFormat formater = new SimpleDateFormat(
          "yyyy-MM-dd HH:mm:ss");
      HuanZheXinXi patient = this.patientDao.findHuanZheById(visit
          .getHuanzheId());
      ShiLi vision = this.doctorsWorkstationDao.getVisionByVisitId(visit
          .getId().toString());
      YanYa iop = this.doctorsWorkstationDao.getIopByVisitId(visit.getId()
          .toString());
      YuanGong employee = this.yuanGongDao.obtainYuanGongByGonghao(jobNum);
      String endTime = formater.format(visit.getCaozuoTime());
      List<Jiuzhen> history = this.doctorsWorkstationDao.getRecordsOfHistory(
          patient.getId().toString(), endTime, visit.getId(), jobNum);
      JSONArray visitArr = new JSONArray();
      JSONObject visitObj = new JSONObject();
      visitObj.put("id", visit.getId());
      visitObj.put("doctorName", employee.getXingming());
      visitObj.put("state", visit.getState());
      visitObj.put("zhenbie", visit.getZhenbie());
      visitObj.put("date", formater.format(visit.getCaozuoTime()));
      List<Jzjl> records = this.jzjlDao.findJzjlByJiuzhenid(visit.getId().longValue());
      visitObj.put("records", (records == null) ? "[]" : records);
      visitObj.put("serialNo", visit.getSerialNo());
      visitArr.add(visitObj);
      if (history != null) {
        for (Jiuzhen historyRecord : history) {
          JSONObject historyRecordObj = new JSONObject();
          YuanGong employeeHistory = this.yuanGongDao
            .obtainYuanGongByGonghao(jobNum);
          historyRecordObj.put("id", historyRecord.getId());
          historyRecordObj.put("doctorName",
              employeeHistory.getXingming());
          historyRecordObj.put("state", historyRecord.getState());
          historyRecordObj.put("date",
              formater.format(historyRecord.getCaozuoTime()));
          visitArr.add(historyRecordObj);
        }
      }
      JSONObject patientObj = JSONObject.fromObject(patient, 
          JsonUtil.toJsonDateForamt("yyyy-MM-dd"));
      patientObj.put("visit", visitArr);
      if (vision != null) {
        patientObj.put("vision", vision);
      }
      if (iop != null) {
        patientObj.put("iop", iop);
      }
      return patientObj;
    } 
    return null;
  }
  
  private void createNormalInspects(Long patientId, Long visitId, Integer departId, String doctor) {
    for (int i = 0; i < this.NORMAL.length; i++) {
      List<Jcd> list = this.jcdDao.getJcdByHzidAndJiuzhenIdAndJcxmId(
          patientId, visitId, this.NORMAL[i]);
      if (list.size() <= 0) {
        Jcxm jcxm = this.jcxmDao.findJcxmById(this.NORMAL[i]);
        Jcd order = new Jcd();
        order.setJcdh("");
        order.setHuanzheId(patientId);
        order.setJiuzhenId(visitId);
        order.setBiaoti(jcxm.getXmmc());
        order.setJcsbId(Integer.valueOf(0));
        order.setJcxmIds(jcxm.getId().toString());
        order.setKdksId(departId);
        order.setKdys(doctor);
        order.setKdTime(new Date());
        order.setJfbs(true);
        order.setYanbie(Integer.valueOf(48));
        order.setBiaoshi(Integer.valueOf(50));
        this.jcdDao.saveJcd(order);
        order.setJcdh(order.getId().toString());
        this.jcdDao.updateJcd(order);
      } 
    } 
  }
  
  @Override
  @Transactional
  public JSONArray saveInspcetOrder(JSONObject inspectObj) {
    YuanGong employee = this.yuanGongDao.obtainYuanGongByGonghao(inspectObj
        .getString("kdys"));
    JSONArray inspects = inspectObj.getJSONArray("inspects");
    JSONArray resultArr = new JSONArray();
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(Long.valueOf(inspectObj
          .getLong("visitId")));
    int index = 1;
    for (int i = 0; i < inspects.size(); i++) {
      JSONObject inspect = inspects.getJSONObject(i);
      Jcd jcd = new Jcd();
      jcd.setHuanzheId(Long.valueOf(inspectObj.getLong("patientId")));
      jcd.setJiuzhenId(Long.valueOf(inspectObj.getLong("visitId")));
      jcd.setBiaoti(inspect.getString("name"));
      jcd.setJcsbId(Integer.valueOf(0));
      jcd.setJcxmIds(inspect.getString("id"));
      jcd.setKdksId(employee.getBumenId());
      jcd.setKdys(inspectObj.getString("kdys"));
      jcd.setKdTime(new Date());
      jcd.setJfbs(true);
      jcd.setYanbie(Integer.valueOf(inspect.getInt("eyesortId")));
      jcd.setBiaoshi(Integer.valueOf(50));
      jcd.setLeftPic(inspect.getString("paintLeft"));
      jcd.setRightPic(inspect.getString("paintRight"));
      jcd.setJcyq(inspect.getString("tips"));
      this.jcdService.saveOrUpdateJcd(jcd);
      JSONObject resultObj = new JSONObject();
      resultObj.put("order", jcd.getId());
      resultObj.put("id", jcd.getJcxmIds());
      resultArr.add(resultObj);
      JSONArray pertainArr = inspect.containsKey("pertain") ? inspect
        .getJSONArray("pertain") : new JSONArray();
      String eye = (inspect.getInt("eyesortId") == 48) ? "双眼" : "单眼";
      JcxmToHisItem jcxmToHisItem = this.jcxmToHisItemDao.getJcxmToHisItem(
          Integer.valueOf(inspect.getInt("id")), eye).get(0);
      Map<String, Object> map = getHisPriceInfo(
          jcxmToHisItem.getHis_item_code(), 
          jcxmToHisItem.getHis_item_spec(), 
          jcxmToHisItem.getHis_item_units());
      if (map != null) {
        saveOutpTreatRec(visit, map, index++, 
            jcxmToHisItem.getMultiple().doubleValue(), 1.0D, jcd.getId(), 
            OimsCategoryConfig.specialCategory, null);
        double count = (double)(inspect.getInt("eyesortId") == 48 ? 2 : 1);
        for (int j = 0; j < pertainArr.size(); j++) {
          JSONObject pertainItem = pertainArr.getJSONObject(j);
          map = getHisPriceInfo(pertainItem.getString("item_code"), 
              null, null);
          saveOutpTreatRec(visit, map, index++, count, 
              pertainItem.getDouble("quantity"), jcd.getId(), 
              OimsCategoryConfig.specialCategory, null);
        } 
      } 
    } 
    visit.setState(Integer.valueOf(28));
    this.jiuzhenDao.updateJiuzhen(visit);
    return resultArr;
  }
  
  private OutpTreatRec saveOutpTreatRec(Jiuzhen visit, Map<String, Object> map, int index, double quantity, double rate, Long item_group, Integer category_id, String administration) {
    OutpTreatRec outpTreatRec = new OutpTreatRec();
    outpTreatRec.setVisit_date(visit.getCaozuoTime());
    outpTreatRec.setVisit_no(visit.getHaoma());
    outpTreatRec.setSerial_no(visit.getId().toString());
    outpTreatRec.setItem_no(Integer.valueOf(index));
    String item_class = (map.get("ITEM_CLASS") == null) ? null : map.get(
        "ITEM_CLASS").toString();
    String item_code = (map.get("ITEM_CODE") == null) ? null : map.get(
        "ITEM_CODE").toString();
    String item_name = (map.get("ITEM_NAME") == null) ? null : map.get(
        "ITEM_NAME").toString();
    String item_spec = (map.get("ITEM_SPEC") == null) ? null : map.get(
        "ITEM_SPEC").toString();
    String units = (map.get("UNITS") == null) ? null : map.get("UNITS")
      .toString();
    outpTreatRec.setItem_class(item_class);
    outpTreatRec.setItem_code(item_code);
    outpTreatRec.setItem_name(item_name);
    outpTreatRec.setItem_spec(item_spec);
    outpTreatRec.setUnits(units);
    double price = Double.parseDouble(map.get("PRICE").toString());
    outpTreatRec.setCosts(Double.valueOf(quantity * rate * price));
    outpTreatRec.setCharges(Double.valueOf(quantity * rate * price));
    outpTreatRec.setQuantity(Double.valueOf(quantity * rate));
    outpTreatRec.setItem_group(item_group);
    outpTreatRec.setPerformed_by(String.valueOf(visit.getJzks()));
    outpTreatRec.setAdministration(administration);
    outpTreatRec.setCategory_id(category_id);
    outpTreatRec.setDoctor(visit.getFzys());
    this.outpTreatRecDao.save(outpTreatRec);
    return outpTreatRec;
  }
  
  private String getGBKStr(String str) {
    try {
      if (str == null) {
        return str;
      }
      return new String(str.getBytes("iso-8859-1"), "GBK");
    } catch (Exception e) {
      return str;
    } 
  }
  
  private String getLatinStr(String str) {
    try {
      if (str == null) {
        return str;
      }
      return new String(str.getBytes("GBK"), "iso-8859-1");
    } catch (Exception e) {
      return str;
    } 
  }
  
  private Map<String, Object> getHisPriceInfo(String item_code, String item_spec, String units) {
    StringBuilder sql = new StringBuilder();
    sql.append("select * from price_list where 1=1 ");
    sql.append("and item_code='").append(getLatinStr(item_code))
      .append("' ");
    if (item_spec != null && !"".equals(item_spec)) {
      sql.append("and item_spec='").append(getLatinStr(item_spec))
        .append("' ");
    }
    if (units != null && !"".equals(units)) {
      sql.append("and units='").append(getLatinStr(units)).append("' ");
    }
    sql.append("and stop_date is null ");
    List<Map<String, Object>> list = this.hisService.slectList(sql.toString());
    listEncodingChange(list);
    return list.get(0);
  }
  
  @Override
  @Transactional
  public String savePaint(PaintForm paintForm, HttpServletRequest request) throws Exception {
    String realPath = request.getSession().getServletContext()
      .getRealPath("");
    ArrayList<String> list = getPhotoPath(paintForm, realPath);
    boolean result = savePaintFile(request, list.get(1));
    if (result) {
      List<Jzjl> recordList = this.jzjlDao
        .findJzjlListByCategoryIdAndJiuzhenId(
          Integer.valueOf(paintForm.getCategoryId()), paintForm.getRegId());
      String photoShow = "见图示";
      if (recordList.size() > 0) {
        Jzjl record = recordList.get(0);
        if (record.getJilu().indexOf(photoShow) == -1) {
          record.setJilu(String.valueOf(record.getJilu()) + "&nbsp;" + photoShow);
        }
        record.setPicPath(list.get(0));
        this.jzjlDao.updateJzjl(record);
      } else {
        Jzjl j = new Jzjl();
        j.setCategoryId(Integer.valueOf(paintForm.getCategoryId()));
        j.setPicPath(list.get(0));
        j.setJilu(photoShow);
        j.setJiuzhenId(paintForm.getRegId());
        j.setJlren(paintForm.getWorkNo());
        j.setJlTime(new Date());
        this.jzjlDao.saveJzjl(j);
      } 
      return list.get(0);
    } 
    return null;
  }
  
  private ArrayList<String> getPhotoPath(PaintForm paintForm, String realPath) {
    ArrayList<String> pathList = new ArrayList<String>();
    String vPath = "UploadFile";
    StringBuilder filePath = new StringBuilder();
    StringBuilder path = new StringBuilder();
    filePath.append(realPath).append(File.separator).append(vPath)
      .append(File.separator);
    filePath.append(paintForm.getPatientId()).append(File.separator);
    filePath.append(paintForm.getRegId()).append(File.separator);
    path.append(File.separator).append(vPath).append(File.separator)
      .append(paintForm.getPatientId());
    path.append(File.separator).append(paintForm.getRegId())
      .append(File.separator);
    String suffix = ".png";
    filePath.append("m_r_photos").append(File.separator);
    filePath.append(paintForm.getCategoryId()).append("_");
    filePath.append(paintForm.getEyes()).append(suffix);
    path.append("m_r_photos").append(File.separator);
    path.append(paintForm.getCategoryId()).append("_");
    path.append(paintForm.getEyes()).append(suffix);
    pathList.add(path.toString().replace("\\", "/"));
    pathList.add(filePath.toString());
    return pathList;
  }
  
  private boolean savePaintFile(HttpServletRequest request, String filePath) {
    File file = null;
    try {
      ServletInputStream servletInputStream = request.getInputStream();
      FileOutputStream fos = null;
      file = new File(filePath.substring(0, 
            filePath.lastIndexOf(File.separator)));
      if (servletInputStream != null) {
        if (!file.isFile()) {
          file.mkdirs();
        }
        fos = new FileOutputStream(filePath);
        byte[] buff = new byte[1024];
        int size;
        while ((size = servletInputStream.read(buff)) != -1) {
          fos.write(buff, 0, size);
        }
        fos.flush();
        fos.close();
        servletInputStream.close();
        return true;
      } 
      if (file.exists()) {
        file.delete();
      }
    } catch (Exception e) {
      if (file != null && file.exists()) {
        file.delete();
      }
    } 
    return false;
  }
  
  @Override
  public HashMap<String, Object> getPrintData(String visitId) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(Long.valueOf(visitId));
    Map<String, Object> inspectList = getInspects(visitId);
    List<Map<String, Object>> zhenDuanList = this.jiuzhenDao
      .getZhenDuanList(visitId);
    List<Jzjl> jzjlList = this.jzjlDao
      .findJzjlByJiuzhenid(Long.valueOf(visitId).longValue());
    HashMap<String, Object> result = new HashMap<String, Object>();
    List<Map<String, Object>> visionList = this.jiuzhenDao.getShiLiUrl(visitId);
    List<EMRChufangQindan> prescription = this.chufangDao.findChufangQindan(Long.valueOf(Long.parseLong(visitId)));
    List<Map<String, Object>> cflist = new ArrayList<Map<String, Object>>();
    StringBuffer sb = new StringBuffer("");
    for (int i = 0; i < prescription.size(); i++) {
      EMRChufangQindan ecfq = prescription.get(i);
      DrugStock dd = this.chufangDao.getDrugStockById(ecfq.getYaopinId());
      sb.append(String.valueOf(ecfq.getYaoming()) + " " + dd.getSpec() + " " + 
          ecfq.getYongfa() + " " + ecfq.getYongyaopinlv() + " " + 
          ecfq.getYongliang() + dd.getDosageUnit());
      if (i != prescription.size() - 1) {
        sb.append(";");
      }
      Map<String, Object> cf = new HashMap<String, Object>();
      cf.put("yaoming", ecfq.getYaoming());
      cf.put("packageSpec", dd.getPackageSpec());
      cf.put("packageUnits", dd.getPackageUnits());
      cf.put("shuliang", ecfq.getShuliang());
      cf.put("yongfa", ecfq.getYongfa());
      cf.put("yongliang", ecfq.getYongliang());
      cf.put("yongyaopinlv", ecfq.getYongyaopinlv());
      cf.put("jiage", ecfq.getJiage());
      cflist.add(cf);
    } 
    JSONObject visionObj = new JSONObject();
    if (visionList.size() > 0) {
      Map<String, Object> visionMap = visionList.get(0);
      visionObj.put("lr", visionMap.get("l_r"));
      visionObj.put("ll", visionMap.get("l_l"));
      visionObj.put("jzr", visionMap.get("jz_r"));
      visionObj.put("jzl", visionMap.get("jz_l"));
      visionObj.put("jr", visionMap.get("j_r"));
      visionObj.put("jl", visionMap.get("j_l"));
      visionObj.put("ledtrs", visionMap.get("ledtrs"));
      visionObj.put("redtrs", visionMap.get("redtrs"));
      result.put("vision", visionObj);
    } 
    List<Map<String, Object>> iopList = this.jiuzhenDao.getYanYaUrl(visitId);
    JSONObject iopObj = new JSONObject();
    if (iopList.size() > 0) {
      Map<String, Object> iopMap = iopList.get(0);
      iopObj.put("od", iopMap.get("right"));
      iopObj.put("os", iopMap.get("left"));
      iopObj.put("beizhu", iopMap.get("beizhu"));
      iopObj.put("methodOD", iopMap.get("methodOD"));
      iopObj.put("methodOS", iopMap.get("methodOS"));
      iopObj.put("refuse", iopMap.get("refuse"));
      result.put("iop", iopObj);
    } 
    Suifang sf = this.iemrDao.getSuifang(Long.valueOf(Long.parseLong(visitId)));
    result.put("inspect", inspectList);
    result.put("diagnosis", zhenDuanList);
    result.put("records", jzjlList);
    result.put("prescription", sb.toString());
    result.put("sf", sf);
    result.put("cflist", cflist);
    result.put("specialTreat", visit.getTreatMethod());
    return result;
  }
  
  private Map<String, Object> getInspects(String visitId) {
    Map<String, Object> map = new HashMap<String, Object>();
    StringBuffer sb = new StringBuffer("");
    List<EMROrder> specialList = this.iemrOrderDao.findOrders(
        Long.valueOf(Long.parseLong(visitId)), Integer.valueOf(13), 
        null);
    List<Map<String, Object>> l = new ArrayList<Map<String, Object>>();
    for (int i = 0; i < specialList.size(); i++) {
      Map<String, Object> specialMap = new HashMap<String, Object>();
      if (this.jcdDao.findJcdById(((EMROrder)specialList.get(i)).getJcdId()) != null) {
        specialMap.put("inspectId", ((EMROrder)specialList.get(i)).getJcdId());
        specialMap.put("inspectName", ((EMROrder)specialList.get(i)).getItemName());
        specialMap.put("biaoshi", 
            this.jcdDao.findJcdById(((EMROrder)specialList.get(i)).getJcdId())
            .getBiaoshi());
        l.add(specialMap);
      } 
    } 
    map.put("special", l);
    List<EMROrder> hospitalList = this.iemrOrderDao.findOrders(
        Long.valueOf(Long.parseLong(visitId)), 
        Integer.valueOf(14), null);
    for (int j = 0; j < hospitalList.size(); j++) {
      sb.append(((EMROrder)hospitalList.get(j)).getItemName());
      if (j != hospitalList.size() - 1) {
        sb.append(";");
      }
    } 
    List<Map<String, Object>> hospital_map = new ArrayList<Map<String, Object>>();
    for (int k = 0; k < hospitalList.size(); k++) {
      Map<String, Object> h_map = new HashMap<String, Object>();
      h_map.put("orderNo", ((EMROrder)hospitalList.get(k)).getOrderNo());
      h_map.put("itemName", ((EMROrder)hospitalList.get(k)).getItemName());
      h_map.put("biaoshi", ((EMROrder)hospitalList.get(k)).getJifeiFlag());
      hospital_map.add(h_map);
    } 
    map.put("hospital", sb.toString());
    map.put("h_map", hospital_map);
    sb.setLength(0);
    List<EMROrder> lisList = this.iemrOrderDao.findOrders(
        Long.valueOf(Long.parseLong(visitId)), 
        Integer.valueOf(15), null);
    for (int m = 0; m < lisList.size(); m++) {
      sb.append(((EMROrder)lisList.get(m)).getItemName());
      if (m != lisList.size() - 1) {
        sb.append(";");
      }
    } 
    List<Map<String, Object>> lis_map = new ArrayList<Map<String, Object>>();
    for (int n = 0; n < lisList.size(); n++) {
      Map<String, Object> l_map = new HashMap<String, Object>();
      l_map.put("orderNo", ((EMROrder)lisList.get(n)).getOrderNo());
      l_map.put("itemName", ((EMROrder)lisList.get(n)).getItemName());
      l_map.put("biaoshi", ((EMROrder)lisList.get(n)).getJifeiFlag());
      lis_map.add(l_map);
    } 
    map.put("lis", sb.toString());
    map.put("l_map", lis_map);
    sb.setLength(0);
    List<EMROrder> treatList = this.iemrOrderDao.findOrders(
        Long.valueOf(Long.parseLong(visitId)), 
        Integer.valueOf(5), null);
    for (int i1 = 0; i1 < treatList.size(); i1++) {
      sb.append(String.valueOf((((EMROrder)treatList.get(i1)).getPart() == OimsCategoryConfig.LEFT_EYE) ? "左眼" : ((((EMROrder)treatList.get(i1)).getPart() == OimsCategoryConfig.RIGHT_EYE) ? "右眼" : "双眼")) + ((EMROrder)treatList.get(i1)).getItemName());
      if (i1 != treatList.size() - 1) {
        sb.append(";");
      }
    } 
    map.put("treat", sb.toString());
    sb.setLength(0);
    return map;
  }
  
  @Override
  public JSONArray getCompareData(String visitIds) {
    String[] visitIdArr = visitIds.split(",");
    JSONArray result = createItems();
    for (int i = 0; i < visitIdArr.length; i++) {
      String visitId = visitIdArr[i];
      List<Jzjl> jzjlList = this.jzjlDao.findJzjlByJiuzhenid(
          Long.valueOf(visitId).longValue());
      JSONArray items = result.getJSONObject(0).getJSONArray("items");
      int j;
      for (j = 0; j < items.size(); j++) {
        JSONArray onceResult = new JSONArray();
        JSONObject item = items.getJSONObject(j);
        for (Jzjl jzjl : jzjlList) {
          if (jzjl.getCategoryId().intValue() == item
            .getInt("categoryid")) {
            onceResult.add(jzjl.getJilu());
            break;
          } 
        } 
        item.getJSONArray("values").add(onceResult);
      } 
      items = result.getJSONObject(1).getJSONArray("items");
      for (j = 0; j < items.size(); j++) {
        JSONObject item = items.getJSONObject(j);
        JSONArray cItems = item.getJSONArray("items");
        for (int k = 0; k < cItems.size(); k++) {
          JSONArray onceResult = new JSONArray();
          JSONObject cItem = cItems.getJSONObject(k);
          for (Jzjl jzjl : jzjlList) {
            if (jzjl.getCategoryId().intValue() == cItem
              .getInt("categoryid")) {
              onceResult.add(jzjl.getJilu());
              if (jzjl.getPicPath() != null && 
                !"".equals(jzjl.getPicPath().trim())) {
                onceResult.add(jzjl.getPicPath());
              }
              break;
            } 
          } 
          cItem.getJSONArray("values").add(onceResult);
        } 
      } 
      List<Map<String, Object>> zhenDuanList = this.jiuzhenDao
        .getZhenDuanList(visitId);
      items = result.getJSONObject(2).getJSONArray("items");
      JSONObject diagnoseObj = (items.size() > 0) ? items.getJSONObject(0) : 
        new JSONObject();
      if (items.size() == 0) {
        diagnoseObj.put("category", "诊断");
        diagnoseObj.put("values", "[]");
        items.add(diagnoseObj);
      } 
      JSONArray diagnoseArr = new JSONArray();
      for (Map<String, Object> map : zhenDuanList) {
        JSONArray jSONArray = new JSONArray();
        jSONArray.add(map.get("zdflname"));
        diagnoseArr.add(jSONArray);
      } 
      items.getJSONObject(0).getJSONArray("values").add(diagnoseArr);
      items = result.getJSONObject(3).getJSONArray("items");
      JSONObject prescriptionObj = (items.size() > 0) ? items
        .getJSONObject(0) : new JSONObject();
      if (items.size() == 0) {
        prescriptionObj.put("category", "处方");
        prescriptionObj.put("values", "[]");
        items.add(prescriptionObj);
      } 
      JSONArray prescriptionArr = new JSONArray();
      for (Map<String, Object> map : zhenDuanList) {
        JSONArray jSONArray = new JSONArray();
        jSONArray.add(map.get("zdflname"));
        prescriptionArr.add(jSONArray);
      } 
      items.getJSONObject(0).getJSONArray("values").add(prescriptionArr);
      JSONObject visionObj = result.getJSONObject(7);
      List<Map<String, Object>> visionList = this.jiuzhenDao
        .getShiLiUrl(visitId);
      JSONArray array = new JSONArray();
      for (Map<String, Object> map : visionList) {
        array.add(map.get("l_r"));
        array.add(map.get("l_l"));
        array.add(map.get("jz_r"));
        array.add(map.get("jz_l"));
        array.add(map.get("j_r"));
        array.add(map.get("j_l"));
      } 
      visionObj.getJSONArray("values").add(array);
    } 
    return result;
  }
  
  private JSONArray createItems() {
    JSONArray result = new JSONArray();
    List<Map<String, Object>> recordCategory = this.categoryDao
      .findCategorysByFatherId(Integer.valueOf(this.RECORD));
    for (Map<String, Object> c : recordCategory) {
      JSONObject obj = new JSONObject();
      obj.put("categoryid", c.get("categoryid"));
      obj.put("category", c.get("category"));
      obj.put("items", "[]");
      List<Map<String, Object>> children = this.categoryDao
        .findCategorysByFatherId(Integer.valueOf(obj.getInt("categoryid")));
      for (Map<String, Object> child : children) {
        JSONObject cObj = new JSONObject();
        JSONArray items = obj.getJSONArray("items");
        cObj.put("categoryid", child.get("categoryid"));
        cObj.put("category", child.get("category"));
        List<Map<String, Object>> cChildren = this.categoryDao
          .findCategorysByFatherId(Integer.valueOf(cObj.getInt("categoryid")));
        if (cChildren.size() == 0) {
          cObj.put("values", "[]");
        } else {
          cObj.put("items", "[]");
          for (Map<String, Object> cChild : cChildren) {
            JSONObject cCObj = new JSONObject();
            cCObj.put("categoryid", cChild.get("categoryid"));
            cCObj.put("category", cChild.get("category"));
            cCObj.put("values", "[]");
            cObj.getJSONArray("items").add(cCObj);
          } 
        } 
        items.add(cObj);
      } 
      result.add(obj);
    } 
    JSONObject visionObj = new JSONObject();
    visionObj.put("category", "视力");
    visionObj.put("values", "[]");
    result.add(visionObj);
    JSONObject iopObj = new JSONObject();
    iopObj.put("category", "眼压");
    iopObj.put("values", "[]");
    result.add(iopObj);
    JSONObject optometryObj = new JSONObject();
    optometryObj.put("category", "验光");
    optometryObj.put("values", "[]");
    result.add(optometryObj);
    return result;
  }
  
  @Override
  public List<Map<String, Object>> getInspectsByCategory(String categoryId, String pinyin) {
    List<Map<String, Object>> list = this.doctorsWorkstationDao
      .getInspectsByCategory(categoryId, pinyin);
    StringBuilder codeBuilder = new StringBuilder();
    for (int i = 0; i < list.size(); i++) {
      Map<String, Object> map = list.get(i);
      if (i > 0) {
        codeBuilder.append(",");
      }
      codeBuilder.append(map.get("xmid"));
    } 
    if (codeBuilder.length() == 0) {
      return list;
    }
    List<JcxmToHisItem> hisItemList = this.jcxmToHisItemDao
      .getJcxmToHisItem(codeBuilder.toString());
    if (hisItemList.size() == 0) {
      return list;
    }
    StringBuilder hisCodeBuilder = new StringBuilder();
    for (int j = 0; j < hisItemList.size(); j++) {
      if (j > 0) {
        hisCodeBuilder.append(",");
      }
      hisCodeBuilder.append("'")
        .append(((JcxmToHisItem)hisItemList.get(j)).getHis_item_code()).append("'");
    } 
    StringBuilder sql = new StringBuilder();
    sql.append("select item_code,item_spec,units,price from price_list where 1=1 ");
    sql.append("and item_code in( ").append(hisCodeBuilder.toString())
      .append(") ");
    sql.append("and stop_date is null");
    List<Map<String, Object>> priceList = null;
    try {
      priceList = this.hisService.slectList(sql.toString());
    } catch (Exception e) {
      System.err.println(getClass() + "\t630行：无法获取HIS项目信息");
      return list;
    } 
    for (int k = 0; k < list.size(); k++) {
      Map<String, Object> map = list.get(k);
      String xmid = map.get("xmid").toString();
      int index = 1;
      for (int m = 0; m < hisItemList.size(); m++) {
        JcxmToHisItem hisItem = hisItemList.get(m);
        if (xmid.equals(hisItem.getJcxm_id().toString())) {
          String hisCode = hisItem.getHis_item_code();
          String hisSpec = hisItem.getHis_item_spec();
          String hisUnits = hisItem.getHis_item_units();
          for (int n = 0; n < priceList.size(); n++) {
            Map<String, Object> priceMap = priceList.get(n);
            if (hisCode.equals(getGBKStr(priceMap.get("ITEM_CODE")
                  .toString()))) {
              if (hisSpec.equals(getGBKStr(priceMap.get(
                      "ITEM_SPEC").toString()))) {
                if (hisUnits.equals(getGBKStr(priceMap.get(
                        "UNITS").toString()))) {
                  double price = Double.parseDouble(priceMap.get(
                          "PRICE").toString());
                  map.put("price" + index++,
                          Double.valueOf(price * hisItem.getMultiple().doubleValue()));
                  break;
                }
              }
            }
          } 
          hisItemList.remove(m--);
        } 
      } 
    } 
    return list;
  }
  
  @Override
  public List<Map<String, Object>> getJcxmPertainItemsByJcxmId(Integer jcxmId, Integer category_id) {
    List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
    List<JcxmPertainItem> list = this.jcxmPertainItemDao
      .getJcxmPertainItemsByJcxmId(jcxmId, category_id);
    StringBuilder hisCodeBuilder = new StringBuilder();
    for (int i = 0; i < list.size(); i++) {
      if (i > 0) {
        hisCodeBuilder.append(",");
      }
      hisCodeBuilder.append("'").append(((JcxmPertainItem)list.get(i)).getItem_code())
        .append("'");
    } 
    if (hisCodeBuilder.length() == 0) {
      return resultList;
    }
    StringBuilder sql = new StringBuilder();
    sql.append("select item_code,item_spec,units,price from price_list where 1=1 ");
    sql.append("and item_code in( ").append(hisCodeBuilder.toString())
      .append(") ");
    sql.append("and stop_date is null");
    List<Map<String, Object>> priceList = this.hisService.slectList(sql
        .toString());
    for (int j = 0; j < list.size(); j++) {
      JcxmPertainItem item = list.get(j);
      String item_code = item.getItem_code();
      Map<String, Object> resultMap = new HashMap<String, Object>();
      resultMap.put("item_name", item.getItem_name());
      resultMap.put("defaultSelected", Integer.valueOf(item.getDefaultSelected()));
      resultMap.put("required", Integer.valueOf(item.getRequired()));
      resultMap.put("item_code", item.getItem_code());
      resultMap.put("quantity", item.getQuantity());
      for (int k = 0; k < priceList.size(); k++) {
        Map<String, Object> priceMap = priceList.get(k);
        if (priceMap.get("ITEM_CODE").equals(item_code)) {
          double price = Double.parseDouble(priceMap.get("PRICE")
              .toString());
          resultMap.put("price", Double.valueOf(price * item.getQuantity().floatValue()));
          priceList.remove(k);
          break;
        } 
      } 
      resultList.add(resultMap);
    } 
    return resultList;
  }
  
  @Override
  public JSONObject getReportDataByInspectId(String inspectId) {
    JSONObject reportJson = new JSONObject();
    if (inspectId != null && !"".equals(inspectId)) {
      Baogao report = this.baogaoDao
        .findBaogaoByJcdId(Long.valueOf(inspectId));
      reportJson = JSONObject.fromObject(report, 
          JsonUtil.toJsonDateForamt("yyyy-MM-dd"));
      BaogaoPic reportPic = new BaogaoPic();
      reportPic.setReportId(report.getId());
      List<BaogaoPic> reportPicList = this.baogaoPicDao
        .selectBaogaoPicsByBaogaoPic(reportPic);
      reportJson.put("pic", reportPicList);
    } 
    return reportJson;
  }
  
  @Override
  @Transactional
  public void updateInspectPicPathAndTip(String id, String eyeSort, String picPath, String tip) {
    this.doctorsWorkstationDao.updateInspectPicPathAndTip(id, eyeSort, picPath, 
        tip);
  }
  
  @Override
  public List getOrderListByVisitId(String visitId) {
    List<Map<String, Object>> inspectList = this.doctorsWorkstationDao
      .getInspectListByVisitIdAndState(visitId, null, false, null);
    JSONArray resultArr = new JSONArray();
    if (inspectList.size() == 0) {
      return (List)resultArr;
    }
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(Long.valueOf(visitId));
    List<OutpTreatRec> applyOrderList = this.outpTreatRecDao.getOutpTreatRecs(
        visit.getCaozuoTime(), visit.getHaoma(), 
        OimsCategoryConfig.specialCategory);
    for (int i = 0; i < inspectList.size(); i++) {
      Map<String, Object> jcdMap = inspectList.get(i);
      String jcxmId = jcdMap.get("id").toString();
      String eye = jcdMap.get("eyeSort").equals("双眼") ? "双眼" : "单眼";
      JcxmToHisItem hisItem = this.jcxmToHisItemDao.getJcxmToHisItem(
          Integer.valueOf(jcxmId), eye).get(0);
      long item_group = 
        Long.parseLong(jcdMap.get("inspectId").toString());
      double price = 0.0D;
      String showText = jcdMap.get("inspectName").toString();
      for (int k = 0; k < applyOrderList.size(); k++) {
        OutpTreatRec order = applyOrderList.get(k);
        if (order.getItem_code().equals(hisItem.getHis_item_code()) && 
          order.getItem_group().longValue() == item_group) {
          price += order.getCosts().doubleValue();
          applyOrderList.remove(k);
          break;
        } 
      } 
      List<JcxmPertainItem> pertainList = this.jcxmPertainItemDao
        .getJcxmPertainItemsByJcxmId(Integer.valueOf(jcxmId), 
          OimsCategoryConfig.specialCategory);
      for (int j = 0; j < pertainList.size(); j++) {
        JcxmPertainItem pertain = pertainList.get(j);
        for (int m = 0; m < applyOrderList.size(); m++) {
          OutpTreatRec order = applyOrderList.get(m);
          if (order.getItem_code().equals(pertain.getItem_code()) && 
            order.getItem_group().longValue() == item_group) {
            price += order.getCosts().doubleValue();
            showText = String.valueOf(showText) + "+" + order.getItem_name();
            applyOrderList.remove(m);
            break;
          } 
        } 
      } 
      jcdMap.put("price", Double.valueOf(price));
      jcdMap.put("showText", showText);
    } 
    return inspectList;
  }
  
  @Override
  public List<YaoPinType> findPrescriptionList() {
    return this.doctorsWorkstationDao.findPrescriptionList();
  }
  
  @Override
  public Map<String, Object> findMedicines(String input, String rows, String page) {
    Map<String, Object> map = getMedical(input, Integer.parseInt(rows), 
        Integer.parseInt(page));
    return map;
  }
  
  @Override
  @Transactional
  public List<OutpPresc> savePrescription(String binglihao, String visitId, String prescrptionArr, String gonghao) {
    List<OutpPresc> outpprescs = new ArrayList<OutpPresc>();
    try {
      Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(Long.valueOf(Long.parseLong(visitId)));
      YuanGong yg = this.yuanGongDao.obtainYuanGongByGonghao(gonghao);
      String doctor = yg.getXingming();
      OutpOrders oo = new OutpOrders();
      Map<String, Object> prescMap = this.outpPrescDao.getPrescInfo(
          jz.getCaozuoTime(), jz.getHaoma());
      int prescNo = (prescMap.get("num") == null) ? 1 : (
        Integer.parseInt(prescMap.get("num").toString()) + 1);
      int itemNo = Integer.parseInt(prescMap.get("total").toString()) + 1;
      oo.setPatientId(binglihao);
      if (jz.getHaoma() != null && !"".equals(jz.getHaoma())) {
        oo.setVisitNo(jz.getHaoma());
      }
      oo.setVisitDate(jz.getCaozuoTime());
      oo.setSerialNo(jz.getId());
      oo.setOrderedBy(Integer.valueOf(jz.getJzks()));
      oo.setDoctor(doctor);
      Long id = this.doctorsWorkstationDao.saveOutpOrders(oo);
      JSONArray ja = JSONArray.fromObject(prescrptionArr);
      for (int i = 0; i < ja.size(); i++) {
        JSONObject jo = ja.getJSONObject(i);
        OutpPresc op = (OutpPresc)JSONObject.toBean(jo, 
            OutpPresc.class);
        op.setOutpOrdersId(id);
        op.setVisitDate(oo.getVisitDate());
        op.setVisitNo(oo.getVisitNo());
        op.setItemNo(Integer.valueOf(itemNo));
        op.setPrescNo(Integer.valueOf(prescNo));
        op.setDispensary("410701");
        Long outpPrescId = this.doctorsWorkstationDao.saveOutpPresc(op);
        op.setId(outpPrescId);
        outpprescs.add(op);
      } 
    } catch (NumberFormatException e) {
      e.printStackTrace();
    } 
    return outpprescs;
  }
  
  @Override
  @Transactional
  public void deleteMedicines(List<Long> list) {
    List<OutpPresc> lo = new ArrayList<OutpPresc>();
    lo = this.doctorsWorkstationDao.findMedicinesListByIds(list);
    this.doctorsWorkstationDao.deleteMedicines(lo);
  }
  
  @Override
  public List<OutpPresc> findSubmitMedicines(String jiuzhenId) {
    List<OutpPresc> list = new ArrayList<OutpPresc>();
    list = this.doctorsWorkstationDao.findSubmitMedicines(
        Long.valueOf(Long.parseLong(jiuzhenId)));
    return list;
  }
  
  @Override
  public JSONArray getUnpayApplyOrderList(String visitId, String orders) {
    List<Map<String, Object>> jcdList = this.doctorsWorkstationDao
      .getInspectListByVisitIdAndState(visitId, 
        Integer.valueOf(50), false, orders);
    return getOrderDetail(jcdList, visitId);
  }
  
  private JSONArray getOrderDetail(List<Map<String, Object>> jcdList, String visitId) {
    JSONArray resultArr = new JSONArray();
    if (jcdList.size() == 0) {
      return resultArr;
    }
    String[] properties = { "item_name", "units", "costs", 
        "quantity" };
    JsonConfig config = JsonUtil.resolveProperty(properties);
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(Long.valueOf(visitId));
    List<OutpTreatRec> applyOrderList = this.outpTreatRecDao.getOutpTreatRecs(
        visit.getCaozuoTime(), visit.getHaoma(), 
        OimsCategoryConfig.specialCategory);
    for (int i = 0; i < jcdList.size(); i++) {
      Map<String, Object> jcdMap = jcdList.get(i);
      String jcxmId = jcdMap.get("id").toString();
      String officeId = this.sheBeiDao.getBgsIdByJcxmidAndBumenid(jcxmId, 105);
      JSONObject deptObj = new JSONObject();
      boolean exists = false;
      for (int j = 0; j < resultArr.size(); j++) {
        JSONObject deptObjTemp = resultArr.getJSONObject(j);
        if (deptObjTemp.get("dept").equals(officeId)) {
          deptObj = deptObjTemp;
          exists = true;
          break;
        } 
      } 
      if (!deptObj.containsKey("dept")) {
        deptObj.put("dept", officeId);
        if (officeId != null && !"".equals(officeId)) {
          BanGongShi office = this.banGongShiDao
            .findBanGongShiById(Integer.valueOf(officeId));
          deptObj.put("position", office.getWeizhi());
        } 
        deptObj.put("items", "[]");
      } 
      JSONArray items = deptObj.getJSONArray("items");
      JSONArray curJcdItems = new JSONArray();
      String eye = jcdMap.get("eyeSort").equals("双眼") ? "双眼" : "单眼";
      String position = (jcdMap.get("position") == null) ? "" : jcdMap.get(
          "position").toString();
      JcxmToHisItem hisItem = this.jcxmToHisItemDao.getJcxmToHisItem(
          Integer.valueOf(jcxmId), eye).get(0);
      Long item_group = null;
      for (int k = 0; k < applyOrderList.size(); k++) {
        OutpTreatRec order = applyOrderList.get(k);
        if (order.getItem_code().equals(hisItem.getHis_item_code())) {
          item_group = order.getItem_group();
          JSONObject orderObj = JSONObject.fromObject(order, config);
          orderObj.put("eye", jcdMap.get("eyeSort"));
          orderObj.put("position", position);
          curJcdItems.add(orderObj);
          applyOrderList.remove(k);
          break;
        } 
      } 
      List<JcxmPertainItem> pertainList = this.jcxmPertainItemDao
        .getJcxmPertainItemsByJcxmId(Integer.valueOf(jcxmId), 
          OimsCategoryConfig.specialCategory);
      for (int m = 0; m < pertainList.size(); m++) {
        JcxmPertainItem pertain = pertainList.get(m);
        for (int n = 0; n < applyOrderList.size(); n++) {
          OutpTreatRec order = applyOrderList.get(n);
          if (order.getItem_code().equals(pertain.getItem_code()) && 
            order.getItem_group().longValue() == item_group
            .longValue()) {
            JSONObject orderObj = JSONObject.fromObject(order, 
                config);
            curJcdItems.add(orderObj);
            applyOrderList.remove(n);
            break;
          } 
        } 
      } 
      items.add(curJcdItems);
      if (!exists) {
        resultArr.add(deptObj);
      }
    } 
    return resultArr;
  }
  
  @Override
  @Transactional
  public List saveDiagnosis(String diagnosis, String doctor) {
    JSONArray result = new JSONArray();
    List<JzZhenduan> zd_list = new ArrayList<JzZhenduan>();
    if (diagnosis != null && !"".equals(diagnosis)) {
      JSONArray diagnosisArr = JSONArray.fromObject(diagnosis);
      for (int i = 0; i < diagnosisArr.size(); i++) {
        JSONObject diagnosisObj = diagnosisArr.getJSONObject(i);
        JzZhenduan diagnose = new JzZhenduan();
        diagnose.setJiuzhen_id(Long.valueOf(diagnosisObj.getLong("visitId")));
        diagnose.setZdfl_id(Integer.valueOf(diagnosisObj.getInt("diseaseId")));
        diagnose.setConfirmed(Integer.valueOf(diagnosisObj.getInt("state")));
        diagnose.setZdys(doctor);
        diagnose.setZd_time(new Date());
        diagnose.setEye(diagnosisObj.getString("eye"));
        this.doctorsWorkstationDao.delete(diagnose);
        this.doctorsWorkstationDao.save(diagnose);
        zd_list.add(diagnose);
        result.add(diagnose);
      } 
    } 
    return (List)result;
  }
  
  @Transactional
  private void saveOrUpdateDiagnosisToEyeInfoOutpLClinic(List<JzZhenduan> diagnoses) {
    if (diagnoses == null || diagnoses.size() == 0) {
      return;
    }
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(((JzZhenduan)diagnoses.get(0))
        .getJiuzhen_id());
    YuanGong yg = this.yuanGongDao.obtainYuanGongByGonghao(visit.getFzys());
    HuanZheXinXi patient = this.patientDao.findHuanZheById(visit.getHuanzheId());
    SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
    EyeInfoOutpClinic eioc = null;
    try {
      eioc = this.eyeDao.getEyeInfoOutpClinic(patient.getBinglihao(), (
          new SimpleDateFormat("yyyy-MM-dd"))
          .parse((new SimpleDateFormat("yyyy-MM-dd"))
            .format(visit.getCaozuoTime())), 
          new String(yg.getXingming().getBytes(), this.language));
      if (eioc == null) {
        Boolean b = this.eyeDao.findPatientById(patient.getBinglihao());
        if (!b.booleanValue()) {
          this.eyeDao.addPatientToEyeDatabase(patient);
        }
        eioc = new EyeInfoOutpClinic();
        eioc.setFlow_no(String.valueOf(patient.getBinglihao()) + 
            format.format(visit.getCaozuoTime()));
        eioc.setCli_date((new SimpleDateFormat("yyyyMMddHHmmss"))
            .format(new Date()));
        eioc.setPatient_id(patient.getBinglihao());
        eioc.setDoc_name((yg.getXingming() == null) ? null : new String(
              yg.getXingming().getBytes(), this.language));
        eioc.setClinic_room("001");
        eioc.setPatient_age(Integer.valueOf(DateUtils.calculateAge(
                visit.getCaozuoTime(), patient.getShengri())));
        if (visit != null && visit.getHaoma() != null) {
          eioc.setVisit_no((visit.getHaoma().length() > 8) ? "0" :
              visit.getHaoma());
        }
        String s = "";
        for (int i = 0; i < diagnoses.size(); i++) {
          s = String.valueOf(s) + ((JzZhenduan)diagnoses.get(i)).getEye() + 
            this.jiBingDao.findJiBingById(((JzZhenduan)diagnoses.get(i))
              .getZdfl_id()).getDisease();
          if (i != diagnoses.size() - 1) {
            s = String.valueOf(s) + ";";
          }
        } 
        eioc.setFinal_diag(new String(s.getBytes(), this.language));
        this.eyeDao.saveEyeInfoOutpClinic(eioc);
      } else {
        eioc.setCli_date((new SimpleDateFormat("yyyyMMddHHmmss"))
            .format(new Date()));
        String s = "";
        for (int i = 0; i < diagnoses.size(); i++) {
          s = String.valueOf(s) + ((JzZhenduan)diagnoses.get(i)).getEye() + 
            this.jiBingDao.findJiBingById(((JzZhenduan)diagnoses.get(i))
              .getZdfl_id()).getDisease();
          if (i != diagnoses.size() - 1) {
            s = String.valueOf(s) + ";";
          }
        } 
        eioc.setFinal_diag(new String(s.getBytes(), this.language));
        this.eyeDao.updateEyeInfoOutpClinic(eioc);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  @Override
  @Transactional
  public void deleteDiagnosis(String diagnosis) {
    if (diagnosis != null && !"".equals(diagnosis)) {
      JSONArray diagnosisArr = JSONArray.fromObject(diagnosis);
      for (int i = 0; i < diagnosisArr.size(); i++) {
        JSONObject diagnosisObj = diagnosisArr.getJSONObject(i);
        JzZhenduan diagnose = new JzZhenduan();
        diagnose.setJiuzhen_id(Long.valueOf(diagnosisObj.getLong("visitId")));
        diagnose.setZdfl_id(Integer.valueOf(diagnosisObj.getInt("diseaseId")));
        this.doctorsWorkstationDao.delete(diagnose);
      } 
    } 
  }
  
  @Override
  public List<Map<String, Object>> findAdministrations() {
    return this.doctorsWorkstationDao.findAdministrations();
  }
  
  @Override
  public String saveOrUpdateVision(String vision, String doctor) {
    JsonConfig config = JsonUtil.ignoreProperty(new String[] { "jcsj" });
    JSONObject visionObj = JSONObject.fromObject(vision, config);
    ShiLi shili = (ShiLi)JSONObject.toBean(visionObj, ShiLi.class);
    shili.setJcys(doctor);
    shili.setJcsj(new Date());
    if (shili.getJcd_id() == null) {
      List<Map<String, Object>> list = this.doctorsWorkstationDao
        .getInspectListByVisitIdAndState(shili.getJiuzhen_id()
          .toString(), Integer.valueOf(50), 
          false, null);
      if (list.size() > 0) {
        shili.setJcd_id(Long.valueOf(((Map)list.get(0)).get("inspectId")
              .toString()));
      }
    } 
    this.doctorsWorkstationDao.saveOrUpdate(shili);
    return shili.getId().toString();
  }
  
  @Override
  public String saveOrUpdateIop(String iop, String doctor) {
    JsonConfig config = JsonUtil.ignoreProperty(new String[] { "ycsj" });
    JSONObject iopObj = JSONObject.fromObject(iop, config);
    YanYa yanya = (YanYa)JSONObject.toBean(iopObj, YanYa.class);
    yanya.setJcys(doctor);
    yanya.setYcsj(new Date());
    if (yanya.getJcd_id() == null) {
      List<Map<String, Object>> list = this.doctorsWorkstationDao
        .getInspectListByVisitIdAndState(yanya.getJiuzhen_id()
          .toString(), Integer.valueOf(50), 
          false, null);
      if (list.size() > 0) {
        yanya.setJcd_id(Long.valueOf(((Map)list.get(0)).get("inspectId")
              .toString()));
      }
    } 
    this.doctorsWorkstationDao.saveOrUpdate(yanya);
    return yanya.getId().toString();
  }
  
  @Override
  public List<Map<String, Object>> findFrequencys() {
    return this.doctorsWorkstationDao.findFrequencys();
  }
  
  @Override
  public JSONObject getLastTimeInfo(String visitId, String patientId) {
    Jiuzhen visit = this.doctorsWorkstationDao.getLastVisit(visitId, patientId);
    JSONObject result = new JSONObject();
    if (visit != null) {
      List<Map<String, Object>> list = this.jiuzhenDao.getZhenDuanList(visit
          .getId().toString());
      StringBuilder diagnoseBuilder = new StringBuilder();
      for (int i = 0; i < list.size(); i++) {
        Map<String, Object> map = list.get(i);
        diagnoseBuilder.append(map.get("eye")).append(",");
        diagnoseBuilder.append(map.get("zdflname")).append(";");
      } 
      List<Jzjl> passCurList = this.jzjlDao
        .findJzjlListByCategoryIdAndJiuzhenId(Integer.valueOf(30103), 
          Long.valueOf(visitId));
      if (passCurList.size() == 0) {
        result.put("passHistory", diagnoseBuilder.toString());
      }
      List<Jzjl> allergyCurList = this.jzjlDao
        .findJzjlListByCategoryIdAndJiuzhenId(Integer.valueOf(30104), 
          Long.valueOf(visitId));
      if (allergyCurList.size() == 0) {
        List<Jzjl> allergyHistoryList = this.jzjlDao
          .findJzjlListByCategoryIdAndJiuzhenId(Integer.valueOf(30104), 
            visit.getId());
        if (allergyHistoryList.size() > 0) {
          result.put("allergyHistory",
              String.valueOf(((Jzjl)allergyHistoryList.get(0)).getJilu()) + ";");
        }
      } 
      List<Jzjl> familyCurList = this.jzjlDao
        .findJzjlListByCategoryIdAndJiuzhenId(Integer.valueOf(30105), 
          Long.valueOf(visitId));
      if (familyCurList.size() == 0) {
        List<Jzjl> familyHistoryList = this.jzjlDao
          .findJzjlListByCategoryIdAndJiuzhenId(Integer.valueOf(30105), 
            visit.getId());
        if (familyHistoryList.size() > 0) {
          result.put("familyHistory",
              String.valueOf(((Jzjl)familyHistoryList.get(0)).getJilu()) + ";");
        }
      } 
    } 
    return result;
  }
  
  @Override
  public JSONObject validateTabSwitch(String visitId, String categoryId) {
    JSONObject result = new JSONObject();
    result.put("obj", Boolean.valueOf(true));
    if ("30002".equals(categoryId) || "30003".equals(categoryId)) {
      List<Jzjl> list = this.jzjlDao.findJzjlListByCategoryIdAndJiuzhenId(
          Integer.valueOf(30100), Long.valueOf(visitId));
      if (list.size() == 0 || "".equals(((Jzjl)list.get(0)).getJilu().trim())) {
        result.put("obj", Boolean.valueOf(false));
        result.put("message", "请填写主诉");
        result.put("showTabId", Integer.valueOf(30001));
      } 
    } else if ("30004".equals(categoryId) || "30005".equals(categoryId)) {
      List<Jzjl> list = this.jzjlDao.findJzjlListByCategoryIdAndJiuzhenId(
          Integer.valueOf(30100), Long.valueOf(visitId));
      if (list.size() == 0 || "".equals(((Jzjl)list.get(0)).getJilu().trim())) {
        result.put("obj", Boolean.valueOf(false));
        result.put("message", "请填写主诉");
        result.put("showTabId", Integer.valueOf(30001));
        return result;
      } 
      List<Map<String, Object>> list1 = this.jiuzhenDao
        .getZhenDuanList(visitId);
      if (list1.size() == 0) {
        result.put("obj", Boolean.valueOf(false));
        result.put("message", "请填写诊断结果");
        result.put("showTabId", Integer.valueOf(30003));
      } 
    } 
    return result;
  }
  
  private List<Map<String, Object>> getHISPriceList(String item_code, String item_spec, String units) {
    StringBuilder sql = new StringBuilder();
    sql.append("select item_class,item_name,item_spec,units,price from current_price_list where 1=1 ");
    sql.append("and item_code='").append(getLatinStr(item_code))
      .append("' ");
    if (item_spec != null && !"".equals(item_spec)) {
      sql.append("and item_spec='").append(getLatinStr(item_spec))
        .append("' ");
    }
    if (units != null && !"".equals(units)) {
      sql.append("and units='").append(getLatinStr(units)).append("' ");
    }
    List<Map<String, Object>> list = this.hisService.slectList(sql.toString());
    for (int i = 0; i < list.size(); i++) {
      Map<String, Object> map = list.get(i);
      Set<String> keySet = map.keySet();
      Iterator<String> iterator = keySet.iterator();
      while (iterator
        .hasNext()) {
        String key = iterator.next();
        String value = map.get(key).toString();
        map.put(key, getGBKStr(value));
      } 
    } 
    return list;
  }
  
  public List<?> getDrugStock(List<DrugDict> drugList) {
    List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
    if (drugList.size() > 0) {
      StringBuilder drugCodeBuilder = new StringBuilder();
      for (int i = 0; i < drugList.size(); i++) {
        if (i > 0) {
          drugCodeBuilder.append(",");
        }
        drugCodeBuilder.append("'")
          .append(((DrugDict)drugList.get(i)).getDrugCode()).append("'");
      } 
      StringBuilder sql = new StringBuilder();
      sql.append("select drug_code,drug_spec,firm_id,package_spec,quantity,package_units from drug_stock where 1=1 ");
      sql.append("and drug_code in (").append(drugCodeBuilder)
        .append(") ");
      sql.append("and storage='410701' ");
      sql.append("and expire_date>=to_date(to_char(sysdate,'yyyy-MM-dd'),'yyyy-MM-dd') ");
      sql.append("and quantity>0 ");
      try {
        List<Map<String, Object>> list = this.hisService.slectList(sql.toString());
        listEncodingChange(list);
        int j;
        for (j = 0; j < drugList.size(); j++) {
          DrugDict drugDict = drugList.get(j);
          for (int k = 0; k < list.size(); k++) {
            Map<String, Object> map = list.get(k);
            if (drugDict.getDrugCode().equals(
                map.get("DRUG_CODE").toString()) && 
              drugDict.getDrugSpec().equals(
                map.get("DRUG_SPEC").toString())) {
              map.put("drugName", drugDict.getDrugName());
              map.put("units", drugDict.getUnits());
              map.put("drugForm", drugDict.getDrugForm());
              map.put("toxiProperty", drugDict.getToxiProperty());
              map.put("dosePerunit", Double.valueOf(drugDict.getDosePerUnit()));
              map.put("doseUnits", drugDict.getDoseUnits());
              result.add(list.remove(k--));
            } 
          } 
        } 
        drugCodeBuilder.setLength(0);
        for (j = 0; j < result.size(); j++) {
          if (j > 0) {
            drugCodeBuilder.append(",");
          }
          drugCodeBuilder.append("'")
            .append(((Map)result.get(j)).get("DRUG_CODE")).append("'");
        } 
        sql.setLength(0);
        sql.append("select price,item_code,item_spec,units from current_price_list where 1=1 ");
        sql.append("and item_code in(").append(drugCodeBuilder)
          .append(")");
        list.clear();
        list = this.hisService.slectList(sql.toString());
        listEncodingChange(list);
        for (j = 0; j < result.size(); j++) {
          Map<String, Object> drugMap = result.get(j);
          String drugCode = drugMap.get("DRUG_CODE").toString();
          String drugSpec = String.valueOf(drugMap.get("PACKAGE_SPEC").toString()) + 
            drugMap.get("FIRM_ID").toString();
          String drugUnits = drugMap.get("PACKAGE_UNITS").toString();
          for (int k = 0; k < list.size(); k++) {
            Map<String, Object> priceMap = list.get(k);
            String itemCode = priceMap.get("ITEM_CODE").toString();
            String itemSpec = priceMap.get("ITEM_SPEC").toString();
            String itemUnits = priceMap.get("UNITS").toString();
            if (drugCode.equals(itemCode) && 
              drugSpec.equals(itemSpec) && 
              drugUnits.equals(itemUnits)) {
              drugMap.put("price", priceMap.get("PRICE"));
              list.remove(k--);
              break;
            } 
          } 
        } 
      } catch (Exception e) {
        return drugList;
      } 
    } else {
      StringBuilder sql = new StringBuilder();
      sql.append("select dd.drug_code,dd.drug_name,dd.drug_spec,dd.drug_form,dd.units,");
      sql.append("dd.toxi_property,dd.dose_per_unit,dd.dose_units,dd.units,dd.administration,");
      sql.append("ds.firm_id,ds.package_spec,ds.package_units,ds.quantity ");
      sql.append("from drug_stock ds,drug_dict dd where 1=1 ");
      sql.append("and ds.storage='410701' and ds.quantity>0 ");
      sql.append("and (expire_date>=to_date(to_char(sysdate,'yyyy-MM-dd'),'yyyy-MM-dd') or expire_date is null) ");
      sql.append("and dd.drug_spec=ds.drug_spec and ds.drug_code=dd.drug_code ");
      sql.append("and upper(dd.input_code) like upper('%atp%')");
    } 
    return result;
  }
  
  private Map<String, Object> getMedical(String input, int size, int page) {
    int start = (page - 1) * size + 1;
    int end = page * size;
    StringBuilder common = new StringBuilder();
    common.append("from drug_stock ds,drug_dict dd,current_price_list cpl where 1=1 ");
    common.append("and ds.storage='410701' and ds.quantity>0 ");
    common.append("and (expire_date>=to_date(to_char(sysdate,'yyyy-MM-dd'),'yyyy-MM-dd') or expire_date is null) ");
    common.append("and dd.drug_spec=ds.drug_spec and ds.drug_code=dd.drug_code ");
    common.append("and cpl.item_code=ds.drug_code and cpl.item_spec=ds.package_spec||ds.firm_id ");
    common.append("and upper(dd.input_code) like upper('%")
      .append(input.toUpperCase()).append("%')");
    StringBuilder sql = new StringBuilder();
    sql.append("select * from (");
    sql.append("select rownum num, dd.drug_code drug_code,dd.drug_name drug_name,");
    sql.append("dd.drug_spec drug_spec,dd.drug_form drug_form,dd.units units,dd.toxi_property toxi_property,");
    sql.append("dd.dose_per_unit dose_per_unit,dd.dose_units dose_units,dd.administration administration,");
    sql.append("ds.firm_id firm_id,ds.package_spec package_spec,");
    sql.append("ds.package_units package_units,ds.quantity quantity,cpl.price price ");
    sql.append(common);
    sql.append(") where 1=1 ");
    sql.append("and num>=").append(start);
    sql.append("and num<=").append(end);
    StringBuilder count = new StringBuilder();
    count.append("select count(1) total ").append(common);
    List<Map<String, Object>> countList = this.hisService.slectList(count
        .toString());
    List<Map<String, Object>> dataList = this.hisService.slectList(sql
        .toString());
    listEncodingChange(dataList);
    HashMap<String, Object> map = new HashMap<String, Object>();
    map.put("total", ((Map)countList.get(0)).get("TOTAL"));
    map.put("rows", dataList);
    return map;
  }
  
  private void listEncodingChange(List<Map<String, Object>> list) {
    for (int i = 0; i < list.size(); i++) {
      mapEncodeChange(list.get(i), "to_gbk");
    }
  }
  
  private void mapEncodeChange(Map<String, Object> map, String type) {
    Set<String> keySet = map.keySet();
    for (Iterator<String> iterator = keySet.iterator(); iterator.hasNext(); ) {
      String key = iterator.next();
      if (map.get(key) != null) {
        Object value = map.get(key);
        if (value instanceof String) {
          if ("to_gbk".equalsIgnoreCase(type)) {
            map.put(key, getGBKStr(value.toString()));
            continue;
          } 
          if ("to_latin".equalsIgnoreCase(type)) {
            map.put(key, getLatinStr(value.toString()));
          }
        } 
      } 
    } 
  }
  
  @Override
  public List<YuanGong> getFzysToday() {
    if (FZYS != null && FZYS.getObj() != null) {
      return (List<YuanGong>)FZYS.getObj();
    }
    List<YuanGong> list = this.doctorsWorkstationDao.getFzysToday();
    if (FZYS == null) {
      FZYS = new SyncObject(list);
    } else {
      FZYS.setObj(list);
    } 
    return list;
  }
  
  @Override
  public JSONObject getPrescPrintData(String medicalNum, String visitId, String doctor) {
    JSONObject result = new JSONObject();
    if (visitId != null && !"".equals(visitId)) {
      String[] properties = { "drugName", "drugSpec", 
          "firmId", "amount", "units", "dosage", "dosageUnits", 
          "administration", "frequency" };
      List<Map<String, Object>> diagnoseList = this.jiuzhenDao
        .getZhenDuanList(visitId);
      StringBuilder diagnoseBuilder = new StringBuilder();
      for (int i = 0; i < diagnoseList.size(); i++) {
        Map<String, Object> map = diagnoseList.get(i);
        if (i > 0) {
          diagnoseBuilder.append(",");
        }
        diagnoseBuilder.append(((Map)diagnoseList.get(i)).get("zdflname"));
      } 
      YuanGong employee = this.yuanGongDao.obtainYuanGongByGonghao(doctor);
      BanGongShi office = this.banGongShiDao.findBanGongShiById(employee
          .getBgsId());
      result.put("diagnose", diagnoseBuilder.toString());
      result.put("clinic", (office == null) ? "" : office.getBgs());
      result.put("printDate", (
          new SimpleDateFormat("yyyy-MM-dd")).format(new Date()));
      result.put("prescList", "[]");
      JsonConfig config = JsonUtil.resolveProperty(properties);
      Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(Long.valueOf(visitId));
      List<OutpOrders> orderList = this.outpOrdersDao.getOutpOrdersByPatient(
          visit.getCaozuoTime(), visit.getHaoma());
      for (int j = 0; j < orderList.size(); j++) {
        OutpOrders order = orderList.get(j);
        List<OutpPresc> prescList = this.outpPrescDao
          .getOutpPrescsByOrderId(order.getId());
        JSONArray prescArr = JSONArray.fromObject(prescList, config);
        result.getJSONArray("prescList").add(prescArr);
      } 
    } 
    return result;
  }
  
  @Override
  public List getHandleProjectByPinyin(String pinyin, boolean validable) {
    List<HandleProject> list = this.handleProjectDao.getByPinyin(pinyin, 
        validable);
    StringBuilder codeBuilder = new StringBuilder();
    for (int i = 0; i < list.size(); i++) {
      HandleProject project = list.get(i);
      if (i > 0) {
        codeBuilder.append(",");
      }
      codeBuilder.append("'").append(project.getProject_code())
        .append("'");
    } 
    if (codeBuilder.length() == 0) {
      return list;
    }
    StringBuilder sql = new StringBuilder();
    sql.append("select item_code,item_spec,units,price from price_list where 1=1 ");
    sql.append("and item_code in( ").append(codeBuilder.toString())
      .append(") ");
    sql.append("and stop_date is null");
    List<Map<String, Object>> priceList = null;
    try {
      priceList = this.hisService.slectList(sql.toString());
    } catch (Exception e) {
      System.err.println(getClass() + "\t630行：无法获取HIS项目信息");
      return list;
    } 
    listEncodingChange(priceList);
    List<JSONObject> result = new ArrayList<JSONObject>();
    String[] properties = { "id", "project_code", 
        "project_name", "project_units" };
    JsonConfig config = JsonUtil.resolveProperty(properties);
    for (int j = 0; j < list.size(); j++) {
      HandleProject project = list.get(j);
      String project_code = project.getProject_code();
      String project_units = project.getProject_units();
      String project_spec = project.getProject_spec();
      for (int k = 0; k < priceList.size(); k++) {
        Map<String, Object> priceMap = priceList.get(k);
        JSONObject obj = JSONObject.fromObject(project, config);
        if (project_code.equals(priceMap.get("ITEM_CODE").toString()) && 
          project_spec.equals(priceMap.get("ITEM_SPEC")
            .toString()) && 
          project_units.equals(priceMap.get("UNITS")
            .toString())) {
          double price = Double.parseDouble(priceMap.get("PRICE")
              .toString());
          obj.put("price", Double.valueOf(price));
          result.add(obj);
          break;
        } 
      } 
    } 
    return result;
  }
  
  @Override
  public List getHandlePertain(String handleId, Integer category_id) {
    return getJcxmPertainItemsByJcxmId(Integer.valueOf(handleId), 
        category_id);
  }
  
  @Override
  @Transactional
  public List saveHandleOrders(String handleOrders, String gonghao, String visitId) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(Long.valueOf(visitId));
    JSONArray orderArr = JSONArray.fromObject(handleOrders);
    int index = 1;
    JSONArray resulArr = new JSONArray();
    for (int i = 0; i < orderArr.size(); i++) {
      JSONObject orderObj = orderArr.getJSONObject(i);
      HandleProject project = this.handleProjectDao.getHandleProject(
          Integer.valueOf(orderObj.getInt("projectId")));
      double quantity = orderObj.getDouble("quantity");
      Map<String, Object> map = getHisPriceInfo(
          project.getProject_code(), project.getProject_spec(), 
          project.getProject_units());
      if (map != null) {
        OutpTreatRec rec = saveOutpTreatRec(visit, map, index++, 
            quantity, 1.0D, null, project.getCategory_id(), 
            orderObj.getString("administration"));
        if (orderObj.containsKey("pertain")) {
          JSONArray pertainArr = orderObj.getJSONArray("pertain");
          for (int j = 0; j < pertainArr.size(); j++) {
            JSONObject pertainItem = pertainArr.getJSONObject(j);
            map = getHisPriceInfo(
                pertainItem.getString("item_code"), null, null);
            saveOutpTreatRec(visit, map, index++, quantity, 
                pertainItem.getDouble("quantity"), rec.getId(), 
                project.getCategory_id(), null);
          } 
        } 
        JSONObject obj = new JSONObject();
        obj.put("projectId", Integer.valueOf(orderObj.getInt("projectId")));
        obj.put("outpTreatRecId", rec.getId());
        obj.put("administration", rec.getAdministration());
        resulArr.add(obj);
      } 
    } 
    return (List)resulArr;
  }
  
  @Override
  public List getExistHandleOrders(String visitId) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(Long.valueOf(visitId));
    List<OutpTreatRec> list = this.outpTreatRecDao.getOutpTreatRecs(
        visit.getCaozuoTime(), visit.getHaoma(), 
        OimsCategoryConfig.handleCategory);
    JSONArray resultArr = new JSONArray();
    int i;
    for (i = 0; i < list.size(); i++) {
      OutpTreatRec outpTreatRec = list.get(i);
      if (outpTreatRec.getItem_group() == null) {
        HandleProject project = this.handleProjectDao
          .getByCodeAndSpecAndUnits(outpTreatRec.getItem_code(), 
            outpTreatRec.getItem_spec(), 
            outpTreatRec.getUnits());
        JSONObject obj = new JSONObject();
        obj.put("outpTreatRecId", outpTreatRec.getId());
        obj.put("projectId", project.getId());
        obj.put("projectName", project.getProject_name());
        obj.put("quantity", outpTreatRec.getQuantity());
        obj.put("units", outpTreatRec.getUnits());
        obj.put("administration", outpTreatRec.getAdministration());
        double amount = outpTreatRec.getCosts().doubleValue();
        obj.put("amount", Double.valueOf(amount));
        resultArr.add(obj);
        list.remove(i--);
      } 
    } 
    for (i = 0; i < resultArr.size(); i++) {
      JSONObject obj = resultArr.getJSONObject(i);
      double amount = obj.getDouble("amount");
      for (int k = 0; k < list.size(); k++) {
        OutpTreatRec outpTreatRecTemp = list.get(k);
        Long itemGroup = outpTreatRecTemp.getItem_group();
        if (itemGroup != null) {
          if (itemGroup.longValue() == obj.getLong("outpTreatRecId")) {
            amount += ((OutpTreatRec)list.get(k)).getCosts().doubleValue();
            list.remove(k--);
          }
        }
      } 
      obj.put("amount", Double.valueOf(amount));
    } 
    return (List)resultArr;
  }
  
  @Override
  @Transactional
  public List delHandleOrders(String orders) {
    List<Long> result = new ArrayList<Long>();
    if (orders != null) {
      String[] orderIdArr = orders.split(",");
      for (int i = 0; i < orderIdArr.length; i++) {
        OutpTreatRec order = this.outpTreatRecDao.getOutpTreatRec(
            Long.valueOf(orderIdArr[i]));
        List<OutpTreatRec> list = this.outpTreatRecDao.getOutpTreatRecs(
            order.getId(), OimsCategoryConfig.handleCategory);
        for (int k = 0; k < list.size(); k++) {
          this.outpTreatRecDao.delete(list.get(k));
        }
        result.add(order.getId());
        this.outpTreatRecDao.delete(order);
      } 
    } 
    return result;
  }
  
  @Override
  public JSONArray getHandlePrintData(Long visitId, String orders) {
    String[] orderIdArr = orders.split(",");
    JSONArray result = new JSONArray();
    String[] properties = { "item_name", "units", "quantity", 
        "costs", "administration" };
    JsonConfig config = JsonUtil.resolveProperty(properties);
    for (int i = 0; i < orderIdArr.length; i++) {
      OutpTreatRec order = this.outpTreatRecDao.getOutpTreatRec(
          Long.valueOf(orderIdArr[i]));
      HandleProject handleProject = this.handleProjectDao
        .getByCodeAndSpecAndUnits(order.getItem_code(), 
          order.getItem_spec(), order.getUnits());
      JSONObject obj = new JSONObject();
      String position = (handleProject.getPosition() == null) ? "" : 
        handleProject.getPosition().trim();
      boolean existFlag = false;
      for (int j = 0; j < result.size(); j++) {
        JSONObject temp = result.getJSONObject(j);
        if (temp.get("position").equals(position)) {
          obj = temp;
          existFlag = true;
          break;
        } 
      } 
      if (!obj.containsKey("position")) {
        obj.put("position", position);
        obj.put("items", "[]");
      } 
      JSONArray items = new JSONArray();
      items.add(JSONObject.fromObject(order, config));
      List<OutpTreatRec> list = this.outpTreatRecDao.getOutpTreatRecs(
          order.getId(), OimsCategoryConfig.handleCategory);
      for (int k = 0; k < list.size(); k++) {
        items.add(JSONObject.fromObject(list.get(k), config));
      }
      obj.getJSONArray("items").add(items);
      if (!existFlag) {
        result.add(obj);
      }
    } 
    return result;
  }
  
  @Override
  @Transactional
  public void saveOldEyeSysClinic(Long visitId) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(visitId);
    HuanZheXinXi patient = this.patientDao.findHuanZheById(visit.getHuanzheId());
    List<Jzjl> jzjlList = this.jzjlDao.findJzjlByJiuzhenid(visitId.longValue());
    List<Map<String, Object>> diagnoseList = this.jiuzhenDao
      .getZhenDuanList(visitId.toString());
    HashMap<String, Object> map = new HashMap<String, Object>();
    SimpleDateFormat format0 = new SimpleDateFormat("yyMMddHHmmss");
    SimpleDateFormat format1 = new SimpleDateFormat("yyyyMMddHHmmss");
    map.put("flow_no", 
        String.valueOf(patient.getBinglihao()) + format0.format(visit.getCaozuoTime()));
    map.put("patient_id", patient.getBinglihao());
    map.put("cli_date", format1.format(visit.getCaozuoTime()));
    map.put("patient_his_present", getPhysicalContent(jzjlList, 30100));
    map.put("patient_xbs", getPhysicalContent(jzjlList, 30105));
    map.put("patient_his_jwst", getPhysicalContent(jzjlList, 30103));
    System.out.println(map.get("flow_no").toString());
    List<Map<String, Object>> visionList = this.jiuzhenDao.getShiLiUrl(visit
        .getId().toString());
    map.put("eye_jc_r_sl", "未查");
    map.put("eye_jc_l_sl", "未查");
    StringBuilder visionOD = new StringBuilder();
    StringBuilder visionOS = new StringBuilder();
    if (visionList.size() > 0) {
      Map<String, Object> vMap = visionList.get(0);
      double l_l = Double.parseDouble(vMap.get("l_l").toString());
      double jz_l = Double.parseDouble(vMap.get("jz_l").toString());
      double j_l = Double.parseDouble(vMap.get("j_l").toString());
      double l_r = Double.parseDouble(vMap.get("l_r").toString());
      double jz_r = Double.parseDouble(vMap.get("jz_r").toString());
      double j_r = Double.parseDouble(vMap.get("j_r").toString());
      if (l_l != 0.0D) {
        visionOS.append("左眼裸眼视力：").append(l_l).append("");
      }
      if (jz_l != 0.0D) {
        visionOS.append("左眼矫正视力：").append(jz_l).append("");
      }
      if (j_l != 0.0D) {
        visionOS.append("左眼近视力：").append(j_l).append("");
      }
      if (l_r != 0.0D) {
        visionOD.append("右眼裸眼视力：").append(l_r).append("");
      }
      if (jz_r != 0.0D) {
        visionOD.append("右眼矫正视力：").append(jz_r).append("");
      }
      if (j_r != 0.0D) {
        visionOD.append("右眼近视力：").append(j_r).append("");
      }
    } 
    map.put("eye_jc_r_sl", visionOD.toString());
    map.put("eye_jc_l_sl", visionOS.toString());
    map.put("eye_jc_r_gdw", getPhysicalContent(jzjlList, 30301));
    map.put("eye_jc_l_gdw", getPhysicalContent(jzjlList, 30302));
    map.put("eye_jc_r_yjqk", getPhysicalContent(jzjlList, 30303));
    map.put("eye_jc_l_yjqk", getPhysicalContent(jzjlList, 30304));
    map.put("eye_jc_r_jianl", getPhysicalContent(jzjlList, 30305));
    map.put("eye_jc_l_jianl", getPhysicalContent(jzjlList, 30306));
    map.put("eye_jc_r_lq", getPhysicalContent(jzjlList, 30307));
    map.put("eye_jc_l_lq", getPhysicalContent(jzjlList, 30308));
    map.put("eye_jc_r_yq", getPhysicalContent(jzjlList, 30309));
    map.put("eye_jc_l_yq", getPhysicalContent(jzjlList, 30310));
    map.put("eye_jc_r_jiem", getPhysicalContent(jzjlList, 30311));
    map.put("eye_jc_l_jiem", getPhysicalContent(jzjlList, 30312));
    map.put("eye_jc_r_jiaom", getPhysicalContent(jzjlList, 30313));
    map.put("eye_jc_l_jiaom", getPhysicalContent(jzjlList, 30314));
    map.put("eye_jc_r_gm", getPhysicalContent(jzjlList, 30315));
    map.put("eye_jc_l_gm", getPhysicalContent(jzjlList, 30316));
    map.put("eye_jc_r_qf", getPhysicalContent(jzjlList, 30317));
    map.put("eye_jc_l_qf", getPhysicalContent(jzjlList, 30318));
    map.put("eye_jc_r_hm", getPhysicalContent(jzjlList, 30319));
    map.put("eye_jc_l_hm", getPhysicalContent(jzjlList, 30320));
    map.put("eye_jc_r_tk", getPhysicalContent(jzjlList, 30321));
    map.put("eye_jc_l_tk", getPhysicalContent(jzjlList, 30322));
    map.put("eye_jc_r_jt", getPhysicalContent(jzjlList, 30323));
    map.put("eye_jc_l_jt", getPhysicalContent(jzjlList, 30324));
    map.put("eye_jc_r_blt", getPhysicalContent(jzjlList, 30325));
    map.put("eye_jc_l_blt", getPhysicalContent(jzjlList, 30326));
    map.put("eye_jc_r_swm", getPhysicalContent(jzjlList, 30327));
    map.put("eye_jc_l_swm", getPhysicalContent(jzjlList, 30328));
    map.put("first_diagn", "未见异常");
    StringBuilder diag = new StringBuilder();
    for (int i = 0; i < diagnoseList.size(); i++) {
      Map<String, Object> dMap = diagnoseList.get(i);
      diag.append(dMap.get("eye")).append(dMap.get("zdflname"));
      if ("0".equals(dMap.get("confirmed").toString())) {
        diag.append("？");
      }
      diag.append(",");
    } 
    map.put("final_diag", diag.toString());
    YuanGong employee = this.yuanGongDao
      .obtainYuanGongByGonghao(visit.getFzys());
    map.put("doc_name", employee.getXingming());
    BanGongShi office = this.banGongShiDao.findBanGongShiById(employee
        .getBgsId());
    map.put("clinic_room", "001");
    StringBuilder treat = new StringBuilder();
    Suifang suifang = this.iemrDao.getSuifang(Long.valueOf(visitId.longValue()));
    treat.append((suifang == null) ? "" : suifang.getZhuyi());
    map.put("treatment_info", treat.toString());
    map.put("patient_age", 
        Integer.valueOf(DateUtils.calculateAge(visit.getCaozuoTime(), 
            patient.getShengri())));
    map.put("visit_no", visit.getHaoma());
    map.put("visit_date", visit.getCaozuoTime());
    StringBuilder sql = new StringBuilder();
    StringBuilder columnSql = new StringBuilder();
    StringBuilder valueSql = new StringBuilder();
    Set<String> keySet = map.keySet();
    format1.applyPattern("yyyy-MM-dd");
    for (Iterator<String> iterator = keySet.iterator(); iterator.hasNext(); ) {
      String key = iterator.next();
      Object value = map.get(key);
      columnSql.append(key).append(",");
      if (value instanceof Date) {
        valueSql.append("to_date('").append(format1.format(value))
          .append("','yyyy-MM-dd'),");
        continue;
      } 
      if (value instanceof Integer) {
        valueSql.append(value).append(",");
        continue;
      } 
      String pattern = "(<\\s*([a-z]|[A-Z]|_|\\d|=|\"|'|\\s*)+>)|<\\s*/\\s*([a-z]|[A-Z]|=|\"|'|\\s*)+>";
      String v = value.toString().replaceAll(pattern, "");
      v = v.replaceAll("&nbsp;", "");
      valueSql.append("'").append(v.replace("'", "''")).append("',");
    } 
    sql.append("insert into eye_info_outp_clinic(")
      .append(columnSql.deleteCharAt(columnSql.length() - 1))
      .append(") ");
    sql.append("values (")
      .append(valueSql.deleteCharAt(valueSql.length() - 1))
      .append(") ");
  }
  
  private String getPhysicalContent(List<Jzjl> jzjlList, int categoryId) {
    for (int i = 0; i < jzjlList.size(); i++) {
      Jzjl record = jzjlList.get(i);
      if (record.getCategoryId().intValue() == categoryId) {
        jzjlList.remove(i);
        return (record.getJilu() == null) ? "未见异常" : record.getJilu();
      } 
    } 
    return "未见异常";
  }
  
  @Override
  @Transactional
  public void clearPaint(String categoryId, String visitId, String path) {
    List<Jzjl> jzjlList = this.jzjlDao.findJzjlListByCategoryIdAndJiuzhenId(
        Integer.valueOf(categoryId), Long.valueOf(visitId));
    if (jzjlList.size() > 0) {
      Jzjl record = jzjlList.get(0);
      String filePath = record.getPicPath();
      record.setPicPath(null);
      this.jzjlDao.updateJzjl(record);
      String realPath = path.replace("\\", "/");
      File file = new File(String.valueOf(realPath) + filePath);
      file.delete();
    } 
  }
  
  @Override
  @Transactional
  public void saveOrUpdateFollowedUp(String visitId, String content, String followed_time) {
    FollowedUp followedUp = this.followedUpDao.getFollowedUpByVisitId(
        Long.valueOf(visitId));
    if (followedUp != null) {
      followedUp.setContent(content);
      followedUp.setFollowed_time(followed_time);
      this.followedUpDao.update(followedUp);
    } else {
      followedUp = new FollowedUp();
      followedUp.setVisit_id(Long.valueOf(visitId));
      followedUp.setContent(content);
      followedUp.setFollowed_time(followed_time);
      this.followedUpDao.save(followedUp);
    } 
  }
  
  @Override
  public FollowedUp findFollowdUpByVisitId(String visitId) {
    FollowedUp fu = this.doctorsWorkstationDao.findFollowupByVisitId(visitId);
    return (fu != null) ? fu : null;
  }
  
  @Override
  public void savebingliprint(String gonghao, String jiuzhen_id) {
    BingLiPrint blp = new BingLiPrint();
    blp.setDoctor(gonghao);
    blp.setJiuzhen_id(Long.valueOf(Long.parseLong(jiuzhen_id)));
    blp.setPrint_time(new Date());
    this.doctorsWorkstationDao.save(blp);
  }
  
  @Override
  public Integer bingliprintnum(String jiuzhen_id) {
    return this.doctorsWorkstationDao.bingliprintnum(jiuzhen_id);
  }
  
  @Override
  @Transactional
  public void updateOldEyeSysClinic(Long id) {
    delOldEyeSysClinic(id);
    saveOldEyeSysClinic(id);
  }
  
  private void delOldEyeSysClinic(Long id) {
    Jiuzhen visit = this.jiuzhenDao.findJiuzhenById(id);
    HuanZheXinXi patient = this.patientDao.findHuanZheById(visit.getHuanzheId());
    SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
    String flow_no = String.valueOf(patient.getBinglihao()) + 
      format.format(visit.getCaozuoTime());
    StringBuilder sql = new StringBuilder();
    sql.append("delete from eye_info_outp_clinic where flow_no=" + flow_no);
  }
  
  @Override
  @Transactional
  public void saveAllDiagnosis(Vector<Disgnosis> diagnosis, String doctor) {
    for (Disgnosis dies : diagnosis) {
      JzZhenduan zd = this.doctorsWorkstationDao.findJzZhenduan(
          dies.getVisitId(), dies.getDiseaseId());
      if (zd == null) {
        zd = new JzZhenduan(dies.getVisitId(), dies.getDiseaseId());
      } else if (zd.getConfirmed() == dies.getState() && 
        zd.getEye().equals(dies.getEye())) {
        continue;
      } 
      zd.setZdys(doctor);
      zd.setConfirmed(dies.getState());
      zd.setEye(dies.getEye());
      zd.setZd_time(new Date());
      this.doctorsWorkstationDao.saveOrUpdate(zd);
    } 
  }
  
  @Override
  @Transactional
  public List<ResponseObj> addExamItem(JSONArray ja) {
    List<ResponseObj> list = new ArrayList<ResponseObj>();
    for (int i = 0; i < ja.size(); i++) {
      JSONObject jo = ja.getJSONObject(i);
      JSONObject joExamItem = jo.getJSONObject("examItem");
      JSONObject joPatient = jo.getJSONObject("patient");
      ExamItem examItem = (ExamItem)JSONObject.toBean(joExamItem, 
          ExamItem.class);
      PatientVistInfomation patient = 
        (PatientVistInfomation)JSONObject.toBean(joPatient, PatientVistInfomation.class);
      ResponseObj ro = this.examWebService.addExamItem(examItem, patient, 
          null, null);
      list.add(ro);
      saveExamJcxm(examItem, patient, ro.getResponseNo());
      List<PriceItem> pis = examItem.getPriceList();
      if (pis != null && pis.size() != 0) {
        String serial_no = ro.getBillNo()[0].split("_")[0];
        this.doctorsWorkstationDao.saveOutpOrdersExam(patient, serial_no);
        int j = 0;
        for (PriceItem item : pis) {
          this.doctorsWorkstationDao.saveOutpTreatRecExam(item, patient, 
              null, serial_no, j, ro.getResponseNo());
          j++;
        } 
      } 
    } 
    return list;
  }
  
  private void saveExamJcxm(ExamItem examItem, PatientVistInfomation patient, String responseNo) {
    this.doctorsWorkstationDao.addExamJcxm(examItem, patient, responseNo);
  }
  
  @Override
  @Transactional
  public void deleteExamItem(JSONArray ja) {
    for (int i = 0; i < ja.size(); i++) {
      String examNo = ja.get(i).toString();
      boolean b = this.examWebService.deleteExamItem(examNo);
      if (b) {
        deleteItemsExam(examNo);
      }
    } 
  }
  
  @Transactional
  private boolean deleteItemsExam(String examNo) {
    try {
      this.doctorsWorkstationDao.deleteItemsExam(examNo);
      String serialNo = this.doctorsWorkstationDao
        .getSerialNoFromOutpTreatRec(examNo);
      this.doctorsWorkstationDao.deleteOutpTreatRecExam(examNo);
      this.doctorsWorkstationDao.deleteOutpOrdersExam(serialNo);
      return true;
    } catch (Exception e) {
      return false;
    } 
  }
  
  @Override
  @Transactional
  public List<String> addTestItem(JSONArray ja) {
    List<String> list = new ArrayList<String>();
    for (int i = 0; i < ja.size(); i++) {
      JSONObject jo = ja.getJSONObject(i);
      JSONObject joTestItem = jo.getJSONObject("testItem");
      JSONObject joPatient = jo.getJSONObject("patient");
      JSONObject joSample = jo.getJSONObject("sample");
      TestItem testItem = (TestItem)JSONObject.toBean(joTestItem, 
          TestItem.class);
      PatientVistInfomation patient = 
        (PatientVistInfomation)JSONObject.toBean(joPatient, PatientVistInfomation.class);
      Sample sample = (Sample)JSONObject.toBean(joSample, Sample.class);
      ResponseObj ro = this.lisWebService.addTestItem(testItem, patient, null, 
          null, sample);
      list.add(ro.getResponseNo());
      this.doctorsWorkstationDao.addItemsTest(testItem, patient, sample, 
          ro.getResponseNo());
    } 
    return list;
  }
  
  @Override
  public void deleteTestItem(JSONArray ja) {
    for (int i = 0; i < ja.size(); i++) {
      String testNo = ja.get(i).toString();
      boolean b = this.lisWebService.deleteTestItem(testNo);
      if (b) {
        this.doctorsWorkstationDao.deleteTestItem(testNo);
      }
    } 
  }
  
  @Override
  public List<ExamCheck> findSubmitExamItems(String jiuzhenId) {
    List<ExamCheck> list = this.doctorsWorkstationDao
      .findSubmintExamCheck(jiuzhenId);
    return list;
  }
  
  @Override
  public List<TestCheck> findSubmitLis(String jiuzhenId) {
    List<TestCheck> list = this.doctorsWorkstationDao.findSubmitLis(jiuzhenId);
    return list;
  }
  
  @Override
  public Float getPriceByJcxmIdAndEyE(String jcxmId, String eye) {
    String eyeNew = (Integer.parseInt(eye) == OimsCategoryConfig.DOUBLE_EYE.intValue()) ? "双眼" : 
      "单眼";
    JcxmToHisItem jti = this.doctorsWorkstationDao.getPriceByJcxmIdAndEyE(
        jcxmId, eyeNew);
    String primaryKey = String.valueOf(jti.getHis_item_code()) + "@" + 
      jti.getHis_item_spec() + "@" + jti.getHis_item_units();
    PriceItem pi = this.hisWebService.getPriceItemByPriceCode(primaryKey);
    return Float.valueOf(pi.getItemPrice().floatValue() * 
        Float.parseFloat(jti.getMultiple().toString()));
  }
  
  @Override
  public void saveJCTSPaint(JCTSPaintForm pf, HttpServletRequest request) {
    String filePath = "/exam_photos/tmp";
    String filename = pf.getPatientId() + "_" + pf.getVisitId() + "_" + 
      pf.getJcxmId() + "_" + pf.getEye() + ".jpg";
    if (pf.getJcdId() != null) {
      Jcd jcd = this.jcdDao.findJcdById(pf.getJcdId());
      if (jcd == null) {
        throw new RuntimeException("未找到对应检查单！");
      }
      filePath = "/exam_photos/" + pf.getPatientId() + "/" + 
        pf.getVisitId() + "/" + pf.getJcdId();
    } 
    boolean s = savePaintFile(request, 
        String.valueOf(request.getSession().getServletContext().getRealPath(filePath)) + 
        File.separator + filename);
    if (s) {
      pf.setFilePath(String.valueOf(filePath) + "/" + filename);
    }
  }
  
  @Override
  public List<InquiryComboTreeNode> findInquiryAndPhysicalCategory(String id) {
    return this.doctorsWorkstationDao.findInquiryAndPhysicalCategory(id);
  }
  
  @Override
  public JSONArray findInquiryAndPhsicalNode(String fatherId, String value, String gonghao) {
    JSONArray ja = new JSONArray();
    List<ShuruMoban> list = this.doctorsWorkstationDao
      .findInquiryAndPhsicalNode(fatherId, value, gonghao);
    for (ShuruMoban sm : list) {
      JSONObject jo_sm = JSONObject.fromObject(sm);
      List<TemplateVariable> tvs = this.doctorsWorkstationDao
        .findInquiryAndPhsicalVariable(sm.getId());
      if (tvs != null && tvs.size() != 0) {
        JSONArray ja_tvs = new JSONArray();
        for (TemplateVariable tv : tvs) {
          String variableArray = tv.getVariable();
          JSONArray JSONArray_tv = new JSONArray();
          String[] variables = variableArray.split(" ");
          byte b;
          int i;
          String[] arrayOfString1;
          for (i = (arrayOfString1 = variables).length, b = 0; b < i; ) {
            String v = arrayOfString1[b];
            JSONArray_tv.add(v);
            b++;
          } 
          ja_tvs.add(JSONArray_tv);
        } 
        jo_sm.put("items", ja_tvs);
      } else {
        jo_sm.put("items", new JSONArray());
      } 
      ja.add(jo_sm);
    } 
    return ja;
  }
  
  @Override
  public Map<String, Object> showPrescription(String search, Page page) {
    Map<String, Object> map = new HashMap<String, Object>();
    List<DrugDict> list = this.doctorsWorkstationDao.findDrugDicts(search, 
        page);
    Iterator<DrugDict> itr = list.iterator();
    while (itr.hasNext()) {
      DrugDict dd = itr.next();
      try {
        Float f = this.medicineWebService.getMedicineStorage(
            String.valueOf(dd.getDrugCode()) + "," + dd.getDrugSpec());
        Float p = dd.getPrice();
        Date ud = dd.getUpdateTime();
        if (ud == null || ud.before(MultiUtils.getStartTimeOfDay())) {
          p = this.medicineWebService.getMedicinePrice(dd.getDrugCode());
          if (p != null) {
            dd.setPrice(p);
            dd.setUpdateTime(new Date());
            this.doctorsWorkstationDao.saveOrUpdate(dd);
          } 
        } 
        dd.setPrice(p);
        dd.setStore(f);
      } catch (Exception e) {
        break;
      } 
    } 
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  @Override
  @Transactional
  public void handleProjectToJcxm() {
    Page page = new Page();
    page.setRowsCount(Integer.valueOf(100));
    page.init();
    List<Jcxm> list = this.jcxmDao.findAllJcxm("5", null, page);
    for (int i = 0; i < list.size(); i++) {
      Jcxm j = list.get(0);
      j.setBianma("T_" + i);
      this.jcxmDao.updateJcxm(j);
    } 
  }
  
  @Override
  public void fuShuSyncro() {}
  
  @Override
  @Transactional
  public void syncroYuangongGonghao() {
    List<Jiuzhen> list = this.jiuzhenDao.findAllJiuzhen();
    try {
      for (Jiuzhen yg : list) {
        String gh = yg.getFzys();
        while (gh.length() < 4) {
          gh = "0" + gh;
        }
        if (gh.equals("admin")) {
          continue;
        }
        yg.setFzys(gh);
        this.jiuzhenDao.updateJiuzhen(yg);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  @Override
  public HuanZheXinXi syncronizePatient(PatientVistInfomation pvi) {
    HuanZheXinXi hzxx = this.patientDao.getHuanzhexinxiByBLH(pvi.getPatient()
        .getPatientId());
    if (hzxx == null) {
      hzxx = syncronizePatientHisToLocal(pvi);
      Long long_ = (Long)this.patientDao.saveHuanZhe(hzxx);
    } 
    return hzxx;
  }
  
  public HuanZheXinXi syncronizePatientHisToLocal(PatientVistInfomation pvi) {
    String PATIENT_ID = (pvi.getPatient().getPatientId() == null) ? "" : pvi
      .getPatient().getPatientId().toString().trim();
    String NAME = (pvi.getPatient().getName() == null) ? "" : pvi
      .getPatient().getName().toString().trim();
    String SEX = (pvi.getPatient().getSex() == null) ? "" : pvi.getPatient()
      .getSex().toString().trim();
    String DATE_OF_BIRTH = (pvi.getPatient().getBirthday() == null) ? "" : (
      new SimpleDateFormat("yyyy-MM-dd"))
      .format(pvi.getPatient().getBirthday()).toString()
      .trim();
    String MAILING_ADDRESS = (pvi.getMailingAddress() == null) ? "" : pvi
      .getMailingAddress().toString().trim();
    String idno = (pvi.getPatient().getPid() == null) ? "" : pvi.getPatient()
      .getPid().toString();
    String phone = (pvi.getPatient().getMobile() == null) ? "" : pvi
      .getPatient().getMobile().toString();
    String phone1 = (pvi.getPatient().getTel() == null) ? "" : pvi
      .getPatient().getTel().toString();
    List<String> phone_list = new ArrayList<String>();
    if (!"".equals(phone)) {
      phone_list.add(phone);
    }
    if (!"".equals(phone1)) {
      phone_list.add(phone1);
    }
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
    if ("男".equals(SEX)) {
      huanzhexinxi.setXingbie(true);
    } else {
      huanzhexinxi.setXingbie(false);
    } 
    huanzhexinxi.setShengri(Utils.strToDateDay(DATE_OF_BIRTH));
    huanzhexinxi.setDiqu(MAILING_ADDRESS);
    huanzhexinxi.setJtdz(MAILING_ADDRESS);
    huanzhexinxi.setJilvren("10002");
    huanzhexinxi.setLaiyuan(Integer.valueOf(1006));
    huanzhexinxi.setZcrq(new Date());
    huanzhexinxi.setBeizhu("数据同步");
    return huanzhexinxi;
  }
  
  @Override
  public void syncroFuShu() {}
  
  @Override
  public List<PatientVistInfomation> getZhuYuanPatient(String binglihao) {
    return this.hisWebService.getPatientVisitInfoMationsByPatientId(binglihao);
  }
  
  @Override
  public List<EyeInfoOutpClinic> getEyeInfoOutpClinicList(String patientId) {
    List<EyeInfoOutpClinic> list = this.eyeDao.getEyeInfoOutpClinicList(patientId);
    return list;
  }
  
  @Override
  public int getHisNumberByVisitState(String state, String jobNum) {
    return this.doctorsWorkstationDao.getHisNumberByVisitState(state, jobNum);
  }
  
  @Override
  public EMRInHospitalCard getEMRInHospitalCardByJiuZhenID(String jiuzhenid) {
    return this.doctorsWorkstationDao.getEMRInHospitalCardByJiuZhenID(jiuzhenid);
  }
  
  @Override
  public Long saveOrUpdateEMRInHospitalCard(EMRInHospitalCard emrInHospitalCard) {
    return this.doctorsWorkstationDao.saveOrUpdateEMRInHospitalCard(emrInHospitalCard);
  }
}
