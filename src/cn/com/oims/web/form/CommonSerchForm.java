package cn.com.oims.web.form;

public class CommonSerchForm {
  private String search;
  
  private String cfDateStart;
  
  private String cfDateEnd;
  
  private Long chufangId;
  
  private Long yaopinId;
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    this.search = search;
  }
  
  public String getCfDateStart() {
    return this.cfDateStart;
  }
  
  public void setCfDateStart(String cfDateStart) {
    this.cfDateStart = cfDateStart;
  }
  
  public String getCfDateEnd() {
    return this.cfDateEnd;
  }
  
  public void setCfDateEnd(String cfDateEnd) {
    this.cfDateEnd = cfDateEnd;
  }
  
  public Long getChufangId() {
    return this.chufangId;
  }
  
  public void setChufangId(Long chufangId) {
    this.chufangId = chufangId;
  }
  
  public Long getYaopinId() {
    return this.yaopinId;
  }
  
  public void setYaopinId(Long yaopinId) {
    this.yaopinId = yaopinId;
  }
}
