package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "msg_receiver")
public class MSGReceiver implements Serializable {
  private static final long serialVersionUID = -7915230975349294190L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "msg_receiver_sequence")
  @SequenceGenerator(name = "msg_receiver_sequence", allocationSize = 1, initialValue = 1, sequenceName = "msg_receiver_sequence")
  private Long id;
  
  @Index(name = "msgId")
  @Column(name = "msg_id")
  private Long msgId;
  
  @Column(length = 30)
  @Index(name = "receiver")
  private String receiver;
  
  @Column(length = 30)
  private String sendType;
  
  @Column(length = 30)
  @Index(name = "sender")
  private String sender;
  
  private int n;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getMsgId() {
    return this.msgId;
  }
  
  public void setMsgId(Long msgId) {
    this.msgId = msgId;
  }
  
  public String getReceiver() {
    return this.receiver;
  }
  
  public void setReceiver(String receiver) {
    this.receiver = receiver;
  }
  
  public String getSendType() {
    return this.sendType;
  }
  
  public void setSendType(String sendType) {
    this.sendType = sendType;
  }
  
  public int getN() {
    return this.n;
  }
  
  public void setN(int n) {
    this.n = n;
  }
  
  public String getSender() {
    return this.sender;
  }
  
  public void setSender(String sender) {
    this.sender = sender;
  }
}
