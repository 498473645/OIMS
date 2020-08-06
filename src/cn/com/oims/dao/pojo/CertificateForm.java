package cn.com.oims.dao.pojo;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class CertificateForm {
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date visitDate;
  
  private String visitNo;
  
  private String patientId;
  
  private String name;
  
  private String sex;
  
  private String age;
  
  private String idNo;
  
  private String unitInContract;
  
  private String visitDept = "230320";
  
  private String doctor;
  
  private String patCondition;
  
  private String advice;
  
  private String check = "0";
  
  private String checkOperator;
  
  private String phoneNumberHome;
  
  private Date enterDateTime = new Date();
  
  private String recNo;
  
  private String conditionNo;
  
  public Date getVisitDate() {
    return this.visitDate;
  }
  
  public void setVisitDate(Date visitDate) {
    this.visitDate = visitDate;
  }
  
  public String getVisitNo() {
    return this.visitNo;
  }
  
  public void setVisitNo(String visitNo) {
    this.visitNo = visitNo;
  }
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getSex() {
    return this.sex;
  }
  
  public void setSex(String sex) {
    this.sex = sex;
  }
  
  public String getAge() {
    return this.age;
  }
  
  public void setAge(String age) {
    this.age = age;
  }
  
  public String getIdNo() {
    return this.idNo;
  }
  
  public void setIdNo(String idNo) {
    this.idNo = idNo;
  }
  
  public String getUnitInContract() {
    return this.unitInContract;
  }
  
  public void setUnitInContract(String unitInContract) {
    this.unitInContract = unitInContract;
  }
  
  public String getVisitDept() {
    return this.visitDept;
  }
  
  public void setVisitDept(String visitDept) {
    this.visitDept = visitDept;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getPatCondition() {
    return this.patCondition;
  }
  
  public void setPatCondition(String patCondition) {
    this.patCondition = patCondition;
  }
  
  public String getAdvice() {
    return this.advice;
  }
  
  public void setAdvice(String advice) {
    this.advice = advice;
  }
  
  public String getCheck() {
    return this.check;
  }
  
  public void setCheck(String check) {
    this.check = check;
  }
  
  public String getCheckOperator() {
    return this.checkOperator;
  }
  
  public void setCheckOperator(String checkOperator) {
    this.checkOperator = checkOperator;
  }
  
  public String getPhoneNumberHome() {
    return this.phoneNumberHome;
  }
  
  public void setPhoneNumberHome(String phoneNumberHome) {
    this.phoneNumberHome = phoneNumberHome;
  }
  
  public Date getEnterDateTime() {
    return this.enterDateTime;
  }
  
  public void setEnterDateTime(Date enterDateTime) {
    this.enterDateTime = enterDateTime;
  }
  
  public String getRecNo() {
    return this.recNo;
  }
  
  public void setRecNo(String recNo) {
    this.recNo = recNo;
  }
  
  public String getConditionNo() {
    return this.conditionNo;
  }
  
  public void setConditionNo(String conditionNo) {
    this.conditionNo = conditionNo;
  }
}
