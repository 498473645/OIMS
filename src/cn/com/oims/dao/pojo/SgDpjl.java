package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sg_dpjl")
public class SgDpjl {
  private Long id;
  
  private Date dprq;
  
  private String dp_ddh;
  
  private String jpxh;
  
  private String dpcs_fk_r;
  
  private String dpcs_rp_r;
  
  private String dpcs_zj_r;
  
  private String dpcs_ys_r;
  
  private String dpcs_fk_l;
  
  private String dpcs_rp_l;
  
  private String dpcs_zj_l;
  
  private String dpcs_ys_l;
  
  private String yp_ddh;
  
  private String xingming;
  
  private Date sprq;
  
  private Date yprq;
  
  private String bmhh_r;
  
  private String byqs_r;
  
  private String bmhh_l;
  
  private String byqs_l;
  
  private String djsl_r;
  
  private String wz_r;
  
  private String hdd_r;
  
  private String djsl_l;
  
  private String wz_l;
  
  private String hdd_l;
  
  private String jl;
  
  private Date jprq;
  
  private String jpr;
  
  private String spr;
  
  private String btn1;
  
  private String btn2;
  
  private String btn3;
  
  private String btn4;
  
  private String btn5;
  
  private String btn6;
  
  private String btn7;
  
  private String btn8;
  
  private String btn9;
  
  private String btn10;
  
  private String blh;
  
