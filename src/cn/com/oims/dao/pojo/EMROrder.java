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
@Table(name = "emr_orders")
public class EMROrder implements Serializable {
  private static final long serialVersionUID = -8348606761479748058L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_orders_sequence")
  @SequenceGenerator(name = "emr_orders_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_orders_sequence")
  private Long id;
  
  @Index(name = "order_no")
  @Column(name = "order_no", length = 50)
  private String orderNo;
  
  private Float price;
  
  @Column(name = "jifei_flag")
  private Integer jifeiFlag;
  
  @Index(name = "jcxm_id")
  @Column(name = "jcxm_id")
  private Integer jcxmId;
  
  @Column(name = "item_code", length = 200, nullable = false)
  private String itemCode;
  
  @Index(name = "category_id")
  @Column(name = "category_id", nullable = false)
  private Integer categoryId;
  
  @Column(name = "item_name", length = 200, nullable = false)
  private String itemName;
  
  private Float shuliang;
  
  @Index(name = "kdys")
  @Column(length = 30)
  private String kdys;
  
  private Integer kdks;
  
  @Column(name = "kd_time")
  private Date kdTime;
  
  @Column(name = "delete_flag")
  private boolean deleteFlag;
  
  @Column(length = 2000)
  private String note;
  
  @Column(name = "have_details")
  private boolean haveDetails;
  
  @Column(name = "transfer_flag")
  private boolean transferFlag;
  
  @Column(name = "excutive_dept")
  private Integer excutiveDept;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  @Column(name = "bill_no", length = 2000)
  private String billNo;
  
  @Column(name = "jiuzhen_id")
  private Long jiuzhenId;
  
  private Integer part;
  
  private Boolean urgent;
  
  @Column(name = "callback_message")
  private String callbackMessage;
  
  @Column(name = "print_quantity")
  private Integer printQuantity = Integer.valueOf(0);
  
  @Column(name = "print_date")
  private Date printDate;
  
  @Column(name = "print_last_date")
  private Date printLastDate;
  
  @Column(name = "pre_exam")
  private Integer preExam;
  
  public String getCallbackMessage() {
    return this.callbackMessage;
  }
  
  public void setCallbackMessage(String callbackMessage) {
    this.callbackMessage = callbackMessage;
  }
  
  public Integer getPart() {
    return this.part;
  }
  
  public void setPart(Integer part) {
    this.part = part;
  }
  
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  public String getBillNo() {
    return this.billNo;
  }
  
  public void setBillNo(String billNo) {
    this.billNo = billNo;
  }
  
  public boolean isHaveDetails() {
    return this.haveDetails;
  }
  
  public void setHaveDetails(boolean haveDetails) {
    this.haveDetails = haveDetails;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getOrderNo() {
    return this.orderNo;
  }
  
  public void setOrderNo(String orderNum) {
    this.orderNo = orderNum;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public Integer getJifeiFlag() {
    return this.jifeiFlag;
  }
  
  public void setJifeiFlag(Integer jifeiFlag) {
    this.jifeiFlag = jifeiFlag;
  }
  
  public Integer getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(Integer jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  public String getItemCode() {
    return this.itemCode;
  }
  
  public void setItemCode(String itemCode) {
    this.itemCode = itemCode;
  }
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public Float getShuliang() {
    return this.shuliang;
  }
  
  public void setShuliang(Float shuliang) {
    this.shuliang = shuliang;
  }
  
  public String getKdys() {
    return this.kdys;
  }
  
  public void setKdys(String kdys) {
    this.kdys = kdys;
  }
  
  public Integer getKdks() {
    return this.kdks;
  }
  
  public void setKdks(Integer kdks) {
    this.kdks = kdks;
  }
  
  public Date getKdTime() {
    return this.kdTime;
  }
  
  public void setKdTime(Date kdTime) {
    this.kdTime = kdTime;
  }
  
  public boolean isDeleteFlag() {
    return this.deleteFlag;
  }
  
  public void setDeleteFlag(boolean deleteFlag) {
    this.deleteFlag = deleteFlag;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getItemName() {
    return this.itemName;
  }
  
  public void setItemName(String itemName) {
    this.itemName = itemName;
  }
  
  public boolean isTransferFlag() {
    return this.transferFlag;
  }
  
  public void setTransferFlag(boolean transferFlag) {
    this.transferFlag = transferFlag;
  }
  
  public Integer getExcutiveDept() {
    return this.excutiveDept;
  }
  
  public void setExcutiveDept(Integer excutiveDept) {
    this.excutiveDept = excutiveDept;
  }
  
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public void setUrgent(Boolean urgent) {
    this.urgent = urgent;
  }
  
  public Integer getPrintQuantity() {
    return this.printQuantity;
  }
  
  public void setPrintQuantity(Integer printQuantity) {
    this.printQuantity = printQuantity;
  }
  
  public Date getPrintDate() {
    return this.printDate;
  }
  
  public void setPrintDate(Date printDate) {
    this.printDate = printDate;
  }
  
  public Boolean getUrgent() {
    return this.urgent;
  }
  
  public Date getPrintLastDate() {
    return this.printLastDate;
  }
  
  public void setPrintLastDate(Date printLastDate) {
    this.printLastDate = printLastDate;
  }
  
  public Integer getPreExam() {
    return this.preExam;
  }
  
  public void setPreExam(Integer preExam) {
    this.preExam = preExam;
  }
}
