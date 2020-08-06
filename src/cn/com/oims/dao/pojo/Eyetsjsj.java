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
@Table(name = "Eyetsjsj")
public class Eyetsjsj implements Serializable {
  private static final long serialVersionUID = -4624324624783326376L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private Long huanzhexinxi_id;
  
  private String sj_1;
  
  private String sj_2;
  
  private String sj_3;
  
  private String swmdy;
  
  private String memo;
  
  private String check_doc;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyetsjsj_sequence")
  @SequenceGenerator(name = "eyetsjsj_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyetsjsj_sequence")
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
  
  public String getSj_1() {
    return this.sj_1;
  }
  
  public void setSj_1(String sj_1) {
    this.sj_1 = sj_1;
  }
  
  public String getSj_2() {
    return this.sj_2;
  }
  
  public void setSj_2(String sj_2) {
    this.sj_2 = sj_2;
  }
  
  public String getSj_3() {
    return this.sj_3;
  }
  
  public void setSj_3(String sj_3) {
    this.sj_3 = sj_3;
  }
  
  public String getSwmdy() {
    return this.swmdy;
  }
  
  public void setSwmdy(String swmdy) {
    this.swmdy = swmdy;
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
