package cn.com.oims.web.form;

public class Disgnosis {
  private Long visitId;
  
  private String eye;
  
  private Integer diseaseId;
  
  private Integer state;
  
  public Long getVisitId() {
    return this.visitId;
  }
  
  public void setVisitId(Long visitId) {
    this.visitId = visitId;
  }
  
  public String getEye() {
    return this.eye;
  }
  
  public void setEye(String eye) {
    this.eye = eye;
  }
  
  public Integer getDiseaseId() {
    return this.diseaseId;
  }
  
  public void setDiseaseId(Integer diseaseId) {
    this.diseaseId = diseaseId;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
}
