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
@Table(name = "Eyebchao")
public class Eyebchao implements Serializable {
  private static final long serialVersionUID = 2809380078689484037L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private Long huanzhexinxi_id;
  
  private String jckj1;
  
  private String jckj2;
  
  private String jckj3;
  
  private String memo;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyebchao_sequence")
  @SequenceGenerator(name = "eyebchao_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyebchao_sequence")
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
  
  public String getJckj1() {
    return this.jckj1;
  }
  
  public void setJckj1(String jckj1) {
    this.jckj1 = jckj1;
  }
  
  public String getJckj2() {
    return this.jckj2;
  }
  
  public void setJckj2(String jckj2) {
    this.jckj2 = jckj2;
  }
  
  public String getJckj3() {
    return this.jckj3;
  }
  
  public void setJckj3(String jckj3) {
    this.jckj3 = jckj3;
  }
  
  public String getMemo() {
    return this.memo;
  }
  
  public void setMemo(String memo) {
    this.memo = memo;
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
