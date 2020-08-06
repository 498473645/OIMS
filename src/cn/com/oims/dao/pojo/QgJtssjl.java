package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "qg_jt_ssjl")
public class QgJtssjl {
  private Long id;
  
  private String kebie;
  
  private String blh;
  
  private String jkjy;
  
  private String yanbie;
  
  private String sg;
  
  private String tz;
  
  private String tw;
  
  private String mb;
  
  private String hx;
  
  private String xy;
  
  private String sczb;
  
  private String ldcx;
  
  private String bz;
  
  private String sqzb_qm;
  
  private String mzff;
  
  private String my;
  
  private String qt;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date kssj;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date jssj;
  
  private String ssmc;
  
  private String cj;
  
  private String xh;
  
  private String zdys;
  
  private String zsys;
  
  private String hs;
  
  private String ssjl_qm;
  
  private String ssjg1;
  
  private String ssjg31;
  
  private String ssjg32;
  
  private String ssjg33;
  
  private String ssjg41;
  
  private String ssjg42;
  
  private String ssjg43;
  
  private String ssjg44;
  
  private String ssjg5;
  
  private String ssjg6;
  
  private String ssjg62;
  
  private String ssjg_qm;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date ssrq;
  
  private Date czrq;
  
  private String jkjy_r;
  
  private String yanbie_r;
  
  private String sg_r;
  
  private String tz_r;
  
  private String tw_r;
  
  private String mb_r;
  
  private String hx_r;
  
  private String xy_r;
  
  private String sczb_r;
  
  private String ldcx_r;
  
  private String bz_r;
  
  private String sqzb_qm_r;
  
  private String mzff_r;
  
  private String my_r;
  
  private String qt_r;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date kssj_r;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date jssj_r;
  
  private String ssmc_r;
  
  private String cj_r;
  
  private String xh_r;
  
  private String zdys_r;
  
  private String zsys_r;
  
  private String hs_r;
  
  private String ssjl_qm_r;
  
  private String ssjg1_r;
  
  private String ssjg31_r;
  
  private String ssjg32_r;
  
  private String ssjg33_r;
  
  private String ssjg41_r;
  
  private String ssjg42_r;
  
  private String ssjg43_r;
  
  private String ssjg44_r;
  
  private String ssjg5_r;
  
  private String ssjg6_r;
  
  private String ssjg62_r;
  
  private String ssjg_qm_r;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private Date ssrq_r;
  
  private Date czrq_r;
  
  private Long lc_id;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_jtssjl_sequence")
  @SequenceGenerator(name = "qg_jtssjl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_jtssjl_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getKebie() {
    return this.kebie;
  }
  
  public void setKebie(String kebie) {
    this.kebie = kebie;
  }
  
  public String getBlh() {
    return this.blh;
  }
  
  public void setBlh(String blh) {
    this.blh = blh;
  }
  
  public String getJkjy() {
    return this.jkjy;
  }
  
  public void setJkjy(String jkjy) {
    this.jkjy = jkjy;
  }
  
  public String getYanbie() {
    return this.yanbie;
  }
  
  public void setYanbie(String yanbie) {
    this.yanbie = yanbie;
  }
  
  public String getSg() {
    return this.sg;
  }
  
  public void setSg(String sg) {
    this.sg = sg;
  }
  
  public String getTz() {
    return this.tz;
  }
  
  public void setTz(String tz) {
    this.tz = tz;
  }
  
  public String getTw() {
    return this.tw;
  }
  
  public void setTw(String tw) {
    this.tw = tw;
  }
  
  public String getMb() {
    return this.mb;
  }
  
  public void setMb(String mb) {
    this.mb = mb;
  }
  
  public String getHx() {
    return this.hx;
  }
  
  public void setHx(String hx) {
    this.hx = hx;
  }
  
  public String getXy() {
    return this.xy;
  }
  
  public void setXy(String xy) {
    this.xy = xy;
  }
  
