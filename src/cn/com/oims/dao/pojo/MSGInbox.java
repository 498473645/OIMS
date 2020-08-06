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
@Table(name = "msg_inbox")
public class MSGInbox implements Serializable {
  private static final long serialVersionUID = -2708443711069132407L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "msg_inbox_sequence")
  @SequenceGenerator(name = "msg_inbox_sequence", allocationSize = 1, initialValue = 1, sequenceName = "msg_inbox_sequence")
  private Long id;
  
  @Column(length = 30)
  private String receiver;
  
  @Column(name = "receive_mode")
  private String receiveMode;
  
  @Index(name = "msgId")
  @Column(name = "msg_id")
  private Long msgId;
  
  private boolean read;
  
  @Column(name = "read_time")
  private Date readTime;
  
  private boolean del;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getReceiver() {
    return this.receiver;
  }
  
  public void setReceiver(String receiver) {
    this.receiver = receiver;
  }
  
  public String getReceiveMode() {
    return this.receiveMode;
  }
  
  public void setReceiveMode(String receiveMode) {
    this.receiveMode = receiveMode;
  }
  
  public Long getMsgId() {
    return this.msgId;
  }
  
  public void setMsgId(Long msgId) {
    this.msgId = msgId;
  }
  
  public boolean isRead() {
    return this.read;
  }
  
  public void setRead(boolean read) {
    this.read = read;
  }
  
  public Date getReadTime() {
    return this.readTime;
  }
  
  public void setReadTime(Date readTime) {
    this.readTime = readTime;
  }
  
  public boolean isDel() {
    return this.del;
  }
  
  public void setDel(boolean del) {
    this.del = del;
  }
}
