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
@Table(name = "msg_attachment")
public class MSGAttachment implements Serializable {
  private static final long serialVersionUID = 2955315377465682150L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "msg_attachment_sequence")
  @SequenceGenerator(name = "msg_attachment_sequence", allocationSize = 1, initialValue = 1, sequenceName = "msg_attachment_sequence")
  private Long id;
  
  @Index(name = "msgId")
  @Column(name = "msg_id")
  private Long msgId;
  
  @Column(length = 200)
  private String path;
  
  @Column(length = 50)
  private String filename;
  
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
  
  public String getPath() {
    return this.path;
  }
  
  public void setPath(String path) {
    this.path = path;
  }
  
  public String getFilename() {
    return this.filename;
  }
  
  public void setFilename(String filename) {
    this.filename = filename;
  }
}
