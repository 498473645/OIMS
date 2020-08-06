package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "eyebdx")
public class Eyebdx {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyebdx_sequence")
  @SequenceGenerator(name = "eyebdx_sequence", sequenceName = "eyebdx_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String ls_l;
  
  private String ls_r;
  
  private String dj_l;
  
  private String dj_r;
  
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
  
  public String getLs_l() {
    return this.ls_l;
  }
  
  public void setLs_l(String ls_l) {
    this.ls_l = ls_l;
  }
  
  public String getLs_r() {
    return this.ls_r;
  }
  
  public void setLs_r(String ls_r) {
    this.ls_r = ls_r;
  }
  
  public String getDj_l() {
    return this.dj_l;
  }
  
  public void setDj_l(String dj_l) {
    this.dj_l = dj_l;
  }
  
  public String getDj_r() {
    return this.dj_r;
  }
  
  public void setDj_r(String dj_r) {
    this.dj_r = dj_r;
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
