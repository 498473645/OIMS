package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "rgjt_cjtglx")
public class RGJTCjtglx implements Serializable {
  private static final long serialVersionUID = 6545510347007316334L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_cjjtlx_sequence")
  @SequenceGenerator(name = "rgjt_cjjtlx_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_cjjtlx_sequence")
  private Integer id;
  
  private Integer manufacturer;
  
  @Column(name = "type_id")
  private Integer typeId;
  
  @Column(name = "pan_type_id")
  private Integer panTypeId;
  
  @Column(name = "diopter_scope_start")
  private Float diopterScopeStart;
  
  @Column(name = "diopter_scope_end")
  private Float diopterScopeEnd;
  
  private Float price;
  
  @Column(name = "a_constant")
  private String aConstant;
  
  private Float diameter;
  
  @Column(name = "surface_diameter")
  private Float surfaceDiameter;
  
  private String infomation;
  
  @Column(name = "target_value")
  private Integer targetValue;
  
  private Boolean disabled;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getManufacturer() {
    return this.manufacturer;
  }
  
  public void setManufacturer(Integer manufacturer) {
    this.manufacturer = manufacturer;
  }
  
  public Integer getTypeId() {
    return this.typeId;
  }
  
  public void setTypeId(Integer typeId) {
    this.typeId = typeId;
  }
  
  public Integer getPanTypeId() {
    return this.panTypeId;
  }
  
  public void setPanTypeId(Integer panTypeId) {
    this.panTypeId = panTypeId;
  }
  
  public Float getDiopterScopeStart() {
    return this.diopterScopeStart;
  }
  
  public void setDiopterScopeStart(Float diopterScopeStart) {
    this.diopterScopeStart = diopterScopeStart;
  }
  
  public Float getDiopterScopeEnd() {
    return this.diopterScopeEnd;
  }
  
  public void setDiopterScopeEnd(Float diopterScopeEnd) {
    this.diopterScopeEnd = diopterScopeEnd;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public String getaConstant() {
    return this.aConstant;
  }
  
  public void setaConstant(String aConstant) {
    this.aConstant = aConstant;
  }
  
  public Float getDiameter() {
    return this.diameter;
  }
  
  public void setDiameter(Float diameter) {
    this.diameter = diameter;
  }
  
  public Float getSurfaceDiameter() {
    return this.surfaceDiameter;
  }
  
  public void setSurfaceDiameter(Float surfaceDiameter) {
    this.surfaceDiameter = surfaceDiameter;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public Integer getTargetValue() {
    return this.targetValue;
  }
  
  public void setTargetValue(Integer targetValue) {
    this.targetValue = targetValue;
  }
  
  public Boolean getDisabled() {
    return this.disabled;
  }
  
  public void setDisabled(Boolean disabled) {
    this.disabled = disabled;
  }
}
