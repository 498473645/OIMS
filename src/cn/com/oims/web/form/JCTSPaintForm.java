package cn.com.oims.web.form;

public class JCTSPaintForm {
  private Long visitId;
  
  private Long jcdId;
  
  private Long patientId;
  
  private Long jcxmId;
  
  private Integer eye;
  
  private String filePath;
  
  public Long getVisitId() {
    return this.visitId;
  }
  
  public void setVisitId(Long visitId) {
    this.visitId = visitId;
  }
  
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public Long getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(Long jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  public Integer getEye() {
    return this.eye;
  }
  
  public void setEye(Integer eye) {
    this.eye = eye;
  }
  
  public String getFilePath() {
    return this.filePath;
  }
  
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  
  public Long getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(Long patientId) {
    this.patientId = patientId;
  }
}
