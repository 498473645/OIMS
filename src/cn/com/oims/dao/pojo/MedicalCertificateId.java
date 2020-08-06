package cn.com.oims.dao.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class MedicalCertificateId implements Serializable {
  private static final long serialVersionUID = 1151768013388579375L;
  
  private Long jiuzhenId;
  
  private Integer categoryId;
  
  @Column(name = "jiuzhen_id")
  public Long getJiuzhenId() {
    return this.jiuzhenId;
  }
  
  public void setJiuzhenId(Long jiuzhenId) {
    this.jiuzhenId = jiuzhenId;
  }
  
  @Column(name = "zdfl_id")
  public Integer getCategoryId() {
    return this.categoryId;
  }
  
  public void setCategoryId(int categoryId) {
    this.categoryId = Integer.valueOf(categoryId);
  }
  
  public boolean equals(Object o) {
    if (o instanceof MedicalCertificateId) {
      MedicalCertificateId key = (MedicalCertificateId)o;
      if (this.categoryId == key.getCategoryId() && this.jiuzhenId.equals(key.getJiuzhenId()))
        return true; 
    } 
    return false;
  }
  
  public int hashCode() {
    int result = 17;
    result = 37 * result + ((getCategoryId() == null) ? 0 : getCategoryId().hashCode());
    result = 37 * result + ((getJiuzhenId() == null) ? 0 : getJiuzhenId().hashCode());
    return result;
  }
}
