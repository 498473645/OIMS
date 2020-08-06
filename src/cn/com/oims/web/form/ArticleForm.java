package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class ArticleForm {
  private Long id;
  
  private String title;
  
  private Integer categoryId;
  
  private String infomation;
  
  private String content;
  
  private String author;
  
  private String keyword;
  
  private String authorWorkNo;
  
  private boolean release;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date releaseTime;
  
  private String publication;
  
  private String ISSN;
  
  private boolean publish;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public String getContent() {
    return this.content;
  }
  
  public void setContent(String content) {
    this.content = content;
  }
  
  public String getAuthor() {
    return this.author;
  }
  
  public void setAuthor(String author) {
    this.author = author;
  }
  
  public boolean isRelease() {
    return this.release;
  }
  
  public void setRelease(boolean release) {
    this.release = release;
  }
  
  public Date getReleaseTime() {
    return this.releaseTime;
  }
  
  public void setReleaseTime(Date releaseTime) {
    this.releaseTime = releaseTime;
  }
  
  public String getPublication() {
    return this.publication;
  }
  
  public void setPublication(String publication) {
    this.publication = publication;
  }
  
  public String getISSN() {
    return this.ISSN;
  }
  
  public void setISSN(String iSSN) {
    this.ISSN = iSSN;
  }
  
  public boolean isPublish() {
    return this.publish;
  }
  
  public void setPublish(boolean publish) {
    this.publish = publish;
  }
  
  public String getAuthorWorkNo() {
    return this.authorWorkNo;
  }
  
  public void setAuthorWorkNo(String authorWorkNo) {
    this.authorWorkNo = authorWorkNo;
  }
  
  public String getKeyword() {
    return this.keyword;
  }
  
  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }
}
