package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class YuangGongDangAnForm {
  private String type;
  
  private Integer id;
  
  String gonghao;
  
  String jiBie;
  
  String name;
  
  String content;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  Date c_time;
  
  String filePath;
  
  String zhicheng_filePath;
  
  String sfzh_filePath;
  
  String chengWei;
  
  String workSpace;
  
  String phone;
  
  private String dyxl_name;
  
  private String dyxl_school;
  
  private String dyxl_job;
  
  private String zgxl_name;
  
  private String zgxl_school;
  
  private String zgxl_job;
  
  private String xw_name;
  
  private String xw_level_name;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date xw_level_Time;
  
  private String xw_ziGe_name;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date xw_ziGe_time;
  
  private String zwpj;
  
  private String detailType;
  
  private String project_name;
  
  private String classType;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date startTime;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date endTime;
  
  private String job;
  
  private String jobLocation;
  
  private String jobName;
  
  String money;
  
  String user_name;
  
  private String detailKind;
  
  private String other;
  
  String yuangong_name;
  
  String yuangong_sex;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  Date yuangong_birthday;
  
  String yuangong_title;
  
  String yuangong_mz;
  
  String yuangong_zzmm;
  
  String yuangong_jg;
  
  String yuangong_hy;
  
  String yuangong_sg;
  
  String yuangong_shenfenzheng;
  
  String yuangong_email;
  
  String yuanggong_phone;
  
  String yuangong_address;
  
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
  
  public String getYuangong_name() {
    return this.yuangong_name;
  }
  
  public void setYuangong_name(String yuangong_name) {
    this.yuangong_name = yuangong_name;
  }
  
  public String getYuangong_sex() {
    return this.yuangong_sex;
  }
  
  public void setYuangong_sex(String yuangong_sex) {
    this.yuangong_sex = yuangong_sex;
  }
  
  public String getYuangong_mz() {
    return this.yuangong_mz;
  }
  
  public void setYuangong_mz(String yuangong_mz) {
    this.yuangong_mz = yuangong_mz;
  }
  
  public String getYuangong_zzmm() {
    return this.yuangong_zzmm;
  }
  
  public void setYuangong_zzmm(String yuangong_zzmm) {
    this.yuangong_zzmm = yuangong_zzmm;
  }
  
  public String getYuangong_jg() {
    return this.yuangong_jg;
  }
  
  public void setYuangong_jg(String yuangong_jg) {
    this.yuangong_jg = yuangong_jg;
  }
  
  public String getYuangong_hy() {
    return this.yuangong_hy;
  }
  
  public void setYuangong_hy(String yuangong_hy) {
    this.yuangong_hy = yuangong_hy;
  }
  
  public String getYuangong_sg() {
    return this.yuangong_sg;
  }
  
  public void setYuangong_sg(String yuangong_sg) {
    this.yuangong_sg = yuangong_sg;
  }
  
  public String getYuangong_shenfenzheng() {
    return this.yuangong_shenfenzheng;
  }
  
  public void setYuangong_shenfenzheng(String yuangong_shenfenzheng) {
    this.yuangong_shenfenzheng = yuangong_shenfenzheng;
  }
  
  public String getYuangong_email() {
    return this.yuangong_email;
  }
  
  public void setYuangong_email(String yuangong_email) {
    this.yuangong_email = yuangong_email;
  }
  
  public String getYuanggong_phone() {
    return this.yuanggong_phone;
  }
  
  public void setYuanggong_phone(String yuanggong_phone) {
    this.yuanggong_phone = yuanggong_phone;
  }
  
  public String getYuangong_address() {
    return this.yuangong_address;
  }
  
  public void setYuangong_address(String yuangong_address) {
    this.yuangong_address = yuangong_address;
  }
  
  public String getDetailKind() {
    return this.detailKind;
  }
  
  public void setDetailKind(String detailKind) {
    this.detailKind = detailKind;
  }
  
  public String getOther() {
    return this.other;
  }
  
  public void setOther(String other) {
    this.other = other;
  }
  
  public String getMoney() {
    return this.money;
  }
  
  public void setMoney(String money) {
    this.money = money;
  }
  
  public String getUser_name() {
    return this.user_name;
  }
  
  public void setUser_name(String user_name) {
    this.user_name = user_name;
  }
  
  public String getJobLocation() {
    return this.jobLocation;
  }
  
  public void setJobLocation(String jobLocation) {
    this.jobLocation = jobLocation;
  }
  
  public String getJobName() {
    return this.jobName;
  }
  
  public void setJobName(String jobName) {
    this.jobName = jobName;
  }
  
  public Date getStartTime() {
    return this.startTime;
  }
  
  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }
  
  public Date getEndTime() {
    return this.endTime;
  }
  
  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }
  
  public String getJob() {
    return this.job;
  }
  
  public void setJob(String job) {
    this.job = job;
  }
  
  public String getDetailType() {
    return this.detailType;
  }
  
  public void setDetailType(String detailType) {
    this.detailType = detailType;
  }
  
  public String getProject_name() {
    return this.project_name;
  }
  
  public void setProject_name(String project_name) {
    this.project_name = project_name;
  }
  
  public String getClassType() {
    return this.classType;
  }
  
  public void setClassType(String classType) {
    this.classType = classType;
  }
  
  public String getDyxl_name() {
    return this.dyxl_name;
  }
  
  public void setDyxl_name(String dyxl_name) {
    this.dyxl_name = dyxl_name;
  }
  
  public String getDyxl_school() {
    return this.dyxl_school;
  }
  
  public void setDyxl_school(String dyxl_school) {
    this.dyxl_school = dyxl_school;
  }
  
  public String getDyxl_job() {
    return this.dyxl_job;
  }
  
  public void setDyxl_job(String dyxl_job) {
    this.dyxl_job = dyxl_job;
  }
  
  public String getZgxl_name() {
    return this.zgxl_name;
  }
  
  public void setZgxl_name(String zgxl_name) {
    this.zgxl_name = zgxl_name;
  }
  
  public String getZgxl_school() {
    return this.zgxl_school;
  }
  
  public void setZgxl_school(String zgxl_school) {
    this.zgxl_school = zgxl_school;
  }
  
  public String getZgxl_job() {
    return this.zgxl_job;
  }
  
  public void setZgxl_job(String zgxl_job) {
    this.zgxl_job = zgxl_job;
  }
  
  public String getXw_name() {
    return this.xw_name;
  }
  
  public void setXw_name(String xw_name) {
    this.xw_name = xw_name;
  }
  
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
  
  public String getZwpj() {
    return this.zwpj;
  }
  
  public void setZwpj(String zwpj) {
    this.zwpj = zwpj;
  }
  
  public String getChengWei() {
    return this.chengWei;
  }
  
  public void setChengWei(String chengWei) {
    this.chengWei = chengWei;
  }
  
  public String getWorkSpace() {
    return this.workSpace;
  }
  
  public void setWorkSpace(String workSpace) {
    this.workSpace = workSpace;
  }
  
  public String getPhone() {
    return this.phone;
  }
  
  public void setPhone(String phone) {
    this.phone = phone;
  }
  
  public String getType() {
    return this.type;
  }
  
  public void setType(String type) {
    this.type = type;
  }
  
  public Integer getId() {
    return this.id;
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
  
  public String getJiBie() {
    return this.jiBie;
  }
  
  public void setJiBie(String jiBie) {
    this.jiBie = jiBie;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getContent() {
    return this.content;
  }
  
  public void setContent(String content) {
    this.content = content;
  }
  
  public Date getC_time() {
    return this.c_time;
  }
  
  public void setC_time(Date c_time) {
    this.c_time = c_time;
  }
  
  public String getFilePath() {
    return this.filePath;
  }
  
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  
  public Date getYuangong_birthday() {
    return this.yuangong_birthday;
  }
  
  public void setYuangong_birthday(Date yuangong_birthday) {
    this.yuangong_birthday = yuangong_birthday;
  }
  
  public String getYuangong_title() {
    return this.yuangong_title;
  }
  
  public void setYuangong_title(String yuangong_title) {
    this.yuangong_title = yuangong_title;
  }
}
