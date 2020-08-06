package cn.com.oims.web.form;

public class QuanXianConfigForm {
  private String uid;
  
  private String jiaose;
  
  private String[] quanxian;
  
  private Integer jiaoseId;
  
  public String getUid() {
    return this.uid;
  }
  
  public void setUid(String uid) {
    this.uid = uid;
  }
  
  public String getJiaose() {
    return this.jiaose;
  }
  
  public void setJiaose(String jiaose) {
    this.jiaose = jiaose;
  }
  
  public String[] getQuanxian() {
    return this.quanxian;
  }
  
  public void setQuanxian(String[] quanxian) {
    this.quanxian = quanxian;
  }
  
  public Integer getJiaoseId() {
    return this.jiaoseId;
  }
  
  public void setJiaoseId(Integer jiaoseId) {
    this.jiaoseId = jiaoseId;
  }
}
