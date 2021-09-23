package cn.com.oims.service.impl;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IOperationDao;
import cn.com.oims.dao.IOperationDictDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Operation;
import cn.com.oims.dao.pojo.OperationConsumable;
import cn.com.oims.dao.pojo.OperationDetail;
import cn.com.oims.dao.pojo.OperationDict;
import cn.com.oims.dao.pojo.OperationGroup;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IOperationService;
import cn.com.oims.web.form.OperationApplicationForm;
import cn.com.oims.web.form.OperationAppointmentForm;
import cn.com.oims.web.form.OperationConsumableForm;
import cn.com.oims.web.form.OperationConsumableSearchForm;
import cn.com.oims.web.form.OperationPlanForm;
import cn.com.oims.web.form.OperationRecordForm;
import cn.com.oims.web.form.OperationSearchForm;
import cn.com.oims.web.form.OperationShowForm;
import cn.com.oims.webservice.HisWebService;
import cn.com.oims.webservice.pojo.Patient;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.his.Operaton;
import com.codesnet.common.Page;
import com.codesnet.common.PinyinUtils;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class OperationServiceImpl implements IOperationService {
  public static final int PROCESS_STATE_INIT = 0;

  public static final int PROCESS_STATE_APPLICATION = 1;

  public static final int PROCESS_STATE_PLAN = 2;

  public static final int PROCESS_STATE_UNDOING = 4;

  public static final int PROCESS_STATE_COMPELET = 3;

  public static final int PROCESS_STATE_STOP = 5;

  @Autowired
  private IOperationDao operationDao;

  @Autowired
  private IJiuzhenDao jiuzhenDao;

  @Autowired
  private IYuanGongDao ygDao;

  @Autowired
  private IOperationDictDao dictDao;

  @Autowired
  private IHuanZheXinXiDao hzDao;

  @Autowired
  private HisWebService hisWebService;

  @Autowired
  private IBuMenDao bumenDao;

  public void saveOrUpdateOperationDict(OperationDict dict) {
    Integer id = dict.getId();
    String inputCode = dict.getInputCode();
    if (inputCode == null || inputCode.isEmpty()) {
      PinyinUtils pu = new PinyinUtils();
      char[] cs = dict.getName().toCharArray();
      byte b;
      int i;
      char[] arrayOfChar1;
      for (i = (arrayOfChar1 = cs).length, b = 0; b < i; ) {
        char c = arrayOfChar1[b];
        try {
          String p = pu.getPinyinByChar(c).substring(0, 1);
          if (inputCode == null) {
            inputCode = p;
          } else {
            inputCode = String.valueOf(inputCode) + p;
          }
        } catch (Exception exception) {}
        b++;
      }
      dict.setInputCode(inputCode.toUpperCase());
    }
    if (id == null) {
      this.operationDao.saveOrUpdate(dict);
      return;
    }
    OperationDict od = this.operationDao.getOperationDict(id);
    if (od == null)
      throw new RuntimeException("未找到要修改的记录！");
    BeanUtils.copyProperties(dict, od);
    od.setId(id);
    this.operationDao.saveOrUpdate(od);
  }

  public List<OperationDict> findOperationDictList(String inputCode, Page page) {
    return this.operationDao.findOperationDictList(inputCode, page);
  }

  public void deleteOperationDict(Integer id) {
    if (this.operationDao.operationExists(id))
      throw new RuntimeException("手术字典已存在记录！");
    this.operationDao.delete(this.operationDao.getOperationDict(id));
  }

  @Transactional
  public void saveOrUpdateOperation(OperationAppointmentForm form, String gonghao) {
    Operation operation;
    if (form.getId() != null) {
      operation = this.operationDao.getOperation(form.getId());
      if (operation == null)
        throw new RuntimeException("未找到要修改的记录！");
      BeanUtils.copyProperties(form, operation);
    } else {
      operation = new Operation();
      if (this.operationDao.patientOperationAppointmentExists(form.getPatientId(), form.getOperationDictIds(), form.getVisitId()))
        throw new RuntimeException("患者已预约");
      BeanUtils.copyProperties(form, operation);
      operation.setInsertTime(new Date());
      operation.setInsertUser(gonghao);
    }
    if (form.getCondition() == null)
      operation.setCondition("一般");
    this.operationDao.saveOrUpdate(operation);
    saveOrUpdateOperationDetails(operation.getId(), form.getEyes(), form.getOperationDictIds(), gonghao);
  }

  private void saveOrUpdateOperationDetails(Long id, String[] eyes, String[] operationDictIds, String gonghao) {
    List<OperationDetail> list = this.operationDao.findOperationDetails(id);
    for (int i = 0; i < eyes.length; i++) {
      int eye = Integer.parseInt(eyes[i]);
      int operationDictId = Integer.parseInt(operationDictIds[i]);
      boolean x = true;
      for (OperationDetail od : list) {
        if (od.getOperationDictId().intValue() == operationDictId && od.getOperationId().longValue() == id.longValue() && od.getEyes().intValue() == eye) {
          list.remove(od);
          x = false;
          break;
        }
      }
      if (x)
        this.operationDao.saveOrUpdate(new OperationDetail(id, Integer.valueOf(eye), Integer.valueOf(operationDictId), gonghao));
    }
    if (list.size() > 0)
      this.operationDao.deleteAll(list);
  }

  public Map<String, Object> findOperationList(Page page, OperationSearchForm form) {
    List<Map<String, Object>> list = this.operationDao.findOperationList(page, form);
    Iterator<Map<String, Object>> itr = list.iterator();
    while (itr.hasNext()) {
      Map<String, Object> m = itr.next();
      Integer deptId = (Integer)m.get("groupId");
      if (deptId != null) {
        OperationGroup group = this.dictDao.getOperationGroup(deptId);
        m.put("groupName", group.getName());
      }
      String gonghao = (String)m.get("doctor");
      if (gonghao != null) {
        YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
        m.put("doctorName", yg.getXingming());
      }
      gonghao = (String)m.get("firstAssistant");
      if (gonghao != null) {
        YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
        m.put("firstAssistantName", yg.getXingming());
      }
      gonghao = (String)m.get("secondAssistant");
      if (gonghao != null) {
        YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
        m.put("secondAssistantName", yg.getXingming());
      }
      gonghao = (String)m.get("circuitNurse");
      if (gonghao != null) {
        YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
        m.put("circuitNurseName", yg.getXingming());
      }
      String operationRoom = (m.get("operationRoomId") == null) ? null : m.get("operationRoomId").toString();
      if (operationRoom != null)
        if (operationRoom.equals("1")) {
          m.put("operationRoom", "1号");
        } else if (operationRoom.equals("2")) {
          m.put("operationRoom", "2号");
        } else if (operationRoom.equals("3")) {
          m.put("operationRoom", "3号");
        } else if (operationRoom.equals("4")) {
          m.put("operationRoom", "4号");
        } else if (operationRoom.equals("5")) {
          m.put("operationRoom", "5号");
        } else if (operationRoom.equals("6")) {
          m.put("operationRoom", "急诊");
        } else if (operationRoom.equals("7")) {
          m.put("operationRoom", "门诊");
        }
      List details = this.operationDao.findOperationDetailsMap((Long)m.get("id"));
      m.put("operationDetails", details);
      if (details != null && details.size() > 0) {
        String eye = (((Map)details.get(0)).get("eyes") == null) ? null : ((Map)details.get(0)).get("eyes").toString();
        if (eye != null) {
          if (Integer.parseInt(eye) == OimsCategoryConfig.LEFT_EYE.intValue()) {
            m.put("yanbie", "左眼");
            continue;
          }
          if (Integer.parseInt(eye) == OimsCategoryConfig.RIGHT_EYE.intValue()) {
            m.put("yanbie", "右眼");
            continue;
          }
          if (Integer.parseInt(eye) == OimsCategoryConfig.DOUBLE_EYE.intValue())
            m.put("yanbie", "双眼");
        }
      }
    }
    Map<String, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }

  @Transactional
  public void deleteOperation(Long id) {
    this.operationDao.delete(getOperation(id));
    List<OperationDetail> list = this.operationDao.findOperationDetails(id);
    this.operationDao.deleteAll(list);
  }

  public Operation getOperation(Long id) {
    return this.operationDao.getOperation(id);
  }

  public OperationDict getOperationDict(Integer id) {
    return this.operationDao.getOperationDict(id);
  }

  @Transactional
  public void saveOrUpdateOperationApplication(OperationApplicationForm form, String gonghao) {
    Operation operation;
    if (form.getId() != null) {
      operation = this.operationDao.getOperation(form.getId());
      if (operation == null)
        throw new RuntimeException("没有找到此预约记录！");
      if (operation.getProcessState() > 1)
        throw new RuntimeException("此手术预约已安排");
    } else {
      operation = new Operation();
      operation.setInsertTime(new Date());
      operation.setInsertUser(gonghao);
    }
    BeanUtils.copyProperties(form, operation);
    operation.setProposerDoctor(gonghao);
    operation.setApplicationTime(new Date());
    operation.setProcessState(1);
    this.operationDao.saveOrUpdate(operation);
    saveOrUpdateOperationDetails(operation.getId(), form.getEyes(), form.getOperationDictIds(), gonghao);
  }

  @Transactional
  public void saveOrUpdateOperationPlan(OperationPlanForm form, String gonghao) {
    Operation operation;
    if (form.getId() != null) {
      operation = this.operationDao.getOperation(form.getId());
      if (operation == null)
        throw new RuntimeException("没有找到此预约记录！");
      if (operation.getProcessState() > 2)
        throw new RuntimeException("此手术申请已处理完毕！");
    } else {
      operation = new Operation();
      operation.setInsertTime(new Date());
      operation.setInsertUser(gonghao);
      operation.setProposerDoctor(gonghao);
      operation.setApplicationTime(new Date());
    }
    BeanUtils.copyProperties(form, operation);
    operation.setPlanner(gonghao);
    operation.setPlanTime(new Date());
    operation.setProcessState(form.getIsPlanCancel().booleanValue() ? 5 : 2);
    this.operationDao.saveOrUpdate(operation);
    saveOrUpdateOperationDetails(operation.getId(), form.getEyes(), form.getOperationDictIds(), gonghao);
  }

  public Map<String, Object> getOperationMap(String blh) {
    Map<String, Object> map0 = this.operationDao.getOperationMap(blh);
    Map<String, Object> map1 = null;
    try {
      map1 = getHISPatientMap(blh);
    } catch (Exception e) {
      e.printStackTrace();
    }
    if (map0 == null && map1 != null)
      return map1;
    if (map0 != null) {
      if (map1 != null) {
        Date d0 = (Date)map0.get("visitTime");
        Date d1 = (Date)map1.get("visitTime");
        if (d1.after(d0))
          return map1;
      }
      StringBuffer sb = new StringBuffer();
      List<Map<String, Object>> list = this.jiuzhenDao.findJzZhenduanList((Long)map0.get("visitId"));
      for (Map<String, Object> m : list) {
        sb.append((m.get("eye") == null) ? "" : m.get("eye"));
        sb.append(m.get("disease"));
        if (((Integer)m.get("confirmed")).intValue() == 0)
          sb.append("?");
        sb.append(",");
      }
      String medical = sb.toString();
      map0.put("medical", medical.substring(0, medical.length() - 1));
      return map0;
    }
    if (map0 == null && map1 == null)
      return getPaientMap(blh);
    return null;
  }

  private Map<String, Object> getPaientMap(String blh) {
    Map<String, Object> map = new HashMap<>();
    HuanZheXinXi hzxx = this.hzDao.getHuanzhexinxiByBLH(blh);
    if (hzxx == null) {
      Patient p = this.hisWebService.getPatientById(blh);
      if (p == null)
        return null;
      hzxx = new HuanZheXinXi();
      hzxx.setBinglihao(blh);
      hzxx.setXingming(p.getName());
      hzxx.setXingbie(p.getSex().equals("男"));
      hzxx.setShengri(p.getBirthday());
      hzxx.setJtdz(p.getAddress());
      hzxx.setDianhua(p.getTel());
      hzxx.setShouji(p.getMobile());
      this.hzDao.saveHuanZhe(hzxx);
    }
    map.put("patientId", hzxx.getId());
    map.put("name", hzxx.getXingming());
    map.put("sex", Boolean.valueOf(hzxx.isXingbie()));
    map.put("birthday", hzxx.getShengri());
    map.put("tel", hzxx.getDianhua());
    map.put("mobile", hzxx.getShouji());
    map.put("contact", hzxx.getHzlxr());
    return map;
  }

  private Map<String, Object> getHISPatientMap(String blh) {
    PatientVistInfomation pvi = this.hisWebService.getPatientVistInfomation(blh);
    if (pvi == null)
      return null;
    Map<String, Object> map = new HashMap<>();
    HuanZheXinXi hzxx = this.hzDao.getHuanzhexinxiByBLH(blh);
    if (hzxx == null) {
      Patient p = pvi.getPatient();
      hzxx = new HuanZheXinXi();
      hzxx.setBinglihao(blh);
      hzxx.setXingming(p.getName());
      hzxx.setXingbie(p.getSex().equals("男"));
      hzxx.setShengri(p.getBirthday());
      hzxx.setJtdz(p.getAddress());
      hzxx.setDianhua(p.getTel());
      hzxx.setShouji(p.getMobile());
      hzxx.setHzlxr(pvi.getContact());
      hzxx.setHzlxrdh(pvi.getContactTel());
      this.hzDao.saveHuanZhe(hzxx);
    }
    map.put("patientId", hzxx.getId());
    map.put("name", hzxx.getXingming());
    map.put("sex", Boolean.valueOf(hzxx.isXingbie()));
    map.put("birthday", hzxx.getShengri());
    map.put("tel", hzxx.getDianhua());
    map.put("mobile", hzxx.getShouji());
    map.put("bedNo", pvi.getBedNo());
    map.put("area", pvi.getAreaName());
    map.put("visitTime", pvi.getVisitDate());
    map.put("contact", pvi.getContact());
    map.put("contactTel", pvi.getContactTel());
    map.put("medical", pvi.getDiseases());
    map.put("areaCode", pvi.getAreaCode());
    return map;
  }

  @Transactional
  public void saveOrUpdateOperationRecord(OperationRecordForm form, String gonghao) {
    Operation operation = this.operationDao.getOperation(form.getId());
    if (operation == null)
      throw new RuntimeException("没有找到此预约记录！");
    if (operation.getProcessState() < 2)
      throw new RuntimeException("手术未安排！");
    BeanUtils.copyProperties(form, operation);
    operation.setRecorder(gonghao);
    operation.setRecordTime(new Date());
    Operaton o = new Operaton();
    YuanGong yg = this.ygDao.getYuanGongByGH(operation.getRecorder());
    Integer doctor_level = this.dictDao.findDoctorLevelByGonghao(operation.getDoctor());
    o.setDoctor_level((doctor_level != null) ? Integer.valueOf(doctor_level.intValue() + 1) : null);
    String recorder = yg.getXingming();
    BuMen bm = this.bumenDao.getBuMenById(yg.getBumenId());
    HuanZheXinXi hzxx = this.hzDao.getPatientById(operation.getPatientId());
    o.setPatientId(hzxx.getBinglihao());
    o.setDeptId(operation.getAreaCode());
    o.setOperationRoomDept(bm.getBmbm());
    o.setOperationRoomNo(operation.getOperationRoomId() + "");
    String medical = operation.getMedical();
    if (medical != null && !medical.trim().isEmpty() && medical.length() > 40) {
      medical = medical.trim().replace("，", ",");
      if (medical.indexOf(",") == -1) {
        medical = medical.substring(0, 40);
      } else {
        StringBuffer sbf = new StringBuffer("");
        byte b;
        int j;
        String[] arrayOfString;
        for (j = (arrayOfString = medical.split(",")).length, b = 0; b < j; ) {
          String tmp = arrayOfString[b];
          if (sbf.equals("")) {
            sbf.append(tmp.trim());
            if (sbf.length() > 40) {
              medical = sbf.substring(0, 40);
              break;
            }
          } else {
            if (sbf.length() + tmp.length() > 39) {
              medical = sbf.toString();
              break;
            }
            sbf.append("," + tmp);
          }
          b++;
        }
      }
    }
    o.setMedical(medical);
    o.setCondition(operation.getCondition());
    o.setOperationSize(getOperationSizeTitle(operation.getOperationSize()));
    o.setMedicalAfter(operation.getMedicalAfter());
    o.setUrgent(Integer.valueOf((operation.getUrgent() == null) ? 0 : 1));
    o.setIsolation(operation.getIsolation());
    yg = this.ygDao.getYuanGongByGH(operation.getDoctor());
    bm = this.bumenDao.getBuMenById(yg.getBumenId());
    o.setOperationDeptId(bm.getBmbm());
    o.setSurgeon(yg.getXingming());
    if (operation.getFirstAssistant() != null && !operation.getFirstAssistant().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(operation.getFirstAssistant());
      o.setFirstAssistant(yg.getXingming());
    }
    if (operation.getSecondAssistant() != null && !operation.getSecondAssistant().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(operation.getSecondAssistant());
      o.setSecondAssistant(yg.getXingming());
    }
    o.setAnesthesia(getAnesthesiaName(operation.getAnesthesia()));
    o.setAnesthetist(operation.getAnesthetist());
    if (operation.getCircuitNurse() != null && !operation.getCircuitNurse().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(operation.getCircuitNurse());
      o.setCircuitNurse(yg.getXingming());
    }
    if (operation.getInstrumentNurse() != null && !operation.getInstrumentNurse().isEmpty()) {
      yg = this.ygDao.getYuanGongByGH(operation.getInstrumentNurse());
      o.setInstrumentNurse(yg.getXingming());
    }
    o.setStartDate(operation.getOperationTime());
    o.setEndDate(operation.getOperationCompleteTime());
    o.setRecoder(recorder);
    o.setAppointmentTime(operation.getAppointmentTime());
    String[] operationDictIds = form.getOperationDictIds();
    StringBuffer sb = new StringBuffer();
    Integer operation_level = Integer.valueOf(0);
    StringBuffer temp = new StringBuffer("");
    StringBuffer operationCodes = new StringBuffer();
    String[] eyes = form.getEyes();
    for (int i = 0; i < operationDictIds.length; i++) {
      if (i > 0) {
        sb.append(",");
        operationCodes.append(",");
      }
      OperationDict od = this.operationDao.getOperationDict(Integer.valueOf(Integer.parseInt(operationDictIds[i])));
      String eye = (eyes == null || eyes[i] == null) ? null : eyes[i].trim();
      if (eye.equals("46")) {
        eye = "[左眼]";
      } else if (eye.equals("47")) {
        eye = "[右眼]";
      } else if (eye.equals("48")) {
        eye = "[双眼]";
      } else {
        eye = "";
      }
      sb.append(eye);
      sb.append(od.getName());
      if (od.getOperationCode() == null || od.getOperationCode().isEmpty() || od.getOperationCode().trim().equals("")) {
        operationCodes.append("@");
      } else {
        operationCodes.append(od.getOperationCode());
      }
      temp.append(od.getLevelFlag().intValue() + 1);
      if (i != operationDictIds.length - 1)
        temp.append(",");
      if (od.getLevelFlag().intValue() >= operation_level.intValue())
        operation_level = Integer.valueOf(od.getLevelFlag().intValue() + 1);
    }
    o.setNote(operationCodes.toString());
    o.setOperationSize(String.valueOf(operation_level.toString()) + "," + temp.toString());
    o.setOperationNames(sb.toString());
    if (operation.getProcessState() == 3) {
      if (operation.getSend() != null && operation.getSend().booleanValue() && StringUtils.hasLength(operation.getSendMsg())) {
        o.setId(operation.getSendMsg());
        this.hisWebService.updateOperationRecord(o);
      } else {
        String msg = this.hisWebService.saveOperationRecord(o);
        if (msg == null)
          return;
        operation.setSend(Boolean.valueOf(true));
        operation.setSendMsg(msg);
      }
    } else {
      operation.setOperationCompleteTime(null);
      operation.setOperationTime(null);
      operation.setOperationRecord(null);
      if (operation.getSend() != null && operation.getSend().booleanValue()) {
        o.setId(operation.getSendMsg());
        this.hisWebService.deleteOperationRecord(o);
        operation.setSend(Boolean.valueOf(false));
        operation.setSendMsg(null);
      }
    }
    this.operationDao.saveOrUpdate(operation);
    saveOrUpdateOperationDetails(operation.getId(), form.getEyes(), operationDictIds, gonghao);
  }

  public String getAnesthesiaName(Integer anesthesia) {
    String n = "";
    switch (anesthesia.intValue()) {
      case 0:
        n = "无麻醉";
        break;
      case 1:
        n = "表面麻醉";
        break;
      case 2:
        n = "局部麻醉";
        break;
      case 3:
        n = "吸入全麻";
        break;
      case 4:
        n = "静脉全麻";
        break;
    }
    return n;
  }

  public String getOperationSizeTitle(Integer operationSize) {
    String t = "";
    switch (operationSize.intValue()) {
      case 0:
        t = "小";
        break;
      case 1:
        t = "中";
        break;
      case 2:
        t = "大";
        break;
    }
    return t;
  }

  public Map<String, Object> showOperationMap(OperationShowForm form) {
    Map<String, Object> map = new HashMap<>();
    if (form.getId() != null) {
      Operation operation = this.operationDao.getOperation(form.getId());
      if (operation == null)
        throw new RuntimeException("没有找到此预约记录！");
      List<Operation> list = new ArrayList<>();
      list.add(operation);
      map.put("list", operation);
      map.put("patient", this.hzDao.findHuanZheById(operation.getPatientId()));
    } else {
      List<Operation> list = this.operationDao.getOperation(form.getPatientId(), form.getVisitId());
      map.put("list", list);
      map.put("patient", this.hzDao.findHuanZheById(form.getPatientId()));
    }
    return map;
  }

  @Transactional
  public void setOperationProcessState(Long[] ids, Integer state, String gonghao) {
    byte b;
    int i;
    Long[] arrayOfLong;
    for (i = (arrayOfLong = ids).length, b = 0; b < i; ) {
      Long id = arrayOfLong[b];
      Operation operation = this.operationDao.getOperation(id);
      if (operation == null)
        throw new RuntimeException("没有找到此预约记录！");
      if (operation.getProcessState() < 2)
        throw new RuntimeException("不是已安排的手术！");
      operation.setProcessState(state.intValue());
      operation.setRecorder(gonghao);
      operation.setRecordTime(new Date());
      this.operationDao.saveOrUpdate(operation);
      b++;
    }
  }

  public List<OperationConsumable> findOperationConsumable(Long operationId) {
    return this.operationDao.findOperationConsumable(operationId);
  }

  @Transactional
  public void saveOrUpdateOperationConsumable(Long operationId, Boolean used, Vector<OperationConsumableForm> vec, String gonghao) {
    Operation operation = this.operationDao.getOperation(operationId);
    if (operation == null)
      throw new RuntimeException("未找到手术耗材记录！");
    List<OperationConsumable> oldList = this.operationDao.findOperationConsumable(operationId);
    this.operationDao.deleteAll(oldList);
    for (OperationConsumableForm ocf : vec) {
      OperationConsumable oc = new OperationConsumable();
      BeanUtils.copyProperties(ocf, oc);
      oc.setCategory(1);
      oc.setInsertDate(new Date());
      oc.setInsertUser(gonghao);
      oc.setUsed(used.booleanValue());
      oc.setOperationId(operationId);
      Date useDate = used.booleanValue() ? operation.getOperationCompleteTime() : operation.getAppointmentTime();
      oc.setUseDate(operation.getOperationCompleteTime());
      this.operationDao.saveOrUpdate(oc);
    }
  }

  public Map<String, Object> findOperationConsumablePageList(OperationConsumableSearchForm form, Page page) {
    List<Map<String, Object>> list = this.operationDao.findOperationConsumablePageList(form, page);
    Map<String, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }

  public List<Map<String, Object>> findOperationList(OperationSearchForm form) {
    List list = this.operationDao.findOperationList(form);
    Iterator itr = list.iterator();
    while (itr.hasNext()) {
      Map m = (Map) itr.next();
      Integer deptId = (Integer)m.get("groupId");
      if (deptId != null) {
        OperationGroup group = this.dictDao.getOperationGroup(deptId);
        m.put("groupName", group.getName());
      }
      String gonghao = (String) m.get("doctor");
      if (gonghao != null) {
        YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
        m.put("doctorName", yg.getXingming());
      }
      gonghao = (String) m.get("firstAssistant");
      if (gonghao != null) {
        YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
        m.put("firstAssistantName", yg.getXingming());
      }
      gonghao = (String) m.get("secondAssistant");
      if (gonghao != null) {
        YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
        m.put("secondAssistantName", yg.getXingming());
      }
      gonghao = (String) m.get("circuitNurse");
      if (gonghao != null) {
        YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
        m.put("circuitNurseName", yg.getXingming());
      }
      String operationRoom = (m.get("operationRoomId") == null) ? null : m.get("operationRoomId").toString();
      if (operationRoom != null)
        if (operationRoom.equals("1")) {
          m.put("operationRoom", "1号");
        } else if (operationRoom.equals("2")) {
          m.put("operationRoom", "2号");
        } else if (operationRoom.equals("3")) {
          m.put("operationRoom", "3号");
        } else if (operationRoom.equals("4")) {
          m.put("operationRoom", "4号");
        } else if (operationRoom.equals("5")) {
          m.put("operationRoom", "5号");
        } else if (operationRoom.equals("6")) {
          m.put("operationRoom", "急诊");
        } else if (operationRoom.equals("7")) {
          m.put("operationRoom", "门诊");
        }
      List details = this.operationDao.findOperationDetailsMap((Long)m.get("id"));
      m.put("operationDetails", details);
      if (details != null && details.size() > 0) {
        String eye = (((Map)details.get(0)).get("eyes") == null) ? null : ((Map)details.get(0)).get("eyes").toString();
        if (eye != null) {
          if (Integer.parseInt(eye) == OimsCategoryConfig.LEFT_EYE.intValue()) {
            m.put("yanbie", "左眼");
            continue;
          }
          if (Integer.parseInt(eye) == OimsCategoryConfig.RIGHT_EYE.intValue()) {
            m.put("yanbie", "右眼");
            continue;
          }
          if (Integer.parseInt(eye) == OimsCategoryConfig.DOUBLE_EYE.intValue())
            m.put("yanbie", "双眼");
        }
      }
    }
    return list;
  }

  /**
   * @Description: 查询手术预约列表(首页)
   * @param page 分页查询对象
   * @param form 手术查询表单
   * @return
   * @author huxiaoqiang
   * @date 2019-12-17 11:42:23
   */
  @Override
  public Map<String, Object> findOperationListForIndex(Page page, OperationSearchForm form) {
    //1、分页查询手术预约数据
    List<Map<String,Object>> list = operationDao.findOperationListForIndex(page, form);
    Iterator<Map<String,Object>> itr = list.iterator();
    while(itr.hasNext()){
      Map<String,Object> m = itr.next();

      String gonghao = (String)m.get("doctor");
      YuanGong yg;
      if(gonghao!=null){
        //3、根据工号查询员工信息
        yg = ygDao.getYuanGongByGH(gonghao);
        m.put("doctorName", yg.getXingming());
      }

      List details = this.operationDao.findOperationDetailsMap((Long)m.get("id"));
      m.put("operationDetails", details);
      if(details!=null&&details.size()>0){
        String eye=(((Map<String,Object>)details.get(0)).get("eyes")==null?null:((Map<String,Object>)details.get(0)).get("eyes").toString());
        if(eye==null){
        }
        else if(Integer.parseInt(eye)==OimsCategoryConfig.LEFT_EYE){
          m.put("yanbie", "左眼");
        }else if(Integer.parseInt(eye)==OimsCategoryConfig.RIGHT_EYE){
          m.put("yanbie", "右眼");
        }else if(Integer.parseInt(eye)==OimsCategoryConfig.DOUBLE_EYE){
          m.put("yanbie", "双眼");
        }
      }


    }
    Map<String,Object> map = new HashMap<String,Object>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }
}
