package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;

@Entity
public class Yuangong_fblw implements Serializable {
  private static final long serialVersionUID = 1049221420560861883L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Yuangong_fblw_SEQUENCE")
  @SequenceGenerator(name = "Yuangong_fblw_SEQUENCE", allocationSize = 1, initialValue = 1, sequenceName = "Yuangong_fblw_SEQUENCE")
  private Integer id;
  
  @Column(length = 20)
  String gonghao;
  
  @Column(length = 20)
  private String detailKind;
  
  @Column(length = 20)
  private String detailType;
  
  @Column(length = 40)
  private String project_name;
  
  @Column(length = 40)
  private String job;
  
  private Date c_time;
  
  @Column(length = 40)
  private String other;
  
  @Column(length = 100)
  private String filePath;
  
  @Column(length = 40)
  private String author;
  
  @Column(length = 400)
  private String infomation;
  
  @Column(length = 40)
  private String keywords;
  
  @Lob
  @Basic
  private String c_content;
  
  @Column(length = 10)
  private String publish = "false";
  
  public String getPublish() {
    return this.publish;
  }
  
  public void setPublish(String publish) {
    this.publish = publish;
  }
  
  public String getAuthor() {
    return this.author;
  }
  
  public void setAuthor(String author) {
    this.author = author;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public String getKeywords() {
    return this.keywords;
  }
  
  public void setKeywords(String keywords) {
    this.keywords = keywords;
  }
  
  public String getC_content() {
    return this.c_content;
  }
  
  public void setC_content(String c_content) {
    this.c_content = c_content;
  }
  
  public String getFilePath() {
    return this.filePath;
  }
  
  public void setFilePath(String filePath) {
    this.filePath = filePath;
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
  
  public String getDetailKind() {
    return this.detailKind;
  }
  
  public void setDetailKind(String detailKind) {
    this.detailKind = detailKind;
  }
  
  public String getDetailType() {
    return this.detailType;
  }
  
  public void setDetailType(String detailType) {
    this.detailType = detailType;
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
  
  public Date getC_time() {
    return this.c_time;
  }
  
  public void setC_time(Date c_time) {
    this.c_time = c_time;
  }
  
  public String getOther() {
    return this.other;
  }
  
  public void setOther(String other) {
    this.other = other;
  }
}
