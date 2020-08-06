package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qg_shfc")
public class QgShfc {
  private Long id;
  
  private String blh;
  
  private Date sj;
  
  private String tsbs_r;
  
  private String tsbs_l;
  
  private String tsbs_qz;
  
  private String xy_r;
  
  private String xy_l;
  
  private String xy_qz;
  
  private String wg_r;
  
  private String wg_l;
  
  private String wg_qz;
  
  private String spl_r;
  
  private String spl_l;
  
  private String spl_qz;
  
  private String xg_r;
  
  private String xg_l;
  
  private String xg_qz;
  
  private String ydkn_r;
  
  private String ydkn_l;
  
  private String ydkn_qz;
  
  private String lysl_r;
  
  private String djsl_r;
  
  private String lysl_l;
  
  private String djsl_l;
  
  private String sl_qz;
  
  private String yy_r;
  
  private String yy_l;
  
  private String yy_qz;
  
  private String qjjc_r;
  
  private String qjjc_l;
  
  private String qjjc_qz;
  
  private String ydjc_r;
  
  private String ydjc_l;
  
  private String ydjc_qz;
  
  private String dnyg_ds_r1;
  
  private String dnyg_ds_r;
  
  private String dnyg_dc_r;
  
  private String dnyg_ds_l1;
  
  private String dnyg_ds_l;
  
  private String dnyg_dc_l;
  
  private String dnyg_qz;
  
  private String ktjy_ds_r1;
  
  private String ktjy_ds_r;
  
  private String ktjy_dc_r;
  
  private String ktjy_ds_l1;
  
  private String ktjy_ds_l;
  
  private String ktjy_dc_l;
  
  private String ktjy_qz;
  
  private String ktsp_ds_r1;
  
  private String ktsp_ds_r;
  
  private String ktsp_dc_r;
  
  private String ktsp_jt_r;
  
  private String ktsp_ds_l1;
  
  private String ktsp_ds_l;
  
  private String ktsp_dc_l;
  
  private String ktsp_jt_l;
  
  private String ktsp_qz;
  
  private String xtjy_ds_r1;
  
  private String xtjy_ds_r;
  
  private String xtjy_dc_r;
  
  private String xtjy_jt_r;
  
  private String xtjy_ds_l1;
  
  private String xtjy_ds_l;
  
  private String xtjy_dc_l;
  
  private String xtjy_jt_l;
  
  private String xtjy_qz;
  
  private String xtsp_ds_r1;
  
  private String xtsp_ds_r;
  
  private String xtsp_dc_r;
  
  private String xtsp_jt_r;
  
  private String xtsp_ds_l1;
  
  private String xtsp_ds_l;
  
  private String xtsp_dc_l;
  
  private String xtsp_jt_l;
  
  private String xtsp_qz;
  
  private String ubm_gg_r;
  
  private String ubm_qfsd_r;
  
  private String ubm_gg_l;
  
  private String ubm_qfsd_l;
  
  private String ubm_qz;
  
  private String jmnp_cd_r;
  
  private String jmnp_bfb_r;
  
  private String jmnp_cd_l;
  
  private String jmnp_bfb_l;
  
  private String jmnp_qz;
  
  private String ticl_wz_r;
  
  private String ticl_wz_d_r;
  
  private String ticl_wz_l;
  
  private String ticl_wz_d_l;
  
  private String ticl_wz_qz;
  
  private String qt;
  
  private String qt_qz;
  
  private String clyj_r;
  
  private String clyj_l;
  
  private String clyj_qz;
  
  private Long lc_id;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_shfc_sequence")
  @SequenceGenerator(name = "qg_shfc_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_shfc_sequence")
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
  
  public Date getSj() {
    return this.sj;
  }
  
  public void setSj(Date sj) {
    this.sj = sj;
  }
  
  public String getTsbs_r() {
    return this.tsbs_r;
  }
  
