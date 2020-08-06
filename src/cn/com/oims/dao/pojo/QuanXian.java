package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "quanxian")
public class QuanXian implements Serializable {
  private static final long serialVersionUID = 2422381045913277825L;
  
  private Integer id;
  
  private Integer biaoqian;
  
  private Integer cdjb;
  
  private Integer paixu;
  
  private Integer fatherId;
  
  private String label_zh;
  
  private String css;
  
  private String func;
  
  private String jsFileUrl;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quanxian_sequence")
  @SequenceGenerator(name = "quanxian_sequence", allocationSize = 1, initialValue = 1, sequenceName = "quanxian_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  @Column(name = "css")
  public String getCss() {
    return this.css;
  }
  
  public void setCss(String css) {
    this.css = css;
  }
  
  @Column(name = "func")
  public String getFunc() {
    return this.func;
  }
  
  public void setFunc(String func) {
    this.func = func;
  }
  
  public String getLabel_zh() {
    return this.label_zh;
  }
  
  public void setLabel_zh(String label_zh) {
    this.label_zh = label_zh;
  }
  
  @Column(name = "father_id")
  public Integer getFatherId() {
    return this.fatherId;
  }
  
  public void setFatherId(Integer fatherId) {
    this.fatherId = fatherId;
  }
  
  public Integer getBiaoqian() {
    return this.biaoqian;
  }
  
  public void setBiaoqian(Integer biaoqian) {
    this.biaoqian = biaoqian;
  }
  
  public Integer getCdjb() {
    return this.cdjb;
  }
  
  public void setCdjb(Integer cdjb) {
    this.cdjb = cdjb;
  }
  
  public Integer getPaixu() {
    return this.paixu;
  }
  
  public void setPaixu(Integer paixu) {
    this.paixu = paixu;
  }
  
  @Column(name = "js_file_url")
  public String getJsFileUrl() {
    return this.jsFileUrl;
  }
  
  public void setJsFileUrl(String jsFileUrl) {
    this.jsFileUrl = jsFileUrl;
  }
}
