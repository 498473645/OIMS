package cn.com.oims.web.form;

public class EMROrderForm {
  Long id;
  
  Integer jcxmId;
  
  Integer categoryId;
  
  Integer excutiveDept;
  
  Float count;
  
  String orderDetails;
  
  String part;
  
  String note;
  
  String other;
  
  Boolean urgent;
  
  Float money;
  
  Integer preExam;
  
  public Float getMoney() {
    return this.money;
  }
  
  public void setMoney(Float money) {
    this.money = money;
  }
  
  public Boolean getUrgent() {
    return this.urgent;
  }
  
  public void setUrgent(Boolean urgent) {
    this.urgent = urgent;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Integer getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(Integer jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public Integer getExcutiveDept() {
    return this.excutiveDept;
  }
  
  public void setExcutiveDept(Integer excutiveDept) {
    this.excutiveDept = excutiveDept;
  }
  
  public Float getCount() {
    return this.count;
  }
  
  public void setCount(Float count) {
    this.count = count;
  }
  
  public String getOrderDetails() {
    return this.orderDetails;
  }
  
  public void setOrderDetails(String orderDetails) {
    this.orderDetails = orderDetails;
  }
  
  public String getPart() {
    return this.part;
  }
  
  public void setPart(String part) {
    this.part = part;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getOther() {
    return this.other;
  }
  
  public void setOther(String other) {
    this.other = other;
  }
  
  public Integer getPreExam() {
    return this.preExam;
  }
  
  public void setPreExam(Integer preExam) {
    this.preExam = preExam;
  }
}
