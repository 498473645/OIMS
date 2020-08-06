package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "huayan_list")
public class HuaYanList implements Serializable {
  private static final long serialVersionUID = 6218986045013870444L;
  
  private Integer huayan_id;
  
  private Integer jiuzhen_id;
  
  private Integer type;
  
  private Date kd_time;
  
  private Integer kd_doctor;
  
  private Integer hy_doctor;
  
  private Date finish_time;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "huayan_list_sequence")
  @SequenceGenerator(name = "huayan_list_sequence", allocationSize = 1, initialValue = 1, sequenceName = "huayan_list_sequence")
  public Integer getHuayan_id() {
    return this.huayan_id;
  }
  
  public void setHuayan_id(Integer huayan_id) {
    this.huayan_id = huayan_id;
  }
  
  public Integer getJiuzhen_id() {
    return this.jiuzhen_id;
  }
  
  public void setJiuzhen_id(Integer jiuzhen_id) {
    this.jiuzhen_id = jiuzhen_id;
  }
  
  public Integer getType() {
    return this.type;
  }
  
  public void setType(Integer type) {
    this.type = type;
  }
  
  public Date getKd_time() {
    return this.kd_time;
  }
  
  public void setKd_time(Date kd_time) {
    this.kd_time = kd_time;
  }
  
  public Integer getKd_doctor() {
    return this.kd_doctor;
  }
  
  public void setKd_doctor(Integer kd_doctor) {
    this.kd_doctor = kd_doctor;
  }
  
  public Integer getHy_doctor() {
    return this.hy_doctor;
  }
  
  public void setHy_doctor(Integer hy_doctor) {
    this.hy_doctor = hy_doctor;
  }
  
  public Date getFinish_time() {
    return this.finish_time;
  }
  
  public void setFinish_time(Date finish_time) {
    this.finish_time = finish_time;
  }
}
