package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "eyesjjc")
public class Eyesjjc {
  @Id
  @Column(name = "flow_no")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyesjjc_sequence")
  @SequenceGenerator(name = "eyesjjc_sequence", initialValue = 1, allocationSize = 1, sequenceName = "eyesjjc_sequence")
  private Long flowNo;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  private String yb;
  
  private String geo;
  
  private String line;
  
  private String num;
  
  private String obj;
  
  private String color;
  
  private String zqlu;
  
  private String bfb;
  
  private String result_1;
  
  private String result_2;
  
  private String g5;
  
  private String g6;
  
  private String g7;
  
  private String g8;
  
  private String g9;
  
  private String g10;
  
  private String gw5;
  
  private String gw6;
  
  private String gw7;
  
  private String gw8;
  
  private String gw9;
  
  private String gw10;
  
  private String l11;
  
  private String l12;
  
  private String l13;
  
  private String lw11;
  
  private String lw12;
  
  private String lw13;
  
  private String n14;
  
  private String n15;
  
  private String n16;
  
  private String n17;
  
  private String n18;
  
  private String n19;
  
  private String n20;
  
  private String n21;
  
  private String n22;
  
  private String n23;
  
  private String n24;
  
  private String n25;
  
  private String nw14;
  
  private String nw15;
  
  private String nw16;
  
  private String nw17;
  
  private String nw18;
  
  private String nw19;
  
  private String nw20;
  
  private String nw21;
  
  private String nw22;
  
  private String nw23;
  
  private String nw24;
  
  private String nw25;
  
  private String o26;
  
  private String o27;
  
  private String o28;
  
  private String o29;
  
  private String o30;
  
  private String o31;
  
  private String o32;
  
  private String o33;
  
  private String o34;
  
  private String o35;
  
  private String o36;
  
  private String ow26;
  
  private String ow27;
  
  private String ow28;
  
  private String ow29;
  
  private String ow30;
  
  private String ow31;
  
  private String ow32;
  
  private String ow33;
  
  private String ow34;
  
  private String ow35;
  
  private String ow36;
  
  private String c37;
  
  private String c38;
  
  private String c39;
  
  private String c40;
  
  private String cw37;
  
  private String cw38;
  
  private String cw39;
  
  private String cw40;
  
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
  
  public String getYb() {
    return this.yb;
  }
  
  public void setYb(String yb) {
    this.yb = yb;
  }
  
  public String getGeo() {
    return this.geo;
  }
  
  public void setGeo(String geo) {
    this.geo = geo;
  }
  
  public String getLine() {
    return this.line;
  }
  
  public void setLine(String line) {
    this.line = line;
  }
  
  public String getNum() {
    return this.num;
  }
  
  public void setNum(String num) {
    this.num = num;
  }
  
  public String getObj() {
    return this.obj;
  }
  
  public void setObj(String obj) {
    this.obj = obj;
  }
  
  public String getColor() {
    return this.color;
  }
  
  public void setColor(String color) {
    this.color = color;
  }
  
  public String getZqlu() {
    return this.zqlu;
  }
  
  public void setZqlu(String zqlu) {
    this.zqlu = zqlu;
  }
  
  public String getBfb() {
    return this.bfb;
  }
  
  public void setBfb(String bfb) {
    this.bfb = bfb;
  }
  
  public String getResult_1() {
    return this.result_1;
  }
  
  public void setResult_1(String result_1) {
    this.result_1 = result_1;
  }
  
  public String getResult_2() {
    return this.result_2;
  }
  
  public void setResult_2(String result_2) {
    this.result_2 = result_2;
  }
  
  public String getG5() {
    return this.g5;
  }
  
  public void setG5(String g5) {
    this.g5 = g5;
  }
  
  public String getG6() {
    return this.g6;
  }
  
  public void setG6(String g6) {
    this.g6 = g6;
  }
  
  public String getG7() {
    return this.g7;
  }
  
  public void setG7(String g7) {
    this.g7 = g7;
  }
  
  public String getG8() {
    return this.g8;
  }
  
  public void setG8(String g8) {
    this.g8 = g8;
  }
  
  public String getG9() {
    return this.g9;
  }
  
  public void setG9(String g9) {
    this.g9 = g9;
  }
  
  public String getG10() {
    return this.g10;
  }
  
  public void setG10(String g10) {
    this.g10 = g10;
  }
  
  public String getGw5() {
    return this.gw5;
  }
  
