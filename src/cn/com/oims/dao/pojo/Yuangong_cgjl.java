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
public class Yuangong_cgjl implements Serializable {
  private static final long serialVersionUID = -281000075535739610L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Yuangong_cgjl_SEQUENCE")
  @SequenceGenerator(name = "Yuangong_cgjl_SEQUENCE", allocationSize = 1, initialValue = 1, sequenceName = "Yuangong_cgjl_SEQUENCE")
  private Integer id;
  
  @Column(length = 20)
  private String gonghao;
  
  private String detailType;
  
  private String project_name;
  
  private String classType;
  
  private String filePath;
  
  private Date c_time;
  
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
  
  public String getClassType() {
    return this.classType;
  }
  
  public void setClassType(String classType) {
    this.classType = classType;
  }
  
  public String getFilePath() {
    return this.filePath;
  }
  
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  
  public Date getC_time() {
    return this.c_time;
  }
  
  public void setC_time(Date c_time) {
    this.c_time = c_time;
  }
}
