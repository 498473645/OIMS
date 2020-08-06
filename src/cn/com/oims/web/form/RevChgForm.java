package cn.com.oims.web.form;

import cn.com.oims.dao.pojo.User;
import java.io.Serializable;

public class RevChgForm implements Serializable {
  private static final long serialVersionUID = 1221393725255392050L;
  
  private Long id;
  
  private String jcxmid;
  
  private String jcxmmc;
  
  private String revdt;
  
  private String timeFlag;
  
  private Integer revnum;
  
  private Integer chgnum;
  
  private Integer biaoshi;
  
  private String uid;
  
  private String ygxm;
  
  private Long bmid;
  
  private String bmmc;
  
  private User currentUser;
  
  private Integer amnum;
  
  private Integer pmnum;
  
  private Integer offerAmNum = Integer.valueOf(0);
  
  private Integer offerPmNum = Integer.valueOf(0);
  
  private Integer yuyueNumAm;
  
  private Integer yuyueNumPm;
  
  private String addr;
  
  private Integer oldamnum;
  
  private Integer oldpmnum;
  
  private Integer revPeriod;
  
  private Integer weekFlag;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getJcxmid() {
    return this.jcxmid;
  }
  
  public void setJcxmid(String jcxmid) {
    this.jcxmid = jcxmid;
  }
  
  public String getJcxmmc() {
    return this.jcxmmc;
  }
  
  public void setJcxmmc(String jcxmmc) {
    this.jcxmmc = jcxmmc;
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
  
  public Integer getRevnum() {
    return this.revnum;
  }
  
  public void setRevnum(Integer revnum) {
    this.revnum = revnum;
  }
  
  public String getUid() {
    return this.uid;
  }
  
  public void setUid(String uid) {
    this.uid = uid;
  }
  
  public String getYgxm() {
    return this.ygxm;
  }
  
  public void setYgxm(String ygxm) {
    this.ygxm = ygxm;
  }
  
  public Long getBmid() {
    return this.bmid;
  }
  
  public void setBmid(Long bmid) {
    this.bmid = bmid;
  }
  
  public String getBmmc() {
    return this.bmmc;
  }
  
  public void setBmmc(String bmmc) {
    this.bmmc = bmmc;
  }
  
  public User getCurrentUser() {
    return this.currentUser;
  }
  
  public void setCurrentUser(User currentUser) {
    this.currentUser = currentUser;
  }
  
  public Integer getAmnum() {
    return this.amnum;
  }
  
  public void setAmnum(Integer amnum) {
    this.amnum = amnum;
  }
  
  public Integer getPmnum() {
    return this.pmnum;
  }
  
  public void setPmnum(Integer pmnum) {
    this.pmnum = pmnum;
  }
  
  public String getAddr() {
    return this.addr;
  }
  
  public Integer getOldamnum() {
    return this.oldamnum;
  }
  
  public void setOldamnum(Integer oldamnum) {
    this.oldamnum = oldamnum;
  }
  
  public Integer getOldpmnum() {
    return this.oldpmnum;
  }
  
  public void setOldpmnum(Integer oldpmnum) {
    this.oldpmnum = oldpmnum;
  }
  
  public void setAddr(String addr) {
    this.addr = addr;
  }
  
  public Integer getOfferAmNum() {
    return this.offerAmNum;
  }
  
  public void setOfferAmNum(Integer offerAmNum) {
    this.offerAmNum = offerAmNum;
  }
  
  public Integer getOfferPmNum() {
    return this.offerPmNum;
  }
  
  public void setOfferPmNum(Integer offerPmNum) {
    this.offerPmNum = offerPmNum;
  }
  
  public Integer getYuyueNumAm() {
    return this.yuyueNumAm;
  }
  
  public void setYuyueNumAm(Integer yuyueNumAm) {
    this.yuyueNumAm = yuyueNumAm;
  }
  
  public Integer getYuyueNumPm() {
    return this.yuyueNumPm;
  }
  
  public void setYuyueNumPm(Integer yuyueNumPm) {
    this.yuyueNumPm = yuyueNumPm;
  }
  
  public Integer getRevPeriod() {
    return this.revPeriod;
  }
  
  public void setRevPeriod(Integer revPeriod) {
    this.revPeriod = revPeriod;
  }
  
  public Integer getWeekFlag() {
    return this.weekFlag;
  }
  
  public void setWeekFlag(Integer weekFlag) {
    this.weekFlag = weekFlag;
  }
  
  public Integer getChgnum() {
    return this.chgnum;
  }
  
  public void setChgnum(Integer chgnum) {
    this.chgnum = chgnum;
  }
  
  public Integer getBiaoshi() {
    return this.biaoshi;
  }
  
  public void setBiaoshi(Integer biaoshi) {
    this.biaoshi = biaoshi;
  }
}
