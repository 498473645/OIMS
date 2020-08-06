package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "eyexsjc")
public class Eyexsjc {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyexsjc_sequence")
  @SequenceGenerator(name = "eyexsjc_sequence", sequenceName = "eyexsjc_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String bi_5cm;
  
  private String bi_40cm;
  
  private String tjfd_sy;
  
  private String tjfd_yy;
  
  private String tjfd_zy;
  
  private String fxd1_sy;
  
  private String fxd1_yy;
  
  private String fxd1_zy;
  
  private String fxd2_sy;
  
  private String fxd2_yy;
  
  private String fxd2_zy;
  
  private String tjzh_1;
  
  private String tjzh_2;
  
  private String tjzh_3;
  
  private String tjzh_4;
  
  private String tjzh_5;
  
  private String tjzh_6;
  
  private String tjzh_7;
  
  private String tjzh_8;
  
  private String tjzh_9;
  
  private String npc_1;
  
  private String npc_4;
  
  private String npc_7;
  
  private String npc_10;
  
  private String npc_2;
  
  private String npc_5;
  
  private String npc_8;
  
  private String npc_11;
  
  private String npc_3;
  
  private String npc_6;
  
  private String npc_9;
  
  private String npc_12;
  
  private String zmd_b1_5m;
  
  private String zmd_b0_5m;
  
  private String czfcl_5m;
  
  private String zmd_b1_40m;
  
  private String zmd_b0_40m;
  
  private String czfcl_40m;
  
  private String hfd_b1_5m;
  
  private String hfd_bo_5m;
  
  private String bc_1;
  
  private String hfd_b1_40m;
  
  private String hfd_bo_40m;
  
  private String bc_2;
  
  private String bc_3;
  
  private String bc_4;
  
  private String bc_5;
  
  private String bc_6;
  
  private String bc_7;
  
  private String bc_8;
  
  private String aca;
  
  private String diag;
  
  private String demo;
  
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
  
  public String getBi_5cm() {
    return this.bi_5cm;
  }
  
  public void setBi_5cm(String bi_5cm) {
    this.bi_5cm = bi_5cm;
  }
  
  public String getBi_40cm() {
    return this.bi_40cm;
  }
  
  public void setBi_40cm(String bi_40cm) {
    this.bi_40cm = bi_40cm;
  }
  
  public String getTjfd_sy() {
    return this.tjfd_sy;
  }
  
  public void setTjfd_sy(String tjfd_sy) {
    this.tjfd_sy = tjfd_sy;
  }
  
  public String getTjfd_yy() {
    return this.tjfd_yy;
  }
  
  public void setTjfd_yy(String tjfd_yy) {
    this.tjfd_yy = tjfd_yy;
  }
  
  public String getTjfd_zy() {
    return this.tjfd_zy;
  }
  
  public void setTjfd_zy(String tjfd_zy) {
    this.tjfd_zy = tjfd_zy;
  }
  
  public String getFxd1_sy() {
    return this.fxd1_sy;
  }
  
  public void setFxd1_sy(String fxd1_sy) {
    this.fxd1_sy = fxd1_sy;
  }
  
  public String getFxd1_yy() {
    return this.fxd1_yy;
  }
  
  public void setFxd1_yy(String fxd1_yy) {
    this.fxd1_yy = fxd1_yy;
  }
  
  public String getFxd1_zy() {
    return this.fxd1_zy;
  }
  
  public void setFxd1_zy(String fxd1_zy) {
    this.fxd1_zy = fxd1_zy;
  }
  
  public String getFxd2_sy() {
    return this.fxd2_sy;
  }
  
  public void setFxd2_sy(String fxd2_sy) {
    this.fxd2_sy = fxd2_sy;
  }
  
  public String getFxd2_yy() {
    return this.fxd2_yy;
  }
  
  public void setFxd2_yy(String fxd2_yy) {
    this.fxd2_yy = fxd2_yy;
  }
  
  public String getFxd2_zy() {
    return this.fxd2_zy;
  }
  
  public void setFxd2_zy(String fxd2_zy) {
    this.fxd2_zy = fxd2_zy;
  }
  
  public String getTjzh_1() {
    return this.tjzh_1;
  }
  
  public void setTjzh_1(String tjzh_1) {
    this.tjzh_1 = tjzh_1;
  }
  
  public String getTjzh_2() {
    return this.tjzh_2;
  }
  
  public void setTjzh_2(String tjzh_2) {
    this.tjzh_2 = tjzh_2;
  }
  
  public String getTjzh_3() {
    return this.tjzh_3;
  }
  
  public void setTjzh_3(String tjzh_3) {
    this.tjzh_3 = tjzh_3;
  }
  
  public String getTjzh_4() {
    return this.tjzh_4;
  }
  
  public void setTjzh_4(String tjzh_4) {
    this.tjzh_4 = tjzh_4;
  }
  
  public String getTjzh_5() {
    return this.tjzh_5;
  }
  
  public void setTjzh_5(String tjzh_5) {
    this.tjzh_5 = tjzh_5;
  }
  
  public String getTjzh_6() {
    return this.tjzh_6;
  }
  
  public void setTjzh_6(String tjzh_6) {
    this.tjzh_6 = tjzh_6;
  }
  
  public String getTjzh_7() {
    return this.tjzh_7;
  }
  
  public void setTjzh_7(String tjzh_7) {
    this.tjzh_7 = tjzh_7;
  }
  
  public String getTjzh_8() {
    return this.tjzh_8;
  }
  
  public void setTjzh_8(String tjzh_8) {
    this.tjzh_8 = tjzh_8;
  }
  
  public String getTjzh_9() {
    return this.tjzh_9;
  }
  
  public void setTjzh_9(String tjzh_9) {
    this.tjzh_9 = tjzh_9;
  }
  
  public String getNpc_1() {
    return this.npc_1;
  }
  
  public void setNpc_1(String npc_1) {
    this.npc_1 = npc_1;
  }
  
  public String getNpc_4() {
    return this.npc_4;
  }
  
  public void setNpc_4(String npc_4) {
    this.npc_4 = npc_4;
  }
  
  public String getNpc_7() {
    return this.npc_7;
  }
  
  public void setNpc_7(String npc_7) {
    this.npc_7 = npc_7;
  }
  
  public String getNpc_10() {
    return this.npc_10;
  }
  
  public void setNpc_10(String npc_10) {
    this.npc_10 = npc_10;
  }
  
  public String getNpc_2() {
    return this.npc_2;
  }
  
  public void setNpc_2(String npc_2) {
    this.npc_2 = npc_2;
  }
  
  public String getNpc_5() {
    return this.npc_5;
  }
  
  public void setNpc_5(String npc_5) {
    this.npc_5 = npc_5;
  }
  
  public String getNpc_8() {
    return this.npc_8;
  }
  
  public void setNpc_8(String npc_8) {
    this.npc_8 = npc_8;
  }
  
  public String getNpc_11() {
    return this.npc_11;
  }
  
  public void setNpc_11(String npc_11) {
    this.npc_11 = npc_11;
  }
  
  public String getNpc_3() {
    return this.npc_3;
  }
  
  public void setNpc_3(String npc_3) {
    this.npc_3 = npc_3;
  }
  
  public String getNpc_6() {
    return this.npc_6;
  }
  
  public void setNpc_6(String npc_6) {
    this.npc_6 = npc_6;
  }
  
  public String getNpc_9() {
    return this.npc_9;
  }
  
  public void setNpc_9(String npc_9) {
    this.npc_9 = npc_9;
  }
  
  public String getNpc_12() {
    return this.npc_12;
  }
  
  public void setNpc_12(String npc_12) {
    this.npc_12 = npc_12;
  }
  
  public String getZmd_b1_5m() {
    return this.zmd_b1_5m;
  }
  
  public void setZmd_b1_5m(String zmd_b1_5m) {
    this.zmd_b1_5m = zmd_b1_5m;
  }
  
  public String getZmd_b0_5m() {
    return this.zmd_b0_5m;
  }
  
  public void setZmd_b0_5m(String zmd_b0_5m) {
    this.zmd_b0_5m = zmd_b0_5m;
  }
  
  public String getCzfcl_5m() {
    return this.czfcl_5m;
  }
  
  public void setCzfcl_5m(String czfcl_5m) {
    this.czfcl_5m = czfcl_5m;
  }
  
  public String getZmd_b1_40m() {
    return this.zmd_b1_40m;
  }
  
  public void setZmd_b1_40m(String zmd_b1_40m) {
    this.zmd_b1_40m = zmd_b1_40m;
  }
  
  public String getZmd_b0_40m() {
    return this.zmd_b0_40m;
  }
  
  public void setZmd_b0_40m(String zmd_b0_40m) {
    this.zmd_b0_40m = zmd_b0_40m;
  }
  
  public String getCzfcl_40m() {
    return this.czfcl_40m;
  }
  
  public void setCzfcl_40m(String czfcl_40m) {
    this.czfcl_40m = czfcl_40m;
  }
  
  public String getHfd_b1_5m() {
    return this.hfd_b1_5m;
  }
  
  public void setHfd_b1_5m(String hfd_b1_5m) {
    this.hfd_b1_5m = hfd_b1_5m;
  }
  
  public String getHfd_bo_5m() {
    return this.hfd_bo_5m;
  }
  
  public void setHfd_bo_5m(String hfd_bo_5m) {
    this.hfd_bo_5m = hfd_bo_5m;
  }
  
  public String getBc_1() {
    return this.bc_1;
  }
  
  public void setBc_1(String bc_1) {
    this.bc_1 = bc_1;
  }
  
  public String getHfd_b1_40m() {
    return this.hfd_b1_40m;
  }
  
  public void setHfd_b1_40m(String hfd_b1_40m) {
    this.hfd_b1_40m = hfd_b1_40m;
  }
  
  public String getHfd_bo_40m() {
    return this.hfd_bo_40m;
  }
  
  public void setHfd_bo_40m(String hfd_bo_40m) {
    this.hfd_bo_40m = hfd_bo_40m;
  }
  
  public String getBc_2() {
    return this.bc_2;
  }
  
  public void setBc_2(String bc_2) {
    this.bc_2 = bc_2;
  }
  
  public String getBc_3() {
    return this.bc_3;
  }
  
  public void setBc_3(String bc_3) {
    this.bc_3 = bc_3;
  }
  
  public String getBc_4() {
    return this.bc_4;
  }
  
  public void setBc_4(String bc_4) {
    this.bc_4 = bc_4;
  }
  
  public String getBc_5() {
    return this.bc_5;
  }
  
  public void setBc_5(String bc_5) {
    this.bc_5 = bc_5;
  }
  
  public String getBc_6() {
    return this.bc_6;
  }
  
  public void setBc_6(String bc_6) {
    this.bc_6 = bc_6;
  }
  
  public String getBc_7() {
    return this.bc_7;
  }
  
  public void setBc_7(String bc_7) {
    this.bc_7 = bc_7;
  }
  
  public String getBc_8() {
    return this.bc_8;
  }
  
  public void setBc_8(String bc_8) {
    this.bc_8 = bc_8;
  }
  
  public String getAca() {
    return this.aca;
  }
  
  public void setAca(String aca) {
    this.aca = aca;
  }
  
  public String getDiag() {
    return this.diag;
  }
  
  public void setDiag(String diag) {
    this.diag = diag;
  }
  
  public String getDemo() {
    return this.demo;
  }
  
  public void setDemo(String demo) {
    this.demo = demo;
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
