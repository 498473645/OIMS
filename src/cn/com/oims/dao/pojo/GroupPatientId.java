package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;

public class GroupPatientId implements Serializable {
  private static final long serialVersionUID = 7314961585090817191L;
  
  @Column(name = "group_id")
  private Integer groupId;
  
  @Column(name = "patient_id")
  private Long patientId;
  
  public GroupPatientId() {}
  
  public GroupPatientId(Integer groupId2, Long patientId2) {
    this.groupId = groupId2;
    this.patientId = patientId2;
  }
  
  public Integer getGroupId() {
    return this.groupId;
  }
  
  public void setGroupId(Integer groupId) {
    this.groupId = groupId;
  }
  
  public Long getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(Long patientId) {
    this.patientId = patientId;
  }
}
