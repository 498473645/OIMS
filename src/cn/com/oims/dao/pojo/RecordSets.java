package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "recordsets")
public class RecordSets {
  private Integer id;
  
  private String name;
  
  private Integer level;
  
  private Integer diseaseid;
  
  private String operator;
  
  private Integer bmId;
  
  @Column(name = "bm_id")
  public Integer getBmId() {
    return this.bmId;
  }
  
  public void setBmId(Integer bmId) {
    this.bmId = bmId;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recordsets_sequence")
  @SequenceGenerator(name = "recordsets_sequence", allocationSize = 1, initialValue = 1, sequenceName = "recordsets_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public Integer getLevel() {
    return this.level;
  }
  
  public void setLevel(Integer level) {
    this.level = level;
  }
  
  public Integer getDiseaseid() {
    return this.diseaseid;
  }
  
  public void setDiseaseid(Integer diseaseid) {
    this.diseaseid = diseaseid;
  }
  
  public String getOperator() {
    return this.operator;
  }
  
  public void setOperator(String operator) {
    this.operator = operator;
  }
}