  public void setGw5(String gw5) {
    this.gw5 = gw5;
  }
  
  public String getGw6() {
    return this.gw6;
  }
  
  public void setGw6(String gw6) {
    this.gw6 = gw6;
  }
  
  public String getGw7() {
    return this.gw7;
  }
  
  public void setGw7(String gw7) {
    this.gw7 = gw7;
  }
  
  public String getGw8() {
    return this.gw8;
  }
  
  public void setGw8(String gw8) {
    this.gw8 = gw8;
  }
  
  public String getGw9() {
    return this.gw9;
  }
  
  public void setGw9(String gw9) {
    this.gw9 = gw9;
  }
  
  public String getGw10() {
    return this.gw10;
  }
  
  public void setGw10(String gw10) {
    this.gw10 = gw10;
  }
  
  public String getL11() {
    return this.l11;
  }
  
  public void setL11(String l11) {
    this.l11 = l11;
  }
  
  public String getL12() {
    return this.l12;
  }
  
  public void setL12(String l12) {
    this.l12 = l12;
  }
  
  public String getL13() {
    return this.l13;
  }
  
  public void setL13(String l13) {
    this.l13 = l13;
  }
  
  public String getLw11() {
    return this.lw11;
  }
  
  public void setLw11(String lw11) {
    this.lw11 = lw11;
  }
  
  public String getLw12() {
    return this.lw12;
  }
  
  public void setLw12(String lw12) {
    this.lw12 = lw12;
  }
  
  public String getLw13() {
    return this.lw13;
  }
  
  public void setLw13(String lw13) {
    this.lw13 = lw13;
  }
  
  public String getN14() {
    return this.n14;
  }
  
  public void setN14(String n14) {
    this.n14 = n14;
  }
  
  public String getN15() {
    return this.n15;
  }
  
  public void setN15(String n15) {
    this.n15 = n15;
  }
  
  public String getN16() {
    return this.n16;
  }
  
  public void setN16(String n16) {
    this.n16 = n16;
  }
  
  public String getN17() {
    return this.n17;
  }
  
  public void setN17(String n17) {
    this.n17 = n17;
  }
  
  public String getN18() {
    return this.n18;
  }
  
  public void setN18(String n18) {
    this.n18 = n18;
  }
  
  public String getN19() {
    return this.n19;
  }
  
  public void setN19(String n19) {
    this.n19 = n19;
  }
  
  public String getN20() {
    return this.n20;
  }
  
  public void setN20(String n20) {
    this.n20 = n20;
  }
  
  public String getN21() {
    return this.n21;
  }
  
  public void setN21(String n21) {
    this.n21 = n21;
  }
  
  public String getN22() {
    return this.n22;
  }
  
  public void setN22(String n22) {
    this.n22 = n22;
  }
  
  public String getN23() {
    return this.n23;
  }
  
  public void setN23(String n23) {
    this.n23 = n23;
  }
  
  public String getN24() {
    return this.n24;
  }
  
  public void setN24(String n24) {
    this.n24 = n24;
  }
  
  public String getN25() {
    return this.n25;
  }
  
  public void setN25(String n25) {
    this.n25 = n25;
  }
  
  public String getNw14() {
    return this.nw14;
  }
  
  public void setNw14(String nw14) {
    this.nw14 = nw14;
  }
  
  public String getNw15() {
    return this.nw15;
  }
  
  public void setNw15(String nw15) {
    this.nw15 = nw15;
  }
  
  public String getNw16() {
    return this.nw16;
  }
  
  public void setNw16(String nw16) {
    this.nw16 = nw16;
  }
  
  public String getNw17() {
    return this.nw17;
  }
  
  public void setNw17(String nw17) {
    this.nw17 = nw17;
  }
  
  public String getNw18() {
    return this.nw18;
  }
  
  public void setNw18(String nw18) {
    this.nw18 = nw18;
  }
  
  public String getNw19() {
    return this.nw19;
  }
  
  public void setNw19(String nw19) {
    this.nw19 = nw19;
  }
  
  public String getNw20() {
    return this.nw20;
  }
  
  public void setNw20(String nw20) {
    this.nw20 = nw20;
  }
  
  public String getNw21() {
    return this.nw21;
  }
  
  public void setNw21(String nw21) {
    this.nw21 = nw21;
  }
  
  public String getNw22() {
    return this.nw22;
  }
  
  public void setNw22(String nw22) {
    this.nw22 = nw22;
  }
  
  public String getNw23() {
    return this.nw23;
  }
  
