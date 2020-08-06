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
@Table(name = "EyeFERG")
public class EyeFERG implements Serializable {
  private static final long serialVersionUID = 3019915490476805400L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String checkType;
  
  private String sy_type;
  
  private String wavePatternLeft;
  
  private String wavePatternRight;
  
  private String anshi001BboLeft;
  
  private String anshi001BboRight;
  
  private String anshi30AboLeft;
  
  private String anshi30BboLeft;
  
  private String anshi30AboRight;
  
  private String anshi30BboRight;
  
  private String anshi30Op2BoLeft;
  
  private String anshi30Op2BoRight;
  
  private String anshi100AboLeft;
  
  private String anshi100BboLeft;
  
  private String anshi100AboRight;
  
  private String anshi100BboRight;
  
  private String mingshi30AboLeft;
  
  private String mingshi30BboLeft;
  
  private String mingshi30AboRight;
  
  private String mingshi30BboRight;
  
  private String mingshi30HZOp2BoLeft;
  
  private String mingshi30HZOp2BoRight;
  
  private String eyeCompare;
  
  private String demo;
  
  private String doctor;
  
  private String cliDate;
  
  private String repDoc;
  
  private String checkDoc;
  
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeferg_sequence")
  @SequenceGenerator(name = "eyeferg_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyeferg_sequence")
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
  
  @Column(name = "anshi_001_bbo_left")
  public String getAnshi001BboLeft() {
    return this.anshi001BboLeft;
  }
  
  public void setAnshi001BboLeft(String anshi001BboLeft) {
    this.anshi001BboLeft = anshi001BboLeft;
  }
  
  @Column(name = "anshi_001_bbo_right")
  public String getAnshi001BboRight() {
    return this.anshi001BboRight;
  }
  
  public void setAnshi001BboRight(String anshi001BboRight) {
    this.anshi001BboRight = anshi001BboRight;
  }
  
  @Column(name = "anshi30_abo_left")
  public String getAnshi30AboLeft() {
    return this.anshi30AboLeft;
  }
  
  public void setAnshi30AboLeft(String anshi30AboLeft) {
    this.anshi30AboLeft = anshi30AboLeft;
  }
  
  @Column(name = "anshi30_bbo_left")
  public String getAnshi30BboLeft() {
    return this.anshi30BboLeft;
  }
  
  public void setAnshi30BboLeft(String anshi30BboLeft) {
    this.anshi30BboLeft = anshi30BboLeft;
  }
  
  @Column(name = "anshi30_abo_right")
  public String getAnshi30AboRight() {
    return this.anshi30AboRight;
  }
  
  public void setAnshi30AboRight(String anshi30AboRight) {
    this.anshi30AboRight = anshi30AboRight;
  }
  
  @Column(name = "anshi30_bbo_right")
  public String getAnshi30BboRight() {
    return this.anshi30BboRight;
  }
  
  public void setAnshi30BboRight(String anshi30BboRight) {
    this.anshi30BboRight = anshi30BboRight;
  }
  
  @Column(name = "anshi100_abo_left")
  public String getAnshi100AboLeft() {
    return this.anshi100AboLeft;
  }
  
  public void setAnshi100AboLeft(String anshi100AboLeft) {
    this.anshi100AboLeft = anshi100AboLeft;
  }
  
  @Column(name = "anshi100_bbo_left")
  public String getAnshi100BboLeft() {
    return this.anshi100BboLeft;
  }
  
  public void setAnshi100BboLeft(String anshi100BboLeft) {
    this.anshi100BboLeft = anshi100BboLeft;
  }
  
  @Column(name = "anshi100_abo_right")
  public String getAnshi100AboRight() {
    return this.anshi100AboRight;
  }
  
  public void setAnshi100AboRight(String anshi100AboRight) {
    this.anshi100AboRight = anshi100AboRight;
  }
  
  @Column(name = "anshi100_bbo_right")
  public String getAnshi100BboRight() {
    return this.anshi100BboRight;
  }
  
  public void setAnshi100BboRight(String anshi100BboRight) {
    this.anshi100BboRight = anshi100BboRight;
  }
  
  @Column(name = "anshi30_OP2bo_left")
  public String getAnshi30Op2BoLeft() {
    return this.anshi30Op2BoLeft;
  }
  
  public void setAnshi30Op2BoLeft(String anshi30Op2BoLeft) {
    this.anshi30Op2BoLeft = anshi30Op2BoLeft;
  }
  
  @Column(name = "anshi30_OP2bo_right")
  public String getAnshi30Op2BoRight() {
    return this.anshi30Op2BoRight;
  }
  
  public void setAnshi30Op2BoRight(String anshi30Op2BoRight) {
    this.anshi30Op2BoRight = anshi30Op2BoRight;
  }
  
  @Column(name = "mingshi30_abo_left")
  public String getMingshi30AboLeft() {
    return this.mingshi30AboLeft;
  }
  
  public void setMingshi30AboLeft(String mingshi30AboLeft) {
    this.mingshi30AboLeft = mingshi30AboLeft;
  }
  
  @Column(name = "mingshi30_bbo_left")
  public String getMingshi30BboLeft() {
    return this.mingshi30BboLeft;
  }
  
  public void setMingshi30BboLeft(String mingshi30BboLeft) {
    this.mingshi30BboLeft = mingshi30BboLeft;
  }
  
  @Column(name = "mingshi30_abo_right")
  public String getMingshi30AboRight() {
    return this.mingshi30AboRight;
  }
  
  public void setMingshi30AboRight(String mingshi30AboRight) {
    this.mingshi30AboRight = mingshi30AboRight;
  }
  
  @Column(name = "mingshi30_bbo_right")
  public String getMingshi30BboRight() {
    return this.mingshi30BboRight;
  }
  
  public void setMingshi30BboRight(String mingshi30BboRight) {
    this.mingshi30BboRight = mingshi30BboRight;
  }
  
  @Column(name = "mingshi30HZ_OP2bo_left")
  public String getMingshi30HZOp2BoLeft() {
    return this.mingshi30HZOp2BoLeft;
  }
  
  public void setMingshi30HZOp2BoLeft(String mingshi30hzOp2BoLeft) {
    this.mingshi30HZOp2BoLeft = mingshi30hzOp2BoLeft;
  }
  
  @Column(name = "mingshi30HZ_OP2bo_right")
  public String getMingshi30HZOp2BoRight() {
    return this.mingshi30HZOp2BoRight;
  }
  
  public void setMingshi30HZOp2BoRight(String mingshi30hzOp2BoRight) {
    this.mingshi30HZOp2BoRight = mingshi30hzOp2BoRight;
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
