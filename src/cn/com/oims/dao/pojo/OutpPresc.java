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
@Table(name = "outp_presc")
public class OutpPresc {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "outp_presc_sequence")
  @SequenceGenerator(name = "outp_presc_sequence", allocationSize = 1, initialValue = 1, sequenceName = "outp_presc_sequence")
  private Long id;
  
  @Column(name = "visit_Date")
  private Date visitDate;
  
  @Column(name = "visit_no")
  private String visitNo;
  
  @Column(name = "serial_no")
  private Long serialNo;
  
  @Column(name = "presc_no")
  private Integer prescNo;
  
  @Column(name = "item_no")
  private Integer itemNo;
  
  @Column(name = "item_class")
  private String itemClass;
  
  @Column(name = "drug_code")
  private String drugCode;
  
  @Column(name = "drug_name")
  private String drugName;
  
  @Column(name = "drug_spec")
  private String drugSpec;
  
  @Column(name = "firm_id")
  private String firmId;
  
  private String units;
  
  private Integer amount;
  
  private double dosage;
  
  private String administration;
  
  private String frequency;
  
  @Column(name = "provided_indicator")
  private Integer providedIndicator;
  
  private double costs;
  
  private double charges;
  
  @Column(name = "charge_indicator")
  private Integer chargeIndicator;
  
  private String dispensary;
  
  @Column(name = "dosage_units")
  private String dosageUnits;
  
  private String repetition;
  
  @Column(name = "presc_class")
  private String prescClass;
  
  @Column(name = "presc_id")
  private String presc_id;
  
  private String meno;
  
  @Column(name = "check_indicator")
  private String checkIndicator;
  
  @Column(name = "check_memo")
  private String checkMemo;
  
  @Column(name = "outp_orders_id")
  private Long outpOrdersId;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getOutpOrdersId() {
    return this.outpOrdersId;
  }
  
  public void setOutpOrdersId(Long outpOrdersId) {
    this.outpOrdersId = outpOrdersId;
  }
  
  public Date getVisitDate() {
    return this.visitDate;
  }
  
  public void setVisitDate(Date visitDate) {
    this.visitDate = visitDate;
  }
  
  public Long getSerialNo() {
    return this.serialNo;
  }
  
  public void setSerialNo(Long serialNo) {
    this.serialNo = serialNo;
  }
  
  public Integer getPrescNo() {
    return this.prescNo;
  }
  
  public void setPrescNo(Integer prescNo) {
    this.prescNo = prescNo;
  }
  
  public Integer getItemNo() {
    return this.itemNo;
  }
  
  public void setItemNo(Integer itemNo) {
    this.itemNo = itemNo;
  }
  
  public String getItemClass() {
    return this.itemClass;
  }
  
  public void setItemClass(String itemClass) {
    this.itemClass = itemClass;
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
  
  public String getFirmId() {
    return this.firmId;
  }
  
  public void setFirmId(String firmId) {
    this.firmId = firmId;
  }
  
  public String getUnits() {
    return this.units;
  }
  
  public void setUnits(String units) {
    this.units = units;
  }
  
  public Integer getAmount() {
    return this.amount;
  }
  
  public void setAmount(Integer amount) {
    this.amount = amount;
  }
  
  public String getVisitNo() {
    return this.visitNo;
  }
  
  public void setVisitNo(String visitNo) {
    this.visitNo = visitNo;
  }
  
  public double getDosage() {
    return this.dosage;
  }
  
  public void setDosage(double dosage) {
    this.dosage = dosage;
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
  
  public Integer getProvidedIndicator() {
    return this.providedIndicator;
  }
  
  public void setProvidedIndicator(Integer providedIndicator) {
    this.providedIndicator = providedIndicator;
  }
  
  public double getCosts() {
    return this.costs;
  }
  
  public void setCosts(double costs) {
    this.costs = costs;
  }
  
  public double getCharges() {
    return this.charges;
  }
  
  public void setCharges(double charges) {
    this.charges = charges;
  }
  
  public Integer getChargeIndicator() {
    return this.chargeIndicator;
  }
  
  public void setChargeIndicator(Integer chargeIndicator) {
    this.chargeIndicator = chargeIndicator;
  }
  
  public String getDispensary() {
    return this.dispensary;
  }
  
  public void setDispensary(String dispensary) {
    this.dispensary = dispensary;
  }
  
  public String getDosageUnits() {
    return this.dosageUnits;
  }
  
  public void setDosageUnits(String dosageUnits) {
    this.dosageUnits = dosageUnits;
  }
  
  public String getRepetition() {
    return this.repetition;
  }
  
  public void setRepetition(String repetition) {
    this.repetition = repetition;
  }
  
  public String getPrescClass() {
    return this.prescClass;
  }
  
  public void setPrescClass(String prescClass) {
    this.prescClass = prescClass;
  }
  
  public String getPresc_id() {
    return this.presc_id;
  }
  
  public void setPresc_id(String presc_id) {
    this.presc_id = presc_id;
  }
  
  public String getMeno() {
    return this.meno;
  }
  
  public void setMeno(String meno) {
    this.meno = meno;
  }
  
  public String getCheckIndicator() {
    return this.checkIndicator;
  }
  
  public void setCheckIndicator(String checkIndicator) {
    this.checkIndicator = checkIndicator;
  }
  
  public String getCheckMemo() {
    return this.checkMemo;
  }
  
  public void setCheckMemo(String checkMemo) {
    this.checkMemo = checkMemo;
  }
}
