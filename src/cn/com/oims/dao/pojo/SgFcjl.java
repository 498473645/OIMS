package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sg_fcjl")
public class SgFcjl {
  private Long id;
  
  private Date fcrq;
  
  private String ydjsj;
  
  private String qjsj;
  
  private String jcr;
  
  private String yhzs;
  
  private String lysl_r;
  
  private String qgd_ds_r;
  
  private String qgd_dc_r;
  
  private String qgd_ax_r;
  
  private String jzsl_r;
  
  private String jm_r;
  
  private String yy_r;
  
  private String bz_r;
  
  private String lysl_l;
  
  private String qgd_ds_l;
  
  private String qgd_dc_l;
  
  private String qgd_ax_l;
  
  private String jzsl_l;
  
  private String jm_l;
  
  private String yy_l;
  
  private String bz_l;
  
  private String cz_r;
  
  private String cz_l;
  
  private String cz_td_r;
  
  private String cz_td_l;
  
  private String yongyao_r;
  
  private String yongyao_l;
  
  private String bmzk_r;
  
  private String bmzk_l;
  
  private String byzk_r;
  
  private String byzk_l;
  
  private String jpjc_cz_r;
  
  private String jpjc_cz_l;
  
  private String jpjc_qt;
  
  private String xcfcsj;
  
  private String tbzysx;
  
  private String gmhly;
  
  private String hlykp;
  
  private String blh;
  
  private String bl_id;
  
  private String tsjc_r;
  
  private String tsjc_l;
  
  public String getTsjc_r() {
    return this.tsjc_r;
  }
  
  public void setTsjc_r(String tsjc_r) {
    this.tsjc_r = tsjc_r;
  }
  
  public String getTsjc_l() {
    return this.tsjc_l;
  }
  
