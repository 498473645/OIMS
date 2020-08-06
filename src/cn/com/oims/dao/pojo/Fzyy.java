package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "fzyy")
public class Fzyy implements Serializable {
  private Long id;
  
  private Long hzid;
  
  private Long jiuzhenid;
  
  private Date yyrq;
  
  private Integer yyzb;
  
  private String yjxm;
  
  private String yyren;
  
  private Date add_time;
  
  private Integer biaoshi;
  
  private String yyqk;
  
  private String zdjl;
  
  private String ssjl;
  
  private Integer yyksid;
  
  public Long getHzid() {
    return this.hzid;
  }
  
  public void setHzid(Long hzid) {
    this.hzid = hzid;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "fzyy_sequence")
  @SequenceGenerator(name = "fzyy_sequence", allocationSize = 1, initialValue = 1, sequenceName = "fzyy_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getJiuzhenid() {
    return this.jiuzhenid;
  }
  
  public void setJiuzhenid(Long jiuzhenid) {
    this.jiuzhenid = jiuzhenid;
  }
  
  public Date getYyrq() {
    return this.yyrq;
  }
  
  public void setYyrq(Date yyrq) {
    this.yyrq = yyrq;
  }
  
  public Integer getYyzb() {
    return this.yyzb;
  }
  
  public void setYyzb(Integer yyzb) {
    this.yyzb = yyzb;
  }
  
  public String getYjxm() {
    return this.yjxm;
  }
  
  public void setYjxm(String yjxm) {
    this.yjxm = yjxm;
  }
  
  public String getYyren() {
    return this.yyren;
  }
  
  public void setYyren(String yyren) {
    this.yyren = yyren;
  }
  
  public Date getAdd_time() {
    return this.add_time;
  }
  
  public void setAdd_time(Date add_time) {
    this.add_time = add_time;
  }
  
  public Integer getBiaoshi() {
    return this.biaoshi;
  }
  
  public void setBiaoshi(Integer biaoshi) {
    this.biaoshi = biaoshi;
  }
  
  public String getYyqk() {
    return this.yyqk;
  }
  
  public void setYyqk(String yyqk) {
    this.yyqk = yyqk;
  }
  
  public String getZdjl() {
    return this.zdjl;
  }
  
  public void setZdjl(String zdjl) {
    this.zdjl = zdjl;
  }
  
  public String getSsjl() {
    return this.ssjl;
  }
  
  public void setSsjl(String ssjl) {
    this.ssjl = ssjl;
  }
  
  @Transient
  public Integer getYyksid() {
    return this.yyksid;
  }
  
  public void setYyksid(Integer yyksid) {
    this.yyksid = yyksid;
  }
}
