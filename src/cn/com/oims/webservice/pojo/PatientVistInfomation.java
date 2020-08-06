package cn.com.oims.webservice.pojo;

import java.util.Date;
import javax.xml.bind.annotation.XmlType;

@XmlType
public class PatientVistInfomation {
  private Patient patient;
  
  private String visitNo;
  
  private String jiuzhenId;
  
  private String deptCode;
  
  private String deptName;
  
  private String doctorNo;
  
  private String doctorName;
  
  private Date visitDate;
  
  private int visitFlag;
  
  private Date outDate;
  
  private String diseases;
  
  private int chargeType;
  
  private String chargeTypeChineseName;
  
  private String mailingAddress;
  
  private String examClass;
  
  private String clinSYMP;
  
  private String examSubClass;
  
  private String clinDiag;
  
  private int patientSource;
  
  private Date reqDateTime;
  
  private String reqDept;
  
  private String reqPhysician;
  
  private String areaCode;
  
  private String areaName;
  
  private String bedNo;
  
  private Boolean urgent;
  
  private String contact;
  
  private String contactTel;
  
  private String contactMobile;
  
  private Integer preExam;
  
  public Boolean getUrgent() {
    return this.urgent;
  }
  
  public void setUrgent(Boolean urgent) {
    this.urgent = urgent;
  }
  
  public String getChargeTypeChineseName() {
    return this.chargeTypeChineseName;
  }
  
  public String getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(String jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  public void setChargeTypeChineseName(String chargeTypeChineseName) {
    this.chargeTypeChineseName = chargeTypeChineseName;
  }
  
  public String getClinDiag() {
    return (this.clinDiag == null) ? null : this.clinDiag.replaceAll("'", "’");
  }
  
  public void setClinDiag(String clinDiag) {
    this.clinDiag = clinDiag;
  }
  
  public Date getReqDateTime() {
    return this.reqDateTime;
  }
  
  public void setReqDateTime(Date reqDateTime) {
    this.reqDateTime = reqDateTime;
  }
  
  public String getReqDept() {
    return this.reqDept;
  }
  
  public void setReqDept(String reqDept) {
    this.reqDept = reqDept;
  }
  
  public String getReqPhysician() {
    return this.reqPhysician;
  }
  
  public void setReqPhysician(String reqPhysician) {
    this.reqPhysician = reqPhysician;
  }
  
  public String getExamSubClass() {
    return this.examSubClass;
  }
  
  public void setExamSubClass(String examSubClass) {
    this.examSubClass = examSubClass;
  }
  
  public String getClinSYMP() {
    return this.clinSYMP;
  }
  
  public void setClinSYMP(String clinSYMP) {
    this.clinSYMP = clinSYMP;
  }
  
  public String getExamClass() {
    return this.examClass;
  }
  
  public void setExamClass(String examClass) {
    this.examClass = examClass;
  }
  
  public String getMailingAddress() {
    return this.mailingAddress;
  }
  
  public void setMailingAddress(String mailingAddress) {
    this.mailingAddress = mailingAddress;
  }
  
  public int getChargeType() {
    return this.chargeType;
  }
  
  public void setChargeType(int chargeType) {
    this.chargeType = chargeType;
  }
  
  public Patient getPatient() {
    return this.patient;
  }
  
  public void setPatient(Patient patient) {
    this.patient = patient;
  }
  
  public String getVisitNo() {
    return this.visitNo;
  }
  
  public void setVisitNo(String visitNo) {
    this.visitNo = visitNo;
  }
  
  public String getDeptCode() {
    return this.deptCode;
  }
  
  public int getPatientSource() {
    return this.patientSource;
  }
  
  public void setPatientSource(int patientSource) {
    this.patientSource = patientSource;
  }
  
  public void setDeptCode(String deptCode) {
    this.deptCode = deptCode;
  }
  
  public String getDoctorNo() {
    return this.doctorNo;
  }
  
  public void setDoctorNo(String doctorNo) {
    this.doctorNo = doctorNo;
  }
  
  public Date getVisitDate() {
    return this.visitDate;
  }
  
  public void setVisitDate(Date visitDate) {
    this.visitDate = visitDate;
  }
  
  public int getVisitFlag() {
    return this.visitFlag;
  }
  
  public void setVisitFlag(int visitFlag) {
    this.visitFlag = visitFlag;
  }
  
  public Date getOutDate() {
    return this.outDate;
  }
  
  public void setOutDate(Date outDate) {
    this.outDate = outDate;
  }
  
  public String getDiseases() {
    return this.diseases;
  }
  
  public void setDiseases(String diseases) {
    this.diseases = diseases;
  }
  
  public String getDoctorName() {
    return this.doctorName;
  }
  
  public void setDoctorName(String doctorName) {
    this.doctorName = doctorName;
  }
  
  public String getDeptName() {
    return this.deptName;
  }
  
  public void setDeptName(String deptName) {
    this.deptName = deptName;
  }
  
  public String getBedNo() {
    return this.bedNo;
  }
  
  public void setBedNo(String bedNo) {
    this.bedNo = bedNo;
  }
  
  public String getContact() {
    return this.contact;
  }
  
  public void setContact(String contact) {
    this.contact = contact;
  }
  
  public String getContactTel() {
    return this.contactTel;
  }
  
  public void setContactTel(String contactTel) {
    this.contactTel = contactTel;
  }
  
  public String getContactMobile() {
    return this.contactMobile;
  }
  
  public void setContactMobile(String contactMobile) {
    this.contactMobile = contactMobile;
  }
  
  public String getAreaCode() {
    return this.areaCode;
  }
  
  public void setAreaCode(String areaCode) {
    this.areaCode = areaCode;
  }
  
  public String getAreaName() {
    return this.areaName;
  }
  
  public void setAreaName(String areaName) {
    this.areaName = areaName;
  }
  
  public Integer getPreExam() {
    return this.preExam;
  }
  
  public void setPreExam(Integer preExam) {
    this.preExam = preExam;
  }
}
