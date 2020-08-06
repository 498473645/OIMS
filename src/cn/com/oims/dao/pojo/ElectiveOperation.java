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

@Entity
@Table(name = "elective_operation")
public class ElectiveOperation implements Serializable {
  private static final long serialVersionUID = 1731677598762842071L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "elective_operation_sequence")
  @SequenceGenerator(name = "elective_operation_sequence", allocationSize = 1, initialValue = 1, sequenceName = "elective_operation_sequence")
  private Long id;
  
  @Column(name = "patient_id", nullable = false)
  private Long patientId;
  
  @Column(name = "visit_id")
  private Long visitId;
  
  @Column(nullable = false)
  private String medical;
  
  @Column(name = "operation_name", nullable = false)
  private String operationName;
  
  @Column(name = "part", nullable = false)
  private String part;
  
  @Column(name = "operation_time", nullable = false)
  private Date operationTime;
  
  private String doctor;
  
  @Column(name = "dept_id", nullable = false)
  private int deptId;
  
  @Column(name = "insert_user", nullable = false)
  private String insertUser;
  
  @Column(name = "insert_time", nullable = false)
  private String insertTime;
  
  private boolean urgent;
  
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
  
  public String getPart() {
    return this.part;
  }
  
  public void setPart(String part) {
    this.part = part;
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
  
  public int getDeptId() {
    return this.deptId;
  }
  
  public void setDeptId(int deptId) {
    this.deptId = deptId;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public String getInsertTime() {
    return this.insertTime;
  }
  
  public void setInsertTime(String insertTime) {
    this.insertTime = insertTime;
  }
  
  public Long getVisitId() {
    return this.visitId;
  }
  
  public void setVisitId(Long visitId) {
    this.visitId = visitId;
  }
  
  public boolean isUrgent() {
    return this.urgent;
  }
  
  public void setUrgent(boolean urgent) {
    this.urgent = urgent;
  }
}
