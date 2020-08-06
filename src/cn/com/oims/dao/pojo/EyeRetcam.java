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
@Table(name = "EyeRetcam")
public class EyeRetcam implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private Long huanzhexinxi_id;
  
  private String yb;
  
  private String zhenduan;
  
  private String jc_zhenduan;
  
  private String chuzhi;
  
  private String memo;
  
  private String doctor;
  
  private String cli_date;
  
  private String rep_doc;
  
  private String nurse;
  
  public String getNurse() {
    return this.nurse;
  }
  
  public void setNurse(String nurse) {
    this.nurse = nurse;
  }
  
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeretcam_sequence")
  @SequenceGenerator(name = "eyeretcam_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyeretcam_sequence")
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
  
  public String getYb() {
    return this.yb;
  }
  
  public void setYb(String yb) {
    this.yb = yb;
  }
  
  public String getZhenduan() {
    return this.zhenduan;
  }
  
  public void setZhenduan(String zhenduan) {
    this.zhenduan = zhenduan;
  }
  
  public String getJc_zhenduan() {
    return this.jc_zhenduan;
  }
  
  public void setJc_zhenduan(String jc_zhenduan) {
    this.jc_zhenduan = jc_zhenduan;
  }
  
  public String getChuzhi() {
    return this.chuzhi;
  }
  
  public void setChuzhi(String chuzhi) {
    this.chuzhi = chuzhi;
  }
  
  public static long getSerialversionuid() {
    return 1L;
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
