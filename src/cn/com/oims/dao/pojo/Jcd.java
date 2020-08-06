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

@Entity
@Table(name = "jcd")
public class Jcd implements Serializable {
  private static final long serialVersionUID = 277021661011747433L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jcd_sequence")
  @SequenceGenerator(name = "jcd_sequence", allocationSize = 1, initialValue = 1, sequenceName = "jcd_sequence")
  private Long id;
  
  private String jcdh;
  
  @Column(name = "jiuzhen_id")
  private Long jiuzhenId;
  
  private String biaoti;
  
  @Column(name = "jcsb_id")
  private Integer jcsbId;
  
  @Column(name = "huanzhe_id")
  private Long huanzheId;
  
  @Column(name = "jcxm_ids")
  private String jcxmIds;
  
  @Column(name = "kdks_id")
  private Integer kdksId;
  
  private String kdys;
  
  @Column(name = "kd_time")
  private Date kdTime;
  
  @Column(name = "jcks_id")
  private Integer jcksId;
  
  private String jcys;
  
  @Column(name = "jcks_time")
  private Date jcksTime;
  
  @Column(name = "jcjs_time")
  private Date jcjsTime;
  
  @Column(name = "left_pic")
  private String leftPic;
  
  @Column(name = "right_pic")
  private String rightPic;
  
  private boolean jfbs;
  
  private Integer biaoshi;
  
  private Integer yanbie;
  
  private String jcyq;
  
  private Integer state;
  
  @Column(name = "insert_user", length = 30)
  private String insertUser;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getJcdh() {
    return this.jcdh;
  }
  
  public void setJcdh(String jcdh) {
    this.jcdh = jcdh;
  }
  
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  public String getBiaoti() {
    return this.biaoti;
  }
  
  public void setBiaoti(String biaoti) {
    this.biaoti = biaoti;
  }
  
  public Integer getJcsbId() {
    return this.jcsbId;
  }
  
  public void setJcsbId(Integer jcsbId) {
    this.jcsbId = jcsbId;
  }
  
  public Long getHuanzheId() {
    return this.huanzheId;
  }
  
  public void setHuanzheId(Long huanzheId) {
    this.huanzheId = huanzheId;
  }
  
  public String getJcxmIds() {
    return this.jcxmIds;
  }
  
  public void setJcxmIds(String jcxmIds) {
    this.jcxmIds = jcxmIds;
  }
  
  public Integer getKdksId() {
    return this.kdksId;
  }
  
  public void setKdksId(Integer kdksId) {
    this.kdksId = kdksId;
  }
  
  public String getKdys() {
    return this.kdys;
  }
  
  public void setKdys(String kdys) {
    this.kdys = kdys;
  }
  
  public Date getKdTime() {
    return this.kdTime;
  }
  
  public void setKdTime(Date kdTime) {
    this.kdTime = kdTime;
  }
  
  public Integer getJcksId() {
    return this.jcksId;
  }
  
  public void setJcksId(Integer jcksId) {
    this.jcksId = jcksId;
  }
  
  public String getJcys() {
    return this.jcys;
  }
  
  public void setJcys(String jcys) {
    this.jcys = jcys;
  }
  
  public Date getJcksTime() {
    return this.jcksTime;
  }
  
  public void setJcksTime(Date jcksTime) {
    this.jcksTime = jcksTime;
  }
  
  public Date getJcjsTime() {
    return this.jcjsTime;
  }
  
  public void setJcjsTime(Date jcjsTime) {
    this.jcjsTime = jcjsTime;
  }
  
  public String getLeftPic() {
    return this.leftPic;
  }
  
  public void setLeftPic(String leftPic) {
    this.leftPic = leftPic;
  }
  
  public String getRightPic() {
    return this.rightPic;
  }
  
  public void setRightPic(String rightPic) {
    this.rightPic = rightPic;
  }
  
  public boolean isJfbs() {
    return this.jfbs;
  }
  
  public void setJfbs(boolean jfbs) {
    this.jfbs = jfbs;
  }
  
  public Integer getBiaoshi() {
    return this.biaoshi;
  }
  
  public void setBiaoshi(Integer biaoshi) {
    this.biaoshi = biaoshi;
  }
  
  public Integer getYanbie() {
    return this.yanbie;
  }
  
  public void setYanbie(Integer yanbie) {
    this.yanbie = yanbie;
  }
  
  public String getJcyq() {
    return this.jcyq;
  }
  
  public void setJcyq(String jcyq) {
    this.jcyq = jcyq;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
}
