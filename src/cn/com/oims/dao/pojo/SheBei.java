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
@Table(name = "shebei")
public class SheBei implements Serializable {
  private static final long serialVersionUID = -3419414840161170773L;
  
  private Integer id;
  
  private String sbmc;
  
  private String ggxh;
  
  private Integer bmId;
  
  private String bgsId;
  
  private String ip;
  
  private String smbUser;
  
  private String smbPassword;
  
  private String smbName;
  
  private boolean online;
  
  private String manageUser;
  
  private Integer protocol;
  
  private String jcxmIds;
  
  private boolean qiyong;
  
  private String xppath;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shebei_sequence")
  @SequenceGenerator(name = "shebei_sequence", allocationSize = 1, initialValue = 1, sequenceName = "shebei_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getSbmc() {
    return this.sbmc;
  }
  
  public void setSbmc(String sbmc) {
    this.sbmc = sbmc;
  }
  
  public String getGgxh() {
    return this.ggxh;
  }
  
  public void setGgxh(String ggxh) {
    this.ggxh = ggxh;
  }
  
  @Column(name = "bm_id")
  public Integer getBmId() {
    return this.bmId;
  }
  
  public void setBmId(Integer bmId) {
    this.bmId = bmId;
  }
  
  @Column(name = "bgs_id")
  public String getBgsId() {
    return this.bgsId;
  }
  
  public void setBgsId(String bgsId) {
    this.bgsId = bgsId;
  }
  
  public String getIp() {
    return this.ip;
  }
  
  public void setIp(String ip) {
    this.ip = ip;
  }
  
  @Column(name = "smb_user")
  public String getSmbUser() {
    return this.smbUser;
  }
  
  public void setSmbUser(String smbUser) {
    this.smbUser = smbUser;
  }
  
  @Column(name = "smb_password")
  public String getSmbPassword() {
    return this.smbPassword;
  }
  
  public void setSmbPassword(String smbPassword) {
    this.smbPassword = smbPassword;
  }
  
  @Column(name = "smb_name")
  public String getSmbName() {
    return this.smbName;
  }
  
  public void setSmbName(String smbName) {
    this.smbName = smbName;
  }
  
  @Column(name = "shebei_online")
  public boolean isOnline() {
    return this.online;
  }
  
  public void setOnline(boolean online) {
    this.online = online;
  }
  
  @Column(name = "manage_user")
  public String getManageUser() {
    return this.manageUser;
  }
  
  public void setManageUser(String manageUser) {
    this.manageUser = manageUser;
  }
  
  public Integer getProtocol() {
    return this.protocol;
  }
  
  public void setProtocol(Integer protocol) {
    this.protocol = protocol;
  }
  
  @Column(name = "jcxm_ids", length = 500)
  public String getJcxmIds() {
    return this.jcxmIds;
  }
  
  public void setJcxmIds(String jcxmIds) {
    this.jcxmIds = jcxmIds;
  }
  
  @Column(name = "qiyong")
  public boolean isQiyong() {
    return this.qiyong;
  }
  
  public void setQiyong(boolean qiyong) {
    this.qiyong = qiyong;
  }
  
  public String getXppath() {
    return this.xppath;
  }
  
  public void setXppath(String xppath) {
    this.xppath = xppath;
  }
}
