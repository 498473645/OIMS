package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qg_shfc_er")
public class QgShfcEr {
  private Long id;
  
  private String blh;
  
  private Date sj;
  
  private String yw_r;
  
  private String yw_l;
  
  private String yw_qz;
  
  private String sl_y_r;
  
  private String sl_j_r;
  
  private String sl_y_l;
  
  private String sl_j_l;
  
  private String sl_qz;
  
  private String jmzj_r;
  
  private String jmzj_l;
  
  private String jmzj_qz;
  
  private String tkzj_r;
  
  private String tkzj_l;
  
  private String tkzj_qz;
  
  private String yy_r;
  
  private String yy_l;
  
  private String yy_qz;
  
  private String dnyg_r1;
  
  private String dnyg_l1;
  
  private String dnyg_r2;
  
  private String dnyg_l2;
  
  private String dnyg_r3;
  
  private String dnyg_l3;
  
  private String dnyg_qz;
  
  private String ktjy_r1;
  
  private String ktjy_l1;
  
  private String ktjy_r2;
  
  private String ktjy_l2;
  
  private String ktjy_r3;
  
  private String ktjy_l3;
  
  private String ktjy_qz;
  
  private String ktsp_r1;
  
  private String ktsp_l1;
  
  private String ktsp_r2;
  
  private String ktsp_l2;
  
  private String ktsp_r3;
  
  private String ktsp_l3;
  
  private String ktsp_r4;
  
  private String ktsp_l4;
  
  private String ktsp_qz;
  
  private String xtjy_r1;
  
  private String xtjy_l1;
  
  private String xtjy_r2;
  
  private String xtjy_l2;
  
  private String xtjy_r3;
  
  private String xtjy_l3;
  
  private String xtjy_r4;
  
  private String xtjy_l4;
  
  private String xtjy_qz;
  
  private String xtsp_r1;
  
  private String xtsp_l1;
  
  private String xtsp_r2;
  
  private String xtsp_l2;
  
  private String xtsp_r3;
  
  private String xtsp_l3;
  
  private String xtsp_r4;
  
  private String xtsp_l4;
  
  private String xtsp_qz;
  
  private String zsxz_r;
  
  private String zsxz_l;
  
  private String zsxz_qz;
  
  private String jmdxt_r;
  
  private String jmdxt_l;
  
  private String jmdxt_qz;
  
  private String jmhd_r;
  
  private String jmhd_l;
  
  private String jmhd_qz;
  
  private String tss_r;
  
  private String tss_l;
  
  private String tss_qz;
  
  private String rhfw_r;
  
  private String rhfw_l;
  
  private String rhfw_qz;
  
  private String lts_r;
  
  private String lts_l;
  
  private String lts_qz;
  
  private String xbdjc_r;
  
  private String xbdjc_l;
  
  private String xbdjc_qz;
  
  private String zxad_r;
  
  private String zxad_l;
  
  private String zxad_qz;
  
  private String yzcd_r;
  
  private String yzcd_l;
  
  private String yzcd_qz;
  
  private String PVEP_r;
  
  private String PVEP_l;
  
  private String PVEP_qz;
  
  private String lxdzx_r;
  
  private String lxdzx_l;
  
  private String lxdzx_qz;
  
  private String npjjc_r;
  
  private String npjjc_l;
  
  private String npjjc_qz;
  
  private String shmzjl;
  
  private Long lc_id;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_shfc_er_sequence")
  @SequenceGenerator(name = "qg_shfc_er_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_shfc_er_sequence")
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
  
  public String getYw_qz() {
    return this.yw_qz;
  }
  
  public void setYw_qz(String yw_qz) {
    this.yw_qz = yw_qz;
  }
  
  public String getSl_y_r() {
    return this.sl_y_r;
  }
  
  public void setSl_y_r(String sl_y_r) {
    this.sl_y_r = sl_y_r;
  }
  
  public String getSl_j_r() {
    return this.sl_j_r;
  }
  
  public void setSl_j_r(String sl_j_r) {
    this.sl_j_r = sl_j_r;
  }
  
  public String getSl_y_l() {
    return this.sl_y_l;
  }
  
  public void setSl_y_l(String sl_y_l) {
    this.sl_y_l = sl_y_l;
  }
  
  public String getSl_j_l() {
    return this.sl_j_l;
  }
  
  public void setSl_j_l(String sl_j_l) {
    this.sl_j_l = sl_j_l;
  }
  
  public String getSl_qz() {
    return this.sl_qz;
  }
  
