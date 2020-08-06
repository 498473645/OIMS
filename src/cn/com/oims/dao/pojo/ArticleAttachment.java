package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "article_attachments")
public class ArticleAttachment implements Serializable {
  private static final long serialVersionUID = 2494944211972417209L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "article_attachments_sequence")
  @SequenceGenerator(name = "article_attachments_sequence", allocationSize = 1, initialValue = 1, sequenceName = "article_attachments_sequence")
  private Long id;
  
  @Column(name = "article_id", nullable = false)
  private Long articleId;
  
  @Column(nullable = false)
  private String attachment;
  
  @Column(nullable = false, name = "download_link")
  private String downloadLink;
  
  @Column(nullable = false, name = "download_count")
  private int downloadCount;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getArticleId() {
    return this.articleId;
  }
  
  public void setArticleId(Long articleId) {
    this.articleId = articleId;
  }
  
  public String getAttachment() {
    return this.attachment;
  }
  
  public void setAttachment(String attachment) {
    this.attachment = attachment;
  }
  
  public String getDownloadLink() {
    return this.downloadLink;
  }
  
  public void setDownloadLink(String downloadLink) {
    this.downloadLink = downloadLink;
  }
  
  public int getDownloadCount() {
    return this.downloadCount;
  }
  
  public void setDownloadCount(int downloadCount) {
    this.downloadCount = downloadCount;
  }
}
