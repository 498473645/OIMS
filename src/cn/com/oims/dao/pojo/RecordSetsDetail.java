package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "recordsetsdetail")
public class RecordSetsDetail {
  private Integer id;
  
  private Integer recordsetsId;
  
  private Integer categoryId;
  
  private String content;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recordsetsdetail_sequence")
  @SequenceGenerator(name = "recordsetsdetail_sequence", allocationSize = 1, initialValue = 1, sequenceName = "recordsetsdetail_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  @Column(name = "recordsets_id")
  public Integer getRecordsetsId() {
    return this.recordsetsId;
  }
  
  public void setRecordsetsId(Integer recordsetsId) {
    this.recordsetsId = recordsetsId;
  }
  
  @Column(name = "category_id")
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getContent() {
    return this.content;
  }
  
  public void setContent(String content) {
    this.content = content;
  }
}
