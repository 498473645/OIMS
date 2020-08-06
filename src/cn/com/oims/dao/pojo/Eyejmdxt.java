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
@Table(name = "Eyejmdxt")
public class Eyejmdxt implements Serializable {
  private static final long serialVersionUID = -1128081435723724085L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String jm_xt;
  
  private String jm_ql;
  
  private String jm_txwz;
  
  private String jm_zddwz;
  
  private String jm_zpdwz;
  
  private String jm_sqd_zx;
  
  private String jm_zddjsz;
  
  private String jm_zyq;
  
  private String jm_pzyq;
  
  private String jm_zbq;
  
  private String jm_jmyq;
  
  private String jm_simk;
  
  private String jm_sai;
  
  private String jm_sri;
  
  private String doctor;
  
  private String cli_date;
  
  private String check_doc;
  
  private String yb;
  
  private String check_type;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyejmdxt_sequence")
  @SequenceGenerator(name = "eyejmdxt_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyejmdxt_sequence")
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
  
  public String getJm_xt() {
    return this.jm_xt;
  }
  
  public void setJm_xt(String jm_xt) {
    this.jm_xt = jm_xt;
  }
  
  public String getJm_ql() {
    return this.jm_ql;
  }
  
  public void setJm_ql(String jm_ql) {
    this.jm_ql = jm_ql;
  }
  
  public String getJm_txwz() {
    return this.jm_txwz;
  }
  
  public void setJm_txwz(String jm_txwz) {
    this.jm_txwz = jm_txwz;
  }
  
  public String getJm_zddwz() {
    return this.jm_zddwz;
  }
  
  public void setJm_zddwz(String jm_zddwz) {
    this.jm_zddwz = jm_zddwz;
  }
  
  public String getJm_zpdwz() {
    return this.jm_zpdwz;
  }
  
  public void setJm_zpdwz(String jm_zpdwz) {
    this.jm_zpdwz = jm_zpdwz;
  }
  
  public String getJm_sqd_zx() {
    return this.jm_sqd_zx;
  }
  
  public void setJm_sqd_zx(String jm_sqd_zx) {
    this.jm_sqd_zx = jm_sqd_zx;
  }
  
  public String getJm_zddjsz() {
    return this.jm_zddjsz;
  }
  
  public void setJm_zddjsz(String jm_zddjsz) {
    this.jm_zddjsz = jm_zddjsz;
  }
  
  public String getJm_zyq() {
    return this.jm_zyq;
  }
  
  public void setJm_zyq(String jm_zyq) {
    this.jm_zyq = jm_zyq;
  }
  
  public String getJm_pzyq() {
    return this.jm_pzyq;
  }
  
  public void setJm_pzyq(String jm_pzyq) {
    this.jm_pzyq = jm_pzyq;
  }
  
  public String getJm_zbq() {
    return this.jm_zbq;
  }
  
  public void setJm_zbq(String jm_zbq) {
    this.jm_zbq = jm_zbq;
  }
  
  public String getJm_jmyq() {
    return this.jm_jmyq;
  }
  
  public void setJm_jmyq(String jm_jmyq) {
    this.jm_jmyq = jm_jmyq;
  }
  
  public String getJm_simk() {
    return this.jm_simk;
  }
  
  public void setJm_simk(String jm_simk) {
    this.jm_simk = jm_simk;
  }
  
  public String getJm_sai() {
    return this.jm_sai;
  }
  
  public void setJm_sai(String jm_sai) {
    this.jm_sai = jm_sai;
  }
  
  public String getJm_sri() {
    return this.jm_sri;
  }
  
  public void setJm_sri(String jm_sri) {
    this.jm_sri = jm_sri;
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
  
  public String getCheck_doc() {
    return this.check_doc;
  }
  
  public void setCheck_doc(String check_doc) {
    this.check_doc = check_doc;
  }
  
  public String getYb() {
    return this.yb;
  }
  
  public void setYb(String yb) {
    this.yb = yb;
  }
  
  public String getRep_doc() {
    return this.rep_doc;
  }
  
  public void setRep_doc(String rep_doc) {
    this.rep_doc = rep_doc;
  }
  
  public String getCheck_type() {
    return this.check_type;
  }
  
  public void setCheck_type(String check_type) {
    this.check_type = check_type;
  }
}
