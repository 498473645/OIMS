package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "danwei")
public class DanWei implements Serializable {
  private static final long serialVersionUID = 5809270354529945288L;
  
  private Integer id;
  
  private String dwmc;
  
  private String lianxiren;
  
  private String dianhua;
  
  private Long danweijibie;
  
  private String jianjie;
  
  private String email;
  
  private String dizhi;
  
  private String youbian;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "danwei_sequence")
  @SequenceGenerator(name = "danwei_sequence", allocationSize = 1, initialValue = 1, sequenceName = "danwei_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getDwmc() {
    return this.dwmc;
  }
  
  public void setDwmc(String dwmc) {
    this.dwmc = dwmc;
  }
  
  public String getLianxiren() {
    return this.lianxiren;
  }
  
  public void setLianxiren(String lianxiren) {
    this.lianxiren = lianxiren;
  }
  
  public String getDianhua() {
    return this.dianhua;
  }
  
  public void setDianhua(String dianhua) {
    this.dianhua = dianhua;
  }
  
  public Long getDanweijibie() {
    return this.danweijibie;
  }
  
  public void setDanweijibie(Long danweijibie) {
    this.danweijibie = danweijibie;
  }
  
  @Column(length = 3000)
  public String getJianjie() {
    return this.jianjie;
  }
  
  public void setJianjie(String jianjie) {
    this.jianjie = jianjie;
  }
  
  public String getEmail() {
    return this.email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public String getDizhi() {
    return this.dizhi;
  }
  
  public void setDizhi(String dizhi) {
    this.dizhi = dizhi;
  }
  
  public String getYoubian() {
    return this.youbian;
  }
  
  public void setYoubian(String youbian) {
    this.youbian = youbian;
  }
}
