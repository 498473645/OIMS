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
@Table(name = "rgjt_crkmx")
public class RGJTCrkmx implements Serializable {
  private static final long serialVersionUID = 8822765124528629844L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_crkmx_sequence")
  @SequenceGenerator(name = "rgjt_crkmx_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_crkmx_sequence")
  private Long id;
  
  @Index(name = "csklsid")
  @Column(name = "crkls_id")
  private Long crklsId;
  
  @Column(name = "pro_id")
  private Integer proId;
  
  private Float diopter;
  
  private String sn;
  
  @Column(name = "expi_time")
  private Date expiTime;
  
  private int quantity;
  
  @Column(name = "out_or_put")
  private boolean outOrPut;
  
  @Column(name = "batch_number")
  private String batchNumber;
  
  @Column(name = "note")
  private String note;
  
  @Column(name = "operation_id")
  private Long operationId;
  
  @Column(name = "jieyu")
  private int jieyu;
  
  public int getJieyu() {
    return this.jieyu;
  }
  
  public void setJieyu(int jieyu) {
    this.jieyu = jieyu;
  }
  
  public Long getOperationId() {
    return this.operationId;
  }
  
  public void setOperationId(Long operationId) {
    this.operationId = operationId;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getBatchNumber() {
    return this.batchNumber;
  }
  
  public void setBatchNumber(String batchNumber) {
    this.batchNumber = batchNumber;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getCrklsId() {
    return this.crklsId;
  }
  
  public void setCrklsId(Long crklsId) {
    this.crklsId = crklsId;
  }
  
  public Integer getProId() {
    return this.proId;
  }
  
  public void setProId(Integer proId) {
    this.proId = proId;
  }
  
  public Float getDiopter() {
    return this.diopter;
  }
  
  public void setDiopter(Float diopter) {
    this.diopter = diopter;
  }
  
  public String getSn() {
    return this.sn;
  }
  
  public int getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }
  
  public void setSn(String sn) {
    this.sn = sn;
  }
  
  public Date getExpiTime() {
    return this.expiTime;
  }
  
  public void setExpiTime(Date expiTime) {
    this.expiTime = expiTime;
  }
  
  public boolean isOutOrPut() {
    return this.outOrPut;
  }
  
  public void setOutOrPut(boolean outOrPut) {
    this.outOrPut = outOrPut;
  }
}
