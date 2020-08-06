package cn.com.oims.dao.pojo;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "handle_project")
public class HandleProject {
  @Id
  @GeneratedValue
  private Integer id;
  
  private String project_code;
  
  private String project_name;
  
  private String project_spec;
  
  private String project_units;
  
  private Integer category_id;
  
  private String input_code;
  
  private Date start_date;
  
  private Date stop_date;
  
  private String position;
  
  public Integer getId() {
    return this.id;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }
  
  public String getProject_code() {
    return this.project_code;
  }
  
  public void setProject_code(String project_code) {
    this.project_code = project_code;
  }
  
  public String getProject_name() {
    return this.project_name;
  }
  
  public void setProject_name(String project_name) {
    this.project_name = project_name;
  }
  
  public String getProject_spec() {
    return this.project_spec;
  }
  
  public void setProject_spec(String project_spec) {
    this.project_spec = project_spec;
  }
  
  public String getProject_units() {
    return this.project_units;
  }
  
  public void setProject_units(String project_units) {
    this.project_units = project_units;
  }
  
  public Integer getCategory_id() {
    return this.category_id;
  }
  
  public void setCategory_id(Integer category_id) {
    this.category_id = category_id;
  }
  
  public String getInput_code() {
    return this.input_code;
  }
  
  public void setInput_code(String input_code) {
    this.input_code = input_code;
  }
  
  public Date getStart_date() {
    return this.start_date;
  }
  
  public void setStart_date(Date start_date) {
    this.start_date = start_date;
  }
  
  public Date getStop_date() {
    return this.stop_date;
  }
  
  public void setStop_date(Date stop_date) {
    this.stop_date = stop_date;
  }
  
  public String getPosition() {
    return this.position;
  }
  
  public void setPosition(String position) {
    this.position = position;
  }
}
