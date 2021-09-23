package cn.com.oims.dao.pojo;

import org.hibernate.annotations.Index;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "emr_jcxm_fushu")
public class EMRJcxmFushu implements Serializable {
  private static final long serialVersionUID = -7647273387135704101L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_jcxm_fushu_sequence")
  @SequenceGenerator(name = "emr_jcxm_fushu_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_jcxm_fushu_sequence")
  private Integer id;

  @Index(name = "jcxm_id")
  @Column(name = "jcxm_id")
  private Integer jcxmId;

  @Index(name = "bianma")
  @Column(length = 200, nullable = false)
  private String bianma;

  private String xmmc;

  @Column(length = 2000)
  private String xmms;

  @Column(length = 200)
  private String pricecode;

  private Float price;

  @Column(name = "tongbu_shijian")
  private Date tongbuShijian;

  @Column(name = "default_num")
  private Float defaultNum;

  @Column(name = "default_num_change_enable")
  private boolean defaultNumChangeEnable;

  @Column(name = "choose_enable")
  private boolean chooseEnable;

  private boolean enableFlag;

  @Column(name = "default_num2")
  private Float defaultNum2;

  public Float getDefaultNum2() {
    return defaultNum2;
  }

  public void setDefaultNum2(Float defaultNum2) {
    this.defaultNum2 = defaultNum2;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getJcxmId() {
    return this.jcxmId;
  }

  public void setJcxmId(Integer jcxmId) {
    this.jcxmId = jcxmId;
  }

  public String getBianma() {
    return this.bianma;
  }

  public void setBianma(String bianma) {
    this.bianma = bianma;
  }

  public String getXmmc() {
    return this.xmmc;
  }

  public void setXmmc(String xmmc) {
    this.xmmc = xmmc;
  }

  public String getXmms() {
    return this.xmms;
  }

  public void setXmms(String xmms) {
    this.xmms = xmms;
  }

  public String getPricecode() {
    return this.pricecode;
  }

  public void setPricecode(String pricecode) {
    this.pricecode = pricecode;
  }

  public Float getPrice() {
    return this.price;
  }

  public void setPrice(Float price) {
    this.price = price;
  }

  public Date getTongbuShijian() {
    return this.tongbuShijian;
  }

  public void setTongbuShijian(Date tongbuShijian) {
    this.tongbuShijian = tongbuShijian;
  }

  public Float getDefaultNum() {
    return this.defaultNum;
  }

  public void setDefaultNum(Float defaultNum) {
    this.defaultNum = defaultNum;
  }

  public boolean isDefaultNumChangeEnable() {
    return this.defaultNumChangeEnable;
  }

  public void setDefaultNumChangeEnable(boolean defaultNumChangeEnable) {
    this.defaultNumChangeEnable = defaultNumChangeEnable;
  }

  public boolean isChooseEnable() {
    return this.chooseEnable;
  }

  public void setChooseEnable(boolean chooseEnable) {
    this.chooseEnable = chooseEnable;
  }

  public boolean isEnableFlag() {
    return this.enableFlag;
  }

  public void setEnableFlag(boolean enableFlag) {
    this.enableFlag = enableFlag;
  }
}
