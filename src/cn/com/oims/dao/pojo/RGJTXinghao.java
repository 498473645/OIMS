package cn.com.oims.dao.pojo;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "rgjt_xinhao")
public class RGJTXinghao implements Serializable {
  private static final long serialVersionUID = -4909847451154036621L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rgjt_xinhao_sequence")
  @SequenceGenerator(name = "rgjt_xinhao_sequence", allocationSize = 1, initialValue = 1, sequenceName = "rgjt_xinhao_sequence")
  private Integer id;
  
  @Column(length = 50, nullable = false)
  private String name;
  
  @Column(length = 20, nullable = false)
  private String code;

  @Column(name="SHOW_NAME", length = 50, nullable = false)
  private String showName;
  
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
  
  public String getCode() {
    return this.code;
  }
  
  public void setCode(String code) {
    this.code = code;
  }
  
  public String getInfomation() {
    return this.infomation;
  }
  
  public void setInfomation(String infomation) {
    this.infomation = infomation;
  }

  public String getShowName() {
    return showName;
  }

  public void setShowName(String showName) {
    this.showName = showName;
  }
}
