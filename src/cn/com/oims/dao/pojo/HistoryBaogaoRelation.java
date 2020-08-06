package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "history_baogaorelation")
public class HistoryBaogaoRelation {
  @Id
  private int id;
  
  @Column(name = "table_name")
  private String tableName;
  
  @Column(name = "jcxm_Name")
  private String jcxmName;
  
  @Column(name = "patient_Id")
  private String patientId;
  
  @Column(name = "table_Date")
  private String tableDate;
  
  private String url;
  
  @Column(name = "jcxm_ids")
  private String jcxmIds;
  
  public int getId() {
    return this.id;
  }
  
  public void setId(int id) {
    this.id = id;
  }
  
  public String getTableName() {
    return this.tableName;
  }
  
  public void setTableName(String tableName) {
    this.tableName = tableName;
  }
  
  public String getJcxmName() {
    return this.jcxmName;
  }
  
  public void setJcxmName(String jcxmName) {
    this.jcxmName = jcxmName;
  }
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  public String getTableDate() {
    return this.tableDate;
  }
  
  public void setTableDate(String tableDate) {
    this.tableDate = tableDate;
  }
  
  public String getUrl() {
    return this.url;
  }
  
  public void setUrl(String url) {
    this.url = url;
  }
  
  public String getJcxmIds() {
    return this.jcxmIds;
  }
  
  public void setJcxmIds(String jcxmIds) {
    this.jcxmIds = jcxmIds;
  }
}
