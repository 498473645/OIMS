package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class RGJTKucunSearchForm {
  private String search;
  
  private String manufacturerName;
  
  private String typeName;
  
  private Integer panTypeId;
  
  private Float aConstantStart;
  
  private Float aConstantEnd;
  
  private Float surfaceDiameterStart;
  
  private Float surfaceDiameterEnd;
  
  private String infomation;
  
  private Float diopterStart;
  
  private Float diopterEnd;
  
  private Float priceStart;
  
  private Float priceEnd;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date startDate;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date endDate;
  
  public Date getStartDate() {
    return this.startDate;
  }
  
  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }
  
  public Date getEndDate() {
    return this.endDate;
  }
  
  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    if (search != null && search.isEmpty()) {
      this.search = null;
    } else {
      this.search = search.replaceAll("'", "");
    } 
  }
  
  public String getManufacturerName() {
    return this.manufacturerName;
  }
  
  public void setManufacturerName(String manufacturerName) {
    if (manufacturerName != null && manufacturerName.isEmpty())
      this.manufacturerName = null; 
    this.manufacturerName = manufacturerName.replaceAll("'", "");
  }
  
  public String getTypeName() {
    return this.typeName;
  }
  
  public void setTypeName(String typeName) {
    if (typeName != null && typeName.isEmpty()) {
      this.typeName = null;
    } else {
      this.typeName = typeName.replaceAll("'", "");
    } 
  }
  
  public Integer getPanTypeId() {
    return this.panTypeId;
  }
  
  public void setPanTypeId(Integer panTypeId) {
    this.panTypeId = panTypeId;
  }
  
  public Float getaConstantStart() {
    return this.aConstantStart;
  }
  
  public void setaConstantStart(Float aConstantStart) {
    this.aConstantStart = aConstantStart;
  }
  
  public Float getaConstantEnd() {
    return this.aConstantEnd;
  }
  
  public void setaConstantEnd(Float aConstantEnd) {
    this.aConstantEnd = aConstantEnd;
  }
  
  public Float getSurfaceDiameterStart() {
    return this.surfaceDiameterStart;
  }
  
  public void setSurfaceDiameterStart(Float surfaceDiameterStart) {
    this.surfaceDiameterStart = surfaceDiameterStart;
  }
  
  public Float getSurfaceDiameterEnd() {
    return this.surfaceDiameterEnd;
  }
  
  public void setSurfaceDiameterEnd(Float surfaceDiameterEnd) {
    this.surfaceDiameterEnd = surfaceDiameterEnd;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    if (infomation != null && infomation.isEmpty()) {
      this.infomation = null;
    } else {
      this.infomation = infomation.replaceAll("'", "");
    } 
  }
  
  public Float getDiopterStart() {
    return this.diopterStart;
  }
  
  public void setDiopterStart(Float diopterStart) {
    this.diopterStart = diopterStart;
  }
  
  public Float getDiopterEnd() {
    return this.diopterEnd;
  }
  
  public void setDiopterEnd(Float diopterEnd) {
    this.diopterEnd = diopterEnd;
  }
  
  public Float getPriceStart() {
    return this.priceStart;
  }
  
  public void setPriceStart(Float priceStart) {
    this.priceStart = priceStart;
  }
  
  public Float getPriceEnd() {
    return this.priceEnd;
  }
  
  public void setPriceEnd(Float priceEnd) {
    this.priceEnd = priceEnd;
  }
}
