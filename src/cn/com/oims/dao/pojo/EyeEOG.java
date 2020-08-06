package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "EyeEOG")
public class EyeEOG implements Serializable {
  private static final long serialVersionUID = 352728291236284842L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String checkType;
  
  private String sy_type;
  
  private String ardenRatioLeft;
  
  private String ardenRatioRight;
  
  private String reduceLevelLeft;
  
  private String reduceLevelRight;
  
  private String demo;
  
  private String doctor;
  
  private String cliDate;
  
  private String repDoc;
  
  private String checkDoc;
  
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeeog_sequence")
  @SequenceGenerator(name = "eyeeog_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyeeog_sequence")
  public Long getflowNo() {
    return this.flowNo;
  }
  
  public void setflowNo(Long flowNo) {
    this.flowNo = flowNo;
  }
  
  @Column(name = "jcd_id")
  public Long getjcdId() {
    return this.jcdId;
  }
  
  public void setjcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  @Column(name = "check_type")
  public String getCheckType() {
    return this.checkType;
  }
  
  public void setCheckType(String checkType) {
    this.checkType = checkType;
  }
  
  @Column(name = "ardenRatio_left")
  public String getardenRatioLeft() {
    return this.ardenRatioLeft;
  }
  
  public void setardenRatioLeft(String ardenRatioLeft) {
    this.ardenRatioLeft = ardenRatioLeft;
  }
  
  @Column(name = "ardenRatio_right")
  public String getardenRatioRight() {
    return this.ardenRatioRight;
  }
  
  public void setardenRatioRight(String ardenRatioRight) {
    this.ardenRatioRight = ardenRatioRight;
  }
  
  @Column(name = "reduceLevel_left")
  public String getreduceLevelLeft() {
    return this.reduceLevelLeft;
  }
  
  public void setreduceLevelLeft(String reduceLevelLeft) {
    this.reduceLevelLeft = reduceLevelLeft;
  }
  
  @Column(name = "reduceLevel_right")
  public String getreduceLevelRight() {
    return this.reduceLevelRight;
  }
  
  public void setreduceLevelRight(String reduceLevelRight) {
    this.reduceLevelRight = reduceLevelRight;
  }
  
  public String getdemo() {
    return this.demo;
  }
  
  public void setdemo(String demo) {
    this.demo = demo;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  @Column(name = "cli_date")
  public String getcliDate() {
    return this.cliDate;
  }
  
  public void setcliDate(String cliDate) {
    this.cliDate = cliDate;
  }
  
  @Column(name = "rep_doc")
  public String getrepDoc() {
    return this.repDoc;
  }
  
  public void setrepDoc(String repDoc) {
    this.repDoc = repDoc;
  }
  
  @Column(name = "check_doc")
  public String getcheckDoc() {
    return this.checkDoc;
  }
  
  public void setcheckDoc(String checkDoc) {
    this.checkDoc = checkDoc;
  }
  
  public String getSy_type() {
    return this.sy_type;
  }
  
  public void setSy_type(String sy_type) {
    this.sy_type = sy_type;
  }
}
