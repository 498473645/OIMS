package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "eyedslzsq")
public class Eyedslzsq {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyedslzsq_sequence")
  @SequenceGenerator(name = "eyedslzsq_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyedslzsq_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String r_lx;
  
  private String l_lx;
  
  private String r_qj;
  
  private String l_qj;
  
  private String r_zj;
  
  private String l_zj;
  
  private String r_zx;
  
  private String l_zx;
  
  private String r_jzsl;
  
  private String l_jzsl;
  
  private String r_gzjl;
  
  private String l_gzjl;
  
  private String r_dbmgd;
  
  private String l_dbmgd;
  
  private String r_tj;
  
  private String l_tj;
  
  private String r_ljxy;
  
  private String l_ljxy;
  
  private String r_ptsl;
  
  private String l_ptsl;
  
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
  
  public String getR_lx() {
    return this.r_lx;
  }
  
  public void setR_lx(String r_lx) {
    this.r_lx = r_lx;
  }
  
  public String getL_lx() {
    return this.l_lx;
  }
  
  public void setL_lx(String l_lx) {
    this.l_lx = l_lx;
  }
  
  public String getR_qj() {
    return this.r_qj;
  }
  
  public void setR_qj(String r_qj) {
    this.r_qj = r_qj;
  }
  
  public String getL_qj() {
    return this.l_qj;
  }
  
  public void setL_qj(String l_qj) {
    this.l_qj = l_qj;
  }
  
  public String getR_zj() {
    return this.r_zj;
  }
  
  public void setR_zj(String r_zj) {
    this.r_zj = r_zj;
  }
  
  public String getL_zj() {
    return this.l_zj;
  }
  
  public void setL_zj(String l_zj) {
    this.l_zj = l_zj;
  }
  
  public String getR_zx() {
    return this.r_zx;
  }
  
  public void setR_zx(String r_zx) {
    this.r_zx = r_zx;
  }
  
  public String getL_zx() {
    return this.l_zx;
  }
  
  public void setL_zx(String l_zx) {
    this.l_zx = l_zx;
  }
  
  public String getR_jzsl() {
    return this.r_jzsl;
  }
  
  public void setR_jzsl(String r_jzsl) {
    this.r_jzsl = r_jzsl;
  }
  
  public String getL_jzsl() {
    return this.l_jzsl;
  }
  
  public void setL_jzsl(String l_jzsl) {
    this.l_jzsl = l_jzsl;
  }
  
  public String getR_gzjl() {
    return this.r_gzjl;
  }
  
  public void setR_gzjl(String r_gzjl) {
    this.r_gzjl = r_gzjl;
  }
  
  public String getL_gzjl() {
    return this.l_gzjl;
  }
  
  public void setL_gzjl(String l_gzjl) {
    this.l_gzjl = l_gzjl;
  }
  
  public String getR_dbmgd() {
    return this.r_dbmgd;
  }
  
  public void setR_dbmgd(String r_dbmgd) {
    this.r_dbmgd = r_dbmgd;
  }
  
  public String getL_dbmgd() {
    return this.l_dbmgd;
  }
  
  public void setL_dbmgd(String l_dbmgd) {
    this.l_dbmgd = l_dbmgd;
  }
  
  public String getR_tj() {
    return this.r_tj;
  }
  
  public void setR_tj(String r_tj) {
    this.r_tj = r_tj;
  }
  
  public String getL_tj() {
    return this.l_tj;
  }
  
  public void setL_tj(String l_tj) {
    this.l_tj = l_tj;
  }
  
  public String getR_ljxy() {
    return this.r_ljxy;
  }
  
  public void setR_ljxy(String r_ljxy) {
    this.r_ljxy = r_ljxy;
  }
  
  public String getL_ljxy() {
    return this.l_ljxy;
  }
  
  public void setL_ljxy(String l_ljxy) {
    this.l_ljxy = l_ljxy;
  }
  
  public String getR_ptsl() {
    return this.r_ptsl;
  }
  
  public void setR_ptsl(String r_ptsl) {
    this.r_ptsl = r_ptsl;
  }
  
  public String getL_ptsl() {
    return this.l_ptsl;
  }
  
  public void setL_ptsl(String l_ptsl) {
    this.l_ptsl = l_ptsl;
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
