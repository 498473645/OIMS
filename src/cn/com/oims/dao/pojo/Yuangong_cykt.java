package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Yuangong_cykt implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "YuangongJianli_SEQUENCE")
  @SequenceGenerator(name = "YuangongJianli_SEQUENCE", allocationSize = 1, initialValue = 1, sequenceName = "YuangongJianli_SEQUENCE")
  private Integer id;
  
  @Column(length = 20)
  String gonghao;
  
  @Column(length = 20)
  String classType;
  
  @Column(length = 20)
  String project_name;
  
  @Column(length = 20)
  String money;
  
  @Column(length = 20)
  String user_name;
  
  Date startTime;
  
  Date endTime;
  
  @Column(length = 100)
  String filePath;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public String getClassType() {
    return this.classType;
  }
  
  public void setClassType(String classType) {
    this.classType = classType;
  }
  
  public String getProject_name() {
    return this.project_name;
  }
  
  public void setProject_name(String project_name) {
    this.project_name = project_name;
  }
  
  public String getMoney() {
    return this.money;
  }
  
  public void setMoney(String money) {
    this.money = money;
  }
  
  public String getUser_name() {
    return this.user_name;
  }
  
  public void setUser_name(String user_name) {
    this.user_name = user_name;
  }
  
  public Date getStartTime() {
    return this.startTime;
  }
  
  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }
  
  public Date getEndTime() {
    return this.endTime;
  }
  
  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }
  
  public String getFilePath() {
    return this.filePath;
  }
  
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
}
