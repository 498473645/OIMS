package cn.com.oims.dao.pojo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "diqu")
public class Diqu {
  @Id
  private Integer id;
  
  private String name;
  
  private Integer pid;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "diqu_sequence")
  @SequenceGenerator(name = "diqu_sequence", allocationSize = 1, initialValue = 1, sequenceName = "diqu_sequence")
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
  
  public Integer getPid() {
    return this.pid;
  }
  
  public void setPid(Integer pid) {
    this.pid = pid;
  }
}
