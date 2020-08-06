package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "drug_dict")
public class DrugDict implements Serializable {
  private static final long serialVersionUID = 8999515408114955808L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "drug_dict_sequence")
  @SequenceGenerator(name = "drug_dict_sequence", allocationSize = 1, initialValue = 1, sequenceName = "drug_dict_sequence")
  private Long id;
  
  @Column(name = "drug_code")
  private String drugCode;
  
  @Column(name = "category_id")
  private Integer categoryId;
  
  @Column(name = "drug_name")
  private String drugName;
  
  @Column(name = "drug_spec")
  private String drugSpec;
  
  @Column(name = "package_spec")
  private String packageSpec;
  
  private String units;
  
  @Column(name = "package_units")
  private String packageUnits;
  
  @Column(name = "dose_units")
  private String doseUnits;
  
  @Column(name = "drug_form")
  private String drugForm;
  
  @Column(name = "toxi_property")
  private String toxiProperty;
  
  @Column(name = "dose_per_unit")
  private double dosePerUnit;
  
  @Column(name = "drug_indicator")
  private Integer drugIndicator;
  
  @Column(name = "input_code")
  private String inputCode;
  
  @Column(name = "dose_day")
  private double doseDay;
  
  private String administration;
  
  private String frequency;
  
  private String notes;
  
  @Column(name = "per_amount")
  private double perAmount;
  
  private String memos;
  
  private Float price;
  
  private Float store;
  
  @Column(name = "update_time")
  private Date updateTime = new Date();
  
  @Column(name = "enable_flag")
  private boolean enableFlag = true;
  
  public boolean isEnableFlag() {
    return this.enableFlag;
  }
  
  public void setEnableFlag(boolean enableFlag) {
    this.enableFlag = enableFlag;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getDrugCode() {
    return this.drugCode;
  }
  
  public void setDrugCode(String drugCode) {
    this.drugCode = drugCode;
  }
  
  public String getDrugName() {
    return this.drugName;
  }
  
  public void setDrugName(String drugName) {
    this.drugName = drugName;
  }
  
  public String getDrugSpec() {
    return this.drugSpec;
  }
  
  public void setDrugSpec(String drugSpec) {
    this.drugSpec = drugSpec;
  }
  
  public String getUnits() {
    return this.units;
  }
  
  public void setUnits(String units) {
    this.units = units;
  }
  
  public String getDrugForm() {
    return this.drugForm;
  }
  
  public void setDrugForm(String drugForm) {
    this.drugForm = drugForm;
  }
  
  public String getToxiProperty() {
    return this.toxiProperty;
  }
  
  public void setToxiProperty(String toxiProperty) {
    this.toxiProperty = toxiProperty;
  }
  
  public double getDosePerUnit() {
    return this.dosePerUnit;
  }
  
  public void setDosePerUnit(double dosePerUnit) {
    this.dosePerUnit = dosePerUnit;
  }
  
  public String getDoseUnits() {
    return this.doseUnits;
  }
  
  public void setDoseUnits(String doseUnits) {
    this.doseUnits = doseUnits;
  }
  
  public Integer getDrugIndicator() {
    return this.drugIndicator;
  }
  
  public void setDrugIndicator(Integer drugIndicator) {
    this.drugIndicator = drugIndicator;
  }
  
  public String getInputCode() {
    return this.inputCode;
  }
  
  public void setInputCode(String inputCode) {
    this.inputCode = inputCode;
  }
  
  public double getDoseDay() {
    return this.doseDay;
  }
  
  public void setDoseDay(double doseDay) {
    this.doseDay = doseDay;
  }
  
  public String getAdministration() {
    return this.administration;
  }
  
  public void setAdministration(String administration) {
    this.administration = administration;
  }
  
  public String getFrequency() {
    return this.frequency;
  }
  
  public void setFrequency(String frequency) {
    this.frequency = frequency;
  }
  
  public String getNotes() {
    return this.notes;
  }
  
  public void setNotes(String notes) {
    this.notes = notes;
  }
  
  public double getPerAmount() {
    return this.perAmount;
  }
  
  public void setPerAmount(double perAmount) {
    this.perAmount = perAmount;
  }
  
  public String getMemos() {
    return this.memos;
  }
  
  public void setMemos(String memos) {
    this.memos = memos;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public Float getStore() {
    return this.store;
  }
  
  public void setStore(Float store) {
    this.store = store;
  }
  
  public Date getUpdateTime() {
    return this.updateTime;
  }
  
  public void setUpdateTime(Date updateTime) {
    this.updateTime = updateTime;
  }
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getPackageSpec() {
    return this.packageSpec;
  }
  
  public void setPackageSpec(String packageSpec) {
    this.packageSpec = packageSpec;
  }
  
  public String getPackageUnits() {
    return this.packageUnits;
  }
  
  public void setPackageUnits(String packageUnits) {
    this.packageUnits = packageUnits;
  }
}
