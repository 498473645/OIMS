package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jcxm_pertain_item")
public class JcxmPertainItem {
  @Id
  private Integer id;
  
  private Integer jcxm_id;
  
  private String jcxm_name;
  
  private String item_code;
  
  private String item_name;
  
  private String item_class;
  
  private Float quantity;
  
  private int defaultSelected;
  
  private int required;
  
  private Integer category_id;
  
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
  
  public String getItem_code() {
    return this.item_code;
  }
  
  public void setItem_code(String item_code) {
    this.item_code = item_code;
  }
  
  public String getItem_name() {
    return this.item_name;
  }
  
  public void setItem_name(String item_name) {
    this.item_name = item_name;
  }
  
  public String getItem_class() {
    return this.item_class;
  }
  
  public void setItem_class(String item_class) {
    this.item_class = item_class;
  }
  
  public Float getQuantity() {
    return this.quantity;
  }
  
  public void setQuantity(Float quantity) {
    this.quantity = quantity;
  }
  
  public int getDefaultSelected() {
    return this.defaultSelected;
  }
  
  public void setDefaultSelected(int defaultSelected) {
    this.defaultSelected = defaultSelected;
  }
  
  public int getRequired() {
    return this.required;
  }
  
  public void setRequired(int required) {
    this.required = required;
  }
  
  public Integer getCategory_id() {
    return this.category_id;
  }
  
  public void setCategory_id(Integer category_id) {
    this.category_id = category_id;
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
