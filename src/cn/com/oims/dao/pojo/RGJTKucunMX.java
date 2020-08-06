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
@Table(name = "rgjt_kucun_mx")
public class RGJTKucunMX implements Serializable {
  private static final long serialVersionUID = -251673401048237302L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_kucun_mx_sequence")
  @SequenceGenerator(name = "rgjt_kucun_mx_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_kucun_mx_sequence")
  private Long id;
  
  @Index(name = "proId")
  @Column(name = "pro_id")
  private Integer proId;
  
  @Index(name = "kucunId")
  @Column(name = "kucun_id")
  private Long kucunId;
  
  @Column(length = 500)
  private String note;
  
  private Integer quantity;
  
  @Column(name = "expi_time")
  private Date expiTime;
  
  private String sn;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Integer getProId() {
    return this.proId;
  }
  
  public void setProId(Integer proId) {
    this.proId = proId;
  }
  
  public Long getKucunId() {
    return this.kucunId;
  }
  
  public void setKucunId(Long kucunId) {
    this.kucunId = kucunId;
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
}
