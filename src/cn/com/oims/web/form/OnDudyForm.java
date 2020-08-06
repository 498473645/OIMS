package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class OnDudyForm {
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date date;
  
  private String gonghao;
  
  private Integer bgsId;
  
  private Integer leibie;
  
  private Integer child;
  
  public Date getDate() {
    return this.date;
  }
  
  public void setDate(Date date) {
    this.date = date;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Integer getBgsId() {
    return this.bgsId;
  }
  
  public void setBgsId(Integer bgsId) {
    this.bgsId = bgsId;
  }
  
  public Integer getLeibie() {
    return this.leibie;
  }
  
  public void setLeibie(Integer leibie) {
    this.leibie = leibie;
  }
  
  public Integer getChild() {
    return this.child;
  }
  
  public void setChild(Integer child) {
    this.child = child;
  }
}
