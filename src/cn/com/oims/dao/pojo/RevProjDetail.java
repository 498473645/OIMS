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
@Table(name = "revprojdetail")
public class RevProjDetail implements Serializable {
  private static final long serialVersionUID = 8310044564178881101L;
  
  private Long id;
  
  private Long jcxmId;
  
  private String jcxmmc;
  
  private Long revprojId;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "revprojdetail_sequence")
  @SequenceGenerator(name = "revprojdetail_sequence", allocationSize = 1, initialValue = 1, sequenceName = "revprojdetail_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(name = "jcxm_id")
  public Long getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(Long jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  public String getJcxmmc() {
    return this.jcxmmc;
  }
  
  public void setJcxmmc(String jcxmmc) {
    this.jcxmmc = jcxmmc;
  }
  
  @Column(name = "revproj_id")
  public Long getRevprojId() {
    return this.revprojId;
  }
  
  public void setRevprojId(Long revprojId) {
    this.revprojId = revprojId;
  }
  
  public static long getSerialversionuid() {
    return 8310044564178881101L;
  }
}
