package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "yuyan")
public class YuYan implements Serializable {
  private static final long serialVersionUID = -4225334891148282962L;
  
  @Id
  private Integer id;
  
  @Id
  private Integer fenlei;
  
  @Column(length = 50)
  private String mc;
  
  @Column(length = 500)
  private String wenzi;
  
  private Integer leibie;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getMc() {
    return this.mc;
  }
  
  public void setMc(String mc) {
    this.mc = mc;
  }
  
  public String getWenzi() {
    return this.wenzi;
  }
  
  public void setWenzi(String wenzi) {
    this.wenzi = wenzi;
  }
  
  public Integer getFenlei() {
    return this.fenlei;
  }
  
  public void setFenlei(Integer fenlei) {
    this.fenlei = fenlei;
  }
  
  public Integer getLeibie() {
    return this.leibie;
  }
  
  public void setLeibie(Integer leibie) {
    this.leibie = leibie;
  }
}
