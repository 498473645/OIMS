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
@Table(name = "huanzhexinxi")
public class HuanZheXinXi implements Serializable {
  private static final long serialVersionUID = -2270727833217802108L;
  
  private Long id;
  
  private Integer diquId;
  
  private String binglihao;
  
  private String xingming;
  
  private boolean xingbie;
  
  private Date shengri;
  
  private String diqu;
  
  private String sfzh;
  
  private String gzdw;
  
  private String dwyb;
  
  private String dwdz;
  
  private String dwdh;
  
  private String jtdz;
  
  private String youbian;
  
  private String shouji;
  
  private String dianhua;
  
  private String hzlxr;
  
  private String hzlxrdh;
  
  private String yhzgx;
  
  private boolean yibao;
  
  private String yibaohao;
  
  private boolean shangbao;
  
  private boolean gongfei;
  
  private Date zcrq;
  
  private String jilvren;
  
  private String beizhu;
  
  private Integer laiyuan;
  
  private String photourl;
  
  private String charge_type;
  
  private String qq;
  
  private String job;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "huanzhexinxi_sequence")
  @SequenceGenerator(name = "huanzhexinxi_sequence", allocationSize = 1, initialValue = 1, sequenceName = "huanzhexinxi_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Integer getDiquId() {
    return this.diquId;
  }
  
  public void setDiquId(Integer diquId) {
    this.diquId = diquId;
  }
  
  public String getBinglihao() {
    return this.binglihao;
  }
  
  public void setBinglihao(String binglihao) {
    this.binglihao = binglihao;
  }
  
  public String getXingming() {
    return this.xingming;
  }
  
  public boolean isXingbie() {
    return this.xingbie;
  }
  
  public void setXingbie(boolean xingbie) {
    this.xingbie = xingbie;
  }
  
  public boolean isYibao() {
    return this.yibao;
  }
  
  public void setYibao(boolean yibao) {
    this.yibao = yibao;
  }
  
  public boolean isShangbao() {
    return this.shangbao;
  }
  
  public void setShangbao(boolean shangbao) {
    this.shangbao = shangbao;
  }
  
  public boolean isGongfei() {
    return this.gongfei;
  }
  
  public void setGongfei(boolean gongfei) {
    this.gongfei = gongfei;
  }
  
  public void setXingming(String xingming) {
    this.xingming = xingming;
  }
  
  public Date getShengri() {
    return this.shengri;
  }
  
  public void setShengri(Date shengri) {
    this.shengri = shengri;
  }
  
  public String getDiqu() {
    return this.diqu;
  }
  
  public void setDiqu(String diqu) {
    this.diqu = diqu;
  }
  
  public String getSfzh() {
    return this.sfzh;
  }
  
  public void setSfzh(String sfzh) {
    this.sfzh = sfzh;
  }
  
  public String getGzdw() {
    return this.gzdw;
  }
  
  public void setGzdw(String gzdw) {
    this.gzdw = gzdw;
  }
  
  public String getDwyb() {
    return this.dwyb;
  }
  
  public void setDwyb(String dwyb) {
    this.dwyb = dwyb;
  }
  
  public String getDwdz() {
    return this.dwdz;
  }
  
  public void setDwdz(String dwdz) {
    this.dwdz = dwdz;
  }
  
  public String getDwdh() {
    return this.dwdh;
  }
  
  public void setDwdh(String dwdh) {
    this.dwdh = dwdh;
  }
  
  public String getJtdz() {
    return this.jtdz;
  }
  
  public void setJtdz(String jtdz) {
    this.jtdz = jtdz;
  }
  
  public String getYoubian() {
    return this.youbian;
  }
  
  public void setYoubian(String youbian) {
    this.youbian = youbian;
  }
  
  public String getShouji() {
    return this.shouji;
  }
  
  public void setShouji(String shouji) {
    this.shouji = shouji;
  }
  
  public String getDianhua() {
    return this.dianhua;
  }
  
  public void setDianhua(String dianhua) {
    this.dianhua = dianhua;
  }
  
  public String getHzlxr() {
    return this.hzlxr;
  }
  
  public void setHzlxr(String hzlxr) {
    this.hzlxr = hzlxr;
  }
  
  public String getHzlxrdh() {
    return this.hzlxrdh;
  }
  
  public void setHzlxrdh(String hzlxrdh) {
    this.hzlxrdh = hzlxrdh;
  }
  
  public String getYhzgx() {
    return this.yhzgx;
  }
  
  public void setYhzgx(String yhzgx) {
    this.yhzgx = yhzgx;
  }
  
  public String getYibaohao() {
    return this.yibaohao;
  }
  
  public void setYibaohao(String yibaohao) {
    this.yibaohao = yibaohao;
  }
  
  public Date getZcrq() {
    return this.zcrq;
  }
  
  public void setZcrq(Date zcrq) {
    this.zcrq = zcrq;
  }
  
  public String getJilvren() {
    return this.jilvren;
  }
  
  public void setJilvren(String jilvren) {
    this.jilvren = jilvren;
  }
  
  @Column(length = 500)
  public String getBeizhu() {
    return this.beizhu;
  }
  
  public void setBeizhu(String beizhu) {
    this.beizhu = beizhu;
  }
  
  public Integer getLaiyuan() {
    return this.laiyuan;
  }
  
  public void setLaiyuan(Integer laiyuan) {
    this.laiyuan = laiyuan;
  }
  
  public String getPhotourl() {
    return this.photourl;
  }
  
  public void setPhotourl(String photourl) {
    this.photourl = photourl;
  }
  
  public String getCharge_type() {
    return this.charge_type;
  }
  
  public void setCharge_type(String charge_type) {
    this.charge_type = charge_type;
  }
  
  public String getQq() {
    return this.qq;
  }
  
  public void setQq(String qq) {
    this.qq = qq;
  }
  
  public String getJob() {
    return this.job;
  }
  
  public void setJob(String job) {
    this.job = job;
  }
}
