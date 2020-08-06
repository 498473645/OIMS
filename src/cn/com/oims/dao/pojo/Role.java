package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "oims_role")
public class Role implements Serializable {
  private static final long serialVersionUID = 7470160572319725410L;
  
  private Integer id;
  
  private String jiaose;
  
  private String quanxian;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "oims_role_sequence")
  @SequenceGenerator(name = "oims_role_sequence", allocationSize = 1, initialValue = 1, sequenceName = "oims_role_sequence")
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  @Column(length = 50)
  public String getJiaose() {
    return this.jiaose;
  }
  
  public void setJiaose(String jiaose) {
    this.jiaose = jiaose;
  }
  
  @Column(length = 1000)
  public String getQuanxian() {
    return this.quanxian;
  }
  
  public void setQuanxian(String quanxian) {
    this.quanxian = quanxian;
  }
}
