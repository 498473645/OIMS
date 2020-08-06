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
@Table(name = "EyePERG")
public class EyePERG implements Serializable {
  private static final long serialVersionUID = 4013588886210613550L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String checkType;
  
  private String sy_type;
  
  private String wavePatternLeft;
  
  private String wavePatternRight;
  
  private String p50RangeValueLeft;
  
  private String p50RangeValueRight;
  
  private String n95RangeValueLeft;
  
  private String n95RangeValueRight;
  
  private String n95p50RatioLeft;
  
  private String n95p50RatioRight;
  
  private String eyeCompare;
  
  private String demo;
  
  private String doctor;
  
  private String cliDate;
  
  private String repDoc;
  
  private String checkDoc;
  
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeperg_sequence")
  @SequenceGenerator(name = "eyeperg_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyeperg_sequence")
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
  
  @Column(name = "p50_rangeValue_left")
  public String getP50RangeValueLeft() {
    return this.p50RangeValueLeft;
  }
  
  public void setP50RangeValueLeft(String p50RangeValueLeft) {
    this.p50RangeValueLeft = p50RangeValueLeft;
  }
  
  @Column(name = "p50_rangeValue_right")
  public String getP50RangeValueRight() {
    return this.p50RangeValueRight;
  }
  
  public void setP50RangeValueRight(String p50RangeValueRight) {
    this.p50RangeValueRight = p50RangeValueRight;
  }
  
  @Column(name = "n95_rangeValue_left")
  public String getN95RangeValueLeft() {
    return this.n95RangeValueLeft;
  }
  
  public void setN95RangeValueLeft(String n95RangeValueLeft) {
    this.n95RangeValueLeft = n95RangeValueLeft;
  }
  
  @Column(name = "n95_rangeValue_right")
  public String getN95RangeValueRight() {
    return this.n95RangeValueRight;
  }
  
  public void setN95RangeValueRight(String n95RangeValueRight) {
    this.n95RangeValueRight = n95RangeValueRight;
  }
  
  @Column(name = "n95_p50_ratio_left")
  public String getN95p50RatioLeft() {
    return this.n95p50RatioLeft;
  }
  
  public void setN95p50RatioLeft(String n95p50RatioLeft) {
    this.n95p50RatioLeft = n95p50RatioLeft;
  }
  
  @Column(name = "n95_p50_ratio_right")
  public String getN95p50RatioRight() {
    return this.n95p50RatioRight;
  }
  
  public void setN95p50RatioRight(String n95p50RatioRight) {
    this.n95p50RatioRight = n95p50RatioRight;
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
