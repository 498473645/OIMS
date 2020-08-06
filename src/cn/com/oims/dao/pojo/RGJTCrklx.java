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
@Table(name = "rgjt_crklx")
public class RGJTCrklx implements Serializable {
  private static final long serialVersionUID = 4566335816197189027L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_crklx_sequence")
  @SequenceGenerator(name = "rgjt_crklx_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_crklx_sequence")
  private Integer id;
  
  @Column(length = 30, nullable = false)
  private String name;
  
  @Column(length = 20, nullable = false)
  private String code;
  
  @Column(length = 500)
  private String note;
  
  private int category;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
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
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public int getCategory() {
    return this.category;
  }
  
  public void setCategory(int category) {
    this.category = category;
  }
}
