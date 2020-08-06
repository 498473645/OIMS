package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Eyeslj")
public class Eyeslj {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeslj_sequence")
  @SequenceGenerator(name = "eyeslj_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyeslj_sequence")
  @Column(name = "flow_no")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String ly_l_33;
  
  private String ly_r_33;
  
  private String dj_l_33;
  
  private String dj_r_33;
  
  private String ly_l_5;
  
  private String ly_r_5;
  
  private String dj_l_5;
  
  private String dj_r_5;
  
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
  
  public String getLy_l_33() {
    return this.ly_l_33;
  }
  
  public void setLy_l_33(String ly_l_33) {
    this.ly_l_33 = ly_l_33;
  }
  
  public String getLy_r_33() {
    return this.ly_r_33;
  }
  
  public void setLy_r_33(String ly_r_33) {
    this.ly_r_33 = ly_r_33;
  }
  
  public String getDj_l_33() {
    return this.dj_l_33;
  }
  
  public void setDj_l_33(String dj_l_33) {
    this.dj_l_33 = dj_l_33;
  }
  
  public String getDj_r_33() {
    return this.dj_r_33;
  }
  
  public void setDj_r_33(String dj_r_33) {
    this.dj_r_33 = dj_r_33;
  }
  
  public String getLy_l_5() {
    return this.ly_l_5;
  }
  
  public void setLy_l_5(String ly_l_5) {
    this.ly_l_5 = ly_l_5;
  }
  
  public String getLy_r_5() {
    return this.ly_r_5;
  }
  
  public void setLy_r_5(String ly_r_5) {
    this.ly_r_5 = ly_r_5;
  }
  
  public String getDj_l_5() {
    return this.dj_l_5;
  }
  
  public void setDj_l_5(String dj_l_5) {
    this.dj_l_5 = dj_l_5;
  }
  
  public String getDj_r_5() {
    return this.dj_r_5;
  }
  
  public void setDj_r_5(String dj_r_5) {
    this.dj_r_5 = dj_r_5;
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
