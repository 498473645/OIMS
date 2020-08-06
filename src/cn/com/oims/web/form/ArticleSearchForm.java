package cn.com.oims.web.form;

public class ArticleSearchForm {
  private Integer categoryId;
  
  private String keyword;
  
  private String author;
  
  private String publication;
  
  private String ISSN;
  
  private Boolean read;
  
  private String reader;
  
  private Boolean publish;
  
  private String authorWorkNo;
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getKeyword() {
    return this.keyword;
  }
  
  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }
  
  public String getAuthor() {
    return this.author;
  }
  
  public void setAuthor(String author) {
    this.author = author;
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
  
  public String getReader() {
    return this.reader;
  }
  
  public void setReader(String reader) {
    this.reader = reader;
  }
  
  public Boolean getRead() {
    return this.read;
  }
  
  public void setRead(Boolean read) {
    this.read = read;
  }
  
  public Boolean getPublish() {
    return this.publish;
  }
  
  public void setPublish(Boolean publish) {
    this.publish = publish;
  }
  
  public String getAuthorWorkNo() {
    return this.authorWorkNo;
  }
  
  public void setAuthorWorkNo(String authorWorkNo) {
    this.authorWorkNo = authorWorkNo;
  }
}
