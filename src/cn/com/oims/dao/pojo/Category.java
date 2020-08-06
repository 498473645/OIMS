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
@Table(name = "oims_category")
public class Category implements Serializable {
  private static final long serialVersionUID = -7802795451690707459L;
  
  private Integer id;
  
  private Integer fatherid;
  
  private String category;
  
  private String intr;
  
  private String pinyin;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "oims_category_sequence")
  @SequenceGenerator(name = "oims_category_sequence", allocationSize = 1, initialValue = 80000, sequenceName = "oims_category_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getFatherid() {
    return this.fatherid;
  }
  
  public void setFatherid(Integer fatherid) {
    this.fatherid = fatherid;
  }
  
  @Column(length = 200)
  public String getCategory() {
    return this.category;
  }
  
  public void setCategory(String category) {
    this.category = category;
  }
  
  @Column(length = 200)
  public String getIntr() {
    return this.intr;
  }
  
  public void setIntr(String intr) {
    this.intr = intr;
  }
  
  public String getPinyin() {
    return this.pinyin;
  }
  
  public void setPinyin(String pinyin) {
    this.pinyin = pinyin;
  }
}
