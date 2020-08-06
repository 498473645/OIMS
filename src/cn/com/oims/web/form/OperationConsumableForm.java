package cn.com.oims.web.form;

import java.util.Date;

public class OperationConsumableForm {
  private String code;
  
  private Date expiDate;
  
  private String manufacturers;
  
  private String name;
  
  private Float quantity;
  
  private String regName;
  
  private String regNo;
  
  private String sn;
  
  private String specification;
  
  private String unit;
  
  private Float price;
  
  public String getCode() {
    return this.code;
  }
  
  public void setCode(String code) {
    this.code = code;
  }
  
  public Date getExpiDate() {
    return this.expiDate;
  }
  
  public void setExpiDate(Date expiDate) {
    this.expiDate = expiDate;
  }
  
  public String getManufacturers() {
    return this.manufacturers;
  }
  
  public void setManufacturers(String manufacturers) {
    this.manufacturers = manufacturers;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public Float getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(Float quantity) {
    this.quantity = quantity;
  }
  
  public String getRegName() {
    return this.regName;
  }
  
  public void setRegName(String regName) {
    this.regName = regName;
  }
  
  public String getRegNo() {
    return this.regNo;
  }
  
  public void setRegNo(String regNo) {
    this.regNo = regNo;
  }
  
  public String getSn() {
    return this.sn;
  }
  
  public void setSn(String sn) {
    this.sn = sn;
  }
  
  public String getSpecification() {
    return this.specification;
  }
  
  public void setSpecification(String specification) {
    this.specification = specification;
  }
  
  public String getUnit() {
    return this.unit;
  }
  
  public void setUnit(String unit) {
    this.unit = unit;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
}
