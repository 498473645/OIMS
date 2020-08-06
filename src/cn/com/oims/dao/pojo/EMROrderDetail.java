package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "emr_order_detail")
public class EMROrderDetail implements Serializable {
  private static final long serialVersionUID = -294902226790223813L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_order_detail_sequence")
  @SequenceGenerator(name = "emr_order_detail_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_order_detail_sequence")
  private Long id;
  
  @Column(name = "order_detail_num", length = 50)
  private String orderDetailNo;
  
  @Index(name = "order_id")
  @Column(name = "order_id")
  private Long orderId;
  
  @Column(name = "fushu_jcxm_id")
  private Integer fushuJcxmId;
  
  @Column(name = "order_num", length = 50)
  private String orderNo;
  
  @Column(name = "bill_no", length = 50)
  private String billNo;
  
  @Column(name = "is_delete")
  private boolean isDelete = false;
  
  private Float suliang;
  
  @Column(name = "item_name")
  private String itemName;
  
  private Float price;
  
  @Column(length = 2000)
  private String note;
  
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
  
  public Integer getFushuJcxmId() {
    return this.fushuJcxmId;
  }
  
  public void setFushuJcxmId(Integer fushuJcxmId) {
    this.fushuJcxmId = fushuJcxmId;
  }
  
  public String getOrderNo() {
    return this.orderNo;
  }
  
  public void setOrderNo(String orderNum) {
    this.orderNo = this.orderNo;
  }
  
  public String getBillNo() {
    return this.billNo;
  }
  
  public void setBillNo(String billNo) {
    this.billNo = billNo;
  }
  
  public boolean isDelete() {
    return this.isDelete;
  }
  
  public void setDelete(boolean isDelete) {
    this.isDelete = isDelete;
  }
  
  public Float getSuliang() {
    return this.suliang;
  }
  
  public void setSuliang(Float suliang) {
    this.suliang = suliang;
  }
  
  public String getItemName() {
    return this.itemName;
  }
  
  public void setItemName(String itemName) {
    this.itemName = itemName;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
}
