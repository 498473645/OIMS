package cn.com.oims.dao.impl;

import cn.com.oims.dao.IDoctorsWorkstationDao;
import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.EMRInHospitalCard;
import cn.com.oims.dao.pojo.ExamCheck;
import cn.com.oims.dao.pojo.FollowedUp;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.InquiryComboTreeNode;
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
import cn.com.oims.dao.pojo.TemplateVariable;
import cn.com.oims.dao.pojo.TestCheck;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.dao.pojo.YaoPinType;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.exam.ExamItem;
import cn.com.oims.webservice.pojo.his.PriceItem;
import cn.com.oims.webservice.pojo.lis.Sample;
import cn.com.oims.webservice.pojo.lis.TestItem;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.SQLQuery;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.ResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Component;

@Component
public class DoctorsWorkstationDaoImpl extends BaseDaoImpl implements IDoctorsWorkstationDao {
  private int hospital = 101;
  
  private int department = 102;
  
  private int office = 103;
  
  private int personal = 104;
  
  public void save(Object entity) {
    this.hibernateTemplate.save(entity);
  }
  
  public void saveOrUpdate(Object entity) {
    this.hibernateTemplate.saveOrUpdate(entity);
  }
  
  public void delete(Object entity) {
    this.hibernateTemplate.delete(entity);
  }
  
  public List<ShuruMoban> getInputTemplet(String categoryId, YuanGong employee) {
    StringBuilder hql = new StringBuilder();
    hql.append("from ShuruMoban where 1=1 ");
    hql.append("and categoryId=").append(categoryId);
    hql.append(" and (");
    hql.append("(jibie=").append(this.hospital).append(") ");
    hql.append("or (jibie=").append(this.department).append(" and bmId=").append(employee.getBumenId()).append(") ");
    hql.append("or (jibie=").append(this.office).append(" and bmId=").append(employee.getBgsId()).append(") ");
    hql.append("or (jibie=").append(this.personal).append(" and gonghao='").append(employee.getGonghao()).append("') ");
    hql.append(")");
    return this.hibernateTemplate.find(hql.toString());
  }
  
  public int savePhysicalItemContent(String categoryId, String content, String visitId) {
    StringBuilder hql = new StringBuilder();
    hql.append("update Jzjl set jilu='").append(content).append("' where 1=1 ");
    hql.append(" and categoryId=").append(categoryId);
    hql.append(" and jiuzhenId=").append(visitId);
    return this.hibernateTemplate.bulkUpdate(hql.toString());
  }
  
  public Long saveOrUpdate_Inquiry(Jzjl jzjl) {
    try {
      this.hibernateTemplate.saveOrUpdate(jzjl);
      return jzjl.getId();
    } catch (Exception e) {
      e.printStackTrace();
      return jzjl.getId();
    } 
  }
  
  public List<ShuruMoban> findTemplateNoVariable(int categoryId, String pinyin) {
    StringBuilder hql = new StringBuilder();
    hql.append("from ShuruMoban where 1=1 ");
    hql.append("and categoryId=").append(categoryId);
    if (pinyin != null && !"".equals(pinyin.trim())) {
      hql.append(" and pinyin like '");
      char[] pinyinchar = pinyin.toCharArray();
      for (int i = 0; i < pinyinchar.length; i++)
        hql.append('%').append(Character.toLowerCase(pinyinchar[i])); 
      hql.append("%'");
    } 
    List<ShuruMoban> list = this.hibernateTemplate.find(hql.toString());
    return list;
  }
  
  public String[] findVariable(Long key) {
    return null;
  }
  
  public List<TemplateVariable> findTemplateVariable(Long id) {
    String hql = "from TemplateVariable where shuruId=" + id;
    return this.hibernateTemplate.find(hql);
  }
  
  public int getNumberByVisitState(String state, String jobNum) {
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    StringBuilder hql = new StringBuilder();
    hql.append("select count(*) from Jiuzhen where 1=1");
    if (state != null && !"".equals(state))
      hql.append(" and state in (").append(state).append(") "); 
    if (jobNum != null && !"".equals(jobNum))
      hql.append(" and fzys='").append(jobNum).append("'"); 
    hql.append(" and caozuoTime>=:startTime and caozuoTime<=:endTime ");
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("startTime", startTime);
    map.put("endTime", endTime);
    return Integer.parseInt(findList(hql.toString(), map).get(0).toString());
  }
  
