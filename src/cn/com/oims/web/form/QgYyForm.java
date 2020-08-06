package cn.com.oims.web.form;

import java.util.Date;

public class QgYyForm {
  private Long id;
  
  private String blh;
  
  private String xingming;
  
  private String yyxm;
  
  private Date yysj;
  
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
  
  public String getYyxm() {
    return this.yyxm;
  }
  
  public void setYyxm(String yyxm) {
    this.yyxm = yyxm;
  }
  
  public Date getYysj() {
    return this.yysj;
  }
  
  public void setYysj(Date yysj) {
    this.yysj = yysj;
  }
  
  public String getXingming() {
    return this.xingming;
  }
  
  public void setXingming(String xingming) {
    this.xingming = xingming;
  }
}
