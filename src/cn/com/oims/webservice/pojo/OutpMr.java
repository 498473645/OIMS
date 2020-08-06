package cn.com.oims.webservice.pojo;

import java.util.Date;
import javax.xml.bind.annotation.XmlType;

@XmlType
public class OutpMr {
  private String patient_id;
  
  private Date visit_date;
  
  private Integer visit_no;
  
  private String illness_desc;
  
  private String body_exam;
  
  private String advice;
  
  private String doctor;
  
  private String last_doctor;
  
  private Integer ordinal = Integer.valueOf(1);
  
  private Float first_visit = Float.valueOf(1.0F);
  
  private String diag_desc;
  
  private String anamnesis;
  
  private String med_history;
  
  private String family_history;
  
  private String allergic_history;
  
  public String getDiag_desc() {
    return this.diag_desc;
  }
  
  public void setDiag_desc(String diag_desc) {
    this.diag_desc = diag_desc;
  }
  
  public String getPatient_id() {
    return this.patient_id;
  }
  
  public void setPatient_id(String patient_id) {
    this.patient_id = patient_id;
  }
  
  public Date getVisit_date() {
    return this.visit_date;
  }
  
  public void setVisit_date(Date visit_date) {
    this.visit_date = visit_date;
  }
  
  public Integer getVisit_no() {
    return this.visit_no;
  }
  
  public void setVisit_no(Integer visit_no) {
    this.visit_no = visit_no;
  }
  
  public String getIllness_desc() {
    return this.illness_desc;
  }
  
  public void setIllness_desc(String illness_desc) {
    this.illness_desc = illness_desc;
  }
  
  public String getBody_exam() {
    return this.body_exam;
  }
  
  public void setBody_exam(String body_exam) {
    this.body_exam = body_exam;
  }
  
  public String getAdvice() {
    return this.advice;
  }
  
  public void setAdvice(String advice) {
    this.advice = advice;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getLast_doctor() {
    return this.last_doctor;
  }
  
  public void setLast_doctor(String last_doctor) {
    this.last_doctor = last_doctor;
  }
  
  public Integer getOrdinal() {
    return this.ordinal;
  }
  
  public void setOrdinal(Integer ordinal) {
    this.ordinal = ordinal;
  }
  
  public Float getFirst_visit() {
    return this.first_visit;
  }
  
  public void setFirst_visit(Float first_visit) {
    this.first_visit = first_visit;
  }
  
  public String getAnamnesis() {
    return this.anamnesis;
  }
  
  public void setAnamnesis(String anamnesis) {
    this.anamnesis = anamnesis;
  }
  
  public String getMed_history() {
    return this.med_history;
  }
  
  public void setMed_history(String med_history) {
    this.med_history = med_history;
  }
  
  public String getFamily_history() {
    return this.family_history;
  }
  
  public void setFamily_history(String family_history) {
    this.family_history = family_history;
  }
  
  public String getAllergic_history() {
    return this.allergic_history;
  }
  
  public void setAllergic_history(String allergic_history) {
    this.allergic_history = allergic_history;
  }
}
