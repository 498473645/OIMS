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
@Table(name = "baogao")
public class Baogao implements Serializable {
  private static final long serialVersionUID = -8278210621398491782L;
  
  private Long id;
  
  private Long jcdId;
  
  private String bgys;
  
  private Date bgTime;
  
  private String shys;
  
  private Date shTime;
  
  private String jckj;
  
  private String jcts;
  
  private Integer state;
  
  private Long mobanId;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "baogao_sequence")
  @SequenceGenerator(name = "baogao_sequence", allocationSize = 1, initialValue = 1, sequenceName = "baogao_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(name = "jcd_id")
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  @Column(length = 30)
  public String getBgys() {
    return this.bgys;
  }
  
  public void setBgys(String bgys) {
    this.bgys = bgys;
  }
  
  @Column(length = 30)
  public String getShys() {
    return this.shys;
  }
  
  public void setShys(String shys) {
    this.shys = shys;
  }
  
  @Column(length = 2000)
  public String getJckj() {
    return this.jckj;
  }
  
  public void setJckj(String jckj) {
    this.jckj = jckj;
  }
  
  @Column(length = 2000)
  public String getJcts() {
    return this.jcts;
  }
  
  public void setJcts(String jcts) {
    this.jcts = jcts;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
  
  @Column(name = "bg_time")
  public Date getBgTime() {
    return this.bgTime;
  }
  
  public void setBgTime(Date bgTime) {
    this.bgTime = bgTime;
  }
  
  @Column(name = "sh_time")
  public Date getShTime() {
    return this.shTime;
  }
  
  public void setShTime(Date shTime) {
    this.shTime = shTime;
  }
  
  @Column(name = "moban_id")
  public Long getMobanId() {
    return this.mobanId;
  }
  
  public void setMobanId(Long mobanId) {
    this.mobanId = mobanId;
  }
}
