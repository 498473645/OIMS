package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qg_bl")
public class Qgbl {
  private Long id;
  
  private String bingliNumber;
  
  private Date czrq;
  
  private String blh;
  
  private String qgzs;
  
  private String qgjws;
  
  private String ywgms;
  
  private String jtjss;
  
  private Integer yb;
  
  private String ysl_r;
  
  private String jsl_r;
  
  private String ysl_l;
  
  private String jsl_l;
  
  private String tkzj_m_r;
  
  private String tkzj_a_r;
  
  private String tkzj_m_l;
  
  private String tkzj_a_l;
  
  private String jmzj_r;
  
  private String jmzj_l;
  
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
  
  private String pxl_H_r;
  
  private String pxl_V_r;
  
  private String pxl_H_l;
  
  private String pxl_V_l;
  
  private String dnyg_r1;
  
  private String dnyg_l1;
  
  private String dnyg_r2;
  
  private String dnyg_l2;
  
  private String dnyg_r3;
  
  private String dnyg_l3;
  
  private String stjy_r1;
  
  private String stjy_l1;
  
  private String stjy_r2;
  
  private String stjy_l2;
  
  private String stjy_r3;
  
  private String stjy_l3;
  
  private String stsp_r1;
  
  private String stsp_l1;
  
  private String stsp_r2;
  
  private String stsp_l2;
  
  private String stsp_r3;
  
  private String stsp_l3;
  
  private String stsp_r4;
  
  private String stsp_l4;
  
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
  
  private String jmhd_r;
  
  private String jmhd_l;
  
  private String qjjc_r;
  
  private String qjjc_l;
  
  private String ydjc_r;
  
  private String ydjc_l;
  
  private String clyj;
  
  private String wz_qz;
  
  private String sl_qz;
  
  private String tkzj_qz;
  
  private String jmzj_qz;
  
  private String yanya_qz;
  
  private String jmdxt_K1_qz;
  
  private String jmdxt_K2_qz;
  
  private String pxl_qz;
  
  private String dnyg_qz;
  
  private String stjy_qz;
  
  private String stsp_qz;
  
  private String xtjy_qz;
  
  private String xtsp_qz;
  
  private String jmhd_qz;
  
  private String qjjc_qz;
  
  private String ydjc_qz;
  
  private String clyj_qz;
  
  private String bz;
  
  private String bz_qz;
  
  private Date jzrq;
  
  private String ssfs;
  
  private String ssfy;
  
  private String qg_jcf;
  
  private Date ssf_rq;
  
  private Date jcf_rq;
  
  private String recorder;
  
  public String getRecorder() {
    return this.recorder;
  }
  
