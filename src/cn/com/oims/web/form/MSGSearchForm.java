package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class MSGSearchForm {
  private String sender;
  
  private String receiver;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date startDate;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date endDate;
  
  private String user;
  
  public String getSender() {
    return this.sender;
  }
  
  public void setSender(String sender) {
    this.sender = sender;
  }
  
  public String getReceiver() {
    return this.receiver;
  }
  
  public void setReceiver(String receiver) {
    this.receiver = receiver;
  }
  
  public Date getStartDate() {
    return this.startDate;
  }
  
  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }
  
  public Date getEndDate() {
    return this.endDate;
  }
  
  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }
  
  public String getUser() {
    return this.user;
  }
  
  public void setUser(String user) {
    this.user = user;
  }
}
