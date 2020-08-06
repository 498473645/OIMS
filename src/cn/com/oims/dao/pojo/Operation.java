package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "emr_operation")
public class Operation implements Serializable {
  private static final long serialVersionUID = -3548456255066556060L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_operation_sequence")
  @SequenceGenerator(name = "emr_operation_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_operation_sequence")
  private Long id;
  
  @Index(name = "patientId")
  @Column(name = "patient_id", nullable = false)
  private Long patientId;
  
  @Column(name = "contact", length = 30)
  private String contact;
  
  @Index(name = "tel")
  @Column(name = "tel", length = 30)
  private String tel;
  
  @Index(name = "mobile")
  @Column(length = 30)
  private String mobile;
  
  @Index(name = "visitId")
  @Column(name = "visit_id")
  private Long visitId;
  
  @Column(length = 2000)
  private String condition;
  
  @Index(name = "category")
  private Integer category;
  
  @Index(name = "childCategory")
  @Column(name = "child_category")
  private Integer childCategory;
  
  @Column(name = "area_code", length = 30)
  private String areaCode;
  
  @Column(length = 50, name = "room_area")
  private String area;
  
  @Column(name = "bed_no", length = 30)
  private String bedNo;
  
  @Column(nullable = false, length = 500)
  private String medical;
  
  @Column(name = "operation_size")
  private Integer operationSize;
  
  @Column(name = "level_flag", nullable = false)
  private Integer levelFlag;
  
  private Integer anesthesia;
  
  @Column(length = 30)
  private String anesthetist;
  
  @Column(name = "appointment_time")
  private Date appointmentTime;
  
  @Column(name = "operation_time", nullable = true)
  private Date operationTime;
  
  @Column(length = 30)
  private String doctor;
  
  @Column(name = "circuit_nurse", length = 30)
  private String circuitNurse;
  
  @Column(name = "instrument_nurse", length = 30)
  private String instrumentNurse;
  
  @Column(name = "first_assistant")
  private String firstAssistant;
  
  @Column(name = "second_assistant", length = 30)
  private String secondAssistant;
  
  @Column(name = "operation_room_id")
  private Integer operationRoomId;
  
  @Column(length = 2000)
  private String note;
  
  @Column(name = "group_id")
  private Integer groupId;
  
  @Column(name = "insert_user", nullable = false, length = 30)
  private String insertUser;
  
  @Column(name = "insert_time", nullable = false)
  private Date insertTime;
  
  @Column(length = 30, name = "proposer_doctor")
  private String proposerDoctor;
  
  @Column(name = "application_time")
  private Date applicationTime;
  
  @Column(length = 30)
  private String planner;
  
  @Column(name = "plan_time")
  private Date planTime;
  
  @Column(name = "process_state")
  private int processState;
  
  @Column(name = "operation_complete_time")
  private Date operationCompleteTime;
  
  @Column(length = 2000, name = "operation_record")
  private String operationRecord;
  
  @Column(length = 30)
  private String recorder;
  
  @Column(name = "record_time")
  private Date recordTime;
  
  @Column(name = "drbc")
  private boolean drugResistanceBacteriaCarrier;
  
  private Boolean urgent;
  
  private Integer isolation;
  
  @Column(name = "medical_after", length = 500)
  private String medicalAfter;
  
  private Boolean send;
  
  @Column(name = "send_msg", length = 500)
  private String sendMsg;
  
  private Integer geli_category;
  
  @Column(name = "operation_order_num")
  private String operationOrderNum;
  
  @Transient
  private List<OperationDetail> operationDetails;
  
  @Column(name = "nurseNote")
  private String nurse_note;
  
  public String getNurse_note() {
    return this.nurse_note;
  }
  
  public void setNurse_note(String nurse_note) {
    this.nurse_note = nurse_note;
  }
  
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
  