  public String getSczb() {
    return this.sczb;
  }
  
  public void setSczb(String sczb) {
    this.sczb = sczb;
  }
  
  public String getLdcx() {
    return this.ldcx;
  }
  
  public void setLdcx(String ldcx) {
    this.ldcx = ldcx;
  }
  
  public String getBz() {
    return this.bz;
  }
  
  public void setBz(String bz) {
    this.bz = bz;
  }
  
  public String getSqzb_qm() {
    return this.sqzb_qm;
  }
  
  public void setSqzb_qm(String sqzb_qm) {
    this.sqzb_qm = sqzb_qm;
  }
  
  public String getMzff() {
    return this.mzff;
  }
  
  public void setMzff(String mzff) {
    this.mzff = mzff;
  }
  
  public String getMy() {
    return this.my;
  }
  
  public void setMy(String my) {
    this.my = my;
  }
  
  public String getQt() {
    return this.qt;
  }
  
  public void setQt(String qt) {
    this.qt = qt;
  }
  
  public Date getKssj() {
    return this.kssj;
  }
  
  public void setKssj(Date kssj) {
    this.kssj = kssj;
  }
  
  public Date getJssj() {
    return this.jssj;
  }
  
  public void setJssj(Date jssj) {
    this.jssj = jssj;
  }
  
  public String getSsmc() {
    return this.ssmc;
  }
  
  public void setSsmc(String ssmc) {
    this.ssmc = ssmc;
  }
  
  public String getCj() {
    return this.cj;
  }
  
  public void setCj(String cj) {
    this.cj = cj;
  }
  
  public String getXh() {
    return this.xh;
  }
  
  public void setXh(String xh) {
    this.xh = xh;
  }
  
  public String getZdys() {
    return this.zdys;
  }
  
  public void setZdys(String zdys) {
    this.zdys = zdys;
  }
  
  public String getZsys() {
    return this.zsys;
  }
  
  public void setZsys(String zsys) {
    this.zsys = zsys;
  }
  
  public String getHs() {
    return this.hs;
  }
  
  public void setHs(String hs) {
    this.hs = hs;
  }
  
  public String getSsjl_qm() {
    return this.ssjl_qm;
  }
  
  public void setSsjl_qm(String ssjl_qm) {
    this.ssjl_qm = ssjl_qm;
  }
  
  public String getSsjg1() {
    return this.ssjg1;
  }
  
  public void setSsjg1(String ssjg1) {
    this.ssjg1 = ssjg1;
  }
  
  public String getSsjg31() {
    return this.ssjg31;
  }
  
  public void setSsjg31(String ssjg31) {
    this.ssjg31 = ssjg31;
  }
  
  public String getSsjg32() {
    return this.ssjg32;
  }
  
  public void setSsjg32(String ssjg32) {
    this.ssjg32 = ssjg32;
  }
  
  public String getSsjg33() {
    return this.ssjg33;
  }
  
  public void setSsjg33(String ssjg33) {
    this.ssjg33 = ssjg33;
  }
  
  public String getSsjg41() {
    return this.ssjg41;
  }
  
  public void setSsjg41(String ssjg41) {
    this.ssjg41 = ssjg41;
  }
  
  public String getSsjg42() {
    return this.ssjg42;
  }
  
  public void setSsjg42(String ssjg42) {
    this.ssjg42 = ssjg42;
  }
  
  public String getSsjg43() {
    return this.ssjg43;
  }
  
  public void setSsjg43(String ssjg43) {
    this.ssjg43 = ssjg43;
  }
  
  public String getSsjg44() {
    return this.ssjg44;
  }
  
  public void setSsjg44(String ssjg44) {
    this.ssjg44 = ssjg44;
  }
  
  public String getSsjg5() {
    return this.ssjg5;
  }
  
  public void setSsjg5(String ssjg5) {
    this.ssjg5 = ssjg5;
  }
  
  public String getSsjg6() {
    return this.ssjg6;
  }
  
