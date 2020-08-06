package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "qg_shjl")
public class QgShjl {
  private Long id;
  
  private String blh;
  
  private String zs_l;
  
  private String zs_r;
  
  private String sl_l;
  
  private String sl_r;
  
  private String xtsp1_l;
  
  private String xtsp2_l;
  
  private String xtsp3_l;
  
  private String xtsp4_l;
  
  private String xtsp1_r;
  
  private String xtsp2_r;
  
  private String xtsp3_r;
  
  private String xtsp4_r;
  
  private String lxd_l;
  
  private String lxd_r;
  
  private String dxt_l;
  
  private String dxt_r;
  
  private String yy_l;
  
  private String yy_r;
  
  private String cl_l;
  
  private String cl_r;
  
  private Date sj;
  
  private String qm;
  
  private String bz_shjl_l;
  
  private String bz_shjl_r;
  
  private Long lc_id;
  
  private String zs_qz;
  
  private String sl_qz;
  
  private String xtsp_qz;
  
  private String lxd_qz;
  
  private String dxt_qz;
  
  private String yy_qz;
  
  private String cl_qz;
  
  private String bz_qz;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_shjl_sequence")
  @SequenceGenerator(name = "qg_shjl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_shjl_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getBlh() {
    return this.blh;
  }
  
  public void setBlh(String blh) {
    this.blh = blh;
  }
  
  public String getZs_l() {
    return this.zs_l;
  }
  
  public void setZs_l(String zs_l) {
    this.zs_l = zs_l;
  }
  
  public String getZs_r() {
    return this.zs_r;
  }
  
  public void setZs_r(String zs_r) {
    this.zs_r = zs_r;
  }
  
  public String getSl_l() {
    return this.sl_l;
  }
  
  public void setSl_l(String sl_l) {
    this.sl_l = sl_l;
  }
  
  public String getSl_r() {
    return this.sl_r;
  }
  
  public void setSl_r(String sl_r) {
    this.sl_r = sl_r;
  }
  
  public String getXtsp1_l() {
    return this.xtsp1_l;
  }
  
  public void setXtsp1_l(String xtsp1_l) {
    this.xtsp1_l = xtsp1_l;
  }
  
  public String getXtsp2_l() {
    return this.xtsp2_l;
  }
  
  public void setXtsp2_l(String xtsp2_l) {
    this.xtsp2_l = xtsp2_l;
  }
  
  public String getXtsp3_l() {
    return this.xtsp3_l;
  }
  
  public void setXtsp3_l(String xtsp3_l) {
    this.xtsp3_l = xtsp3_l;
  }
  
  public String getXtsp4_l() {
    return this.xtsp4_l;
  }
  
  public void setXtsp4_l(String xtsp4_l) {
    this.xtsp4_l = xtsp4_l;
  }
  
  public String getXtsp1_r() {
    return this.xtsp1_r;
  }
  
  public void setXtsp1_r(String xtsp1_r) {
    this.xtsp1_r = xtsp1_r;
  }
  
  public String getXtsp2_r() {
    return this.xtsp2_r;
  }
  
  public void setXtsp2_r(String xtsp2_r) {
    this.xtsp2_r = xtsp2_r;
  }
  
  public String getXtsp3_r() {
    return this.xtsp3_r;
  }
  
  public void setXtsp3_r(String xtsp3_r) {
    this.xtsp3_r = xtsp3_r;
  }
  
  public String getXtsp4_r() {
    return this.xtsp4_r;
  }
  
  public void setXtsp4_r(String xtsp4_r) {
    this.xtsp4_r = xtsp4_r;
  }
  
  public String getLxd_l() {
    return this.lxd_l;
  }
  
  public void setLxd_l(String lxd_l) {
    this.lxd_l = lxd_l;
  }
  
  public String getLxd_r() {
    return this.lxd_r;
  }
  
  public void setLxd_r(String lxd_r) {
    this.lxd_r = lxd_r;
  }
  
  public String getDxt_l() {
    return this.dxt_l;
  }
  
  public void setDxt_l(String dxt_l) {
    this.dxt_l = dxt_l;
  }
  
  public String getDxt_r() {
    return this.dxt_r;
  }
  
  public void setDxt_r(String dxt_r) {
    this.dxt_r = dxt_r;
  }
  
  public String getYy_l() {
    return this.yy_l;
  }
  
  public void setYy_l(String yy_l) {
    this.yy_l = yy_l;
  }
  
  public String getYy_r() {
    return this.yy_r;
  }
  
  public void setYy_r(String yy_r) {
    this.yy_r = yy_r;
  }
  
  public String getCl_l() {
    return this.cl_l;
  }
  
  public void setCl_l(String cl_l) {
    this.cl_l = cl_l;
  }
  
  public String getCl_r() {
    return this.cl_r;
  }
  
  public void setCl_r(String cl_r) {
    this.cl_r = cl_r;
  }
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  public Date getSj() {
    return this.sj;
  }
  
  public void setSj(Date sj) {
    this.sj = sj;
  }
  
  public String getQm() {
    return this.qm;
  }
  
  public void setQm(String qm) {
    this.qm = qm;
  }
  
  public String getBz_shjl_l() {
    return this.bz_shjl_l;
  }
  
  public void setBz_shjl_l(String bz_shjl_l) {
    this.bz_shjl_l = bz_shjl_l;
  }
  
  public String getBz_shjl_r() {
    return this.bz_shjl_r;
  }
  
  public void setBz_shjl_r(String bz_shjl_r) {
    this.bz_shjl_r = bz_shjl_r;
  }
  
  public Long getLc_id() {
    return this.lc_id;
  }
  
  public void setLc_id(Long lc_id) {
    this.lc_id = lc_id;
  }
  
  public String getZs_qz() {
    return this.zs_qz;
  }
  
  public void setZs_qz(String zs_qz) {
    this.zs_qz = zs_qz;
  }
  
  public String getSl_qz() {
    return this.sl_qz;
  }
  
  public void setSl_qz(String sl_qz) {
    this.sl_qz = sl_qz;
  }
  
  public String getXtsp_qz() {
    return this.xtsp_qz;
  }
  
  public void setXtsp_qz(String xtsp_qz) {
    this.xtsp_qz = xtsp_qz;
  }
  
  public String getLxd_qz() {
    return this.lxd_qz;
  }
  
  public void setLxd_qz(String lxd_qz) {
    this.lxd_qz = lxd_qz;
  }
  
  public String getYy_qz() {
    return this.yy_qz;
  }
  
  public void setYy_qz(String yy_qz) {
    this.yy_qz = yy_qz;
  }
  
  public String getCl_qz() {
    return this.cl_qz;
  }
  
  public void setCl_qz(String cl_qz) {
    this.cl_qz = cl_qz;
  }
  
  public String getBz_qz() {
    return this.bz_qz;
  }
  
  public void setBz_qz(String bz_qz) {
    this.bz_qz = bz_qz;
  }
  
  public String getDxt_qz() {
    return this.dxt_qz;
  }
  
  public void setDxt_qz(String dxt_qz) {
    this.dxt_qz = dxt_qz;
  }
}