  public void setNw23(String nw23) {
    this.nw23 = nw23;
  }
  
  public String getNw24() {
    return this.nw24;
  }
  
  public void setNw24(String nw24) {
    this.nw24 = nw24;
  }
  
  public String getNw25() {
    return this.nw25;
  }
  
  public void setNw25(String nw25) {
    this.nw25 = nw25;
  }
  
  public String getO26() {
    return this.o26;
  }
  
  public void setO26(String o26) {
    this.o26 = o26;
  }
  
  public String getO27() {
    return this.o27;
  }
  
  public void setO27(String o27) {
    this.o27 = o27;
  }
  
  public String getO28() {
    return this.o28;
  }
  
  public void setO28(String o28) {
    this.o28 = o28;
  }
  
  public String getO29() {
    return this.o29;
  }
  
  public void setO29(String o29) {
    this.o29 = o29;
  }
  
  public String getO30() {
    return this.o30;
  }
  
  public void setO30(String o30) {
    this.o30 = o30;
  }
  
  public String getO31() {
    return this.o31;
  }
  
  public void setO31(String o31) {
    this.o31 = o31;
  }
  
  public String getO32() {
    return this.o32;
  }
  
  public void setO32(String o32) {
    this.o32 = o32;
  }
  
  public String getO33() {
    return this.o33;
  }
  
  public void setO33(String o33) {
    this.o33 = o33;
  }
  
  public String getO34() {
    return this.o34;
  }
  
  public void setO34(String o34) {
    this.o34 = o34;
  }
  
  public String getO35() {
    return this.o35;
  }
  
  public void setO35(String o35) {
    this.o35 = o35;
  }
  
  public String getO36() {
    return this.o36;
  }
  
  public void setO36(String o36) {
    this.o36 = o36;
  }
  
  public String getOw26() {
    return this.ow26;
  }
  
  public void setOw26(String ow26) {
    this.ow26 = ow26;
  }
  
  public String getOw27() {
    return this.ow27;
  }
  
  public void setOw27(String ow27) {
    this.ow27 = ow27;
  }
  
  public String getOw28() {
    return this.ow28;
  }
  
  public void setOw28(String ow28) {
    this.ow28 = ow28;
  }
  
  public String getOw29() {
    return this.ow29;
  }
  
  public void setOw29(String ow29) {
    this.ow29 = ow29;
  }
  
  public String getOw30() {
    return this.ow30;
  }
  
  public void setOw30(String ow30) {
    this.ow30 = ow30;
  }
  
  public String getOw31() {
    return this.ow31;
  }
  
  public void setOw31(String ow31) {
    this.ow31 = ow31;
  }
  
  public String getOw32() {
    return this.ow32;
  }
  
  public void setOw32(String ow32) {
    this.ow32 = ow32;
  }
  
  public String getOw33() {
    return this.ow33;
  }
  
  public void setOw33(String ow33) {
    this.ow33 = ow33;
  }
  
  public String getOw34() {
    return this.ow34;
  }
  
  public void setOw34(String ow34) {
    this.ow34 = ow34;
  }
  
  public String getOw35() {
    return this.ow35;
  }
  
  public void setOw35(String ow35) {
    this.ow35 = ow35;
  }
  
  public String getOw36() {
    return this.ow36;
  }
  
  public void setOw36(String ow36) {
    this.ow36 = ow36;
  }
  
  public String getC37() {
    return this.c37;
  }
  
  public void setC37(String c37) {
    this.c37 = c37;
  }
  
  public String getC38() {
    return this.c38;
  }
  
  public void setC38(String c38) {
    this.c38 = c38;
  }
  
  public String getC39() {
    return this.c39;
  }
  
  public void setC39(String c39) {
    this.c39 = c39;
  }
  
  public String getC40() {
    return this.c40;
  }
  
  public void setC40(String c40) {
    this.c40 = c40;
  }
  
  public String getCw37() {
    return this.cw37;
  }
  
  public void setCw37(String cw37) {
    this.cw37 = cw37;
  }
  
  public String getCw38() {
    return this.cw38;
  }
  
  public void setCw38(String cw38) {
    this.cw38 = cw38;
  }
  
  public String getCw39() {
    return this.cw39;
  }
  
  public void setCw39(String cw39) {
    this.cw39 = cw39;
  }
  
  public String getCw40() {
    return this.cw40;
  }
  
  public void setCw40(String cw40) {
    this.cw40 = cw40;
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
