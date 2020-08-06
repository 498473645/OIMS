package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "dept_group_article")
public class DeptGroupArticle implements Serializable {
  private static final long serialVersionUID = -379712296519790375L;
  
  @EmbeddedId
  private GroupArticleId groupArticleId;
  
  private String title;
  
  @Index(name = "insertUser")
  @Column(name = "insert_user")
  private String insertUser;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  public DeptGroupArticle(Integer deptGroupId2, Long id) {
    this.groupArticleId = new GroupArticleId(deptGroupId2, id);
  }
  
  public DeptGroupArticle() {}
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
}
