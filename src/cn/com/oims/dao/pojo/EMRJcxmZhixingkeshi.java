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
@Table(name = "emr_jcxm_zhixingkeshi")
public class EMRJcxmZhixingkeshi implements Serializable {
  private static final long serialVersionUID = -8776444710962519850L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_jcxm_zhixingkeshi_sequence")
  @SequenceGenerator(name = "emr_jcxm_zhixingkeshi_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_jcxm_zhixingkeshi_sequence")
  private Integer id;
  
  @Column(name = "jcxm_id")
  private Integer jcxmId;
  
  @Column(name = "bgs_id")
  private Integer bgsId;
  
  @Column(name = "order_num")
  private int orderNum;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(Integer jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  public Integer getBgsId() {
    return this.bgsId;
  }
  
  public void setBgsId(Integer bgsId) {
    this.bgsId = bgsId;
  }
  
  public int getOrderNum() {
    return this.orderNum;
  }
  
  public void setOrderNum(int orderNum) {
    this.orderNum = orderNum;
  }
}
