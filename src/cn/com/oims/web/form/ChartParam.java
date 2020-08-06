package cn.com.oims.web.form;

public class ChartParam {
  private String type;
  
  private String name;
  
  private String value;
  
  public ChartParam() {}
  
  public ChartParam(String type, String name, String value) {
    this.type = type;
    this.name = name;
    this.value = value;
  }
  
  public String getType() {
    return this.type;
  }
  
  public void setType(String type) {
    this.type = type;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getValue() {
    return this.value;
  }
  
  public void setValue(String value) {
    this.value = value;
  }
}