  public void setTsbs_r(String tsbs_r) {
    this.tsbs_r = tsbs_r;
  }
  
  public String getTsbs_l() {
    return this.tsbs_l;
  }
  
  public void setTsbs_l(String tsbs_l) {
    this.tsbs_l = tsbs_l;
  }
  
  public String getTsbs_qz() {
    return this.tsbs_qz;
  }
  
  public void setTsbs_qz(String tsbs_qz) {
    this.tsbs_qz = tsbs_qz;
  }
  
  public String getXy_r() {
    return this.xy_r;
  }
  
  public void setXy_r(String xy_r) {
    this.xy_r = xy_r;
  }
  
  public String getXy_l() {
    return this.xy_l;
  }
  
  public void setXy_l(String xy_l) {
    this.xy_l = xy_l;
  }
  
  public String getXy_qz() {
    return this.xy_qz;
  }
  
  public void setXy_qz(String xy_qz) {
    this.xy_qz = xy_qz;
  }
  
  public String getWg_r() {
    return this.wg_r;
  }
  
  public void setWg_r(String wg_r) {
    this.wg_r = wg_r;
  }
  
  public String getWg_l() {
    return this.wg_l;
  }
  
  public void setWg_l(String wg_l) {
    this.wg_l = wg_l;
  }
  
  public String getWg_qz() {
    return this.wg_qz;
  }
  
  public void setWg_qz(String wg_qz) {
    this.wg_qz = wg_qz;
  }
  
  public String getSpl_r() {
    return this.spl_r;
  }
  
  public void setSpl_r(String spl_r) {
    this.spl_r = spl_r;
  }
  
  public String getSpl_l() {
    return this.spl_l;
  }
  
  public void setSpl_l(String spl_l) {
    this.spl_l = spl_l;
  }
  
  public String getSpl_qz() {
    return this.spl_qz;
  }
  
  public void setSpl_qz(String spl_qz) {
    this.spl_qz = spl_qz;
  }
  
  public String getXg_r() {
    return this.xg_r;
  }
  
  public void setXg_r(String xg_r) {
    this.xg_r = xg_r;
  }
  
  public String getXg_l() {
    return this.xg_l;
  }
  
  public void setXg_l(String xg_l) {
    this.xg_l = xg_l;
  }
  
  public String getXg_qz() {
    return this.xg_qz;
  }
  
  public void setXg_qz(String xg_qz) {
    this.xg_qz = xg_qz;
  }
  
  public String getYdkn_r() {
    return this.ydkn_r;
  }
  
  public void setYdkn_r(String ydkn_r) {
    this.ydkn_r = ydkn_r;
  }
  
  public String getYdkn_l() {
    return this.ydkn_l;
  }
  
  public void setYdkn_l(String ydkn_l) {
    this.ydkn_l = ydkn_l;
  }
  
  public String getYdkn_qz() {
    return this.ydkn_qz;
  }
  
  public void setYdkn_qz(String ydkn_qz) {
    this.ydkn_qz = ydkn_qz;
  }
  
  public String getLysl_r() {
    return this.lysl_r;
  }
  
  public void setLysl_r(String lysl_r) {
    this.lysl_r = lysl_r;
  }
  
  public String getDjsl_r() {
    return this.djsl_r;
  }
  
  public void setDjsl_r(String djsl_r) {
    this.djsl_r = djsl_r;
  }
  
  public String getLysl_l() {
    return this.lysl_l;
  }
  
  public void setLysl_l(String lysl_l) {
    this.lysl_l = lysl_l;
  }
  
  public String getDjsl_l() {
    return this.djsl_l;
  }
  
  public void setDjsl_l(String djsl_l) {
    this.djsl_l = djsl_l;
  }
  
  public String getSl_qz() {
    return this.sl_qz;
  }
  
  public void setSl_qz(String sl_qz) {
    this.sl_qz = sl_qz;
  }
  
