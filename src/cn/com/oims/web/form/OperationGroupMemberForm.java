package cn.com.oims.web.form;

public class OperationGroupMemberForm {
  private Integer groupId;
  
  private String workNo;
  
  private Integer levelFlag;
  
  private String operationDicts;
  
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
  
  public Integer getLevelFlag() {
    return this.levelFlag;
  }
  
  public void setLevelFlag(Integer levelFlag) {
    this.levelFlag = levelFlag;
  }
  
  public String getOperationDicts() {
    return this.operationDicts;
  }
  
  public void setOperationDicts(String operationDicts) {
    this.operationDicts = operationDicts;
  }
}
