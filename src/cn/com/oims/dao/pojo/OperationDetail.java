package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "emr_operation_details")
public class OperationDetail implements Serializable {
  private static final long serialVersionUID = 2233283187307149318L;
  
  @Id
  @Column(name = "operation_id", nullable = false)
  private Long operationId;
  
  @Id
  @Column(name = "eyes", nullable = false)
  private Integer eyes;
  
  @Id
  @Column(name = "operation_dict_id", nullable = false)
  private Integer operationDictId;
  
  @Column(name = "insert_user")
  private String insertUser;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  public OperationDetail() {}
  
  public OperationDetail(Long id2, Integer eye, Integer operationDictId2, String insertUser) {
    this.operationId = id2;
    this.eyes = eye;
    this.operationDictId = operationDictId2;
    this.insertDate = new Date();
    this.insertUser = insertUser;
  }
  
  public Long getOperationId() {
    return this.operationId;
  }
  
  public void setOperationId(Long operationId) {
    this.operationId = operationId;
  }
  
  public Integer getEyes() {
    return this.eyes;
  }
  
  public void setEyes(Integer eyes) {
    this.eyes = eyes;
  }
  
  public Integer getOperationDictId() {
    return this.operationDictId;
  }
  
  public void setOperationDictId(Integer operationDictId) {
    this.operationDictId = operationDictId;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insert_user) {
    this.insertUser = insert_user;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
}