  public Long getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(Long patientId) {
    this.patientId = patientId;
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
  
  public Long getVisitId() {
    return this.visitId;
  }
  
  public void setVisitId(Long visitId) {
    this.visitId = visitId;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
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
  
  public String getMedical() {
    return this.medical;
  }
  
  public void setMedical(String medical) {
    this.medical = medical;
  }
  
  public Integer getOperationSize() {
    return this.operationSize;
  }
  
  public void setOperationSize(Integer operationSize) {
    this.operationSize = operationSize;
  }
  
  public Integer getAnesthesia() {
    return this.anesthesia;
  }
  
  public void setAnesthesia(Integer anesthesia) {
    this.anesthesia = anesthesia;
  }
  
  public String getAnesthetist() {
    return this.anesthetist;
  }
  
  public void setAnesthetist(String anesthetist) {
    this.anesthetist = anesthetist;
  }
  
  public Date getAppointmentTime() {
    return this.appointmentTime;
  }
  
  public void setAppointmentTime(Date appointmentTime) {
    this.appointmentTime = appointmentTime;
  }
  
  public Date getOperationTime() {
    return this.operationTime;
  }
  
  public void setOperationTime(Date operationTime) {
    this.operationTime = operationTime;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getCircuitNurse() {
    return this.circuitNurse;
  }
  
  public void setCircuitNurse(String circuitNurse) {
    this.circuitNurse = circuitNurse;
  }
  
  public String getInstrumentNurse() {
    return this.instrumentNurse;
  }
  
  public void setInstrumentNurse(String instrumentNurse) {
    this.instrumentNurse = instrumentNurse;
  }
  
  public String getFirstAssistant() {
    return this.firstAssistant;
  }
  
  public void setFirstAssistant(String firstAssistant) {
    this.firstAssistant = firstAssistant;
  }
  
  public String getSecondAssistant() {
    return this.secondAssistant;
  }
  
  public void setSecondAssistant(String secondAssistant) {
    this.secondAssistant = secondAssistant;
  }
  
  public Integer getOperationRoomId() {
    return this.operationRoomId;
  }
  
  public void setOperationRoomId(Integer operationRoomId) {
    this.operationRoomId = operationRoomId;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public Integer getLevelFlag() {
    return this.levelFlag;
  }
  
  public void setLevelFlag(Integer levelFlag) {
    this.levelFlag = levelFlag;
  }
  
  public Integer getGroupId() {
    return this.groupId;
  }
  
  public void setGroupId(Integer groupId) {
    this.groupId = groupId;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getInsertTime() {
    return this.insertTime;
  }
  
  public void setInsertTime(Date insertTime) {
    this.insertTime = insertTime;
  }
  
  public String getProposerDoctor() {
    return this.proposerDoctor;
  }
  
  public void setProposerDoctor(String proposerDoctor) {
    this.proposerDoctor = proposerDoctor;
  }
  
  public Date getApplicationTime() {
    return this.applicationTime;
  }
  
  public void setApplicationTime(Date applicationTime) {
    this.applicationTime = applicationTime;
  }
  
  public String getPlanner() {
    return this.planner;
  }
  
  public void setPlanner(String planner) {
    this.planner = planner;
  }
  
  public Date getPlanTime() {
    return this.planTime;
  }
  
  public void setPlanTime(Date planTime) {
    this.planTime = planTime;
  }
  
  public int getProcessState() {
    return this.processState;
  }
  
  public void setProcessState(int processState) {
    this.processState = processState;
  }
  
  public Date getOperationCompleteTime() {
    return this.operationCompleteTime;
  }
  
  public void setOperationCompleteTime(Date operationCompleteTime) {
    this.operationCompleteTime = operationCompleteTime;
  }
  
  public String getOperationRecord() {
    return this.operationRecord;
  }
  
  public void setOperationRecord(String operationRecord) {
    this.operationRecord = operationRecord;
  }
  
  public String getRecorder() {
    return this.recorder;
  }
  
  public void setRecorder(String recorder) {
    this.recorder = recorder;
  }
  
  public Date getRecordTime() {
    return this.recordTime;
  }
  
  public void setRecordTime(Date recordTime) {
    this.recordTime = recordTime;
  }
  
  public List<OperationDetail> getOperationDetails() {
    return this.operationDetails;
  }
  
  public void setOperationDetails(List<OperationDetail> operationDetails) {
    this.operationDetails = operationDetails;
  }
  
  public boolean isDrugResistanceBacteriaCarrier() {
    return this.drugResistanceBacteriaCarrier;
  }
  
  public void setDrugResistanceBacteriaCarrier(boolean drugResistanceBacteriaCarrier) {
    this.drugResistanceBacteriaCarrier = drugResistanceBacteriaCarrier;
  }
  
  public Boolean getUrgent() {
    return this.urgent;
  }
  
  public void setUrgent(Boolean urgent) {
    this.urgent = urgent;
  }
  
  public Integer getChildCategory() {
    return this.childCategory;
  }
  
  public void setChildCategory(Integer childCategory) {
    this.childCategory = childCategory;
  }
  
  public String getAreaCode() {
    return this.areaCode;
  }
  
  public void setAreaCode(String areaCode) {
    this.areaCode = areaCode;
  }
  
  public String getCondition() {
    return this.condition;
  }
  
  public void setCondition(String condition) {
    this.condition = condition;
  }
  
  public Integer getIsolation() {
    return this.isolation;
  }
  
  public void setIsolation(Integer isolation) {
    this.isolation = isolation;
  }
  
  public String getMedicalAfter() {
    return this.medicalAfter;
  }
  
  public void setMedicalAfter(String medicalAfter) {
    this.medicalAfter = medicalAfter;
  }
  
  public Boolean getSend() {
    return this.send;
  }
  
  public void setSend(Boolean send) {
    this.send = send;
  }
  
  public String getSendMsg() {
    return this.sendMsg;
  }
  
  public void setSendMsg(String sendMsg) {
    this.sendMsg = sendMsg;
  }
  
  public String getOperationOrderNum() {
    return this.operationOrderNum;
  }
  
  public void setOperationOrderNum(String operationOrderNum) {
    this.operationOrderNum = operationOrderNum;
  }
}
