package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
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
@Table(name = "articles")
public class Article implements Serializable {
  private static final long serialVersionUID = 6672333737734877310L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "article_sequence")
  @SequenceGenerator(name = "article_sequence", allocationSize = 1, initialValue = 1, sequenceName = "article_sequence")
  private Long id;
  
  @Index(name = "title")
  @Column(nullable = false)
  private String title;
  
  @Index(name = "categoryId")
  @Column(name = "category_id")
  private Integer categoryId;
  
  private String infomation;
  
  @Column(length = 5000)
  private String content;
  
  @Index(name = "author")
  private String author;
  
  @Column(name = "author_work_no", length = 30)
  private String authorWorkNo;
  
  private boolean release;
  
  @Column(name = "release_time")
  private Date releaseTime;
  
  private String publication;
  
  private String ISSN;
  
  @Column(name = "insert_user", length = 30, nullable = false)
  private String insertUser;
  
  @Column(name = "insert_time", nullable = false)
  private Date insertTime;
  
  @Column(nullable = false)
  private boolean publish;
  
  @Column(name = "vist_count")
  private int vistCount = 0;
  
  @Column(name = "order_num")
  private int orderNum;
  
  @Column(name = "keyword", length = 500)
  private String keyword;
  
  @Index(name = "updateUser")
  @Column(name = "update_user")
  private String updateUser;
  
  @Column(name = "update_date")
  private Date updateDate;
  
  @Transient
  private List<ArticleAttachment> articleAttachment;
  
  public List<ArticleAttachment> getArticleAttachment() {
    return this.articleAttachment;
  }
  
  public void setArticleAttachment(List<ArticleAttachment> articleAttachment) {
    this.articleAttachment = articleAttachment;
  }
  
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
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getInsertTime() {
    return this.insertTime;
  }
  
  public void setInsertTime(Date insertTime) {
    this.insertTime = insertTime;
  }
  
  public boolean isPublish() {
    return this.publish;
  }
  
  public void setPublish(boolean publish) {
    this.publish = publish;
  }
  
  public int getVistCount() {
    return this.vistCount;
  }
  
  public void setVistCount(int vistCount) {
    this.vistCount = vistCount;
  }
  
  public int getOrderNum() {
    return this.orderNum;
  }
  
  public void setOrderNum(int orderNum) {
    this.orderNum = orderNum;
  }
  
  public String getKeyword() {
    return this.keyword;
  }
  
  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }
  
  public String getAuthorWorkNo() {
    return this.authorWorkNo;
  }
  
  public void setAuthorWorkNo(String authorWorkNo) {
    this.authorWorkNo = authorWorkNo;
  }
  
  public String getUpdateUser() {
    return this.updateUser;
  }
  
  public void setUpdateUser(String updateUser) {
    this.updateUser = updateUser;
  }
  
  public Date getUpdateDate() {
    return this.updateDate;
  }
  
  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }
}
