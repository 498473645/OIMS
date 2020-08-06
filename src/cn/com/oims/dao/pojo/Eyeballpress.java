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
@Table(name = "Eyeballpress")
public class Eyeballpress implements Serializable {
  private static final long serialVersionUID = 5657968092041490865L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private Long huanzhexinxi_id;
  
  private String l_eye_value1;
  
  private String l_eye_value2;
  
  private String r_eye_value1;
  
  private String r_eye_value2;
  
  private String check_doc;
  
  private String memo;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeballpress_sequence")
  @SequenceGenerator(name = "eyeballpress_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyeballpress_sequence")
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
  
  public String getL_eye_value1() {
    return this.l_eye_value1;
  }
  
  public void setL_eye_value1(String l_eye_value1) {
    this.l_eye_value1 = l_eye_value1;
  }
  
  public String getL_eye_value2() {
    return this.l_eye_value2;
  }
  
  public void setL_eye_value2(String l_eye_value2) {
    this.l_eye_value2 = l_eye_value2;
  }
  
  public String getR_eye_value1() {
    return this.r_eye_value1;
  }
  
  public void setR_eye_value1(String r_eye_value1) {
    this.r_eye_value1 = r_eye_value1;
  }
  
  public String getR_eye_value2() {
    return this.r_eye_value2;
  }
  
  public void setR_eye_value2(String r_eye_value2) {
    this.r_eye_value2 = r_eye_value2;
  }
  
  public String getCheck_doc() {
    return this.check_doc;
  }
  
  public void setCheck_doc(String check_doc) {
    this.check_doc = check_doc;
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
