package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class PaibanForm {
  private Long id;
  
  private String gonghao;
  
  private Integer category;
  
  private Integer officeId;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date onDutyDate;
  
  private Integer child;
  
  private Integer principal;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
  
  public Integer getPrincipal() {
    return this.principal;
  }
  
  public void setPrincipal(Integer principal) {
    this.principal = principal;
  }
  
  public Integer getOfficeId() {
    return this.officeId;
  }
  
  public void setOfficeId(Integer officeId) {
    this.officeId = officeId;
  }
  
  public Date getOnDutyDate() {
    return this.onDutyDate;
  }
  
  public void setOnDutyDate(Date onDutyDate) {
    this.onDutyDate = onDutyDate;
  }
  
  public Integer getChild() {
    return this.child;
  }
  
  public void setChild(Integer child) {
    this.child = child;
  }
}
