package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "yanya")
public class YanYa {
  private Long id;
  
  private Float od;
  
  private Float os;
  
  private Long jiuzhen_id;
  
  private Long huanzhe_id;
  
  private Long jcd_id;
  
  private String jcys;
  
  private Date ycsj;
  
  private Integer jcfs;
  
  private String beizhu;
  
  private Integer methodOD;
  
  private Integer methodOS;
  
  private Integer refuse;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "yanya_sequence")
  @SequenceGenerator(name = "yanya_sequence", allocationSize = 1, initialValue = 1, sequenceName = "yanya_sequence")
  @Column(nullable = false)
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Integer getMethodOD() {
    return this.methodOD;
  }
  
  public void setMethodOD(Integer methodOD) {
    this.methodOD = methodOD;
  }
  
  public Integer getMethodOS() {
    return this.methodOS;
  }
  
  public void setMethodOS(Integer methodOS) {
    this.methodOS = methodOS;
  }
  
  public Integer getJcfs() {
    return this.jcfs;
  }
  
  public void setJcfs(Integer jcfs) {
    this.jcfs = jcfs;
  }
  
  public String getBeizhu() {
    return this.beizhu;
  }
  
  public void setBeizhu(String beizhu) {
    this.beizhu = beizhu;
  }
  
  public Float getOd() {
    return this.od;
  }
  
  public void setOd(Float od) {
    this.od = od;
  }
  
  public Float getOs() {
    return this.os;
  }
  
  public void setOs(Float os) {
    this.os = os;
  }
  
  @Column(name = "jiuzhen_id")
  public Long getJiuzhen_id() {
    return this.jiuzhen_id;
  }
  
  public void setJiuzhen_id(Long jiuzhen_id) {
    this.jiuzhen_id = jiuzhen_id;
  }
  
  @Column(name = "huanzhe_id")
  public Long getHuanzhe_id() {
    return this.huanzhe_id;
  }
  
  public void setHuanzhe_id(Long huanzhe_id) {
    this.huanzhe_id = huanzhe_id;
  }
  
  @Column(name = "jcd_id")
  public Long getJcd_id() {
    return this.jcd_id;
  }
  
  public void setJcd_id(Long jcd_id) {
    this.jcd_id = jcd_id;
  }
  
  public String getJcys() {
    return this.jcys;
  }
  
  public void setJcys(String jcys) {
    this.jcys = jcys;
  }
  
  public Date getYcsj() {
    return this.ycsj;
  }
  
  public void setYcsj(Date ycsj) {
    this.ycsj = ycsj;
  }
  
  public Integer getRefuse() {
    return this.refuse;
  }
  
  public void setRefuse(Integer refuse) {
    this.refuse = refuse;
  }
}
