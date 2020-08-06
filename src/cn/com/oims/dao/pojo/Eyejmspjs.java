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
@Table(name = "Eyejmspjs")
public class Eyejmspjs implements Serializable {
  private static final long serialVersionUID = -774497557423833665L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private String midu;
  
  private String daxiao;
  
  private String bianyixishu;
  
  private String memo;
  
  private String doctor;
  
  private String yb;
  
  private String r_cd;
  
  private String r_ave;
  
  private String r_sd;
  
  private String r_cv;
  
  private String r_aa;
  
  private String r_num;
  
  private String r_min;
  
  private String r_max;
  
  private String l_cd;
  
  private String l_ave;
  
  private String l_sd;
  
  private String l_cv;
  
  private String l_aa;
  
  private String l_num;
  
  private String l_min;
  
  private String l_max;
  
  private String cli_date;
  
  private String check_doc;
  
  private String rep_doc;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyejmspjs_sequence")
  @SequenceGenerator(name = "eyejmspjs_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyejmspjs_sequence")
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
  
  public String getMidu() {
    return this.midu;
  }
  
  public void setMidu(String midu) {
    this.midu = midu;
  }
  
  public String getDaxiao() {
    return this.daxiao;
  }
  
  public void setDaxiao(String daxiao) {
    this.daxiao = daxiao;
  }
  
  public String getBianyixishu() {
    return this.bianyixishu;
  }
  
  public void setBianyixishu(String bianyixishu) {
    this.bianyixishu = bianyixishu;
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
  
  public String getYb() {
    return this.yb;
  }
  
  public void setYb(String yb) {
    this.yb = yb;
  }
  
  public String getR_cd() {
    return this.r_cd;
  }
  
  public void setR_cd(String r_cd) {
    this.r_cd = r_cd;
  }
  
  public String getR_ave() {
    return this.r_ave;
  }
  
  public void setR_ave(String r_ave) {
    this.r_ave = r_ave;
  }
  
  public String getR_sd() {
    return this.r_sd;
  }
  
  public void setR_sd(String r_sd) {
    this.r_sd = r_sd;
  }
  
  public String getR_cv() {
    return this.r_cv;
  }
  
  public void setR_cv(String r_cv) {
    this.r_cv = r_cv;
  }
  
  public String getR_aa() {
    return this.r_aa;
  }
  
  public void setR_aa(String r_aa) {
    this.r_aa = r_aa;
  }
  
  public String getR_num() {
    return this.r_num;
  }
  
  public void setR_num(String r_num) {
    this.r_num = r_num;
  }
  
  public String getR_min() {
    return this.r_min;
  }
  
  public void setR_min(String r_min) {
    this.r_min = r_min;
  }
  
  public String getR_max() {
    return this.r_max;
  }
  
  public void setR_max(String r_max) {
    this.r_max = r_max;
  }
  
  public String getL_cd() {
    return this.l_cd;
  }
  
  public void setL_cd(String l_cd) {
    this.l_cd = l_cd;
  }
  
  public String getL_ave() {
    return this.l_ave;
  }
  
  public void setL_ave(String l_ave) {
    this.l_ave = l_ave;
  }
  
  public String getL_sd() {
    return this.l_sd;
  }
  
  public void setL_sd(String l_sd) {
    this.l_sd = l_sd;
  }
  
  public String getL_cv() {
    return this.l_cv;
  }
  
  public void setL_cv(String l_cv) {
    this.l_cv = l_cv;
  }
  
  public String getL_aa() {
    return this.l_aa;
  }
  
  public void setL_aa(String l_aa) {
    this.l_aa = l_aa;
  }
  
  public String getL_num() {
    return this.l_num;
  }
  
  public void setL_num(String l_num) {
    this.l_num = l_num;
  }
  
  public String getL_min() {
    return this.l_min;
  }
  
  public void setL_min(String l_min) {
    this.l_min = l_min;
  }
  
  public String getL_max() {
    return this.l_max;
  }
  
  public void setL_max(String l_max) {
    this.l_max = l_max;
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
