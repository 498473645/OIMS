package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Table(name = "bingli_print")
@Entity
public class BingLiPrint {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bingli_print_sequence")
  @SequenceGenerator(name = "bingli_print_sequence", allocationSize = 1, initialValue = 1, sequenceName = "bingli_print_sequence")
  private Long id;
  
  private Long jiuzhen_id;
  
  private String doctor;
  
  private Date print_time;
  
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getJiuzhen_id() {
    return this.jiuzhen_id;
  }
  
  public void setJiuzhen_id(Long jiuzhen_id) {
    this.jiuzhen_id = jiuzhen_id;
  }
  
  public String getDoctor() {
    return this.doctor;
  }
  
  public void setDoctor(String doctor) {
    this.doctor = doctor;
  }
  
  public Date getPrint_time() {
    return this.print_time;
  }
  
  public void setPrint_time(Date print_time) {
    this.print_time = print_time;
  }
}
