package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class OperationSearchForm {
  private String patientName;
  
  private String patientId;
  
  private String operationName;
  
  private Integer deptId;
  
  private String doctor;
  
  private String process;
  
  private Integer category;
  
  private String search;
  
  private Integer operationRoomId;
  
  private Integer levelFlag;
  
  private Boolean isprint = Boolean.valueOf(false);
  
  private String strOperRooms;
  
  private Boolean urgent = Boolean.valueOf(false);
  
  private String diseases;
  
  private Integer operationSize;
  
  private String circuitNurse;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date appointmentTimeStart;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date appointmentTimeEnd;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date operationTimeStart;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date operationTimeEnd;
  
  public Integer getOperationSize() {
    return this.operationSize;
  }
  
  public void setOperationSize(Integer operationSize) {
    this.operationSize = operationSize;
  }
  
  public String getCircuitNurse() {
    return this.circuitNurse;
  }
  
  public void setCircuitNurse(String circuitNurse) {
    this.circuitNurse = circuitNurse;
  }
  
  public String getDiseases() {
    return this.diseases;
  }
  
  public void setDiseases(String diseases) {
    this.diseases = diseases;
  }
  
  public Boolean getUrgent() {
    return this.urgent;
  }
  
  public void setUrgent(Boolean urgent) {
    this.urgent = urgent;
  }
  
  public String getStrOperRooms() {
    return this.strOperRooms;
  }
  
  public void setStrOperRooms(String strOperRooms) {
    this.strOperRooms = strOperRooms;
  }
  
  public Boolean getIsprint() {
    return this.isprint;
  }
  
  public void setIsprint(Boolean isprint) {
    this.isprint = isprint;
  }
  
  public Integer getLevelFlag() {
    return this.levelFlag;
  }
  
  public void setLevelFlag(Integer levelFlag) {
    this.levelFlag = levelFlag;
  }
  
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
  
  public String getOperationName() {
    return this.operationName;
  }
  
  public void setOperationName(String operationName) {
    this.operationName = operationName;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getProcess() {
    return this.process;
  }
  
  public void setProcess(String process) {
    this.process = process;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    this.search = search;
  }
  
  public Integer getDeptId() {
    return this.deptId;
  }
  
  public void setDeptId(Integer deptId) {
    this.deptId = deptId;
  }
  
  public Date getAppointmentTimeStart() {
    return this.appointmentTimeStart;
  }
  
  public void setAppointmentTimeStart(Date appointmentTimeStart) {
    this.appointmentTimeStart = appointmentTimeStart;
  }
  
  public Date getAppointmentTimeEnd() {
    return this.appointmentTimeEnd;
  }
  
  public void setAppointmentTimeEnd(Date appointmentTimeEnd) {
    this.appointmentTimeEnd = appointmentTimeEnd;
  }
  
  public Date getOperationTimeStart() {
    return this.operationTimeStart;
  }
  
  public void setOperationTimeStart(Date operationTimeStart) {
    this.operationTimeStart = operationTimeStart;
  }
  
  public Date getOperationTimeEnd() {
    return this.operationTimeEnd;
  }
  
  public void setOperationTimeEnd(Date operationTimeEnd) {
    this.operationTimeEnd = operationTimeEnd;
  }
  
  public Integer getOperationRoomId() {
    return this.operationRoomId;
  }
  
  public void setOperationRoomId(Integer operationRoomId) {
    this.operationRoomId = operationRoomId;
  }
}