  public void setSsjg6(String ssjg6) {
    this.ssjg6 = ssjg6;
  }
  
  public String getSsjg62() {
    return this.ssjg62;
  }
  
  public void setSsjg62(String ssjg62) {
    this.ssjg62 = ssjg62;
  }
  
  public String getSsjg_qm() {
    return this.ssjg_qm;
  }
  
  public void setSsjg_qm(String ssjg_qm) {
    this.ssjg_qm = ssjg_qm;
  }
  
  public Date getSsrq() {
    return this.ssrq;
  }
  
  public void setSsrq(Date ssrq) {
    this.ssrq = ssrq;
  }
  
  public Date getCzrq() {
    return this.czrq;
  }
  
  public void setCzrq(Date czrq) {
    this.czrq = czrq;
  }
  
  public Long getLc_id() {
    return this.lc_id;
  }
  
  public void setLc_id(Long lc_id) {
    this.lc_id = lc_id;
  }
  
  public String getJkjy_r() {
    return this.jkjy_r;
  }
  
  public void setJkjy_r(String jkjy_r) {
    this.jkjy_r = jkjy_r;
  }
  
  public String getYanbie_r() {
    return this.yanbie_r;
  }
  
  public void setYanbie_r(String yanbie_r) {
    this.yanbie_r = yanbie_r;
  }
  
  public String getSg_r() {
    return this.sg_r;
  }
  
  public void setSg_r(String sg_r) {
    this.sg_r = sg_r;
  }
  
  public String getTz_r() {
    return this.tz_r;
  }
  
  public void setTz_r(String tz_r) {
    this.tz_r = tz_r;
  }
  
  public String getTw_r() {
    return this.tw_r;
  }
  
  public void setTw_r(String tw_r) {
    this.tw_r = tw_r;
  }
  
  public String getMb_r() {
    return this.mb_r;
  }
  
  public void setMb_r(String mb_r) {
    this.mb_r = mb_r;
  }
  
  public String getHx_r() {
    return this.hx_r;
  }
  
  public void setHx_r(String hx_r) {
    this.hx_r = hx_r;
  }
  
  public String getXy_r() {
    return this.xy_r;
  }
  
  public void setXy_r(String xy_r) {
    this.xy_r = xy_r;
  }
  
  public String getSczb_r() {
    return this.sczb_r;
  }
  
  public void setSczb_r(String sczb_r) {
    this.sczb_r = sczb_r;
  }
  
  public String getLdcx_r() {
    return this.ldcx_r;
  }
  
  public void setLdcx_r(String ldcx_r) {
    this.ldcx_r = ldcx_r;
  }
  
  public String getBz_r() {
    return this.bz_r;
  }
  
  public void setBz_r(String bz_r) {
    this.bz_r = bz_r;
  }
  
  public String getSqzb_qm_r() {
    return this.sqzb_qm_r;
  }
  
  public void setSqzb_qm_r(String sqzb_qm_r) {
    this.sqzb_qm_r = sqzb_qm_r;
  }
  
  public String getMzff_r() {
    return this.mzff_r;
  }
  
  public void setMzff_r(String mzff_r) {
    this.mzff_r = mzff_r;
  }
  
  public String getMy_r() {
    return this.my_r;
  }
  
  public void setMy_r(String my_r) {
    this.my_r = my_r;
  }
  
  public String getQt_r() {
    return this.qt_r;
  }
  
  public void setQt_r(String qt_r) {
    this.qt_r = qt_r;
  }
  
  public Date getKssj_r() {
    return this.kssj_r;
  }
  
  public void setKssj_r(Date kssj_r) {
    this.kssj_r = kssj_r;
  }
  
  public Date getJssj_r() {
    return this.jssj_r;
  }
  
  public void setJssj_r(Date jssj_r) {
    this.jssj_r = jssj_r;
  }
  
  public String getSsmc_r() {
    return this.ssmc_r;
  }
  
