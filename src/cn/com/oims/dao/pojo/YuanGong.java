package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "yuangong")
public class YuanGong implements Serializable {
  private static final long serialVersionUID = 398435238493807040L;
  
  private Integer id;
  
  private String gonghao;
  
  private Integer bumenId;
  
  private Integer bgsId;
  
  private String xingming;
  
  private String pinyin;
  
  private String zhiwu;
  
  private String title;
  
  private Date shengri;
  
  private String diqu;
  
  private String sfzh;
  
  private String dianhua;
  
  private String shouji;
  
  private String jtdz;
  
  private String email;
  
  private String jianjie;
  
  private String photo;
  
  private Integer xingbie;
  
  private String diseases;
  
  private String jcxmIds;
  
  private Integer category = Integer.valueOf(6001);
  
  private String xueli;
  
  private boolean leaveOffice;
  
  private Date leaveOfficeDate;
  
  private String dyxl_name;
  
  private String dyxl_school;
  
  private String dyxl_job;
  
  private String zgxl_name;
  
  private String zgxl_school;
  
  private String zgxl_job;
  
  private String xw_name;
  
  private String xw_level_name;
  
  private Date xw_level_Time;
  
  private String xw_ziGe_name;
  
  private Date xw_ziGe_time;
  
  private String zwpj;
  
  String yuangong_mz;
  
  String yuangong_zzmm;
  
  String yuangong_jg;
  
  String yuangong_hy;
  
  String yuangong_sg;
  
  String yuangong_address;
  
  Integer yuangong_zzmm_i;
  
  Integer yuangong_hy_i;
  
  @Column(length = 100)
  String dyxl_filePath;
  
  @Column(length = 100)
  String zgxl_filePath;
  
  @Column(length = 100)
  String xuewei_filePath;
  
  @Column(length = 100)
  String zhicheng_filePath;
  
  @Column(length = 100)
  String sfzh_filePath;
  
  public String getJcxmIds() {
    return this.jcxmIds;
  }
  
  public void setJcxmIds(String jcxmIds) {
    this.jcxmIds = jcxmIds;
  }
  
  public String getZhicheng_filePath() {
    return this.zhicheng_filePath;
  }
  
  public void setZhicheng_filePath(String zhicheng_filePath) {
    this.zhicheng_filePath = zhicheng_filePath;
  }
  
  public String getSfzh_filePath() {
    return this.sfzh_filePath;
  }
  
  public void setSfzh_filePath(String sfzh_filePath) {
    this.sfzh_filePath = sfzh_filePath;
  }
  
  public Integer getYuangong_zzmm_i() {
    return this.yuangong_zzmm_i;
  }
  
  public void setYuangong_zzmm_i(Integer yuangong_zzmm_i) {
    this.yuangong_zzmm_i = yuangong_zzmm_i;
  }
  
  public Integer getYuangong_hy_i() {
    return this.yuangong_hy_i;
  }
  
  public void setYuangong_hy_i(Integer yuangong_hy_i) {
    this.yuangong_hy_i = yuangong_hy_i;
  }
  
  public String getDyxl_filePath() {
    return this.dyxl_filePath;
  }
  
  public void setDyxl_filePath(String dyxl_filePath) {
    this.dyxl_filePath = dyxl_filePath;
  }
  
  public String getZgxl_filePath() {
    return this.zgxl_filePath;
  }
  
  public void setZgxl_filePath(String zgxl_filePath) {
    this.zgxl_filePath = zgxl_filePath;
  }
  
  public String getXuewei_filePath() {
    return this.xuewei_filePath;
  }
  
  public void setXuewei_filePath(String xuewei_filePath) {
    this.xuewei_filePath = xuewei_filePath;
  }
  
  @Column(length = 20)
  public String getYuangong_mz() {
    return this.yuangong_mz;
  }
  
  public void setYuangong_mz(String yuangong_mz) {
    this.yuangong_mz = yuangong_mz;
  }
  
  @Column(length = 20)
  public String getYuangong_zzmm() {
    return this.yuangong_zzmm;
  }
  
  public void setYuangong_zzmm(String yuangong_zzmm) {
    this.yuangong_zzmm = yuangong_zzmm;
  }
  
  @Column(length = 20)
  public String getYuangong_jg() {
    return this.yuangong_jg;
  }
  
  public void setYuangong_jg(String yuangong_jg) {
    this.yuangong_jg = yuangong_jg;
  }
  
  @Column(length = 20)
  public String getYuangong_hy() {
    return this.yuangong_hy;
  }
  
  public void setYuangong_hy(String yuangong_hy) {
    this.yuangong_hy = yuangong_hy;
  }
  
  @Column(length = 20)
  public String getYuangong_sg() {
    return this.yuangong_sg;
  }
  
  public void setYuangong_sg(String yuangong_sg) {
    this.yuangong_sg = yuangong_sg;
  }
  
  @Column(length = 20)
  public String getYuangong_address() {
    return this.yuangong_address;
  }
  
  public void setYuangong_address(String yuangong_address) {
    this.yuangong_address = yuangong_address;
  }
  
  @Column(length = 20)
  public String getDyxl_name() {
    return this.dyxl_name;
  }
  
  public void setDyxl_name(String dyxl_name) {
    this.dyxl_name = dyxl_name;
  }
  
  @Column(length = 20)
  public String getDyxl_school() {
    return this.dyxl_school;
  }
  
