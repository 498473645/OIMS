package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "emr_chufang_mingxi")
public class EMRChufangQindan implements Serializable {
  private static final long serialVersionUID = 5284388913536461554L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_chufang_mingxi_sequence")
  @SequenceGenerator(name = "emr_chufang_mingxi_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_chufang_mingxi_sequence")
  private Long id;
  
  @Column(name = "chufang_id")
  private Long chufangId;
  
  @Column(name = "yaopin_id")
  private Long yaopinId;
  
  @Transient
  private String drugCode;
  
  private String yaoming;
  
  private String ypgg;
  
  private String jixin;
  
  private String sccj;
  
  private String bzgg;
  
  private String gzdw;
  
  private String scph;
  
  private String yongfa;
  
  private String yongliang;
  
  private String yldanwei;
  
  private String yongyaopinlv;
  
  private Float shuliang;
  
  private Float jiage;
  
  private Integer jifeiFlag;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getChufangId() {
    return this.chufangId;
  }
  
  public void setChufangId(Long chufangId) {
    this.chufangId = chufangId;
  }
  
  public Long getYaopinId() {
    return this.yaopinId;
  }
  
  public void setYaopinId(Long yaopinId) {
    this.yaopinId = yaopinId;
  }
  
  public String getYaoming() {
    return this.yaoming;
  }
  
  public void setYaoming(String yaoming) {
    this.yaoming = yaoming;
  }
  
  public String getYongfa() {
    return this.yongfa;
  }
  
  public void setYongfa(String yongfa) {
    this.yongfa = yongfa;
  }
  
  public String getYongliang() {
    return this.yongliang;
  }
  
  public void setYongliang(String yongliang) {
    this.yongliang = yongliang;
  }
  
  public String getYongyaopinlv() {
    return this.yongyaopinlv;
  }
  
  public void setYongyaopinlv(String yongyaopinlv) {
    this.yongyaopinlv = yongyaopinlv;
  }
  
  public Float getShuliang() {
    return this.shuliang;
  }
  
  public void setShuliang(Float shuliang) {
    this.shuliang = shuliang;
  }
  
  public Float getJiage() {
    return this.jiage;
  }
  
  public void setJiage(Float jiage) {
    this.jiage = jiage;
  }
  
  public String getDrugCode() {
    return this.drugCode;
  }
  
  public void setDrugCode(String drugCode) {
    this.drugCode = drugCode;
  }
  
  public String getYpgg() {
    return this.ypgg;
  }
  
  public void setYpgg(String ypgg) {
    this.ypgg = ypgg;
  }
  
  public String getJixin() {
    return this.jixin;
  }
  
  public void setJixin(String jixin) {
    this.jixin = jixin;
  }
  
  public String getSccj() {
    return this.sccj;
  }
  
  public void setSccj(String sccj) {
    this.sccj = sccj;
  }
  
  public String getBzgg() {
    return this.bzgg;
  }
  
  public void setBzgg(String bzgg) {
    this.bzgg = bzgg;
  }
  
  public String getGzdw() {
    return this.gzdw;
  }
  
  public void setGzdw(String gzdw) {
    this.gzdw = gzdw;
  }
  
  public String getScph() {
    return this.scph;
  }
  
  public void setScph(String scph) {
    this.scph = scph;
  }
  
  public String getYldanwei() {
    return this.yldanwei;
  }
  
  public void setYldanwei(String yldanwei) {
    this.yldanwei = yldanwei;
  }
  
  public Integer getJifeiFlag() {
    return this.jifeiFlag;
  }
  
  public void setJifeiFlag(Integer jifeiFlag) {
    this.jifeiFlag = jifeiFlag;
  }
}
