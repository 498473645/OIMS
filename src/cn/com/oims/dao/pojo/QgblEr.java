package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qg_bl_er")
public class QgblEr {
  private Long id;
  
  private String bingliNumber;
  
  private Date czrq;
  
  private Date jzrq;
  
  private String blh;
  
  private String qgzs;
  
  private String qgjws;
  
  private String ywgms;
  
  private String jtjss;
  
  private Integer yb;
  
  private String yw_r;
  
  private String yw_l;
  
  private String ysl_r;
  
  private String jsl_r;
  
  private String ysl_l;
  
  private String jsl_l;
  
  private String jmzj_r;
  
  private String jmzj_l;
  
  private String tkzj_m_r;
  
  private String tkzj_a_r;
  
  private String tkzj_m_l;
  
  private String tkzj_a_l;
  
  private String yanya_r;
  
  private String yanya_l;
  
  private String jmdxt_K1_r;
  
  private String jmdxt_a_r;
  
  private String jmdxt_K1_l;
  
  private String jmdxt_a_l;
  
  private String jmdxt_K2_r;
  
  private String jmdxt_DK_r;
  
  private String jmdxt_K2_l;
  
  private String jmdxt_DK_l;
  
  private String dnyg_r1;
  
  private String dnyg_l1;
  
  private String dnyg_r2;
  
  private String dnyg_l2;
  
  private String dnyg_r3;
  
  private String dnyg_l3;
  
  private String ktjy_r1;
  
  private String ktjy_l1;
  
  private String ktjy_r2;
  
  private String ktjy_l2;
  
  private String ktjy_r3;
  
  private String ktjy_l3;
  
  private String ktsp_r1;
  
  private String ktsp_l1;
  
  private String ktsp_r2;
  
  private String ktsp_l2;
  
  private String ktsp_r3;
  
  private String ktsp_l3;
  
  private String ktsp_r4;
  
  private String ktsp_l4;
  
  private String xtjy_r1;
  
  private String xtjy_l1;
  
  private String xtjy_r2;
  
  private String xtjy_l2;
  
  private String xtjy_r3;
  
  private String xtjy_l3;
  
  private String xtjy_r4;
  
  private String xtjy_l4;
  
  private String xtsp_r1;
  
  private String xtsp_l1;
  
  private String xtsp_r2;
  
  private String xtsp_l2;
  
  private String xtsp_r3;
  
  private String xtsp_l3;
  
  private String xtsp_r4;
  
  private String xtsp_l4;
  
  private String zsxz_r;
  
  private String zsxz_l;
  
  private String jmhd_r;
  
  private String jmhd_l;
  
  private String tss;
  
  private String rhfw;
  
  private String lts;
  
  private String xbdjc;
  
  private String zxad_r;
  
  private String zxad_l;
  
  private String yzcd_r;
  
  private String yzcd_l;
  
  private String PVEP_r;
  
  private String PVEP_l;
  
  private String lxdzx_r;
  
  private String lxdzx_l;
  
  private String npjjc_r;
  
  private String npjjc_l;
  
  private String smjjc_1_r;
  
  private String smjjc_1_l;
  
  private String smjjc_2_r;
  
  private String smjjc_2_l;
  
  private String clyj_r;
  
  private String clyj_l;
  
  private String bz;
  
  private String bz_qz;
  
  private String wz_qz;
  
  private String yw_qz;
  
  private String sl_qz;
  
  private String jmzj_qz;
  
  private String tkzj_qz;
  
  private String yanya_qz;
  
  private String jmdxt_qz;
  
  private String dnyg_qz;
  
  private String ktjy_qz;
  
  private String ktsp_qz;
  
  private String xtjy_qz;
  
  private String xtsp_qz;
  
  private String zsxz_qz;
  
  private String jmhd_qz;
  
  private String tss_qz;
  
  private String rhfw_qz;
  
  private String lts_qz;
  
  private String xbdjc_qz;
  
  private String zxad_qz;
  
  private String yzcd_qz;
  
  private String PVEP_qz;
  
  private String lxdzx_qz;
  
  private String npjjc_qz;
  
  private String smjjc_qz;
  
  private String clyj_qz;
  
  private String jhr;
  
  private String ssfs;
  
  private String ssfy;
  
  private String qg_jcf;
  
