package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "emr_taocan_xmmx")
public class EMRTaocanXMMX implements Serializable {
  private static final long serialVersionUID = 8496794153601920222L;
  
  private Integer id;
  
  private Integer tcxmId;
  
  private Integer fsxmId;
  
  private Float shuliang;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_taocan_xmmx_sequence")
  @SequenceGenerator(name = "emr_taocan_xmmx_sequence", sequenceName = "emr_taocan_xmmx_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getTcxmId() {
    return this.tcxmId;
  }
  
  public void setTcxmId(Integer tcxmId) {
    this.tcxmId = tcxmId;
  }
  
  public Integer getFsxmId() {
    return this.fsxmId;
  }
  
  public void setFsxmId(Integer fsxmId) {
    this.fsxmId = fsxmId;
  }
  
  public Float getShuliang() {
    return this.shuliang;
  }
  
  public void setShuliang(Float shuliang) {
    this.shuliang = shuliang;
  }
}
