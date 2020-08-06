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
@Table(name = "Eyetsjjfw")
public class Eyetsjjfw implements Serializable {
  private static final long serialVersionUID = 6475908352801937667L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String danwei;
  
  private String seq_1;
  
  private String seq_2;
  
  private String seq_3;
  
  private String seq_4;
  
  private String seq_5;
  
  private String seq_6;
  
  private String seq_7;
  
  private String seq_8;
  
  private String seq_9;
  
  private String memo;
  
  private String check_doc;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyetsjjfw_sequence")
  @SequenceGenerator(name = "eyetsjjfw_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyetsjjfw_sequence")
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
  
  public String getDanwei() {
    return this.danwei;
  }
  
  public void setDanwei(String danwei) {
    this.danwei = danwei;
  }
  
  public String getSeq_1() {
    return this.seq_1;
  }
  
  public void setSeq_1(String seq_1) {
    this.seq_1 = seq_1;
  }
  
  public String getSeq_2() {
    return this.seq_2;
  }
  
  public void setSeq_2(String seq_2) {
    this.seq_2 = seq_2;
  }
  
  public String getSeq_3() {
    return this.seq_3;
  }
  
  public void setSeq_3(String seq_3) {
    this.seq_3 = seq_3;
  }
  
  public String getSeq_4() {
    return this.seq_4;
  }
  
  public void setSeq_4(String seq_4) {
    this.seq_4 = seq_4;
  }
  
  public String getSeq_5() {
    return this.seq_5;
  }
  
  public void setSeq_5(String seq_5) {
    this.seq_5 = seq_5;
  }
  
  public String getSeq_6() {
    return this.seq_6;
  }
  
  public void setSeq_6(String seq_6) {
    this.seq_6 = seq_6;
  }
  
  public String getSeq_7() {
    return this.seq_7;
  }
  
  public void setSeq_7(String seq_7) {
    this.seq_7 = seq_7;
  }
  
  public String getSeq_8() {
    return this.seq_8;
  }
  
  public void setSeq_8(String seq_8) {
    this.seq_8 = seq_8;
  }
  
  public String getSeq_9() {
    return this.seq_9;
  }
  
  public void setSeq_9(String seq_9) {
    this.seq_9 = seq_9;
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
