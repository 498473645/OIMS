package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qg_ssjl")
public class QgSsjl {
  private Long id;
  
  private String blh;
  
  private String ssfs_l;
  
  private String ssfs_r;
  
  private String jzds_l;
  
  private String jzds_r;
  
  private String jzds2_l;
  
  private String jzds2_r;
  
  private String jzds3_l;
  
  private String jzds3_r;
  
  private String dxtxzds_l;
  
  private String dxtxzds_r;
  
  private String dxtxzds2_l;
  
  private String dxtxzds2_r;
  
  private String dxtxzds3_l;
  
  private String dxtxzds3_r;
  
  private String gqzj_l;
  
  private String gqzj_r;
  
  private String ddjl_l;
  
  private String ddjl_r;
  
  private String dzhd_r;
  
  private String dzhd_l;
  
  private String mhd_r;
  
  private String mhd_l;
  
  private String tjhd_r;
  
  private String tjhd_l;
  
  private String syjzhd_r;
  
  private String syjzhd_l;
  
  private String kappa_x_l;
  
  private String kappa_y_l;
  
  private String kappa_x_r;
  
  private String kappa_y_r;
  
  private String mbqz_l;
  
  private String mbqz_r;
  
  private String qxsd_l;
  
  private String qxsd_r;
  
  private String syhd_l;
  
  private String syhd_r;
  
  private String ssys_l;
  
  private String ssys_r;
  
  private String ptjs_l;
  
  private String ptjs_r;
  
  private String pths_l;
  
  private String pths_r;
  
  private Date ssrq_l;
  
  private Date ssrq_r;
  
  private String ssjg_l;
  
  private String ssjg_r;
  
  private String bz;
  
  private Long lc_id;
  
  private String recorder;
  
  private String sendMsg_l;
  
  private String sendMsg_r;
  
  public String getDzhd_r() {
    return this.dzhd_r;
  }
  
  public void setDzhd_r(String dzhd_r) {
    this.dzhd_r = dzhd_r;
  }
  
  public String getDzhd_l() {
    return this.dzhd_l;
  }
  
  public void setDzhd_l(String dzhd_l) {
    this.dzhd_l = dzhd_l;
  }
  
  public String getMhd_r() {
    return this.mhd_r;
  }
  
  public void setMhd_r(String mhd_r) {
    this.mhd_r = mhd_r;
  }
  
  public String getMhd_l() {
    return this.mhd_l;
  }
  
  public void setMhd_l(String mhd_l) {
    this.mhd_l = mhd_l;
  }
  
  public String getTjhd_r() {
    return this.tjhd_r;
  }
  
  public void setTjhd_r(String tjhd_r) {
    this.tjhd_r = tjhd_r;
  }
  
  public String getTjhd_l() {
    return this.tjhd_l;
  }
  
  public void setTjhd_l(String tjhd_l) {
    this.tjhd_l = tjhd_l;
  }
  
  public String getSyjzhd_r() {
    return this.syjzhd_r;
  }
  
  public void setSyjzhd_r(String syjzhd_r) {
    this.syjzhd_r = syjzhd_r;
  }
  
  public String getSyjzhd_l() {
    return this.syjzhd_l;
  }
  
  public void setSyjzhd_l(String syjzhd_l) {
    this.syjzhd_l = syjzhd_l;
  }
  
  public String getSendMsg_l() {
    return this.sendMsg_l;
  }
  
  public void setSendMsg_l(String sendMsg_l) {
    this.sendMsg_l = sendMsg_l;
  }
  
  public String getSendMsg_r() {
    return this.sendMsg_r;
  }
  
