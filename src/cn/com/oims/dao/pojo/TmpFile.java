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
import javax.persistence.Transient;

@Entity
@Table(name = "tmp_file")
public class TmpFile implements Serializable {
  @Transient
  public static final int notSend = 0;
  
  @Transient
  public static final int sending = 1;
  
  @Transient
  public static final int sendOver = 2;
  
  @Transient
  public static final int fileE = 3;
  
  private static final long serialVersionUID = -3419414840161170773L;
  
  private Long id;
  
  private String remotePath;
  
  private String localPath;
  
  private String fileName;
  
  private Integer fileType;
  
  private String host;
  
  private String hostUser;
  
  private String hostPassword;
  
  private boolean method;
  
  private String gonghao;
  
  private Integer protocol;
  
  private Integer state;
  
  private String msg;
  
  private Date addTime;
  
  private Date startTime;
  
  private Date endTime;
  
  private Integer errCount;
  
  private Integer space;
  
  private Long jcdId;
  
  private int distanceState;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tmp_file_sequence")
  @SequenceGenerator(name = "tmp_file_sequence", allocationSize = 1, initialValue = 1, sequenceName = "tmp_file_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getRemotePath() {
    return this.remotePath;
  }
  
  public void setRemotePath(String remotePath) {
    this.remotePath = remotePath;
  }
  
  public String getLocalPath() {
    return this.localPath;
  }
  
  public void setLocalPath(String localPath) {
    this.localPath = localPath;
  }
  
  public String getFileName() {
    return this.fileName;
  }
  
  public void setFileName(String fileName) {
    this.fileName = fileName;
  }
  
  public Integer getFileType() {
    return this.fileType;
  }
  
  public void setFileType(Integer fileType) {
    this.fileType = fileType;
  }
  
  public String getHost() {
    return this.host;
  }
  
  public void setHost(String host) {
    this.host = host;
  }
  
  @Column(name = "host_user")
  public String getHostUser() {
    return this.hostUser;
  }
  
  public void setHostUser(String hostUser) {
    this.hostUser = hostUser;
  }
  
  @Column(name = "host_password")
  public String getHostPassword() {
    return this.hostPassword;
  }
  
  public void setHostPassword(String hostPassword) {
    this.hostPassword = hostPassword;
  }
  
  public boolean isMethod() {
    return this.method;
  }
  
  public void setMethod(boolean method) {
    this.method = method;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Integer getProtocol() {
    return this.protocol;
  }
  
  public void setProtocol(Integer protocol) {
    this.protocol = protocol;
  }
  
  public Integer getState() {
    return this.state;
  }
  
  public void setState(Integer state) {
    this.state = state;
  }
  
  public String getMsg() {
    return this.msg;
  }
  
  public void setMsg(String msg) {
    this.msg = msg;
  }
  
  @Column(name = "add_time")
  public Date getAddTime() {
    return this.addTime;
  }
  
  public void setAddTime(Date addTime) {
    this.addTime = addTime;
  }
  
  @Column(name = "start_time")
  public Date getStartTime() {
    return this.startTime;
  }
  
  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }
  
  @Column(name = "end_time")
  public Date getEndTime() {
    return this.endTime;
  }
  
  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }
  
  @Column(name = "err_count")
  public Integer getErrCount() {
    return this.errCount;
  }
  
  public void setErrCount(Integer errCount) {
    this.errCount = errCount;
  }
  
  public Integer getSpace() {
    return this.space;
  }
  
  public void setSpace(Integer space) {
    this.space = space;
  }
  
  @Column(name = "jcd_id")
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public int getDistanceState() {
    return this.distanceState;
  }
  
  public void setDistanceState(int distanceState) {
    this.distanceState = distanceState;
  }
}
