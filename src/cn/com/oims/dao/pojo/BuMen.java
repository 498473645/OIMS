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
@Table(name = "bumen")
public class BuMen implements Serializable {
  private static final long serialVersionUID = 5608437135287105236L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "oims_bumen_sequence")
  @SequenceGenerator(name = "oims_bumen_sequence", allocationSize = 1, initialValue = 100, sequenceName = "oims_category_sequence")
  private Integer id;
  
  private Integer dwid;
  
  private String officeId;
  
  private String bmbm;
  
  private String bmmc;
  
  private String lxr;
  
  private String lxdh;
  
  private String ywfw;
  
  private String diseases;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bumen_sequence")
  @SequenceGenerator(name = "bumen_sequence", allocationSize = 1, initialValue = 1, sequenceName = "bumen_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getDwid() {
    return this.dwid;
  }
  
  public void setDwid(Integer dwid) {
    this.dwid = dwid;
  }
  
  @Column(name = "office_id")
  public String getOfficeId() {
    return this.officeId;
  }
  
  public void setOfficeId(String officeId) {
    this.officeId = officeId;
  }
  
  @Column(length = 30)
  public String getBmbm() {
    return this.bmbm;
  }
  
  public void setBmbm(String bmbm) {
    this.bmbm = bmbm;
  }
  
  public String getBmmc() {
    return this.bmmc;
  }
  
  public void setBmmc(String bmmc) {
    this.bmmc = bmmc;
  }
  
  public String getLxr() {
    return this.lxr;
  }
  
  public void setLxr(String lxr) {
    this.lxr = lxr;
  }
  
  @Column(length = 20)
  public String getLxdh() {
    return this.lxdh;
  }
  
  public void setLxdh(String lxdh) {
    this.lxdh = lxdh;
  }
  
  @Column(length = 1000)
  public String getYwfw() {
    return this.ywfw;
  }
  
  public void setYwfw(String ywfw) {
    this.ywfw = ywfw;
  }
  
  public String getDiseases() {
    return this.diseases;
  }
  
  public void setDiseases(String diseases) {
    this.diseases = diseases;
  }
}