  public Jiuzhen getDiagnosisPatientVisitInfo(String jobNum, String currentVisitID, String state, Integer serialNo) {
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    StringBuilder hql = new StringBuilder();
    hql.append("from Jiuzhen where 1=1");
    hql.append(" and fzys='").append(jobNum).append("'");
    hql.append(" and state=").append(state);
    hql.append(" and caozuoTime>=:startTime and caozuoTime<=:endTime ");
    hql.append(" and serial_no>").append(serialNo);
    hql.append(" and huanzheId in(select id from HuanZheXinXi)");
    hql.append(" order by serial_no asc");
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("startTime", startTime);
    map.put("endTime", endTime);
    List<Jiuzhen> list = getListForPage(hql.toString(), 0, 1, map);
    if (list != null && list.size() == 1)
      return list.get(0); 
    return null;
  }
  
  public ShiLi getVisionByVisitId(String visitId) {
    StringBuilder hql = new StringBuilder();
    hql.append("from ShiLi where 1=1 ");
    hql.append("and jiuzhen_id=").append(visitId).append(" ");
    hql.append("order by id desc");
    List<ShiLi> list = this.hibernateTemplate.find(hql.toString());
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public YanYa getIopByVisitId(String visitId) {
    StringBuilder hql = new StringBuilder();
    hql.append("from YanYa where 1=1 ");
    hql.append("and jiuzhen_id=").append(visitId).append(" ");
    hql.append("order by id desc");
    List<YanYa> list = this.hibernateTemplate.find(hql.toString());
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
  
  public List<Jiuzhen> getRecordsOfHistory(String patientId, String endTime, Long visitId, String jobNum) {
    StringBuilder hql = new StringBuilder();
    hql.append("from Jiuzhen where 1=1");
    hql.append(" and huanzheId=").append(patientId);
    SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Map<String, Object> map = new HashMap<String, Object>();
    Date date = null;
    try {
      date = formater.parse(endTime);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    hql.append(" and caozuoTime<=:endTime and id not in(" + visitId + ")");
    hql.append(" order by caozuoTime desc ");
    map.put("endTime", date);
    return findList(hql.toString(), map);
  }
  
  public Jzjl getJzjlByVisitIdAndCategoryId(String visitId, String categoryId) {
    StringBuilder hql = new StringBuilder();
    hql.append("from Jzjl where 1=1 ");
    hql.append("and jiuzhenId=").append(visitId).append(" ");
    hql.append("and categoryId=").append(categoryId);
    List<Jzjl> list = this.hibernateTemplate.find(hql.toString());
    if (list != null && list.size() == 1)
      return list.get(0); 
    return null;
  }
  
  public List<Map<String, Object>> getInspectListByVisitIdAndState(String visitId, Object state, boolean includeInvalid, String orders) {
    StringBuilder hql = new StringBuilder();
    hql.append("select new map(jcxmIds as id,id as inspectId,biaoti as inspectName,biaoshi as biaoshi,jcksId as position,");
    hql.append("(select category from Category where id=j.yanbie) as eyeSort,");
    hql.append("(select category from Category where id=j.biaoshi) as state,");
    hql.append("jcyq as tip,leftPic as paintLeft,rightPic as paintRight,");
    hql.append("(select categoryId from Jcxm where id=j.jcxmIds) as categoryId,");
    hql.append("(select rightPicPath from Jcxm where id=j.jcxmIds) as rightPicPath,");
    hql.append("(select leftPicPath from Jcxm where id=j.jcxmIds) as leftPicPath ");
    hql.append(") from Jcd j where 1=1 ");
    if (orders != null && !"".equals(orders))
      hql.append("and id in(").append(orders).append(") "); 
    hql.append("and jiuzhenId=").append(visitId).append(" ");
    if (!includeInvalid)
      hql.append("and biaoshi<>").append(62).append(" "); 
    if (state != null)
      hql.append("and biaoshi=").append(state); 
    return this.hibernateTemplate.find(hql.toString());
  }
  
  public List<Map<String, Object>> getContentByCategory(String categoryId, String visitIds) {
    StringBuilder hql = new StringBuilder();
    hql.append("select new map(jiuzhenId as visitId,jilu as content) ");
    hql.append("from Jzjl where 1=1 ");
    hql.append("and jiuzhenId in(").append(visitIds).append(") ");
    hql.append("and categoryId=").append(categoryId).append(" ");
    hql.append("order by jiuzhenId desc");
    return this.hibernateTemplate.find(hql.toString());
  }
  
  public List<Map<String, Object>> getInspectsByCategory(String categoryId, String pinyin) {
    StringBuilder hql = new StringBuilder();
    hql.append("select new map(id as xmid,xmmc as xmmc,categoryId as categoryId,");
    hql.append("input_code as pinyin,");
    hql.append("leftPicPath as leftPicPath,rightPicPath as rightPicPath) ");
    hql.append("from Jcxm where 1=1 ");
    hql.append("and categoryId=").append(categoryId);
    if (pinyin != null && !"".equals(pinyin)) {
      hql.append("and (input_code like '%").append(pinyin.toUpperCase()).append("%'");
      hql.append(" or xmmc like '%" + pinyin.toUpperCase() + "%') ");
    } 
    return this.hibernateTemplate.find(hql.toString());
  }
  
  public void updateInspectPicPathAndTip(String id, String eyeSort, String picPath, String tip) {
    StringBuilder hql = new StringBuilder();
    hql.append("update Jcd set ");
    hql.append("jcyq='").append(tip).append("' ");
    if ("OD".equals(eyeSort)) {
      hql.append(",right_pic='").append(picPath).append("' ");
    } else {
      hql.append(",left_pic='").append(picPath).append("' ");
    } 
    hql.append("where id=").append(id);
    Session session = this.hibernateTemplate.getSessionFactory().getCurrentSession();
    SQLQuery sqlQuery = session.createSQLQuery(hql.toString());
    sqlQuery.executeUpdate();
  }
  
  public List<YaoPinType> findPrescriptionList() {
    return this.hibernateTemplate.find("from YaoPinType");
  }
  
  public List<DrugDict> findMedicines(String input) {
    String hql = "from DrugDict where inputCode like '" + input + "'";
    System.out.println(hql);
    return this.hibernateTemplate.find(hql);
  }
  
  public List<OutpPresc> findSubmitMedicines(Long id) {
    String hql = "from OutpPresc where serialNo=" + id;
    return this.hibernateTemplate.find(hql);
  }
  
  public Long saveOutpOrders(OutpOrders oo) {
    return (Long)this.hibernateTemplate.save(oo);
  }
  
  public Long saveOutpPresc(OutpPresc op) {
    return (Long)this.hibernateTemplate.save(op);
  }
  
  public Jiuzhen getLastVisit(String visitId, String patientId) {
    StringBuilder hql = new StringBuilder();
    hql.append("from Jiuzhen where 1=1 ");
    hql.append("and huanzheId=").append(patientId).append(" ");
    hql.append("and id<").append(visitId).append(" ");
    hql.append("order by id desc ");
    this.hibernateTemplate.setMaxResults(1);
    List<Jiuzhen> visit = this.hibernateTemplate.find(hql.toString());
    this.hibernateTemplate.setMaxResults(0);
    if (visit.size() > 0)
      return visit.get(0); 
    return null;
  }
  
  public List<Map<String, Object>> findAdministrations() {
    String hql = "select new map(a.inputCode as dosageId,a.administrationName as dosageText) from Administration a";
    return this.hibernateTemplate.find(hql);
  }
  
  public List<Map<String, Object>> findFrequencys() {
    String hql = "select new map(f.id as frequencyId,f.freqDesc as frequencyText) from Frequency f";
    return this.hibernateTemplate.find(hql);
  }
  
  public List<OutpPresc> findMedicinesListByIds(List<Long> list) {
    StringBuilder sb = new StringBuilder("");
    for (int i = 0; i < list.size(); i++) {
      sb.append(list.get(i));
      if (i != list.size() - 1)
        sb.append(","); 
    } 
    String hql = "from OutpPresc where id in (" + sb.toString() + ")";
    return this.hibernateTemplate.find(hql);
  }
  
  public void deleteMedicines(List<OutpPresc> lo) {
    this.hibernateTemplate.deleteAll(lo);
  }
  
  public List<YuanGong> getFzysToday() {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    String hql = "from YuanGong y where exists (from Jiuzhen jz where jz.fzys=y.gonghao and jz.caozuoTime between ? and ?) order by xingming";
    return this.hibernateTemplate.find(hql, new Object[] { startTime, endTime });
  }
  
  public List getTodayPatientList(Integer state, String gonghao, String search, String path) {
    DetachedCriteria visitDc = DetachedCriteria.forClass(Jiuzhen.class, "jz");
    DetachedCriteria patientDc = DetachedCriteria.forClass(HuanZheXinXi.class, "hzxx");
    patientDc.setProjection(Property.forName("binglihao").as("binglihao"));
    patientDc.add((Criterion)Property.forName("hzxx.id").eqProperty("jz.huanzheId"));
    visitDc.setResultTransformer((ResultTransformer)Transformers.ALIAS_TO_ENTITY_MAP);
    if (state != null)
      visitDc.add((Criterion)Restrictions.eq("jz.state", state)); 
    if (gonghao != null)
      visitDc.add((Criterion)Restrictions.eq("jz.fzys", gonghao)); 
    if (search != null && !"".equals(search))
      visitDc.add((Criterion)Restrictions.or((Criterion)Restrictions.like("hzxx.name", search, MatchMode.ANYWHERE), 
            (Criterion)Restrictions.like("hzxx.binglihao", search, MatchMode.ANYWHERE))); 
    return this.hibernateTemplate.findByCriteria(visitDc);
  }
  
  public FollowedUp findFollowupByVisitId(String visitId) {
    String hql = "from FollowedUp where visit_id=" + visitId;
    List<FollowedUp> list = this.hibernateTemplate.find(hql);
    return (list.size() != 0) ? list.get(0) : null;
  }
  
  public Integer bingliprintnum(String jiuzhen_id) {
    String hql = "from BingLiPrint where jiuzhen_id=" + jiuzhen_id;
    List list = this.hibernateTemplate.find(hql);
    return Integer.valueOf(list.size());
  }
  
  public JzZhenduan findJzZhenduan(Long jiuzhenId, Integer diseaseId) {
    String hql = " from JzZhenduan where jiuzhen_id=" + jiuzhenId + " and zdfl_id='" + diseaseId + "'";
    List<JzZhenduan> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  public void addExamJcxm(ExamItem examItem, PatientVistInfomation patient, String responseNo) {
    ExamCheck ec = new ExamCheck();
    ec.setDoctor(patient.getReqPhysician());
    ec.setJiuzhenId(Long.valueOf(Long.parseLong(patient.getJiuzhenId())));
    ec.setExamNo(responseNo);
    ec.setItemCode(examItem.getItemCode());
    ec.setItemName(examItem.getName());
    ec.setPatientId(patient.getPatient().getPatientId());
    ec.setRequisitionTime(patient.getReqDateTime());
    this.hibernateTemplate.save(ec);
  }
  
  public String saveOutpOrdersExam(PatientVistInfomation patient, String serialNo) {
    OutpOrders oo = new OutpOrders();
    oo.setDoctor(patient.getReqPhysician());
    oo.setOrderedBy(Integer.valueOf(Integer.parseInt(patient.getReqDept())));
    oo.setPatientId(patient.getPatient().getPatientId());
    oo.setSerialNo(Long.valueOf(Long.parseLong(serialNo)));
    oo.setVisitDate(patient.getVisitDate());
    oo.setVisitNo(patient.getVisitNo());
    this.hibernateTemplate.save(oo);
    return serialNo;
  }
  
  public void saveOutpTreatRecExam(PriceItem item, PatientVistInfomation patient, Object object, String serialNo, int j, String responseNo) {
    OutpTreatRec otr = new OutpTreatRec();
    otr.setAppoint_no(responseNo);
    otr.setCosts(Double.valueOf(Double.parseDouble(item.getItemPrice().toString()) * Double.parseDouble(item.getAmount().toString())));
    otr.setDoctor(patient.getReqPhysician());
    otr.setItem_class(item.getItemClass());
    otr.setItem_code(item.getItemCode());
    otr.setItem_name(item.getItemName());
    otr.setItem_no(Integer.valueOf(j));
    otr.setItem_spec(item.getSpec());
    otr.setPerformed_by(patient.getReqDept());
    otr.setQuantity(Double.valueOf(Double.parseDouble(item.getAmount().toString())));
    otr.setSerial_no(serialNo);
    otr.setUnits(item.getUnit());
    otr.setVisit_date(patient.getVisitDate());
    otr.setVisit_no(patient.getVisitNo());
    this.hibernateTemplate.save(otr);
  }
  
  public void deleteItemsExam(String examNo) {
    ExamCheck ec = (ExamCheck)this.hibernateTemplate.get(ExamCheck.class, examNo);
    this.hibernateTemplate.delete(ec);
  }
  
  public void deleteOutpTreatRecExam(String examNo) {
    String sql = "from OutpTreatRec where appoint_no='" + examNo + "'";
    List<OutpTreatRec> list = this.hibernateTemplate.find(sql);
    this.hibernateTemplate.delete(list);
  }
  
  public void addItemsTest(TestItem testItem, PatientVistInfomation patient, Sample sample, String id) {
    TestCheck tc = new TestCheck();
    tc.setCharge(testItem.getItemPrice());
    tc.setChargeIndicator(Integer.valueOf(0));
    tc.setDoctor(patient.getReqPhysician());
    tc.setId(id);
    tc.setItemCode(testItem.getItemCode());
    tc.setItemName(testItem.getItemTitle());
    tc.setPatientId(patient.getPatient().getPatientId());
    tc.setPatientName(patient.getPatient().getName());
    tc.setPatientSource(Integer.valueOf(patient.getPatientSource()));
    tc.setRequsitionTime(patient.getReqDateTime());
    tc.setSampleCode(sample.getId());
    tc.setSampleName(sample.getChineseName());
    tc.setVisitId(patient.getJiuzhenId());
    this.hibernateTemplate.save(tc);
  }
  
  public void deleteTestItem(String testNo) {
    TestCheck tc = (TestCheck)this.hibernateTemplate.get(TestCheck.class, testNo);
    this.hibernateTemplate.delete(tc);
  }
  
  public List<ExamCheck> findSubmintExamCheck(String jiuzhenId) {
    String sql = "from ExamCheck where jiuzhenId='" + jiuzhenId + "'";
    return this.hibernateTemplate.find(sql);
  }
  
  public List<TestCheck> findSubmitLis(String jiuzhenId) {
    String sql = "from TestCheck where visitId='" + jiuzhenId + "'";
    List<TestCheck> list = this.hibernateTemplate.find(sql);
    return list;
  }
  
  public String getSerialNoFromOutpTreatRec(String examNo) {
    String sql = "from OutpTreatRec where appoint_no='" + examNo + "'";
    List<OutpTreatRec> otc = this.hibernateTemplate.find(sql);
    return (otc != null && otc.size() != 0) ? ((OutpTreatRec)otc.get(0)).getSerial_no() : null;
  }
  
  public void deleteOutpOrdersExam(String serialNo) {
    if (serialNo != null && !"".equals(serialNo)) {
      String sql = "from OutpOrders where serialNo=" + serialNo;
      List<OutpOrders> list = this.hibernateTemplate.find(sql);
      if (list != null && list.size() != 0)
        this.hibernateTemplate.delete(list.get(0)); 
    } 
  }
  
  public List<InquiryComboTreeNode> findInquiryAndPhysicalCategory(String id) {
    String sql = "from InquiryComboTreeNode where pid=0 and categoryId=" + id;
    return this.hibernateTemplate.find(sql);
  }
  
  public List<ShuruMoban> findInquiryAndPhsicalNode(String fatherId, String value, String gonghao) {
    String sql = "";
    if (fatherId == null) {
      sql = "from ShuruMoban where 1=1 ";
    } else {
      sql = "from ShuruMoban where treeNodeId=" + fatherId;
    } 
    if (value != null && !value.isEmpty())
      sql = String.valueOf(sql) + " and (pinyin like '%" + value.toLowerCase() + "%' or shuru like '%" + value + "%') "; 
    if (gonghao != null && !gonghao.isEmpty())
      sql = String.valueOf(sql) + " and (jibie=101 or (jibie=102 and gonghao='" + gonghao + "'))"; 
    sql = String.valueOf(sql) + "order by id";
    List<ShuruMoban> list = this.hibernateTemplate.find(sql);
    return list;
  }
  
  public List<TemplateVariable> findInquiryAndPhsicalVariable(Long id) {
    String sql = "from TemplateVariable where shuruId=" + id;
    List<TemplateVariable> list = this.hibernateTemplate.find(sql);
    return list;
  }
  
  public JcxmToHisItem getPriceByJcxmIdAndEyE(String jcxmId, String eye) {
    String sql = "from JcxmToHisItem where jcxm_id='" + jcxmId + "'" + " and eye='" + eye + "'";
    List<JcxmToHisItem> list = this.hibernateTemplate.find(sql);
    return (list != null && list.size() != 0) ? list.get(0) : null;
  }
  
  public List<DrugDict> getMedicineByKey(String drugCode, String drugSpec) {
    String sql = "from DrugDict where drugCode='" + drugCode + "' and drugSpec='" + drugSpec + "'";
    return this.hibernateTemplate.find(sql);
  }
  
  public List<DrugDict> findDrugDicts(String search, Page page) {
    String hql = "from DrugDict";
    if (search == null || search.isEmpty()) {
      page.setRowsCount(Integer.valueOf(count("select count(*) " + hql)));
      page.init();
      return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
    } 
    hql = String.valueOf(hql) + " where drugName like:search or inputCode like:search";
    Map<Object, Object> map = new HashMap<Object, Object>();
    map.put("search", "%" + search + "%");
    page.setRowsCount(Integer.valueOf(counts("select count(*) " + hql, map)));
    page.init();
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  public void updateDrug(DrugDict dd) {
    this.hibernateTemplate.update(dd);
  }
  
  public List<JcxmPertainItem> findAllJcxmPertain() {
    String sql = "from JcxmPertainItem";
    return this.hibernateTemplate.find(sql);
  }
  
  public int getHisNumberByVisitState(String state, String jobNum) {
    Date okTime = null;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    try {
      okTime = sdf.parse(sdf.format(new Date()));
    } catch (Exception e) {
      e.printStackTrace();
    } 
    StringBuilder hql = new StringBuilder();
    hql.append("select count(distinct haoma) from Jiuzhen where 1=1");
    if (state != null && !"".equals(state))
      hql.append(" and state in (").append(state).append(") "); 
    if (jobNum != null && !"".equals(jobNum))
      hql.append(" and fzys='").append(jobNum).append("'"); 
    hql.append(" and caozuoTime=:okTime ");
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("okTime", okTime);
    return Integer.parseInt(findList(hql.toString(), map).get(0).toString());
  }
  
  public EMRInHospitalCard getEMRInHospitalCardByJiuZhenID(String jiuzhenid) {
    String hql = "from EMRInHospitalCard where jiuzhenId=:jiuzhenId ";
    Map<String, String> map = new HashMap<String, String>();
    map.put("jiuzhenId", jiuzhenid);
    List<EMRInHospitalCard> list = findList(hql, map);
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  public Long saveOrUpdateEMRInHospitalCard(EMRInHospitalCard emrInHospitalCard) {
    this.hibernateTemplate.saveOrUpdate(emrInHospitalCard);
    return emrInHospitalCard.getId();
  }
}
