package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "eyezsxz")
public class Eyezsxz {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyezsxz_sequence")
  @SequenceGenerator(name = "eyezsxz_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyezsxz_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String zsxz_r;
  
  private String zsxz_l;
  
  @Column(length = 2000)
  private String memo;
  
  private String doctor;
  
  private String cli_date;
  
  private String check_doc;
  
  private String rep_doc;
  
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
  
  public String getZsxz_r() {
    return this.zsxz_r;
  }
  
  public void setZsxz_r(String zsxz_r) {
    this.zsxz_r = zsxz_r;
  }
  
  public String getZsxz_l() {
    return this.zsxz_l;
  }
  
  public void setZsxz_l(String zsxz_l) {
    this.zsxz_l = zsxz_l;
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
  
  public String getCheck_doc() {
    return this.check_doc;
  }
  
  public void setCheck_doc(String check_doc) {
    this.check_doc = check_doc;
  }
  
  public String getRep_doc() {
    return this.rep_doc;
  }
  
  public void setRep_doc(String rep_doc) {
    this.rep_doc = rep_doc;
  }
}
