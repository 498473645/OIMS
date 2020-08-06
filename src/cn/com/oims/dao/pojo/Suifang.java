package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "suifang")
public class Suifang {
  @Id
  private Long jiuzhenId;
  
  private String zhuyi;
  
  private Date yyrq;
  
  private String gonghao;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  public String getZhuyi() {
    return this.zhuyi;
  }
  
  public void setZhuyi(String zhuyi) {
    this.zhuyi = zhuyi;
  }
  
  public Date getYyrq() {
    return this.yyrq;
  }
  
  public void setYyrq(Date yyrq) {
    this.yyrq = yyrq;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
}
