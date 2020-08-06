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
@Table(name = "workforce")
public class WorkforceManager implements Serializable {
  private static final long serialVersionUID = -217148627129478900L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workforce_sequence")
  @SequenceGenerator(name = "workforce_sequence", allocationSize = 1, initialValue = 1, sequenceName = "workforce_sequence")
  private Long id;
  
  @Column(name = "start_time")
  private Date startTime;
  
  @Column(name = "end_time")
  private Date endTime;
  
  private int leibie;
  
  private int isqiyong;
  
  private int istemp;
  
  private Long fatherid;
  
  private String gonghao;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getStartTime() {
    return this.startTime;
  }
  
  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }
  
  public Date getEndTime() {
    return this.endTime;
  }
  
  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }
  
  public int getLeibie() {
    return this.leibie;
  }
  
  public void setLeibie(int leibie) {
    this.leibie = leibie;
  }
  
  public int getIsqiyong() {
    return this.isqiyong;
  }
  
  public void setIsqiyong(int isqiyong) {
    this.isqiyong = isqiyong;
  }
  
  public int getIstemp() {
    return this.istemp;
  }
  
  public void setIstemp(int istemp) {
    this.istemp = istemp;
  }
  
  public Long getFatherid() {
    return this.fatherid;
  }
  
  public void setFatherid(Long fatherid) {
    this.fatherid = fatherid;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
}
