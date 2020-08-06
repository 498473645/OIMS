package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;

public class GroupArticleId implements Serializable {
  private static final long serialVersionUID = -1299445236178417425L;
  
  @Column(name = "dept_group_id")
  private Integer deptGroupId;
  
  @Column(name = "article_id")
  private Long articleId;
  
  public GroupArticleId() {}
  
  public GroupArticleId(Integer deptGroupId2, Long id) {
    this.deptGroupId = deptGroupId2;
    this.articleId = id;
  }
  
  public Integer getDeptGroupId() {
    return this.deptGroupId;
  }
  
  public void setDeptGroupId(Integer deptGroupId) {
    this.deptGroupId = deptGroupId;
  }
  
  public Long getArticleId() {
    return this.articleId;
  }
  
  public void setArticleId(Long articleId) {
    this.articleId = articleId;
  }
}