  public String getYy_r() {
    return this.yy_r;
  }
  
  public void setYy_r(String yy_r) {
    this.yy_r = yy_r;
  }
  
  public String getYy_l() {
    return this.yy_l;
  }
  
  public void setYy_l(String yy_l) {
    this.yy_l = yy_l;
  }
  
  public String getYy_qz() {
    return this.yy_qz;
  }
  
  public void setYy_qz(String yy_qz) {
    this.yy_qz = yy_qz;
  }
  
  public String getQjjc_r() {
    return this.qjjc_r;
  }
  
  public void setQjjc_r(String qjjc_r) {
    this.qjjc_r = qjjc_r;
  }
  
  public String getQjjc_l() {
    return this.qjjc_l;
  }
  
  public void setQjjc_l(String qjjc_l) {
    this.qjjc_l = qjjc_l;
  }
  
  public String getQjjc_qz() {
    return this.qjjc_qz;
  }
  
  public void setQjjc_qz(String qjjc_qz) {
    this.qjjc_qz = qjjc_qz;
  }
  
  public String getYdjc_r() {
    return this.ydjc_r;
  }
  
  public void setYdjc_r(String ydjc_r) {
    this.ydjc_r = ydjc_r;
  }
  
  public String getYdjc_l() {
    return this.ydjc_l;
  }
  
  public void setYdjc_l(String ydjc_l) {
    this.ydjc_l = ydjc_l;
  }
  
  public String getYdjc_qz() {
    return this.ydjc_qz;
  }
  
  public void setYdjc_qz(String ydjc_qz) {
    this.ydjc_qz = ydjc_qz;
  }
  
  public String getDnyg_ds_r() {
    return this.dnyg_ds_r;
  }
  
  public void setDnyg_ds_r(String dnyg_ds_r) {
    this.dnyg_ds_r = dnyg_ds_r;
  }
  
  public String getDnyg_dc_r() {
    return this.dnyg_dc_r;
  }
  
  public void setDnyg_dc_r(String dnyg_dc_r) {
    this.dnyg_dc_r = dnyg_dc_r;
  }
  
  public String getDnyg_ds_l() {
    return this.dnyg_ds_l;
  }
  
  public void setDnyg_ds_l(String dnyg_ds_l) {
    this.dnyg_ds_l = dnyg_ds_l;
  }
  
  public String getDnyg_dc_l() {
    return this.dnyg_dc_l;
  }
  
  public void setDnyg_dc_l(String dnyg_dc_l) {
    this.dnyg_dc_l = dnyg_dc_l;
  }
  
  public String getDnyg_qz() {
    return this.dnyg_qz;
  }
  
  public void setDnyg_qz(String dnyg_qz) {
    this.dnyg_qz = dnyg_qz;
  }
  
  public String getKtjy_ds_r() {
    return this.ktjy_ds_r;
  }
  
  public void setKtjy_ds_r(String ktjy_ds_r) {
    this.ktjy_ds_r = ktjy_ds_r;
  }
  
  public String getKtjy_dc_r() {
    return this.ktjy_dc_r;
  }
  
  public void setKtjy_dc_r(String ktjy_dc_r) {
    this.ktjy_dc_r = ktjy_dc_r;
  }
  
  public String getKtjy_ds_l() {
    return this.ktjy_ds_l;
  }
  
  public void setKtjy_ds_l(String ktjy_ds_l) {
    this.ktjy_ds_l = ktjy_ds_l;
  }
  
  public String getKtjy_dc_l() {
    return this.ktjy_dc_l;
  }
  
  public void setKtjy_dc_l(String ktjy_dc_l) {
    this.ktjy_dc_l = ktjy_dc_l;
  }
  
  public String getKtjy_qz() {
    return this.ktjy_qz;
  }
  
  public void setKtjy_qz(String ktjy_qz) {
    this.ktjy_qz = ktjy_qz;
  }
  
