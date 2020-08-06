package cn.com.oims.web.form;

public class PaintForm {
  private int photoType;
  
  private Long patientId;
  
  private Long regId;
  
  private int categoryId;
  
  private Long id;
  
  private String eyes;
  
  private String path;
  
  private String workNo;
  
  public int getPhotoType() {
    return this.photoType;
  }
  
  public void setPhotoType(int photoType) {
    this.photoType = photoType;
  }
  
  public Long getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(Long patientId) {
    this.patientId = patientId;
  }
  
  public Long getRegId() {
    return this.regId;
  }
  
  public void setRegId(Long regId) {
    this.regId = regId;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getEyes() {
    return this.eyes;
  }
  
  public void setEyes(String eyes) {
    this.eyes = eyes;
  }
  
  public int getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(int categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getPath() {
    return this.path;
  }
  
  public void setPath(String path) {
    this.path = path;
  }
  
  public String getWorkNo() {
    return this.workNo;
  }
  
  public void setWorkNo(String workNo) {
    this.workNo = workNo;
  }
}
