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
@Table(name = "emr_inhospitalcard")
public class EMRInHospitalCard implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_inhospitalcard_sequence")
  @SequenceGenerator(name = "emr_inhospitalcard_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_inhospitalcard_sequence")
  private Long id;
  
  @Column(name = "visit_date")
  private Date visitDate;
  
  @Column(name = "visit_no")
  private String visitNo;
  
  @Column(name = "patient_id")
  private String patientID;
  
  @Column(name = "patient_type")
  private Integer patientType;
  
  @Column(name = "special_desc")
  private String specialDesc;
  
  @Column(name = "ordered_by")
  private String orderedBy;
  
  @Column(name = "doctor_name")
  private String doctorName;
  
  @Column(name = "pre_perment")
  private Float prePerment;
  
  @Column(name = "create_date")
  private Date createDate;
  
  @Column(name = "pre_condition")
  private Integer preCondition;
  
  private Integer status;
  
  private String remark;
  
  private Integer priority;
  
  private String address;
  
  @Column(name = "inp_card_type")
  private Integer inpCardType;
  
  @Column(name = "pre_dept")
  private String preDept;
  
  private String hisback;
  
  @Column(name = "pat_type_code")
  private Integer patTypeCode;
  
  private String outpDiagnosis;
  
  private String jiuzhenId;
  
  private String hzid;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getVisitDate() {
    return this.visitDate;
  }
  
  public void setVisitDate(Date visitDate) {
    this.visitDate = visitDate;
  }
  
  public String getVisitNo() {
    return this.visitNo;
  }
  
  public void setVisitNo(String visitNo) {
    this.visitNo = visitNo;
  }
  
  public String getPatientID() {
    return this.patientID;
  }
  
  public void setPatientID(String patientID) {
    this.patientID = patientID;
  }
  
  public Integer getPatientType() {
    return this.patientType;
  }
  
  public void setPatientType(Integer patientType) {
    this.patientType = patientType;
  }
  
  public String getSpecialDesc() {
    return this.specialDesc;
  }
  
  public void setSpecialDesc(String specialDesc) {
    this.specialDesc = specialDesc;
  }
  
  public String getOrderedBy() {
    return this.orderedBy;
  }
  
  public void setOrderedBy(String orderedBy) {
    this.orderedBy = orderedBy;
  }
  
  public String getDoctorName() {
    return this.doctorName;
  }
  
  public void setDoctorName(String doctorName) {
    this.doctorName = doctorName;
  }
  
  public Float getPrePerment() {
    return this.prePerment;
  }
  
  public void setPrePerment(Float prePerment) {
    this.prePerment = prePerment;
  }
  
  public Date getCreateDate() {
    return this.createDate;
  }
  
  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }
  
  public Integer getPreCondition() {
    return this.preCondition;
  }
  
  public void setPreCondition(Integer preCondition) {
    this.preCondition = preCondition;
  }
  
  public Integer getStatus() {
    return this.status;
  }
  
  public void setStatus(Integer status) {
    this.status = status;
  }
  
  public String getRemark() {
    return this.remark;
  }
  
  public void setRemark(String remark) {
    this.remark = remark;
  }
  
  public Integer getPriority() {
    return this.priority;
  }
  
  public void setPriority(Integer priority) {
    this.priority = priority;
  }
  
  public String getAddress() {
    return this.address;
  }
  
  public void setAddress(String address) {
    this.address = address;
  }
  
  public Integer getInpCardType() {
    return this.inpCardType;
  }
  
  public void setInpCardType(Integer inpCardType) {
    this.inpCardType = inpCardType;
  }
  
  public String getPreDept() {
    return this.preDept;
  }
  
  public void setPreDept(String preDept) {
    this.preDept = preDept;
  }
  
  public Integer getPatTypeCode() {
    return this.patTypeCode;
  }
  
  public void setPatTypeCode(Integer patTypeCode) {
    this.patTypeCode = patTypeCode;
  }
  
  public String getOutpDiagnosis() {
    return this.outpDiagnosis;
  }
  
  public void setOutpDiagnosis(String outpDiagnosis) {
    this.outpDiagnosis = outpDiagnosis;
  }
  
  public String getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(String jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  public String getHzid() {
    return this.hzid;
  }
  
  public void setHzid(String hzid) {
    this.hzid = hzid;
  }
  
  public String getHisback() {
    return this.hisback;
  }
  
  public void setHisback(String hisback) {
    this.hisback = hisback;
  }
}
