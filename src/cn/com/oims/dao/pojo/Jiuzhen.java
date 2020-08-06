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
@Table(name = "jiuzhen")
public class Jiuzhen implements Serializable {
  private static final long serialVersionUID = -7749754601345686524L;
  
  private Long id;
  
  private String haoma;
  
  private Long huanzheId;
  
  private String caozuoren;
  
  private Date caozuoTime;
  
  private String fzys;
  
  private Integer state;
  
  private Integer zhenbie;
  
  private String fzr;
  
  private Date fzTime;
  
  private int jzks;
  
  private Integer tizhong;
  
  private Integer shengao;
  
  private String hzlxr;
  
  private String yhzgx;
  
  private String hzlxrdh;
  
  private String hzlxrsj;
  
  @Column(name = "jieshu_time")
  private Date jieshuTime;
  
  private Integer serialNo;
  
  @Column(name = "charge_type")
  private String jzChargeType;
  
  @Column(name = "treat_method")
  private Integer treatMethod;
  
  @Column(name = "treat_result")
  private String treatResult;
  
  private String beizhu;
  
  private Integer age;
  
  public Integer getAge() {
    return this.age;
  }
  
  public void setAge(Integer age) {
    this.age = age;
  }
  
  public String getTreatResult() {
    return this.treatResult;
  }
  
  public void setTreatResult(String treatResult) {
    this.treatResult = treatResult;
  }
  
  public Date getJieshuTime() {
    return this.jieshuTime;
  }
  
  public void setJieshuTime(Date jieshuTime) {
    this.jieshuTime = jieshuTime;
  }
  
  public String getJzChargeType() {
    return this.jzChargeType;
  }
  
  public void setJzChargeType(String jzChargeType) {
    this.jzChargeType = jzChargeType;
  }
  
  @Column(name = "SERIAL_NO")
  public Integer getSerialNo() {
    return this.serialNo;
  }
  
  public void setSerialNo(Integer serialNo) {
    this.serialNo = serialNo;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jiuzhen_sequence")
  @SequenceGenerator(name = "jiuzhen_sequence", allocationSize = 1, initialValue = 1, sequenceName = "jiuzhen_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getHaoma() {
    return this.haoma;
  }
  
  public void setHaoma(String haoma) {
    this.haoma = haoma;
  }
  
  public String getCaozuoren() {
    return this.caozuoren;
  }
  
  public void setCaozuoren(String caozuoren) {
    this.caozuoren = caozuoren;
  }
  
  @Column(name = "huanzhe_id")
  public Long getHuanzheId() {
    return this.huanzheId;
  }
  
  public void setHuanzheId(Long huanzheId) {
    this.huanzheId = huanzheId;
  }
  
  @Column(name = "caozuo_time")
  public Date getCaozuoTime() {
    return this.caozuoTime;
  }
  
  public void setCaozuoTime(Date caozuoTime) {
    this.caozuoTime = caozuoTime;
  }
  
  public String getFzys() {
    return this.fzys;
  }
  
  public void setFzys(String fzys) {
    this.fzys = fzys;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
  
  public Integer getZhenbie() {
    return this.zhenbie;
  }
  
  public void setZhenbie(Integer zhenbie) {
    this.zhenbie = zhenbie;
  }
  
  public String getFzr() {
    return this.fzr;
  }
  
  public void setFzr(String fzr) {
    this.fzr = fzr;
  }
  
  public Date getFzTime() {
    return this.fzTime;
  }
  
  public void setFzTime(Date fzTime) {
    this.fzTime = fzTime;
  }
  
  public int getJzks() {
    return this.jzks;
  }
  
  public void setJzks(int jzks) {
    this.jzks = jzks;
  }
  
  public Integer getTizhong() {
    return this.tizhong;
  }
  
  public void setTizhong(Integer tizhong) {
    this.tizhong = tizhong;
  }
  
  public Integer getShengao() {
    return this.shengao;
  }
  
  public void setShengao(Integer shengao) {
    this.shengao = shengao;
  }
  
  public String getHzlxr() {
    return this.hzlxr;
  }
  
  public void setHzlxr(String hzlxr) {
    this.hzlxr = hzlxr;
  }
  
  public String getYhzgx() {
    return this.yhzgx;
  }
  
  public void setYhzgx(String yhzgx) {
    this.yhzgx = yhzgx;
  }
  
  public String getHzlxrdh() {
    return this.hzlxrdh;
  }
  
  public void setHzlxrdh(String hzlxrdh) {
    this.hzlxrdh = hzlxrdh;
  }
  
  public Integer getTreatMethod() {
    return this.treatMethod;
  }
  
  public void setTreatMethod(Integer treatMethod) {
    this.treatMethod = treatMethod;
  }
  
  public String getBeizhu() {
    return this.beizhu;
  }
  
  public void setBeizhu(String beizhu) {
    this.beizhu = beizhu;
  }
  
  public String getHzlxrsj() {
    return this.hzlxrsj;
  }
  
  public void setHzlxrsj(String hzlxrsj) {
    this.hzlxrsj = hzlxrsj;
  }
}
