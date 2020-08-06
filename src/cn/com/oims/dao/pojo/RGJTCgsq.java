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

@Entity
@Table(name = "rgjt_cgsq")
public class RGJTCgsq implements Serializable {
  private static final long serialVersionUID = 2374387534684893358L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_cgjh_sequence")
  @SequenceGenerator(name = "rgjt_cgjh_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_cgjh_sequence")
  private Long id;
  
  private Integer supplier;
  
  @Column(name = "expected_date")
  private Date expectedDate;
  
  @Column(nullable = false, length = 50)
  private String title;
  
  @Column(length = 2000)
  private String note;
  
  @Column(length = 30, name = "insert_user", nullable = false)
  private String insertUser;
  
  @Column(name = "insert_date", nullable = false)
  private Date insertDate;
  
  @Column(name = "audit_flag")
  private Boolean auditFlag;
  
  @Column(length = 30)
  private String auditor;
  
  @Column(name = "audit_date")
  private Date auditDate;
  
  @Column(name = "audit_msg", length = 500)
  private String auditMsg;
  
  @Column(name = "approval_flag")
  private Boolean approvalFlag;
  
  @Column(length = 30)
  private String approver;
  
  @Column(name = "approval_date")
  private Date approvalDate;
  
  @Column(name = "approval_msg", length = 500)
  private String approvalMsg;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getExpectedDate() {
    return this.expectedDate;
  }
  
  public void setExpectedDate(Date expectedDate) {
    this.expectedDate = expectedDate;
  }
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public Boolean getAuditFlag() {
    return this.auditFlag;
  }
  
  public void setAuditFlag(Boolean auditFlag) {
    this.auditFlag = auditFlag;
  }
  
  public String getAuditor() {
    return this.auditor;
  }
  
  public void setAuditor(String auditor) {
    this.auditor = auditor;
  }
  
  public Date getAuditDate() {
    return this.auditDate;
  }
  
  public void setAuditDate(Date auditDate) {
    this.auditDate = auditDate;
  }
  
  public String getAuditMsg() {
    return this.auditMsg;
  }
  
  public void setAuditMsg(String auditMsg) {
    this.auditMsg = auditMsg;
  }
  
  public Boolean getApprovalFlag() {
    return this.approvalFlag;
  }
  
  public void setApprovalFlag(Boolean approvalFlag) {
    this.approvalFlag = approvalFlag;
  }
  
  public String getApprover() {
    return this.approver;
  }
  
  public void setApprover(String approver) {
    this.approver = approver;
  }
  
  public Date getApprovalDate() {
    return this.approvalDate;
  }
  
  public void setApprovalDate(Date approvalDate) {
    this.approvalDate = approvalDate;
  }
  
  public String getApprovalMsg() {
    return this.approvalMsg;
  }
  
  public void setApprovalMsg(String approvalMsg) {
    this.approvalMsg = approvalMsg;
  }
  
  public Integer getSupplier() {
    return this.supplier;
  }
  
  public void setSupplier(Integer supplier) {
    this.supplier = supplier;
  }
}
