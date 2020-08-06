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
import org.hibernate.annotations.Index;

@Entity
@Table(name = "jcxm")
public class Jcxm implements Serializable {
  private static final long serialVersionUID = -2616062487898346574L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jcxm_sequence")
  @SequenceGenerator(name = "jcxm_sequence", allocationSize = 1, initialValue = 100000, sequenceName = "jcxm_sequence")
  private Integer id;
  
  @Index(name = "bianma")
  @Column(length = 200)
  private String bianma;
  
  private String xmmc;
  
  @Column(length = 2000)
  private String xmms;
  
  @Column(name = "father_id")
  private Integer fatherId;
  
  @Index(name = "category_id")
  @Column(name = "category_id")
  private Integer categoryId;
  
  @Column(name = "left_pic_path")
  private String leftPicPath;
  
  @Column(name = "right_pic_path")
  private String rightPicPath;
  
  @Column(name = "input_code")
  private String input_code;
  
  private Float price;
  
  @Column(name = "tongbu_shijian")
  private Date tongbuShijian;
  
  @Column(name = "price_code", length = 200)
  private String priceCode;
  
  @Column(name = "enable_flag")
  private boolean enableFlag = true;
  
  @Column(name = "have_option")
  private boolean haveOption = false;
  
  private Integer cyxm = Integer.valueOf(0);
  
  public boolean isHaveOption() {
    return this.haveOption;
  }
  
  public void setHaveOption(boolean haveOption) {
    this.haveOption = haveOption;
  }
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getBianma() {
    return this.bianma;
  }
  
  public void setBianma(String bianma) {
    this.bianma = bianma;
  }
  
  public String getXmmc() {
    return this.xmmc;
  }
  
  public void setXmmc(String xmmc) {
    this.xmmc = xmmc;
  }
  
  public String getXmms() {
    return this.xmms;
  }
  
  public void setXmms(String xmms) {
    this.xmms = xmms;
  }
  
  public Integer getFatherId() {
    return this.fatherId;
  }
  
  public void setFatherId(Integer fatherId) {
    this.fatherId = fatherId;
  }
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getLeftPicPath() {
    return this.leftPicPath;
  }
  
  public void setLeftPicPath(String leftPicPath) {
    this.leftPicPath = leftPicPath;
  }
  
  public String getRightPicPath() {
    return this.rightPicPath;
  }
  
  public void setRightPicPath(String rightPicPath) {
    this.rightPicPath = rightPicPath;
  }
  
  public String getInput_code() {
    return this.input_code;
  }
  
  public void setInput_code(String input_code) {
    this.input_code = input_code;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public Date getTongbuShijian() {
    return this.tongbuShijian;
  }
  
  public void setTongbuShijian(Date tongbuShijian) {
    this.tongbuShijian = tongbuShijian;
  }
  
  public String getPriceCode() {
    return this.priceCode;
  }
  
  public void setPriceCode(String priceCode) {
    this.priceCode = priceCode;
  }
  
  public boolean isEnableFlag() {
    return this.enableFlag;
  }
  
  public void setEnableFlag(boolean enable) {
    this.enableFlag = enable;
  }
  
  public Integer getCyxm() {
    return this.cyxm;
  }
  
  public void setCyxm(Integer cyxm) {
    this.cyxm = cyxm;
  }
}
