package cn.com.oims.web.form;

import java.io.Serializable;

public class RevInfoForm implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private Long id;
  
  private String search;
  
  private String uid;
  
  private String projName;
  
  private String phone;
  
  private String pno;
  
  private String psex;
  
  private Integer projId;
  
  private String pbirthday;
  
  private String revdt;
  
  private String likAddr;
  
  private String eyetype;
  
  private String revstate;
  
  private String idcard;
  
  public String getIdcard() {
    return this.idcard;
  }
  
  public void setIdcard(String idcard) {
    this.idcard = idcard;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    this.search = search;
  }
  
  public String getUid() {
    return this.uid;
  }
  
  public void setUid(String uid) {
    this.uid = uid;
  }
  
  public String getProjName() {
    return this.projName;
  }
  
  public void setProjName(String projName) {
    this.projName = projName;
  }
  
  public String getPhone() {
    return this.phone;
  }
  
  public void setPhone(String phone) {
    this.phone = phone;
  }
  
  public String getPno() {
    return this.pno;
  }
  
  public void setPno(String pno) {
    this.pno = pno;
  }
  
  public String getPsex() {
    return this.psex;
  }
  
  public void setPsex(String psex) {
    this.psex = psex;
  }
  
  public Integer getProjId() {
    return this.projId;
  }
  
  public void setProjId(Integer projId) {
    this.projId = projId;
  }
  
  public String getPbirthday() {
    return this.pbirthday;
  }
  
  public void setPbirthday(String pbirthday) {
    this.pbirthday = pbirthday;
  }
  
  public String getRevdt() {
    return this.revdt;
  }
  
  public void setRevdt(String revdt) {
    this.revdt = revdt;
  }
  
  public String getLikAddr() {
    return this.likAddr;
  }
  
  public void setLikAddr(String likAddr) {
    this.likAddr = likAddr;
  }
  
  public String getEyetype() {
    return this.eyetype;
  }
  
  public void setEyetype(String eyetype) {
    this.eyetype = eyetype;
  }
  
  public String getRevstate() {
    return this.revstate;
  }
  
  public void setRevstate(String revstate) {
    this.revstate = revstate;
  }
}
