package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "test_check")
public class TestCheck {
  @Id
  private String id;
  
  @Column(name = "patient_source")
  private Integer patientSource;
  
  @Column(name = "patient_id")
  private String patientId;
  
  @Column(name = "visit_id")
  private String visitId;
  
  @Column(name = "patient_name")
  private String patientName;
  
  @Column(name = "requsition_time")
  private Date requsitionTime;
  
  private String doctor;
  
  @Column(name = "item_code")
  private String itemCode;
  
  @Column(name = "item_name")
  private String itemName;
  
  private Float charge;
  
  @Column(name = "sample_code")
  private String sampleCode;
  
  @Column(name = "sample_name")
  private String sampleName;
  
  @Column(name = "charge_indicator")
  private Integer chargeIndicator;
  
  public String getId() {
    return this.id;
  }
  
  public void setId(String id) {
    this.id = id;
  }
  
  public Integer getPatientSource() {
    return this.patientSource;
  }
  
  public void setPatientSource(Integer patientSource) {
    this.patientSource = patientSource;
  }
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  public String getVisitId() {
    return this.visitId;
  }
  
  public void setVisitId(String visitId) {
    this.visitId = visitId;
  }
  
  public String getPatientName() {
    return this.patientName;
  }
  
  public void setPatientName(String patientName) {
    this.patientName = patientName;
  }
  
  public Date getRequsitionTime() {
    return this.requsitionTime;
  }
  
  public void setRequsitionTime(Date requsitionTime) {
    this.requsitionTime = requsitionTime;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getItemCode() {
    return this.itemCode;
  }
  
  public void setItemCode(String itemCode) {
    this.itemCode = itemCode;
  }
  
  public String getItemName() {
    return this.itemName;
  }
  
  public void setItemName(String itemName) {
    this.itemName = itemName;
  }
  
  public Float getCharge() {
    return this.charge;
  }
  
  public void setCharge(Float charge) {
    this.charge = charge;
  }
  
  public String getSampleCode() {
    return this.sampleCode;
  }
  
  public void setSampleCode(String sampleCode) {
    this.sampleCode = sampleCode;
  }
  
  public String getSampleName() {
    return this.sampleName;
  }
  
  public void setSampleName(String sampleName) {
    this.sampleName = sampleName;
  }
  
  public Integer getChargeIndicator() {
    return this.chargeIndicator;
  }
  
  public void setChargeIndicator(Integer chargeIndicator) {
    this.chargeIndicator = chargeIndicator;
  }
}
