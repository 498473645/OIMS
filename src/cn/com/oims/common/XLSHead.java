package cn.com.oims.common;

public class XLSHead {
  private String columnIndex;
  
  private String columnName;
  
  private ColumnType columnType;
  
  private String defValue;
  
  private String trueValue;
  
  private String flaseValue;
  
  private String columnWidth;
  
  public XLSHead() {
    this.columnType = ColumnType.STR;
    this.defValue = "";
  }
  
  public XLSHead(String columnIndex, String columnName) {
    this.columnType = ColumnType.STR;
    this.defValue = "";
    setValue(columnIndex, columnName, "Str", "", "", "");
  }
  
  public XLSHead(String columnIndex, String columnName, String columnType) {
    this.columnType = ColumnType.STR;
    this.defValue = "";
    setValue(columnIndex, columnName, columnType, "", "", "");
  }
  
  public XLSHead(String columnIndex, String columnName, String columnType, String trueValue, String flaseValue) {
    this.columnType = ColumnType.STR;
    this.defValue = "";
    setValue(columnIndex, columnName, columnType, trueValue, flaseValue, "100");
  }
  
  private void setValue(String columnIndex, String columnName, String columnType, String trueValue, String flaseValue, String columnWidth) {
    this.columnIndex = columnIndex;
    this.columnName = columnName;
    if (columnType.toUpperCase().equals("NUM")) {
      this.columnType = ColumnType.NUM;
    } else if (columnType.toUpperCase().equals("STR")) {
      this.columnType = ColumnType.STR;
    } else if (columnType.toUpperCase().equals("DATE")) {
      this.columnType = ColumnType.DATE;
    } else if (columnType.toUpperCase().equals("TIME")) {
      this.columnType = ColumnType.TIME;
    } else if (columnType.toUpperCase().equals("BOOL")) {
      this.columnType = ColumnType.BOOL;
    } else {
      this.columnType = ColumnType.STR;
    } 
    this.trueValue = trueValue;
    this.flaseValue = flaseValue;
    this.columnWidth = columnWidth;
  }
  
  public enum ColumnType {
    NUM, STR, DATE, TIME, BOOL;
  }
  
  public String getColumnIndex() {
    return this.columnIndex;
  }
  
  public void setColumnIndex(String columnIndex) {
    this.columnIndex = columnIndex;
  }
  
  public String getColumnWidth() {
    return this.columnWidth;
  }
  
  public void setColumnWidth(String columnWidth) {
    this.columnWidth = columnWidth;
  }
  
  public String getColumnName() {
    return this.columnName;
  }
  
  public void setColumnName(String columnName) {
    this.columnName = columnName;
  }
  
  public ColumnType getColumnType() {
    return this.columnType;
  }
  
  public void setColumnType(String columnType) {
    if (columnType.toUpperCase().equals("NUM")) {
      this.columnType = ColumnType.NUM;
    } else if (columnType.toUpperCase().equals("STR")) {
      this.columnType = ColumnType.STR;
    } else if (columnType.toUpperCase().equals("DATE")) {
      this.columnType = ColumnType.DATE;
    } else if (columnType.toUpperCase().equals("TIME")) {
      this.columnType = ColumnType.TIME;
    } else if (columnType.toUpperCase().equals("BOOL")) {
      this.columnType = ColumnType.BOOL;
    } else {
      this.columnType = ColumnType.STR;
    } 
  }
  
  public String getDefValue() {
    return this.defValue;
  }
  
  public void setDefValue(String defValue) {
    this.defValue = defValue;
  }
  
  public String getTrueValue() {
    return this.trueValue;
  }
  
  public void setTrueValue(String trueValue) {
    this.trueValue = trueValue;
  }
  
  public String getFlaseValue() {
    return this.flaseValue;
  }
  
  public void setFlaseValue(String flaseValue) {
    this.flaseValue = flaseValue;
  }
}
