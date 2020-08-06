package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "yhpz")
public class Yhpz implements Serializable {
  private static final long serialVersionUID = 1322329503251380849L;
  
  private String gonghao;
  
  private String hyc;
  
  private String gzt;
  
  private Integer xslx;
  
  private boolean xssj;
  
  private Integer yuyan;
  
  private String jclist;
  
  @Id
  @Column(length = 30)
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  @Column(length = 50)
  public String getHyc() {
    return this.hyc;
  }
  
  public void setHyc(String hyc) {
    this.hyc = hyc;
  }
  
  @Column(length = 50)
  public String getGzt() {
    return this.gzt;
  }
  
  public void setGzt(String gzt) {
    this.gzt = gzt;
  }
  
  public Integer getXslx() {
    return this.xslx;
  }
  
  public void setXslx(Integer xslx) {
    this.xslx = xslx;
  }
  
  public Integer getYuyan() {
    return this.yuyan;
  }
  
  public void setYuyan(Integer yuyan) {
    this.yuyan = yuyan;
  }
  
  public boolean isXssj() {
    return this.xssj;
  }
  
  public void setXssj(boolean xssj) {
    this.xssj = xssj;
  }
  
  public String getJclist() {
    return this.jclist;
  }
  
  public void setJclist(String jclist) {
    this.jclist = jclist;
  }
}
