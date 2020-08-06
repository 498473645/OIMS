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
@Table(name = "Eyeubm")
public class Eyeubm implements Serializable {
  private static final long serialVersionUID = -5687281186664946225L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private Long huanzhexinxi_id;
  
  private String ubm_no;
  
  private String yanbie;
  
  private String result;
  
  private String memo;
  
  private String extend_result1;
  
  private String extend_result2;
  
  private String extend_result3;
  
  private String check_doc;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeubm_sequence")
  @SequenceGenerator(name = "eyeubm_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyeubm_sequence")
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
  
  public Long getHuanzhexinxi_id() {
    return this.huanzhexinxi_id;
  }
  
  public void setHuanzhexinxi_id(Long huanzhexinxi_id) {
    this.huanzhexinxi_id = huanzhexinxi_id;
  }
  
  public String getUbm_no() {
    return this.ubm_no;
  }
  
  public void setUbm_no(String ubm_no) {
    this.ubm_no = ubm_no;
  }
  
  public String getYanbie() {
    return this.yanbie;
  }
  
  public void setYanbie(String yanbie) {
    this.yanbie = yanbie;
  }
  
  public String getResult() {
    return this.result;
  }
  
  public void setResult(String result) {
    this.result = result;
  }
  
  public String getMemo() {
    return this.memo;
  }
  
  public void setMemo(String memo) {
    this.memo = memo;
  }
  
  public String getExtend_result1() {
    return this.extend_result1;
  }
  
  public void setExtend_result1(String extend_result1) {
    this.extend_result1 = extend_result1;
  }
  
  public String getExtend_result2() {
    return this.extend_result2;
  }
  
  public void setExtend_result2(String extend_result2) {
    this.extend_result2 = extend_result2;
  }
  
  public String getExtend_result3() {
    return this.extend_result3;
  }
  
  public void setExtend_result3(String extend_result3) {
    this.extend_result3 = extend_result3;
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
