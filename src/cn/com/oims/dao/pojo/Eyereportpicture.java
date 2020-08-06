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
@Table(name = "Eyereportpicture")
public class Eyereportpicture implements Serializable {
  private static final long serialVersionUID = -4692639165714753787L;
  
  private Long flowNo;
  
  private Long jcdId;
  
  private Long report_id;
  
  private Long huanzhexinxi_id;
  
  private String path_picture;
  
  private String memo;
  
  private Long paixu;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eyereportpicture_sequence")
  @SequenceGenerator(name = "eyereportpicture_sequence", allocationSize = 1, initialValue = 1, sequenceName = "eyereportpicture_sequence")
  @Column(name = "flow_no")
  public Long getFlowNo() {
    return this.flowNo;
  }
  
  public void setFlowNo(Long flowNo) {
    this.flowNo = flowNo;
  }
  
  @Column(name = "jcd_id")
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  public Long getReport_id() {
    return this.report_id;
  }
  
  public void setReport_id(Long report_id) {
    this.report_id = report_id;
  }
  
  public Long getHuanzhexinxi_id() {
    return this.huanzhexinxi_id;
  }
  
  public void setHuanzhexinxi_id(Long huanzhexinxi_id) {
    this.huanzhexinxi_id = huanzhexinxi_id;
  }
  
  public String getPath_picture() {
    return this.path_picture;
  }
  
  public void setPath_picture(String path_picture) {
    this.path_picture = path_picture;
  }
  
  public String getMemo() {
    return this.memo;
  }
  
  public void setMemo(String memo) {
    this.memo = memo;
  }
  
  public Long getPaixu() {
    return this.paixu;
  }
  
  public void setPaixu(Long paixu) {
    this.paixu = paixu;
  }
}
