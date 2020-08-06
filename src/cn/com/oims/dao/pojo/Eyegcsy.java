package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Eyegcsy")
public class Eyegcsy {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyegcsy_sequence")
  @SequenceGenerator(name = "eyegcsy_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyegcsy_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  @Column(name = "sy_no")
  private String syNo;
  
  private String result;
  
  private String yb;
  
  @Column(name = "sy_type")
  private String syType;
  
  @Column(name = "sy_prog1")
  private String syProg1;
  
  @Column(name = "sy_prog2")
  private String syProg2;
  
  @Column(name = "sy_prog3")
  private String syProg3;
  
  private String demo;
  
  private String doctor;
  
  @Column(name = "cli_date")
  private String cliDate;
  
  @Column(name = "rep_doc")
  private String repDoc;
  
  @Column(name = "check_date")
  private String checkDate;
  
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
  
  public String getSyNo() {
    return this.syNo;
  }
  
  public void setSyNo(String syNo) {
    this.syNo = syNo;
  }
  
  public String getResult() {
    return this.result;
  }
  
  public void setResult(String result) {
    this.result = result;
  }
  
  public String getYb() {
    return this.yb;
  }
  
  public void setYb(String yb) {
    this.yb = yb;
  }
  
  public String getSyType() {
    return this.syType;
  }
  
  public void setSyType(String syType) {
    this.syType = syType;
  }
  
  public String getSyProg1() {
    return this.syProg1;
  }
  
  public void setSyProg1(String syProg1) {
    this.syProg1 = syProg1;
  }
  
  public String getSyProg2() {
    return this.syProg2;
  }
  
  public void setSyProg2(String syProg2) {
    this.syProg2 = syProg2;
  }
  
  public String getSyProg3() {
    return this.syProg3;
  }
  
  public void setSyProg3(String syProg3) {
    this.syProg3 = syProg3;
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
  
  public String getCheckDate() {
    return this.checkDate;
  }
  
  public void setCheckDate(String checkDate) {
    this.checkDate = checkDate;
  }
}
