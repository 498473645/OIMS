package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class FixedAssetsForm {
  private Integer id;
  
  private Integer category;
  
  private String name;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date purchaseOrderDate;
  
  private String flowerNo;
  
  private String sn;
  
  private String infomation;
  
  private String voucher;
  
  private String voucherNo;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date setupDate;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date nextMaintenanceDate;
  
  private boolean scrapFlag;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date scrapDate;
  
  private String operator;
  
  private String local;
  
  private Integer deptId;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date expireDate;
  
  private String manufacturer;
  
  private String contacts;
  
  private String mail;
  
  private String tel;
  
  private String fax;
  
  private String mobile;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Date getPurchaseOrderDate() {
    return this.purchaseOrderDate;
  }
  
  public void setPurchaseOrderDate(Date purchaseOrderDate) {
    this.purchaseOrderDate = purchaseOrderDate;
  }
  
  public String getFlowerNo() {
    return this.flowerNo;
  }
  
  public void setFlowerNo(String flowerNo) {
    this.flowerNo = flowerNo;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getSn() {
    return this.sn;
  }
  
  public void setSn(String sn) {
    this.sn = sn;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public String getVoucher() {
    return this.voucher;
  }
  
  public void setVoucher(String voucher) {
    this.voucher = voucher;
  }
  
  public String getVoucherNo() {
    return this.voucherNo;
  }
  
  public void setVoucherNo(String voucherNo) {
    this.voucherNo = voucherNo;
  }
  
  public Date getSetupDate() {
    return this.setupDate;
  }
  
  public void setSetupDate(Date setupDate) {
    this.setupDate = setupDate;
  }
  
  public Date getNextMaintenanceDate() {
    return this.nextMaintenanceDate;
  }
  
  public void setNextMaintenanceDate(Date nextMaintenanceDate) {
    this.nextMaintenanceDate = nextMaintenanceDate;
  }
  
  public boolean isScrapFlag() {
    return this.scrapFlag;
  }
  
  public void setScrapFlag(boolean scrapFlag) {
    this.scrapFlag = scrapFlag;
  }
  
  public Date getScrapDate() {
    return this.scrapDate;
  }
  
  public void setScrapDate(Date scrapDate) {
    this.scrapDate = scrapDate;
  }
  
  public String getOperator() {
    return this.operator;
  }
  
  public void setOperator(String operator) {
    this.operator = operator;
  }
  
  public String getLocal() {
    return this.local;
  }
  
  public void setLocal(String local) {
    this.local = local;
  }
  
  public Integer getDeptId() {
    return this.deptId;
  }
  
  public void setDeptId(Integer deptId) {
    this.deptId = deptId;
  }
  
  public Date getExpireDate() {
    return this.expireDate;
  }
  
  public void setExpireDate(Date expireDate) {
    this.expireDate = expireDate;
  }
  
  public String getManufacturer() {
    return this.manufacturer;
  }
  
  public void setManufacturer(String manufacturer) {
    this.manufacturer = manufacturer;
  }
  
  public String getContacts() {
    return this.contacts;
  }
  
  public void setContacts(String contacts) {
    this.contacts = contacts;
  }
  
  public String getMail() {
    return this.mail;
  }
  
  public void setMail(String mail) {
    this.mail = mail;
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
  
  public String getMobile() {
    return this.mobile;
  }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
}
