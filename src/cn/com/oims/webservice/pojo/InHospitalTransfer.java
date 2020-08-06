package cn.com.oims.webservice.pojo;

import javax.xml.bind.annotation.XmlType;

@XmlType
public class InHospitalTransfer {
  private String visit_date;
  
  private String visit_no;
  
  private String patient_id;
  
  private String pre_dept;
  
  private String special_desc;
  
  private String ordered_by;
  
  private String doctor_name;
  
  private String pre_perment;
  
  private String create_date;
  
  private String pre_condition;
  
  private String status;
  
  private String priority;
  
  private String inpCardType;
  
  private String patTypeCode;
  
  private String outp_diagnosis;
  
  public String getVisit_date() {
    return this.visit_date;
  }
  
  public void setVisit_date(String visit_date) {
    this.visit_date = visit_date;
  }
  
  public String getVisit_no() {
    return this.visit_no;
  }
  
  public void setVisit_no(String visit_no) {
    this.visit_no = visit_no;
  }
  
  public String getPatient_id() {
    return this.patient_id;
  }
  
  public void setPatient_id(String patient_id) {
    this.patient_id = patient_id;
  }
  
  public String getPre_dept() {
    return this.pre_dept;
  }
  
  public void setPre_dept(String pre_dept) {
    this.pre_dept = pre_dept;
  }
  
  public String getSpecial_desc() {
    return this.special_desc;
  }
  
  public void setSpecial_desc(String special_desc) {
    this.special_desc = special_desc;
  }
  
  public String getOrdered_by() {
    return this.ordered_by;
  }
  
  public void setOrdered_by(String ordered_by) {
    this.ordered_by = ordered_by;
  }
  
  public String getDoctor_name() {
    return this.doctor_name;
  }
  
  public void setDoctor_name(String doctor_name) {
    this.doctor_name = doctor_name;
  }
  
  public String getPre_perment() {
    return this.pre_perment;
  }
  
  public void setPre_perment(String pre_perment) {
    this.pre_perment = pre_perment;
  }
  
  public String getCreate_date() {
    return this.create_date;
  }
  
  public void setCreate_date(String create_date) {
    this.create_date = create_date;
  }
  
  public String getPre_condition() {
    return this.pre_condition;
  }
  
  public void setPre_condition(String pre_condition) {
    this.pre_condition = pre_condition;
  }
  
  public String getStatus() {
    return this.status;
  }
  
  public void setStatus(String status) {
    this.status = status;
  }
  
  public String getPriority() {
    return this.priority;
  }
  
  public void setPriority(String priority) {
    this.priority = priority;
  }
  
  public String getInpCardType() {
    return this.inpCardType;
  }
  
  public void setInpCardType(String inpCardType) {
    this.inpCardType = inpCardType;
  }
  
  public String getPatTypeCode() {
    return this.patTypeCode;
  }
  
  public void setPatTypeCode(String patTypeCode) {
    this.patTypeCode = patTypeCode;
  }
  
  public String getOutp_diagnosis() {
    return this.outp_diagnosis;
  }
  
  public void setOutp_diagnosis(String outp_diagnosis) {
    this.outp_diagnosis = outp_diagnosis;
  }
}
