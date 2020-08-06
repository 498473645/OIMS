package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class Fblw_Form {
  private Integer id;
  
  String gonghao;
  
  private String detailKind;
  
  private String detailType;
  
  private String project_name;
  
  private String job;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date c_time;
  
  private String other;
  
  private String author;
  
  private String infomation;
  
  private String keywords;
  
  private String c_content;
  
  private String filePath;
  
  public String getFilePath() {
    return this.filePath;
  }
  
  public void setFilePath(String filePath) {
    this.filePath = filePath;
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
