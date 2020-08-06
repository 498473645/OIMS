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
public class Yuangong_gzjl implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "YuangongJianli_SEQUENCE")
  @SequenceGenerator(name = "YuangongJianli_SEQUENCE", allocationSize = 1, initialValue = 1, sequenceName = "YuangongJianli_SEQUENCE")
  private Integer id;
  
  @Column(length = 20)
  String gonghao;
  
  private Date startTime;
  
  private Date endTime;
  
  private String jobLocation;
  
  private String jobName;
  
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
  
  public String getJobLocation() {
    return this.jobLocation;
  }
  
  public void setJobLocation(String jobLocation) {
    this.jobLocation = jobLocation;
  }
  
  public String getJobName() {
    return this.jobName;
  }
  
  public void setJobName(String jobName) {
    this.jobName = jobName;
  }
}
