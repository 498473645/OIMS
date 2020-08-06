package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sg_blfy")
public class SgBlfy {
  private Long id;
  
  private String blh;
  
  private String bl_id;
  
  private Date jlsj;
  
  private String blbh;
  
  private String param_od;
  
  private String param_os;
  
  private Date pjsj;
  
  private String jcpd;
  
  private String pinpai;
  
  private String fzren;
  
  private Date fssj;
  
  private String yanbie;
  
  private String yiji;
  
  private String erji;
  
  private String sanji;
  
  private String clfs;
  
  private String yongyao;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sg_blfy_sequence")
  @SequenceGenerator(name = "sg_blfy_sequence", allocationSize = 1, initialValue = 1, sequenceName = "sg_blfy_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getBlh() {
    return this.blh;
  }
  
  public void setBlh(String blh) {
    this.blh = blh;
  }
  
  public String getBl_id() {
    return this.bl_id;
  }
  
  public void setBl_id(String bl_id) {
    this.bl_id = bl_id;
  }
  
  public Date getJlsj() {
    return this.jlsj;
  }
  
  public void setJlsj(Date jlsj) {
    this.jlsj = jlsj;
  }
  
  public String getBlbh() {
    return this.blbh;
  }
  
  public void setBlbh(String blbh) {
    this.blbh = blbh;
  }
  
  public String getParam_od() {
    return this.param_od;
  }
  
  public void setParam_od(String param_od) {
    this.param_od = param_od;
  }
  
  public String getParam_os() {
    return this.param_os;
  }
  
  public void setParam_os(String param_os) {
    this.param_os = param_os;
  }
  
  public Date getPjsj() {
    return this.pjsj;
  }
  
  public void setPjsj(Date pjsj) {
    this.pjsj = pjsj;
  }
  
  public String getJcpd() {
    return this.jcpd;
  }
  
  public void setJcpd(String jcpd) {
    this.jcpd = jcpd;
  }
  
  public String getPinpai() {
    return this.pinpai;
  }
  
  public void setPinpai(String pinpai) {
    this.pinpai = pinpai;
  }
  
  public String getFzren() {
    return this.fzren;
  }
  
  public void setFzren(String fzren) {
    this.fzren = fzren;
  }
  
  public Date getFssj() {
    return this.fssj;
  }
  
  public void setFssj(Date fssj) {
    this.fssj = fssj;
  }
  
  public String getYanbie() {
    return this.yanbie;
  }
  
  public void setYanbie(String yanbie) {
    this.yanbie = yanbie;
  }
  
  public String getYiji() {
    return this.yiji;
  }
  
  public void setYiji(String yiji) {
    this.yiji = yiji;
  }
  
  public String getErji() {
    return this.erji;
  }
  
  public void setErji(String erji) {
    this.erji = erji;
  }
  
  public String getSanji() {
    return this.sanji;
  }
  
  public void setSanji(String sanji) {
    this.sanji = sanji;
  }
  
  public String getClfs() {
    return this.clfs;
  }
  
  public void setClfs(String clfs) {
    this.clfs = clfs;
  }
  
  public String getYongyao() {
    return this.yongyao;
  }
  
  public void setYongyao(String yongyao) {
    this.yongyao = yongyao;
  }
}
