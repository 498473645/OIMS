package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pcao")
public class Pcao {
  private Long id;
  
  private Long jcdId;
  
  private float OD1;
  
  private float OD2;
  
  private float OD3;
  
  private float OS1;
  
  private float OS2;
  
  private float OS3;
  
  private float ODave;
  
  private float OSave;
  
  private String Jcren;
  
  private Date JcTime;
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false)
  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  @Column(name = "jcd_id")
  public Long getJcdId() {
    return this.jcdId;
  }
  
  public void setJcdId(Long jcdId) {
    this.jcdId = jcdId;
  }
  
  @Column(name = "OD_1")
  public float getOD1() {
    return this.OD1;
  }
  
  public void setOD1(float oD1) {
    this.OD1 = oD1;
  }
  
  @Column(name = "OD_2")
  public float getOD2() {
    return this.OD2;
  }
  
  public void setOD2(float oD2) {
    this.OD2 = oD2;
  }
  
  @Column(name = "OD_3")
  public float getOD3() {
    return this.OD3;
  }
  
  public void setOD3(float oD3) {
    this.OD3 = oD3;
  }
  
  @Column(name = "OS_1")
  public float getOS1() {
    return this.OS1;
  }
  
  public void setOS1(float oS1) {
    this.OS1 = oS1;
  }
  
  @Column(name = "OS_2")
  public float getOS2() {
    return this.OS2;
  }
  
  public void setOS2(float oS2) {
    this.OS2 = oS2;
  }
  
  @Column(name = "OS_3")
  public float getOS3() {
    return this.OS3;
  }
  
  public void setOS3(float oS3) {
    this.OS3 = oS3;
  }
  
  @Column(name = "OD_ave")
  public float getODave() {
    return this.ODave;
  }
  
  public void setODave(float oDave) {
    this.ODave = oDave;
  }
  
  @Column(name = "OS_ave")
  public float getOSave() {
    return this.OSave;
  }
  
  public void setOSave(float oSave) {
    this.OSave = oSave;
  }
  
  @Column(nullable = false)
  public String getJcren() {
    return this.Jcren;
  }
  
  public void setJcren(String jcren) {
    this.Jcren = jcren;
  }
  
  @Column(name = "Jc_time", nullable = false)
  public Date getJcTime() {
    return this.JcTime;
  }
  
  public void setJcTime(Date jcTime) {
    this.JcTime = jcTime;
  }
  
  public Pcao(Long jcdId, float oD1, float oD2, float oD3, float oS1, float oS2, float oS3, float oDave, float oSave, String jcren, Date jcTime) {
    this.jcdId = jcdId;
    this.OD1 = oD1;
    this.OD2 = oD2;
    this.OD3 = oD3;
    this.OS1 = oS1;
    this.OS2 = oS2;
    this.OS3 = oS3;
    this.ODave = oDave;
    this.OSave = oSave;
    this.Jcren = jcren;
    this.JcTime = jcTime;
  }
  
  public Pcao() {}
}
