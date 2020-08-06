package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class RGJTRukuForm {
  private Long crksqId;
  
  private String proposer;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date applicationDate;
  
  private Integer typeId;
  
  private String note;
  
  private boolean outOrPut;
  
  private Integer ghsId;
  
  private String patientId;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date operationDate;
  
  public Long getCrksqId() {
    return this.crksqId;
  }
  
  public void setCrksqId(Long crksqId) {
    this.crksqId = crksqId;
  }
  
  public String getProposer() {
    return this.proposer;
  }
  
  public void setProposer(String proposer) {
    this.proposer = proposer;
  }
  
  public Date getApplicationDate() {
    return this.applicationDate;
  }
  
  public void setApplicationDate(Date applicationDate) {
    this.applicationDate = applicationDate;
  }
  
  public Integer getTypeId() {
    return this.typeId;
  }
  
  public void setTypeId(Integer typeId) {
    this.typeId = typeId;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public boolean isOutOrPut() {
    return this.outOrPut;
  }
  
  public void setOutOrPut(boolean outOrPut) {
    this.outOrPut = outOrPut;
  }
  
  public Integer getGhsId() {
    return this.ghsId;
  }
  
  public void setGhsId(Integer ghsId) {
    this.ghsId = ghsId;
  }
  
  public Date getOperationDate() {
    return this.operationDate;
  }
  
  public void setOperationDate(Date operationDate) {
    this.operationDate = operationDate;
  }
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
}
