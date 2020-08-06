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
@Table(name = "reserveinfo")
public class ReserveInfo implements Serializable {
  private static final long serialVersionUID = 714306511487926755L;
  
  private Long id;
  
  private String jcdIds;
  
  private Date confirmDate;
  
  private Date reservedt;
  
  private String userId;
  
  private Date opertm;
  
  private String confirmUserId;
  
  private Long huanzheId;
  
  private Long jiuzhenId;
  
  private String jcxmIds;
  
  private String jcxmmc;
  
  private String yanbie;
  
  private String jcyq;
  
  private Integer xmnum;
  
  private Long revprojId;
  
  private Long jcbmid;
  
  private Integer revstate;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reserveinfo_sequence")
  @SequenceGenerator(name = "reserveinfo_sequence", allocationSize = 1, initialValue = 1, sequenceName = "reserveinfo_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getReservedt() {
    return this.reservedt;
  }
  
  public void setReservedt(Date reservedt) {
    this.reservedt = reservedt;
  }
  
  public Date getOpertm() {
    return this.opertm;
  }
  
  public void setOpertm(Date opertm) {
    this.opertm = opertm;
  }
  
  @Column(name = "confirm_date")
  public Date getConfirmDate() {
    return this.confirmDate;
  }
  
  public void setConfirmDate(Date confirmDate) {
    this.confirmDate = confirmDate;
  }
  
  @Column(name = "jcd_ids")
  public String getJcdIds() {
    return this.jcdIds;
  }
  
  public void setJcdIds(String jcdIds) {
    this.jcdIds = jcdIds;
  }
  
  @Column(name = "user_id")
  public String getUserId() {
    return this.userId;
  }
  
  public void setUserId(String userId) {
    this.userId = userId;
  }
  
  @Column(name = "confirm_user_id")
  public String getConfirmUserId() {
    return this.confirmUserId;
  }
  
  public void setConfirmUserId(String confirmUserId) {
    this.confirmUserId = confirmUserId;
  }
  
  @Column(name = "huanzhe_id")
  public Long getHuanzheId() {
    return this.huanzheId;
  }
  
  public void setHuanzheId(Long huanzheId) {
    this.huanzheId = huanzheId;
  }
  
  @Column(name = "jiuzhen_id")
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  @Column(name = "jcxm_ids")
  public String getJcxmIds() {
    return this.jcxmIds;
  }
  
  public void setJcxmIds(String jcxmIds) {
    this.jcxmIds = jcxmIds;
  }
  
  public String getJcxmmc() {
    return this.jcxmmc;
  }
  
  public void setJcxmmc(String jcxmmc) {
    this.jcxmmc = jcxmmc;
  }
  
  public String getYanbie() {
    return this.yanbie;
  }
  
  public void setYanbie(String yanbie) {
    this.yanbie = yanbie;
  }
  
  public String getJcyq() {
    return this.jcyq;
  }
  
  public void setJcyq(String jcyq) {
    this.jcyq = jcyq;
  }
  
  public Integer getXmnum() {
    return this.xmnum;
  }
  
  public void setXmnum(Integer xmnum) {
    this.xmnum = xmnum;
  }
  
  @Column(name = "revproj_id")
  public Long getRevprojId() {
    return this.revprojId;
  }
  
  public void setRevprojId(Long revprojId) {
    this.revprojId = revprojId;
  }
  
  public Long getJcbmid() {
    return this.jcbmid;
  }
  
  public void setJcbmid(Long jcbmid) {
    this.jcbmid = jcbmid;
  }
  
  public Integer getRevstate() {
    return this.revstate;
  }
  
  public void setRevstate(Integer revstate) {
    this.revstate = revstate;
  }
}
