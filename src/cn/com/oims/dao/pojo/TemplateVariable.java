package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "templatevariable")
public class TemplateVariable implements Serializable {
  private Long id;
  
  private Long shuruId;
  
  private Integer vindex;
  
  private String variable;
  
  private String pinyin;
  
  private Integer category;
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "templatevariable_sequence")
  @SequenceGenerator(name = "templatevariable_sequence", allocationSize = 1, initialValue = 1, sequenceName = "templatevariable_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(name = "shuru_id")
  public Long getShuruId() {
    return this.shuruId;
  }
  
  public void setShuruId(Long shuruId) {
    this.shuruId = shuruId;
  }
  
  public Integer getVindex() {
    return this.vindex;
  }
  
  public void setVindex(Integer vindex) {
    this.vindex = vindex;
  }
  
  public String getVariable() {
    return this.variable;
  }
  
  public void setVariable(String variable) {
    this.variable = variable;
  }
  
  public String getPinyin() {
    return this.pinyin;
  }
  
  public void setPinyin(String pinyin) {
    this.pinyin = pinyin;
  }
}
