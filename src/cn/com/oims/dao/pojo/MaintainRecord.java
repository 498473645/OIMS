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
@Table(name = "maintain_record")
public class MaintainRecord implements Serializable {
  private static final long serialVersionUID = 1785246401344845088L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "maintain_record_sequence")
  @SequenceGenerator(name = "maintain_record_sequence", allocationSize = 1, initialValue = 1, sequenceName = "maintain_record_sequence")
  private Long id;
  
  @Column(name = "fixed_assets_id")
  private Integer fixedAssetsId;
  
  private String maintenance;
  
  private String mobile;
  
  private String tel;
  
  private String email;
  
  @Column(name = "maintain_type")
  private int maintainType;
  
  @Column(name = "maintain_date")
  private Date maintainDate;
  
  private String note;
  
  @Column(name = "input_user")
  private String inputUser;
  
  @Column(name = "input_date")
  private Date inputDate;
  
  @Column(name = "update_user")
  private String updateUser;
  
  @Column(name = "update_date")
  private Date updateDate;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Integer getFixedAssetsId() {
    return this.fixedAssetsId;
  }
  
  public void setFixedAssetsId(Integer fixedAssetsId) {
    this.fixedAssetsId = fixedAssetsId;
  }
  
  public String getMaintenance() {
    return this.maintenance;
  }
  
  public void setMaintenance(String maintenance) {
    this.maintenance = maintenance;
  }
  
  public Date getMaintainDate() {
    return this.maintainDate;
  }
  
  public void setMaintainDate(Date maintainDate) {
    this.maintainDate = maintainDate;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public String getMobile() {
    return this.mobile;
  }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public String getTel() {
    return this.tel;
  }
  
  public void setTel(String tel) {
    this.tel = tel;
  }
  
  public String getEmail() {
    return this.email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public int getMaintainType() {
    return this.maintainType;
  }
  
  public void setMaintainType(int maintainType) {
    this.maintainType = maintainType;
  }
  
  public String getInputUser() {
    return this.inputUser;
  }
  
  public void setInputUser(String inputUser) {
    this.inputUser = inputUser;
  }
  
  public Date getInputDate() {
    return this.inputDate;
  }
  
  public void setInputDate(Date inputDate) {
    this.inputDate = inputDate;
  }
  
  public String getUpdateUser() {
    return this.updateUser;
  }
  
  public void setUpdateUser(String updateUser) {
    this.updateUser = updateUser;
  }
  
  public Date getUpdateDate() {
    return this.updateDate;
  }
  
  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }
}
