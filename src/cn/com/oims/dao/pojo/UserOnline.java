package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_online")
public class UserOnline implements Serializable {
  private static final long serialVersionUID = -361809062246343277L;
  
  private String username;
  
  private Date loginTime;
  
  private Integer loginCount;
  
  private boolean online;
  
  private Date visitTime;
  
  private String ip;
  
  @Id
  @Column(nullable = false)
  public String getUsername() {
    return this.username;
  }
  
  @Column(name = "ip")
  public String getIp() {
    return this.ip;
  }
  
  public void setIp(String ip) {
    this.ip = ip;
  }
  
  public void setUsername(String username) {
    this.username = username;
  }
  
  @Column(name = "login_time")
  public Date getLoginTime() {
    return this.loginTime;
  }
  
  public void setLoginTime(Date loginTime) {
    this.loginTime = loginTime;
  }
  
  @Column(name = "login_count")
  public Integer getLoginCount() {
    return this.loginCount;
  }
  
  public void setLoginCount(Integer loginCount) {
    this.loginCount = loginCount;
  }
  
  @Column(name = "online_state")
  public boolean isOnline() {
    return this.online;
  }
  
  public void setOnline(boolean online) {
    this.online = online;
  }
  
  @Column(name = "visit_time")
  public Date getVisitTime() {
    return this.visitTime;
  }
  
  public void setVisitTime(Date visitTime) {
    this.visitTime = visitTime;
  }
}
