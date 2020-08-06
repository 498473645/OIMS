package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class MaintainRecordForm {
  private Long id;
  
  private Integer fixedAssetsId;
  
  private String maintenance;
  
  private String mobile;
  
  private String tel;
  
  private String email;
  
  private int maintainType;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date maintainDate;
  
  private String note;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date nextMaintenanceDate;
  
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
  
  public Date getNextMaintenanceDate() {
    return this.nextMaintenanceDate;
  }
  
  public void setNextMaintenanceDate(Date nextMaintenanceDate) {
    this.nextMaintenanceDate = nextMaintenanceDate;
  }
}
