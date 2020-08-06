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
@Table(name = "rgjt_crkls")
public class RGJTCrkls implements Serializable {
  private static final long serialVersionUID = -7331382642951945425L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_crkls_sequence")
  @SequenceGenerator(name = "rgjt_crkls_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_crkls_sequence")
  private Long id;
  
  @Column(name = "crksq_id")
  private Long crksqId;
  
  @Index(name = "ghsId")
  @Column(name = "ghs_id")
  private Integer ghsId;
  
  @Column(length = 30)
  private String proposer;
  
  @Column(name = "application_date")
  private Date applicationDate;
  
  @Column(name = "type_id")
  private Integer typeId;
  
  @Column(name = "operation_date")
  private Date operationDate;
  
  @Column(name = "insert_user", length = 30, nullable = false)
  private String insertUser;
  
  @Column(name = "insert_date", nullable = false)
  private Date insertDate;
  
  private String note;
  
  @Column(name = "out_or_put", nullable = false)
  private boolean outOrPut;
  
  @Index(name = "patientId")
  @Column(name = "patient_id")
  private String patientId;
  
  private Integer quantity;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getCrksqId() {
    return this.crksqId;
  }
  
  public void setCrksqId(Long csksqId) {
    this.crksqId = csksqId;
  }
  
  public String getProposer() {
    return this.proposer;
  }
  
  public void setProposer(String proposer) {
    this.proposer = proposer;
  }
  
  public Date getApplicationDate() {
    return this.applicationDate;
  }
  
  public void setApplicationDate(Date applicationDate) {
    this.applicationDate = applicationDate;
  }
  
  public Integer getTypeId() {
    return this.typeId;
  }
  
  public void setTypeId(Integer typeId) {
    this.typeId = typeId;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getInertDate() {
    return this.insertDate;
  }
  
  public void setInertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public boolean isOutOrPut() {
    return this.outOrPut;
  }
  
  public void setOutOrPut(boolean outOrPut) {
    this.outOrPut = outOrPut;
  }
  
  public Integer getGhsId() {
    return this.ghsId;
  }
  
  public void setGhsId(Integer ghsId) {
    this.ghsId = ghsId;
  }
  
  public Date getOperationDate() {
    return this.operationDate;
  }
  
  public void setOperationDate(Date operationDate) {
    this.operationDate = operationDate;
  }
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  public Integer getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }
}
