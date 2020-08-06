package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "exam_check")
public class ExamCheck {
  private String examNo;
  
  private Long jiuzhenId;
  
  private String patientId;
  
  private String itemCode;
  
  private String itemName;
  
  private String doctor;
  
  private Date requisitionTime;
  
  private Float costs;
  
  @Id
  @Column(name = "exam_no")
  public String getExamNo() {
    return this.examNo;
  }
  
  public void setExamNo(String examNo) {
    this.examNo = examNo;
  }
  
  @Column(name = "jiuzhen_id")
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  @Column(name = "patient_id")
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  @Column(name = "item_code")
  public String getItemCode() {
    return this.itemCode;
  }
  
  public void setItemCode(String itemCode) {
    this.itemCode = itemCode;
  }
  
  @Column(name = "item_name")
  public String getItemName() {
    return this.itemName;
  }
  
  public void setItemName(String itemName) {
    this.itemName = itemName;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  @Column(name = "requisition_time")
  public Date getRequisitionTime() {
    return this.requisitionTime;
  }
  
  public void setRequisitionTime(Date requisitionTime) {
    this.requisitionTime = requisitionTime;
  }
  
  public Float getCosts() {
    return this.costs;
  }
  
  public void setCosts(Float costs) {
    this.costs = costs;
  }
}
