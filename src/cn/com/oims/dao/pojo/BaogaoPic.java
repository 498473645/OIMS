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
@Table(name = "baogao_pic")
public class BaogaoPic implements Serializable {
  private static final long serialVersionUID = -5652747495193043652L;
  
  private Long id;
  
  private Long reportId;
  
  private String picUrl;
  
  private String info;
  
  private Integer xuhao;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "baogao_pic_sequence")
  @SequenceGenerator(name = "baogao_pic_sequence", allocationSize = 1, initialValue = 1, sequenceName = "baogao_pic_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(name = "report_id")
  public Long getReportId() {
    return this.reportId;
  }
  
  public void setReportId(Long reportId) {
    this.reportId = reportId;
  }
  
  @Column(name = "pic_url")
  public String getPicUrl() {
    return this.picUrl;
  }
  
  public void setPicUrl(String picUrl) {
    this.picUrl = picUrl;
  }
  
  public String getInfo() {
    return this.info;
  }
  
  public void setInfo(String info) {
    this.info = info;
  }
  
  public Integer getXuhao() {
    return this.xuhao;
  }
  
  public void setXuhao(Integer xuhao) {
    this.xuhao = xuhao;
  }
}
