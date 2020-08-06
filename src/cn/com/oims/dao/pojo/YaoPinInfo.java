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
@Table(name = "yaopin_info")
public class YaoPinInfo implements Serializable {
  private static final long serialVersionUID = -5521580925118870617L;
  
  private Integer yaopin_id;
  
  private Integer yp_type;
  
  private String name;
  
  private String direction;
  
  private String unit;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "yaopin_info_sequence")
  @SequenceGenerator(name = "yaopin_info_sequence", allocationSize = 1, initialValue = 1, sequenceName = "yaopin_info_sequence")
  @Column(name = "yaopin_id")
  public Integer getYaopin_id() {
    return this.yaopin_id;
  }
  
  public void setYaopin_id(Integer yaopin_id) {
    this.yaopin_id = yaopin_id;
  }
  
  public Integer getYp_type() {
    return this.yp_type;
  }
  
  public void setYp_type(Integer yp_type) {
    this.yp_type = yp_type;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getDirection() {
    return this.direction;
  }
  
  public void setDirection(String direction) {
    this.direction = direction;
  }
  
  public String getUnit() {
    return this.unit;
  }
  
  public void setUnit(String unit) {
    this.unit = unit;
  }
}
