package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "workforcech")
public class WorkforceChild implements Serializable {
  private static final long serialVersionUID = 3756025499595774280L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workforcech_sequence")
  @SequenceGenerator(name = "workforcech_sequence", allocationSize = 1, initialValue = 1, sequenceName = "workforcech_sequence")
  private Long id;
  
  private int weekday;
  
  private String zsid;
  
  private String yggroup;
  
  private String yggroupxm;
  
  private String targegh;
  
  private String repgh;
  
  @Column(name = "end_time")
  private Date endTime;
  
  private int isend;
  
  private String workid;
  
  private int chenum;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public int getWeekday() {
    return this.weekday;
  }
  
  public void setWeekday(int weekday) {
    this.weekday = weekday;
  }
  
  public String getZsid() {
    return this.zsid;
  }
  
  public void setZsid(String zsid) {
    this.zsid = zsid;
  }
  
  public String getYggroup() {
    return this.yggroup;
  }
  
  public void setYggroup(String yggroup) {
    this.yggroup = yggroup;
  }
  
  public String getYggroupxm() {
    return this.yggroupxm;
  }
  
  public void setYggroupxm(String yggroupxm) {
    this.yggroupxm = yggroupxm;
  }
  
  public String getTargegh() {
    return this.targegh;
  }
  
  public void setTargegh(String targegh) {
    this.targegh = targegh;
  }
  
  public String getRepgh() {
    return this.repgh;
  }
  
  public void setRepgh(String repgh) {
    this.repgh = repgh;
  }
  
  public Date getEndTime() {
    return this.endTime;
  }
  
  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }
  
  public int getIsend() {
    return this.isend;
  }
  
  public void setIsend(int isend) {
    this.isend = isend;
  }
  
  public String getWorkid() {
    return this.workid;
  }
  
  public void setWorkid(String workid) {
    this.workid = workid;
  }
  
  public int getChenum() {
    return this.chenum;
  }
  
  public void setChenum(int chenum) {
    this.chenum = chenum;
  }
}
