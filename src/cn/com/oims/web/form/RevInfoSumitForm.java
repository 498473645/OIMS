package cn.com.oims.web.form;

import java.io.Serializable;

public class RevInfoSumitForm implements Serializable {
  private static final long serialVersionUID = 3626963342338219144L;
  
  private Long jcdId;
  
  private String eyeType;
  
  private Integer jcxmId;
  
  private String revdt;
  
  private String timeFlag;
  
  private Long huanzheId;
  
  private Long jiuzhenId;
  
  private Long revInfoId;
  
  private Long revProjId;
  
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public String getEyeType() {
    return this.eyeType;
  }
  
  public void setEyeType(String eyeType) {
    this.eyeType = eyeType;
  }
  
  public Integer getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(Integer jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  public String getRevdt() {
    return this.revdt;
  }
  
  public void setRevdt(String revdt) {
    this.revdt = revdt;
  }
  
  public String getTimeFlag() {
    return this.timeFlag;
  }
  
  public void setTimeFlag(String timeFlag) {
    this.timeFlag = timeFlag;
  }
  
  public Long getHuanzheId() {
    return this.huanzheId;
  }
  
  public void setHuanzheId(Long huanzheId) {
    this.huanzheId = huanzheId;
  }
  
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  public Long getRevInfoId() {
    return this.revInfoId;
  }
  
  public void setRevInfoId(Long revInfoId) {
    this.revInfoId = revInfoId;
  }
  
  public Long getRevProjId() {
    return this.revProjId;
  }
  
  public void setRevProjId(Long revProjId) {
    this.revProjId = revProjId;
  }
}
