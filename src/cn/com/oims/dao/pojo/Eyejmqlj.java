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
@Table(name = "Eyejmqlj")
public class Eyejmqlj implements Serializable {
  private static final long serialVersionUID = 6857707701497982596L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String lk1;
  
  private String lk2;
  
  private String lk1_direction;
  
  private String lk2_direction;
  
  private String rk1;
  
  private String rk2;
  
  private String rk1_direction;
  
  private String rk2_direction;
  
  private String demo;
  
  private String check_doc;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyejmqlj_sequence")
  @SequenceGenerator(name = "eyejmqlj_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyejmqlj_sequence")
  @Column(name = "flow_no")
  public Long getFlowNo() {
    return this.flowNo;
  }
  
  public void setFlowNo(Long flowNo) {
    this.flowNo = flowNo;
  }
  
  @Column(name = "jcd_id")
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public String getLk1() {
    return this.lk1;
  }
  
  public void setLk1(String lk1) {
    this.lk1 = lk1;
  }
  
  public String getLk2() {
    return this.lk2;
  }
  
  public void setLk2(String lk2) {
    this.lk2 = lk2;
  }
  
  public String getLk1_direction() {
    return this.lk1_direction;
  }
  
  public void setLk1_direction(String lk1_direction) {
    this.lk1_direction = lk1_direction;
  }
  
  public String getLk2_direction() {
    return this.lk2_direction;
  }
  
  public void setLk2_direction(String lk2_direction) {
    this.lk2_direction = lk2_direction;
  }
  
  public String getRk1() {
    return this.rk1;
  }
  
  public void setRk1(String rk1) {
    this.rk1 = rk1;
  }
  
  public String getRk2() {
    return this.rk2;
  }
  
  public void setRk2(String rk2) {
    this.rk2 = rk2;
  }
  
  public String getRk1_direction() {
    return this.rk1_direction;
  }
  
  public void setRk1_direction(String rk1_direction) {
    this.rk1_direction = rk1_direction;
  }
  
  public String getRk2_direction() {
    return this.rk2_direction;
  }
  
  public void setRk2_direction(String rk2_direction) {
    this.rk2_direction = rk2_direction;
  }
  
  public String getDemo() {
    return this.demo;
  }
  
  public void setDemo(String demo) {
    this.demo = demo;
  }
  
  public String getCheck_doc() {
    return this.check_doc;
  }
  
  public void setCheck_doc(String check_doc) {
    this.check_doc = check_doc;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getCli_date() {
    return this.cli_date;
  }
  
  public void setCli_date(String cli_date) {
    this.cli_date = cli_date;
  }
  
  public String getRep_doc() {
    return this.rep_doc;
  }
  
  public void setRep_doc(String rep_doc) {
    this.rep_doc = rep_doc;
  }
}
