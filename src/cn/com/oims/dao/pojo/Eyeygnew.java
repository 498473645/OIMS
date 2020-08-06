package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "eyeygnew")
public class Eyeygnew {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeygnew_sequence")
  @SequenceGenerator(name = "eyeygnew_sequence", sequenceName = "eyeygnew_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String qj_sp2_r;
  
  private String qj_sp2_l;
  
  private String qj_fcsp1_r;
  
  private String qj_fcsp1_l;
  
  private String qj_fcsp2_r;
  
  private String qj_fcsp2_l;
  
  private String qj_jysp_1;
  
  private String qj_jysp_2;
  
  private String zj_sp2_r;
  
  private String zj_sp2_l;
  
  private String zj_fcsp1_r;
  
  private String zj_fcsp1_l;
  
  private String zj_fcsp2_r;
  
  private String zj_fcsp2_l;
  
  private String zj_jysp_1;
  
  private String zj_jysp_2;
  
  private String z_sp2_r;
  
  private String z_sp2_l;
  
  private String z_fcsp1_r;
  
  private String z_fcsp1_l;
  
  private String z_fcsp2_r;
  
  private String z_fcsp2_l;
  
  private String z_jysp_1;
  
  private String z_jysp_2;
  
  private String snj_sp2_r;
  
  private String snj_sp2_l;
  
  private String snj_fcsp1_r;
  
  private String snj_fcsp1_l;
  
  private String snj_fcsp2_r;
  
  private String snj_fcsp2_l;
  
  private String snj_jysp_1;
  
  private String snj_jysp_2;
  
  private String d_sp2_r;
  
  private String d_sp2_l;
  
  private String d_fcsp1_r;
  
  private String d_fcsp1_l;
  
  private String d_fcsp2_r;
  
  private String d_fcsp2_l;
  
  private String d_jysp_1;
  
  private String d_jysp_2;
  
  private String jzsl_sp2_r;
  
  private String jzsl_sp2_l;
  
  private String jzsl_fcsp1_r;
  
  private String jzsl_fcsp1_l;
  
  private String jzsl_fcsp2_r;
  
  private String jzsl_fcsp2_l;
  
  private String jzsl_jysp_1;
  
  private String jzsl_jysp_2;
  
  private String lyy_sp2_r;
  
  private String lyy_sp2_l;
  
  private String lyy_fcsp1_r;
  
  private String lyy_fcsp1_l;
  
  private String lyy_fcsp2_r;
  
  private String lyy_fcsp2_l;
  
  private String lyy_jysp_1;
  
  private String lyy_jysp_2;
  
  private String lyj_sp2_r;
  
  private String lyj_sp2_l;
  
  private String lyj_fcsp1_r;
  
  private String lyj_fcsp1_l;
  
  private String lyj_fcsp2_r;
  
  private String lyj_fcsp2_l;
  
  private String lyj_jysp_1;
  
  private String lyj_jysp_2;
  
  private String zk_sp2_r;
  
  private String zk_sp2_l;
  
  private String zk_fcsp1_r;
  
  private String zk_fcsp1_l;
  
  private String zk_fcsp2_r;
  
  private String zk_fcsp2_l;
  
  private String zk_jysp_1;
  
  private String zk_jysp_2;
  
  private String tjlm;
  
  private String yx_5m;
  
  private String yx_40m;
  
  private String ac_a;
  
  private String worth4;
  
  private String nra;
  
  private String pra;
  
  private String kt_xt;
  
  private String sffc;
  
  private String ktyw;
  
  private String xt_jy;
  
  private String jmsxj;
  
  private String zbqxcxjp;
  
  private String dgj;
  
  private String jbj;
  
  private String rgp;
  
  private String tjxl;
  
  private String zjxx;
  
  private String logmar;
  
  private String yyly;
  
  private String demo;
  
  private String doctor;
  
  @Column(name = "cli_date")
  private String cliDate;
  
  @Column(name = "rep_doc")
  private String repDoc;
  
  @Column(name = "check_doc")
  private String checkDoc;
  
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
  
  public String getQj_sp2_r() {
    return this.qj_sp2_r;
  }
  
  public void setQj_sp2_r(String qj_sp2_r) {
    this.qj_sp2_r = qj_sp2_r;
  }
  
  public String getQj_sp2_l() {
    return this.qj_sp2_l;
  }
  
  public void setQj_sp2_l(String qj_sp2_l) {
    this.qj_sp2_l = qj_sp2_l;
  }
  
  public String getQj_fcsp1_r() {
    return this.qj_fcsp1_r;
  }
  
  public void setQj_fcsp1_r(String qj_fcsp1_r) {
    this.qj_fcsp1_r = qj_fcsp1_r;
  }
  
  public String getQj_fcsp1_l() {
    return this.qj_fcsp1_l;
  }
  
  public void setQj_fcsp1_l(String qj_fcsp1_l) {
    this.qj_fcsp1_l = qj_fcsp1_l;
  }
  
  public String getQj_fcsp2_r() {
    return this.qj_fcsp2_r;
  }
  
  public void setQj_fcsp2_r(String qj_fcsp2_r) {
    this.qj_fcsp2_r = qj_fcsp2_r;
  }
  
  public String getQj_fcsp2_l() {
    return this.qj_fcsp2_l;
  }
  
  public void setQj_fcsp2_l(String qj_fcsp2_l) {
    this.qj_fcsp2_l = qj_fcsp2_l;
  }
  
  public String getQj_jysp_1() {
    return this.qj_jysp_1;
  }
  
  public void setQj_jysp_1(String qj_jysp_1) {
    this.qj_jysp_1 = qj_jysp_1;
  }
  
  public String getQj_jysp_2() {
    return this.qj_jysp_2;
  }
  
  public void setQj_jysp_2(String qj_jysp_2) {
    this.qj_jysp_2 = qj_jysp_2;
  }
  
  public String getZj_sp2_r() {
    return this.zj_sp2_r;
  }
  
  public void setZj_sp2_r(String zj_sp2_r) {
    this.zj_sp2_r = zj_sp2_r;
  }
  
  public String getZj_sp2_l() {
    return this.zj_sp2_l;
  }
  
  public void setZj_sp2_l(String zj_sp2_l) {
    this.zj_sp2_l = zj_sp2_l;
  }
  
  public String getZj_fcsp1_r() {
    return this.zj_fcsp1_r;
  }
  
  public void setZj_fcsp1_r(String zj_fcsp1_r) {
    this.zj_fcsp1_r = zj_fcsp1_r;
  }
  
  public String getZj_fcsp1_l() {
    return this.zj_fcsp1_l;
  }
  
  public void setZj_fcsp1_l(String zj_fcsp1_l) {
    this.zj_fcsp1_l = zj_fcsp1_l;
  }
  
  public String getZj_fcsp2_r() {
    return this.zj_fcsp2_r;
  }
  
  public void setZj_fcsp2_r(String zj_fcsp2_r) {
    this.zj_fcsp2_r = zj_fcsp2_r;
  }
  
  public String getZj_fcsp2_l() {
    return this.zj_fcsp2_l;
  }
  
  public void setZj_fcsp2_l(String zj_fcsp2_l) {
    this.zj_fcsp2_l = zj_fcsp2_l;
  }
  
  public String getZj_jysp_1() {
    return this.zj_jysp_1;
  }
  
  public void setZj_jysp_1(String zj_jysp_1) {
    this.zj_jysp_1 = zj_jysp_1;
  }
  
  public String getZj_jysp_2() {
    return this.zj_jysp_2;
  }
  
  public void setZj_jysp_2(String zj_jysp_2) {
    this.zj_jysp_2 = zj_jysp_2;
  }
  
  public String getZ_sp2_r() {
    return this.z_sp2_r;
  }
  
  public void setZ_sp2_r(String z_sp2_r) {
    this.z_sp2_r = z_sp2_r;
  }
  
  public String getZ_sp2_l() {
    return this.z_sp2_l;
  }
  
  public void setZ_sp2_l(String z_sp2_l) {
    this.z_sp2_l = z_sp2_l;
  }
  
  public String getZ_fcsp1_r() {
    return this.z_fcsp1_r;
  }
  
  public void setZ_fcsp1_r(String z_fcsp1_r) {
    this.z_fcsp1_r = z_fcsp1_r;
  }
  
  public String getZ_fcsp2_r() {
    return this.z_fcsp2_r;
  }
  
  public void setZ_fcsp2_r(String z_fcsp2_r) {
    this.z_fcsp2_r = z_fcsp2_r;
  }
  
  public String getZ_fcsp2_l() {
    return this.z_fcsp2_l;
  }
  
  public void setZ_fcsp2_l(String z_fcsp2_l) {
    this.z_fcsp2_l = z_fcsp2_l;
  }
  
  public String getZ_jysp_1() {
    return this.z_jysp_1;
  }
  
  public void setZ_jysp_1(String z_jysp_1) {
    this.z_jysp_1 = z_jysp_1;
  }
  
  public String getZ_jysp_2() {
    return this.z_jysp_2;
  }
  
  public void setZ_jysp_2(String z_jysp_2) {
    this.z_jysp_2 = z_jysp_2;
  }
  
  public String getSnj_sp2_r() {
    return this.snj_sp2_r;
  }
  
  public void setSnj_sp2_r(String snj_sp2_r) {
    this.snj_sp2_r = snj_sp2_r;
  }
  
  public String getSnj_sp2_l() {
    return this.snj_sp2_l;
  }
  
  public void setSnj_sp2_l(String snj_sp2_l) {
    this.snj_sp2_l = snj_sp2_l;
  }
  
  public String getSnj_fcsp1_r() {
    return this.snj_fcsp1_r;
  }
  
  public void setSnj_fcsp1_r(String snj_fcsp1_r) {
    this.snj_fcsp1_r = snj_fcsp1_r;
  }
  
  public String getSnj_fcsp1_l() {
    return this.snj_fcsp1_l;
  }
  
  public void setSnj_fcsp1_l(String snj_fcsp1_l) {
    this.snj_fcsp1_l = snj_fcsp1_l;
  }
  
  public String getSnj_fcsp2_r() {
    return this.snj_fcsp2_r;
  }
  
  public void setSnj_fcsp2_r(String snj_fcsp2_r) {
    this.snj_fcsp2_r = snj_fcsp2_r;
  }
  
  public String getSnj_fcsp2_l() {
    return this.snj_fcsp2_l;
  }
  
  public void setSnj_fcsp2_l(String snj_fcsp2_l) {
    this.snj_fcsp2_l = snj_fcsp2_l;
  }
  
  public String getSnj_jysp_1() {
    return this.snj_jysp_1;
  }
  
  public void setSnj_jysp_1(String snj_jysp_1) {
    this.snj_jysp_1 = snj_jysp_1;
  }
  
  public String getSnj_jysp_2() {
    return this.snj_jysp_2;
  }
  
  public void setSnj_jysp_2(String snj_jysp_2) {
    this.snj_jysp_2 = snj_jysp_2;
  }
  
  public String getD_sp2_r() {
    return this.d_sp2_r;
  }
  
  public void setD_sp2_r(String d_sp2_r) {
    this.d_sp2_r = d_sp2_r;
  }
  
  public String getD_sp2_l() {
    return this.d_sp2_l;
  }
  
  public void setD_sp2_l(String d_sp2_l) {
    this.d_sp2_l = d_sp2_l;
  }
  
  public String getD_fcsp1_r() {
    return this.d_fcsp1_r;
  }
  
  public void setD_fcsp1_r(String d_fcsp1_r) {
    this.d_fcsp1_r = d_fcsp1_r;
  }
  
  public String getD_fcsp1_l() {
    return this.d_fcsp1_l;
  }
  
  public void setD_fcsp1_l(String d_fcsp1_l) {
    this.d_fcsp1_l = d_fcsp1_l;
  }
  
  public String getD_fcsp2_r() {
    return this.d_fcsp2_r;
  }
  
  public void setD_fcsp2_r(String d_fcsp2_r) {
    this.d_fcsp2_r = d_fcsp2_r;
  }
  
  public String getD_fcsp2_l() {
    return this.d_fcsp2_l;
  }
  
  public void setD_fcsp2_l(String d_fcsp2_l) {
    this.d_fcsp2_l = d_fcsp2_l;
  }
  
  public String getD_jysp_1() {
    return this.d_jysp_1;
  }
  
  public void setD_jysp_1(String d_jysp_1) {
    this.d_jysp_1 = d_jysp_1;
  }
  
  public String getD_jysp_2() {
    return this.d_jysp_2;
  }
  
  public void setD_jysp_2(String d_jysp_2) {
    this.d_jysp_2 = d_jysp_2;
  }
  
  public String getJzsl_sp2_r() {
    return this.jzsl_sp2_r;
  }
  
  public void setJzsl_sp2_r(String jzsl_sp2_r) {
    this.jzsl_sp2_r = jzsl_sp2_r;
  }
  
  public String getJzsl_sp2_l() {
    return this.jzsl_sp2_l;
  }
  
  public void setJzsl_sp2_l(String jzsl_sp2_l) {
    this.jzsl_sp2_l = jzsl_sp2_l;
  }
  
  public String getJzsl_fcsp1_r() {
    return this.jzsl_fcsp1_r;
  }
  
  public void setJzsl_fcsp1_r(String jzsl_fcsp1_r) {
    this.jzsl_fcsp1_r = jzsl_fcsp1_r;
  }
  
  public String getJzsl_fcsp1_l() {
    return this.jzsl_fcsp1_l;
  }
  
  public void setJzsl_fcsp1_l(String jzsl_fcsp1_l) {
    this.jzsl_fcsp1_l = jzsl_fcsp1_l;
  }
  
  public String getJzsl_fcsp2_r() {
    return this.jzsl_fcsp2_r;
  }
  
  public void setJzsl_fcsp2_r(String jzsl_fcsp2_r) {
    this.jzsl_fcsp2_r = jzsl_fcsp2_r;
  }
  
  public String getJzsl_fcsp2_l() {
    return this.jzsl_fcsp2_l;
  }
  
  public void setJzsl_fcsp2_l(String jzsl_fcsp2_l) {
    this.jzsl_fcsp2_l = jzsl_fcsp2_l;
  }
  
  public String getJzsl_jysp_1() {
    return this.jzsl_jysp_1;
  }
  
  public void setJzsl_jysp_1(String jzsl_jysp_1) {
    this.jzsl_jysp_1 = jzsl_jysp_1;
  }
  
  public String getJzsl_jysp_2() {
    return this.jzsl_jysp_2;
  }
  
  public void setJzsl_jysp_2(String jzsl_jysp_2) {
    this.jzsl_jysp_2 = jzsl_jysp_2;
  }
  
  public String getLyy_sp2_r() {
    return this.lyy_sp2_r;
  }
  
  public void setLyy_sp2_r(String lyy_sp2_r) {
    this.lyy_sp2_r = lyy_sp2_r;
  }
  
  public String getLyy_sp2_l() {
    return this.lyy_sp2_l;
  }
  
  public void setLyy_sp2_l(String lyy_sp2_l) {
    this.lyy_sp2_l = lyy_sp2_l;
  }
  
  public String getLyy_fcsp1_r() {
    return this.lyy_fcsp1_r;
  }
  
  public void setLyy_fcsp1_r(String lyy_fcsp1_r) {
    this.lyy_fcsp1_r = lyy_fcsp1_r;
  }
  
  public String getLyy_fcsp1_l() {
    return this.lyy_fcsp1_l;
  }
  
  public void setLyy_fcsp1_l(String lyy_fcsp1_l) {
    this.lyy_fcsp1_l = lyy_fcsp1_l;
  }
  
  public String getLyy_fcsp2_r() {
    return this.lyy_fcsp2_r;
  }
  
  public void setLyy_fcsp2_r(String lyy_fcsp2_r) {
    this.lyy_fcsp2_r = lyy_fcsp2_r;
  }
  
  public String getLyy_fcsp2_l() {
    return this.lyy_fcsp2_l;
  }
  
  public void setLyy_fcsp2_l(String lyy_fcsp2_l) {
    this.lyy_fcsp2_l = lyy_fcsp2_l;
  }
  
  public String getLyy_jysp_1() {
    return this.lyy_jysp_1;
  }
  
  public void setLyy_jysp_1(String lyy_jysp_1) {
    this.lyy_jysp_1 = lyy_jysp_1;
  }
  
  public String getLyy_jysp_2() {
    return this.lyy_jysp_2;
  }
  
  public void setLyy_jysp_2(String lyy_jysp_2) {
    this.lyy_jysp_2 = lyy_jysp_2;
  }
  
  public String getLyj_sp2_r() {
    return this.lyj_sp2_r;
  }
  
  public void setLyj_sp2_r(String lyj_sp2_r) {
    this.lyj_sp2_r = lyj_sp2_r;
  }
  
  public String getLyj_sp2_l() {
    return this.lyj_sp2_l;
  }
  
  public void setLyj_sp2_l(String lyj_sp2_l) {
    this.lyj_sp2_l = lyj_sp2_l;
  }
  
  public String getLyj_fcsp1_r() {
    return this.lyj_fcsp1_r;
  }
  
  public void setLyj_fcsp1_r(String lyj_fcsp1_r) {
    this.lyj_fcsp1_r = lyj_fcsp1_r;
  }
  
  public String getLyj_fcsp1_l() {
    return this.lyj_fcsp1_l;
  }
  
  public void setLyj_fcsp1_l(String lyj_fcsp1_l) {
    this.lyj_fcsp1_l = lyj_fcsp1_l;
  }
  
  public String getLyj_fcsp2_r() {
    return this.lyj_fcsp2_r;
  }
  
  public void setLyj_fcsp2_r(String lyj_fcsp2_r) {
    this.lyj_fcsp2_r = lyj_fcsp2_r;
  }
  
  public String getLyj_fcsp2_l() {
    return this.lyj_fcsp2_l;
  }
  
  public void setLyj_fcsp2_l(String lyj_fcsp2_l) {
    this.lyj_fcsp2_l = lyj_fcsp2_l;
  }
  
  public String getLyj_jysp_1() {
    return this.lyj_jysp_1;
  }
  
  public void setLyj_jysp_1(String lyj_jysp_1) {
    this.lyj_jysp_1 = lyj_jysp_1;
  }
  
  public String getLyj_jysp_2() {
    return this.lyj_jysp_2;
  }
  
  public void setLyj_jysp_2(String lyj_jysp_2) {
    this.lyj_jysp_2 = lyj_jysp_2;
  }
  
  public String getZk_sp2_r() {
    return this.zk_sp2_r;
  }
  
  public void setZk_sp2_r(String zk_sp2_r) {
    this.zk_sp2_r = zk_sp2_r;
  }
  
  public String getZk_sp2_l() {
    return this.zk_sp2_l;
  }
  
  public void setZk_sp2_l(String zk_sp2_l) {
    this.zk_sp2_l = zk_sp2_l;
  }
  
  public String getZk_fcsp1_r() {
    return this.zk_fcsp1_r;
  }
  
  public void setZk_fcsp1_r(String zk_fcsp1_r) {
    this.zk_fcsp1_r = zk_fcsp1_r;
  }
  
  public String getZk_fcsp1_l() {
    return this.zk_fcsp1_l;
  }
  
  public void setZk_fcsp1_l(String zk_fcsp1_l) {
    this.zk_fcsp1_l = zk_fcsp1_l;
  }
  
  public String getZk_fcsp2_r() {
    return this.zk_fcsp2_r;
  }
  
  public void setZk_fcsp2_r(String zk_fcsp2_r) {
    this.zk_fcsp2_r = zk_fcsp2_r;
  }
  
  public String getZk_fcsp2_l() {
    return this.zk_fcsp2_l;
  }
  
  public void setZk_fcsp2_l(String zk_fcsp2_l) {
    this.zk_fcsp2_l = zk_fcsp2_l;
  }
  
  public String getZk_jysp_1() {
    return this.zk_jysp_1;
  }
  
  public void setZk_jysp_1(String zk_jysp_1) {
    this.zk_jysp_1 = zk_jysp_1;
  }
  
  public String getZk_jysp_2() {
    return this.zk_jysp_2;
  }
  
  public void setZk_jysp_2(String zk_jysp_2) {
    this.zk_jysp_2 = zk_jysp_2;
  }
  
  public String getYx_5m() {
    return this.yx_5m;
  }
  
  public void setYx_5m(String yx_5m) {
    this.yx_5m = yx_5m;
  }
  
  public String getYx_40m() {
    return this.yx_40m;
  }
  
  public void setYx_40m(String yx_40m) {
    this.yx_40m = yx_40m;
  }
  
  public String getAc_a() {
    return this.ac_a;
  }
  
  public void setAc_a(String ac_a) {
    this.ac_a = ac_a;
  }
  
  public String getWorth4() {
    return this.worth4;
  }
  
  public void setWorth4(String worth4) {
    this.worth4 = worth4;
  }
  
  public String getNra() {
    return this.nra;
  }
  
  public void setNra(String nra) {
    this.nra = nra;
  }
  
  public String getPra() {
    return this.pra;
  }
  
  public void setPra(String pra) {
    this.pra = pra;
  }
  
  public String getKt_xt() {
    return this.kt_xt;
  }
  
  public void setKt_xt(String kt_xt) {
    this.kt_xt = kt_xt;
  }
  
  public String getSffc() {
    return this.sffc;
  }
  
  public void setSffc(String sffc) {
    this.sffc = sffc;
  }
  
  public String getKtyw() {
    return this.ktyw;
  }
  
  public void setKtyw(String ktyw) {
    this.ktyw = ktyw;
  }
  
  public String getXt_jy() {
    return this.xt_jy;
  }
  
  public void setXt_jy(String xt_jy) {
    this.xt_jy = xt_jy;
  }
  
  public String getDemo() {
    return this.demo;
  }
  
  public void setDemo(String demo) {
    this.demo = demo;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getCliDate() {
    return this.cliDate;
  }
  
  public void setCliDate(String cliDate) {
    this.cliDate = cliDate;
  }
  
  public String getRepDoc() {
    return this.repDoc;
  }
  
  public void setRepDoc(String repDoc) {
    this.repDoc = repDoc;
  }
  
  public String getCheckDoc() {
    return this.checkDoc;
  }
  
  public void setCheckDoc(String checkDoc) {
    this.checkDoc = checkDoc;
  }
  
  public String getZ_fcsp1_l() {
    return this.z_fcsp1_l;
  }
  
  public void setZ_fcsp1_l(String z_fcsp1_l) {
    this.z_fcsp1_l = z_fcsp1_l;
  }
  
  public String getJmsxj() {
    return this.jmsxj;
  }
  
  public void setJmsxj(String jmsxj) {
    this.jmsxj = jmsxj;
  }
  
  public String getZbqxcxjp() {
    return this.zbqxcxjp;
  }
  
  public void setZbqxcxjp(String zbqxcxjp) {
    this.zbqxcxjp = zbqxcxjp;
  }
  
  public String getDgj() {
    return this.dgj;
  }
  
  public void setDgj(String dgj) {
    this.dgj = dgj;
  }
  
  public String getJbj() {
    return this.jbj;
  }
  
  public void setJbj(String jbj) {
    this.jbj = jbj;
  }
  
  public String getRgp() {
    return this.rgp;
  }
  
  public void setRgp(String rgp) {
    this.rgp = rgp;
  }
  
  public String getTjxl() {
    return this.tjxl;
  }
  
  public void setTjxl(String tjxl) {
    this.tjxl = tjxl;
  }
  
  public String getLogmar() {
    return this.logmar;
  }
  
  public void setLogmar(String logmar) {
    this.logmar = logmar;
  }
  
  public String getYyly() {
    return this.yyly;
  }
  
  public void setYyly(String yyly) {
    this.yyly = yyly;
  }
  
  public String getTjlm() {
    return this.tjlm;
  }
  
  public void setTjlm(String tjlm) {
    this.tjlm = tjlm;
  }
  
  public String getZjxx() {
    return this.zjxx;
  }
  
  public void setZjxx(String zjxx) {
    this.zjxx = zjxx;
  }
}
