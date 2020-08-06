package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "outp_treat_rec")
public class OutpTreatRec implements Serializable {
  private static final long serialVersionUID = 8921297102585610285L;
  
  @Id
  @GeneratedValue(generator = "outp_treat_rec_sequence", strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "outp_treat_rec_sequence", sequenceName = "outp_treat_rec_sequence", initialValue = 1, allocationSize = 1)
  private Long id;
  
  private Date visit_date;
  
  private String visit_no;
  
  private String serial_no;
  
  private Integer item_no;
  
  private String item_class;
  
  private String item_code;
  
  private String item_name;
  
  private String item_spec;
  
  private String units;
  
  private Integer amount;
  
  private String frequency;
  
  private String performed_by;
  
  private Double costs;
  
  private Double charges;
  
  private Integer charge_indicator;
  
  private String appoint_no;
  
  private Integer appoint_item_no;
  
  private String lis_flag;
  
  private Double quantity;
  
  private Long item_group;
  
  private Integer category_id;
  
  private String administration;
  
  private String doctor;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getVisit_date() {
    return this.visit_date;
  }
  
  public void setVisit_date(Date visit_date) {
    this.visit_date = visit_date;
  }
  
  public String getVisit_no() {
    return this.visit_no;
  }
  
  public void setVisit_no(String visit_no) {
    this.visit_no = visit_no;
  }
  
  public String getSerial_no() {
    return this.serial_no;
  }
  
  public void setSerial_no(String serial_no) {
    this.serial_no = serial_no;
  }
  
  public Integer getItem_no() {
    return this.item_no;
  }
  
  public void setItem_no(Integer item_no) {
    this.item_no = item_no;
  }
  
  public String getItem_class() {
    return this.item_class;
  }
  
  public void setItem_class(String item_class) {
    this.item_class = item_class;
  }
  
  public String getItem_code() {
    return this.item_code;
  }
  
  public void setItem_code(String item_code) {
    this.item_code = item_code;
  }
  
  public String getItem_name() {
    return this.item_name;
  }
  
  public void setItem_name(String item_name) {
    this.item_name = item_name;
  }
  
  public String getItem_spec() {
    return this.item_spec;
  }
  
  public void setItem_spec(String item_spec) {
    this.item_spec = item_spec;
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
  
  public String getFrequency() {
    return this.frequency;
  }
  
  public void setFrequency(String frequency) {
    this.frequency = frequency;
  }
  
  public String getPerformed_by() {
    return this.performed_by;
  }
  
  public void setPerformed_by(String performed_by) {
    this.performed_by = performed_by;
  }
  
  public Double getCosts() {
    return this.costs;
  }
  
  public void setCosts(Double costs) {
    this.costs = costs;
  }
  
  public Double getCharges() {
    return this.charges;
  }
  
  public void setCharges(Double charges) {
    this.charges = charges;
  }
  
  public Integer getCharge_indicator() {
    return this.charge_indicator;
  }
  
  public void setCharge_indicator(Integer charge_indicator) {
    this.charge_indicator = charge_indicator;
  }
  
  public String getAppoint_no() {
    return this.appoint_no;
  }
  
  public void setAppoint_no(String appoint_no) {
    this.appoint_no = appoint_no;
  }
  
  public Integer getAppoint_item_no() {
    return this.appoint_item_no;
  }
  
  public void setAppoint_item_no(Integer appoint_item_no) {
    this.appoint_item_no = appoint_item_no;
  }
  
  public String getLis_flag() {
    return this.lis_flag;
  }
  
  public void setLis_flag(String lis_flag) {
    this.lis_flag = lis_flag;
  }
  
  public Double getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(Double quantity) {
    this.quantity = quantity;
  }
  
  public Long getItem_group() {
    return this.item_group;
  }
  
  public void setItem_group(Long item_group) {
    this.item_group = item_group;
  }
  
  public Integer getCategory_id() {
    return this.category_id;
  }
  
  public void setCategory_id(Integer category_id) {
    this.category_id = category_id;
  }
  
  public String getAdministration() {
    return this.administration;
  }
  
  public void setAdministration(String administration) {
    this.administration = administration;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
}
