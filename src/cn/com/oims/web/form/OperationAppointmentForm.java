package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class OperationAppointmentForm {
  private Long id;
  
  private Integer category;
  
  private Integer childCategory;
  
  private Integer operationSize;
  
  private Integer levelFlag;
  
  private Long patientId;
  
  private Long visitId;
  
  private String condition;
  
  private String medical;
  
  private String contact;
  
  private String tel;
  
  private String mobile;
  
  private String part;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date appointmentTime;
  
  private Integer groupId;
  
  private String doctor;
  
  private String[] operationDictIds;
  
  private String[] eyes;
  
  private String note;
  
  private String areaCode;
  
  private String area;
  
  private String bedNo;
  
  private Boolean urgent;
  
  private Integer isolation;
  
  private Integer geli_category;
  
  public Integer getGeli_category() {
    return this.geli_category;
  }
  
  public void setGeli_category(Integer geli_category) {
    this.geli_category = geli_category;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
  
  public Integer getChildCategory() {
    return this.childCategory;
  }
  
  public void setChildCategory(Integer childCategory) {
    this.childCategory = childCategory;
  }
  
  public Long getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(Long patientId) {
    this.patientId = patientId;
  }
  
  public Long getVisitId() {
    return this.visitId;
  }
  
  public void setVisitId(Long visitId) {
    this.visitId = visitId;
  }
  
  public String getMedical() {
    return this.medical;
  }
  
  public void setMedical(String medical) {
    this.medical = medical;
  }
  
  public String getPart() {
    return this.part;
  }
  
  public void setPart(String part) {
    this.part = part;
  }
  
  public Date getAppointmentTime() {
    return this.appointmentTime;
  }
  
  public void setAppointmentTime(Date appointmentTime) {
    this.appointmentTime = appointmentTime;
  }
  
  public Integer getGroupId() {
    return this.groupId;
  }
  
  public void setGroupId(Integer groupId) {
    this.groupId = groupId;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getContact() {
    return this.contact;
  }
  
  public void setContact(String contact) {
    this.contact = contact;
  }
  
  public String getTel() {
    return this.tel;
  }
  
  public void setTel(String tel) {
    this.tel = tel;
  }
  
  public String getMobile() {
    return this.mobile;
  }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public Integer getOperationSize() {
    return this.operationSize;
  }
  
  public void setOperationSize(Integer operationSize) {
    this.operationSize = operationSize;
  }
  
  public Integer getLevelFlag() {
    return this.levelFlag;
  }
  
  public void setLevelFlag(Integer levelFlag) {
    this.levelFlag = levelFlag;
  }
  
  public String[] getOperationDictIds() {
    return this.operationDictIds;
  }
  
  public void setOperationDictIds(String[] operationDictIds) {
    this.operationDictIds = operationDictIds;
  }
  
  public String[] getEyes() {
    return this.eyes;
  }
  
  public void setEyes(String[] eyes) {
    this.eyes = eyes;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getArea() {
    return this.area;
  }
  
  public void setArea(String area) {
    this.area = area;
  }
  
  public String getBedNo() {
    return this.bedNo;
  }
  
  public void setBedNo(String bedNo) {
    this.bedNo = bedNo;
  }
  
  public Boolean getUrgent() {
    return this.urgent;
  }
  
  public void setUrgent(Boolean urgent) {
    this.urgent = urgent;
  }
  
  public String getCondition() {
    return this.condition;
  }
  
  public void setCondition(String condition) {
    this.condition = condition;
  }
  
  public String getAreaCode() {
    return this.areaCode;
  }
  
  public void setAreaCode(String areaCode) {
    this.areaCode = areaCode;
  }
  
  public Integer getIsolation() {
    return this.isolation;
  }
  
  public void setIsolation(Integer isolation) {
    this.isolation = isolation;
  }
}
