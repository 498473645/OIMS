package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "emr_taocanXM")
public class EMRTaocanXM implements Serializable {
  private static final long serialVersionUID = -6352079762732772657L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_taocan_xm_sequence")
  @SequenceGenerator(name = "emr_taocan_xm_sequence", sequenceName = "emr_taocan_xm_sequence")
  private Integer id;
  
  @Index(name = "taocanId")
  @Column(name = "taocan_id")
  private Integer taocanId;
  
  @Column(name = "xiangmu_type")
  private Integer xmType;
  
  @Index(name = "xmId")
  @Column(name = "xiangmu_id")
  private Integer xmId;
  
  @Column(name = "yanbiebiaoben")
  private Integer yanbiebiaoben;
  
  private Float shuliang;
  
  @Column(name = "excutive_dept")
  private Integer excutiveDept;
  
  @Transient
  private Jcxm jcxm;
  
  @Transient
  private List<EMRTaocanXMMX> tcxmmx;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getTaocanId() {
    return this.taocanId;
  }
  
  public void setTaocanId(Integer taocanId) {
    this.taocanId = taocanId;
  }
  
  public Integer getXmType() {
    return this.xmType;
  }
  
  public void setXmType(Integer xmType) {
    this.xmType = xmType;
  }
  
  public Integer getXmId() {
    return this.xmId;
  }
  
  public void setXmId(Integer xmId) {
    this.xmId = xmId;
  }
  
  public Float getShuliang() {
    return this.shuliang;
  }
  
  public void setShuliang(Float shuliang) {
    this.shuliang = shuliang;
  }
  
  public List<EMRTaocanXMMX> getTcxmmx() {
    return this.tcxmmx;
  }
  
  public void setTcxmmx(List<EMRTaocanXMMX> tcxmmx) {
    this.tcxmmx = tcxmmx;
  }
  
  public Integer getExcutiveDept() {
    return this.excutiveDept;
  }
  
  public void setExcutiveDept(Integer excutiveDept) {
    this.excutiveDept = excutiveDept;
  }
  
  public Integer getYanbiebiaoben() {
    return this.yanbiebiaoben;
  }
  
  public void setYanbiebiaoben(Integer yanbiebiaoben) {
    this.yanbiebiaoben = yanbiebiaoben;
  }
  
  public Jcxm getJcxm() {
    return this.jcxm;
  }
  
  public void setJcxm(Jcxm jcxm) {
    this.jcxm = jcxm;
  }
}
