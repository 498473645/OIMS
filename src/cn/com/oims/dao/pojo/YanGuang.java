package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "yanguang")
public class YanGuang {
  private Long id;
  
  private Long jcdid;
  
  private Long jiuzhenid;
  
  private String jcys;
  
  private Date jcsj;
  
  private Float refRS;
  
  private Float refRC;
  
  private Integer refRA;
  
  private Float refLS;
  
  private Float refLC;
  
  private Integer refLA;
  
  private Integer refPd;
  
  private Float krtRHd;
  
  private Float krtRHmm;
  
  private Integer krtRHa;
  
  private Float krtRVd;
  
  private Float krtRVmm;
  
  private Integer krtRVa;
  
  private Float krtRAved;
  
  private Float krtRAvemm;
  
  private Float krtRCylmm;
  
  private Integer krtRCyla;
  
  private Float krtLHd;
  
  private Float krtLHmm;
  
  private Integer krtLHa;
  
  private Float krtLVd;
  
  private Float krtLVmm;
  
  private Integer krtLVa;
  
  private Float krtLAved;
  
  private Float krtLAvemm;
  
  private Float krtLCylmm;
  
  private Integer krtLCyla;
  
  private Integer cjfs = Integer.valueOf(0);
  
  private Integer kxd_r;
  
  private Integer kxd_l;
  
  public Integer getCjfs() {
    return this.cjfs;
  }
  
  public void setCjfs(Integer cjfs) {
    this.cjfs = cjfs;
  }
  
  public Integer getKxd_r() {
    return this.kxd_r;
  }
  
  public void setKxd_r(Integer kxd_r) {
    this.kxd_r = kxd_r;
  }
  
  public Integer getKxd_l() {
    return this.kxd_l;
  }
  
  public void setKxd_l(Integer integer) {
    this.kxd_l = integer;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "yanguang_sequence")
  @SequenceGenerator(name = "yanguang_sequence", allocationSize = 1, initialValue = 1, sequenceName = "yanguang_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getJcdid() {
    return this.jcdid;
  }
  
  public void setJcdid(Long jcdid) {
    this.jcdid = jcdid;
  }
  
  public Long getJiuzhenid() {
    return this.jiuzhenid;
  }
  
  public void setJiuzhenid(Long jiuzhenid) {
    this.jiuzhenid = jiuzhenid;
  }
  
  public String getJcys() {
    return this.jcys;
  }
  
  public void setJcys(String jcys) {
    this.jcys = jcys;
  }
  
  public Date getJcsj() {
    return this.jcsj;
  }
  
  public void setJcsj(Date jcsj) {
    this.jcsj = jcsj;
  }
  
  @Column(name = "ref_r_s")
  public Float getRefRS() {
    return this.refRS;
  }
  
  public void setRefRS(Float refRS) {
    this.refRS = refRS;
  }
  
  @Column(name = "ref_r_c")
  public Float getRefRC() {
    return this.refRC;
  }
  
  public void setRefRC(Float refRC) {
    this.refRC = refRC;
  }
  
  @Column(name = "ref_r_a")
  public Integer getRefRA() {
    return this.refRA;
  }
  
  public void setRefRA(Integer refRA) {
    this.refRA = refRA;
  }
  
  @Column(name = "ref_l_s")
  public Float getRefLS() {
    return this.refLS;
  }
  
  public void setRefLS(Float refLS) {
    this.refLS = refLS;
  }
  
  @Column(name = "ref_l_c")
  public Float getRefLC() {
    return this.refLC;
  }
  
  public void setRefLC(Float refLC) {
    this.refLC = refLC;
  }
  
  @Column(name = "ref_l_a")
  public Integer getRefLA() {
    return this.refLA;
  }
  
  public void setRefLA(Integer refLA) {
    this.refLA = refLA;
  }
  
  @Column(name = "ref_pd")
  public Integer getRefPd() {
    return this.refPd;
  }
  
  public void setRefPd(Integer refPd) {
    this.refPd = refPd;
  }
  
  @Column(name = "krt_r_hd")
  public Float getKrtRHd() {
    return this.krtRHd;
  }
  
  public void setKrtRHd(Float krtRHd) {
    this.krtRHd = krtRHd;
  }
  
  @Column(name = "krt_r_hmm")
  public Float getKrtRHmm() {
    return this.krtRHmm;
  }
  
