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
@Table(name = "rgjt_kucun")
public class RGJTKucun implements Serializable {
  private static final long serialVersionUID = -251673401048237302L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_kucun_sequence")
  @SequenceGenerator(name = "rgjt_kucun_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_kucun_sequence")
  private Long id;
  
  @Index(name = "cgsqdId")
  @Column(name = "crksqd_id")
  private Long crksqdId;
  
  @Column(name = "pro_id")
  private Integer proId;
  
  private Float diopter;
  
  @Column(length = 500)
  private String note;
  
  private Integer quantity;
  
  private String sn;
  
  @Column(name = "expi_time")
  private Date expiTime;
  
  @Column(name = "batch_number")
  private String batchNumber;
  
  public String getSn() {
    return this.sn;
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
  
  public Long getCrksqdId() {
    return this.crksqdId;
  }
  
  public void setCrksqdId(Long crksqdId) {
    this.crksqdId = crksqdId;
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
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public Integer getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }
}
