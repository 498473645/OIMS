package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "shili")
public class ShiLi {
  private Long id;
  
  private Long jiuzhen_id;
  
  private Long jcd_id;
  
  private Long huanzhe_id;
  
  private Float ll;
  
  private Float ljz;
  
  private Float lj;
  
  private Float rl;
  
  private Float rjz;
  
  private Float rj;
  
  private String jcys;
  
  private Date jcsj;
  
  private Integer lgg;
  
  private Integer rgg;
  
  private Integer redtrs;
  
  private Integer ledtrs;
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shili_sequence")
  @SequenceGenerator(name = "shili_sequence", allocationSize = 1, initialValue = 1, sequenceName = "shili_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Integer getRedtrs() {
    return this.redtrs;
  }
  
  public void setRedtrs(Integer redtrs) {
    this.redtrs = redtrs;
  }
  
  public Integer getLedtrs() {
    return this.ledtrs;
  }
  
  public void setLedtrs(Integer ledtrs) {
    this.ledtrs = ledtrs;
  }
  
  @Column(name = "jiuzhen_id", nullable = false)
  @Index(name = "index_shili_jiuzhenId")
  public Long getJiuzhen_id() {
    return this.jiuzhen_id;
  }
  
  public void setJiuzhen_id(Long jiuzhen_id) {
    this.jiuzhen_id = jiuzhen_id;
  }
  
  @Column(name = "jcd_id", nullable = false)
  public Long getJcd_id() {
    return this.jcd_id;
  }
  
  public void setJcd_id(Long jcd_id) {
    this.jcd_id = jcd_id;
  }
  
  @Column(name = "huanzhe_id", nullable = false)
  public Long getHuanzhe_id() {
    return this.huanzhe_id;
  }
  
  public void setHuanzhe_id(Long huanzhe_id) {
    this.huanzhe_id = huanzhe_id;
  }
  
  public Float getLl() {
    return this.ll;
  }
  
  public void setLl(Float ll) {
    this.ll = ll;
  }
  
  public Float getLjz() {
    return this.ljz;
  }
  
  public void setLjz(Float ljz) {
    this.ljz = ljz;
  }
  
  public Float getLj() {
    return this.lj;
  }
  
  public void setLj(Float lj) {
    this.lj = lj;
  }
  
  public Float getRl() {
    return this.rl;
  }
  
  public void setRl(Float rl) {
    this.rl = rl;
  }
  
  public Float getRjz() {
    return this.rjz;
  }
  
  public void setRjz(Float rjz) {
    this.rjz = rjz;
  }
  
  public Float getRj() {
    return this.rj;
  }
  
  public void setRj(Float rj) {
    this.rj = rj;
  }
  
  public void setRj(float rj) {
    this.rj = Float.valueOf(rj);
  }
  
  public String getJcys() {
    return this.jcys;
  }
  
  public void setJcys(String jcys) {
    this.jcys = jcys;
  }
  
  public Date getJcsj() {
    return this.jcsj;
  }
  
  public void setJcsj(Date jcsj) {
    this.jcsj = jcsj;
  }
  
  public Integer getLgg() {
    return this.lgg;
  }
  
  public void setLgg(Integer lgg) {
    this.lgg = lgg;
  }
  
  public Integer getRgg() {
    return this.rgg;
  }
  
  public void setRgg(Integer rgg) {
    this.rgg = rgg;
  }
}
