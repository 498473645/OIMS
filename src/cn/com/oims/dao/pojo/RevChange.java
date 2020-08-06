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
@Table(name = "revchange")
public class RevChange implements Serializable {
  private static final long serialVersionUID = -4275654900904175036L;
  
  private Long id;
  
  private Date revdt;
  
  private Integer biaoshi;
  
  private Integer chgnum;
  
  private String userId;
  
  private Long bumenId;
  
  private Date opertm;
  
  private String jcxmId;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "revchange_sequence")
  @SequenceGenerator(name = "revchange_sequence", allocationSize = 1, initialValue = 1, sequenceName = "revchange_sequence")
  public Long getId() {
    return this.id;
  }
  
  public Date getRevdt() {
    return this.revdt;
  }
  
  public Date getOpertm() {
    return this.opertm;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public void setRevdt(Date revdt) {
    this.revdt = revdt;
  }
  
  public void setOpertm(Date opertm) {
    this.opertm = opertm;
  }
  
  public Integer getBiaoshi() {
    return this.biaoshi;
  }
  
  public void setBiaoshi(Integer biaoshi) {
    this.biaoshi = biaoshi;
  }
  
  public Integer getChgnum() {
    return this.chgnum;
  }
  
  public void setChgnum(Integer chgnum) {
    this.chgnum = chgnum;
  }
  
  @Column(name = "user_id")
  public String getUserId() {
    return this.userId;
  }
  
  public void setUserId(String userId) {
    this.userId = userId;
  }
  
  @Column(name = "bumen_id")
  public Long getBumenId() {
    return this.bumenId;
  }
  
  public void setBumenId(Long bumenId) {
    this.bumenId = bumenId;
  }
  
  @Column(name = "jcxm_id")
  public String getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(String jcxmId) {
    this.jcxmId = jcxmId;
  }
}
