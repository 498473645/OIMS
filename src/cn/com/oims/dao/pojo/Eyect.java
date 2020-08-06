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
@Table(name = "Eyect")
public class Eyect implements Serializable {
  private static final long serialVersionUID = -3726424286981840384L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private Long huanzhexinxi_id;
  
  private String r_k1;
  
  private String r_k2;
  
  private String r_l;
  
  private String r_iol;
  
  private String l_k1;
  
  private String l_k2;
  
  private String l_l;
  
  private String l_iol;
  
  private String check_type;
  
  private String ct_result;
  
  private String check_doc;
  
  private String demo;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyect_sequence")
  @SequenceGenerator(name = "eyect_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyect_sequence")
  @Column(name = "flow_no")
  public Long getFlowNo() {
    return this.flowNo;
  }
  
  @Column(name = "flow_no")
  public void setFlowNo(Long flowNo) {
    this.flowNo = flowNo;
  }
  
  @Column(name = "jcd_id")
  public Long getJcdId() {
    return this.jcdId;
  }
  
  @Column(name = "jcd_id")
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public Long getHuanzhexinxi_id() {
    return this.huanzhexinxi_id;
  }
  
  public void setHuanzhexinxi_id(Long huanzhexinxi_id) {
    this.huanzhexinxi_id = huanzhexinxi_id;
  }
  
  public String getR_k1() {
    return this.r_k1;
  }
  
  public void setR_k1(String r_k1) {
    this.r_k1 = r_k1;
  }
  
  public String getR_k2() {
    return this.r_k2;
  }
  
  public void setR_k2(String r_k2) {
    this.r_k2 = r_k2;
  }
  
  public String getR_l() {
    return this.r_l;
  }
  
  public void setR_l(String r_l) {
    this.r_l = r_l;
  }
  
  public String getR_iol() {
    return this.r_iol;
  }
  
  public void setR_iol(String r_iol) {
    this.r_iol = r_iol;
  }
  
  public String getL_k1() {
    return this.l_k1;
  }
  
  public void setL_k1(String l_k1) {
    this.l_k1 = l_k1;
  }
  
  public String getL_k2() {
    return this.l_k2;
  }
  
  public void setL_k2(String l_k2) {
    this.l_k2 = l_k2;
  }
  
  public String getL_l() {
    return this.l_l;
  }
  
  public void setL_l(String l_l) {
    this.l_l = l_l;
  }
  
  public String getL_iol() {
    return this.l_iol;
  }
  
  public void setL_iol(String l_iol) {
    this.l_iol = l_iol;
  }
  
  public String getCheck_type() {
    return this.check_type;
  }
  
  public void setCheck_type(String check_type) {
    this.check_type = check_type;
  }
  
  public String getCt_result() {
    return this.ct_result;
  }
  
  public void setCt_result(String ct_result) {
    this.ct_result = ct_result;
  }
  
  public String getCheck_doc() {
    return this.check_doc;
  }
  
  public void setCheck_doc(String check_doc) {
    this.check_doc = check_doc;
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
