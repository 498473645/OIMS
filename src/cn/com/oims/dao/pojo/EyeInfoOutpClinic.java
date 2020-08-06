package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "eye_info_oupt_clinic")
public class EyeInfoOutpClinic implements Serializable {
  private static final long serialVersionUID = 3892949653388799187L;
  
  @Id
  private String flow_no;
  
  private String patient_id;
  
  private String cli_date;
  
  private String patient_his_present;
  
  private String patient_xbs;
  
  private String patient_his_jwst;
  
  private String eye_jc_r_sl;
  
  private String eye_jc_l_sl;
  
  private String eye_jc_r_gdw;
  
  private String eye_jc_l_gdw;
  
  private String eye_jc_r_sj;
  
  private String eye_jc_l_sj;
  
  private String eye_jc_r_yjqk;
  
  private String eye_jc_l_yjqk;
  
  private String eye_jc_r_jianl;
  
  private String eye_jc_l_jianl;
  
  private String eye_jc_r_lq;
  
  private String eye_jc_l_lq;
  
  private String eye_jc_r_yq;
  
  private String eye_jc_l_yq;
  
  private String eye_jc_r_zp;
  
  private String eye_jc_l_zp;
  
  private String eye_jc_r_jiem;
  
  private String eye_jc_l_jiem;
  
  private String eye_jc_r_jiaom;
  
  private String eye_jc_l_jiaom;
  
  private String eye_jc_r_gm;
  
  private String eye_jc_l_gm;
  
  private String eye_jc_r_qf;
  
  private String eye_jc_l_qf;
  
  private String eye_jc_r_hm;
  
  private String eye_jc_l_hm;
  
  private String eye_jc_r_tk;
  
  private String eye_jc_l_tk;
  
  private String eye_jc_r_jt;
  
  private String eye_jc_l_jt;
  
  private String eye_jc_r_blt;
  
  private String eye_jc_l_blt;
  
  private String eye_jc_r_swm;
  
  private String eye_jc_l_swm;
  
  private String first_diagn;
  
  private String final_diag;
  
  private String doc_name;
  
  private String clinic_room;
  
  private String treatment_info;
  
  private Integer patient_age;
  
  private String visit_no;
  
  private Date visit_date;
  
  public String getFlow_no() {
    return this.flow_no;
  }
  
  public void setFlow_no(String flow_no) {
    this.flow_no = flow_no;
  }
  
  public String getPatient_id() {
    return this.patient_id;
  }
  
  public void setPatient_id(String patient_id) {
    this.patient_id = patient_id;
  }
  
  public String getCli_date() {
    return this.cli_date;
  }
  
  public void setCli_date(String cli_date) {
    this.cli_date = cli_date;
  }
  
  public String getPatient_his_present() {
    return this.patient_his_present;
  }
  
  public void setPatient_his_present(String patient_his_present) {
    this.patient_his_present = patient_his_present;
  }
  
  public String getPatient_xbs() {
    return this.patient_xbs;
  }
  
  public void setPatient_xbs(String patient_xbs) {
    this.patient_xbs = patient_xbs;
  }
  
  public String getPatient_his_jwst() {
    return this.patient_his_jwst;
  }
  
  public void setPatient_his_jwst(String patient_his_jwst) {
    this.patient_his_jwst = patient_his_jwst;
  }
  
  public String getEye_jc_r_sl() {
    return this.eye_jc_r_sl;
  }
  
  public void setEye_jc_r_sl(String eye_jc_r_sl) {
    this.eye_jc_r_sl = eye_jc_r_sl;
  }
  
  public String getEye_jc_l_sl() {
    return this.eye_jc_l_sl;
  }
  
  public void setEye_jc_l_sl(String eye_jc_l_sl) {
    this.eye_jc_l_sl = eye_jc_l_sl;
  }
  
  public String getEye_jc_r_gdw() {
    return this.eye_jc_r_gdw;
  }
  
  public void setEye_jc_r_gdw(String eye_jc_r_gdw) {
    this.eye_jc_r_gdw = eye_jc_r_gdw;
  }
  
  public String getEye_jc_l_gdw() {
    return this.eye_jc_l_gdw;
  }
  
  public void setEye_jc_l_gdw(String eye_jc_l_gdw) {
    this.eye_jc_l_gdw = eye_jc_l_gdw;
  }
  
  public String getEye_jc_r_sj() {
    return this.eye_jc_r_sj;
  }
  
