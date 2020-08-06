package cn.com.oims.web.form;

public class ChartHql {
  private String select = "";
  
  private String from = "";
  
  private String where = "";
  
  private String order = "";
  
  private String group = "";
  
  private String findTag = "";
  
  private String tjType = "";
  
  private String findEx1 = "";
  
  private String findEx2 = "";
  
  public String getFindEx1() {
    return this.findEx1;
  }
  
  public void setFindEx1(String findEx1) {
    this.findEx1 = findEx1;
  }
  
  public String getFindEx2() {
    return this.findEx2;
  }
  
  public void setFindEx2(String findEx2) {
    this.findEx2 = findEx2;
  }
  
  public String getTjType() {
    return this.tjType;
  }
  
  public void setTjType(String tjType) {
    this.tjType = tjType;
  }
  
  public String getFindTag() {
    return this.findTag;
  }
  
  public void setFindTag(String findTag) {
    this.findTag = findTag;
  }
  
  public String getSelect() {
    return " " + this.select + " ";
  }
  
  public void setSelect(String select) {
    this.select = select;
  }
  
  public String getFrom() {
    return " " + this.from + " ";
  }
  
  public void setFrom(String from) {
    this.from = String.valueOf(from) + " ";
  }
  
  public String getWhere() {
    return " " + this.where + " ";
  }
  
  public void setWhere(String where) {
    this.where = where;
  }
  
  public String getOrder() {
    return " " + this.order + " ";
  }
  
  public void setOrder(String order) {
    this.order = order;
  }
  
  public String getGroup() {
    return " " + this.group + " ";
  }
  
  public void setGroup(String group) {
    this.group = group;
  }
}
