package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;

public class GroupMemberId implements Serializable {
  private static final long serialVersionUID = -4475849939953649907L;
  
  @Column(name = "group_id")
  private Integer groupId;
  
  @Column(name = "work_no", nullable = false, length = 30)
  private String workNo;
  
  public GroupMemberId() {}
  
  public GroupMemberId(Integer groupId, String workNo) {
    this.groupId = groupId;
    this.workNo = workNo;
  }
  
  public Integer getGroupId() {
    return this.groupId;
  }
  
  public void setGroupId(Integer groupId) {
    this.groupId = groupId;
  }
  
  public String getWorkNo() {
    return this.workNo;
  }
  
  public void setWorkNo(String workNo) {
    this.workNo = workNo;
  }
}