  public String getKtsp_ds_r() {
    return this.ktsp_ds_r;
  }
  
  public void setKtsp_ds_r(String ktsp_ds_r) {
    this.ktsp_ds_r = ktsp_ds_r;
  }
  
  public String getKtsp_dc_r() {
    return this.ktsp_dc_r;
  }
  
  public void setKtsp_dc_r(String ktsp_dc_r) {
    this.ktsp_dc_r = ktsp_dc_r;
  }
  
  public String getKtsp_jt_r() {
    return this.ktsp_jt_r;
  }
  
  public void setKtsp_jt_r(String ktsp_jt_r) {
    this.ktsp_jt_r = ktsp_jt_r;
  }
  
  public String getKtsp_ds_l() {
    return this.ktsp_ds_l;
  }
  
  public void setKtsp_ds_l(String ktsp_ds_l) {
    this.ktsp_ds_l = ktsp_ds_l;
  }
  
  public String getKtsp_dc_l() {
    return this.ktsp_dc_l;
  }
  
  public void setKtsp_dc_l(String ktsp_dc_l) {
    this.ktsp_dc_l = ktsp_dc_l;
  }
  
  public String getKtsp_jt_l() {
    return this.ktsp_jt_l;
  }
  
  public void setKtsp_jt_l(String ktsp_jt_l) {
    this.ktsp_jt_l = ktsp_jt_l;
  }
  
  public String getKtsp_qz() {
    return this.ktsp_qz;
  }
  
  public void setKtsp_qz(String ktsp_qz) {
    this.ktsp_qz = ktsp_qz;
  }
  
  public String getXtjy_ds_r() {
    return this.xtjy_ds_r;
  }
  
  public void setXtjy_ds_r(String xtjy_ds_r) {
    this.xtjy_ds_r = xtjy_ds_r;
  }
  
  public String getXtjy_dc_r() {
    return this.xtjy_dc_r;
  }
  
  public void setXtjy_dc_r(String xtjy_dc_r) {
    this.xtjy_dc_r = xtjy_dc_r;
  }
  
  public String getXtjy_jt_r() {
    return this.xtjy_jt_r;
  }
  
  public void setXtjy_jt_r(String xtjy_jt_r) {
    this.xtjy_jt_r = xtjy_jt_r;
  }
  
  public String getXtjy_ds_l() {
    return this.xtjy_ds_l;
  }
  
  public void setXtjy_ds_l(String xtjy_ds_l) {
    this.xtjy_ds_l = xtjy_ds_l;
  }
  
  public String getXtjy_dc_l() {
    return this.xtjy_dc_l;
  }
  
  public void setXtjy_dc_l(String xtjy_dc_l) {
    this.xtjy_dc_l = xtjy_dc_l;
  }
  
  public String getXtjy_jt_l() {
    return this.xtjy_jt_l;
  }
  
  public void setXtjy_jt_l(String xtjy_jt_l) {
    this.xtjy_jt_l = xtjy_jt_l;
  }
  
  public String getXtjy_qz() {
    return this.xtjy_qz;
  }
  
  public void setXtjy_qz(String xtjy_qz) {
    this.xtjy_qz = xtjy_qz;
  }
  
  public String getXtsp_ds_r() {
    return this.xtsp_ds_r;
  }
  
  public void setXtsp_ds_r(String xtsp_ds_r) {
    this.xtsp_ds_r = xtsp_ds_r;
  }
  
  public String getXtsp_dc_r() {
    return this.xtsp_dc_r;
  }
  
  public void setXtsp_dc_r(String xtsp_dc_r) {
    this.xtsp_dc_r = xtsp_dc_r;
  }
  
  public String getXtsp_jt_r() {
    return this.xtsp_jt_r;
  }
  
  public void setXtsp_jt_r(String xtsp_jt_r) {
    this.xtsp_jt_r = xtsp_jt_r;
  }
  