  private Date ssf_rq;
  
  private Date jcf_rq;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_bl_er_sequence")
  @SequenceGenerator(name = "qg_bl_er_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_bl_er_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getBingliNumber() {
    return this.bingliNumber;
  }
  
  public void setBingliNumber(String bingliNumber) {
    this.bingliNumber = bingliNumber;
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
  
  public String getQgzs() {
    return this.qgzs;
  }
  
  public void setQgzs(String qgzs) {
    this.qgzs = qgzs;
  }
  
  public String getQgjws() {
    return this.qgjws;
  }
  
  public void setQgjws(String qgjws) {
    this.qgjws = qgjws;
  }
  
  public String getYwgms() {
    return this.ywgms;
  }
  
  public void setYwgms(String ywgms) {
    this.ywgms = ywgms;
  }
  
  public String getJtjss() {
    return this.jtjss;
  }
  
  public void setJtjss(String jtjss) {
    this.jtjss = jtjss;
  }
  
  public Integer getYb() {
    return this.yb;
  }
  
  public void setYb(Integer yb) {
    this.yb = yb;
  }
  
  public String getYw_r() {
    return this.yw_r;
  }
  
  public void setYw_r(String yw_r) {
    this.yw_r = yw_r;
  }
  
  public String getYw_l() {
    return this.yw_l;
  }
  
  public void setYw_l(String yw_l) {
    this.yw_l = yw_l;
  }
  
  public String getYsl_r() {
    return this.ysl_r;
  }
  
  public void setYsl_r(String ysl_r) {
    this.ysl_r = ysl_r;
  }
  
  public String getJsl_r() {
    return this.jsl_r;
  }
  
  public void setJsl_r(String jsl_r) {
    this.jsl_r = jsl_r;
  }
  
  public String getYsl_l() {
    return this.ysl_l;
  }
  
  public void setYsl_l(String ysl_l) {
    this.ysl_l = ysl_l;
  }
  
  public String getJsl_l() {
    return this.jsl_l;
  }
  
  public void setJsl_l(String jsl_l) {
    this.jsl_l = jsl_l;
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
  
  public String getJmdxt_K1_r() {
    return this.jmdxt_K1_r;
  }
  
  public void setJmdxt_K1_r(String jmdxt_K1_r) {
    this.jmdxt_K1_r = jmdxt_K1_r;
  }
  
  public String getJmdxt_a_r() {
    return this.jmdxt_a_r;
  }
  
  public void setJmdxt_a_r(String jmdxt_a_r) {
    this.jmdxt_a_r = jmdxt_a_r;
  }
  
  public String getJmdxt_K1_l() {
    return this.jmdxt_K1_l;
  }
  
  public void setJmdxt_K1_l(String jmdxt_K1_l) {
    this.jmdxt_K1_l = jmdxt_K1_l;
  }
  
  public String getJmdxt_a_l() {
    return this.jmdxt_a_l;
  }
  
  public void setJmdxt_a_l(String jmdxt_a_l) {
    this.jmdxt_a_l = jmdxt_a_l;
  }
  
  public String getJmdxt_K2_r() {
    return this.jmdxt_K2_r;
  }
  
  public void setJmdxt_K2_r(String jmdxt_K2_r) {
    this.jmdxt_K2_r = jmdxt_K2_r;
  }
  
  public String getJmdxt_DK_r() {
    return this.jmdxt_DK_r;
  }
  
  public void setJmdxt_DK_r(String jmdxt_DK_r) {
    this.jmdxt_DK_r = jmdxt_DK_r;
  }
  
  public String getJmdxt_K2_l() {
    return this.jmdxt_K2_l;
  }
  
  public void setJmdxt_K2_l(String jmdxt_K2_l) {
    this.jmdxt_K2_l = jmdxt_K2_l;
  }
  
  public String getJmdxt_DK_l() {
    return this.jmdxt_DK_l;
  }
  
  public void setJmdxt_DK_l(String jmdxt_DK_l) {
    this.jmdxt_DK_l = jmdxt_DK_l;
  }
  
  public String getDnyg_r1() {
    return this.dnyg_r1;
  }
  
  public void setDnyg_r1(String dnyg_r1) {
    this.dnyg_r1 = dnyg_r1;
  }
  
  public String getDnyg_l1() {
    return this.dnyg_l1;
  }
  
  public void setDnyg_l1(String dnyg_l1) {
    this.dnyg_l1 = dnyg_l1;
  }
  
  public String getDnyg_r2() {
    return this.dnyg_r2;
  }
  
  public void setDnyg_r2(String dnyg_r2) {
    this.dnyg_r2 = dnyg_r2;
  }
  
  public String getDnyg_l2() {
    return this.dnyg_l2;
  }
  
  public void setDnyg_l2(String dnyg_l2) {
    this.dnyg_l2 = dnyg_l2;
  }
  
  public String getKtjy_r1() {
    return this.ktjy_r1;
  }
  
  public void setKtjy_r1(String ktjy_r1) {
    this.ktjy_r1 = ktjy_r1;
  }
  
  public String getKtjy_l1() {
    return this.ktjy_l1;
  }
  
  public void setKtjy_l1(String ktjy_l1) {
    this.ktjy_l1 = ktjy_l1;
  }
  
  public String getKtjy_r2() {
    return this.ktjy_r2;
  }
  
  public void setKtjy_r2(String ktjy_r2) {
    this.ktjy_r2 = ktjy_r2;
  }
  
  public String getKtjy_l2() {
    return this.ktjy_l2;
  }
  
  public void setKtjy_l2(String ktjy_l2) {
    this.ktjy_l2 = ktjy_l2;
  }
  
  public String getKtsp_r1() {
    return this.ktsp_r1;
  }
  
  public void setKtsp_r1(String ktsp_r1) {
    this.ktsp_r1 = ktsp_r1;
  }
  
  public String getKtsp_l1() {
    return this.ktsp_l1;
  }
  
  public void setKtsp_l1(String ktsp_l1) {
    this.ktsp_l1 = ktsp_l1;
  }
  
  public String getKtsp_r2() {
    return this.ktsp_r2;
  }
  
  public void setKtsp_r2(String ktsp_r2) {
    this.ktsp_r2 = ktsp_r2;
  }
  
  public String getKtsp_l2() {
    return this.ktsp_l2;
  }
  
  public void setKtsp_l2(String ktsp_l2) {
    this.ktsp_l2 = ktsp_l2;
  }
  
  public String getKtsp_r3() {
    return this.ktsp_r3;
  }
  
  public void setKtsp_r3(String ktsp_r3) {
    this.ktsp_r3 = ktsp_r3;
  }
  
  public String getKtsp_l3() {
    return this.ktsp_l3;
  }
  
  public void setKtsp_l3(String ktsp_l3) {
    this.ktsp_l3 = ktsp_l3;
  }
  
  public String getXtjy_r1() {
    return this.xtjy_r1;
  }
  
  public void setXtjy_r1(String xtjy_r1) {
    this.xtjy_r1 = xtjy_r1;
  }
  
  public String getXtjy_l1() {
    return this.xtjy_l1;
  }
  
  public void setXtjy_l1(String xtjy_l1) {
    this.xtjy_l1 = xtjy_l1;
  }
  
  public String getXtjy_r2() {
    return this.xtjy_r2;
  }
  
  public void setXtjy_r2(String xtjy_r2) {
    this.xtjy_r2 = xtjy_r2;
  }
  
  public String getXtjy_l2() {
    return this.xtjy_l2;
  }
  
  public void setXtjy_l2(String xtjy_l2) {
    this.xtjy_l2 = xtjy_l2;
  }
  
  public String getXtjy_r3() {
    return this.xtjy_r3;
  }
  
  public void setXtjy_r3(String xtjy_r3) {
    this.xtjy_r3 = xtjy_r3;
  }
  
  public String getXtjy_l3() {
    return this.xtjy_l3;
  }
  
  public void setXtjy_l3(String xtjy_l3) {
    this.xtjy_l3 = xtjy_l3;
  }
  
  public String getXtsp_r1() {
    return this.xtsp_r1;
  }
  
  public void setXtsp_r1(String xtsp_r1) {
    this.xtsp_r1 = xtsp_r1;
  }
  
  public String getXtsp_l1() {
    return this.xtsp_l1;
  }
  
  public void setXtsp_l1(String xtsp_l1) {
    this.xtsp_l1 = xtsp_l1;
  }
  
  public String getXtsp_r2() {
    return this.xtsp_r2;
  }
  
  public void setXtsp_r2(String xtsp_r2) {
    this.xtsp_r2 = xtsp_r2;
  }
  
  public String getXtsp_l2() {
    return this.xtsp_l2;
  }
  
  public void setXtsp_l2(String xtsp_l2) {
    this.xtsp_l2 = xtsp_l2;
  }
  
  public String getXtsp_r3() {
    return this.xtsp_r3;
  }
  
  public void setXtsp_r3(String xtsp_r3) {
    this.xtsp_r3 = xtsp_r3;
  }
  
  public String getXtsp_l3() {
    return this.xtsp_l3;
  }
  
  public void setXtsp_l3(String xtsp_l3) {
    this.xtsp_l3 = xtsp_l3;
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
  
  public String getJmhd_r() {
    return this.jmhd_r;
  }
  
  public void setJmhd_r(String jmhd_r) {
    this.jmhd_r = jmhd_r;
  }
  
  public String getJmhd_l() {
    return this.jmhd_l;
  }
  
  public void setJmhd_l(String jmhd_l) {
    this.jmhd_l = jmhd_l;
  }
  
  public String getTss() {
    return this.tss;
  }
  
  public void setTss(String tss) {
    this.tss = tss;
  }
  
  public String getRhfw() {
    return this.rhfw;
  }
  
  public void setRhfw(String rhfw) {
    this.rhfw = rhfw;
  }
  
  public String getLts() {
    return this.lts;
  }
  
  public void setLts(String lts) {
    this.lts = lts;
  }
  
  public String getXbdjc() {
    return this.xbdjc;
  }
  
  public void setXbdjc(String xbdjc) {
    this.xbdjc = xbdjc;
  }
  
  public String getZxad_r() {
    return this.zxad_r;
  }
  
  public void setZxad_r(String zxad_r) {
    this.zxad_r = zxad_r;
  }
  
  public String getZxad_l() {
    return this.zxad_l;
  }
  
  public void setZxad_l(String zxad_l) {
    this.zxad_l = zxad_l;
  }
  
  public String getYzcd_r() {
    return this.yzcd_r;
  }
  
  public void setYzcd_r(String yzcd_r) {
    this.yzcd_r = yzcd_r;
  }
  
  public String getYzcd_l() {
    return this.yzcd_l;
  }
  
  public void setYzcd_l(String yzcd_l) {
    this.yzcd_l = yzcd_l;
  }
  
  public String getPVEP_r() {
    return this.PVEP_r;
  }
  
  public void setPVEP_r(String pVEP_r) {
    this.PVEP_r = pVEP_r;
  }
  
  public String getPVEP_l() {
    return this.PVEP_l;
  }
  
  public void setPVEP_l(String pVEP_l) {
    this.PVEP_l = pVEP_l;
  }
  
  public String getLxdzx_r() {
    return this.lxdzx_r;
  }
  
  public void setLxdzx_r(String lxdzx_r) {
    this.lxdzx_r = lxdzx_r;
  }
  
  public String getLxdzx_l() {
    return this.lxdzx_l;
  }
  
  public void setLxdzx_l(String lxdzx_l) {
    this.lxdzx_l = lxdzx_l;
  }
  
  public String getNpjjc_r() {
    return this.npjjc_r;
  }
  
  public void setNpjjc_r(String npjjc_r) {
    this.npjjc_r = npjjc_r;
  }
  
  public String getNpjjc_l() {
    return this.npjjc_l;
  }
  
  public void setNpjjc_l(String npjjc_l) {
    this.npjjc_l = npjjc_l;
  }
  
  public String getSmjjc_1_r() {
    return this.smjjc_1_r;
  }
  
  public void setSmjjc_1_r(String smjjc_1_r) {
    this.smjjc_1_r = smjjc_1_r;
  }
  
  public String getSmjjc_1_l() {
    return this.smjjc_1_l;
  }
  
  public void setSmjjc_1_l(String smjjc_1_l) {
    this.smjjc_1_l = smjjc_1_l;
  }
  
  public String getSmjjc_2_r() {
    return this.smjjc_2_r;
  }
  
  public void setSmjjc_2_r(String smjjc_2_r) {
    this.smjjc_2_r = smjjc_2_r;
  }
  
  public String getSmjjc_2_l() {
    return this.smjjc_2_l;
  }
  
  public void setSmjjc_2_l(String smjjc_2_l) {
    this.smjjc_2_l = smjjc_2_l;
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
  
  public String getYw_qz() {
    return this.yw_qz;
  }
  
  public void setYw_qz(String yw_qz) {
    this.yw_qz = yw_qz;
  }
  
  public String getSl_qz() {
    return this.sl_qz;
  }
  
  public void setSl_qz(String sl_qz) {
    this.sl_qz = sl_qz;
  }
  
  public String getJmzj_qz() {
    return this.jmzj_qz;
  }
  
  public void setJmzj_qz(String jmzj_qz) {
    this.jmzj_qz = jmzj_qz;
  }
  
  public String getTkzj_qz() {
    return this.tkzj_qz;
  }
  
  public void setTkzj_qz(String tkzj_qz) {
    this.tkzj_qz = tkzj_qz;
  }
  
  public String getYanya_qz() {
    return this.yanya_qz;
  }
  
  public void setYanya_qz(String yanya_qz) {
    this.yanya_qz = yanya_qz;
  }
  
  public String getJmdxt_qz() {
    return this.jmdxt_qz;
  }
  
  public void setJmdxt_qz(String jmdxt_qz) {
    this.jmdxt_qz = jmdxt_qz;
  }
  
  public String getDnyg_qz() {
    return this.dnyg_qz;
  }
  
  public void setDnyg_qz(String dnyg_qz) {
    this.dnyg_qz = dnyg_qz;
  }
  
  public String getKtjy_qz() {
    return this.ktjy_qz;
  }
  
  public void setKtjy_qz(String ktjy_qz) {
    this.ktjy_qz = ktjy_qz;
  }
  
  public String getKtsp_qz() {
    return this.ktsp_qz;
  }
  
  public void setKtsp_qz(String ktsp_qz) {
    this.ktsp_qz = ktsp_qz;
  }
  
  public String getXtjy_qz() {
    return this.xtjy_qz;
  }
  
  public void setXtjy_qz(String xtjy_qz) {
    this.xtjy_qz = xtjy_qz;
  }
  
  public String getXtsp_qz() {
    return this.xtsp_qz;
  }
  
  public void setXtsp_qz(String xtsp_qz) {
    this.xtsp_qz = xtsp_qz;
  }
  
  public String getZsxz_qz() {
    return this.zsxz_qz;
  }
  
  public void setZsxz_qz(String zsxz_qz) {
    this.zsxz_qz = zsxz_qz;
  }
  
  public String getJmhd_qz() {
    return this.jmhd_qz;
  }
  
  public void setJmhd_qz(String jmhd_qz) {
    this.jmhd_qz = jmhd_qz;
  }
  
  public String getTss_qz() {
    return this.tss_qz;
  }
  
  public void setTss_qz(String tss_qz) {
    this.tss_qz = tss_qz;
  }
  
  public String getRhfw_qz() {
    return this.rhfw_qz;
  }
  
  public void setRhfw_qz(String rhfw_qz) {
    this.rhfw_qz = rhfw_qz;
  }
  
  public String getLts_qz() {
    return this.lts_qz;
  }
  
  public void setLts_qz(String lts_qz) {
    this.lts_qz = lts_qz;
  }
  
  public String getXbdjc_qz() {
    return this.xbdjc_qz;
  }
  
  public void setXbdjc_qz(String xbdjc_qz) {
    this.xbdjc_qz = xbdjc_qz;
  }
  
  public String getZxad_qz() {
    return this.zxad_qz;
  }
  
  public void setZxad_qz(String zxad_qz) {
    this.zxad_qz = zxad_qz;
  }
  
  public String getYzcd_qz() {
    return this.yzcd_qz;
  }
  
  public void setYzcd_qz(String yzcd_qz) {
    this.yzcd_qz = yzcd_qz;
  }
  
  public String getPVEP_qz() {
    return this.PVEP_qz;
  }
  
  public void setPVEP_qz(String pVEP_qz) {
    this.PVEP_qz = pVEP_qz;
  }
  
  public String getLxdzx_qz() {
    return this.lxdzx_qz;
  }
  
  public void setLxdzx_qz(String lxdzx_qz) {
    this.lxdzx_qz = lxdzx_qz;
  }
  
  public String getNpjjc_qz() {
    return this.npjjc_qz;
  }
  
  public void setNpjjc_qz(String npjjc_qz) {
    this.npjjc_qz = npjjc_qz;
  }
  
  public String getSmjjc_qz() {
    return this.smjjc_qz;
  }
  
  public void setSmjjc_qz(String smjjc_qz) {
    this.smjjc_qz = smjjc_qz;
  }
  
  public String getClyj_qz() {
    return this.clyj_qz;
  }
  
  public void setClyj_qz(String clyj_qz) {
    this.clyj_qz = clyj_qz;
  }
  
  public String getJhr() {
    return this.jhr;
  }
  
  public void setJhr(String jhr) {
    this.jhr = jhr;
  }
  
  public String getDnyg_r3() {
    return this.dnyg_r3;
  }
  
  public void setDnyg_r3(String dnyg_r3) {
    this.dnyg_r3 = dnyg_r3;
  }
  
  public String getDnyg_l3() {
    return this.dnyg_l3;
  }
  
  public void setDnyg_l3(String dnyg_l3) {
    this.dnyg_l3 = dnyg_l3;
  }
  
  public String getKtjy_r3() {
    return this.ktjy_r3;
  }
  
  public void setKtjy_r3(String ktjy_r3) {
    this.ktjy_r3 = ktjy_r3;
  }
  
  public String getKtjy_l3() {
    return this.ktjy_l3;
  }
  
  public void setKtjy_l3(String ktjy_l3) {
    this.ktjy_l3 = ktjy_l3;
  }
  
  public String getKtsp_r4() {
    return this.ktsp_r4;
  }
  
  public void setKtsp_r4(String ktsp_r4) {
    this.ktsp_r4 = ktsp_r4;
  }
  
  public String getKtsp_l4() {
    return this.ktsp_l4;
  }
  
  public void setKtsp_l4(String ktsp_l4) {
    this.ktsp_l4 = ktsp_l4;
  }
  
  public String getXtjy_r4() {
    return this.xtjy_r4;
  }
  
  public void setXtjy_r4(String xtjy_r4) {
    this.xtjy_r4 = xtjy_r4;
  }
  
  public String getXtjy_l4() {
    return this.xtjy_l4;
  }
  
  public void setXtjy_l4(String xtjy_l4) {
    this.xtjy_l4 = xtjy_l4;
  }
  
  public String getXtsp_r4() {
    return this.xtsp_r4;
  }
  
  public void setXtsp_r4(String xtsp_r4) {
    this.xtsp_r4 = xtsp_r4;
  }
  
  public String getXtsp_l4() {
    return this.xtsp_l4;
  }
  
  public void setXtsp_l4(String xtsp_l4) {
    this.xtsp_l4 = xtsp_l4;
  }
  
  public String getBz() {
    return this.bz;
  }
  
  public void setBz(String bz) {
    this.bz = bz;
  }
  
  public String getBz_qz() {
    return this.bz_qz;
  }
  
  public void setBz_qz(String bz_qz) {
    this.bz_qz = bz_qz;
  }
  
  public String getWz_qz() {
    return this.wz_qz;
  }
  
  public void setWz_qz(String wz_qz) {
    this.wz_qz = wz_qz;
  }
  
  public Date getJzrq() {
    return this.jzrq;
  }
  
  public void setJzrq(Date jzrq) {
    this.jzrq = jzrq;
  }
  
  public String getSsfs() {
    return this.ssfs;
  }
  
  public void setSsfs(String ssfs) {
    this.ssfs = ssfs;
  }
  
  public String getSsfy() {
    return this.ssfy;
  }
  
  public void setSsfy(String ssfy) {
    this.ssfy = ssfy;
  }
  
  public String getQg_jcf() {
    return this.qg_jcf;
  }
  
  public void setQg_jcf(String qg_jcf) {
    this.qg_jcf = qg_jcf;
  }
  
  public Date getSsf_rq() {
    return this.ssf_rq;
  }
  
  public void setSsf_rq(Date ssf_rq) {
    this.ssf_rq = ssf_rq;
  }
  
  public Date getJcf_rq() {
    return this.jcf_rq;
  }
  
  public void setJcf_rq(Date jcf_rq) {
    this.jcf_rq = jcf_rq;
  }
}
