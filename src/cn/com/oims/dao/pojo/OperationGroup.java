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
@Table(name = "operation_group")
public class OperationGroup {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "operation_group_sequence")
  @SequenceGenerator(name = "operation_group_sequence", allocationSize = 1, initialValue = 1, sequenceName = "operation_group_sequence")
  private Integer id;
  
  @Column(nullable = false, length = 30)
  private String name;
  
  @Column(length = 2000)
  private String infomation;
  
  @Column(length = 2000)
  private String note;
  
  @Column(length = 30)
  private String manager;
  
  @Column(name = "insert_user", length = 30, nullable = false)
  private String insertUser;
  
  @Column(name = "update_user", length = 30)
  private String updateUser;
  
  @Column(name = "insert_date", nullable = false)
  private Date insertDate;
  
  @Column(name = "update_date")
  private Date updateDate;
  
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
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getManager() {
    return this.manager;
  }
  
  public void setManager(String manager) {
    this.manager = manager;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public String getUpdateUser() {
    return this.updateUser;
  }
  
  public void setUpdateUser(String updateUser) {
    this.updateUser = updateUser;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public Date getUpdateDate() {
    return this.updateDate;
  }
  
  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }
}
