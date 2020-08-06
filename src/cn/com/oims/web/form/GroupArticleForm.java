package cn.com.oims.web.form;

public class GroupArticleForm extends ArticleForm {
  private Integer deptGroupId;
  
  public Integer getDeptGroupId() {
    return this.deptGroupId;
  }
  
  public void setDeptGroupId(Integer deptGroupId) {
    this.deptGroupId = deptGroupId;
  }
}
