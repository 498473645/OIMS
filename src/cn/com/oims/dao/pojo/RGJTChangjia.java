package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "rgjt_changjia")
public class RGJTChangjia implements Serializable {
  private static final long serialVersionUID = -306203635938999187L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_changjia_sequence")
  @SequenceGenerator(name = "rgjt_changjia_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_changjia_sequence")
  private Integer id;
  
  private Integer location;
  
  @Column(nullable = false, length = 50)
  private String name;
  
  @Column(length = 2000)
  private String infomation;
  
  @Column(length = 200)
  private String address;
  
  @Column(length = 30)
  private String tel;
  
  @Column(length = 30)
  private String fax;
  
  @Column(length = 50)
  private String mail;
  
  @Column(length = 30)
  private String mobile;
  
  @Column(name = "zip_code", length = 30)
  private String zipCode;
  
  @Column(length = 30)
  private String contact;
  
  @Column(name = "input_code", nullable = false, length = 30)
  private String code;
  
  private Integer category;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getLocation() {
    return this.location;
  }
  
  public void setLocation(Integer location) {
    this.location = location;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public String getAddress() {
    return this.address;
  }
  
  public void setAddress(String address) {
    this.address = address;
  }
  
  public String getTel() {
    return this.tel;
  }
  
  public void setTel(String tel) {
    this.tel = tel;
  }
  
  public String getFax() {
    return this.fax;
  }
  
  public void setFax(String fax) {
    this.fax = fax;
  }
  
  public String getMail() {
    return this.mail;
  }
  
  public void setMail(String mail) {
    this.mail = mail;
  }
  
  public String getMobile() {
    return this.mobile;
  }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public String getZipCode() {
    return this.zipCode;
  }
  
  public void setZipCode(String zipCode) {
    this.zipCode = zipCode;
  }
  
  public String getContact() {
    return this.contact;
  }
  
  public void setContact(String contact) {
    this.contact = contact;
  }
  
  public String getCode() {
    return this.code;
  }
  
  public void setCode(String inputCode) {
    this.code = inputCode;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
}
