package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Yuangong_xwlw implements Serializable {
  private static final long serialVersionUID = -4406245170654562398L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "YuangongJianli_SEQUENCE")
  @SequenceGenerator(name = "YuangongJianli_SEQUENCE", allocationSize = 1, initialValue = 1, sequenceName = "YuangongJianli_SEQUENCE")
  private Integer id;
  
  @Column(length = 20)
  String gonghao;
  
  private String detailKind;
  
  private String detailType;
  
  private String project_name;
  
  private String user_name;
  
  private Date c_time;
  
  private String filePath;
  
  public String getFilePath() {
    return this.filePath;
  }
  
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public String getDetailKind() {
    return this.detailKind;
  }
  
  public void setDetailKind(String detailKind) {
    this.detailKind = detailKind;
  }
  
  public String getDetailType() {
    return this.detailType;
  }
  
  public void setDetailType(String detailType) {
    this.detailType = detailType;
  }
  
  public String getProject_name() {
    return this.project_name;
  }
  
  public void setProject_name(String project_name) {
    this.project_name = project_name;
  }
  
  public String getUser_name() {
    return this.user_name;
  }
  
  public void setUser_name(String user_name) {
    this.user_name = user_name;
  }
  
  public Date getC_time() {
    return this.c_time;
  }
  
  public void setC_time(Date c_time) {
    this.c_time = c_time;
  }
}
