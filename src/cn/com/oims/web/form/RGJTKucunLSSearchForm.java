package cn.com.oims.web.form;

import com.codesnet.common.MultiUtils;
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class RGJTKucunLSSearchForm extends RGJTKucunSearchForm {
  private Boolean outOrPut;
  
  private String ghs;
  
  private String proposer;
  
  private String name;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date operationDateStart;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date operationDateEnd;
  
  private String typeId;
  
  private Long productId;
  
  private String doctor;
  
  private String patientName;
  
  private String patientId;
  
  private String sn;
  
  private String batchNumber;
  
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
  
  public Boolean getOutOrPut() {
    return this.outOrPut;
  }
  
  public void setOutOrPut(Boolean outOrPut) {
    this.outOrPut = outOrPut;
  }
  
  public String getGhs() {
    return this.ghs;
  }
  
  public void setGhs(String ghs) {
    this.ghs = ghs;
  }
  
  public String getProposer() {
    return this.proposer;
  }
  
  public void setProposer(String proposer) {
    this.proposer = proposer;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public Date getOperationDateStart() {
    return this.operationDateStart;
  }
  
  public void setOperationDateStart(Date operationDateStart) {
    if (operationDateStart != null)
      operationDateStart = MultiUtils.getStartTimeOfDay(operationDateStart); 
    this.operationDateStart = operationDateStart;
  }
  
  public Date getOperationDateEnd() {
    return this.operationDateEnd;
  }
  
  public void setOperationDateEnd(Date operationDateEnd) {
    if (operationDateEnd != null)
      operationDateEnd = MultiUtils.getEndTimeOfDay(operationDateEnd); 
    this.operationDateEnd = operationDateEnd;
  }
  
  public String getTypeId() {
    return this.typeId;
  }
  
  public void setTypeId(String typeId) {
    if (typeId == null || typeId.isEmpty()) {
      this.typeId = null;
    } else {
      this.typeId = typeId;
    } 
  }
}
