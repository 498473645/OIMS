package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "diseases")
public class JiBing implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "diseases_sequence")
  @SequenceGenerator(name = "diseases_sequence", allocationSize = 1, initialValue = 1, sequenceName = "diseases_sequence")
  private Integer id;
  
  @Index(name = "father_id")
  private Integer father_id;
  
  @Index(name = "icdCode")
  private String icd_code;
  
  @Index(name = "diseaseIndex")
  private String disease;
  
  private String description;
  
  @Index(name = "pinyin")
  private String pinyin;
  
  private Integer isParent;
  
  @Column(name = "category_id")
  private Integer categoryId;
  
  @Column(name = "input_user")
  private String inputUser;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getFather_id() {
    return this.father_id;
  }
  
  public void setFather_id(Integer father_id) {
    this.father_id = father_id;
  }
  
  public String getIcd_code() {
    return this.icd_code;
  }
  
  public void setIcd_code(String icd_code) {
    this.icd_code = icd_code;
  }
  
  public String getDisease() {
    return this.disease;
  }
  
  public void setDisease(String disease) {
    this.disease = disease;
  }
  
  public String getDescription() {
    return this.description;
  }
  
  public void setDescription(String description) {
    this.description = description;
  }
  
  public String getPinyin() {
    return this.pinyin;
  }
  
  public void setPinyin(String pinyin) {
    this.pinyin = pinyin;
  }
  
  public Integer getIsParent() {
    return this.isParent;
  }
  
  public void setIsParent(Integer isParent) {
    this.isParent = isParent;
  }
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getInputUser() {
    return this.inputUser;
  }
  
  public void setInputUser(String inputUser) {
    this.inputUser = inputUser;
  }
}
