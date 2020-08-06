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
import org.hibernate.annotations.Index;

@Entity
@Table(name = "emr_order_report")
public class EMROrderReport implements Serializable {
  private static final long serialVersionUID = 2081759452408177483L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_order_report_sequence")
  @SequenceGenerator(name = "emr_order_report_sequence", allocationSize = 1, initialValue = 1, sequenceName = "emr_order_report_sequence")
  private Long id;
  
  @Index(name = "order_id")
  @Column(name = "order_id", nullable = false)
  private Long orderId;
  
  @Column(name = "report_no", length = 50, unique = true, nullable = false)
  private String reportNo;
  
  @Column(name = "order_no", length = 50, nullable = false)
  private String orderNo;
  
  private Integer jcks;
  
  @Column(length = 30)
  private String jcksbm;
  
  @Column(length = 30)
  private String jcys;
  
  private String jcjg;
  
  private Integer biaoshi;
  
  private Date jcsj;
  
  private String bgys;
  
  private Integer bgksbm;
  
  private String shys;
  
  private Date bgsj;
  
  @Column(name = "have_details")
  private boolean haveDetails;
  
  public Long getOrderId() {
    return this.orderId;
  }
  
  public void setOrderId(Long orderId) {
    this.orderId = orderId;
  }
  
  public boolean isHaveDetails() {
    return this.haveDetails;
  }
  
  public void setHaveDetails(boolean haveDetails) {
    this.haveDetails = haveDetails;
  }
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getReportNo() {
    return this.reportNo;
  }
  
  public void setReportNo(String reportNum) {
    this.reportNo = reportNum;
  }
  
  public String getOrderNo() {
    return this.orderNo;
  }
  
  public void setOrderNo(String orderNum) {
    this.orderNo = orderNum;
  }
  
  public Integer getJcks() {
    return this.jcks;
  }
  
  public void setJcks(Integer jcks) {
    this.jcks = jcks;
  }
  
  public String getJcksbm() {
    return this.jcksbm;
  }
  
  public void setJcksbm(String jcksbm) {
    this.jcksbm = jcksbm;
  }
  
  public String getJcys() {
    return this.jcys;
  }
  
  public void setJcys(String jcys) {
    this.jcys = jcys;
  }
  
  public String getJcjg() {
    return this.jcjg;
  }
  
  public void setJcjg(String jcjg) {
    this.jcjg = jcjg;
  }
  
  public Integer getBiaoshi() {
    return this.biaoshi;
  }
  
  public void setBiaoshi(Integer biaoshi) {
    this.biaoshi = biaoshi;
  }
  
  public Date getJcsj() {
    return this.jcsj;
  }
  
  public void setJcsj(Date jcsj) {
    this.jcsj = jcsj;
  }
  
  public String getBgys() {
    return this.bgys;
  }
  
  public void setBgys(String bgys) {
    this.bgys = bgys;
  }
  
  public Integer getBgksbm() {
    return this.bgksbm;
  }
  
  public void setBgksbm(Integer bgksbm) {
    this.bgksbm = bgksbm;
  }
  
  public String getShys() {
    return this.shys;
  }
  
  public void setShys(String shys) {
    this.shys = shys;
  }
  
  public Date getBgsj() {
    return this.bgsj;
  }
  
  public void setBgsj(Date bgsj) {
    this.bgsj = bgsj;
  }
}
