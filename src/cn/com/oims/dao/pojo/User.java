package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "oims_user")
public class User implements Serializable {
  private static final long serialVersionUID = 1298875366013819634L;
  
  private String uid;
  
  private String password;
  
  private String gonghao;
  
  private String email;
  
  private Integer jiaose;
  
  private boolean qiyong;
  
  private Integer jishu;
  
  private String quanxian;
  
  @Id
  @Column(nullable = false, name = "USER_ID")
  public String getUid() {
    return this.uid;
  }
  
  public void setUid(String uid) {
    this.uid = uid;
  }
  
  public String getPassword() {
    return this.password;
  }
  
  public void setPassword(String password) {
    this.password = password;
  }
  
  public String getEmail() {
    return this.email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Integer getJiaose() {
    return this.jiaose;
  }
  
  public void setJiaose(Integer jiaose) {
    this.jiaose = jiaose;
  }
  
  public boolean isQiyong() {
    return this.qiyong;
  }
  
  public void setQiyong(boolean qiyong) {
    this.qiyong = qiyong;
  }
  
  public Integer getJishu() {
    return this.jishu;
  }
  
  public void setJishu(Integer jishu) {
    this.jishu = jishu;
  }
  
  @Column(length = 1000)
  public String getQuanxian() {
    return this.quanxian;
  }
  
  public void setQuanxian(String quanxian) {
    this.quanxian = quanxian;
  }
}
