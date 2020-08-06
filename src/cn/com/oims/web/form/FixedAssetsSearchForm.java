package cn.com.oims.web.form;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class FixedAssetsSearchForm {
  private Integer id;
  
  private String search;
  
  private String name;
  
  private Integer category;
  
  private String guige;
  
  private String xinghao;
  
  private String danwei;
  
  private Float price;
  
  private Integer num;
  
  private Float money;
  
  private String department;
  
  private String userDepartment;
  
  private String yongtu;
  
  private String detalieduse;
  
  private String local;
  
  private String infomation;
  
  private Float priceMin;
  
  private Float priceMax;
  
  private Integer deptId;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date purchaseOrderDateStart;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date purchaseOrderDateEnd;
  
  private String flowerNo;
  
  private String sn;
  
  private String voucherNo;
  
  private String operator;
  
  private String manufacturer;
  
  private String contacts;
  
  private String mail;
  
  private String tel;
  
  private String fax;
  
  private String mobile;
  
  private String supplier;
  
  private String supporter;
  
  private String supporttel;
  
  private String supportmobile;
  
  private String supportmail;
  
  private String supportfax;
  
  private Boolean scrapFlag;
  
  private Integer sysm;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date nextMaintenanceDate;
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public Float getPriceMin() {
    return this.priceMin;
  }
  
  public void setPriceMin(Float priceMin) {
    this.priceMin = priceMin;
  }
  
  public Float getPriceMax() {
    return this.priceMax;
  }
  
  public void setPriceMax(Float priceMax) {
    this.priceMax = priceMax;
  }
  
  public Integer getDeptId() {
    return this.deptId;
  }
  
  public void setDeptId(Integer deptId) {
    this.deptId = deptId;
  }
  
  public Date getPurchaseOrderDateStart() {
    return this.purchaseOrderDateStart;
  }
  
  public void setPurchaseOrderDateStart(Date purchaseOrderDateStart) {
    this.purchaseOrderDateStart = purchaseOrderDateStart;
  }
  
  public Date getPurchaseOrderDateEnd() {
    return this.purchaseOrderDateEnd;
  }
  
  public void setPurchaseOrderDateEnd(Date purchaseOrderDateEnd) {
    this.purchaseOrderDateEnd = purchaseOrderDateEnd;
  }
  
  public String getFlowerNo() {
    return this.flowerNo;
  }
  
  public void setFlowerNo(String flowerNo) {
    this.flowerNo = flowerNo;
  }
  
  public String getSn() {
    return this.sn;
  }
  
  public void setSn(String sn) {
    this.sn = sn;
  }
  
  public String getVoucherNo() {
    return this.voucherNo;
  }
  
  public void setVoucherNo(String voucherNo) {
    this.voucherNo = voucherNo;
  }
  
  public String getOperator() {
    return this.operator;
  }
  
  public void setOperator(String operator) {
    this.operator = operator;
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
  
  public Boolean getScrapFlag() {
    return this.scrapFlag;
  }
  
  public void setScrapFlag(Boolean scrapFlag) {
    this.scrapFlag = scrapFlag;
  }
  
  public Date getNextMaintenanceDate() {
    return this.nextMaintenanceDate;
  }
  
  public void setNextMaintenanceDate(Date nextMaintenanceDate) {
    this.nextMaintenanceDate = nextMaintenanceDate;
  }
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    this.search = search;
  }
  
  public Integer getCategory() {
    return this.category;
  }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
  
  public String getGuige() {
    return this.guige;
  }
  
  public void setGuige(String guige) {
    this.guige = guige;
  }
  
  public String getXinghao() {
    return this.xinghao;
  }
  
  public void setXinghao(String xinghao) {
    this.xinghao = xinghao;
  }
  
  public String getDanwei() {
    return this.danwei;
  }
  
  public void setDanwei(String danwei) {
    this.danwei = danwei;
  }
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public Integer getNum() {
    return this.num;
  }
  
  public void setNum(Integer num) {
    this.num = num;
  }
  
  public Float getMoney() {
    return this.money;
  }
  
  public void setMoney(Float money) {
    this.money = money;
  }
  
  public String getDepartment() {
    return this.department;
  }
  
  public void setDepartment(String department) {
    this.department = department;
  }
  
  public String getUserDepartment() {
    return this.userDepartment;
  }
  
  public void setUserDepartment(String userDepartment) {
    this.userDepartment = userDepartment;
  }
  
  public String getYongtu() {
    return this.yongtu;
  }
  
  public void setYongtu(String yongtu) {
    this.yongtu = yongtu;
  }
  
  public String getDetalieduse() {
    return this.detalieduse;
  }
  
  public void setDetalieduse(String detalieduse) {
    this.detalieduse = detalieduse;
  }
  
  public String getLocal() {
    return this.local;
  }
  
  public void setLocal(String local) {
    this.local = local;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getSupplier() {
    return this.supplier;
  }
  
  public void setSupplier(String supplier) {
    this.supplier = supplier;
  }
  
  public String getSupporter() {
    return this.supporter;
  }
  
  public void setSupporter(String supporter) {
    this.supporter = supporter;
  }
  
  public String getSupporttel() {
    return this.supporttel;
  }
  
  public void setSupporttel(String supporttel) {
    this.supporttel = supporttel;
  }
  
  public String getSupportmobile() {
    return this.supportmobile;
  }
  
  public void setSupportmobile(String supportmobile) {
    this.supportmobile = supportmobile;
  }
  
  public String getSupportmail() {
    return this.supportmail;
  }
  
  public void setSupportmail(String supportmail) {
    this.supportmail = supportmail;
  }
  
  public String getSupportfax() {
    return this.supportfax;
  }
  
  public void setSupportfax(String supportfax) {
    this.supportfax = supportfax;
  }
  
  public Integer getSysm() {
    return this.sysm;
  }
  
  public void setSysm(Integer sysm) {
    this.sysm = sysm;
  }
}
