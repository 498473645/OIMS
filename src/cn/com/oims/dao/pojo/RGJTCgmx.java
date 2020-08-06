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
@Table(name = "rgjt_cgmx")
public class RGJTCgmx implements Serializable {
  private static final long serialVersionUID = 7419402382513099800L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_cgmx_sequence")
  @SequenceGenerator(name = "rgjt_cgmx_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_cgmx_sequence")
  private Long id;
  
  @Index(name = "cgsqdId")
  @Column(name = "cqsqd_id")
  private Long cgsqdId;
  
  @Column(name = "pro_id")
  private Integer proId;
  
  private Float diopter;
  
  private int quantity;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getCgsqdId() {
    return this.cgsqdId;
  }
  
  public void setCgsqdId(Long cgsqdId) {
    this.cgsqdId = cgsqdId;
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
  
  public int getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }
}
