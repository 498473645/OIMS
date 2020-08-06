package cn.com.oims.web.form;

public class UserLoginForm {
  private String input;
  
  private String pwd;
  
  private int loginType;
  
  private String ip;
  
  public String getInput() {
    return this.input;
  }
  
  public void setInput(String input) {
    this.input = input;
  }
  
  public String getPwd() {
    return this.pwd;
  }
  
  public void setPwd(String pwd) {
    this.pwd = pwd;
  }
  
  public int getLoginType() {
    return this.loginType;
  }
  
  public String getIp() {
    return this.ip;
  }
  
  public void setIp(String ip) {
    this.ip = ip;
  }
  
  public void setLoginType(int loginType) {
    this.loginType = loginType;
  }
}
