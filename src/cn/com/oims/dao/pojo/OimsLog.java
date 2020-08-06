package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "oims_log")
public class OimsLog implements Serializable {
  private static final long serialVersionUID = -635036053351924220L;
  
  private Long id;
  
  private String cznr;
  
  private String czr;
  
  private Date czsj;
  
  private Integer rzjb;
  
  private boolean czjg;
  
  private Integer state;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "oims_log_sequence")
  @SequenceGenerator(name = "oims_log_sequence", allocationSize = 1, initialValue = 1, sequenceName = "oims_log_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(length = 1000)
  public String getCznr() {
    return this.cznr;
  }
  
  public void setCznr(String cznr) {
    this.cznr = cznr;
  }
  
  @Column(length = 30)
  public String getCzr() {
    return this.czr;
  }
  
  public void setCzr(String czr) {
    this.czr = czr;
  }
  
  public Date getCzsj() {
    return this.czsj;
  }
  
  public void setCzsj(Date czsj) {
    this.czsj = czsj;
  }
  
  @Column(length = 1)
  public Integer getRzjb() {
    return this.rzjb;
  }
  
  public void setRzjb(Integer rzjb) {
    this.rzjb = rzjb;
  }
  
  public boolean isCzjg() {
    return this.czjg;
  }
  
  public void setCzjg(boolean czjg) {
    this.czjg = czjg;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
}
