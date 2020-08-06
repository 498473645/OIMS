package cn.com.oims.web.form;

import java.util.Date;

public class QingjiaSearchForm {
  private String insertUser;
  
  private Date kssj;
  
  private Date jssj;
  
  private Integer state;
  
  private Integer qjlx;
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getKssj() {
    return this.kssj;
  }
  
  public void setKssj(Date kssj) {
    this.kssj = kssj;
  }
  
  public Date getJssj() {
    return this.jssj;
  }
  
  public void setJssj(Date jssj) {
    this.jssj = jssj;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
  
  public Integer getQjlx() {
    return this.qjlx;
  }
  
  public void setQjlx(Integer qjlx) {
    this.qjlx = qjlx;
  }
}
