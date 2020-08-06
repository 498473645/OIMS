package cn.com.oims.dao.pojo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "followed_up")
public class FollowedUp {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "followed_up_sequence")
  @SequenceGenerator(name = "followed_up_sequence", allocationSize = 1, initialValue = 1, sequenceName = "followed_up_sequence")
  private Long id;
  
  private Long visit_id;
  
  private String followed_time;
  
  private String content;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getVisit_id() {
    return this.visit_id;
  }
  
  public void setVisit_id(Long visit_id) {
    this.visit_id = visit_id;
  }
  
  public String getContent() {
    return this.content;
  }
  
  public void setContent(String content) {
    this.content = content;
  }
  
  public String getFollowed_time() {
    return this.followed_time;
  }
  
  public void setFollowed_time(String followed_time) {
    this.followed_time = followed_time;
  }
}
