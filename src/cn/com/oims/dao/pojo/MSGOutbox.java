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

@Entity
@Table(name = "msg_outbox")
public class MSGOutbox implements Serializable {
  private static final long serialVersionUID = -8927940094671688765L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "msg_outbox_sequence")
  @SequenceGenerator(name = "msg_outbox_sequence", allocationSize = 1, initialValue = 1, sequenceName = "msg_outbox_sequence")
  private Long id;
  
  @Column(length = 30)
  private String gonghao;
  
  @Column(length = 30)
  private String deluser;
  
  @Column(name = "msg_id")
  private Long msgId;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  private boolean del;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public Long getMsgId() {
    return this.msgId;
  }
  
  public void setMsgId(Long msgId) {
    this.msgId = msgId;
  }
  
  public boolean isDel() {
    return this.del;
  }
  
  public void setDel(boolean del) {
    this.del = del;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public String getDeluser() {
    return this.deluser;
  }
  
  public void setDeluser(String deluser) {
    this.deluser = deluser;
  }
}
