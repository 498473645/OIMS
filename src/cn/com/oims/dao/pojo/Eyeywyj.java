package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "eyeywyj")
public class Eyeywyj {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyeywyj_sequence")
  @SequenceGenerator(name = "eyeywyj_sequence", sequenceName = "eyeywyj_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String ly_r_33;
  
  private String ly_r_5;
  
  private String ly_l_33;
  
  private String ly_l_5;
  
  private String dj_r_33;
  
  private String dj_r_5;
  
  private String dj_l_33;
  
  private String dj_l_5;
  
  private String zg_con;
  
  private String yq_con;
  
  private String sy_r_szj;
  
  private String sy_r_wzj;
  
  private String sy_r_xzj;
  
  private String sy_r_xxj;
  
  private String sy_r_lzj;
  
  private String sy_r_sxj;
  
  private String sy_l_szj;
  
  private String sy_l_wzj;
  
  private String sy_l_xzj;
  
  private String sy_l_xxj;
  
  private String sy_l_lzj;
  
  private String sy_l_sxj;
  
  private String seg_1;
  
  private String seg_2;
  
  private String seg_3;
  
  private String seg_4;
  
  private String seg_5;
  
  private String seg_6;
  
  private String seg_7;
  
  private String seg_8;
  
  private String seg_9;
  
  private String fzyd;
  
  private String a_v_xx;
  
  private String dctw;
  
  private String zsxz;
  
  private String jlsy;
  
  private String doctor;
  
  @Column(name = "cli_date")
  private String cliDate;
  
  @Column(name = "rep_doc")
  private String repDoc;
  
  @Column(name = "check_doc")
  private String checkDoc;
  
  public Long getFlowNo() {
    return this.flowNo;
  }
  
  public void setFlowNo(Long flowNo) {
    this.flowNo = flowNo;
  }
  
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public String getLy_r_33() {
    return this.ly_r_33;
  }
  
  public void setLy_r_33(String ly_r_33) {
    this.ly_r_33 = ly_r_33;
  }
  
  public String getLy_r_5() {
    return this.ly_r_5;
  }
  
  public void setLy_r_5(String ly_r_5) {
    this.ly_r_5 = ly_r_5;
  }
  
  public String getLy_l_33() {
    return this.ly_l_33;
  }
  
  public void setLy_l_33(String ly_l_33) {
    this.ly_l_33 = ly_l_33;
  }
  
  public String getLy_l_5() {
    return this.ly_l_5;
  }
  
  public void setLy_l_5(String ly_l_5) {
    this.ly_l_5 = ly_l_5;
  }
  
  public String getDj_r_33() {
    return this.dj_r_33;
  }
  
  public void setDj_r_33(String dj_r_33) {
    this.dj_r_33 = dj_r_33;
  }
  
  public String getDj_r_5() {
    return this.dj_r_5;
  }
  
  public void setDj_r_5(String dj_r_5) {
    this.dj_r_5 = dj_r_5;
  }
  
  public String getDj_l_33() {
    return this.dj_l_33;
  }
  
  public void setDj_l_33(String dj_l_33) {
    this.dj_l_33 = dj_l_33;
  }
  
  public String getDj_l_5() {
    return this.dj_l_5;
  }
  
  public void setDj_l_5(String dj_l_5) {
    this.dj_l_5 = dj_l_5;
  }
  
  public String getZg_con() {
    return this.zg_con;
  }
  
  public void setZg_con(String zg_con) {
    this.zg_con = zg_con;
  }
  
  public String getYq_con() {
    return this.yq_con;
  }
  
  public void setYq_con(String yq_con) {
    this.yq_con = yq_con;
  }
  
  public String getSy_r_szj() {
    return this.sy_r_szj;
  }
  
  public void setSy_r_szj(String sy_r_szj) {
    this.sy_r_szj = sy_r_szj;
  }
  
  public String getSy_r_wzj() {
    return this.sy_r_wzj;
  }
  
  public void setSy_r_wzj(String sy_r_wzj) {
    this.sy_r_wzj = sy_r_wzj;
  }
  
  public String getSy_r_xzj() {
    return this.sy_r_xzj;
  }
  
  public void setSy_r_xzj(String sy_r_xzj) {
    this.sy_r_xzj = sy_r_xzj;
  }
  
  public String getSy_r_xxj() {
    return this.sy_r_xxj;
  }
  
  public void setSy_r_xxj(String sy_r_xxj) {
    this.sy_r_xxj = sy_r_xxj;
  }
  
  public String getSy_r_lzj() {
    return this.sy_r_lzj;
  }
  
  public void setSy_r_lzj(String sy_r_lzj) {
    this.sy_r_lzj = sy_r_lzj;
  }
  
  public String getSy_r_sxj() {
    return this.sy_r_sxj;
  }
  
  public void setSy_r_sxj(String sy_r_sxj) {
    this.sy_r_sxj = sy_r_sxj;
  }
  
  public String getSy_l_szj() {
    return this.sy_l_szj;
  }
  
  public void setSy_l_szj(String sy_l_szj) {
    this.sy_l_szj = sy_l_szj;
  }
  
  public String getSy_l_wzj() {
    return this.sy_l_wzj;
  }
  
  public void setSy_l_wzj(String sy_l_wzj) {
    this.sy_l_wzj = sy_l_wzj;
  }
  
  public String getSy_l_xzj() {
    return this.sy_l_xzj;
  }
  
  public void setSy_l_xzj(String sy_l_xzj) {
    this.sy_l_xzj = sy_l_xzj;
  }
  
  public String getSy_l_xxj() {
    return this.sy_l_xxj;
  }
  
  public void setSy_l_xxj(String sy_l_xxj) {
    this.sy_l_xxj = sy_l_xxj;
  }
  
  public String getSy_l_lzj() {
    return this.sy_l_lzj;
  }
  
  public void setSy_l_lzj(String sy_l_lzj) {
    this.sy_l_lzj = sy_l_lzj;
  }
  
  public String getSy_l_sxj() {
    return this.sy_l_sxj;
  }
  
  public void setSy_l_sxj(String sy_l_sxj) {
    this.sy_l_sxj = sy_l_sxj;
  }
  
  public String getSeg_1() {
    return this.seg_1;
  }
  
  public void setSeg_1(String seg_1) {
    this.seg_1 = seg_1;
  }
  
  public String getSeg_2() {
    return this.seg_2;
  }
  
  public void setSeg_2(String seg_2) {
    this.seg_2 = seg_2;
  }
  
  public String getSeg_3() {
    return this.seg_3;
  }
  
  public void setSeg_3(String seg_3) {
    this.seg_3 = seg_3;
  }
  
  public String getSeg_4() {
    return this.seg_4;
  }
  
  public void setSeg_4(String seg_4) {
    this.seg_4 = seg_4;
  }
  
  public String getSeg_5() {
    return this.seg_5;
  }
  
  public void setSeg_5(String seg_5) {
    this.seg_5 = seg_5;
  }
  
  public String getSeg_6() {
    return this.seg_6;
  }
  
  public void setSeg_6(String seg_6) {
    this.seg_6 = seg_6;
  }
  
  public String getSeg_7() {
    return this.seg_7;
  }
  
  public void setSeg_7(String seg_7) {
    this.seg_7 = seg_7;
  }
  
  public String getSeg_8() {
    return this.seg_8;
  }
  
  public void setSeg_8(String seg_8) {
    this.seg_8 = seg_8;
  }
  
  public String getSeg_9() {
    return this.seg_9;
  }
  
  public void setSeg_9(String seg_9) {
    this.seg_9 = seg_9;
  }
  
  public String getFzyd() {
    return this.fzyd;
  }
  
  public void setFzyd(String fzyd) {
    this.fzyd = fzyd;
  }
  
  public String getA_v_xx() {
    return this.a_v_xx;
  }
  
  public void setA_v_xx(String a_v_xx) {
    this.a_v_xx = a_v_xx;
  }
  
  public String getDctw() {
    return this.dctw;
  }
  
  public void setDctw(String dctw) {
    this.dctw = dctw;
  }
  
  public String getZsxz() {
    return this.zsxz;
  }
  
  public void setZsxz(String zsxz) {
    this.zsxz = zsxz;
  }
  
  public String getJlsy() {
    return this.jlsy;
  }
  
  public void setJlsy(String jlsy) {
    this.jlsy = jlsy;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public String getCliDate() {
    return this.cliDate;
  }
  
  public void setCliDate(String cliDate) {
    this.cliDate = cliDate;
  }
  
  public String getRepDoc() {
    return this.repDoc;
  }
  
  public void setRepDoc(String repDoc) {
    this.repDoc = repDoc;
  }
  
  public String getCheckDoc() {
    return this.checkDoc;
  }
  
  public void setCheckDoc(String checkDoc) {
    this.checkDoc = checkDoc;
  }
}