  public void setSendMsg_r(String sendMsg_r) {
    this.sendMsg_r = sendMsg_r;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_ssjl_sequence")
  @SequenceGenerator(name = "qg_ssjl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg__ssjl_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getRecorder() {
    return this.recorder;
  }
  
  public void setRecorder(String recorder) {
    this.recorder = recorder;
  }
  
  public String getSsfs_l() {
    return this.ssfs_l;
  }
  
  public void setSsfs_l(String ssfs_l) {
    this.ssfs_l = ssfs_l;
  }
  
  public String getSsfs_r() {
    return this.ssfs_r;
  }
  
  public void setSsfs_r(String ssfs_r) {
    this.ssfs_r = ssfs_r;
  }
  
  public String getGqzj_l() {
    return this.gqzj_l;
  }
  
  public void setGqzj_l(String gqzj_l) {
    this.gqzj_l = gqzj_l;
  }
  
  public String getGqzj_r() {
    return this.gqzj_r;
  }
  
  public void setGqzj_r(String gqzj_r) {
    this.gqzj_r = gqzj_r;
  }
  
  public String getDdjl_l() {
    return this.ddjl_l;
  }
  
  public void setDdjl_l(String ddjl_l) {
    this.ddjl_l = ddjl_l;
  }
  
  public String getDdjl_r() {
    return this.ddjl_r;
  }
  
  public void setDdjl_r(String ddjl_r) {
    this.ddjl_r = ddjl_r;
  }
  
  public String getSsys_l() {
    return this.ssys_l;
  }
  
  public void setSsys_l(String ssys_l) {
    this.ssys_l = ssys_l;
  }
  
  public String getSsys_r() {
    return this.ssys_r;
  }
  
  public void setSsys_r(String ssys_r) {
    this.ssys_r = ssys_r;
  }
  
  public String getSsjg_l() {
    return this.ssjg_l;
  }
  
  public void setSsjg_l(String ssjg_l) {
    this.ssjg_l = ssjg_l;
  }
  
  public String getSsjg_r() {
    return this.ssjg_r;
  }
  
  public void setSsjg_r(String ssjg_r) {
    this.ssjg_r = ssjg_r;
  }
  
  public String getBlh() {
    return this.blh;
  }
  
  public void setBlh(String blh) {
    this.blh = blh;
  }
  
  public Date getSsrq_l() {
    return this.ssrq_l;
  }
  
  public void setSsrq_l(Date ssrq_l) {
    this.ssrq_l = ssrq_l;
  }
  
  public Date getSsrq_r() {
    return this.ssrq_r;
  }
  
  public void setSsrq_r(Date ssrq_r) {
    this.ssrq_r = ssrq_r;
  }
  
  public String getBz() {
    return this.bz;
  }
  
  public void setBz(String bz) {
    this.bz = bz;
  }
  
  public String getJzds_l() {
    return this.jzds_l;
  }
  
  public void setJzds_l(String jzds_l) {
    this.jzds_l = jzds_l;
  }
  
  public String getJzds_r() {
    return this.jzds_r;
  }
  
  public void setJzds_r(String jzds_r) {
    this.jzds_r = jzds_r;
  }
  
  public Long getLc_id() {
    return this.lc_id;
  }
  
  public void setLc_id(Long lc_id) {
    this.lc_id = lc_id;
  }
  
  public String getKappa_x_l() {
    return this.kappa_x_l;
  }
  
  public void setKappa_x_l(String kappa_x_l) {
    this.kappa_x_l = kappa_x_l;
  }
  
  public String getKappa_y_l() {
    return this.kappa_y_l;
  }
  
  public void setKappa_y_l(String kappa_y_l) {
    this.kappa_y_l = kappa_y_l;
  }
  
  public String getKappa_x_r() {
    return this.kappa_x_r;
  }
  
  public void setKappa_x_r(String kappa_x_r) {
    this.kappa_x_r = kappa_x_r;
  }
  
  public String getKappa_y_r() {
    return this.kappa_y_r;
  }
  
  public void setKappa_y_r(String kappa_y_r) {
    this.kappa_y_r = kappa_y_r;
  }
  
  public String getMbqz_l() {
    return this.mbqz_l;
  }
  
  public void setMbqz_l(String mbqz_l) {
    this.mbqz_l = mbqz_l;
  }
  
  public String getMbqz_r() {
    return this.mbqz_r;
  }
  
  public void setMbqz_r(String mbqz_r) {
    this.mbqz_r = mbqz_r;
  }
  
  public String getJzds2_l() {
    return this.jzds2_l;
  }
  
  public void setJzds2_l(String jzds2_l) {
    this.jzds2_l = jzds2_l;
  }
  
  public String getJzds2_r() {
    return this.jzds2_r;
  }
  
  public void setJzds2_r(String jzds2_r) {
    this.jzds2_r = jzds2_r;
  }
  
  public String getJzds3_l() {
    return this.jzds3_l;
  }
  
  public void setJzds3_l(String jzds3_l) {
    this.jzds3_l = jzds3_l;
  }
  
  public String getJzds3_r() {
    return this.jzds3_r;
  }
  
  public void setJzds3_r(String jzds3_r) {
    this.jzds3_r = jzds3_r;
  }
  
  public String getQxsd_l() {
    return this.qxsd_l;
  }
  
  public void setQxsd_l(String qxsd_l) {
    this.qxsd_l = qxsd_l;
  }
  
  public String getQxsd_r() {
    return this.qxsd_r;
  }
  
  public void setQxsd_r(String qxsd_r) {
    this.qxsd_r = qxsd_r;
  }
  
  public String getSyhd_l() {
    return this.syhd_l;
  }
  
  public void setSyhd_l(String syhd_l) {
    this.syhd_l = syhd_l;
  }
  
  public String getSyhd_r() {
    return this.syhd_r;
  }
  
  public void setSyhd_r(String syhd_r) {
    this.syhd_r = syhd_r;
  }
  
  public String getPtjs_l() {
    return this.ptjs_l;
  }
  
  public void setPtjs_l(String ptjs_l) {
    this.ptjs_l = ptjs_l;
  }
  
  public String getPtjs_r() {
    return this.ptjs_r;
  }
  
  public void setPtjs_r(String ptjs_r) {
    this.ptjs_r = ptjs_r;
  }
  
  public String getPths_l() {
    return this.pths_l;
  }
  
  public void setPths_l(String pths_l) {
    this.pths_l = pths_l;
  }
  
  public String getPths_r() {
    return this.pths_r;
  }
  
  public void setPths_r(String pths_r) {
    this.pths_r = pths_r;
  }
  
  public String getDxtxzds_l() {
    return this.dxtxzds_l;
  }
  
  public void setDxtxzds_l(String dxtxzds_l) {
    this.dxtxzds_l = dxtxzds_l;
  }
  
  public String getDxtxzds_r() {
    return this.dxtxzds_r;
  }
  
  public void setDxtxzds_r(String dxtxzds_r) {
    this.dxtxzds_r = dxtxzds_r;
  }
  
  public String getDxtxzds2_l() {
    return this.dxtxzds2_l;
  }
  
  public void setDxtxzds2_l(String dxtxzds2_l) {
    this.dxtxzds2_l = dxtxzds2_l;
  }
  
  public String getDxtxzds2_r() {
    return this.dxtxzds2_r;
  }
  
  public void setDxtxzds2_r(String dxtxzds2_r) {
    this.dxtxzds2_r = dxtxzds2_r;
  }
  
  public String getDxtxzds3_l() {
    return this.dxtxzds3_l;
  }
  
  public void setDxtxzds3_l(String dxtxzds3_l) {
    this.dxtxzds3_l = dxtxzds3_l;
  }
  
  public String getDxtxzds3_r() {
    return this.dxtxzds3_r;
  }
  
  public void setDxtxzds3_r(String dxtxzds3_r) {
    this.dxtxzds3_r = dxtxzds3_r;
  }
}
