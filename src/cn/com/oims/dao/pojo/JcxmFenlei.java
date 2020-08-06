package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jcxm_fenlei")
public class JcxmFenlei implements Serializable {
  private static final long serialVersionUID = -5931504365429162689L;
  
  private Integer jcxmId;
  
  private Integer jbflId;
  
  private Integer xuhao;
  
  @Id
  @Column(name = "jcxm_id")
  public Integer getJcxmId() {
    return this.jcxmId;
  }
  
  public void setJcxmId(Integer jcxmId) {
    this.jcxmId = jcxmId;
  }
  
  @Column(name = "jbfl_id")
  public Integer getJbflId() {
    return this.jbflId;
  }
  
  public void setJbflId(Integer jbflId) {
    this.jbflId = jbflId;
  }
  
  public Integer getXuhao() {
    return this.xuhao;
  }
  
  public void setXuhao(Integer xuhao) {
    this.xuhao = xuhao;
  }
}
