package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sg_bl")
public class Sgbl {
  private Long id;
  
  private String djs;
  
  private String dj_nian;
  
  private String mnzjd;
  
  private String jzff;
  
  private String slygjc;
  
  private String slygjc_pl;
  
  private Date zjycpjsj;
  
  private String zjycpjds;
  
  private String zjycpjds_l;
  
  private String ypmd;
  
  private String jzs;
  
  private String gms;
  
  private String qsbs;
  
  private String lysl_y_r;
  
  private String lysl_j_r;
  
  private String lysl_y_l;
  
  private String lysl_j_l;
  
  private String ktyg_ds_r;
  
  private String ktyg_dc_r;
  
  private String ktyg_ax_r;
  
  private String ktyg_vacc_r;
  
  private String ktyg_ds_l;
  
  private String ktyg_dc_l;
  
  private String ktyg_ax_l;
  
  private String ktyg_vacc_l;
  
  private String xtyg_ds_r;
  
  private String xtyg_dc_r;
  
  private String xtyg_ax_r;
  
  private String xtyg_vacc_r;
  
  private String xtyg_ds_l;
  
  private String xtyg_dc_l;
  
  private String xtyg_ax_l;
  
  private String xtyg_vacc_l;
  
  private String jmdxt_hk_r;
  
  private String jmdxt_a1_r;
  
  private String jmdxt_vk_r;
  
  private String jmdxt_a2_r;
  
  private String jmdxt_jmsg_r;
  
  private String jmdxt_e_r;
  
  private String jmzj_r;
  
  private String jmdxt_hk_l;
  
  private String jmdxt_a1_l;
  
  private String jmdxt_vk_l;
  
  private String jmdxt_a2_l;
  
  private String jmdxt_jmsg_l;
  
  private String jmdxt_e_l;
  
  private String jmzj_l;
  
  private String yanya_r;
  
  private String yanya_l;
  
  private String jiaomo_r;
  
  private String jiaomo_l;
  
  private String jiemo_r;
  
  private String jiemo_l;
  
  private String yandi_r;
  
  private String yandi_l;
  
  private String qt_r;
  
  private String qt_l;
  
  private String yj_r;
  
  private String yj_l;
  
  private String tkzj_m_r;
  
  private String tkzj_a_r;
  
  private String tkzj_m_l;
  
  private String tkzj_a_l;
  
  private String zxjmhd_r;
  
  private String zxjmhd_l;
  
  private String BUT_r;
  
  private String BUT_l;
  
  private String jmnpxb_cd_r;
  
  private String jmnpxb_ave_r;
  
  private String jmnpxb_6a_r;
  
  private String jmnpxb_cd_l;
  
  private String jmnpxb_ave_l;
  
  private String jmnpxb_6a_l;
  
  private String yzcd_r;
  
  private String qfsd_r;
  
  private String jtsd_r;
  
  private String yzcd_l;
  
  private String qfsd_l;
  
  private String jtsd_l;
  
  private String wszk;
  
  private String ycxpg_r;
  
  private String ycxpg_l;
  
  private String jy;
  
  private String ys;
  
  private String yps;
  
  private String ygs;
  
  private Date czrq;
  
  private String blh;
  
  private Integer state;
  
  private String slxj;
  
  public String getSlxj() {
    return this.slxj;
  }
  
