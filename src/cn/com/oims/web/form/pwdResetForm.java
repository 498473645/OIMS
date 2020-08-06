package cn.com.oims.web.form;

public class pwdResetForm {
  private String uid;
  
  private String oldPwd;
  
  private String newPwd;
  
  private String confirmPwd;
  
  public String getUid() {
    return this.uid;
  }
  
  public void setUid(String uid) {
    this.uid = uid;
  }
  
  public String getOldPwd() {
    return this.oldPwd;
  }
  
  public void setOldPwd(String oldPwd) {
    this.oldPwd = oldPwd;
  }
  
  public String getNewPwd() {
    return this.newPwd;
  }
  
  public void setNewPwd(String newPwd) {
    this.newPwd = newPwd;
  }
  
  public String getConfirmPwd() {
    return this.confirmPwd;
  }
  
  public void setConfirmPwd(String confirmPwd) {
    this.confirmPwd = confirmPwd;
  }
}
