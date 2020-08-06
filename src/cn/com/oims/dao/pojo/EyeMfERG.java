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
@Table(name = "eyemferg")
public class EyeMfERG implements Serializable {
  private static final long serialVersionUID = 1577191183222294029L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String checkType;
  
  private String sy_type;
  
  private String wavePatternLeft;
  
  private String wavePatternRight;
  
  private String swingDensityLeft;
  
  private String swingDensityRight;
  
  private String centerToEdgeLeft;
  
  private String centerToEdgeRight;
  
  private String eyeCompare;
  
  private String demo;
  
  private String doctor;
  
  private String cliDate;
  
  private String repDoc;
  
  private String checkDoc;
  
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyemferg_sequence")
  @SequenceGenerator(name = "eyemferg_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyemferg_sequence")
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
  
  @Column(name = "wavePattern_left")
  public String getWavePatternLeft() {
    return this.wavePatternLeft;
  }
  
  public void setWavePatternLeft(String wavePatternLeft) {
    this.wavePatternLeft = wavePatternLeft;
  }
  
  @Column(name = "wavePattern_right")
  public String getWavePatternRight() {
    return this.wavePatternRight;
  }
  
  public void setWavePatternRight(String wavePatternRight) {
    this.wavePatternRight = wavePatternRight;
  }
  
  @Column(name = "swingDensity_left")
  public String getswingDensityLeft() {
    return this.swingDensityLeft;
  }
  
  public void setswingDensityLeft(String swingDensityLeft) {
    this.swingDensityLeft = swingDensityLeft;
  }
  
  @Column(name = "swingDensity_right")
  public String getswingDensityRight() {
    return this.swingDensityRight;
  }
  
  public void setswingDensityRight(String swingDensityRight) {
    this.swingDensityRight = swingDensityRight;
  }
  
  @Column(name = "centerToEdge_left")
  public String getcenterToEdgeLeft() {
    return this.centerToEdgeLeft;
  }
  
  public void setcenterToEdgeLeft(String centerToEdgeLeft) {
    this.centerToEdgeLeft = centerToEdgeLeft;
  }
  
  @Column(name = "centerToEdge_right")
  public String getcenterToEdgeRight() {
    return this.centerToEdgeRight;
  }
  
  public void setcenterToEdgeRight(String centerToEdgeRight) {
    this.centerToEdgeRight = centerToEdgeRight;
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
  public String getCheckDoc() {
    return this.checkDoc;
  }
  
  public void setCheckDoc(String checkDoc) {
    this.checkDoc = checkDoc;
  }
  
  @Column(name = "eye_compare")
  public String getEyeCompare() {
    return this.eyeCompare;
  }
  
  public void setEyeCompare(String eyeCompare) {
    this.eyeCompare = eyeCompare;
  }
  
  public String getSy_type() {
    return this.sy_type;
  }
  
  public void setSy_type(String sy_type) {
    this.sy_type = sy_type;
  }
}
