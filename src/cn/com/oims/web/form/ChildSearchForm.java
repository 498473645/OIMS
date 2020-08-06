package cn.com.oims.web.form;

public class ChildSearchForm {
  private String huanzheID;
  
  private String patientID;
  
  private String search;
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    this.search = search;
  }
  
  public String getHuanzheID() {
    return this.huanzheID;
  }
  
  public void setHuanzheID(String huanzheID) {
    this.huanzheID = huanzheID;
  }
  
  public String getPatientID() {
    return this.patientID;
  }
  
  public void setPatientID(String patientID) {
    this.patientID = patientID;
  }
}
