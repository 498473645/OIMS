package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "bangongshi")
public class BanGongShi implements Serializable {
  private static final long serialVersionUID = -6475949817125378372L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bangongshi_sequence")
  @SequenceGenerator(name = "bangongshi_sequence", allocationSize = 1, initialValue = 1, sequenceName = "bangongshi_sequence")
  private Integer id;
  
  @Column(length = 50, nullable = false)
  private String bgs;
  
  @Column(length = 200)
  private String weizhi;
  
  @Column(length = 200)
  private String wztp;
  
  @Column(length = 50, name = "bgsbm")
  private String bgsBm;
  
  @Column(length = 200)
  private String ip;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getBgs() {
    return this.bgs;
  }
  
  public void setBgs(String bgs) {
    this.bgs = bgs;
  }
  
  public String getWeizhi() {
    return this.weizhi;
  }
  
  public void setWeizhi(String weizhi) {
    this.weizhi = weizhi;
  }
  
  public String getWztp() {
    return this.wztp;
  }
  
  public void setWztp(String wztp) {
    this.wztp = wztp;
  }
  
  public String getBgsBm() {
    return this.bgsBm;
  }
  
  public void setBgsBm(String bgsBm) {
    this.bgsBm = bgsBm;
  }
  
  public String getIp() {
    return this.ip;
  }
  
  public void setIp(String ip) {
    this.ip = ip;
  }
}
