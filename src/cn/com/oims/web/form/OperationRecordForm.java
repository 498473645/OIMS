package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class OperationRecordForm extends OperationPlanForm {
  private Long id;
  
  private String note;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date operationTime;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date operationCompleteTime;
  
  private Integer processState;
  
  private String operationRecord;
  
  private String medicalAfter;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public Date getOperationTime() {
    return this.operationTime;
  }
  
  public void setOperationTime(Date operationTime) {
    this.operationTime = operationTime;
  }
  
  public Date getOperationCompleteTime() {
    return this.operationCompleteTime;
  }
  
  public void setOperationCompleteTime(Date operationCompleteTime) {
    this.operationCompleteTime = operationCompleteTime;
  }
  
  public Integer getProcessState() {
    return this.processState;
  }
  
  public void setProcessState(Integer processState) {
    this.processState = processState;
  }
  
  public String getOperationRecord() {
    return this.operationRecord;
  }
  
  public void setOperationRecord(String operationRecord) {
    this.operationRecord = operationRecord;
  }
  
  public String getMedicalAfter() {
    return this.medicalAfter;
  }
  
  public void setMedicalAfter(String medicalAfter) {
    this.medicalAfter = medicalAfter;
  }
}
