package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class RGJTCgsqdForm {
  private Long id;
  
  private String title;
  
  private Integer supplier;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date expectedDate;
  
  private String note;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public Date getExpectedDate() {
    return this.expectedDate;
  }
  
  public void setExpectedDate(Date expectedDate) {
    this.expectedDate = expectedDate;
  }
  
  public String getNote() {
    return this.note;
  }
  
  public void setNote(String note) {
    this.note = note;
  }
  
  public Integer getSupplier() {
    return this.supplier;
  }
  
  public void setSupplier(Integer supplier) {
    this.supplier = supplier;
  }
}
