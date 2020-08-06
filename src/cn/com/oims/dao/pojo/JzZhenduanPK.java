package cn.com.oims.dao.pojo;

import java.io.Serializable;

public class JzZhenduanPK implements Serializable {
  private static final long serialVersionUID = -1590331146968674293L;
  
  private Long jiuzhen_id;
  
  private Integer zdfl_id;
  
  public Long getJiuzhen_id() {
    return this.jiuzhen_id;
  }
  
  public void setJiuzhen_id(Long jiuzhen_id) {
    this.jiuzhen_id = jiuzhen_id;
  }
  
  public Integer getZdfl_id() {
    return this.zdfl_id;
  }
  
  public void setZdfl_id(Integer zdfl_id) {
    this.zdfl_id = zdfl_id;
  }
  
  public boolean equals(Object o) {
    if (o instanceof JzZhenduanPK) {
      JzZhenduanPK key = (JzZhenduanPK)o;
      if (this.jiuzhen_id == key.getJiuzhen_id() && this.zdfl_id.equals(key.getZdfl_id()))
        return true; 
    } 
    return false;
  }
  
  public int hashCode() {
    return this.jiuzhen_id.hashCode();
  }
}
