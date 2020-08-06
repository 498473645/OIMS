package cn.com.oims.web.form;

public class GrooupPatientMsgForm {
  private Long id;
  
  private Long patientId;
  
  private Integer groupId;
  
  private String msg;
  
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
}
