package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "huayan_category")
public class HuaYanCategory implements Serializable {
  private static final long serialVersionUID = -3943307185550150070L;
  
  private Integer id;
  
  private Integer father_id;
  
  private String name;
  
  private String code;
  
  private String reference;
  
  private String unit;
  
  @Id
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
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getCode() {
    return this.code;
  }
  
  public void setCode(String code) {
    this.code = code;
  }
  
  public String getReference() {
    return this.reference;
  }
  
  public void setReference(String reference) {
    this.reference = reference;
  }
  
  public String getUnit() {
    return this.unit;
  }
  
  public void setUnit(String unit) {
    this.unit = unit;
  }
}
