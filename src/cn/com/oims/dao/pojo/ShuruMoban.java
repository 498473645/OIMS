package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "shuru_moban")
public class ShuruMoban implements Serializable {
  private static final long serialVersionUID = 3026048182333965752L;
  
  private Long id;
  
  private String shuru;
  
  private String suoyin;
  
  private Integer bmId;
  
  private Integer jibie;
  
  private Integer categoryId;
  
  private Integer jcxmId;
  
  private Date addTime;
  
  private String gonghao;
  
  private String pinyin;
  
  @Column(name = "treenodeid")
  private Integer treeNodeId;
  
  public Integer getTreeNodeId() {
    return this.treeNodeId;
  }
  
  public void setTreeNodeId(Integer treeNodeId) {
    this.treeNodeId = treeNodeId;
  }
  
  public String getPinyin() {
    return this.pinyin;
  }
  
  public void setPinyin(String pinyin) {
    this.pinyin = pinyin;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shuru_moban_sequence")
  @SequenceGenerator(name = "shuru_moban_sequence", allocationSize = 1, initialValue = 1, sequenceName = "shuru_moban_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getShuru() {
    return this.shuru;
  }
  
  public void setShuru(String shuru) {
    this.shuru = shuru;
  }
  
  public String getSuoyin() {
    return this.suoyin;
  }
  
  public void setSuoyin(String suoyin) {
    this.suoyin = suoyin;
  }
  
  @Column(name = "bm_id")
  public Integer getBmId() {
    return this.bmId;
  }
  
  public void setBmId(Integer bmId) {
    this.bmId = bmId;
  }
  
  public Integer getJibie() {
    return this.jibie;
  }
  
  public void setJibie(Integer jibie) {
    this.jibie = jibie;
  }
  
  @Column(name = "category_id")
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  @Column(name = "jcxm_id")
  public Integer getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(Integer jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  @Column(name = "add_time")
  public Date getAddTime() {
    return this.addTime;
  }
  
  public void setAddTime(Date addTime) {
    this.addTime = addTime;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
}
