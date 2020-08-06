package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "emr_chufang")
public class EMRChufang implements Serializable {
  private static final long serialVersionUID = 3889910627048018738L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_chufang_sequence")
  @SequenceGenerator(name = "emr_chufang_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_chufang_sequence")
  private Long id;
  
  private String cfdh;
  
  @Column(name = "jiuzhen_id")
  private Long jiuzhenId;
  
  @Column(name = "huanzhe_id")
  private Long huanzheId;
  
  private Integer cfjb;
  
  private String cfys;
  
  private Integer cfks;
  
  private Date cfsj;
  
  private String beizhu;
  
  private Float zongjia;
  
  private Integer dayincishu;
  
  private Date dysj;
  
  @Column(name = "jifei_flag")
  private Integer jifeiFlag;
  
  private Integer fyks;
  
  private Integer qyFlag;
  
  @Transient
  private List<EMRChufangQindan> chufangQindan;
  
  public Long getId() {
    return this.id;
  }
  
  public String getCfdh() {
    return this.cfdh;
  }
  
  public void setCfdh(String cfdh) {
    this.cfdh = cfdh;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  public Long getHuanzheId() {
    return this.huanzheId;
  }
  
  public void setHuanzheId(Long huanzheId) {
    this.huanzheId = huanzheId;
  }
  
  public Integer getCfjb() {
    return this.cfjb;
  }
  
  public void setCfjb(Integer cfjb) {
    this.cfjb = cfjb;
  }
  
  public String getCfys() {
    return this.cfys;
  }
  
  public void setCfys(String cfys) {
    this.cfys = cfys;
  }
  
  public Date getCfsj() {
    return this.cfsj;
  }
  
  public void setCfsj(Date cfsj) {
    this.cfsj = cfsj;
  }
  
  public String getBeizhu() {
    return this.beizhu;
  }
  
  public void setBeizhu(String beizhu) {
    this.beizhu = beizhu;
  }
  
  public Integer getCfks() {
    return this.cfks;
  }
  
  public void setCfks(Integer cfks) {
    this.cfks = cfks;
  }
  
  public Float getZongjia() {
    return this.zongjia;
  }
  
  public void setZongjia(Float zongjia) {
    this.zongjia = zongjia;
  }
  
  public List<EMRChufangQindan> getChufangQindan() {
    return this.chufangQindan;
  }
  
  public void setChufangQindan(List<EMRChufangQindan> chufangQindan) {
    this.chufangQindan = chufangQindan;
  }
  
  public Integer getDayincishu() {
    return this.dayincishu;
  }
  
  public void setDayincishu(Integer dayincishu) {
    this.dayincishu = dayincishu;
  }
  
  public Date getDysj() {
    return this.dysj;
  }
  
  public void setDysj(Date dysj) {
    this.dysj = dysj;
  }
  
  public Integer getJifeiFlag() {
    return this.jifeiFlag;
  }
  
  public void setJifeiFlag(Integer jifei) {
    this.jifeiFlag = jifei;
  }
  
  public Integer getFyks() {
    return this.fyks;
  }
  
  public void setFyks(Integer fyks) {
    this.fyks = fyks;
  }
  
  public Integer getQyFlag() {
    return this.qyFlag;
  }
  
  public void setQyFlag(Integer qyFlag) {
    this.qyFlag = qyFlag;
  }
}
