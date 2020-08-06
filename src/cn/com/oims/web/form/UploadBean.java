package cn.com.oims.web.form;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class UploadBean {
  private CommonsMultipartFile filedata;
  
  private String name;
  
  public CommonsMultipartFile getFiledata() {
    return this.filedata;
  }
  
  public void setFiledata(CommonsMultipartFile filedata) {
    this.filedata = filedata;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
}
