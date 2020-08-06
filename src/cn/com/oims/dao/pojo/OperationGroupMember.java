package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "operation_group_member")
public class OperationGroupMember implements Serializable {
  private static final long serialVersionUID = 4575081313853039620L;
  
  @EmbeddedId
  private GroupMemberId groupMemberId;
  
  @Column(name = "dept_id", nullable = false)
  private Integer deptId;
  
  @Column(name = "name", nullable = false, length = 30)
  private String name;
  
  @Column(nullable = false)
  private Integer category;
  
  @Column(name = "level_flag", nullable = false)
  private Integer levelFlag;
  
  @Column(name = "first_title", length = 30)
  private String firstTitle;
  
  @Column(name = "second_title", length = 30)
  private String secondTitle;
  
  @Column(name = "operation_dicts", length = 500)
  private String operationDicts;
  
  @Column(name = "insert_user", nullable = false, length = 30)
  private String insertUser;
  
  @Column(name = "insert_date", nullable = false)
  private Date insertDate;
  
  @Column(name = "update_user", length = 30)
  private String updateUser;
  
  @Column(name = "update_date")
  private Date updateDate;
  
  public OperationGroupMember() {}
  
  public OperationGroupMember(GroupMemberId gmi) {
    this.groupMemberId = gmi;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public Integer getLevelFlag() {
    return this.levelFlag;
  }
  
  public void setLevelFlag(Integer levelFlag) {
    this.levelFlag = levelFlag;
  }
  
  public GroupMemberId getGroupMemberId() {
    return this.groupMemberId;
  }
  
  public void setGroupMemberId(GroupMemberId groupMemberId) {
    this.groupMemberId = groupMemberId;
  }
  
  public String getFirstTitle() {
    return this.firstTitle;
  }
  
  public void setFirstTitle(String firstTitle) {
    this.firstTitle = firstTitle;
  }
  
  public String getSecondTitle() {
    return this.secondTitle;
  }
  
  public void setSecondTitle(String secondTitle) {
    this.secondTitle = secondTitle;
  }
  
  public String getOperationDicts() {
    return this.operationDicts;
  }
  
  public void setOperationDicts(String operationDicts) {
    this.operationDicts = operationDicts;
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
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public String getUpdateUser() {
    return this.updateUser;
  }
  
  public void setUpdateUser(String updateUser) {
    this.updateUser = updateUser;
  }
  
  public Date getUpdateDate() {
    return this.updateDate;
  }
  
  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
}
