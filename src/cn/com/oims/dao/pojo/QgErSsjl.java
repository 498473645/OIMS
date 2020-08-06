package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qg_er_ssjl")
public class QgErSsjl {
  private Long id;
  
  private String blh;
  
  private String zlfs_r;
  
  private String zlfs_l;
  
  private String mzfs_r;
  
  private String mzfs_l;
  
  private String jzds_r;
  
  private String jzds_l;
  
  private String zyd_r;
  
  private String zyd_l;
  
  private String zyd2_r;
  
  private String zyd2_l;
  
  private String gqzj_r;
  
  private String gqzj_l;
  
  private String ddjl_r;
  
  private String ddjl_l;
  
  private String MASK_r;
  
  private String MASK_l;
  
  private String ssys_r;
  
  private String ssys_l;
  
  private Date ssrq_r;
  
  private Date ssrq_l;
  
  private Date czrq;
  
  private String bz;
  
  private Long lc_id;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_erssjl_sequence")
  @SequenceGenerator(name = "qg_erssjl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_erssjl_sequence")
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
  
  public String getZlfs_r() {
    return this.zlfs_r;
  }
  
  public void setZlfs_r(String zlfs_r) {
    this.zlfs_r = zlfs_r;
  }
  
  public String getZlfs_l() {
    return this.zlfs_l;
  }
  
  public void setZlfs_l(String zlfs_l) {
    this.zlfs_l = zlfs_l;
  }
  
  public String getJzds_r() {
    return this.jzds_r;
  }
  
  public void setJzds_r(String jzds_r) {
    this.jzds_r = jzds_r;
  }
  
  public String getJzds_l() {
    return this.jzds_l;
  }
  
  public void setJzds_l(String jzds_l) {
    this.jzds_l = jzds_l;
  }
  
  public String getZyd_r() {
    return this.zyd_r;
  }
  
  public void setZyd_r(String zyd_r) {
    this.zyd_r = zyd_r;
  }
  
  public String getZyd_l() {
    return this.zyd_l;
  }
  
  public void setZyd_l(String zyd_l) {
    this.zyd_l = zyd_l;
  }
  
  public String getGqzj_r() {
    return this.gqzj_r;
  }
  
  public void setGqzj_r(String gqzj_r) {
    this.gqzj_r = gqzj_r;
  }
  
  public String getGqzj_l() {
    return this.gqzj_l;
  }
  
  public void setGqzj_l(String gqzj_l) {
    this.gqzj_l = gqzj_l;
  }
  
  public String getDdjl_r() {
    return this.ddjl_r;
  }
  
  public void setDdjl_r(String ddjl_r) {
    this.ddjl_r = ddjl_r;
  }
  
  public String getDdjl_l() {
    return this.ddjl_l;
  }
  
  public void setDdjl_l(String ddjl_l) {
    this.ddjl_l = ddjl_l;
  }
  
  public String getMASK_r() {
    return this.MASK_r;
  }
  
  public void setMASK_r(String mASK_r) {
    this.MASK_r = mASK_r;
  }
  
  public String getMASK_l() {
    return this.MASK_l;
  }
  
  public void setMASK_l(String mASK_l) {
    this.MASK_l = mASK_l;
  }
  
  public String getSsys_r() {
    return this.ssys_r;
  }
  
  public void setSsys_r(String ssys_r) {
    this.ssys_r = ssys_r;
  }
  
  public String getSsys_l() {
    return this.ssys_l;
  }
  
  public void setSsys_l(String ssys_l) {
    this.ssys_l = ssys_l;
  }
  
  public Date getSsrq_r() {
    return this.ssrq_r;
  }
  
  public void setSsrq_r(Date ssrq_r) {
    this.ssrq_r = ssrq_r;
  }
  
  public Date getSsrq_l() {
    return this.ssrq_l;
  }
  
  public void setSsrq_l(Date ssrq_l) {
    this.ssrq_l = ssrq_l;
  }
  
  public Date getCzrq() {
    return this.czrq;
  }
  
  public void setCzrq(Date czrq) {
    this.czrq = czrq;
  }
  
  public String getMzfs_r() {
    return this.mzfs_r;
  }
  
  public void setMzfs_r(String mzfs_r) {
    this.mzfs_r = mzfs_r;
  }
  
  public String getMzfs_l() {
    return this.mzfs_l;
  }
  
  public void setMzfs_l(String mzfs_l) {
    this.mzfs_l = mzfs_l;
  }
  
  public String getBz() {
    return this.bz;
  }
  
  public void setBz(String bz) {
    this.bz = bz;
  }
  
  public Long getLc_id() {
    return this.lc_id;
  }
  
  public void setLc_id(Long lc_id) {
    this.lc_id = lc_id;
  }
  
  public String getZyd2_r() {
    return this.zyd2_r;
  }
  
  public void setZyd2_r(String zyd2_r) {
    this.zyd2_r = zyd2_r;
  }
  
  public String getZyd2_l() {
    return this.zyd2_l;
  }
  
  public void setZyd2_l(String zyd2_l) {
    this.zyd2_l = zyd2_l;
  }
}
