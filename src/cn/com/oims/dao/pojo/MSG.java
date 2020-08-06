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

@Table(name = "msg")
@Entity
public class MSG implements Serializable {
  private static final long serialVersionUID = 2331706414729666231L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "msg_sequence")
  @SequenceGenerator(name = "msg_sequence", allocationSize = 1, initialValue = 1, sequenceName = "msg_sequence")
  private Long id;
  
  @Column(length = 200)
  private String title;
  
  @Column(length = 2000)
  private String content;
  
  @Column(name = "insert_date")
  private Date insertDate;
  
  @Column(name = "insert_user")
  private String insertUser;
  
  private boolean send;
  
  private boolean del;
  
  @Column(name = "link_msg_id")
  private Long linkMsgId;
  
  @Transient
  private List<MSGAttachment> attachment;
  
  @Transient
  private List<MSGReceiver> receiver;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public String getContent() {
    return this.content;
  }
  
  public void setContent(String content) {
    this.content = content;
  }
  
  public Date getInsertDate() {
    return this.insertDate;
  }
  
  public void setInsertDate(Date insertDate) {
    this.insertDate = insertDate;
  }
  
  public String getInsertUser() {
    return this.insertUser;
  }
  
  public void setInsertUser(String insertUser) {
    this.insertUser = insertUser;
  }
  
  public boolean isSend() {
    return this.send;
  }
  
  public void setSend(boolean send) {
    this.send = send;
  }
  
  public boolean isDel() {
    return this.del;
  }
  
  public void setDel(boolean del) {
    this.del = del;
  }
  
  public Long getLinkMsgId() {
    return this.linkMsgId;
  }
  
  public void setLinkMsgId(Long linkMsgId) {
    this.linkMsgId = linkMsgId;
  }
  
  public List<MSGAttachment> getAttachment() {
    return this.attachment;
  }
  
  public void setAttachment(List<MSGAttachment> attachment) {
    this.attachment = attachment;
  }
  
  public List<MSGReceiver> getReceiver() {
    return this.receiver;
  }
  
  public void setReceiver(List<MSGReceiver> receiver) {
    this.receiver = receiver;
  }
}
