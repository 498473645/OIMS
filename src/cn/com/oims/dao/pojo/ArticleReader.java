package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "article_reader")
public class ArticleReader implements Serializable {
  private static final long serialVersionUID = 7405208749442370110L;
  
  @Id
  @Column(name = "article_id")
  private Long articleId;
  
  @Id
  @Column(length = 30)
  private String gonghao;
  
  @Column(name = "first_read_time")
  private Date firstReadTime;
  
  @Column(name = "last_read_time")
  private Date lastReadTime;
  
  @Column(name = "read_count")
  private int readCount;
  
  public Long getArticleId() {
    return this.articleId;
  }
  
  public void setArticleId(Long articleId) {
    this.articleId = articleId;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Date getFirstReadTime() {
    return this.firstReadTime;
  }
  
  public void setFirstReadTime(Date firstReadTime) {
    this.firstReadTime = firstReadTime;
  }
  
  public Date getLastReadTime() {
    return this.lastReadTime;
  }
  
  public void setLastReadTime(Date lastReadTime) {
    this.lastReadTime = lastReadTime;
  }
  
  public int getReadCount() {
    return this.readCount;
  }
  
  public void setReadCount(int readCount) {
    this.readCount = readCount;
  }
}
