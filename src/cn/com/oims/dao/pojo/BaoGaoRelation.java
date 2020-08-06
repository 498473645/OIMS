package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "BaoGao_Relation")
public class BaoGaoRelation {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BaoGao_Relation_sequence")
  @SequenceGenerator(name = "BaoGao_Relation_sequence", allocationSize = 1, initialValue = 1, sequenceName = "BaoGao_Relation_sequence")
  private Long id;
  
  @Column(name = "class_name")
  private String className;
  
  @Column(name = "bg_id")
  private Long bgId;
  
  @Column(name = "jcd_id")
  private Long jcdId;
  
  @Column(name = "jcxm_id")
  private String jcxmId;
  
  private Integer state;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  @Column(name = "insert_user", length = 30)
  private String insertUser;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getClassName() {
    return this.className;
  }
  
  public void setClassName(String className) {
    this.className = className;
  }
  
  public Long getBgId() {
    return this.bgId;
  }
  
  public void setBgId(Long bgId) {
    this.bgId = bgId;
  }
  
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public int getState() {
    return this.state.intValue();
  }
  
  public void setState(int state) {
    this.state = Integer.valueOf(state);
  }
  
  public String getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(String jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
}
