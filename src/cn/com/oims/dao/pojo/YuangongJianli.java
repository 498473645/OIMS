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
import javax.persistence.Transient;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "yuangong_jianli")
public class YuangongJianli implements Serializable {
  private static final long serialVersionUID = 6444243094259735543L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "yuangong_jianli_sequence")
  @SequenceGenerator(name = "yuangong_jianli_sequence", allocationSize = 1, initialValue = 1, sequenceName = "yuangong_jianli_sequence")
  private Integer id;
  
  @Index(name = "gonghao")
  @Column(nullable = false)
  private String gonghao;
  
  @Column(name = "start_date", nullable = false)
  private Date startDate;
  
  @Column(name = "end_date")
  private Date endDate;
  
  @Column(nullable = true)
  private String danwei;
  
  @Column(nullable = true)
  private String bumen;
  
  @Column(nullable = true)
  private String zhiwu;
  
  private String beizhu;
  
  private String type;
  
  private String chengwei;
  
  private String project_name;
  
  private String job;
  
  private String phone;
  
  private String fujian;
  
  private String path;
  
  private String classType;
  
  private Date time;
  
  private Date startTime;
  
  private Date endTime;
  
  private String other;
  
  private String detailType;
  
  private String user_name;
  
  private String money;
  
  @Transient
  private YuanGong yuanGong;
  
  private String finalTime;
  
  private String name;
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getFinalTime() {
    return this.finalTime;
  }
  
  public void setFinalTime(String finalTime) {
    this.finalTime = finalTime;
  }
  
  public String getUser_name() {
    return this.user_name;
  }
  
  public void setUser_name(String user_name) {
    this.user_name = user_name;
  }
  
  public String getMoney() {
    return this.money;
  }
  
  public void setMoney(String money) {
    this.money = money;
  }
  
  public String getDetailType() {
    return this.detailType;
  }
  
  public void setDetailType(String detailType) {
    this.detailType = detailType;
  }
  
  public String getClassType() {
    return this.classType;
  }
  
  public void setClassType(String classType) {
    this.classType = classType;
  }
  
  public Date getTime() {
    return this.time;
  }
  
  public void setTime(Date time) {
    this.time = time;
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
  
  public String getOther() {
    return this.other;
  }
  
  public void setOther(String other) {
    this.other = other;
  }
  
  public String getPath() {
    return this.path;
  }
  
  public void setPath(String path) {
    this.path = path;
  }
  
  public String getType() {
    return this.type;
  }
  
  public void setType(String type) {
    this.type = type;
  }
  
  public String getChengwei() {
    return this.chengwei;
  }
  
  public void setChengwei(String chengwei) {
    this.chengwei = chengwei;
  }
  
  public String getProject_name() {
    return this.project_name;
  }
  
  public void setProject_name(String project_name) {
    this.project_name = project_name;
  }
  
  public String getJob() {
    return this.job;
  }
  
  public void setJob(String job) {
    this.job = job;
  }
  
  public String getPhone() {
    return this.phone;
  }
  
  public void setPhone(String phone) {
    this.phone = phone;
  }
  
  public String getFujian() {
    return this.fujian;
  }
  
  public void setFujian(String fujian) {
    this.fujian = fujian;
  }
  
  public YuanGong getYuanGong() {
    return this.yuanGong;
  }
  
  public void setYuanGong(YuanGong yuanGong) {
    this.yuanGong = yuanGong;
  }
  
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
  
  public Date getStartDate() {
    return this.startDate;
  }
  
  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }
  
  public Date getEndDate() {
    return this.endDate;
  }
  
  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }
  
  public String getDanwei() {
    return this.danwei;
  }
  
  public void setDanwei(String danwei) {
    this.danwei = danwei;
  }
  
  public String getBumen() {
    return this.bumen;
  }
  
  public void setBumen(String bumen) {
    this.bumen = bumen;
  }
  
  public String getZhiwu() {
    return this.zhiwu;
  }
  
  public void setZhiwu(String zhiwu) {
    this.zhiwu = zhiwu;
  }
  
  public String getBeizhu() {
    return this.beizhu;
  }
  
  public void setBeizhu(String beizhu) {
    this.beizhu = beizhu;
  }
}
