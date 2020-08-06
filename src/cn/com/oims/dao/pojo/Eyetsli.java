package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "eyetsli")
public class Eyetsli {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyetsli_sequence")
  @SequenceGenerator(name = "eyetsli_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyetsli_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String tx_ys_ly_l;
  
  private String tx_ys_ly_r;
  
  private String tx_ys_jz_l;
  
  private String tx_ys_jz_r;
  
  private String tx_ys_zk_l;
  
  private String tx_ys_zk_r;
  
  private String tx_js_ly_l;
  
  private String tx_js_ly_r;
  
  private String tx_js_jz_l;
  
  private String tx_js_jz_r;
  
  private String tx_js_zk_l;
  
  private String tx_js_zk_r;
  
  private String E_ys_ly_l;
  
  private String E_ys_ly_r;
  
  private String E_ys_jz_l;
  
  private String E_ys_jz_r;
  
  private String E_ys_zk_l;
  
  private String E_ys_zk_r;
  
  private String E_js_ly_l;
  
  private String E_js_ly_r;
  
  private String E_js_jz_l;
  
  private String E_js_jz_r;
  
  private String E_js_zk_l;
  
  private String E_js_zk_r;
  
  private String xz_ys_ly_l;
  
  private String xz_ys_ly_r;
  
  private String xz_ys_jz_l;
  
  private String xz_ys_jz_r;
  
  private String xz_ys_zk_l;
  
  private String xz_ys_zk_r;
  
  private String xz_js_ly_l;
  
  private String xz_js_ly_r;
  
  private String xz_js_jz_l;
  
  private String xz_js_jz_r;
  
  private String xz_js_zk_l;
  
  private String xz_js_zk_r;
  
  private String sj_l;
  
  private String sj_r;
  
  private String demo;
  
  private String doctor;
  
  @Column(name = "cli_date")
  private String cliDate;
  
  @Column(name = "rep_doc")
  private String repDoc;
  
  @Column(name = "check_doc")
  private String checkDoc;
  
  public Long getFlowNo() {
    return this.flowNo;
  }
  
  public void setFlowNo(Long flowNo) {
    this.flowNo = flowNo;
  }
  
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public String getTx_ys_ly_l() {
    return this.tx_ys_ly_l;
  }
  
  public void setTx_ys_ly_l(String tx_ys_ly_l) {
    this.tx_ys_ly_l = tx_ys_ly_l;
  }
  
  public String getTx_ys_ly_r() {
    return this.tx_ys_ly_r;
  }
  
  public void setTx_ys_ly_r(String tx_ys_ly_r) {
    this.tx_ys_ly_r = tx_ys_ly_r;
  }
  
  public String getTx_ys_jz_l() {
    return this.tx_ys_jz_l;
  }
  
  public void setTx_ys_jz_l(String tx_ys_jz_l) {
    this.tx_ys_jz_l = tx_ys_jz_l;
  }
  
  public String getTx_ys_jz_r() {
    return this.tx_ys_jz_r;
  }
  
  public void setTx_ys_jz_r(String tx_ys_jz_r) {
    this.tx_ys_jz_r = tx_ys_jz_r;
  }
  
  public String getTx_ys_zk_l() {
    return this.tx_ys_zk_l;
  }
  
  public void setTx_ys_zk_l(String tx_ys_zk_l) {
    this.tx_ys_zk_l = tx_ys_zk_l;
  }
  
  public String getTx_ys_zk_r() {
    return this.tx_ys_zk_r;
  }
  
  public void setTx_ys_zk_r(String tx_ys_zk_r) {
    this.tx_ys_zk_r = tx_ys_zk_r;
  }
  
  public String getTx_js_ly_l() {
    return this.tx_js_ly_l;
  }
  
  public void setTx_js_ly_l(String tx_js_ly_l) {
    this.tx_js_ly_l = tx_js_ly_l;
  }
  
  public String getTx_js_ly_r() {
    return this.tx_js_ly_r;
  }
  
  public void setTx_js_ly_r(String tx_js_ly_r) {
    this.tx_js_ly_r = tx_js_ly_r;
  }
  
  public String getTx_js_jz_l() {
    return this.tx_js_jz_l;
  }
  
  public void setTx_js_jz_l(String tx_js_jz_l) {
    this.tx_js_jz_l = tx_js_jz_l;
  }
  
  public String getTx_js_jz_r() {
    return this.tx_js_jz_r;
  }
  
  public void setTx_js_jz_r(String tx_js_jz_r) {
    this.tx_js_jz_r = tx_js_jz_r;
  }
  
  public String getTx_js_zk_l() {
    return this.tx_js_zk_l;
  }
  
  public void setTx_js_zk_l(String tx_js_zk_l) {
    this.tx_js_zk_l = tx_js_zk_l;
  }
  
  public String getTx_js_zk_r() {
    return this.tx_js_zk_r;
  }
  
  public void setTx_js_zk_r(String tx_js_zk_r) {
    this.tx_js_zk_r = tx_js_zk_r;
  }
  
  public String getE_ys_ly_l() {
    return this.E_ys_ly_l;
  }
  
  public void setE_ys_ly_l(String e_ys_ly_l) {
    this.E_ys_ly_l = e_ys_ly_l;
  }
  
  public String getE_ys_ly_r() {
    return this.E_ys_ly_r;
  }
  
  public void setE_ys_ly_r(String e_ys_ly_r) {
    this.E_ys_ly_r = e_ys_ly_r;
  }
  
  public String getE_ys_jz_l() {
    return this.E_ys_jz_l;
  }
  
  public void setE_ys_jz_l(String e_ys_jz_l) {
    this.E_ys_jz_l = e_ys_jz_l;
  }
  
  public String getE_ys_jz_r() {
    return this.E_ys_jz_r;
  }
  
  public void setE_ys_jz_r(String e_ys_jz_r) {
    this.E_ys_jz_r = e_ys_jz_r;
  }
  
  public String getE_ys_zk_l() {
    return this.E_ys_zk_l;
  }
  
  public void setE_ys_zk_l(String e_ys_zk_l) {
    this.E_ys_zk_l = e_ys_zk_l;
  }
  
  public String getE_ys_zk_r() {
    return this.E_ys_zk_r;
  }
  
  public void setE_ys_zk_r(String e_ys_zk_r) {
    this.E_ys_zk_r = e_ys_zk_r;
  }
  
  public String getE_js_ly_l() {
    return this.E_js_ly_l;
  }
  
  public void setE_js_ly_l(String e_js_ly_l) {
    this.E_js_ly_l = e_js_ly_l;
  }
  
  public String getE_js_ly_r() {
    return this.E_js_ly_r;
  }
  
  public void setE_js_ly_r(String e_js_ly_r) {
    this.E_js_ly_r = e_js_ly_r;
  }
  
  public String getE_js_jz_l() {
    return this.E_js_jz_l;
  }
  
  public void setE_js_jz_l(String e_js_jz_l) {
    this.E_js_jz_l = e_js_jz_l;
  }
  
  public String getE_js_jz_r() {
    return this.E_js_jz_r;
  }
  
  public void setE_js_jz_r(String e_js_jz_r) {
    this.E_js_jz_r = e_js_jz_r;
  }
  
  public String getE_js_zk_l() {
    return this.E_js_zk_l;
  }
  
  public void setE_js_zk_l(String e_js_zk_l) {
    this.E_js_zk_l = e_js_zk_l;
  }
  
  public String getE_js_zk_r() {
    return this.E_js_zk_r;
  }
  
  public void setE_js_zk_r(String e_js_zk_r) {
    this.E_js_zk_r = e_js_zk_r;
  }
  
  public String getXz_ys_ly_l() {
    return this.xz_ys_ly_l;
  }
  
  public void setXz_ys_ly_l(String xz_ys_ly_l) {
    this.xz_ys_ly_l = xz_ys_ly_l;
  }
  
  public String getXz_ys_ly_r() {
    return this.xz_ys_ly_r;
  }
  
  public void setXz_ys_ly_r(String xz_ys_ly_r) {
    this.xz_ys_ly_r = xz_ys_ly_r;
  }
  
  public String getXz_ys_jz_l() {
    return this.xz_ys_jz_l;
  }
  
  public void setXz_ys_jz_l(String xz_ys_jz_l) {
    this.xz_ys_jz_l = xz_ys_jz_l;
  }
  
  public String getXz_ys_jz_r() {
    return this.xz_ys_jz_r;
  }
  
  public void setXz_ys_jz_r(String xz_ys_jz_r) {
    this.xz_ys_jz_r = xz_ys_jz_r;
  }
  
  public String getXz_ys_zk_l() {
    return this.xz_ys_zk_l;
  }
  
  public void setXz_ys_zk_l(String xz_ys_zk_l) {
    this.xz_ys_zk_l = xz_ys_zk_l;
  }
  
  public String getXz_ys_zk_r() {
    return this.xz_ys_zk_r;
  }
  
  public void setXz_ys_zk_r(String xz_ys_zk_r) {
    this.xz_ys_zk_r = xz_ys_zk_r;
  }
  
  public String getXz_js_ly_l() {
    return this.xz_js_ly_l;
  }
  
  public void setXz_js_ly_l(String xz_js_ly_l) {
    this.xz_js_ly_l = xz_js_ly_l;
  }
  
  public String getXz_js_ly_r() {
    return this.xz_js_ly_r;
  }
  
  public void setXz_js_ly_r(String xz_js_ly_r) {
    this.xz_js_ly_r = xz_js_ly_r;
  }
  
  public String getXz_js_jz_l() {
    return this.xz_js_jz_l;
  }
  
  public void setXz_js_jz_l(String xz_js_jz_l) {
    this.xz_js_jz_l = xz_js_jz_l;
  }
  
  public String getXz_js_jz_r() {
    return this.xz_js_jz_r;
  }
  
  public void setXz_js_jz_r(String xz_js_jz_r) {
    this.xz_js_jz_r = xz_js_jz_r;
  }
  
  public String getXz_js_zk_l() {
    return this.xz_js_zk_l;
  }
  
  public void setXz_js_zk_l(String xz_js_zk_l) {
    this.xz_js_zk_l = xz_js_zk_l;
  }
  
  public String getXz_js_zk_r() {
    return this.xz_js_zk_r;
  }
  
  public void setXz_js_zk_r(String xz_js_zk_r) {
    this.xz_js_zk_r = xz_js_zk_r;
  }
  
  public String getSj_l() {
    return this.sj_l;
  }
  
  public void setSj_l(String sj_l) {
    this.sj_l = sj_l;
  }
  
  public String getSj_r() {
    return this.sj_r;
  }
  
  public void setSj_r(String sj_r) {
    this.sj_r = sj_r;
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
  
  public String getCliDate() {
    return this.cliDate;
  }
  
  public void setCliDate(String cliDate) {
    this.cliDate = cliDate;
  }
  
  public String getRepDoc() {
    return this.repDoc;
  }
  
  public void setRepDoc(String repDoc) {
    this.repDoc = repDoc;
  }
  
  public String getCheckDoc() {
    return this.checkDoc;
  }
  
  public void setCheckDoc(String checkDoc) {
    this.checkDoc = checkDoc;
  }
}
