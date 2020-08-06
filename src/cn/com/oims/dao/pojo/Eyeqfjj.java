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
@Table(name = "Eyeqfjj")
public class Eyeqfjj implements Serializable {
  private static final long serialVersionUID = 8308081496368326132L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String seq_r_1_s;
  
  private String seq_r_2_s;
  
  private String seq_r_3_s;
  
  private String seq_r_4_s;
  
  private String seq_r_1_d;
  
  private String seq_r_2_d;
  
  private String seq_r_3_d;
  
  private String seq_r_4_d;
  
  private String seq_l_1_s;
  
  private String seq_l_2_s;
  
  private String seq_l_3_s;
  
  private String seq_l_4_s;
  
  private String seq_l_1_d;
  
  private String seq_l_2_d;
  
  private String seq_l_3_d;
  
  private String seq_l_4_d;
  
  private String memo;
  
  private String check_doc;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeqfjj_sequence")
  @SequenceGenerator(name = "eyeqfjj_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyeqfjj_sequence")
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
  
  public String getSeq_r_1_s() {
    return this.seq_r_1_s;
  }
  
  public void setSeq_r_1_s(String seq_r_1_s) {
    this.seq_r_1_s = seq_r_1_s;
  }
  
  public String getSeq_r_2_s() {
    return this.seq_r_2_s;
  }
  
  public void setSeq_r_2_s(String seq_r_2_s) {
    this.seq_r_2_s = seq_r_2_s;
  }
  
  public String getSeq_r_3_s() {
    return this.seq_r_3_s;
  }
  
  public void setSeq_r_3_s(String seq_r_3_s) {
    this.seq_r_3_s = seq_r_3_s;
  }
  
  public String getSeq_r_4_s() {
    return this.seq_r_4_s;
  }
  
  public void setSeq_r_4_s(String seq_r_4_s) {
    this.seq_r_4_s = seq_r_4_s;
  }
  
  public String getSeq_r_1_d() {
    return this.seq_r_1_d;
  }
  
  public void setSeq_r_1_d(String seq_r_1_d) {
    this.seq_r_1_d = seq_r_1_d;
  }
  
  public String getSeq_r_2_d() {
    return this.seq_r_2_d;
  }
  
  public void setSeq_r_2_d(String seq_r_2_d) {
    this.seq_r_2_d = seq_r_2_d;
  }
  
  public String getSeq_r_3_d() {
    return this.seq_r_3_d;
  }
  
  public void setSeq_r_3_d(String seq_r_3_d) {
    this.seq_r_3_d = seq_r_3_d;
  }
  
  public String getSeq_r_4_d() {
    return this.seq_r_4_d;
  }
  
  public void setSeq_r_4_d(String seq_r_4_d) {
    this.seq_r_4_d = seq_r_4_d;
  }
  
  public String getSeq_l_1_s() {
    return this.seq_l_1_s;
  }
  
  public void setSeq_l_1_s(String seq_l_1_s) {
    this.seq_l_1_s = seq_l_1_s;
  }
  
  public String getSeq_l_2_s() {
    return this.seq_l_2_s;
  }
  
  public void setSeq_l_2_s(String seq_l_2_s) {
    this.seq_l_2_s = seq_l_2_s;
  }
  
  public String getSeq_l_3_s() {
    return this.seq_l_3_s;
  }
  
  public void setSeq_l_3_s(String seq_l_3_s) {
    this.seq_l_3_s = seq_l_3_s;
  }
  
  public String getSeq_l_4_s() {
    return this.seq_l_4_s;
  }
  
  public void setSeq_l_4_s(String seq_l_4_s) {
    this.seq_l_4_s = seq_l_4_s;
  }
  
  public String getSeq_l_1_d() {
    return this.seq_l_1_d;
  }
  
  public void setSeq_l_1_d(String seq_l_1_d) {
    this.seq_l_1_d = seq_l_1_d;
  }
  
  public String getSeq_l_2_d() {
    return this.seq_l_2_d;
  }
  
  public void setSeq_l_2_d(String seq_l_2_d) {
    this.seq_l_2_d = seq_l_2_d;
  }
  
  public String getSeq_l_3_d() {
    return this.seq_l_3_d;
  }
  
  public void setSeq_l_3_d(String seq_l_3_d) {
    this.seq_l_3_d = seq_l_3_d;
  }
  
  public String getSeq_l_4_d() {
    return this.seq_l_4_d;
  }
  
  public void setSeq_l_4_d(String seq_l_4_d) {
    this.seq_l_4_d = seq_l_4_d;
  }
  
  public String getMemo() {
    return this.memo;
  }
  
  public void setMemo(String memo) {
    this.memo = memo;
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
