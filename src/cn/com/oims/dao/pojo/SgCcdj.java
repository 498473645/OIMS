package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sg_ccdj")
public class SgCcdj {
  private Long id;
  
  private Date djrq;
  
  private String vacc1_r;
  
  private String ds_r;
  
  private String vacc2_r;
  
  private String vacc1_l;
  
  private String ds_l;
  
  private String vacc2_l;
  
  private String jpcs_fk_r;
  
  private String jpcs_rp_r;
  
  private String jpcs_zj_r;
  
  private String jpcs_ys_r;
  
  private String jpcs_ph_r;
  
  private String jpcs_fk_l;
  
  private String jpcs_rp_l;
  
  private String jpcs_zj_l;
  
  private String jpcs_ys_l;
  
  private String jpcs_ph_l;
  
  private String zxdw_x_r;
  
  private String zxdw_x_l;
  
  private String zxdw_y_r;
  
  private String zxdw_y_l;
  
  private String ydd_czsh_r;
  
  private String ydd_dybd_r;
  
  private String ydd_czsh_l;
  
  private String ydd_dybd_l;
  
  private String ydd_sd_r;
  
  private String ydd_sd_l;
  
  private String jtps_r;
  
  private String jtps_l;
  
  private String psfz_r;
  
  private String psfz_l;
  
  private String ypzj_r;
  
  private String ypzj_l;
  
  private String fzhk_r;
  
  private String fzhk_l;
  
  private String bhkd_r;
  
  private String bhkd_l;
  
  private String blh;
  
  private String bl_id;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sg_ccdj_sequence")
  @SequenceGenerator(name = "sg_ccdj_sequence", allocationSize = 1, initialValue = 1, sequenceName = "sg_ccdj_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getDjrq() {
    return this.djrq;
  }
  
  public void setDjrq(Date djrq) {
    this.djrq = djrq;
  }
  
  public String getVacc1_r() {
    return this.vacc1_r;
  }
  
  public void setVacc1_r(String vacc1_r) {
    this.vacc1_r = vacc1_r;
  }
  
  public String getDs_r() {
    return this.ds_r;
  }
  
  public void setDs_r(String ds_r) {
    this.ds_r = ds_r;
  }
  
  public String getVacc2_r() {
    return this.vacc2_r;
  }
  
  public void setVacc2_r(String vacc2_r) {
    this.vacc2_r = vacc2_r;
  }
  
  public String getVacc1_l() {
    return this.vacc1_l;
  }
  
  public void setVacc1_l(String vacc1_l) {
    this.vacc1_l = vacc1_l;
  }
  
  public String getDs_l() {
    return this.ds_l;
  }
  
  public void setDs_l(String ds_l) {
    this.ds_l = ds_l;
  }
  
  public String getVacc2_l() {
    return this.vacc2_l;
  }
  
  public void setVacc2_l(String vacc2_l) {
    this.vacc2_l = vacc2_l;
  }
  
  public String getJpcs_fk_r() {
    return this.jpcs_fk_r;
  }
  
  public void setJpcs_fk_r(String jpcs_fk_r) {
    this.jpcs_fk_r = jpcs_fk_r;
  }
  
  public String getJpcs_rp_r() {
    return this.jpcs_rp_r;
  }
  
  public void setJpcs_rp_r(String jpcs_rp_r) {
    this.jpcs_rp_r = jpcs_rp_r;
  }
  
  public String getJpcs_zj_r() {
    return this.jpcs_zj_r;
  }
  
  public void setJpcs_zj_r(String jpcs_zj_r) {
    this.jpcs_zj_r = jpcs_zj_r;
  }
  
  public String getJpcs_ys_r() {
    return this.jpcs_ys_r;
  }
  
  public void setJpcs_ys_r(String jpcs_ys_r) {
    this.jpcs_ys_r = jpcs_ys_r;
  }
  
  public String getJpcs_ph_r() {
    return this.jpcs_ph_r;
  }
  
  public void setJpcs_ph_r(String jpcs_ph_r) {
    this.jpcs_ph_r = jpcs_ph_r;
  }
  
  public String getJpcs_fk_l() {
    return this.jpcs_fk_l;
  }
  
  public void setJpcs_fk_l(String jpcs_fk_l) {
    this.jpcs_fk_l = jpcs_fk_l;
  }
  
  public String getJpcs_rp_l() {
    return this.jpcs_rp_l;
  }
  
  public void setJpcs_rp_l(String jpcs_rp_l) {
    this.jpcs_rp_l = jpcs_rp_l;
  }
  
  public String getJpcs_zj_l() {
    return this.jpcs_zj_l;
  }
  
  public void setJpcs_zj_l(String jpcs_zj_l) {
    this.jpcs_zj_l = jpcs_zj_l;
  }
  
