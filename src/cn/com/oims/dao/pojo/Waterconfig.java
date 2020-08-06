package cn.com.oims.dao.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "waterconfig")
public class Waterconfig {
  private Long id;
  
  private String wfilename;
  
  private Integer glbmid;
  
  private Integer jcxmid;
  
  private Long x;
  
  private Long y;
  
  private Double alpha;
  
  private Long thumbX;
  
  private Long thumbY;
  
  private String wthumbfilename;
  
  private Double thumbAlpha;
  
  private String beizhu;
  
  private String title;
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "waterconfig_sequence")
  @SequenceGenerator(name = "waterconfig_sequence", allocationSize = 1, initialValue = 1, sequenceName = "waterconfig_sequence")
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getWfilename() {
    return this.wfilename;
  }
  
  public void setWfilename(String wfilename) {
    this.wfilename = wfilename;
  }
  
  public Integer getGlbmid() {
    return this.glbmid;
  }
  
  public void setGlbmid(Integer glbmid) {
    this.glbmid = glbmid;
  }
  
  public Integer getJcxmid() {
    return this.jcxmid;
  }
  
  public void setJcxmid(Integer jcxmid) {
    this.jcxmid = jcxmid;
  }
  
  public Long getX() {
    return this.x;
  }
  
  public void setX(Long x) {
    this.x = x;
  }
  
  public Long getY() {
    return this.y;
  }
  
  public void setY(Long y) {
    this.y = y;
  }
  
  public Double getAlpha() {
    return this.alpha;
  }
  
  public void setAlpha(Double alpha) {
    this.alpha = alpha;
  }
  
  @Column(name = "thumb_x")
  public Long getThumbX() {
    return this.thumbX;
  }
  
  public void setThumbX(Long thumbX) {
    this.thumbX = thumbX;
  }
  
  @Column(name = "thumb_y")
  public Long getThumbY() {
    return this.thumbY;
  }
  
  public void setThumbY(Long thumbY) {
    this.thumbY = thumbY;
  }
  
  public String getWthumbfilename() {
    return this.wthumbfilename;
  }
  
  public void setWthumbfilename(String wthumbfilename) {
    this.wthumbfilename = wthumbfilename;
  }
  
  @Column(name = "thumb_alpha")
  public Double getThumbAlpha() {
    return this.thumbAlpha;
  }
  
  public void setThumbAlpha(Double thumbAlpha) {
    this.thumbAlpha = thumbAlpha;
  }
  
  public String getBeizhu() {
    return this.beizhu;
  }
  
  public void setBeizhu(String beizhu) {
    this.beizhu = beizhu;
  }
}