  public void setKrtRHmm(Float krtRHmm) {
    this.krtRHmm = krtRHmm;
  }
  
  @Column(name = "krt_r_ha")
  public Integer getKrtRHa() {
    return this.krtRHa;
  }
  
  public void setKrtRHa(Integer krtRHa) {
    this.krtRHa = krtRHa;
  }
  
  @Column(name = "krt_r_vd")
  public Float getKrtRVd() {
    return this.krtRVd;
  }
  
  public void setKrtRVd(Float krtRVd) {
    this.krtRVd = krtRVd;
  }
  
  @Column(name = "krt_r_vmm")
  public Float getKrtRVmm() {
    return this.krtRVmm;
  }
  
  public void setKrtRVmm(Float krtRVmm) {
    this.krtRVmm = krtRVmm;
  }
  
  @Column(name = "krt_r_va")
  public Integer getKrtRVa() {
    return this.krtRVa;
  }
  
  public void setKrtRVa(Integer krtRVa) {
    this.krtRVa = krtRVa;
  }
  
  @Column(name = "krt_r_aved")
  public Float getKrtRAved() {
    return this.krtRAved;
  }
  
  public void setKrtRAved(Float krtRAved) {
    this.krtRAved = krtRAved;
  }
  
  @Column(name = "krt_r_avemm")
  public Float getKrtRAvemm() {
    return this.krtRAvemm;
  }
  
  public void setKrtRAvemm(Float krtRAvemm) {
    this.krtRAvemm = krtRAvemm;
  }
  
  @Column(name = "krt_r_cylmm")
  public Float getKrtRCylmm() {
    return this.krtRCylmm;
  }
  
  public void setKrtRCylmm(Float krtRCylmm) {
    this.krtRCylmm = krtRCylmm;
  }
  
  @Column(name = "krt_r_cyla")
  public Integer getKrtRCyla() {
    return this.krtRCyla;
  }
  
  public void setKrtRCyla(Integer krtRCyla) {
    this.krtRCyla = krtRCyla;
  }
  
  @Column(name = "krt_l_hd")
  public Float getKrtLHd() {
    return this.krtLHd;
  }
  
  public void setKrtLHd(Float krtLHd) {
    this.krtLHd = krtLHd;
  }
  
  @Column(name = "krt_l_hmm")
  public Float getKrtLHmm() {
    return this.krtLHmm;
  }
  
  public void setKrtLHmm(Float krtLHmm) {
    this.krtLHmm = krtLHmm;
  }
  
  @Column(name = "krt_l_ha")
  public Integer getKrtLHa() {
    return this.krtLHa;
  }
  
  public void setKrtLHa(Integer krtLHa) {
    this.krtLHa = krtLHa;
  }
  
  @Column(name = "krt_l_vd")
  public Float getKrtLVd() {
    return this.krtLVd;
  }
  
  public void setKrtLVd(Float krtLVd) {
    this.krtLVd = krtLVd;
  }
  
  @Column(name = "krt_l_vmm")
  public Float getKrtLVmm() {
    return this.krtLVmm;
  }
  
  public void setKrtLVmm(Float krtLVmm) {
    this.krtLVmm = krtLVmm;
  }
  
  @Column(name = "krt_l_va")
  public Integer getKrtLVa() {
    return this.krtLVa;
  }
  
  public void setKrtLVa(Integer krtLVa) {
    this.krtLVa = krtLVa;
  }
  
  @Column(name = "krt_l_aved")
  public Float getKrtLAved() {
    return this.krtLAved;
  }
  
  public void setKrtLAved(Float krtLAved) {
    this.krtLAved = krtLAved;
  }
  
  @Column(name = "krt_l_avemm")
  public Float getKrtLAvemm() {
    return this.krtLAvemm;
  }
  
  public void setKrtLAvemm(Float krtLAvemm) {
    this.krtLAvemm = krtLAvemm;
  }
  
  @Column(name = "krt_l_cylmm")
  public Float getKrtLCylmm() {
    return this.krtLCylmm;
  }
  
  public void setKrtLCylmm(Float krtLCylmm) {
    this.krtLCylmm = krtLCylmm;
  }
  
  @Column(name = "krt_l_cyla")
  public Integer getKrtLCyla() {
    return this.krtLCyla;
  }
  
  public void setKrtLCyla(Integer krtLCyla) {
    this.krtLCyla = krtLCyla;
  }
}
