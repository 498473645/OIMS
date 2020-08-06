package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "qg_lc")
public class Qglc {
  private Long id;
  
  private String blh;
  
  private Integer state;
  
  private Date startTime;
  
  private Date endTime;
  
  private String ssfs1;
  
  private String ssfs2;
  
  private String ssfs3;
  
  private Long bl_id;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qg_lc_sequence")
  @SequenceGenerator(name = "qg_lc_sequence", allocationSize = 1, initialValue = 1, sequenceName = "qg_lc_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getBlh() {
    return this.blh;
  }
  
  public void setBlh(String blh) {
    this.blh = blh;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
  
  public Date getStartTime() {
    return this.startTime;
  }
  
  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }
  
  public Date getEndTime() {
    return this.endTime;
  }
  
  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }
  
  public String getSsfs1() {
    return this.ssfs1;
  }
  
  public void setSsfs1(String ssfs1) {
    this.ssfs1 = ssfs1;
  }
  
  public String getSsfs2() {
    return this.ssfs2;
  }
  
  public void setSsfs2(String ssfs2) {
    this.ssfs2 = ssfs2;
  }
  
  public String getSsfs3() {
    return this.ssfs3;
  }
  
  public void setSsfs3(String ssfs3) {
    this.ssfs3 = ssfs3;
  }
  
  public Long getBl_id() {
    return this.bl_id;
  }
  
  public void setBl_id(Long bl_id) {
    this.bl_id = bl_id;
  }
}
