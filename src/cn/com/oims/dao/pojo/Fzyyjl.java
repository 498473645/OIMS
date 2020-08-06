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
@Table(name = "fzyyjl")
public class Fzyyjl {
  private Long id;
  
  private Long fzyyId;
  
  private String yyren;
  
  private Date addTime;
  
  private String beizhu;
  
  private Integer sffs;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "fzyyjl_sequence")
  @SequenceGenerator(name = "fzyyjl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "fzyyjl_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(name = "fzyyId")
  public Long getFzyyId() {
    return this.fzyyId;
  }
  
  public void setFzyyId(Long fzyyId) {
    this.fzyyId = fzyyId;
  }
  
  public String getYyren() {
    return this.yyren;
  }
  
  public void setYyren(String yyren) {
    this.yyren = yyren;
  }
  
  @Column(name = "add_time")
  public Date getAddTime() {
    return this.addTime;
  }
  
  public void setAddTime(Date addTime) {
    this.addTime = addTime;
  }
  
  public String getBeizhu() {
    return this.beizhu;
  }
  
  public void setBeizhu(String beizhu) {
    this.beizhu = beizhu;
  }
  
  public Integer getSffs() {
    return this.sffs;
  }
  
  public void setSffs(Integer sffs) {
    this.sffs = sffs;
  }
}
