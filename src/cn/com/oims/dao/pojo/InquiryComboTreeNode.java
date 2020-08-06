package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "inquiry_comboTreeNode")
public class InquiryComboTreeNode {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inquiry_combotreenode_sequence")
  @SequenceGenerator(name = "inquiry_combotreenode_sequence", allocationSize = 1, initialValue = 1, sequenceName = "inquiry_combotreenode_sequence")
  private Integer id;
  
  private Integer pid;
  
  @Column(name = "name")
  private String text;
  
  @Column(name = "category_id")
  private Integer categoryId;
  
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getPid() {
    return this.pid;
  }
  
  public void setPid(Integer pid) {
    this.pid = pid;
  }
  
  public String getText() {
    return this.text;
  }
  
  public void setText(String text) {
    this.text = text;
  }
}
