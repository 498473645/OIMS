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
@Table(name = "emr_lis_jixm_sample")
public class EMRLisJcxmSample implements Serializable {
  private static final long serialVersionUID = 3681833863946944569L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_lis_jixm_sample_sequence")
  @SequenceGenerator(name = "emr_lis_jixm_sample_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_lis_jixm_sample_sequence")
  private Integer id;
  
  @Column(name = "jcxm_id")
  private Integer jcxmId;
  
  @Column(name = "sample_id")
  private Integer sampleId;
  
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
  
  public Integer getSampleId() {
    return this.sampleId;
  }
  
  public void setSampleId(Integer sampleId) {
    this.sampleId = sampleId;
  }
  
  public int getOrderNum() {
    return this.orderNum;
  }
  
  public void setOrderNum(int orderNum) {
    this.orderNum = orderNum;
  }
}
