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
@Table(name = "rgjt_panlx")
public class RGJTPanleixing implements Serializable {
  private static final long serialVersionUID = -6831051897073451983L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_panlx_sequence")
  @SequenceGenerator(name = "rgjt_panlx_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_panlx_sequence")
  private Integer id;
  
  @Column(length = 30, nullable = false)
  private String name;
  
  @Column(length = 30, nullable = false)
  private String code;
  
  @Column(length = 500)
  private String infomation;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }
  
  public String getCode() {
    return this.code;
  }
  
  public void setCode(String code) {
    this.code = code;
  }
}
