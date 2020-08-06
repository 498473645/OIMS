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
@Table(name = "emr_dayinmoban")
public class EMRDayinMoban implements Serializable {
  private static final long serialVersionUID = 6039743217645299246L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_dayinmoban_sequence")
  @SequenceGenerator(name = "emr_dayinmoban_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_dayinmoban_sequence")
  private Integer id;
  
  @Column(length = 100, nullable = false)
  private String title;
  
  @Column(length = 200, nullable = false)
  private String path;
  
  private boolean enable;
  
  private String gonghao;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  @Column(name = "bumen_id")
  private Integer bumeId;
  
  @Column(length = 3000)
  private String note;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public String getPath() {
    return this.path;
  }
  
  public void setPath(String path) {
    this.path = path;
  }
  
  public boolean isEnable() {
    return this.enable;
  }
  
  public void setEnable(boolean enable) {
    this.enable = enable;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public Integer getBumeId() {
    return this.bumeId;
  }
  
  public void setBumeId(Integer bumeId) {
    this.bumeId = bumeId;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
}