  public String getXtsp_ds_l() {
    return this.xtsp_ds_l;
  }
  
  public void setXtsp_ds_l(String xtsp_ds_l) {
    this.xtsp_ds_l = xtsp_ds_l;
  }
  
  public String getXtsp_dc_l() {
    return this.xtsp_dc_l;
  }
  
  public void setXtsp_dc_l(String xtsp_dc_l) {
    this.xtsp_dc_l = xtsp_dc_l;
  }
  
  public String getXtsp_jt_l() {
    return this.xtsp_jt_l;
  }
  
  public void setXtsp_jt_l(String xtsp_jt_l) {
    this.xtsp_jt_l = xtsp_jt_l;
  }
  
  public String getXtsp_qz() {
    return this.xtsp_qz;
  }
  
  public void setXtsp_qz(String xtsp_qz) {
    this.xtsp_qz = xtsp_qz;
  }
  
  public String getUbm_gg_r() {
    return this.ubm_gg_r;
  }
  
  public void setUbm_gg_r(String ubm_gg_r) {
    this.ubm_gg_r = ubm_gg_r;
  }
  
  public String getUbm_qfsd_r() {
    return this.ubm_qfsd_r;
  }
  
  public void setUbm_qfsd_r(String ubm_qfsd_r) {
    this.ubm_qfsd_r = ubm_qfsd_r;
  }
  
  public String getUbm_gg_l() {
    return this.ubm_gg_l;
  }
  
  public void setUbm_gg_l(String ubm_gg_l) {
    this.ubm_gg_l = ubm_gg_l;
  }
  
  public String getUbm_qfsd_l() {
    return this.ubm_qfsd_l;
  }
  
  public void setUbm_qfsd_l(String ubm_qfsd_l) {
    this.ubm_qfsd_l = ubm_qfsd_l;
  }
  
  public String getUbm_qz() {
    return this.ubm_qz;
  }
  
  public void setUbm_qz(String ubm_qz) {
    this.ubm_qz = ubm_qz;
  }
  
  public String getJmnp_cd_r() {
    return this.jmnp_cd_r;
  }
  
  public void setJmnp_cd_r(String jmnp_cd_r) {
    this.jmnp_cd_r = jmnp_cd_r;
  }
  
  public String getJmnp_bfb_r() {
    return this.jmnp_bfb_r;
  }
  
  public void setJmnp_bfb_r(String jmnp_bfb_r) {
    this.jmnp_bfb_r = jmnp_bfb_r;
  }
  
  public String getJmnp_cd_l() {
    return this.jmnp_cd_l;
  }
  
  public void setJmnp_cd_l(String jmnp_cd_l) {
    this.jmnp_cd_l = jmnp_cd_l;
  }
  
  public String getJmnp_bfb_l() {
    return this.jmnp_bfb_l;
  }
  
  public void setJmnp_bfb_l(String jmnp_bfb_l) {
    this.jmnp_bfb_l = jmnp_bfb_l;
  }
  
  public String getJmnp_qz() {
    return this.jmnp_qz;
  }
  
  public void setJmnp_qz(String jmnp_qz) {
    this.jmnp_qz = jmnp_qz;
  }
  
  public String getTicl_wz_r() {
    return this.ticl_wz_r;
  }
  
  public void setTicl_wz_r(String ticl_wz_r) {
    this.ticl_wz_r = ticl_wz_r;
  }
  
  public String getTicl_wz_d_r() {
    return this.ticl_wz_d_r;
  }
  
  public void setTicl_wz_d_r(String ticl_wz_d_r) {
    this.ticl_wz_d_r = ticl_wz_d_r;
  }
  
  public String getTicl_wz_l() {
    return this.ticl_wz_l;
  }
  
  public void setTicl_wz_l(String ticl_wz_l) {
    this.ticl_wz_l = ticl_wz_l;
  }
  
  public String getTicl_wz_d_l() {
    return this.ticl_wz_d_l;
  }
  