  public String getJpcs_ys_l() {
    return this.jpcs_ys_l;
  }
  
  public void setJpcs_ys_l(String jpcs_ys_l) {
    this.jpcs_ys_l = jpcs_ys_l;
  }
  
  public String getJpcs_ph_l() {
    return this.jpcs_ph_l;
  }
  
  public void setJpcs_ph_l(String jpcs_ph_l) {
    this.jpcs_ph_l = jpcs_ph_l;
  }
  
  public String getZxdw_x_r() {
    return this.zxdw_x_r;
  }
  
  public void setZxdw_x_r(String zxdw_x_r) {
    this.zxdw_x_r = zxdw_x_r;
  }
  
  public String getZxdw_x_l() {
    return this.zxdw_x_l;
  }
  
  public void setZxdw_x_l(String zxdw_x_l) {
    this.zxdw_x_l = zxdw_x_l;
  }
  
  public String getZxdw_y_r() {
    return this.zxdw_y_r;
  }
  
  public void setZxdw_y_r(String zxdw_y_r) {
    this.zxdw_y_r = zxdw_y_r;
  }
  
  public String getZxdw_y_l() {
    return this.zxdw_y_l;
  }
  
  public void setZxdw_y_l(String zxdw_y_l) {
    this.zxdw_y_l = zxdw_y_l;
  }
  
  public String getYdd_czsh_r() {
    return this.ydd_czsh_r;
  }
  
  public void setYdd_czsh_r(String ydd_czsh_r) {
    this.ydd_czsh_r = ydd_czsh_r;
  }
  
  public String getYdd_dybd_r() {
    return this.ydd_dybd_r;
  }
  
  public void setYdd_dybd_r(String ydd_dybd_r) {
    this.ydd_dybd_r = ydd_dybd_r;
  }
  
  public String getYdd_czsh_l() {
    return this.ydd_czsh_l;
  }
  
  public void setYdd_czsh_l(String ydd_czsh_l) {
    this.ydd_czsh_l = ydd_czsh_l;
  }
  
  public String getYdd_dybd_l() {
    return this.ydd_dybd_l;
  }
  
  public void setYdd_dybd_l(String ydd_dybd_l) {
    this.ydd_dybd_l = ydd_dybd_l;
  }
  
  public String getYdd_sd_r() {
    return this.ydd_sd_r;
  }
  
  public void setYdd_sd_r(String ydd_sd_r) {
    this.ydd_sd_r = ydd_sd_r;
  }
  
  public String getYdd_sd_l() {
    return this.ydd_sd_l;
  }
  
  public void setYdd_sd_l(String ydd_sd_l) {
    this.ydd_sd_l = ydd_sd_l;
  }
  
  public String getJtps_r() {
    return this.jtps_r;
  }
  
  public void setJtps_r(String jtps_r) {
    this.jtps_r = jtps_r;
  }
  
  public String getJtps_l() {
    return this.jtps_l;
  }
  
  public void setJtps_l(String jtps_l) {
    this.jtps_l = jtps_l;
  }
  
  public String getPsfz_r() {
    return this.psfz_r;
  }
  
  public void setPsfz_r(String psfz_r) {
    this.psfz_r = psfz_r;
  }
  
  public String getPsfz_l() {
    return this.psfz_l;
  }
  
  public void setPsfz_l(String psfz_l) {
    this.psfz_l = psfz_l;
  }
  
  public String getYpzj_r() {
    return this.ypzj_r;
  }
  
  public void setYpzj_r(String ypzj_r) {
    this.ypzj_r = ypzj_r;
  }
  
  public String getYpzj_l() {
    return this.ypzj_l;
  }
  
  public void setYpzj_l(String ypzj_l) {
    this.ypzj_l = ypzj_l;
  }
  
  public String getFzhk_r() {
    return this.fzhk_r;
  }
  
  public void setFzhk_r(String fzhk_r) {
    this.fzhk_r = fzhk_r;
  }
  
  public String getFzhk_l() {
    return this.fzhk_l;
  }
  
  public void setFzhk_l(String fzhk_l) {
    this.fzhk_l = fzhk_l;
  }
  
  public String getBhkd_r() {
    return this.bhkd_r;
  }
  
  public void setBhkd_r(String bhkd_r) {
    this.bhkd_r = bhkd_r;
  }
  
  public String getBhkd_l() {
    return this.bhkd_l;
  }
  
  public void setBhkd_l(String bhkd_l) {
    this.bhkd_l = bhkd_l;
  }
  
  public String getBlh() {
    return this.blh;
  }
  
  public void setBlh(String blh) {
    this.blh = blh;
  }
  
  public String getBl_id() {
    return this.bl_id;
  }
  
  public void setBl_id(String bl_id) {
    this.bl_id = bl_id;
  }
}
