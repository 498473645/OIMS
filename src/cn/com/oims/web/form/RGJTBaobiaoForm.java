package cn.com.oims.web.form;

import java.io.Serializable;
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class RGJTBaobiaoForm implements Serializable {
  private Boolean beiku;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date startDate;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date endDate;
  
  private Long productId;
  
  private String doctor;
  
  private String patientName;
  
  private String patientId;
  
  private String sn;
  
  private String batchNumber;
  
  private String nurse;
  
  public String getPatientName() {
    return this.patientName;
  }
  
  public void setPatientName(String patientName) {
    this.patientName = patientName;
  }
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  public String getSn() {
    return this.sn;
  }
  
  public void setSn(String sn) {
    this.sn = sn;
  }
  
  public String getBatchNumber() {
    return this.batchNumber;
  }
  
  public void setBatchNumber(String batchNumber) {
    this.batchNumber = batchNumber;
  }
  
  public String getNurse() {
    return this.nurse;
  }
  
  public void setNurse(String nurse) {
    this.nurse = nurse;
  }
  
  public Boolean getBeiku() {
    return this.beiku;
  }
  
  public void setBeiku(Boolean beiku) {
    this.beiku = beiku;
  }
  
  public Date getStartDate() {
    return this.startDate;
  }
  
  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }
  
  public Date getEndDate() {
    return this.endDate;
  }
  
  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }
  
  public Long getProductId() {
    return this.productId;
  }
  
  public void setProductId(Long productId) {
    this.productId = productId;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
}
