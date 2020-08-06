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
@Table(name = "revproj")
public class RevProj implements Serializable {
  private static final long serialVersionUID = 6237108249798663491L;
  
  private Long id;
  
  private String projName;
  
  private String jcxmIds;
  
  private String checkAddr;
  
  private Integer amnum;
  
  private Integer pmnum;
  
  private String userId;
  
  private Date opertm;
  
  private String operUserId;
  
  private Long bumenId;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "revproj_sequence")
  @SequenceGenerator(name = "revproj_sequence", allocationSize = 1, initialValue = 1, sequenceName = "revproj_sequence")
  public Long getId() {
    return this.id;
  }
  
  @Column(length = 100)
  public String getProjName() {
    return this.projName;
  }
  
  @Column(length = 300)
  public String getCheckAddr() {
    return this.checkAddr;
  }
  
  public Integer getAmnum() {
    return this.amnum;
  }
  
  public Integer getPmnum() {
    return this.pmnum;
  }
  
  public Date getOpertm() {
    return this.opertm;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public void setProjName(String projName) {
    this.projName = projName;
  }
  
  public void setCheckAddr(String checkAddr) {
    this.checkAddr = checkAddr;
  }
  
  public void setAmnum(Integer amnum) {
    this.amnum = amnum;
  }
  
  public void setPmnum(Integer pmnum) {
    this.pmnum = pmnum;
  }
  
  public void setOpertm(Date opertm) {
    this.opertm = opertm;
  }
  
  @Column(name = "user_id")
  public String getUserId() {
    return this.userId;
  }
  
  public void setUserId(String userId) {
    this.userId = userId;
  }
  
  @Column(name = "oper_user_id")
  public String getOperUserId() {
    return this.operUserId;
  }
  
  public void setOperUserId(String operUserId) {
    this.operUserId = operUserId;
  }
  
  @Column(name = "bumen_id")
  public Long getBumenId() {
    return this.bumenId;
  }
  
  public void setBumenId(Long bumenId) {
    this.bumenId = bumenId;
  }
  
  @Column(name = "jcxm_ids")
  public String getJcxmIds() {
    return this.jcxmIds;
  }
  
  public void setJcxmIds(String jcxmIds) {
    this.jcxmIds = jcxmIds;
  }
  
  public static long getSerialversionuid() {
    return 6237108249798663491L;
  }
}
