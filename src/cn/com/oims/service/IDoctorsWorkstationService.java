package cn.com.oims.service;

import cn.com.oims.dao.pojo.*;
import cn.com.oims.web.form.Disgnosis;
import cn.com.oims.web.form.JCTSPaintForm;
import cn.com.oims.web.form.PaintForm;
import cn.com.oims.webservice.pojo.Dept;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.ResponseObj;
import com.codesnet.common.Page;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@Service
public interface IDoctorsWorkstationService {
  Long saveOrUpdate_Inquiry(Jzjl paramJzjl);

  List<ShuruMoban> findTemplate(int paramInt, String paramString);

  List<TemplateVariable> findTemplateVariable(Long paramLong);

  List<ShuruMoban> getInputTemplet(String paramString, User paramUser);

  boolean savePhysicalItemContent(String paramString1, String paramString2, String paramString3);

  int getNumberByVisitState(String paramString1, String paramString2);

  JSONObject getDiagnosisPatientInfo(String paramString1, String paramString2, String paramString3);

  JSONArray saveInspcetOrder(JSONObject paramJSONObject);

  String savePaint(PaintForm paramPaintForm, HttpServletRequest paramHttpServletRequest) throws Exception;

  HashMap<String, Object> getPrintData(String paramString);

  JSONArray getCompareData(String paramString);

  List<Map<String, Object>> getInspectsByCategory(String paramString1, String paramString2);

  JSONObject getReportDataByInspectId(String paramString);

  void updateInspectPicPathAndTip(String paramString1, String paramString2, String paramString3, String paramString4);

  List getOrderListByVisitId(String paramString);

  List<YaoPinType> findPrescriptionList();

  Map<String, Object> findMedicines(String paramString1, String paramString2, String paramString3);

  List<OutpPresc> savePrescription(String paramString1, String paramString2, String paramString3, String paramString4);

  void deleteMedicines(List<Long> paramList);

  List<OutpPresc> findSubmitMedicines(String paramString);

  List<Map<String, Object>> getJcxmPertainItemsByJcxmId(Integer paramInteger1, Integer paramInteger2);

  List<Map<String, Object>> findAdministrations();

  List<Map<String, Object>> findFrequencys();

  JSONArray getUnpayApplyOrderList(String paramString1, String paramString2);

  List saveDiagnosis(String paramString1, String paramString2);

  void deleteDiagnosis(String paramString);

  String saveOrUpdateVision(String paramString1, String paramString2);

  String saveOrUpdateIop(String paramString1, String paramString2);

  JSONObject getLastTimeInfo(String paramString1, String paramString2);

  JSONObject validateTabSwitch(String paramString1, String paramString2);

  List<YuanGong> getFzysToday();

  JSONObject getPrescPrintData(String paramString1, String paramString2, String paramString3);

  List getHandleProjectByPinyin(String paramString, boolean paramBoolean);

  List getHandlePertain(String paramString, Integer paramInteger);

  List saveHandleOrders(String paramString1, String paramString2, String paramString3);

  List getExistHandleOrders(String paramString);

  List delHandleOrders(String paramString);

  JSONArray getHandlePrintData(Long paramLong, String paramString);

  void saveOldEyeSysClinic(Long paramLong);

  void clearPaint(String paramString1, String paramString2, String paramString3);

  void saveOrUpdateFollowedUp(String paramString1, String paramString2, String paramString3);

  FollowedUp findFollowdUpByVisitId(String paramString);

  void savebingliprint(String paramString1, String paramString2);

  Integer bingliprintnum(String paramString);

  void updateOldEyeSysClinic(Long paramLong);

  void saveAllDiagnosis(Vector<Disgnosis> paramVector, String paramString);

  List<ResponseObj> addExamItem(JSONArray paramJSONArray);

  void deleteExamItem(JSONArray paramJSONArray);

  List<String> addTestItem(JSONArray paramJSONArray);

  void deleteTestItem(JSONArray paramJSONArray);

  List<ExamCheck> findSubmitExamItems(String paramString);

  List<TestCheck> findSubmitLis(String paramString);

  Float getPriceByJcxmIdAndEyE(String paramString1, String paramString2);

  void saveJCTSPaint(JCTSPaintForm paramJCTSPaintForm, HttpServletRequest paramHttpServletRequest);

  List<InquiryComboTreeNode> findInquiryAndPhysicalCategory(String paramString);

  JSONArray findInquiryAndPhsicalNode(String paramString1, String paramString2, String paramString3);

  Map<String, Object> showPrescription(String paramString, Page paramPage);

  void handleProjectToJcxm();

  void fuShuSyncro();

  void syncroYuangongGonghao();

  HuanZheXinXi syncronizePatient(PatientVistInfomation paramPatientVistInfomation);

  void syncroFuShu();

  List<PatientVistInfomation> getZhuYuanPatient(String paramString);

  List<EyeInfoOutpClinic> getEyeInfoOutpClinicList(String paramString);

  int getHisNumberByVisitState(String paramString1, String paramString2);

  EMRInHospitalCard getEMRInHospitalCardByJiuZhenID(String paramString);

  Long saveOrUpdateEMRInHospitalCard(EMRInHospitalCard paramEMRInHospitalCard);
}
