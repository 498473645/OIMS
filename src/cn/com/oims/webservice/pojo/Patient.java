package cn.com.oims.webservice.pojo;

import java.util.Date;
import javax.xml.bind.annotation.XmlType;

@XmlType
public class Patient {
  private String patientId;
  
  private String name;
  
  private String phonetic;
  
  private String sex;
  
  private String pid;
  
  private Date birthday;
  
  private String medicare;
  
  private String tel;
  
  private String mobile;
  
  private String address;
  
  private String birthPlace;
  
  private String identity;
  
  private String bedNo;
  
  public String getBirthPlace() {
    return this.birthPlace;
  }
  
  public void setBirthPlace(String birthPlace) {
    this.birthPlace = birthPlace;
  }
  
  public String getIdentity() {
    return this.identity;
  }
  
  public void setIdentity(String identity) {
    this.identity = identity;
  }
  
  public String getPatientId() {
    return this.patientId;
  }
  
  public void setPatientId(String patientId) {
    this.patientId = patientId;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getSex() {
    return this.sex;
  }
  
  public void setSex(String sex) {
    this.sex = sex;
  }
  
  public String getPid() {
    return this.pid;
  }
  
  public void setPid(String pid) {
    this.pid = pid;
  }
  
  public Date getBirthday() {
    return this.birthday;
  }
  
  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }
  
  public String getMedicare() {
    return this.medicare;
  }
  
  public void setMedicare(String medicare) {
    this.medicare = medicare;
  }
  
  public String getTel() {
    return this.tel;
  }
  
  public void setTel(String tel) {
    this.tel = tel;
  }
  
  public String getMobile() {
    return this.mobile;
  }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public String getAddress() {
    return this.address;
  }
  
  public void setAddress(String address) {
    this.address = address;
  }
  
  public String getPhonetic() {
    return this.phonetic;
  }
  
  public void setPhonetic(String phonetic) {
    this.phonetic = phonetic;
  }
  
  public String getBedNo() {
    return this.bedNo;
  }
  
  public void setBedNo(String bedNo) {
    this.bedNo = bedNo;
  }
}
