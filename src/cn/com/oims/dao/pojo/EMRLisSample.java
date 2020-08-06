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
@Table(name = "emr_lis_sample")
public class EMRLisSample implements Serializable {
  private static final long serialVersionUID = 8803415258785483027L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_lis_sample_sequence")
  @SequenceGenerator(name = "emr_lis_sample_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_lis_sample_sequence")
  private Integer id;
  
  @Column(name = "sample_code", length = 50, nullable = false)
  private String sampleCode;
  
  @Column(name = "sample_name", length = 200, nullable = false)
  private String sampleName;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getSampleCode() {
    return this.sampleCode;
  }
  
  public void setSampleCode(String sampleCode) {
    this.sampleCode = sampleCode;
  }
  
  public String getSampleName() {
    return this.sampleName;
  }
  
  public void setSampleName(String sampleName) {
    this.sampleName = sampleName;
  }
}
