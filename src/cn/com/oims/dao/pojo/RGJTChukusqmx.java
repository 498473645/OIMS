package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "rgjt_chukusqmx")
public class RGJTChukusqmx implements Serializable {
  private static final long serialVersionUID = -7917671356379341382L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_chukusqmx_sequence")
  @SequenceGenerator(name = "rgjt_chukusqmx_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_chukusqmx_sequence")
  private Long id;
  
  @Column(name = "chukusq_id")
  private Long chukusqId;
  
  @Column(name = "pro_id")
  private Integer proId;
  
  private Integer quantity;
  
  private int typeId;
  
  @Column(name = "intraocular_lens_user")
  private String intraocularLensUser;
  
  @Column(name = "patient_id")
  private String patientId;
  
  private Float diopter;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getChukusqId() {
    return this.chukusqId;
  }
  
  public void setChukusqId(Long chukusqId) {
    this.chukusqId = chukusqId;
  }
  
  public Integer getProId() {
    return this.proId;
  }
  
  public void setProId(Integer proId) {
    this.proId = proId;
  }
  
  public Integer getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }
  
  public int getTypeId() {
    return this.typeId;
  }
  
  public void setTypeId(int typeId) {
    this.typeId = typeId;
  }
  
  public String getIntraocularLensUser() {
    return this.intraocularLensUser;
  }
  
  public void setIntraocularLensUser(String intraocularLensUser) {
    this.intraocularLensUser = intraocularLensUser;
  }
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  public Float getDiopter() {
    return this.diopter;
  }
  
  public void setDiopter(Float diopter) {
    this.diopter = diopter;
  }
}
