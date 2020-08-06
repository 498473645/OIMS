package cn.com.oims.web.form;

import com.codesnet.common.MultiUtils;
import java.util.Calendar;
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class OperationConsumableSearchForm {
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date startDate;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date endDate;
  
  private Boolean used;
  
  private String consumable_name;
  
  public String getConsumable_name() {
    return this.consumable_name;
  }
  
  public void setConsumable_name(String consumable_name) {
    this.consumable_name = consumable_name;
  }
  
  public Date getStartDate() {
    return this.startDate;
  }
  
  public void setStartDate(Date startDate) {
    if (startDate == null) {
      Calendar cal = Calendar.getInstance();
      cal.set(5, 1);
      cal.set(10, 0);
      cal.set(12, 0);
      cal.set(13, 0);
      cal.set(14, 0);
      startDate = cal.getTime();
    } 
    this.startDate = startDate;
  }
  
  public Date getEndDate() {
    return this.endDate;
  }
  
  public void setEndDate(Date endDate) {
    if (endDate == null) {
      endDate = new Date();
    } else {
      endDate = MultiUtils.getEndTimeOfDay(endDate);
    } 
    this.endDate = endDate;
  }
  
  public Boolean getUsed() {
    return this.used;
  }
  
  public void setUsed(Boolean used) {
    this.used = used;
  }
}
