package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "fixed_assets")
public class FixedAssets implements Serializable {
  private static final long serialVersionUID = -7218762538576656480L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "fixed_assets_sequence")
  @SequenceGenerator(name = "fixed_assets_sequence", allocationSize = 1, initialValue = 1, sequenceName = "fixed_assets_sequence")
  private Integer id;
  
  @Column(name = "flower_no")
  private String flowerNo;
  
  private String name;
  
  private String sn;
  
  private String infomation;
  
  private String voucher;
  
  @Column(name = "voucher_no")
  private String voucherNo;
  
  private String guige;
  
  private String xinghao;
  
  private String danwei;
  
  private Integer num;
  
  private Float money;
  
  private Float price;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  @Column(name = "purchase_order_date")
  private Date purchaseOrderDate;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  @Column(name = "setup_date")
  private Date setupDate;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  @Column(name = "next_maintenance_date")
  private Date nextMaintenanceDate;
  
  @Column(name = "scrap_flag")
  private boolean scrapFlag;
  
  private String state;
  
  private String yongtu;
  
  private String detalieduse;
  
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  @Column(name = "scrap_date")
  private Date scrapDate;
  
  private String operator;
  
  private String local;
  
  @Column(name = "dept_id")
  private Integer deptId;
  
  private String department;
  
  private String userDepartment;
  
  @Column(name = "input_user")
  private String inputUser;
  
  @Column(name = "input_date")
  private Date inputDate;
  
  @Column(name = "expire_date")
  private Date expireDate;
  
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
  
  @Column(name = "service_life")
  private Float serviceLife;
  
  @Column(name = "update_user")
  private String updateUser;
  
  @Column(name = "update_date")
  private Date updateDate;
  
  private Integer category;
  
  private String fixedcategory;
  
  private String engineer;
  
  private String engineertel;
  
  private String engineermobile;
  
  @Column(name = "maintenance_notice", length = 2000)
  private String maintenanceNotice;
  
  @Column(name = "maintain_frequence")
  private String maintainFrequence;
  
  public String getMaintainFrequence() {
    return this.maintainFrequence;
  }
  
  public void setMaintainFrequence(String maintainFrequence) {
    this.maintainFrequence = maintainFrequence;
  }
  
  public String getEngineer() {
    return this.engineer;
  }
  
  public void setEngineer(String engineer) {
    this.engineer = engineer;
  }
  
  public String getEngineertel() {
    return this.engineertel;
  }
  
  public void setEngineertel(String engineertel) {
    this.engineertel = engineertel;
  }
  
  public String getEngineermobile() {
    return this.engineermobile;
  }
  
  public void setEngineermobile(String engineermobile) {
    this.engineermobile = engineermobile;
  }
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
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
  
  public Float getPrice() {
    return this.price;
  }
  
  public void setPrice(Float price) {
    this.price = price;
  }
  
  public Date getPurchaseOrderDate() {
    return this.purchaseOrderDate;
  }
  
  public void setPurchaseOrderDate(Date purchaseOrderDate) {
    this.purchaseOrderDate = purchaseOrderDate;
  }
  
  public Date getSetupDate() {
    return this.setupDate;
  }
  
  public Date getNextMaintenanceDate() {
    return this.nextMaintenanceDate;
  }
  
  public void setNextMaintenanceDate(Date nextMaintenanceDate) {
    this.nextMaintenanceDate = nextMaintenanceDate;
  }
  
  public void setSetupDate(Date setupDate) {
    this.setupDate = setupDate;
  }
  
  public boolean isScrapFlag() {
    return this.scrapFlag;
  }
  
  public void setScrapFlag(boolean scrapFlag) {
    this.scrapFlag = scrapFlag;
  }
  
  public Date isScrapDate() {
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
  
  public String getInputUser() {
    return this.inputUser;
  }
  
  public void setInputUser(String inputUser) {
    this.inputUser = inputUser;
  }
  
  public Date getInputDate() {
    return this.inputDate;
  }
  
  public void setInputDate(Date inputDate) {
    this.inputDate = inputDate;
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
  
  public Date getScrapDate() {
    return this.scrapDate;
  }
  
  public String getUpdateUser() {
    return this.updateUser;
  }
  
  public void setUpdateUser(String updateUser) {
    this.updateUser = updateUser;
  }
  
  public Date getUpdateDate() {
    return this.updateDate;
  }
  
  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
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
  
  public String getFixedcategory() {
    return this.fixedcategory;
  }
  
  public void setFixedcategory(String fixedcategory) {
    this.fixedcategory = fixedcategory;
  }
  
  public String getState() {
    return this.state;
  }
  
  public void setState(String state) {
    this.state = state;
  }
  
  public String getSupplier() {
    return this.supplier;
  }
  
  public void setSupplier(String supplier) {
    this.supplier = supplier;
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
  
  public String getSupporter() {
    return this.supporter;
  }
  
  public void setSupporter(String supporter) {
    this.supporter = supporter;
  }
  
  public String getSupportfax() {
    return this.supportfax;
  }
  
  public void setSupportfax(String supportfax) {
    this.supportfax = supportfax;
  }
  
  public String getMaintenanceNotice() {
    return this.maintenanceNotice;
  }
  
  public Float getServiceLife() {
    return this.serviceLife;
  }
  
  public void setServiceLife(Float serviceLife) {
    this.serviceLife = serviceLife;
  }
  
  public void setMaintenanceNotice(String maintenanceNotice) {
    this.maintenanceNotice = maintenanceNotice;
  }
}
