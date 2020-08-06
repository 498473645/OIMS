package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "group_patient")
public class GroupPatient implements Serializable {
  private static final long serialVersionUID = 2017768737376410367L;
  
  @EmbeddedId
  private GroupPatientId groupPatientId;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  @Column(name = "insert_user")
  private String insertUser;
  
  public GroupPatient() {}
  
  public GroupPatient(Integer groupId, Long patientId) {
    this.groupPatientId = new GroupPatientId(groupId, patientId);
  }
  
  public GroupPatientId getGroupPatientId() {
    return this.groupPatientId;
  }
  
  public void setGroupPatientId(GroupPatientId groupPatientId) {
    this.groupPatientId = groupPatientId;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
}
