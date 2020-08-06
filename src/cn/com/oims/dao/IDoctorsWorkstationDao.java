package cn.com.oims.dao;

import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.EMRInHospitalCard;
import cn.com.oims.dao.pojo.ExamCheck;
import cn.com.oims.dao.pojo.FollowedUp;
import cn.com.oims.dao.pojo.InquiryComboTreeNode;
import cn.com.oims.dao.pojo.JcxmPertainItem;
import cn.com.oims.dao.pojo.JcxmToHisItem;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.JzZhenduan;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.OutpOrders;
import cn.com.oims.dao.pojo.OutpPresc;
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
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;

public interface IDoctorsWorkstationDao {
  void save(Object paramObject);
  
  void saveOrUpdate(Object paramObject);
  
  void delete(Object paramObject);
  
  List<ShuruMoban> getInputTemplet(String paramString, YuanGong paramYuanGong);
  
  int savePhysicalItemContent(String paramString1, String paramString2, String paramString3);
  
  Long saveOrUpdate_Inquiry(Jzjl paramJzjl);
  
  List findTemplateNoVariable(int paramInt, String paramString);
  
  String[] findVariable(Long paramLong);
  
  List<TemplateVariable> findTemplateVariable(Long paramLong);
  
  int getNumberByVisitState(String paramString1, String paramString2);
  
  Jiuzhen getDiagnosisPatientVisitInfo(String paramString1, String paramString2, String paramString3, Integer paramInteger);
  
  ShiLi getVisionByVisitId(String paramString);
  
  YanYa getIopByVisitId(String paramString);
  
  List<Jiuzhen> getRecordsOfHistory(String paramString1, String paramString2, Long paramLong, String paramString3);
  
  Jzjl getJzjlByVisitIdAndCategoryId(String paramString1, String paramString2);
  
  List<Map<String, Object>> getInspectListByVisitIdAndState(String paramString1, Object paramObject, boolean paramBoolean, String paramString2);
  
  List<Map<String, Object>> getContentByCategory(String paramString1, String paramString2);
  
  List<Map<String, Object>> getInspectsByCategory(String paramString1, String paramString2);
  
  void updateInspectPicPathAndTip(String paramString1, String paramString2, String paramString3, String paramString4);
  
  List<YaoPinType> findPrescriptionList();
  
  List<DrugDict> findMedicines(String paramString);
  
  List<OutpPresc> findSubmitMedicines(Long paramLong);
  
  Long saveOutpOrders(OutpOrders paramOutpOrders);
  
  Long saveOutpPresc(OutpPresc paramOutpPresc);
  
  List<Map<String, Object>> findAdministrations();
  
  Jiuzhen getLastVisit(String paramString1, String paramString2);
  
  List<Map<String, Object>> findFrequencys();
  
  List<OutpPresc> findMedicinesListByIds(List<Long> paramList);
  
  void deleteMedicines(List<OutpPresc> paramList);
  
  List<YuanGong> getFzysToday();
  
  List getTodayPatientList(Integer paramInteger, String paramString1, String paramString2, String paramString3);
  
  FollowedUp findFollowupByVisitId(String paramString);
  
  Integer bingliprintnum(String paramString);
  
  JzZhenduan findJzZhenduan(Long paramLong, Integer paramInteger);
  
  void addExamJcxm(ExamItem paramExamItem, PatientVistInfomation paramPatientVistInfomation, String paramString);
  
  String saveOutpOrdersExam(PatientVistInfomation paramPatientVistInfomation, String paramString);
  
  void saveOutpTreatRecExam(PriceItem paramPriceItem, PatientVistInfomation paramPatientVistInfomation, Object paramObject, String paramString1, int paramInt, String paramString2);
  
  void deleteItemsExam(String paramString);
  
  void deleteOutpTreatRecExam(String paramString);
  
  void addItemsTest(TestItem paramTestItem, PatientVistInfomation paramPatientVistInfomation, Sample paramSample, String paramString);
  
  void deleteTestItem(String paramString);
  
  List<ExamCheck> findSubmintExamCheck(String paramString);
  
  List<TestCheck> findSubmitLis(String paramString);
  
  String getSerialNoFromOutpTreatRec(String paramString);
  
  void deleteOutpOrdersExam(String paramString);
  
  JcxmToHisItem getPriceByJcxmIdAndEyE(String paramString1, String paramString2);
  
  List<InquiryComboTreeNode> findInquiryAndPhysicalCategory(String paramString);
  
  List<ShuruMoban> findInquiryAndPhsicalNode(String paramString1, String paramString2, String paramString3);
  
  List<TemplateVariable> findInquiryAndPhsicalVariable(Long paramLong);
  
  List<DrugDict> getMedicineByKey(String paramString1, String paramString2);
  
  List<DrugDict> findDrugDicts(String paramString, Page paramPage);
  
  void updateDrug(DrugDict paramDrugDict);
  
  List<JcxmPertainItem> findAllJcxmPertain();
  
  int getHisNumberByVisitState(String paramString1, String paramString2);
  
  EMRInHospitalCard getEMRInHospitalCardByJiuZhenID(String paramString);
  
  Long saveOrUpdateEMRInHospitalCard(EMRInHospitalCard paramEMRInHospitalCard);
}
