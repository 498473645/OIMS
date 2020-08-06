package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jcxm_to_hisitem")
public class JcxmToHisItem {
  @Id
  @GeneratedValue
  private Integer id;
  
  private Integer jcxm_id;
  
  private String jcxm_name;
  
  private String eye;
  
  private Double multiple;
  
  private String his_item_code;
  
  private String his_item_name;
  
  private String his_item_spec;
  
  private String his_item_units;
  
  private Date startdate;
  
  private Date stopdate;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public Integer getJcxm_id() {
    return this.jcxm_id;
  }
  
  public void setJcxm_id(Integer jcxm_id) {
    this.jcxm_id = jcxm_id;
  }
  
  public String getJcxm_name() {
    return this.jcxm_name;
  }
  
  public void setJcxm_name(String jcxm_name) {
    this.jcxm_name = jcxm_name;
  }
  
  public String getEye() {
    return this.eye;
  }
  
  public void setEye(String eye) {
    this.eye = eye;
  }
  
  public Double getMultiple() {
    return this.multiple;
  }
  
  public void setMultiple(Double multiple) {
    this.multiple = multiple;
  }
  
  public String getHis_item_code() {
    return this.his_item_code;
  }
  
  public void setHis_item_code(String his_item_code) {
    this.his_item_code = his_item_code;
  }
  
  public String getHis_item_name() {
    return this.his_item_name;
  }
  
  public void setHis_item_name(String his_item_name) {
    this.his_item_name = his_item_name;
  }
  
  public String getHis_item_spec() {
    return this.his_item_spec;
  }
  
  public void setHis_item_spec(String his_item_spec) {
    this.his_item_spec = his_item_spec;
  }
  
  public String getHis_item_units() {
    return this.his_item_units;
  }
  
  public void setHis_item_units(String his_item_units) {
    this.his_item_units = his_item_units;
  }
  
  public Date getStartdate() {
    return this.startdate;
  }
  
  public void setStartdate(Date startdate) {
    this.startdate = startdate;
  }
  
  public Date getStopdate() {
    return this.stopdate;
  }
  
  public void setStopdate(Date stopdate) {
    this.stopdate = stopdate;
  }
}