  public void setTicl_wz_d_l(String ticl_wz_d_l) {
    this.ticl_wz_d_l = ticl_wz_d_l;
  }
  
  public String getTicl_wz_qz() {
    return this.ticl_wz_qz;
  }
  
  public void setTicl_wz_qz(String ticl_wz_qz) {
    this.ticl_wz_qz = ticl_wz_qz;
  }
  
  public String getQt() {
    return this.qt;
  }
  
  public void setQt(String qt) {
    this.qt = qt;
  }
  
  public String getQt_qz() {
    return this.qt_qz;
  }
  
  public void setQt_qz(String qt_qz) {
    this.qt_qz = qt_qz;
  }
  
  public String getClyj_r() {
    return this.clyj_r;
  }
  
  public void setClyj_r(String clyj_r) {
    this.clyj_r = clyj_r;
  }
  
  public String getClyj_l() {
    return this.clyj_l;
  }
  
  public void setClyj_l(String clyj_l) {
    this.clyj_l = clyj_l;
  }
  
  public String getClyj_qz() {
    return this.clyj_qz;
  }
  
  public void setClyj_qz(String clyj_qz) {
    this.clyj_qz = clyj_qz;
  }
  
  public Long getLc_id() {
    return this.lc_id;
  }
  
  public void setLc_id(Long lc_id) {
    this.lc_id = lc_id;
  }
  
  public String getDnyg_ds_r1() {
    return this.dnyg_ds_r1;
  }
  
  public void setDnyg_ds_r1(String dnyg_ds_r1) {
    this.dnyg_ds_r1 = dnyg_ds_r1;
  }
  
  public String getDnyg_ds_l1() {
    return this.dnyg_ds_l1;
  }
  
  public void setDnyg_ds_l1(String dnyg_ds_l1) {
    this.dnyg_ds_l1 = dnyg_ds_l1;
  }
  
  public String getKtjy_ds_r1() {
    return this.ktjy_ds_r1;
  }
  
  public void setKtjy_ds_r1(String ktjy_ds_r1) {
    this.ktjy_ds_r1 = ktjy_ds_r1;
  }
  
  public String getKtjy_ds_l1() {
    return this.ktjy_ds_l1;
  }
  
  public void setKtjy_ds_l1(String ktjy_ds_l1) {
    this.ktjy_ds_l1 = ktjy_ds_l1;
  }
  
  public String getKtsp_ds_r1() {
    return this.ktsp_ds_r1;
  }
  
  public void setKtsp_ds_r1(String ktsp_ds_r1) {
    this.ktsp_ds_r1 = ktsp_ds_r1;
  }
  
  public String getKtsp_ds_l1() {
    return this.ktsp_ds_l1;
  }
  
  public void setKtsp_ds_l1(String ktsp_ds_l1) {
    this.ktsp_ds_l1 = ktsp_ds_l1;
  }
  
  public String getXtjy_ds_r1() {
    return this.xtjy_ds_r1;
  }
  
  public void setXtjy_ds_r1(String xtjy_ds_r1) {
    this.xtjy_ds_r1 = xtjy_ds_r1;
  }
  
  public String getXtjy_ds_l1() {
    return this.xtjy_ds_l1;
  }
  
  public void setXtjy_ds_l1(String xtjy_ds_l1) {
    this.xtjy_ds_l1 = xtjy_ds_l1;
  }
  
  public String getXtsp_ds_r1() {
    return this.xtsp_ds_r1;
  }
  
  public void setXtsp_ds_r1(String xtsp_ds_r1) {
    this.xtsp_ds_r1 = xtsp_ds_r1;
  }
  
  public String getXtsp_ds_l1() {
    return this.xtsp_ds_l1;
  }
  
  public void setXtsp_ds_l1(String xtsp_ds_l1) {
    this.xtsp_ds_l1 = xtsp_ds_l1;
  }
}
