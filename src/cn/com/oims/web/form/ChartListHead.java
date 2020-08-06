package cn.com.oims.web.form;

public class ChartListHead {
  private String title;
  
  private String column;
  
  private String index;
  
  private String defValue;
  
  private String tValue;
  
  private String fValue;
  
  public String gettValue() {
    return this.tValue;
  }
  
  public void settValue(String tValue) {
    this.tValue = tValue;
  }
  
  public String getfValue() {
    return this.fValue;
  }
  
  public void setfValue(String fValue) {
    this.fValue = fValue;
  }
  
  public String getTitle() {
    return this.title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public String getColumn() {
    return this.column;
  }
  
  public void setColumn(String column) {
    this.column = column;
  }
  
  public String getIndex() {
    return this.index;
  }
  
  public void setIndex(String index) {
    this.index = index;
  }
  
  public String getDefValue() {
    return this.defValue;
  }
  
  public void setDefValue(String defValue) {
    this.defValue = defValue;
  }
  
  public String getValue(boolean v) {
    return v ? this.tValue : this.fValue;
  }
}
