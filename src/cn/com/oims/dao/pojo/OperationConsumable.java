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
import org.hibernate.annotations.Index;

@Entity
@Table(name = "emr_operation_consumable")
public class OperationConsumable implements Serializable {
  private static final long serialVersionUID = 4973261398784101511L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_consumable_sequence")
  @SequenceGenerator(name = "emr_consumable_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_consumable_sequence")
  private Long id;
  
  @Index(name = "orderId")
  @Column(name = "order_id")
  private Long orderId;
  
  @Index(name = "category")
  private int category;
  
  @Index(name = "operationId")
  @Column(name = "operation_id")
  private Long operationId;
  
  @Column(name = "reg_name")
  private String regName;
  
  @Index(name = "code")
  private String code;
  
  @Column(name = "reg_no")
  private String regNo;
  
  private String name;
  
  private String specification;
  
  private String manufacturers;
  
  @Column(name = "expiration_date")
  private Date expiDate;
  
  private String sn;
  
  private Float quantity;
  
  private boolean used;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  @Column(name = "insert_user")
  private String insertUser;
  
  @Column(name = "use_date")
  private Date useDate;
  
  private String unit;
  
  private Float price;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getOrderId() {
    return this.orderId;
  }
  
  public void setOrderId(Long orderId) {
    this.orderId = orderId;
  }
  
  public Long getOperationId() {
    return this.operationId;
  }
  
  public void setOperationId(Long operationId) {
    this.operationId = operationId;
  }
  
  public String getRegName() {
    return this.regName;
  }
  
  public void setRegName(String regName) {
    this.regName = regName;
  }
  
  public String getCode() {
    return this.code;
  }
  
  public void setCode(String code) {
    this.code = code;
  }
  
  public String getRegNo() {
    return this.regNo;
  }
  
  public void setRegNo(String regNo) {
    this.regNo = regNo;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getSpecification() {
    return this.specification;
  }
  
  public void setSpecification(String specification) {
    this.specification = specification;
  }
  
  public String getManufacturers() {
    return this.manufacturers;
  }
  
  public void setManufacturers(String manufacturers) {
    this.manufacturers = manufacturers;
  }
  
  public Date getExpiDate() {
    return this.expiDate;
  }
  
  public void setExpiDate(Date expiDate) {
    this.expiDate = expiDate;
  }
  
  public String getSn() {
    return this.sn;
  }
  
  public void setSn(String sn) {
    this.sn = sn;
  }
  
  public Float getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(Float quantity) {
    this.quantity = quantity;
  }
  
  public boolean isUsed() {
    return this.used;
  }
  
  public void setUsed(boolean used) {
    this.used = used;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public Date getUseDate() {
    return this.useDate;
  }
  
  public void setUseDate(Date useDate) {
    this.useDate = useDate;
  }
  
  public int getCategory() {
    return this.category;
  }
  
  public void setCategory(int category) {
    this.category = category;
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
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
}
