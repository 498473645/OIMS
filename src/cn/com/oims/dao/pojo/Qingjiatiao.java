package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qingjiatiao")
public class Qingjiatiao {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qingjiatiao_sequence")
  @SequenceGenerator(name = "qingjiatiao_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qingjiatiao_sequence")
  private Long id;
  
  @Column(name = "qingjia_yuanyou")
  private String qingjiaYuanyou;
  
  private int qjlx;
  
  private Date kssj;
  
  private Date jssj;
  
  private Date xjsj;
  
  @Column(name = "insert_time")
  private Date insertTime;
  
  @Column(name = "insert_user")
  private String insertUser;
  
  private int state;
  
  @Column(name = "audit_user")
  private String auditUser;
  
  @Column(name = "audit_time")
  private Date auditTime;
  
  private String note;
  
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
  
  public Date getInsertTime() {
    return this.insertTime;
  }
  
  public void setInsertTime(Date insertTime) {
    this.insertTime = insertTime;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public int getState() {
    return this.state;
  }
  
  public void setState(int state) {
    this.state = state;
  }
  
  public String getAuditUser() {
    return this.auditUser;
  }
  
  public void setAuditUser(String auditUser) {
    this.auditUser = auditUser;
  }
  
  public Date getAuditTime() {
    return this.auditTime;
  }
  
  public void setAuditTime(Date auditTime) {
    this.auditTime = auditTime;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public Date getXjsj() {
    return this.xjsj;
  }
  
  public void setXjsj(Date xjsj) {
    this.xjsj = xjsj;
  }
}