  public void setEye_jc_r_sj(String eye_jc_r_sj) {
    this.eye_jc_r_sj = eye_jc_r_sj;
  }
  
  public String getEye_jc_l_sj() {
    return this.eye_jc_l_sj;
  }
  
  public void setEye_jc_l_sj(String eye_jc_l_sj) {
    this.eye_jc_l_sj = eye_jc_l_sj;
  }
  
  public String getEye_jc_r_yjqk() {
    return this.eye_jc_r_yjqk;
  }
  
  public void setEye_jc_r_yjqk(String eye_jc_r_yjqk) {
    this.eye_jc_r_yjqk = eye_jc_r_yjqk;
  }
  
  public String getEye_jc_l_yjqk() {
    return this.eye_jc_l_yjqk;
  }
  
  public void setEye_jc_l_yjqk(String eye_jc_l_yjqk) {
    this.eye_jc_l_yjqk = eye_jc_l_yjqk;
  }
  
  public String getEye_jc_r_jianl() {
    return this.eye_jc_r_jianl;
  }
  
  public void setEye_jc_r_jianl(String eye_jc_r_jianl) {
    this.eye_jc_r_jianl = eye_jc_r_jianl;
  }
  
  public String getEye_jc_l_jianl() {
    return this.eye_jc_l_jianl;
  }
  
  public void setEye_jc_l_jianl(String eye_jc_l_jianl) {
    this.eye_jc_l_jianl = eye_jc_l_jianl;
  }
  
  public String getEye_jc_r_lq() {
    return this.eye_jc_r_lq;
  }
  
  public void setEye_jc_r_lq(String eye_jc_r_lq) {
    this.eye_jc_r_lq = eye_jc_r_lq;
  }
  
  public String getEye_jc_l_lq() {
    return this.eye_jc_l_lq;
  }
  
  public void setEye_jc_l_lq(String eye_jc_l_lq) {
    this.eye_jc_l_lq = eye_jc_l_lq;
  }
  
  public String getEye_jc_r_yq() {
    return this.eye_jc_r_yq;
  }
  
  public void setEye_jc_r_yq(String eye_jc_r_yq) {
    this.eye_jc_r_yq = eye_jc_r_yq;
  }
  
  public String getEye_jc_l_yq() {
    return this.eye_jc_l_yq;
  }
  
  public void setEye_jc_l_yq(String eye_jc_l_yq) {
    this.eye_jc_l_yq = eye_jc_l_yq;
  }
  
  public String getEye_jc_r_zp() {
    return this.eye_jc_r_zp;
  }
  
  public void setEye_jc_r_zp(String eye_jc_r_zp) {
    this.eye_jc_r_zp = eye_jc_r_zp;
  }
  
  public String getEye_jc_l_zp() {
    return this.eye_jc_l_zp;
  }
  
  public void setEye_jc_l_zp(String eye_jc_l_zp) {
    this.eye_jc_l_zp = eye_jc_l_zp;
  }
  
  public String getEye_jc_r_jiem() {
    return this.eye_jc_r_jiem;
  }
  
  public void setEye_jc_r_jiem(String eye_jc_r_jiem) {
    this.eye_jc_r_jiem = eye_jc_r_jiem;
  }
  
  public String getEye_jc_l_jiem() {
    return this.eye_jc_l_jiem;
  }
  
  public void setEye_jc_l_jiem(String eye_jc_l_jiem) {
    this.eye_jc_l_jiem = eye_jc_l_jiem;
  }
  
  public String getEye_jc_r_jiaom() {
    return this.eye_jc_r_jiaom;
  }
  
  public void setEye_jc_r_jiaom(String eye_jc_r_jiaom) {
    this.eye_jc_r_jiaom = eye_jc_r_jiaom;
  }
  
  public String getEye_jc_l_jiaom() {
    return this.eye_jc_l_jiaom;
  }
  
  public void setEye_jc_l_jiaom(String eye_jc_l_jiaom) {
    this.eye_jc_l_jiaom = eye_jc_l_jiaom;
  }
  
  public String getEye_jc_r_gm() {
    return this.eye_jc_r_gm;
  }
  
  public void setEye_jc_r_gm(String eye_jc_r_gm) {
    this.eye_jc_r_gm = eye_jc_r_gm;
  }
  
  public String getEye_jc_l_gm() {
    return this.eye_jc_l_gm;
  }
  
