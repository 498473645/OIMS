package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "drug_stock")
public class DrugStock {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "drug_stock_sequence")
  @SequenceGenerator(name = "drug_stock_sequence", allocationSize = 1, initialValue = 1, sequenceName = "drug_store_sequence")
  private Long id;
  
  @Column(name = "drug_store_id", nullable = false)
  private String drugStockId;
  
  @Column(name = "drug_dict_id", nullable = false)
  private Long drugDictId;
  
  @Column(name = "drug_code", nullable = false)
  private String drugCode;
  
  @Column(name = "drug_name")
  private String drugName;
  
  private String spec;
  
  @Column(name = "drug_form")
  private String drugForm;
  
  @Column(name = "firm_id")
  private String firmId;
  
  @Column(name = "package_spec")
  private String packageSpec;
  
  @Column(name = "package_units")
  private String packageUnits;
  
  @Column(name = "batch_no")
  private String batchNo;
  
  private String administration;
  
  @Column(name = "dosage_unit")
  private String dosageUnit;
  
  private Float dosage;
  
  private String frequency;
  
  private Float store;
  
  private Float price;
  
  @Column(name = "bumen_id")
  private Integer bumenId;
  
  @Column(name = "store_name")
  private String storeName;
  
  @Column(name = "insert_time", nullable = false)
  private Date insertTime;
  
  @Column(name = "update_time", nullable = false)
  private Date updateTime;
  
  public String getDosageUnit() {
    return this.dosageUnit;
  }
  
  public void setDosageUnit(String dosageUnit) {
    this.dosageUnit = dosageUnit;
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
  
  public String getSpec() {
    return this.spec;
  }
  
  public void setSpec(String spec) {
    this.spec = spec;
  }
  
  public String getDrugForm() {
    return this.drugForm;
  }
  
  public void setDrugForm(String drugForm) {
    this.drugForm = drugForm;
  }
  
  public String getFirmId() {
    return this.firmId;
  }
  
  public void setFirmId(String firmId) {
    this.firmId = firmId;
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
  
  public String getBatchNo() {
    return this.batchNo;
  }
  
  public void setBatchNo(String batchNo) {
    this.batchNo = batchNo;
  }
  
  public String getAdministration() {
    return this.administration;
  }
  
  public void setAdministration(String administration) {
    this.administration = administration;
  }
  
  public Float getDosage() {
    return this.dosage;
  }
  
  public void setDosage(Float dosage) {
    this.dosage = dosage;
  }
  
  public String getFrequency() {
    return this.frequency;
  }
  
  public void setFrequency(String frequency) {
    this.frequency = frequency;
  }
  
  public Float getStore() {
    return this.store;
  }
  
  public void setStore(Float store) {
    this.store = store;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getDrugStockId() {
    return this.drugStockId;
  }
  
  public void setDrugStockId(String drugStockId) {
    this.drugStockId = drugStockId;
  }
  
  public Long getDrugDictId() {
    return this.drugDictId;
  }
  
  public void setDrugDictId(Long drugDictId) {
    this.drugDictId = drugDictId;
  }
  
  public Integer getBumenId() {
    return this.bumenId;
  }
  
  public void setBumenId(Integer bumenId) {
    this.bumenId = bumenId;
  }
  
  public String getStoreName() {
    return this.storeName;
  }
  
  public void setStoreName(String storeName) {
    this.storeName = storeName;
  }
  
  public Date getInsertTime() {
    return this.insertTime;
  }
  
  public void setInsertTime(Date insertTime) {
    this.insertTime = insertTime;
  }
  
  public Date getUpdateTime() {
    return this.updateTime;
  }
  
  public void setUpdateTime(Date updateTime) {
    this.updateTime = updateTime;
  }
}
