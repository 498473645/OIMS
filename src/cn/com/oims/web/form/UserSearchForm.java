package cn.com.oims.web.form;

public class UserSearchForm {
  private String uid;
  
  private String gonghao;
  
  private String job;
  
  private String xingming;
  
  private Boolean online;
  
  public String getXingming() {
    return this.xingming;
  }
  
  public void setXingming(String xingming) {
    this.xingming = xingming;
  }
  
  public Boolean getOnline() {
    return this.online;
  }
  
  public void setOnline(Boolean online) {
    this.online = online;
  }
  
  public String getUid() {
    return this.uid;
  }
  
  public void setUid(String uid) {
    this.uid = uid;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public String getJob() {
    return this.job;
  }
  
  public void setJob(String job) {
    this.job = job;
  }
}