  public void setDyxl_school(String dyxl_school) {
    this.dyxl_school = dyxl_school;
  }
  
  @Column(length = 20)
  public String getDyxl_job() {
    return this.dyxl_job;
  }
  
  public void setDyxl_job(String dyxl_job) {
    this.dyxl_job = dyxl_job;
  }
  
  @Column(length = 20)
  public String getZgxl_name() {
    return this.zgxl_name;
  }
  
  public void setZgxl_name(String zgxl_name) {
    this.zgxl_name = zgxl_name;
  }
  
  @Column(length = 20)
  public String getZgxl_school() {
    return this.zgxl_school;
  }
  
  public void setZgxl_school(String zgxl_school) {
    this.zgxl_school = zgxl_school;
  }
  
  @Column(length = 20)
  public String getZgxl_job() {
    return this.zgxl_job;
  }
  
  public void setZgxl_job(String zgxl_job) {
    this.zgxl_job = zgxl_job;
  }
  
  @Column(length = 20)
  public String getXw_name() {
    return this.xw_name;
  }
  
  public void setXw_name(String xw_name) {
    this.xw_name = xw_name;
  }
  
  @Column(length = 20)
  public String getXw_level_name() {
    return this.xw_level_name;
  }
  
  public void setXw_level_name(String xw_level_name) {
    this.xw_level_name = xw_level_name;
  }
  
  public Date getXw_level_Time() {
    return this.xw_level_Time;
  }
  
  public void setXw_level_Time(Date xw_level_Time) {
    this.xw_level_Time = xw_level_Time;
  }
  
  @Column(length = 20)
  public String getXw_ziGe_name() {
    return this.xw_ziGe_name;
  }
  
  public void setXw_ziGe_name(String xw_ziGe_name) {
    this.xw_ziGe_name = xw_ziGe_name;
  }
  
  public Date getXw_ziGe_time() {
    return this.xw_ziGe_time;
  }
  
  public void setXw_ziGe_time(Date xw_ziGe_time) {
    this.xw_ziGe_time = xw_ziGe_time;
  }
  
  @Column(length = 1000)
  public String getZwpj() {
    return this.zwpj;
  }
  
  public void setZwpj(String zwpj) {
    this.zwpj = zwpj;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "yuangong_sequence")
  @SequenceGenerator(name = "yuangong_sequence", allocationSize = 1, initialValue = 1, sequenceName = "yuangong_sequence")
  public Integer getId() {
    return this.id;
  }
  
  @Column(name = "leave_office")
  public boolean isLeaveOffice() {
    return this.leaveOffice;
  }
  
  public void setLeaveOffice(boolean leaveOffice) {
    this.leaveOffice = leaveOffice;
  }
  
  @Column(name = "leave_office_date")
  public Date getLeaveOfficeDate() {
    return this.leaveOfficeDate;
  }
  
  public void setLeaveOfficeDate(Date leaveOfficeDate) {
    this.leaveOfficeDate = leaveOfficeDate;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  @Column(name = "bumen_id")
  public Integer getBumenId() {
    return this.bumenId;
  }
  
  public void setBumenId(Integer bumenId) {
    this.bumenId = bumenId;
  }
  
  @Column(name = "bgs_id")
  public Integer getBgsId() {
    return this.bgsId;
  }
  
  public void setBgsId(Integer bgsId) {
    this.bgsId = bgsId;
  }
  
  public String getXingming() {
    return this.xingming;
  }
  
  public void setXingming(String xingming) {
    this.xingming = xingming;
  }
  
  public String getPinyin() {
    return this.pinyin;
  }
  
  public void setPinyin(String pinyin) {
    this.pinyin = pinyin;
  }
  
  public String getZhiwu() {
    return this.zhiwu;
  }
  
  public void setZhiwu(String zhiwu) {
    this.zhiwu = zhiwu;
  }
  
  public Date getShengri() {
    return this.shengri;
  }
  
  public void setShengri(Date shengri) {
    this.shengri = shengri;
  }
  
  public String getDiqu() {
    return this.diqu;
  }
  
  public void setDiqu(String diqu) {
    this.diqu = diqu;
  }
  
  public String getSfzh() {
    return this.sfzh;
  }
  
  public void setSfzh(String sfzh) {
    this.sfzh = sfzh;
  }
  
  public String getDianhua() {
    return this.dianhua;
  }
  
  public void setDianhua(String dianhua) {
    this.dianhua = dianhua;
  }
  
  public String getShouji() {
    return this.shouji;
  }
  
  public void setShouji(String shouji) {
    this.shouji = shouji;
  }
  
  public String getJtdz() {
    return this.jtdz;
  }
  
  public void setJtdz(String jtdz) {
    this.jtdz = jtdz;
  }
  
  public String getEmail() {
    return this.email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public String getJianjie() {
    return this.jianjie;
  }
  
  public void setJianjie(String jianjie) {
    this.jianjie = jianjie;
  }
  
  public String getPhoto() {
    return this.photo;
  }
  
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  
  public Integer getXingbie() {
    return this.xingbie;
  }
  
  public void setXingbie(Integer xingbie) {
    this.xingbie = xingbie;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
  
  public String getXueli() {
    return this.xueli;
  }
  
  public void setXueli(String xueli) {
    this.xueli = xueli;
  }
  
  public String getDiseases() {
    return this.diseases;
  }
  
  public void setDiseases(String diseases) {
    this.diseases = diseases;
  }
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
}
