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
@Table(name = "emr_report_details")
public class EMRReportDetails implements Serializable {
  private static final long serialVersionUID = 8105210884142174147L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_report_details_sequence")
  @SequenceGenerator(name = "emr_report_details_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_report_details_sequence")
  private Long id;
  
  @Column(name = "report_detail_num", unique = true, nullable = false)
  private String reportDetailNum;
  
  @Index(name = "reportId")
  @Column(name = "report_id")
  private Long reportId;
  
  @Column(name = "report_no", length = 50, nullable = false)
  private String reportNo;
  
  @Column(name = "item_name", length = 200, nullable = false)
  private String itemName;
  
  @Column(length = 200)
  private String reference;
  
  @Column(length = 2000)
  private String result;
  
  @Column(name = "result_flag")
  private Integer resultFlag;
  
  @Column(length = 2000)
  private String note;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getReportId() {
    return this.reportId;
  }
  
  public void setReportId(Long reportId) {
    this.reportId = reportId;
  }
  
  public String getReportNo() {
    return this.reportNo;
  }
  
  public void setReportNum(String reportNum) {
    this.reportNo = this.reportNo;
  }
  
  public String getItemName() {
    return this.itemName;
  }
  
  public void setItemName(String itemName) {
    this.itemName = itemName;
  }
  
  public String getReference() {
    return this.reference;
  }
  
  public void setReference(String reference) {
    this.reference = reference;
  }
  
  public String getResult() {
    return this.result;
  }
  
  public void setResult(String result) {
    this.result = result;
  }
  
  public Integer getResultFlag() {
    return this.resultFlag;
  }
  
  public void setResultFlag(Integer resultFlag) {
    this.resultFlag = resultFlag;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
}
