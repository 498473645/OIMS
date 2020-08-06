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
@Table(name = "EyeFVEP")
public class EyeFVEP implements Serializable {
  private static final long serialVersionUID = 6273966798858482569L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String checkType;
  
  private String sy_type;
  
  private String wavePatternLeft;
  
  private String wavePatternRight;
  
  private String p2WavePeakLeft;
  
  private String p2WavePeakRight;
  
  private String eyeCompare;
  
  private String demo;
  
  private String doctor;
  
  private String cliDate;
  
  private String repDoc;
  
  private String checkDoc;
  
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyefvep_sequence")
  @SequenceGenerator(name = "eyefvep_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyefvep_sequence")
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
  
  @Column(name = "p2_wavePeak_left")
  public String getp2WavePeakLeft() {
    return this.p2WavePeakLeft;
  }
  
  public void setp2WavePeakLeft(String p2WavePeakLeft) {
    this.p2WavePeakLeft = p2WavePeakLeft;
  }
  
  @Column(name = "p2_wavePeak_right")
  public String getp2WavePeakRight() {
    return this.p2WavePeakRight;
  }
  
  public void setp2WavePeakRight(String p2WavePeakRight) {
    this.p2WavePeakRight = p2WavePeakRight;
  }
  
  @Column(name = "eye_compare")
  public String geteyeCompare() {
    return this.eyeCompare;
  }
  
  public void seteyeCompare(String eyeCompare) {
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
