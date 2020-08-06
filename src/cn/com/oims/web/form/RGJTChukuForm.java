package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class RGJTChukuForm {
  private Long id;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date expectedDate;
  
  private String title;
  
  private String note;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Date getExpectedDate() {
    return this.expectedDate;
  }
  
  public void setExpectedDate(Date expectedDate) {
    this.expectedDate = expectedDate;
  }
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
}
