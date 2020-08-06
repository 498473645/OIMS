package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "paibanbgs")
public class PaibanBGS implements Serializable {
  private static final long serialVersionUID = -1279663010318629161L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "paibanbgs_sequence")
  @SequenceGenerator(name = "paibanbgs_sequence", allocationSize = 1, initialValue = 1, sequenceName = "paibanbgs_sequence")
  private Long id;
  
  private String bgsids;
  
  private int leibie;
  
  private int isqiyong;
  
  private String gonghao;
  
  private Date addtime;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getBgsids() {
    return this.bgsids;
  }
  
  public void setBgsids(String bgsids) {
    this.bgsids = bgsids;
  }
  
  public int getLeibie() {
    return this.leibie;
  }
  
  public void setLeibie(int leibie) {
    this.leibie = leibie;
  }
  
  public int getIsqiyong() {
    return this.isqiyong;
  }
  
  public void setIsqiyong(int isqiyong) {
    this.isqiyong = isqiyong;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Date getAddtime() {
    return this.addtime;
  }
  
  public void setAddtime(Date addtime) {
    this.addtime = addtime;
  }
}
