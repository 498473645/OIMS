package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sg_qjd")
public class SgQjd {
  private Long id;
  
  private String glasses;
  
  private String glasses_money;
  
  private String slice;
  
  private String slice_money_r;
  
  private String slice_money_l;
  
  private String full_money;
  
  private String advance;
  
  private String debt;
  
  private String ygs;
  
  private String jcys;
  
  private String jsr;
  
  private Date pjrq;
  
  private Date qjrq;
  
  private String xq;
  
  private String yj;
  
  private String bmqd_y_r;
  
  private String sg_y_r;
  
  private String zd_y_r;
  
  private String zj_y_r;
  
  private String add_y_r;
  
  private String bmqd_y_l;
  
  private String sg_y_l;
  
  private String zd_y_l;
  
  private String zj_y_l;
  
  private String add_y_l;
  
  private String bmqd_j_r;
  
  private String sg_j_r;
  
  private String zd_j_r;
  
  private String zj_j_r;
  
  private String bmqd_j_l;
  
  private String sg_j_l;
  
  private String zd_j_l;
  
  private String zj_j_l;
  
  private String pd;
  
  private String bz;
  
  private String blh;
  
  private String bl_id;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sg_qjd_sequence")
  @SequenceGenerator(name = "sg_qjd_sequence", allocationSize = 1, initialValue = 1, sequenceName = "sg_qjd_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getGlasses() {
    return this.glasses;
  }
  
  public void setGlasses(String glasses) {
    this.glasses = glasses;
  }
  
  public String getGlasses_money() {
    return this.glasses_money;
  }
  
  public void setGlasses_money(String glasses_money) {
    this.glasses_money = glasses_money;
  }
  
  public String getSlice() {
    return this.slice;
  }
  
  public void setSlice(String slice) {
    this.slice = slice;
  }
  
  public String getSlice_money_r() {
    return this.slice_money_r;
  }
  
  public void setSlice_money_r(String slice_money_r) {
    this.slice_money_r = slice_money_r;
  }
  
  public String getSlice_money_l() {
    return this.slice_money_l;
  }
  
  public void setSlice_money_l(String slice_money_l) {
    this.slice_money_l = slice_money_l;
  }
  
  public String getFull_money() {
    return this.full_money;
  }
  
  public void setFull_money(String full_money) {
    this.full_money = full_money;
  }
  
  public String getAdvance() {
    return this.advance;
  }
  
  public void setAdvance(String advance) {
    this.advance = advance;
  }
  
  public String getDebt() {
    return this.debt;
  }
  
  public void setDebt(String debt) {
    this.debt = debt;
  }
  
  public String getYgs() {
    return this.ygs;
  }
  
  public void setYgs(String ygs) {
    this.ygs = ygs;
  }
  
  public String getJcys() {
    return this.jcys;
  }
  
  public void setJcys(String jcys) {
    this.jcys = jcys;
  }
  
  public String getJsr() {
    return this.jsr;
  }
  
  public void setJsr(String jsr) {
    this.jsr = jsr;
  }
  
  public Date getPjrq() {
    return this.pjrq;
  }
  
  public void setPjrq(Date pjrq) {
    this.pjrq = pjrq;
  }
  
  public Date getQjrq() {
    return this.qjrq;
  }
  
  public void setQjrq(Date qjrq) {
    this.qjrq = qjrq;
  }
  
  public String getXq() {
    return this.xq;
  }
  
  public void setXq(String xq) {
    this.xq = xq;
  }
  
  public String getYj() {
    return this.yj;
  }
  
  public void setYj(String yj) {
    this.yj = yj;
  }
  
  public String getBmqd_y_r() {
    return this.bmqd_y_r;
  }
  
  public void setBmqd_y_r(String bmqd_y_r) {
    this.bmqd_y_r = bmqd_y_r;
  }
  
  public String getSg_y_r() {
    return this.sg_y_r;
  }
  
  public void setSg_y_r(String sg_y_r) {
    this.sg_y_r = sg_y_r;
  }
  
  public String getZd_y_r() {
    return this.zd_y_r;
  }
  
  public void setZd_y_r(String zd_y_r) {
    this.zd_y_r = zd_y_r;
  }
  
  public String getZj_y_r() {
    return this.zj_y_r;
  }
  
  public void setZj_y_r(String zj_y_r) {
    this.zj_y_r = zj_y_r;
  }
  
  public String getAdd_y_r() {
    return this.add_y_r;
  }
  
  public void setAdd_y_r(String add_y_r) {
    this.add_y_r = add_y_r;
  }
  
  public String getBmqd_y_l() {
    return this.bmqd_y_l;
  }
  
  public void setBmqd_y_l(String bmqd_y_l) {
    this.bmqd_y_l = bmqd_y_l;
  }
  
  public String getSg_y_l() {
    return this.sg_y_l;
  }
  
  public void setSg_y_l(String sg_y_l) {
    this.sg_y_l = sg_y_l;
  }
  
  public String getZd_y_l() {
    return this.zd_y_l;
  }
  
  public void setZd_y_l(String zd_y_l) {
    this.zd_y_l = zd_y_l;
  }
  
  public String getZj_y_l() {
    return this.zj_y_l;
  }
  
  public void setZj_y_l(String zj_y_l) {
    this.zj_y_l = zj_y_l;
  }
  
  public String getAdd_y_l() {
    return this.add_y_l;
  }
  
  public void setAdd_y_l(String add_y_l) {
    this.add_y_l = add_y_l;
  }
  
  public String getBmqd_j_r() {
    return this.bmqd_j_r;
  }
  
  public void setBmqd_j_r(String bmqd_j_r) {
    this.bmqd_j_r = bmqd_j_r;
  }
  
  public String getSg_j_r() {
    return this.sg_j_r;
  }
  
  public void setSg_j_r(String sg_j_r) {
    this.sg_j_r = sg_j_r;
  }
  
  public String getZd_j_r() {
    return this.zd_j_r;
  }
  
  public void setZd_j_r(String zd_j_r) {
    this.zd_j_r = zd_j_r;
  }
  
  public String getZj_j_r() {
    return this.zj_j_r;
  }
  
  public void setZj_j_r(String zj_j_r) {
    this.zj_j_r = zj_j_r;
  }
  
  public String getBmqd_j_l() {
    return this.bmqd_j_l;
  }
  
  public void setBmqd_j_l(String bmqd_j_l) {
    this.bmqd_j_l = bmqd_j_l;
  }
  
  public String getSg_j_l() {
    return this.sg_j_l;
  }
  
  public void setSg_j_l(String sg_j_l) {
    this.sg_j_l = sg_j_l;
  }
  
  public String getZd_j_l() {
    return this.zd_j_l;
  }
  
  public void setZd_j_l(String zd_j_l) {
    this.zd_j_l = zd_j_l;
  }
  
  public String getZj_j_l() {
    return this.zj_j_l;
  }
  
  public void setZj_j_l(String zj_j_l) {
    this.zj_j_l = zj_j_l;
  }
  
  public String getPd() {
    return this.pd;
  }
  
  public void setPd(String pd) {
    this.pd = pd;
  }
  
  public String getBz() {
    return this.bz;
  }
  
  public void setBz(String bz) {
    this.bz = bz;
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
