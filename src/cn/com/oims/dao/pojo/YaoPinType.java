package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "yaopin_type")
public class YaoPinType implements Serializable {
  private static final long serialVersionUID = 4178456368613718248L;
  
  private Integer type_id;
  
  private String type_name;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "yaopin_type_sequence")
  @SequenceGenerator(name = "yaopin_type_sequence", allocationSize = 1, initialValue = 1, sequenceName = "yaopin_type_sequence")
  public Integer getType_id() {
    return this.type_id;
  }
  
  public void setType_id(Integer type_id) {
    this.type_id = type_id;
  }
  
  public String getType_name() {
    return this.type_name;
  }
  
  public void setType_name(String type_name) {
    this.type_name = type_name;
  }
}
