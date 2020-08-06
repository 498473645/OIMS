package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "acao")
public class AChao implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  
  @Column(name = "jcd_id")
  private Long jcdid;
  
  private String jcren;
  
  private Date jctime;
  
  private float od_a;
  
  private float od_l;
  
  private float od_v;
  
  private float os_a;
  
  private float os_l;
  
  private float os_v;
  
  private float od_al;
  
  private float os_al;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getJcdid() {
    return this.jcdid;
  }
  
  public void setJcdid(Long jcdid) {
    this.jcdid = jcdid;
  }
  
  public String getJcren() {
    return this.jcren;
  }
  
  public void setJcren(String jcren) {
    this.jcren = jcren;
  }
  
  @Column(name = "jc_time")
  public Date getJctime() {
    return this.jctime;
  }
  
  public void setJctime(Date jctime) {
    this.jctime = jctime;
  }
  
  public float getOd_a() {
    return this.od_a;
  }
  
  public void setOd_a(float od_a) {
    this.od_a = od_a;
  }
  
  public float getOd_l() {
    return this.od_l;
  }
  
  public void setOd_l(float od_l) {
    this.od_l = od_l;
  }
  
  public float getOd_v() {
    return this.od_v;
  }
  
  public void setOd_v(float od_v) {
    this.od_v = od_v;
  }
  
  public float getOs_a() {
    return this.os_a;
  }
  
  public void setOs_a(float os_a) {
    this.os_a = os_a;
  }
  
  public float getOs_l() {
    return this.os_l;
  }
  
  public void setOs_l(float os_l) {
    this.os_l = os_l;
  }
  
  public float getOs_v() {
    return this.os_v;
  }
  
  public void setOs_v(float os_v) {
    this.os_v = os_v;
  }
  
  public float getOd_al() {
    return this.od_al;
  }
  
  public void setOd_al(float od_al) {
    this.od_al = od_al;
  }
  
  public float getOs_al() {
    return this.os_al;
  }
  
  public void setOs_al(float os_al) {
    this.os_al = os_al;
  }
}
