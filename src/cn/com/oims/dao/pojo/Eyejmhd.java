package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Eyejmhd")
public class Eyejmhd {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyejmhd_sequence")
  @SequenceGenerator(name = "eyejmhd_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyejmhd_sequence")
  @Column(name = "flow_no")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String zuoyan;
  
  private String youyan;
  
  private String demo;
  
  private String doctor;
  
  @Column(name = "cli_date")
  private String cliDate;
  
  @Column(name = "rep_doc")
  private String repDoc;
  
  @Column(name = "check_doc")
  private String checkDoc;
  
  public Long getFlowNo() {
    return this.flowNo;
  }
  
  public void setFlowNo(Long flowNo) {
    this.flowNo = flowNo;
  }
  
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public String getZuoyan() {
    return this.zuoyan;
  }
  
  public void setZuoyan(String zuoyan) {
    this.zuoyan = zuoyan;
  }
  
  public String getYouyan() {
    return this.youyan;
  }
  
  public void setYouyan(String youyan) {
    this.youyan = youyan;
  }
  
  public String getDemo() {
    return this.demo;
  }
  
  public void setDemo(String demo) {
    this.demo = demo;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getCliDate() {
    return this.cliDate;
  }
  
  public void setCliDate(String cliDate) {
    this.cliDate = cliDate;
  }
  
  public String getRepDoc() {
    return this.repDoc;
  }
  
  public void setRepDoc(String repDoc) {
    this.repDoc = repDoc;
  }
  
  public String getCheckDoc() {
    return this.checkDoc;
  }
  
  public void setCheckDoc(String checkDoc) {
    this.checkDoc = checkDoc;
  }
}
