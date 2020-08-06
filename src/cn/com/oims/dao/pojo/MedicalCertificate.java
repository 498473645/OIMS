package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jiuzhen_zhenduan")
public class MedicalCertificate implements Serializable {
  private static final long serialVersionUID = -3368818929368554644L;
  
  private MedicalCertificateId id;
  
  private boolean confirmed;
  
  private String doctor;
  
  private Date addTime;
  
  private boolean cure;
  
  private Date cureTime;
  
  @Id
  public MedicalCertificateId getId() {
    return this.id;
  }
  
  public void setId(MedicalCertificateId id) {
    this.id = id;
  }
  
  public boolean isConfirmed() {
    return this.confirmed;
  }
  
  public void setConfirmed(boolean confirmed) {
    this.confirmed = confirmed;
  }
  
  @Column(name = "zdys")
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  @Column(name = "zd_time")
  public Date getAddTime() {
    return this.addTime;
  }
  
  public void setAddTime(Date addTime) {
    this.addTime = addTime;
  }
  
  public boolean isCure() {
    return this.cure;
  }
  
  public void setCure(boolean cure) {
    this.cure = cure;
  }
  
  @Column(name = "cure_time")
  public Date getCureTime() {
    return this.cureTime;
  }
  
  public void setCureTime(Date cureTime) {
    this.cureTime = cureTime;
  }
}
