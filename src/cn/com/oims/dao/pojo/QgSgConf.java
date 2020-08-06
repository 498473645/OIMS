package cn.com.oims.dao.pojo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qg_sg_conf")
public class QgSgConf {
  private Long id;
  
  private String cont;
  
  private String tag;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_sg_conf_sequence")
  @SequenceGenerator(name = "qg_sg_conf_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_sg_conf_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getCont() {
    return this.cont;
  }
  
  public void setCont(String cont) {
    this.cont = cont;
  }
  
  public String getTag() {
    return this.tag;
  }
  
  public void setTag(String tag) {
    this.tag = tag;
  }
}
