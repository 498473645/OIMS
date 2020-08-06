package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "xiaoer_chuzhen")
public class XiaoErChuZhen {
  private Long hzid;
  
  private Date ycrq;
  
  private Integer yunqi;
  
  private Integer taibie;
  
  private Integer cstz;
  
  private String csqk;
  
  private Integer fmfs;
  
  private String dqqk;
  
  private String kyycqk;
  
  private Date addTime;
  
  private String jlren;
  
  private Integer cssg;
  
  @Id
  public Long getHzid() {
    return this.hzid;
  }
  
  public void setHzid(Long hzid) {
    this.hzid = hzid;
  }
  
  public Date getYcrq() {
    return this.ycrq;
  }
  
  public void setYcrq(Date ycrq) {
    this.ycrq = ycrq;
  }
  
  public Integer getYunqi() {
    return this.yunqi;
  }
  
  public void setYunqi(Integer yunqi) {
    this.yunqi = yunqi;
  }
  
  public Integer getTaibie() {
    return this.taibie;
  }
  
  public void setTaibie(Integer taibie) {
    this.taibie = taibie;
  }
  
  public Integer getCstz() {
    return this.cstz;
  }
  
  public void setCstz(Integer cstz) {
    this.cstz = cstz;
  }
  
  public String getCsqk() {
    return this.csqk;
  }
  
  public void setCsqk(String csqk) {
    this.csqk = csqk;
  }
  
  public Integer getFmfs() {
    return this.fmfs;
  }
  
  public void setFmfs(Integer fmfs) {
    this.fmfs = fmfs;
  }
  
  public String getDqqk() {
    return this.dqqk;
  }
  
  public void setDqqk(String dqqk) {
    this.dqqk = dqqk;
  }
  
  public String getKyycqk() {
    return this.kyycqk;
  }
  
  public void setKyycqk(String kyycqk) {
    this.kyycqk = kyycqk;
  }
  
  @Column(name = "add_time")
  public Date getAddTime() {
    return this.addTime;
  }
  
  public void setAddTime(Date addTime) {
    this.addTime = addTime;
  }
  
  public String getJlren() {
    return this.jlren;
  }
  
  public void setJlren(String jlren) {
    this.jlren = jlren;
  }
  
  @Column(name = "shengao")
  public Integer getCssg() {
    return this.cssg;
  }
  
  public void setCssg(Integer cssg) {
    this.cssg = cssg;
  }
}
