package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(JzZhenduanPK.class)
@Table(name = "jiuzhen_zhenduan")
public class JzZhenduan implements Serializable {
  private static final long serialVersionUID = -4437438176614190231L;
  
  private Long jiuzhen_id;
  
  private Integer zdfl_id;
  
  private Integer confirmed;
  
  private String zdys;
  
  private Date zd_time;
  
  private Integer cure;
  
  private Date cure_time;
  
  private String eye;
  
  public JzZhenduan(Long jiuzhen_id, Integer zdfl_id) {
    this.jiuzhen_id = jiuzhen_id;
    this.zdfl_id = zdfl_id;
  }
  
  public JzZhenduan() {}
  
  @Id
  public Long getJiuzhen_id() {
    return this.jiuzhen_id;
  }
  
  public void setJiuzhen_id(Long jiuzhen_id) {
    this.jiuzhen_id = jiuzhen_id;
  }
  
  @Id
  public Integer getZdfl_id() {
    return this.zdfl_id;
  }
  
  public void setZdfl_id(Integer zdfl_id) {
    this.zdfl_id = zdfl_id;
  }
  
  public Integer getConfirmed() {
    return this.confirmed;
  }
  
  public void setConfirmed(Integer confirmed) {
    this.confirmed = confirmed;
  }
  
  public String getZdys() {
    return this.zdys;
  }
  
  public void setZdys(String zdys) {
    this.zdys = zdys;
  }
  
  public Date getZd_time() {
    return this.zd_time;
  }
  
  public void setZd_time(Date zd_time) {
    this.zd_time = zd_time;
  }
  
  public Integer getCure() {
    return this.cure;
  }
  
  public void setCure(Integer cure) {
    this.cure = cure;
  }
  
  public Date getCure_time() {
    return this.cure_time;
  }
  
  public void setCure_time(Date cure_time) {
    this.cure_time = cure_time;
  }
  
  public String getEye() {
    return this.eye;
  }
  
  public void setEye(String eye) {
    this.eye = eye;
  }
}
