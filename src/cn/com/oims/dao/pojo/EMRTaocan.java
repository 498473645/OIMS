package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "emr_taocan")
public class EMRTaocan implements Serializable {
  private static final long serialVersionUID = 1691918568680740554L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emr_taocan_sequence")
  @SequenceGenerator(name = "emr_taocan_sequence", sequenceName = "emr_taocan_sequence")
  private Integer id;
  
  private String tcmc;
  
  private String beizhu;
  
  @Index(name = "gonghao")
  private String gonghao;
  
  @Column(name = "bm_id")
  private Integer bmId;
  
  private boolean gongxiang;
  
  private Date cjsj;
  
  @Transient
  private List<EMRTaocanXM> taocanXM;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getTcmc() {
    return this.tcmc;
  }
  
  public void setTcmc(String tcmc) {
    this.tcmc = tcmc;
  }
  
  public String getBeizhu() {
    return this.beizhu;
  }
  
  public void setBeizhu(String beizhu) {
    this.beizhu = beizhu;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Integer getBmId() {
    return this.bmId;
  }
  
  public void setBmId(Integer bmId) {
    this.bmId = bmId;
  }
  
  public boolean isGongxiang() {
    return this.gongxiang;
  }
  
  public void setGongxiang(boolean gongxiang) {
    this.gongxiang = gongxiang;
  }
  
  public Date getCjsj() {
    return this.cjsj;
  }
  
  public void setCjsj(Date cjsj) {
    this.cjsj = cjsj;
  }
  
  public List<EMRTaocanXM> getTaocanXM() {
    return this.taocanXM;
  }
  
  public void setTaocanXM(List<EMRTaocanXM> taocanXM) {
    this.taocanXM = taocanXM;
  }
}
