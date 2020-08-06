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
@Table(name = "EyePVEP")
public class EyePVEP implements Serializable {
  private static final long serialVersionUID = 8139653034675114646L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String checkType;
  
  private String sy_type;
  
  private String wavePatternLeft;
  
  private String wavePatternRight;
  
  private String rangeValue1Left;
  
  private String rangeValue1Right;
  
  private String peakValue1Left;
  
  private String peakValue1Right;
  
  private String rangeValue15Left;
  
  private String rangeValue15Right;
  
  private String peakValue15Left;
  
  private String peakValue15Right;
  
  private String eyeCompare;
  
  private String demo;
  
  private String doctor;
  
  private String cliDate;
  
  private String repDoc;
  
  private String checkDoc;
  
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyepvep_sequence")
  @SequenceGenerator(name = "eyepvep_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyepvep_sequence")
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
  
  @Column(name = "rangeValue_1_left")
  public String getRangeValue1Left() {
    return this.rangeValue1Left;
  }
  
  public void setRangeValue1Left(String rangeValue1Left) {
    this.rangeValue1Left = rangeValue1Left;
  }
  
  @Column(name = "rangeValue_1_right")
  public String getRangeValue1Right() {
    return this.rangeValue1Right;
  }
  
  public void setRangeValue1Right(String rangeValue1Right) {
    this.rangeValue1Right = rangeValue1Right;
  }
  
  @Column(name = "peakValue_1_left")
  public String getPeakValue1Left() {
    return this.peakValue1Left;
  }
  
  public void setPeakValue1Left(String peakValue1Left) {
    this.peakValue1Left = peakValue1Left;
  }
  
  @Column(name = "peakValue_1_right")
  public String getPeakValue1Right() {
    return this.peakValue1Right;
  }
  
  public void setPeakValue1Right(String peakValue1Right) {
    this.peakValue1Right = peakValue1Right;
  }
  
  @Column(name = "rangeValue_15_left")
  public String getRangeValue15Left() {
    return this.rangeValue15Left;
  }
  
  public void setRangeValue15Left(String rangeValue15Left) {
    this.rangeValue15Left = rangeValue15Left;
  }
  
  @Column(name = "rangeValue_15_right")
  public String getRangeValue15Right() {
    return this.rangeValue15Right;
  }
  
  public void setRangeValue15Right(String rangeValue15Right) {
    this.rangeValue15Right = rangeValue15Right;
  }
  
  @Column(name = "peakValue_15_left")
  public String getPeakValue15Left() {
    return this.peakValue15Left;
  }
  
  public void setPeakValue15Left(String peakValue15Left) {
    this.peakValue15Left = peakValue15Left;
  }
  
  @Column(name = "peakValue_15_right")
  public String getPeakValue15Right() {
    return this.peakValue15Right;
  }
  
  public void setPeakValue15Right(String peakValue15Right) {
    this.peakValue15Right = peakValue15Right;
  }
  
  @Column(name = "eye_compare")
  public String getEyeCompare() {
    return this.eyeCompare;
  }
  
  public void setEyeCompare(String eyeCompare) {
    this.eyeCompare = eyeCompare;
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
  
  public String getSy_type() {
    return this.sy_type;
  }
  
  public void setSy_type(String sy_type) {
    this.sy_type = sy_type;
  }
}
