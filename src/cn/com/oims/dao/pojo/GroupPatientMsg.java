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
@Table(name = "group_patient_msg")
public class GroupPatientMsg implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "group_patient_sequence")
  @SequenceGenerator(name = "group_patient_sequence", allocationSize = 1, initialValue = 1, sequenceName = "group_patient_sequence")
  private Long id;
  
  @Column(name = "patient_id")
  private Long patientId;
  
  @Column(name = "group_id")
  private Integer groupId;
  
  private String msg;
  
  @Column(name = "insert_user")
  private String insertUser;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  @Column(name = "update_date")
  private Date updateDate;
  
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
  
  public Integer getGroupId() {
    return this.groupId;
  }
  
  public void setGroupId(Integer groupId) {
    this.groupId = groupId;
  }
  
  public String getMsg() {
    return this.msg;
  }
  
  public void setMsg(String msg) {
    this.msg = msg;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public Date getUpdateDate() {
    return this.updateDate;
  }
  
  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }
}
