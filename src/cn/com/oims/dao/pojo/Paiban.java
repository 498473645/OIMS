package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "paiban")
public class Paiban implements Serializable {
  private static final long serialVersionUID = 8358429055614294462L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "paiban_sequence")
  @SequenceGenerator(name = "paiban_sequence", allocationSize = 1, initialValue = 1, sequenceName = "paiban_sequence")
  private Long id;
  
  @Column(length = 30)
  private String xingming;
  
  @Column(name = "office_id")
  private Integer officeId;
  
  @Column(length = 30)
  private String gonghao;
  
  private Integer category;
  
  private Integer child;
  
  private Date onDutyDate;
  
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
  
  public String getXingming() {
    return this.xingming;
  }
  
  public void setXingming(String xingming) {
    this.xingming = xingming;
  }
  
  public Date getOnDutyDate() {
    return this.onDutyDate;
  }
  
  public void setOnDutyDate(Date onDutyDate) {
    this.onDutyDate = onDutyDate;
  }
  
  public Integer getPrincipal() {
    return this.principal;
  }
  
  public void setPrincipal(Integer principal) {
    this.principal = principal;
  }
  
  public Integer getChild() {
    return this.child;
  }
  
  public void setChild(Integer child) {
    this.child = child;
  }
  
  public Integer getOfficeId() {
    return this.officeId;
  }
  
  public void setOfficeId(Integer officeId) {
    this.officeId = officeId;
  }
}