  public void setTsjc_l(String tsjc_l) {
    this.tsjc_l = tsjc_l;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sg_fcjl_sequence")
  @SequenceGenerator(name = "sg_fcjl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "sg_fcjl_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getFcrq() {
    return this.fcrq;
  }
  
  public void setFcrq(Date fcrq) {
    this.fcrq = fcrq;
  }
  
  public String getYdjsj() {
    return this.ydjsj;
  }
  
  public void setYdjsj(String ydjsj) {
    this.ydjsj = ydjsj;
  }
  
  public String getQjsj() {
    return this.qjsj;
  }
  
  public void setQjsj(String qjsj) {
    this.qjsj = qjsj;
  }
  
  public String getJcr() {
    return this.jcr;
  }
  
  public void setJcr(String jcr) {
    this.jcr = jcr;
  }
  
  public String getYhzs() {
    return this.yhzs;
  }
  
  public void setYhzs(String yhzs) {
    this.yhzs = yhzs;
  }
  
  public String getLysl_r() {
    return this.lysl_r;
  }
  
  public void setLysl_r(String lysl_r) {
    this.lysl_r = lysl_r;
  }
  
  public String getQgd_ds_r() {
    return this.qgd_ds_r;
  }
  
  public void setQgd_ds_r(String qgd_ds_r) {
    this.qgd_ds_r = qgd_ds_r;
  }
  
  public String getQgd_dc_r() {
    return this.qgd_dc_r;
  }
  
  public void setQgd_dc_r(String qgd_dc_r) {
    this.qgd_dc_r = qgd_dc_r;
  }
  
  public String getQgd_ax_r() {
    return this.qgd_ax_r;
  }
  
  public void setQgd_ax_r(String qgd_ax_r) {
    this.qgd_ax_r = qgd_ax_r;
  }
  
  public String getQgd_ds_l() {
    return this.qgd_ds_l;
  }
  
  public void setQgd_ds_l(String qgd_ds_l) {
    this.qgd_ds_l = qgd_ds_l;
  }
  
  public String getQgd_dc_l() {
    return this.qgd_dc_l;
  }
  
  public void setQgd_dc_l(String qgd_dc_l) {
    this.qgd_dc_l = qgd_dc_l;
  }
  
  public String getQgd_ax_l() {
    return this.qgd_ax_l;
  }
  
  public void setQgd_ax_l(String qgd_ax_l) {
    this.qgd_ax_l = qgd_ax_l;
  }
  
  public String getJzsl_r() {
    return this.jzsl_r;
  }
  
  public void setJzsl_r(String jzsl_r) {
    this.jzsl_r = jzsl_r;
  }
  
  public String getJm_r() {
    return this.jm_r;
  }
  
  public void setJm_r(String jm_r) {
    this.jm_r = jm_r;
  }
  
  public String getYy_r() {
    return this.yy_r;
  }
  
  public void setYy_r(String yy_r) {
    this.yy_r = yy_r;
  }
  
  public String getBz_r() {
    return this.bz_r;
  }
  
  public void setBz_r(String bz_r) {
    this.bz_r = bz_r;
  }
  
  public String getLysl_l() {
    return this.lysl_l;
  }
  
  public void setLysl_l(String lysl_l) {
    this.lysl_l = lysl_l;
  }
  
  public String getJzsl_l() {
    return this.jzsl_l;
  }
  
  public void setJzsl_l(String jzsl_l) {
    this.jzsl_l = jzsl_l;
  }
  
  public String getJm_l() {
    return this.jm_l;
  }
  
  public void setJm_l(String jm_l) {
    this.jm_l = jm_l;
  }
  
  public String getYy_l() {
    return this.yy_l;
  }
  
  public void setYy_l(String yy_l) {
    this.yy_l = yy_l;
  }
  
  public String getBz_l() {
    return this.bz_l;
  }
  
  public void setBz_l(String bz_l) {
    this.bz_l = bz_l;
  }
  
  public String getCz_r() {
    return this.cz_r;
  }
  
  public void setCz_r(String cz_r) {
    this.cz_r = cz_r;
  }
  
  public String getCz_l() {
    return this.cz_l;
  }
  
  public void setCz_l(String cz_l) {
    this.cz_l = cz_l;
  }
  
  public String getCz_td_r() {
    return this.cz_td_r;
  }
  
  public void setCz_td_r(String cz_td_r) {
    this.cz_td_r = cz_td_r;
  }
  
  public String getCz_td_l() {
    return this.cz_td_l;
  }
  
  public void setCz_td_l(String cz_td_l) {
    this.cz_td_l = cz_td_l;
  }
  
  public String getBmzk_r() {
    return this.bmzk_r;
  }
  
  public void setBmzk_r(String bmzk_r) {
    this.bmzk_r = bmzk_r;
  }
  
  public String getBmzk_l() {
    return this.bmzk_l;
  }
  
  public void setBmzk_l(String bmzk_l) {
    this.bmzk_l = bmzk_l;
  }
  
  public String getByzk_r() {
    return this.byzk_r;
  }
  
  public void setByzk_r(String byzk_r) {
    this.byzk_r = byzk_r;
  }
  
  public String getByzk_l() {
    return this.byzk_l;
  }
  
  public void setByzk_l(String byzk_l) {
    this.byzk_l = byzk_l;
  }
  
  public String getJpjc_cz_r() {
    return this.jpjc_cz_r;
  }
  
  public void setJpjc_cz_r(String jpjc_cz_r) {
    this.jpjc_cz_r = jpjc_cz_r;
  }
  
  public String getJpjc_cz_l() {
    return this.jpjc_cz_l;
  }
  
  public void setJpjc_cz_l(String jpjc_cz_l) {
    this.jpjc_cz_l = jpjc_cz_l;
  }
  
  public String getJpjc_qt() {
    return this.jpjc_qt;
  }
  
  public void setJpjc_qt(String jpjc_qt) {
    this.jpjc_qt = jpjc_qt;
  }
  
  public String getXcfcsj() {
    return this.xcfcsj;
  }
  
  public void setXcfcsj(String xcfcsj) {
    this.xcfcsj = xcfcsj;
  }
  
  public String getTbzysx() {
    return this.tbzysx;
  }
  
  public void setTbzysx(String tbzysx) {
    this.tbzysx = tbzysx;
  }
  
  public String getGmhly() {
    return this.gmhly;
  }
  
  public void setGmhly(String gmhly) {
    this.gmhly = gmhly;
  }
  
  public String getHlykp() {
    return this.hlykp;
  }
  
  public void setHlykp(String hlykp) {
    this.hlykp = hlykp;
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
  
  public String getYongyao_r() {
    return this.yongyao_r;
  }
  
  public void setYongyao_r(String yongyao_r) {
    this.yongyao_r = yongyao_r;
  }
  
  public String getYongyao_l() {
    return this.yongyao_l;
  }
  
  public void setYongyao_l(String yongyao_l) {
    this.yongyao_l = yongyao_l;
  }
}
