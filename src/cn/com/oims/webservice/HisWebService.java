package cn.com.oims.webservice;

import cn.com.oims.dao.pojo.OutpPresc;
import cn.com.oims.dao.pojo.OutpTreatRec;
import cn.com.oims.webservice.pojo.Dept;
import cn.com.oims.webservice.pojo.InHospitalTransfer;
import cn.com.oims.webservice.pojo.OutpMr;
import cn.com.oims.webservice.pojo.Patient;
import cn.com.oims.webservice.pojo.PatientVistInfomation;
import cn.com.oims.webservice.pojo.ResponseObj;
import cn.com.oims.webservice.pojo.exam.ExamItem;
import cn.com.oims.webservice.pojo.his.Certificate;
import cn.com.oims.webservice.pojo.his.ClinicItem;
import cn.com.oims.webservice.pojo.his.ClinicItemClass;
import cn.com.oims.webservice.pojo.his.ClinicItemReport;
import cn.com.oims.webservice.pojo.his.Operaton;
import cn.com.oims.webservice.pojo.his.PriceItem;
import cn.com.oims.webservice.pojo.his.PriceItemClass;
import java.util.Date;
import java.util.List;
import javax.jws.WebService;

@WebService
public interface HisWebService {
  Patient getPatientById(String paramString);
  
  PatientVistInfomation getPatientVistInfomation(String paramString);
  
  List<PriceItemClass> findPriceItemClass(String paramString);
  
  List<PriceItem> findPriceItems(String paramString1, String paramString2, int paramInt1, int paramInt2);
  
  boolean deleteBill(String paramString);
  
  Float getPriceByPriceCode(String paramString1, String paramString2);
  
  List<ClinicItemClass> findClinicItemClass(String paramString, int paramInt1, int paramInt2);
  
  List<ClinicItem> findClinicItems(String paramString1, String paramString2, String paramString3, int paramInt1, int paramInt2);
  
  Float getPriceByClinicItemCode(String paramString1, String paramString2);
  
  PriceItem getPriceItemByPriceCode(String paramString);
  
  ResponseObj addClinicItem(ClinicItem paramClinicItem, PatientVistInfomation paramPatientVistInfomation, String paramString);
  
  boolean deleteClinicItem(String paramString, String[] paramArrayOfString);
  
  int getClinicItemFlagByClinicNo(String paramString);
  
  int getPaymentFlagByBillNoCollection(String[] paramArrayOfString);
  
  int getPaymentFlagByBillNo(String paramString);
  
  ClinicItemReport getClinicReport(String paramString);
  
  List<Dept> findClinicItemDept(String paramString);
  
  String addOutpOrders(PatientVistInfomation paramPatientVistInfomation);
  
  String addBill(PriceItem paramPriceItem, PatientVistInfomation paramPatientVistInfomation, String paramString1, String paramString2, int paramInt, String paramString3, Integer paramInteger);
  
  Integer addOutpPresc(OutpPresc paramOutpPresc);
  
  Integer findOutpPrescByPK(OutpPresc paramOutpPresc);
  
  void addOutpTeatRec(OutpTreatRec paramOutpTreatRec);
  
  void deleteOutpPresc(String paramString);
  
  void deleteOutpTreatRec(String paramString);
  
  boolean isOutTreatRecCharge(String paramString);
  
  boolean isDeleteOutpPresc(List<OutpPresc> paramList);
  
  ResponseObj addEyeExam(ExamItem paramExamItem, PatientVistInfomation paramPatientVistInfomation, Integer paramInteger);
  
  ResponseObj addNEWOutp(ExamItem paramExamItem, PatientVistInfomation paramPatientVistInfomation, Integer paramInteger);
  
  PriceItem getPriceItemByCode(String paramString);
  
  Boolean getSpecialHospitalTreatFlag(String paramString);
  
  Boolean getLisFlag(String paramString);
  
  List<PatientVistInfomation> getPatientVisitInfoMationsByPatientId(String paramString);
  
  String saveOperationRecord(Operaton paramOperaton);
  
  void updateOperationRecord(Operaton paramOperaton);
  
  void deleteOperationRecord(Operaton paramOperaton);
  
  Date findLastTimeByBlhAndHaoma(String paramString1, String paramString2);
  
  List<Patient> findPatsInHospital(String paramString);
  
  String[] virtualRegistration(String paramString);
  
  void updateOutpTreatRecExecuteState(String paramString);
  
  List<Certificate> findDiagnosiCertificate(String paramString1, String paramString2, String paramString3);
  
  void saveOrUpdateCertificate(Certificate paramCertificate);
  
  void delCertificatesByConditionNo(String paramString);
  
  void delCertificates(Certificate paramCertificate);
  
  Integer findHzInHospital(String paramString);
  
  void addOUTPMR(OutpMr paramOutpMr);
  
  void updateOUTPMR(OutpMr paramOutpMr);
  
  OutpMr findOUTPMR(Date paramDate, Integer paramInteger);
  
  String saveInHospitalCard(InHospitalTransfer paramInHospitalTransfer);
  
  String updateInHospitalCard(InHospitalTransfer paramInHospitalTransfer);
  
  Integer billingProcess(String paramString);
}
