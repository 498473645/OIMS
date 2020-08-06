package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "jzjl")
public class Jzjl implements Serializable {
  private static final long serialVersionUID = -73056672135517604L;
  
  private Long id;
  
  private Long jiuzhenId;
  
  private Integer categoryId;
  
  private String jilu;
  
  private String jlren;
  
  private Date jlTime;
  
  private String picPath;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jzjl_sequence")
  @SequenceGenerator(name = "jzjl_sequence", allocationSize = 1, initialValue = 1, sequenceName = "jzjl_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(name = "jiuzhen_id")
  @Index(name = "index_jzjl_jiuzhenId")
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  @Column(name = "category_id")
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  @Lob
  public String getJilu() {
    return this.jilu;
  }
  
  public void setJilu(String jilu) {
    this.jilu = jilu;
  }
  
  public String getJlren() {
    return this.jlren;
  }
  
  public void setJlren(String jlren) {
    this.jlren = jlren;
  }
  
  @Column(name = "jl_time")
  public Date getJlTime() {
    return this.jlTime;
  }
  
  public void setJlTime(Date jlTime) {
    this.jlTime = jlTime;
  }
  
  @Column(name = "pic_url")
  public String getPicPath() {
    return this.picPath;
  }
  
  public void setPicPath(String picPath) {
    this.picPath = picPath;
  }
}
