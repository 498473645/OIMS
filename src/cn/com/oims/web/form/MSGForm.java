package cn.com.oims.web.form;

import cn.com.oims.dao.pojo.MSGAttachment;
import java.util.Vector;

public class MSGForm {
  private Long msgId;
  
  private String title;
  
  private String content;
  
  private String sender;
  
  private String receiver;
  
  private Long linkMsgId;
  
  private Vector<MSGAttachment> attachments;
  
  public Long getMsgId() {
    return this.msgId;
  }
  
  public void setMsgId(Long id) {
    this.msgId = id;
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
  
  public String getSender() {
    return this.sender;
  }
  
  public void setSender(String sender) {
    this.sender = sender;
  }
  
  public String getReceiver() {
    return this.receiver;
  }
  
  public void setReceiver(String receiver) {
    this.receiver = receiver;
  }
  
  public Vector<MSGAttachment> getAttachments() {
    return this.attachments;
  }
  
  public void setAttachments(Vector<MSGAttachment> attachments) {
    this.attachments = attachments;
  }
  
  public Long getLinkMsgId() {
    return this.linkMsgId;
  }
  
  public void setLinkMsgId(Long linkMsgId) {
    this.linkMsgId = linkMsgId;
  }
}
