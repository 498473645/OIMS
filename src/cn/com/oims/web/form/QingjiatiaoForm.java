package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class QingjiatiaoForm {
  private Long id;
  
  private String qingjiaYuanyou;
  
  private int qjlx;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date kssj;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date jssj;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getQingjiaYuanyou() {
    return this.qingjiaYuanyou;
  }
  
  public void setQingjiaYuanyou(String qingjiaYuanyou) {
    this.qingjiaYuanyou = qingjiaYuanyou;
  }
  
  public int getQjlx() {
    return this.qjlx;
  }
  
  public void setQjlx(int qjlx) {
    this.qjlx = qjlx;
  }
  
  public Date getKssj() {
    return this.kssj;
  }
  
  public void setKssj(Date kssj) {
    this.kssj = kssj;
  }
  
  public Date getJssj() {
    return this.jssj;
  }
  
  public void setJssj(Date jssj) {
    this.jssj = jssj;
  }
}
