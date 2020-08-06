package cn.com.oims.web.form;

import java.util.Date;

public class QgblForm {
  private Long id;
  
  private String blh;
  
  private String xingming;
  
  private Integer yb;
  
  private Date czrq;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getBlh() {
    return this.blh;
  }
  
  public void setBlh(String blh) {
    this.blh = blh;
  }
  
  public String getXingming() {
    return this.xingming;
  }
  
  public void setXingming(String xingming) {
    this.xingming = xingming;
  }
  
  public Integer getYb() {
    return this.yb;
  }
  
  public void setYb(Integer yb) {
    this.yb = yb;
  }
  
  public Date getCzrq() {
    return this.czrq;
  }
  
  public void setCzrq(Date czrq) {
    this.czrq = czrq;
  }
}