  public void setSl_qz(String sl_qz) {
    this.sl_qz = sl_qz;
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
  
  public String getJmzj_qz() {
    return this.jmzj_qz;
  }
  
  public void setJmzj_qz(String jmzj_qz) {
    this.jmzj_qz = jmzj_qz;
  }
  
  public String getTkzj_r() {
    return this.tkzj_r;
  }
  
  public void setTkzj_r(String tkzj_r) {
    this.tkzj_r = tkzj_r;
  }
  
  public String getTkzj_l() {
    return this.tkzj_l;
  }
  
  public void setTkzj_l(String tkzj_l) {
    this.tkzj_l = tkzj_l;
  }
  
  public String getTkzj_qz() {
    return this.tkzj_qz;
  }
  
  public void setTkzj_qz(String tkzj_qz) {
    this.tkzj_qz = tkzj_qz;
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
  
  public String getDnyg_qz() {
    return this.dnyg_qz;
  }
  
  public void setDnyg_qz(String dnyg_qz) {
    this.dnyg_qz = dnyg_qz;
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
  
  public String getKtjy_qz() {
    return this.ktjy_qz;
  }
  
  public void setKtjy_qz(String ktjy_qz) {
    this.ktjy_qz = ktjy_qz;
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
  
  public String getKtsp_qz() {
    return this.ktsp_qz;
  }
  
  public void setKtsp_qz(String ktsp_qz) {
    this.ktsp_qz = ktsp_qz;
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
  
  public String getXtjy_qz() {
    return this.xtjy_qz;
  }
  
  public void setXtjy_qz(String xtjy_qz) {
    this.xtjy_qz = xtjy_qz;
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
  
  public String getXtsp_qz() {
    return this.xtsp_qz;
  }
  
  public void setXtsp_qz(String xtsp_qz) {
    this.xtsp_qz = xtsp_qz;
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
  
  public String getZsxz_qz() {
    return this.zsxz_qz;
  }
  
  public void setZsxz_qz(String zsxz_qz) {
    this.zsxz_qz = zsxz_qz;
  }
  
  public String getJmdxt_r() {
    return this.jmdxt_r;
  }
  
  public void setJmdxt_r(String jmdxt_r) {
    this.jmdxt_r = jmdxt_r;
  }
  
  public String getJmdxt_l() {
    return this.jmdxt_l;
  }
  
  public void setJmdxt_l(String jmdxt_l) {
    this.jmdxt_l = jmdxt_l;
  }
  
  public String getJmdxt_qz() {
    return this.jmdxt_qz;
  }
  
  public void setJmdxt_qz(String jmdxt_qz) {
    this.jmdxt_qz = jmdxt_qz;
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
  
  public String getJmhd_qz() {
    return this.jmhd_qz;
  }
  
  public void setJmhd_qz(String jmhd_qz) {
    this.jmhd_qz = jmhd_qz;
  }
  
  public String getTss_r() {
    return this.tss_r;
  }
  
  public void setTss_r(String tss_r) {
    this.tss_r = tss_r;
  }
  
  public String getTss_l() {
    return this.tss_l;
  }
  
  public void setTss_l(String tss_l) {
    this.tss_l = tss_l;
  }
  
  public String getTss_qz() {
    return this.tss_qz;
  }
  
  public void setTss_qz(String tss_qz) {
    this.tss_qz = tss_qz;
  }
  
  public String getRhfw_r() {
    return this.rhfw_r;
  }
  
  public void setRhfw_r(String rhfw_r) {
    this.rhfw_r = rhfw_r;
  }
  
  public String getRhfw_l() {
    return this.rhfw_l;
  }
  
  public void setRhfw_l(String rhfw_l) {
    this.rhfw_l = rhfw_l;
  }
  
  public String getRhfw_qz() {
    return this.rhfw_qz;
  }
  
  public void setRhfw_qz(String rhfw_qz) {
    this.rhfw_qz = rhfw_qz;
  }
  
  public String getLts_r() {
    return this.lts_r;
  }
  
  public void setLts_r(String lts_r) {
    this.lts_r = lts_r;
  }
  
  public String getLts_l() {
    return this.lts_l;
  }
  
  public void setLts_l(String lts_l) {
    this.lts_l = lts_l;
  }
  
  public String getLts_qz() {
    return this.lts_qz;
  }
  
  public void setLts_qz(String lts_qz) {
    this.lts_qz = lts_qz;
  }
  
  public String getXbdjc_r() {
    return this.xbdjc_r;
  }
  
  public void setXbdjc_r(String xbdjc_r) {
    this.xbdjc_r = xbdjc_r;
  }
  
  public String getXbdjc_l() {
    return this.xbdjc_l;
  }
  
  public void setXbdjc_l(String xbdjc_l) {
    this.xbdjc_l = xbdjc_l;
  }
  
  public String getXbdjc_qz() {
    return this.xbdjc_qz;
  }
  
  public void setXbdjc_qz(String xbdjc_qz) {
    this.xbdjc_qz = xbdjc_qz;
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
  
  public String getZxad_qz() {
    return this.zxad_qz;
  }
  
  public void setZxad_qz(String zxad_qz) {
    this.zxad_qz = zxad_qz;
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
  
  public String getYzcd_qz() {
    return this.yzcd_qz;
  }
  
  public void setYzcd_qz(String yzcd_qz) {
    this.yzcd_qz = yzcd_qz;
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
  
  public String getPVEP_qz() {
    return this.PVEP_qz;
  }
  
  public void setPVEP_qz(String pVEP_qz) {
    this.PVEP_qz = pVEP_qz;
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
  
  public String getLxdzx_qz() {
    return this.lxdzx_qz;
  }
  
  public void setLxdzx_qz(String lxdzx_qz) {
    this.lxdzx_qz = lxdzx_qz;
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
  
  public String getNpjjc_qz() {
    return this.npjjc_qz;
  }
  
  public void setNpjjc_qz(String npjjc_qz) {
    this.npjjc_qz = npjjc_qz;
  }
  
  public String getShmzjl() {
    return this.shmzjl;
  }
  
  public void setShmzjl(String shmzjl) {
    this.shmzjl = shmzjl;
  }
  
  public Long getLc_id() {
    return this.lc_id;
  }
  
  public void setLc_id(Long lc_id) {
    this.lc_id = lc_id;
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
}