  private String bl_id;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sg_dpjl_sequence")
  @SequenceGenerator(name = "sg_dpjl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "sg_dpjl_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getDprq() {
    return this.dprq;
  }
  
  public void setDprq(Date dprq) {
    this.dprq = dprq;
  }
  
  public String getDp_ddh() {
    return this.dp_ddh;
  }
  
  public void setDp_ddh(String dp_ddh) {
    this.dp_ddh = dp_ddh;
  }
  
  public String getJpxh() {
    return this.jpxh;
  }
  
  public void setJpxh(String jpxh) {
    this.jpxh = jpxh;
  }
  
  public String getDpcs_fk_r() {
    return this.dpcs_fk_r;
  }
  
  public void setDpcs_fk_r(String dpcs_fk_r) {
    this.dpcs_fk_r = dpcs_fk_r;
  }
  
  public String getDpcs_rp_r() {
    return this.dpcs_rp_r;
  }
  
  public void setDpcs_rp_r(String dpcs_rp_r) {
    this.dpcs_rp_r = dpcs_rp_r;
  }
  
  public String getDpcs_zj_r() {
    return this.dpcs_zj_r;
  }
  
  public void setDpcs_zj_r(String dpcs_zj_r) {
    this.dpcs_zj_r = dpcs_zj_r;
  }
  
  public String getDpcs_ys_r() {
    return this.dpcs_ys_r;
  }
  
  public void setDpcs_ys_r(String dpcs_ys_r) {
    this.dpcs_ys_r = dpcs_ys_r;
  }
  
  public String getDpcs_fk_l() {
    return this.dpcs_fk_l;
  }
  
  public void setDpcs_fk_l(String dpcs_fk_l) {
    this.dpcs_fk_l = dpcs_fk_l;
  }
  
  public String getDpcs_rp_l() {
    return this.dpcs_rp_l;
  }
  
  public void setDpcs_rp_l(String dpcs_rp_l) {
    this.dpcs_rp_l = dpcs_rp_l;
  }
  
  public String getDpcs_zj_l() {
    return this.dpcs_zj_l;
  }
  
  public void setDpcs_zj_l(String dpcs_zj_l) {
    this.dpcs_zj_l = dpcs_zj_l;
  }
  
  public String getDpcs_ys_l() {
    return this.dpcs_ys_l;
  }
  
  public void setDpcs_ys_l(String dpcs_ys_l) {
    this.dpcs_ys_l = dpcs_ys_l;
  }
  
  public String getYp_ddh() {
    return this.yp_ddh;
  }
  
  public void setYp_ddh(String yp_ddh) {
    this.yp_ddh = yp_ddh;
  }
  
  public String getXingming() {
    return this.xingming;
  }
  
  public void setXingming(String xingming) {
    this.xingming = xingming;
  }
  
  public Date getSprq() {
    return this.sprq;
  }
  
  public void setSprq(Date sprq) {
    this.sprq = sprq;
  }
  
  public Date getYprq() {
    return this.yprq;
  }
  
  public void setYprq(Date yprq) {
    this.yprq = yprq;
  }
  
  public String getBmhh_r() {
    return this.bmhh_r;
  }
  
  public void setBmhh_r(String bmhh_r) {
    this.bmhh_r = bmhh_r;
  }
  
  public String getByqs_r() {
    return this.byqs_r;
  }
  
  public void setByqs_r(String byqs_r) {
    this.byqs_r = byqs_r;
  }
  
  public String getBmhh_l() {
    return this.bmhh_l;
  }
  
  public void setBmhh_l(String bmhh_l) {
    this.bmhh_l = bmhh_l;
  }
  
  public String getByqs_l() {
    return this.byqs_l;
  }
  
  public void setByqs_l(String byqs_l) {
    this.byqs_l = byqs_l;
  }
  
  public String getDjsl_r() {
    return this.djsl_r;
  }
  
  public void setDjsl_r(String djsl_r) {
    this.djsl_r = djsl_r;
  }
  
  public String getWz_r() {
    return this.wz_r;
  }
  
  public void setWz_r(String wz_r) {
    this.wz_r = wz_r;
  }
  
  public String getHdd_r() {
    return this.hdd_r;
  }
  
  public void setHdd_r(String hdd_r) {
    this.hdd_r = hdd_r;
  }
  
  public String getDjsl_l() {
    return this.djsl_l;
  }
  
  public void setDjsl_l(String djsl_l) {
    this.djsl_l = djsl_l;
  }
  
  public String getWz_l() {
    return this.wz_l;
  }
  
  public void setWz_l(String wz_l) {
    this.wz_l = wz_l;
  }
  
  public String getHdd_l() {
    return this.hdd_l;
  }
  
  public void setHdd_l(String hdd_l) {
    this.hdd_l = hdd_l;
  }
  
  public String getJl() {
    return this.jl;
  }
  
  public void setJl(String jl) {
    this.jl = jl;
  }
  
  public Date getJprq() {
    return this.jprq;
  }
  
  public void setJprq(Date jprq) {
    this.jprq = jprq;
  }
  
  public String getJpr() {
    return this.jpr;
  }
  
  public void setJpr(String jpr) {
    this.jpr = jpr;
  }
  
  public String getSpr() {
    return this.spr;
  }
  
  public void setSpr(String spr) {
    this.spr = spr;
  }
  
  public String getBtn1() {
    return this.btn1;
  }
  
  public void setBtn1(String btn1) {
    this.btn1 = btn1;
  }
  
  public String getBtn2() {
    return this.btn2;
  }
  
  public void setBtn2(String btn2) {
    this.btn2 = btn2;
  }
  
  public String getBtn3() {
    return this.btn3;
  }
  
  public void setBtn3(String btn3) {
    this.btn3 = btn3;
  }
  
  public String getBtn4() {
    return this.btn4;
  }
  
  public void setBtn4(String btn4) {
    this.btn4 = btn4;
  }
  
  public String getBtn5() {
    return this.btn5;
  }
  
  public void setBtn5(String btn5) {
    this.btn5 = btn5;
  }
  
  public String getBtn6() {
    return this.btn6;
  }
  
  public void setBtn6(String btn6) {
    this.btn6 = btn6;
  }
  
  public String getBtn7() {
    return this.btn7;
  }
  
  public void setBtn7(String btn7) {
    this.btn7 = btn7;
  }
  
  public String getBtn8() {
    return this.btn8;
  }
  
  public void setBtn8(String btn8) {
    this.btn8 = btn8;
  }
  
  public String getBtn9() {
    return this.btn9;
  }
  
  public void setBtn9(String btn9) {
    this.btn9 = btn9;
  }
  
  public String getBtn10() {
    return this.btn10;
  }
  
  public void setBtn10(String btn10) {
    this.btn10 = btn10;
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
