package cn.com.oims.web.form;

public class MCForm {
  private Long id;
  
  private Long mdId;
  
  private Integer categoryId;
  
  private String val;
  
  private String path;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getMdId() {
    return this.mdId;
  }
  
  public void setMdId(Long mdId) {
    this.mdId = mdId;
  }
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getVal() {
    return this.val;
  }
  
  public void setVal(String val) {
    this.val = val;
  }
  
  public String getPath() {
    return this.path;
  }
  
  public void setPath(String path) {
    this.path = path;
  }
}
