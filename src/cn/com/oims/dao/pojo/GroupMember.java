package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "dept_group_member")
public class GroupMember {
  @EmbeddedId
  private GroupMemberId groupMemberId;
  
  private Integer role;
  
  private String note;
  
  @Column(nullable = false, length = 30)
  private String name;
  
  public GroupMemberId getGroupMemberId() {
    return this.groupMemberId;
  }
  
  public void setGroupMemberId(GroupMemberId groupMemberId) {
    this.groupMemberId = groupMemberId;
  }
  
  public Integer getRole() {
    return this.role;
  }
  
  public void setRole(Integer role) {
    this.role = role;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
}