  public void setSsmc_r(String ssmc_r) {
    this.ssmc_r = ssmc_r;
  }
  
  public String getCj_r() {
    return this.cj_r;
  }
  
  public void setCj_r(String cj_r) {
    this.cj_r = cj_r;
  }
  
  public String getXh_r() {
    return this.xh_r;
  }
  
  public void setXh_r(String xh_r) {
    this.xh_r = xh_r;
  }
  
  public String getZdys_r() {
    return this.zdys_r;
  }
  
  public void setZdys_r(String zdys_r) {
    this.zdys_r = zdys_r;
  }
  
  public String getZsys_r() {
    return this.zsys_r;
  }
  
  public void setZsys_r(String zsys_r) {
    this.zsys_r = zsys_r;
  }
  
  public String getHs_r() {
    return this.hs_r;
  }
  
  public void setHs_r(String hs_r) {
    this.hs_r = hs_r;
  }
  
  public String getSsjl_qm_r() {
    return this.ssjl_qm_r;
  }
  
  public void setSsjl_qm_r(String ssjl_qm_r) {
    this.ssjl_qm_r = ssjl_qm_r;
  }
  
  public String getSsjg1_r() {
    return this.ssjg1_r;
  }
  
  public void setSsjg1_r(String ssjg1_r) {
    this.ssjg1_r = ssjg1_r;
  }
  
  public String getSsjg31_r() {
    return this.ssjg31_r;
  }
  
  public void setSsjg31_r(String ssjg31_r) {
    this.ssjg31_r = ssjg31_r;
  }
  
  public String getSsjg32_r() {
    return this.ssjg32_r;
  }
  
  public void setSsjg32_r(String ssjg32_r) {
    this.ssjg32_r = ssjg32_r;
  }
  
  public String getSsjg33_r() {
    return this.ssjg33_r;
  }
  
  public void setSsjg33_r(String ssjg33_r) {
    this.ssjg33_r = ssjg33_r;
  }
  
  public String getSsjg41_r() {
    return this.ssjg41_r;
  }
  
  public void setSsjg41_r(String ssjg41_r) {
    this.ssjg41_r = ssjg41_r;
  }
  
  public String getSsjg42_r() {
    return this.ssjg42_r;
  }
  
  public void setSsjg42_r(String ssjg42_r) {
    this.ssjg42_r = ssjg42_r;
  }
  
  public String getSsjg43_r() {
    return this.ssjg43_r;
  }
  
  public void setSsjg43_r(String ssjg43_r) {
    this.ssjg43_r = ssjg43_r;
  }
  
  public String getSsjg44_r() {
    return this.ssjg44_r;
  }
  
  public void setSsjg44_r(String ssjg44_r) {
    this.ssjg44_r = ssjg44_r;
  }
  
  public String getSsjg5_r() {
    return this.ssjg5_r;
  }
  
  public void setSsjg5_r(String ssjg5_r) {
    this.ssjg5_r = ssjg5_r;
  }
  
  public String getSsjg6_r() {
    return this.ssjg6_r;
  }
  
  public void setSsjg6_r(String ssjg6_r) {
    this.ssjg6_r = ssjg6_r;
  }
  
  public String getSsjg62_r() {
    return this.ssjg62_r;
  }
  
  public void setSsjg62_r(String ssjg62_r) {
    this.ssjg62_r = ssjg62_r;
  }
  
  public String getSsjg_qm_r() {
    return this.ssjg_qm_r;
  }
  
  public void setSsjg_qm_r(String ssjg_qm_r) {
    this.ssjg_qm_r = ssjg_qm_r;
  }
  
  public Date getSsrq_r() {
    return this.ssrq_r;
  }
  
  public void setSsrq_r(Date ssrq_r) {
    this.ssrq_r = ssrq_r;
  }
  
  public Date getCzrq_r() {
    return this.czrq_r;
  }
  
  public void setCzrq_r(Date czrq_r) {
    this.czrq_r = czrq_r;
  }
}