  public void setEye_jc_l_gm(String eye_jc_l_gm) {
    this.eye_jc_l_gm = eye_jc_l_gm;
  }
  
  public String getEye_jc_r_qf() {
    return this.eye_jc_r_qf;
  }
  
  public void setEye_jc_r_qf(String eye_jc_r_qf) {
    this.eye_jc_r_qf = eye_jc_r_qf;
  }
  
  public String getEye_jc_l_qf() {
    return this.eye_jc_l_qf;
  }
  
  public void setEye_jc_l_qf(String eye_jc_l_qf) {
    this.eye_jc_l_qf = eye_jc_l_qf;
  }
  
  public String getEye_jc_r_hm() {
    return this.eye_jc_r_hm;
  }
  
  public void setEye_jc_r_hm(String eye_jc_r_hm) {
    this.eye_jc_r_hm = eye_jc_r_hm;
  }
  
  public String getEye_jc_l_hm() {
    return this.eye_jc_l_hm;
  }
  
  public void setEye_jc_l_hm(String eye_jc_l_hm) {
    this.eye_jc_l_hm = eye_jc_l_hm;
  }
  
  public String getEye_jc_r_tk() {
    return this.eye_jc_r_tk;
  }
  
  public void setEye_jc_r_tk(String eye_jc_r_tk) {
    this.eye_jc_r_tk = eye_jc_r_tk;
  }
  
  public String getEye_jc_l_tk() {
    return this.eye_jc_l_tk;
  }
  
  public void setEye_jc_l_tk(String eye_jc_l_tk) {
    this.eye_jc_l_tk = eye_jc_l_tk;
  }
  
  public String getEye_jc_r_jt() {
    return this.eye_jc_r_jt;
  }
  
  public void setEye_jc_r_jt(String eye_jc_r_jt) {
    this.eye_jc_r_jt = eye_jc_r_jt;
  }
  
  public String getEye_jc_l_jt() {
    return this.eye_jc_l_jt;
  }
  
  public void setEye_jc_l_jt(String eye_jc_l_jt) {
    this.eye_jc_l_jt = eye_jc_l_jt;
  }
  
  public String getEye_jc_r_blt() {
    return this.eye_jc_r_blt;
  }
  
  public void setEye_jc_r_blt(String eye_jc_r_blt) {
    this.eye_jc_r_blt = eye_jc_r_blt;
  }
  
  public String getEye_jc_l_blt() {
    return this.eye_jc_l_blt;
  }
  
  public void setEye_jc_l_blt(String eye_jc_l_blt) {
    this.eye_jc_l_blt = eye_jc_l_blt;
  }
  
  public String getEye_jc_r_swm() {
    return this.eye_jc_r_swm;
  }
  
  public void setEye_jc_r_swm(String eye_jc_r_swm) {
    this.eye_jc_r_swm = eye_jc_r_swm;
  }
  
  public String getEye_jc_l_swm() {
    return this.eye_jc_l_swm;
  }
  
  public void setEye_jc_l_swm(String eye_jc_l_swm) {
    this.eye_jc_l_swm = eye_jc_l_swm;
  }
  
  public String getFirst_diagn() {
    return this.first_diagn;
  }
  
  public void setFirst_diagn(String first_diagn) {
    this.first_diagn = first_diagn;
  }
  
  public String getFinal_diag() {
    return this.final_diag;
  }
  
  public void setFinal_diag(String final_diag) {
    this.final_diag = final_diag;
  }
  
  public String getDoc_name() {
    return this.doc_name;
  }
  
  public void setDoc_name(String doc_name) {
    this.doc_name = doc_name;
  }
  
  public String getClinic_room() {
    return this.clinic_room;
  }
  
  public void setClinic_room(String clinic_room) {
    this.clinic_room = clinic_room;
  }
  
  public String getTreatment_info() {
    return this.treatment_info;
  }
  
  public void setTreatment_info(String treatment_info) {
    this.treatment_info = treatment_info;
  }
  
  public Integer getPatient_age() {
    return this.patient_age;
  }
  
  public void setPatient_age(Integer patient_age) {
    this.patient_age = patient_age;
  }
  
  public String getVisit_no() {
    return this.visit_no;
  }
  
  public void setVisit_no(String visit_no) {
    this.visit_no = visit_no;
  }
  
  public Date getVisit_date() {
    return this.visit_date;
  }
  
  public void setVisit_date(Date visit_date) {
    this.visit_date = visit_date;
  }
}
