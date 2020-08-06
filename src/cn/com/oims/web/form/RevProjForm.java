package cn.com.oims.web.form;

import java.io.Serializable;
import org.apache.commons.lang.StringUtils;

public class RevProjForm implements Serializable {
  private static final long serialVersionUID = -5054494565366299945L;
  
  private Long id;
  
  private Integer amnum;
  
  private Integer pmnum;
  
  private String checkAddr;
  
  private Long bumenId;
  
  private String userId;
  
  private String username;
  
  private String projName;
  
  private String operUserId;
  
  private String search;
  
  private Long[] detail;
  
  private Long departMent;
  
  private String uid;
  
  private String validErr;
  
  private String jcxmIds;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
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
  
  public String getCheckAddr() {
    return this.checkAddr;
  }
  
  public void setCheckAddr(String checkAddr) {
    this.checkAddr = checkAddr;
  }
  
  public String getUsername() {
    return this.username;
  }
  
  public void setUsername(String username) {
    this.username = username;
  }
  
  public String getProjName() {
    return this.projName;
  }
  
  public void setProjName(String projName) {
    this.projName = projName;
  }
  
  public String getSearch() {
    return this.search;
  }
  
  public void setSearch(String search) {
    this.search = search;
  }
  
  public Long[] getDetail() {
    return this.detail;
  }
  
  public void setDetail(Long[] detail) {
    this.detail = detail;
  }
  
  public Long getDepartMent() {
    return this.departMent;
  }
  
  public void setDepartMent(Long departMent) {
    this.departMent = departMent;
  }
  
  public String getUid() {
    return this.uid;
  }
  
  public void setUid(String uid) {
    this.uid = uid;
  }
  
  public String getValidErr() {
    return this.validErr;
  }
  
  public void setValidErr(String validErr) {
    this.validErr = validErr;
  }
  
  public String getJcxmIds() {
    return this.jcxmIds;
  }
  
  public void setJcxmIds(String jcxmIds) {
    this.jcxmIds = jcxmIds;
  }
  
  public Long getBumenId() {
    return this.bumenId;
  }
  
  public void setBumenId(Long bumenId) {
    this.bumenId = bumenId;
  }
  
  public String getUserId() {
    return this.userId;
  }
  
  public void setUserId(String userId) {
    this.userId = userId;
  }
  
  public String getOperUserId() {
    return this.operUserId;
  }
  
  public void setOperUserId(String operUserId) {
    this.operUserId = operUserId;
  }
  
  public boolean valid() {
    if (this.amnum == null || this.amnum.intValue() < 1)
      this.validErr = "上午不能小于1!<br/>"; 
    if (this.pmnum == null || this.pmnum.intValue() < 1)
      this.validErr = String.valueOf(this.validErr) + "上午不能小于1!<br/>"; 
    if (StringUtils.isEmpty(this.projName))
      this.validErr = String.valueOf(this.validErr) + "检查项目名称不能为空！<br/>"; 
    if (StringUtils.isEmpty(this.checkAddr))
      this.validErr = String.valueOf(this.validErr) + "检查位置不能为空！<br/>"; 
    if (this.detail == null || this.detail.length < 1)
      this.validErr = String.valueOf(this.validErr) + "请选择检查项目不能为空！<br/>"; 
    return StringUtils.isEmpty(this.validErr);
  }
}