  public void setRecorder(String recorder) {
    this.recorder = recorder;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_bl_sequence")
  @SequenceGenerator(name = "qg_bl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_bl_sequence")
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
  
  public String getPxl_H_r() {
    return this.pxl_H_r;
  }
  
  public void setPxl_H_r(String pxl_H_r) {
    this.pxl_H_r = pxl_H_r;
  }
  
  public String getPxl_V_r() {
    return this.pxl_V_r;
  }
  
  public void setPxl_V_r(String pxl_V_r) {
    this.pxl_V_r = pxl_V_r;
  }
  
  public String getPxl_H_l() {
    return this.pxl_H_l;
  }
  
  public void setPxl_H_l(String pxl_H_l) {
    this.pxl_H_l = pxl_H_l;
  }
  
  public String getPxl_V_l() {
    return this.pxl_V_l;
  }
  
  public void setPxl_V_l(String pxl_V_l) {
    this.pxl_V_l = pxl_V_l;
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
  
  public String getStjy_r1() {
    return this.stjy_r1;
  }
  
  public void setStjy_r1(String stjy_r1) {
    this.stjy_r1 = stjy_r1;
  }
  
  public String getStjy_l1() {
    return this.stjy_l1;
  }
  
  public void setStjy_l1(String stjy_l1) {
    this.stjy_l1 = stjy_l1;
  }
  
  public String getStjy_r2() {
    return this.stjy_r2;
  }
  
  public void setStjy_r2(String stjy_r2) {
    this.stjy_r2 = stjy_r2;
  }
  
  public String getStjy_l2() {
    return this.stjy_l2;
  }
  
  public void setStjy_l2(String stjy_l2) {
    this.stjy_l2 = stjy_l2;
  }
  
  public String getStsp_r1() {
    return this.stsp_r1;
  }
  
  public void setStsp_r1(String stsp_r1) {
    this.stsp_r1 = stsp_r1;
  }
  
  public String getStsp_l1() {
    return this.stsp_l1;
  }
  
  public void setStsp_l1(String stsp_l1) {
    this.stsp_l1 = stsp_l1;
  }
  
  public String getStsp_r2() {
    return this.stsp_r2;
  }
  
  public void setStsp_r2(String stsp_r2) {
    this.stsp_r2 = stsp_r2;
  }
  
  public String getStsp_l2() {
    return this.stsp_l2;
  }
  
  public void setStsp_l2(String stsp_l2) {
    this.stsp_l2 = stsp_l2;
  }
  
  public String getStsp_r3() {
    return this.stsp_r3;
  }
  
  public void setStsp_r3(String stsp_r3) {
    this.stsp_r3 = stsp_r3;
  }
  
  public String getStsp_l3() {
    return this.stsp_l3;
  }
  
  public void setStsp_l3(String stsp_l3) {
    this.stsp_l3 = stsp_l3;
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
  
  public String getClyj() {
    return this.clyj;
  }
  
  public void setClyj(String clyj) {
    this.clyj = clyj;
  }
  
  public String getSl_qz() {
    return this.sl_qz;
  }
  
  public void setSl_qz(String sl_qz) {
    this.sl_qz = sl_qz;
  }
  
  public String getTkzj_qz() {
    return this.tkzj_qz;
  }
  
  public void setTkzj_qz(String tkzj_qz) {
    this.tkzj_qz = tkzj_qz;
  }
  
  public String getJmzj_qz() {
    return this.jmzj_qz;
  }
  
  public void setJmzj_qz(String jmzj_qz) {
    this.jmzj_qz = jmzj_qz;
  }
  
  public String getYanya_qz() {
    return this.yanya_qz;
  }
  
  public void setYanya_qz(String yanya_qz) {
    this.yanya_qz = yanya_qz;
  }
  
  public String getJmdxt_K1_qz() {
    return this.jmdxt_K1_qz;
  }
  
  public void setJmdxt_K1_qz(String jmdxt_K1_qz) {
    this.jmdxt_K1_qz = jmdxt_K1_qz;
  }
  
  public String getJmdxt_K2_qz() {
    return this.jmdxt_K2_qz;
  }
  
  public void setJmdxt_K2_qz(String jmdxt_K2_qz) {
    this.jmdxt_K2_qz = jmdxt_K2_qz;
  }
  
  public String getPxl_qz() {
    return this.pxl_qz;
  }
  
  public void setPxl_qz(String pxl_qz) {
    this.pxl_qz = pxl_qz;
  }
  
  public String getDnyg_qz() {
    return this.dnyg_qz;
  }
  
  public void setDnyg_qz(String dnyg_qz) {
    this.dnyg_qz = dnyg_qz;
  }
  
  public String getStjy_qz() {
    return this.stjy_qz;
  }
  
  public void setStjy_qz(String stjy_qz) {
    this.stjy_qz = stjy_qz;
  }
  
  public String getStsp_qz() {
    return this.stsp_qz;
  }
  
  public void setStsp_qz(String stsp_qz) {
    this.stsp_qz = stsp_qz;
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
  
  public String getJmhd_qz() {
    return this.jmhd_qz;
  }
  
  public void setJmhd_qz(String jmhd_qz) {
    this.jmhd_qz = jmhd_qz;
  }
  
  public String getQjjc_qz() {
    return this.qjjc_qz;
  }
  
  public void setQjjc_qz(String qjjc_qz) {
    this.qjjc_qz = qjjc_qz;
  }
  
  public String getYdjc_qz() {
    return this.ydjc_qz;
  }
  
  public void setYdjc_qz(String ydjc_qz) {
    this.ydjc_qz = ydjc_qz;
  }
  
  public String getClyj_qz() {
    return this.clyj_qz;
  }
  
  public void setClyj_qz(String clyj_qz) {
    this.clyj_qz = clyj_qz;
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
  
  public String getStjy_r3() {
    return this.stjy_r3;
  }
  
  public void setStjy_r3(String stjy_r3) {
    this.stjy_r3 = stjy_r3;
  }
  
  public String getStjy_l3() {
    return this.stjy_l3;
  }
  
  public void setStjy_l3(String stjy_l3) {
    this.stjy_l3 = stjy_l3;
  }
  
  public String getStsp_r4() {
    return this.stsp_r4;
  }
  
  public void setStsp_r4(String stsp_r4) {
    this.stsp_r4 = stsp_r4;
  }
  
  public String getStsp_l4() {
    return this.stsp_l4;
  }
  
  public void setStsp_l4(String stsp_l4) {
    this.stsp_l4 = stsp_l4;
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
