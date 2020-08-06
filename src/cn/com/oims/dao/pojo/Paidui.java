package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "paidui")
public class Paidui implements Serializable {
  private static final long serialVersionUID = -2249777469195161392L;
  
  private Integer officeId;
  
  private Integer xuhao;
  
  private Long jcdId;
  
  private Date addTime;
  
  private Integer yxjb;
  
  @Column(name = "office_id")
  public Integer getOfficeId() {
    return this.officeId;
  }
  
  public void setOfficeId(Integer officeId) {
    this.officeId = officeId;
  }
  
  public Integer getXuhao() {
    return this.xuhao;
  }
  
  public void setXuhao(Integer xuhao) {
    this.xuhao = xuhao;
  }
  
  @Id
  @Column(name = "Jcd_id")
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  @Column(name = "add_time")
  public Date getAddTime() {
    return this.addTime;
  }
  
  public void setAddTime(Date addTime) {
    this.addTime = addTime;
  }
  
  public Integer getYxjb() {
    return this.yxjb;
  }
  
  public void setYxjb(Integer yxjb) {
    this.yxjb = yxjb;
  }
}
