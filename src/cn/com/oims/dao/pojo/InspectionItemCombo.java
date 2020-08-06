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
@Table(name = "inspectionitem_combo")
public class InspectionItemCombo implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private Integer id;
  
  private String name;
  
  private Integer level;
  
  private Integer bmId;
  
  private String inspectionitemIds;
  
  private String operator;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inspectionitem_combo_sequence")
  @SequenceGenerator(name = "inspectionitem_combo_sequence", allocationSize = 1, initialValue = 1, sequenceName = "inspectionitem_combo_sequence")
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
  
  @Column(name = "bm_id")
  public Integer getBmId() {
    return this.bmId;
  }
  
  public void setBmId(Integer bmId) {
    this.bmId = bmId;
  }
  
  @Column(name = "inspectionitem_ids")
  public String getInspectionitemIds() {
    return this.inspectionitemIds;
  }
  
  public void setInspectionitemIds(String inspectionitemIds) {
    this.inspectionitemIds = inspectionitemIds;
  }
  
  public String getOperator() {
    return this.operator;
  }
  
  public void setOperator(String operator) {
    this.operator = operator;
  }
}
