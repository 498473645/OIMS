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
@Table(name = "on_duty")
public class OnDuty implements Serializable {
  private static final long serialVersionUID = -4463023286836943979L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "on_duty_sequence")
  @SequenceGenerator(name = "on_duty_sequence", allocationSize = 1, initialValue = 1, sequenceName = "on_duty_sequence")
  private Long id;
  
  @Column(name = "on_duty_date")
  private Date onDutyDate;
  
  private boolean forenoon;
  
  private boolean afternoon;
  
  private boolean night;
  
  @Column(name = "office_id")
  private int officeId;
  
  @Column(name = "work_no")
  private String workNo;
  
  @Column(name = "order_no")
  private int orderNo;
  
  @Column(name = "insert_user")
  private String insertUser;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getOnDutyDate() {
    return this.onDutyDate;
  }
  
  public void setOnDutyDate(Date onDutyDate) {
    this.onDutyDate = onDutyDate;
  }
  
  public boolean isForenoon() {
    return this.forenoon;
  }
  
  public void setForenoon(boolean forenoon) {
    this.forenoon = forenoon;
  }
  
  public boolean isAfternoon() {
    return this.afternoon;
  }
  
  public void setAfternoon(boolean afternoon) {
    this.afternoon = afternoon;
  }
  
  public boolean isNight() {
    return this.night;
  }
  
  public void setNight(boolean night) {
    this.night = night;
  }
  
  public int getOfficeId() {
    return this.officeId;
  }
  
  public void setOfficeId(int officeId) {
    this.officeId = officeId;
  }
  
  public String getWorkNo() {
    return this.workNo;
  }
  
  public void setWorkNo(String workNo) {
    this.workNo = workNo;
  }
  
  public int getOrderNo() {
    return this.orderNo;
  }
  
  public void setOrderNo(int orderNo) {
    this.orderNo = orderNo;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
}
