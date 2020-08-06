package cn.com.oims.dao.pojo;

import javax.persistence.Column;

public class DeptGroupArticleId {
  @Column(name = "dept_group_id")
  private Integer deptGroupId;
  
  @Column(name = "dept_group_id")
  private Long articleId;
  
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
