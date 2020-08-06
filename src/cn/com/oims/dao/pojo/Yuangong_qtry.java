package cn.com.oims.dao.pojo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Yuangong_qtry implements Serializable {
  private static final long serialVersionUID = -6222517926249163109L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Yuangong_rongYu_SEQUENCE")
  @SequenceGenerator(name = "Yuangong_rongYu_SEQUENCE", allocationSize = 1, initialValue = 1, sequenceName = "Yuangong_rongYu_SEQUENCE")
  private Integer id;
  
  @Column(length = 20)
  String gonghao;
  
  @Column(length = 20)
  String jiBie;
  
  @Column(length = 20)
  String name;
  
  @Column(length = 200)
  String content;
  
  Date c_time;
  
  @Column(length = 200)
  String filePath;
  
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
  
  public String getJiBie() {
    return this.jiBie;
  }
  
  public void setJiBie(String jiBie) {
    this.jiBie = jiBie;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getContent() {
    return this.content;
  }
  
  public void setContent(String content) {
    this.content = content;
  }
  
  public Date getC_time() {
    return this.c_time;
  }
  
  public void setC_time(Date c_time) {
    this.c_time = c_time;
  }
  
  public String getFilePath() {
    return this.filePath;
  }
  
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
}
