package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "outp_orders")
public class OutpOrders {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "outp_orders_sequence")
  @SequenceGenerator(name = "outp_orders_sequence", allocationSize = 1, initialValue = 1, sequenceName = "outp_orders_sequence")
  private Long id;
  
  @Column(name = "patient_id")
  private String patientId;
  
  @Column(name = "visit_date")
  private Date visitDate;
  
  @Column(name = "visit_no")
  private String visitNo;
  
  @Column(name = "serial_no")
  private Long serialNo;
  
  @Column(name = "ordered_by")
  private Integer orderedBy;
  
  private String doctor;
  
  @Column(name = "lis_state")
  private String lisState;
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  public Date getVisitDate() {
    return this.visitDate;
  }
  
  public void setVisitDate(Date visitDate) {
    this.visitDate = visitDate;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getVisitNo() {
    return this.visitNo;
  }
  
  public void setVisitNo(String visitNo) {
    this.visitNo = visitNo;
  }
  
  public Long getSerialNo() {
    return this.serialNo;
  }
  
  public void setSerialNo(Long serialNo) {
    this.serialNo = serialNo;
  }
  
  public Integer getOrderedBy() {
    return this.orderedBy;
  }
  
  public void setOrderedBy(Integer orderedBy) {
    this.orderedBy = orderedBy;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getLisState() {
    return this.lisState;
  }
  
  public void setLisState(String lisState) {
    this.lisState = lisState;
  }
}