  public void setSlxj(String slxj) {
    this.slxj = slxj;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sg_bl_sequence")
  @SequenceGenerator(name = "sg_bl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "sg_bl_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getDjs() {
    return this.djs;
  }
  
  public void setDjs(String djs) {
    this.djs = djs;
  }
  
  public String getDj_nian() {
    return this.dj_nian;
  }
  
  public void setDj_nian(String dj_nian) {
    this.dj_nian = dj_nian;
  }
  
  public String getMnzjd() {
    return this.mnzjd;
  }
  
  public void setMnzjd(String mnzjd) {
    this.mnzjd = mnzjd;
  }
  
  public String getJzff() {
    return this.jzff;
  }
  
  public void setJzff(String jzff) {
    this.jzff = jzff;
  }
  
  public String getSlygjc() {
    return this.slygjc;
  }
  
  public void setSlygjc(String slygjc) {
    this.slygjc = slygjc;
  }
  
  public String getSlygjc_pl() {
    return this.slygjc_pl;
  }
  
  public void setSlygjc_pl(String slygjc_pl) {
    this.slygjc_pl = slygjc_pl;
  }
  
  public Date getZjycpjsj() {
    return this.zjycpjsj;
  }
  
  public void setZjycpjsj(Date zjycpjsj) {
    this.zjycpjsj = zjycpjsj;
  }
  
  public String getZjycpjds() {
    return this.zjycpjds;
  }
  
  public void setZjycpjds(String zjycpjds) {
    this.zjycpjds = zjycpjds;
  }
  
  public String getZjycpjds_l() {
    return this.zjycpjds_l;
  }
  
  public void setZjycpjds_l(String zjycpjds_l) {
    this.zjycpjds_l = zjycpjds_l;
  }
  
  public String getYpmd() {
    return this.ypmd;
  }
  
  public void setYpmd(String ypmd) {
    this.ypmd = ypmd;
  }
  
  public String getJzs() {
    return this.jzs;
  }
  
  public void setJzs(String jzs) {
    this.jzs = jzs;
  }
  
  public String getGms() {
    return this.gms;
  }
  
  public void setGms(String gms) {
    this.gms = gms;
  }
  
  public String getQsbs() {
    return this.qsbs;
  }
  
  public void setQsbs(String qsbs) {
    this.qsbs = qsbs;
  }
  
  public String getLysl_y_r() {
    return this.lysl_y_r;
  }
  
  public void setLysl_y_r(String lysl_y_r) {
    this.lysl_y_r = lysl_y_r;
  }
  
  public String getLysl_j_r() {
    return this.lysl_j_r;
  }
  
  public void setLysl_j_r(String lysl_j_r) {
    this.lysl_j_r = lysl_j_r;
  }
  
  public String getLysl_y_l() {
    return this.lysl_y_l;
  }
  
  public void setLysl_y_l(String lysl_y_l) {
    this.lysl_y_l = lysl_y_l;
  }
  
  public String getLysl_j_l() {
    return this.lysl_j_l;
  }
  
  public void setLysl_j_l(String lysl_j_l) {
    this.lysl_j_l = lysl_j_l;
  }
  
  public String getKtyg_ds_r() {
    return this.ktyg_ds_r;
  }
  
  public void setKtyg_ds_r(String ktyg_ds_r) {
    this.ktyg_ds_r = ktyg_ds_r;
  }
  
  public String getKtyg_dc_r() {
    return this.ktyg_dc_r;
  }
  
  public void setKtyg_dc_r(String ktyg_dc_r) {
    this.ktyg_dc_r = ktyg_dc_r;
  }
  
  public String getKtyg_ax_r() {
    return this.ktyg_ax_r;
  }
  
  public void setKtyg_ax_r(String ktyg_ax_r) {
    this.ktyg_ax_r = ktyg_ax_r;
  }
  
  public String getKtyg_vacc_r() {
    return this.ktyg_vacc_r;
  }
  
  public void setKtyg_vacc_r(String ktyg_vacc_r) {
    this.ktyg_vacc_r = ktyg_vacc_r;
  }
  
  public String getKtyg_ds_l() {
    return this.ktyg_ds_l;
  }
  
  public void setKtyg_ds_l(String ktyg_ds_l) {
    this.ktyg_ds_l = ktyg_ds_l;
  }
  
  public String getKtyg_dc_l() {
    return this.ktyg_dc_l;
  }
  
  public void setKtyg_dc_l(String ktyg_dc_l) {
    this.ktyg_dc_l = ktyg_dc_l;
  }
  
  public String getKtyg_ax_l() {
    return this.ktyg_ax_l;
  }
  
  public void setKtyg_ax_l(String ktyg_ax_l) {
    this.ktyg_ax_l = ktyg_ax_l;
  }
  
  public String getKtyg_vacc_l() {
    return this.ktyg_vacc_l;
  }
  
  public void setKtyg_vacc_l(String ktyg_vacc_l) {
    this.ktyg_vacc_l = ktyg_vacc_l;
  }
  
  public String getXtyg_ds_r() {
    return this.xtyg_ds_r;
  }
  
  public void setXtyg_ds_r(String xtyg_ds_r) {
    this.xtyg_ds_r = xtyg_ds_r;
  }
  
  public String getXtyg_dc_r() {
    return this.xtyg_dc_r;
  }
  
  public void setXtyg_dc_r(String xtyg_dc_r) {
    this.xtyg_dc_r = xtyg_dc_r;
  }
  
  public String getXtyg_ax_r() {
    return this.xtyg_ax_r;
  }
  
  public void setXtyg_ax_r(String xtyg_ax_r) {
    this.xtyg_ax_r = xtyg_ax_r;
  }
  
  public String getXtyg_vacc_r() {
    return this.xtyg_vacc_r;
  }
  
  public void setXtyg_vacc_r(String xtyg_vacc_r) {
    this.xtyg_vacc_r = xtyg_vacc_r;
  }
  
  public String getXtyg_ds_l() {
    return this.xtyg_ds_l;
  }
  
  public void setXtyg_ds_l(String xtyg_ds_l) {
    this.xtyg_ds_l = xtyg_ds_l;
  }
  
  public String getXtyg_dc_l() {
    return this.xtyg_dc_l;
  }
  
  public void setXtyg_dc_l(String xtyg_dc_l) {
    this.xtyg_dc_l = xtyg_dc_l;
  }
  
  public String getXtyg_ax_l() {
    return this.xtyg_ax_l;
  }
  
  public void setXtyg_ax_l(String xtyg_ax_l) {
    this.xtyg_ax_l = xtyg_ax_l;
  }
  
  public String getXtyg_vacc_l() {
    return this.xtyg_vacc_l;
  }
  
  public void setXtyg_vacc_l(String xtyg_vacc_l) {
    this.xtyg_vacc_l = xtyg_vacc_l;
  }
  
  public String getJmdxt_hk_r() {
    return this.jmdxt_hk_r;
  }
  
  public void setJmdxt_hk_r(String jmdxt_hk_r) {
    this.jmdxt_hk_r = jmdxt_hk_r;
  }
  
  public String getJmdxt_a1_r() {
    return this.jmdxt_a1_r;
  }
  
  public void setJmdxt_a1_r(String jmdxt_a1_r) {
    this.jmdxt_a1_r = jmdxt_a1_r;
  }
  
  public String getJmdxt_vk_r() {
    return this.jmdxt_vk_r;
  }
  
  public void setJmdxt_vk_r(String jmdxt_vk_r) {
    this.jmdxt_vk_r = jmdxt_vk_r;
  }
  
  public String getJmdxt_a2_r() {
    return this.jmdxt_a2_r;
  }
  
  public void setJmdxt_a2_r(String jmdxt_a2_r) {
    this.jmdxt_a2_r = jmdxt_a2_r;
  }
  
  public String getJmdxt_jmsg_r() {
    return this.jmdxt_jmsg_r;
  }
  
  public void setJmdxt_jmsg_r(String jmdxt_jmsg_r) {
    this.jmdxt_jmsg_r = jmdxt_jmsg_r;
  }
  
  public String getJmdxt_e_r() {
    return this.jmdxt_e_r;
  }
  
  public void setJmdxt_e_r(String jmdxt_e_r) {
    this.jmdxt_e_r = jmdxt_e_r;
  }
  
  public String getJmdxt_hk_l() {
    return this.jmdxt_hk_l;
  }
  
  public void setJmdxt_hk_l(String jmdxt_hk_l) {
    this.jmdxt_hk_l = jmdxt_hk_l;
  }
  
  public String getJmdxt_a1_l() {
    return this.jmdxt_a1_l;
  }
  
  public void setJmdxt_a1_l(String jmdxt_a1_l) {
    this.jmdxt_a1_l = jmdxt_a1_l;
  }
  
  public String getJmdxt_vk_l() {
    return this.jmdxt_vk_l;
  }
  
  public void setJmdxt_vk_l(String jmdxt_vk_l) {
    this.jmdxt_vk_l = jmdxt_vk_l;
  }
  
  public String getJmdxt_a2_l() {
    return this.jmdxt_a2_l;
  }
  
  public void setJmdxt_a2_l(String jmdxt_a2_l) {
    this.jmdxt_a2_l = jmdxt_a2_l;
  }
  
  public String getJmdxt_jmsg_l() {
    return this.jmdxt_jmsg_l;
  }
  
  public void setJmdxt_jmsg_l(String jmdxt_jmsg_l) {
    this.jmdxt_jmsg_l = jmdxt_jmsg_l;
  }
  
  public String getJmdxt_e_l() {
    return this.jmdxt_e_l;
  }
  
  public void setJmdxt_e_l(String jmdxt_e_l) {
    this.jmdxt_e_l = jmdxt_e_l;
  }
  
  public String getYanya_r() {
    return this.yanya_r;
  }
  
  public void setYanya_r(String yanya_r) {
    this.yanya_r = yanya_r;
  }
  
  public String getYanya_l() {
    return this.yanya_l;
  }
  
  public void setYanya_l(String yanya_l) {
    this.yanya_l = yanya_l;
  }
  
  public String getJiaomo_r() {
    return this.jiaomo_r;
  }
  
  public void setJiaomo_r(String jiaomo_r) {
    this.jiaomo_r = jiaomo_r;
  }
  
  public String getJiaomo_l() {
    return this.jiaomo_l;
  }
  
  public void setJiaomo_l(String jiaomo_l) {
    this.jiaomo_l = jiaomo_l;
  }
  
  public String getJiemo_r() {
    return this.jiemo_r;
  }
  
  public void setJiemo_r(String jiemo_r) {
    this.jiemo_r = jiemo_r;
  }
  
  public String getJiemo_l() {
    return this.jiemo_l;
  }
  
  public void setJiemo_l(String jiemo_l) {
    this.jiemo_l = jiemo_l;
  }
  
  public String getYandi_r() {
    return this.yandi_r;
  }
  
  public void setYandi_r(String yandi_r) {
    this.yandi_r = yandi_r;
  }
  
  public String getYandi_l() {
    return this.yandi_l;
  }
  
  public void setYandi_l(String yandi_l) {
    this.yandi_l = yandi_l;
  }
  
  public String getQt_r() {
    return this.qt_r;
  }
  
  public void setQt_r(String qt_r) {
    this.qt_r = qt_r;
  }
  
  public String getQt_l() {
    return this.qt_l;
  }
  
  public void setQt_l(String qt_l) {
    this.qt_l = qt_l;
  }
  
  public String getYj_r() {
    return this.yj_r;
  }
  
  public void setYj_r(String yj_r) {
    this.yj_r = yj_r;
  }
  
  public String getYj_l() {
    return this.yj_l;
  }
  
  public void setYj_l(String yj_l) {
    this.yj_l = yj_l;
  }
  
  public String getTkzj_m_r() {
    return this.tkzj_m_r;
  }
  
  public void setTkzj_m_r(String tkzj_m_r) {
    this.tkzj_m_r = tkzj_m_r;
  }
  
  public String getTkzj_a_r() {
    return this.tkzj_a_r;
  }
  
  public void setTkzj_a_r(String tkzj_a_r) {
    this.tkzj_a_r = tkzj_a_r;
  }
  
  public String getTkzj_m_l() {
    return this.tkzj_m_l;
  }
  
  public void setTkzj_m_l(String tkzj_m_l) {
    this.tkzj_m_l = tkzj_m_l;
  }
  
  public String getTkzj_a_l() {
    return this.tkzj_a_l;
  }
  
  public void setTkzj_a_l(String tkzj_a_l) {
    this.tkzj_a_l = tkzj_a_l;
  }
  
  public String getJmzj_r() {
    return this.jmzj_r;
  }
  
  public void setJmzj_r(String jmzj_r) {
    this.jmzj_r = jmzj_r;
  }
  
  public String getJmzj_l() {
    return this.jmzj_l;
  }
  
  public void setJmzj_l(String jmzj_l) {
    this.jmzj_l = jmzj_l;
  }
  
  public String getZxjmhd_r() {
    return this.zxjmhd_r;
  }
  
  public void setZxjmhd_r(String zxjmhd_r) {
    this.zxjmhd_r = zxjmhd_r;
  }
  
  public String getZxjmhd_l() {
    return this.zxjmhd_l;
  }
  
  public void setZxjmhd_l(String zxjmhd_l) {
    this.zxjmhd_l = zxjmhd_l;
  }
  
  public String getBUT_r() {
    return this.BUT_r;
  }
  
  public void setBUT_r(String bUT_r) {
    this.BUT_r = bUT_r;
  }
  
  public String getBUT_l() {
    return this.BUT_l;
  }
  
  public void setBUT_l(String bUT_l) {
    this.BUT_l = bUT_l;
  }
  
  public String getYzcd_r() {
    return this.yzcd_r;
  }
  
  public void setYzcd_r(String yzcd_r) {
    this.yzcd_r = yzcd_r;
  }
  
  public String getQfsd_r() {
    return this.qfsd_r;
  }
  
  public void setQfsd_r(String qfsd_r) {
    this.qfsd_r = qfsd_r;
  }
  
  public String getJtsd_r() {
    return this.jtsd_r;
  }
  
  public void setJtsd_r(String jtsd_r) {
    this.jtsd_r = jtsd_r;
  }
  
  public String getYzcd_l() {
    return this.yzcd_l;
  }
  
  public void setYzcd_l(String yzcd_l) {
    this.yzcd_l = yzcd_l;
  }
  
  public String getQfsd_l() {
    return this.qfsd_l;
  }
  
  public void setQfsd_l(String qfsd_l) {
    this.qfsd_l = qfsd_l;
  }
  
  public String getJtsd_l() {
    return this.jtsd_l;
  }
  
  public void setJtsd_l(String jtsd_l) {
    this.jtsd_l = jtsd_l;
  }
  
  public String getWszk() {
    return this.wszk;
  }
  
  public void setWszk(String wszk) {
    this.wszk = wszk;
  }
  
  public String getYcxpg_r() {
    return this.ycxpg_r;
  }
  
  public void setYcxpg_r(String ycxpg_r) {
    this.ycxpg_r = ycxpg_r;
  }
  
  public String getYcxpg_l() {
    return this.ycxpg_l;
  }
  
  public void setYcxpg_l(String ycxpg_l) {
    this.ycxpg_l = ycxpg_l;
  }
  
  public String getJy() {
    return this.jy;
  }
  
  public void setJy(String jy) {
    this.jy = jy;
  }
  
  public String getYs() {
    return this.ys;
  }
  
  public void setYs(String ys) {
    this.ys = ys;
  }
  
  public String getYps() {
    return this.yps;
  }
  
  public void setYps(String yps) {
    this.yps = yps;
  }
  
  public String getYgs() {
    return this.ygs;
  }
  
  public void setYgs(String ygs) {
    this.ygs = ygs;
  }
  
  public Date getCzrq() {
    return this.czrq;
  }
  
  public void setCzrq(Date czrq) {
    this.czrq = czrq;
  }
  
  public String getBlh() {
    return this.blh;
  }
  
  public void setBlh(String blh) {
    this.blh = blh;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
  
  public String getJmnpxb_cd_r() {
    return this.jmnpxb_cd_r;
  }
  
  public void setJmnpxb_cd_r(String jmnpxb_cd_r) {
    this.jmnpxb_cd_r = jmnpxb_cd_r;
  }
  
  public String getJmnpxb_ave_r() {
    return this.jmnpxb_ave_r;
  }
  
  public void setJmnpxb_ave_r(String jmnpxb_ave_r) {
    this.jmnpxb_ave_r = jmnpxb_ave_r;
  }
  
  public String getJmnpxb_6a_r() {
    return this.jmnpxb_6a_r;
  }
  
  public void setJmnpxb_6a_r(String jmnpxb_6a_r) {
    this.jmnpxb_6a_r = jmnpxb_6a_r;
  }
  
  public String getJmnpxb_cd_l() {
    return this.jmnpxb_cd_l;
  }
  
  public void setJmnpxb_cd_l(String jmnpxb_cd_l) {
    this.jmnpxb_cd_l = jmnpxb_cd_l;
  }
  
  public String getJmnpxb_ave_l() {
    return this.jmnpxb_ave_l;
  }
  
  public void setJmnpxb_ave_l(String jmnpxb_ave_l) {
    this.jmnpxb_ave_l = jmnpxb_ave_l;
  }
  
  public String getJmnpxb_6a_l() {
    return this.jmnpxb_6a_l;
  }
  
  public void setJmnpxb_6a_l(String jmnpxb_6a_l) {
    this.jmnpxb_6a_l = jmnpxb_6a_l;
  }
}
