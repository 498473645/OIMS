package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "emr_operation_appointment")
public class EMROperationAppointment implements Serializable {
  private static final long serialVersionUID = 6738324142302265324L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_operation_appointment_sequence")
  @SequenceGenerator(name = "emr_operation_appointment_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_operation_appointment_sequence")
  private Long id;
  
  @Index(name = "patient_id")
  @Column(name = "patient_id", nullable = false)
  private Long patientId;
  
  @Column(name = "visit_id")
  private Long visitId;
  
  private Integer category;
  
  @Column(length = 50)
  private String area;
  
  @Column(name = "bed_no", length = 30)
  private String bedNo;
  
  @Column(nullable = false, length = 500)
  private String medical;
  
  @Column(name = "operation_name", length = 2000)
  private String operationName;
  
  @Column(name = "operation_dict_ids", nullable = false, length = 50)
  private String operationDictIds;
  
  @Column(name = "operation_level", nullable = false)
  private Integer operationLevel;
  
  @Column(name = "part", nullable = false)
  private String part;
  
  @Column(name = "appointment_time")
  private Date appointmentTime;
  
  @Column(length = 30, nullable = false)
  private String doctor;
  
  @Column(name = "dept_id", nullable = false)
  private Integer deptId;
  
  @Column(name = "insert_user", nullable = false, length = 30)
  private String insertUser;
  
  @Column(name = "insert_time", nullable = false)
  private Date insertTime;
  
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
  
  public String getOperationName() {
    return this.operationName;
  }
  
  public void setOperationName(String operationName) {
    this.operationName = operationName;
  }
  
  public String getOperationDictIds() {
    return this.operationDictIds;
  }
  
  public void setOperationDictIds(String operationDictIds) {
    this.operationDictIds = operationDictIds;
  }
  
  public Integer getOperationLevel() {
    return this.operationLevel;
  }
  
  public void setOperationLevel(Integer operationLevel) {
    this.operationLevel = operationLevel;
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
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public Integer getDeptId() {
    return this.deptId;
  }
  
  public void setDeptId(Integer deptId) {
    this.deptId = deptId;
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
}
