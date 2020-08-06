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
@Table(name = "qg_yy")
public class QgYy {
  private Long id;
  
  private String blh;
  
  private Date yysj;
  
  private String dyrq_y;
  
  private String dyrq_r;
  
  private String dypl;
  
  private String yyxm1;
  
  private String yyxm2;
  
  private String yyxm3;
  
  private String yyxm4;
  
  private String yyxm5;
  
  private String yyxm6;
  
  private String ssfy1;
  
  private String ssfy2;
  
  private String ssfy3;
  
  private String ssfy4;
  
  private String ssfy5;
  
  private String ssfy6;
  
  private String ssfy1h;
  
  private String ssfy2h;
  
  private String ssfy3h;
  
  private String ssfy4h;
  
  private String ssfy5h;
  
  private String ssfy6h;
  
  private Long lc_id;
  
  private String yy_qz;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_yy_sequence")
  @SequenceGenerator(name = "qg_yy_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_yy_sequence")
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
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  public Date getYysj() {
    return this.yysj;
  }
  
  public void setYysj(Date yysj) {
    this.yysj = yysj;
  }
  
  public Long getLc_id() {
    return this.lc_id;
  }
  
  public void setLc_id(Long lc_id) {
    this.lc_id = lc_id;
  }
  
  public String getDyrq_y() {
    return this.dyrq_y;
  }
  
  public void setDyrq_y(String dyrq_y) {
    this.dyrq_y = dyrq_y;
  }
  
  public String getDyrq_r() {
    return this.dyrq_r;
  }
  
  public void setDyrq_r(String dyrq_r) {
    this.dyrq_r = dyrq_r;
  }
  
  public String getDypl() {
    return this.dypl;
  }
  
  public void setDypl(String dypl) {
    this.dypl = dypl;
  }
  
  public String getYyxm1() {
    return this.yyxm1;
  }
  
  public void setYyxm1(String yyxm1) {
    this.yyxm1 = yyxm1;
  }
  
  public String getYyxm2() {
    return this.yyxm2;
  }
  
  public void setYyxm2(String yyxm2) {
    this.yyxm2 = yyxm2;
  }
  
  public String getYyxm3() {
    return this.yyxm3;
  }
  
  public void setYyxm3(String yyxm3) {
    this.yyxm3 = yyxm3;
  }
  
  public String getYyxm4() {
    return this.yyxm4;
  }
  
  public void setYyxm4(String yyxm4) {
    this.yyxm4 = yyxm4;
  }
  
  public String getSsfy1() {
    return this.ssfy1;
  }
  
  public void setSsfy1(String ssfy1) {
    this.ssfy1 = ssfy1;
  }
  
  public String getSsfy2() {
    return this.ssfy2;
  }
  
  public void setSsfy2(String ssfy2) {
    this.ssfy2 = ssfy2;
  }
  
  public String getSsfy3() {
    return this.ssfy3;
  }
  
  public void setSsfy3(String ssfy3) {
    this.ssfy3 = ssfy3;
  }
  
  public String getSsfy4() {
    return this.ssfy4;
  }
  
  public void setSsfy4(String ssfy4) {
    this.ssfy4 = ssfy4;
  }
  
  public String getSsfy1h() {
    return this.ssfy1h;
  }
  
  public void setSsfy1h(String ssfy1h) {
    this.ssfy1h = ssfy1h;
  }
  
  public String getSsfy2h() {
    return this.ssfy2h;
  }
  
  public void setSsfy2h(String ssfy2h) {
    this.ssfy2h = ssfy2h;
  }
  
  public String getSsfy3h() {
    return this.ssfy3h;
  }
  
  public void setSsfy3h(String ssfy3h) {
    this.ssfy3h = ssfy3h;
  }
  
  public String getSsfy4h() {
    return this.ssfy4h;
  }
  
  public void setSsfy4h(String ssfy4h) {
    this.ssfy4h = ssfy4h;
  }
  
  public String getYy_qz() {
    return this.yy_qz;
  }
  
  public void setYy_qz(String yy_qz) {
    this.yy_qz = yy_qz;
  }
  
  public String getYyxm5() {
    return this.yyxm5;
  }
  
  public void setYyxm5(String yyxm5) {
    this.yyxm5 = yyxm5;
  }
  
  public String getYyxm6() {
    return this.yyxm6;
  }
  
  public void setYyxm6(String yyxm6) {
    this.yyxm6 = yyxm6;
  }
  
  public String getSsfy5h() {
    return this.ssfy5h;
  }
  
  public void setSsfy5h(String ssfy5h) {
    this.ssfy5h = ssfy5h;
  }
  
  public String getSsfy6h() {
    return this.ssfy6h;
  }
  
  public void setSsfy6h(String ssfy6h) {
    this.ssfy6h = ssfy6h;
  }
  
  public String getSsfy5() {
    return this.ssfy5;
  }
  
  public void setSsfy5(String ssfy5) {
    this.ssfy5 = ssfy5;
  }
  
  public String getSsfy6() {
    return this.ssfy6;
  }
  
  public void setSsfy6(String ssfy6) {
    this.ssfy6 = ssfy6;
  }
}
