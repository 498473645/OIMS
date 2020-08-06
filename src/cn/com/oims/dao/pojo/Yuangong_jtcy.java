package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Yuangong_jtcy implements Serializable {
  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Yuangong_jtcy_SEQUENCE")
  @SequenceGenerator(name = "Yuangong_jtcy_SEQUENCE", allocationSize = 1, initialValue = 1, sequenceName = "Yuangong_jtcy_SEQUENCE")
  private Integer id;
  
  @Column(length = 20)
  String gonghao;
  
  @Column(length = 10)
  String chengWei;
  
  @Column(length = 10)
  String name;
  
  @Column(length = 100)
  String workSpace;
  
  @Column(length = 15)
  String phone;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getGonghao() {
    return this.gonghao;
  }
  
  public void setGonghao(String gonghao) {
    this.gonghao = gonghao;
  }
  
  public String getChengWei() {
    return this.chengWei;
  }
  
  public void setChengWei(String chengWei) {
    this.chengWei = chengWei;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getWorkSpace() {
    return this.workSpace;
  }
  
  public void setWorkSpace(String workSpace) {
    this.workSpace = workSpace;
  }
  
  public String getPhone() {
    return this.phone;
  }
  
  public void setPhone(String phone) {
    this.phone = phone;
  }
}
