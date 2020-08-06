package cn.com.oims.web.form;

public class JiBingSearchForm {
  private int id;
  
  private String disease;
  
  private String search;
  
  private Integer categoryId;
  
  public int getId() {
    return this.id;
  }
  
  public void setId(int id) {
    this.id = id;
  }
  
  public String getDisease() {
    return this.disease;
  }
  
  public void setDisease(String disease) {
    this.disease = disease;
  }
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    this.search = search;
  }
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
}
