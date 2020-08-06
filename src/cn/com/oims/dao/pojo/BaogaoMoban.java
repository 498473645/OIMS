package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "baogao_moban")
public class BaogaoMoban implements Serializable {
  private static final long serialVersionUID = -4321069125547933354L;
  
  private Long id;
  
  private String biaoti;
  
  private String moban;
  
  private Integer jibie;
  
  private Integer bumenId;
  
  private String gonghao;
  
  private Integer categoryId;
  
  private String jcxmIds;
  
  private String url;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "baogao_moban_sequence")
  @SequenceGenerator(name = "baogao_moban_sequence", allocationSize = 1, initialValue = 1, sequenceName = "baogao_moban_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(length = 50)
  public String getBiaoti() {
    return this.biaoti;
  }
  
  public void setBiaoti(String biaoti) {
    this.biaoti = biaoti;
  }
  
  @Lob
  @Column(length = 16777215)
  public String getMoban() {
    return this.moban;
  }
  
  public void setMoban(String moban) {
    this.moban = moban;
  }
  
  public Integer getJibie() {
    return this.jibie;
  }
  
  public void setJibie(Integer jibie) {
    this.jibie = jibie;
  }
  
  @Column(length = 30)
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public String getUrl() {
    return this.url;
  }
  
  public void setUrl(String url) {
    this.url = url;
  }
  
  @Column(name = "bumen_id")
  public Integer getBumenId() {
    return this.bumenId;
  }
  
  public void setBumenId(Integer bumenId) {
    this.bumenId = bumenId;
  }
  
  @Column(name = "category_id")
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }
  
  @Column(name = "jcxm_ids")
  public String getJcxmIds() {
    return this.jcxmIds;
  }
  
  public void setJcxmIds(String jcxmIds) {
    this.jcxmIds = jcxmIds;
  }
}
