package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "huayan_list_detail")
public class HuaYanListDetail implements Serializable {
  private static final long serialVersionUID = -3421950940340532791L;
  
  private Integer id;
  
  private Integer huayan_id;
  
  private Integer item;
  
  private double value;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "huayan_list_detail_sequence")
  @SequenceGenerator(name = "huayan_list_detail_sequence", allocationSize = 1, initialValue = 1, sequenceName = "huayan_list_detail_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getHuayan_id() {
    return this.huayan_id;
  }
  
  public void setHuayan_id(Integer huayan_id) {
    this.huayan_id = huayan_id;
  }
  
  public Integer getItem() {
    return this.item;
  }
  
  public void setItem(Integer item) {
    this.item = item;
  }
  
  public double getValue() {
    return this.value;
  }
  
  public void setValue(double value) {
    this.value = value;
  }
}
