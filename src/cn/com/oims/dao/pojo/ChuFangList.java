package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "chufang_list")
public class ChuFangList implements Serializable {
  private static final long serialVersionUID = -1791470852227921286L;
  
  private Integer chufang_id;
  
  private Integer jiuzhen_id;
  
  private Integer yaopin_id;
  
  private Integer num;
  
  private String cus_dir;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chufang_list_sequence")
  @SequenceGenerator(name = "chufang_list_sequence", allocationSize = 1, initialValue = 1, sequenceName = "chufang_list_sequence")
  public Integer getChufang_id() {
    return this.chufang_id;
  }
  
  public void setChufang_id(Integer chufang_id) {
    this.chufang_id = chufang_id;
  }
  
  public Integer getJiuzhen_id() {
    return this.jiuzhen_id;
  }
  
  public void setJiuzhen_id(Integer jiuzhen_id) {
    this.jiuzhen_id = jiuzhen_id;
  }
  
  public Integer getYaopin_id() {
    return this.yaopin_id;
  }
  
  public void setYaopin_id(Integer yaopin_id) {
    this.yaopin_id = yaopin_id;
  }
  
  public Integer getNum() {
    return this.num;
  }
  
  public void setNum(Integer num) {
    this.num = num;
  }
  
  public String getCus_dir() {
    return this.cus_dir;
  }
  
  public void setCus_dir(String cus_dir) {
    this.cus_dir = cus_dir;
  }
}
