package cn.com.oims.web.form;

public class LogSearchForm {
  private Long id;
  
  private String cznr;
  
  private String czr;
  
  private String search;
  
  private String czsj;
  
  private String czsj2;
  
  private String rzjb;
  
  private String czjg;
  
  private String state;
  
  public void setState(String state) {
    this.state = state;
  }
  
  public String getState() {
    return this.state;
  }
  
  public void setCzsj2(String czsj2) {
    this.czsj2 = czsj2;
  }
  
  public String getCzsj2() {
    return this.czsj2;
  }
  
  public String getCzsj() {
    return this.czsj;
  }
  
  public void setCzsj(String czsj) {
    this.czsj = czsj;
  }
  
  public String getRzjb() {
    return this.rzjb;
  }
  
  public void setRzjb(String rzjb) {
    this.rzjb = rzjb;
  }
  
  public String getCzjg() {
    return this.czjg;
  }
  
  public void setCzjg(String czjg) {
    this.czjg = czjg;
  }
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    this.search = search;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getCznr() {
    return this.cznr;
  }
  
  public void setCznr(String cznr) {
    this.cznr = cznr;
  }
  
  public String getCzr() {
    return this.czr;
  }
  
  public void setCzr(String czr) {
    this.czr = czr;
  }
}
