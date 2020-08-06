package cn.com.oims.web.form;

public class DeptGroupForm {
  private Integer id;
  
  private String name;
  
  private String infomation;
  
  private String note;
  
  private String manager;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getManager() {
    return this.manager;
  }
  
  public void setManager(String manager) {
    this.manager = manager;
  }
}
