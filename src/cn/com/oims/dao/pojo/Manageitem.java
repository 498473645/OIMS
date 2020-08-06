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
@Table(name = "manageitem")
public class Manageitem implements Serializable {
  private static final long serialVersionUID = -635036053351924220L;
  
  private Long id;
  
  private String manager;
  
  private String info;
  
  private Integer categoryId;
  
  private boolean state;
  
  private String vals;
  
  private String valsList;
  
  private String yesdesc;
  
  private String nodesc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "manageitem_sequence")
  @SequenceGenerator(name = "manageitem_sequence", allocationSize = 1, initialValue = 1, sequenceName = "manageitem_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getManager() {
    return this.manager;
  }
  
  public void setManager(String manager) {
    this.manager = manager;
  }
  
  public String getInfo() {
    return this.info;
  }
  
  public void setInfo(String info) {
    this.info = info;
  }
  
  @Column(name = "category_id")
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public boolean isState() {
    return this.state;
  }
  
  public void setState(boolean state) {
    this.state = state;
  }
  
  public String getVals() {
    return this.vals;
  }
  
  public void setVals(String vals) {
    this.vals = vals;
  }
  
  @Column(name = "vals_list")
  public String getValsList() {
    return this.valsList;
  }
  
  public void setValsList(String valsList) {
    this.valsList = valsList;
  }
  
  public String getYesdesc() {
    return this.yesdesc;
  }
  
  public void setYesdesc(String yesdesc) {
    this.yesdesc = yesdesc;
  }
  
  public String getNodesc() {
    return this.nodesc;
  }
  
  public void setNodesc(String nodesc) {
    this.nodesc = nodesc;
  }
}
