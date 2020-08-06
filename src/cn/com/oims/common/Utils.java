package cn.com.oims.common;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Vector;
import jxl.Cell;
import jxl.Workbook;
import jxl.format.CellFormat;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.WritableCell;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public class Utils {
  public static boolean strIsEmpty(String s) {
    if (s != null && !s.equals("")) {
      return false;
    }
    return true;
  }
  
  public static boolean strIsNotEmpty(String s) {
    return !strIsEmpty(s);
  }
  
  public static String strNullDo(String s, String def) {
    if (strIsEmpty(s)) {
      return def;
    }
    return s;
  }
  
  public static String strNullDo(String s) {
    return strNullDo(s, "");
  }
  
  public static String dateToStrShort(Date d) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    return sdf.format(d);
  }
  
  public static Date strToDateDay(String d) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date date = null;
    try {
      date = sdf.parse(d);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    return date;
  }
  
  public static String dateToStrLong(Date d) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    return sdf.format(d);
  }
  
  public static Date strToDateTime(String d) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date date = null;
    try {
      date = sdf.parse(d);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    return date;
  }
  
  public static String whereOrAnd(String hql) {
    if (hql.indexOf("where") > 0) {
      return " and ";
    }
    return " where ";
  }
  
  public static void tLog(String info, String fix) {
    System.out.println(String.valueOf(fix) + "==\t" + info);
  }
  
  public static void tLog(String info) {
    tLog(info, "log==\t");
  }
  
  public static Vector<XLSHead> strToVector(String hs) {
    Vector<XLSHead> vh = new Vector<XLSHead>();
    XLSHead xh = null;
    byte b;
    int i;
    String[] arrayOfString;
    for (i = (arrayOfString = hs.split(",")).length, b = 0; b < i; ) {
      String h = arrayOfString[b];
      xh = new XLSHead();
      String[] heads = h.split("<f>");
      byte b1;
      int j;
      String[] arrayOfString1;
      for (j = (arrayOfString1 = heads).length, b1 = 0; b1 < j; ) {
        String head = arrayOfString1[b1];
        String[] attrKV = head.split("<kv>");
        if (attrKV[0].equals("title")) {
          xh.setColumnName(attrKV[1]);
        }
        if (attrKV[0].equals("column")) {
          xh.setColumnIndex(attrKV[1]);
        }
        if (attrKV[0].equals("defValue")) {
          xh.setDefValue(attrKV[1]);
        }
        if (attrKV[0].equals("tValue")) {
          xh.setTrueValue(attrKV[1]);
        }
        if (attrKV[0].equals("fValue")) {
          xh.setFlaseValue(attrKV[1]);
        }
        if (attrKV[0].equals("type")) {
          xh.setColumnType(attrKV[1]);
        }
        if (attrKV[0].equals("width")) {
          xh.setColumnType(attrKV[1]);
        }
        b1++;
      } 
      vh.add(xh);
      b++;
    } 
    return vh;
  }
  
  public static File createXLS(List<Map<String, Object>> data, Vector<XLSHead> heads) throws Exception {
    WritableWorkbook book = null;
    String path = Utils.class.getClassLoader().getResource("/").getPath();
    path = path.substring(0, path.lastIndexOf("/"));
    path = path.substring(0, path.lastIndexOf("/"));
    File p = new File(String.valueOf(path) + "/oimsv3_xls/temp");
    p.mkdirs();
    File f = new File(String.valueOf(path) + "/oimsv3_xls/temp/bool.xls");
    f.createNewFile();
    book = Workbook.createWorkbook(f);
    WritableSheet sheet = book.createSheet(dateToStrShort(new Date()), 0);
    writeChartHeadAndData(sheet, heads, data);
    book.write();
    book.close();
    System.out.println(f.getAbsolutePath());
    return f;
  }
  
  public static WritableSheet writeChartHeadAndData(WritableSheet sheet, Vector<XLSHead> heads, List<Map<String, Object>> data) {
    try {
      Label l = null;
      for (int i = 0; i < heads.size(); i++) {
        l = new Label(i, 0, ((XLSHead)heads.get(i)).getColumnName());
        sheet.addCell((WritableCell)l);
      } 
      Map<String, Object> m = null;
      for (int j = 0; j < data.size(); j++) {
        m = data.get(j);
        for (int k = 0; k < heads.size(); k++) {
          XLSHead h = heads.get(k);
          String v = h.getDefValue();
          if (m.get(h.getColumnIndex()) == null) {
            v = "";
          } else if (h.getColumnType() == XLSHead.ColumnType.BOOL) {
            boolean b = ((Boolean)m.get(h.getColumnIndex())).booleanValue();
            v = b ? h.getTrueValue() : h.getFlaseValue();
          } else if (h.getColumnType() == XLSHead.ColumnType.DATE) {
            System.out.println("h.getColumnIndex():" + h.getColumnIndex());
            Date d = (Date)m.get(h.getColumnIndex());
            v = dateToStrShort(d);
          } else if (h.getColumnType() == XLSHead.ColumnType.TIME) {
            Date d = (Date)m.get(h.getColumnIndex());
            v = dateToStrLong(d);
          } else if (h.getColumnType() == XLSHead.ColumnType.NUM) {
            v = (String)m.get(h.getColumnIndex());
          } else {
            v = m.get(h.getColumnIndex()).toString();
          } 
          v = (v == null) ? h.getDefValue() : v;
          l = new Label(k, j + 1, v);
          sheet.addCell((WritableCell)l);
        } 
      } 
    } catch (RowsExceededException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
    return sheet;
  }
  
  public static boolean objIsNull(Object o) {
    return (o == null);
  }
  
  public static boolean ObjIsNotNull(Object o) {
    return !objIsNull(o);
  }
  
  public static Date ageToBirthday(int age) {
    Date d = new Date();
    String ds = dateToStrShort(d);
    String y = ds.split("-")[0];
    String m = ds.split("-")[1];
    String day = ds.split("-")[2];
    int i = Integer.parseInt(y) - age;
    return strToDateDay(String.valueOf(i) + "-" + m + "-" + day);
  }
  
  public static Date strToDateStart(String s) {
    if (s != null && !s.equals("")) {
      s = String.valueOf(s) + " 00:00:00";
    }
    return strToDateTime(s);
  }
  
  public static Date strToDateEnd(String s) {
    if (s != null && !s.equals("")) {
      s = String.valueOf(s) + " 23:59:59";
    }
    return strToDateTime(s);
  }
  
  public static Date todayToDateStart() {
    String d = dateToStrShort(new Date());
    return strToDateTime(String.valueOf(d) + " 00:00:00");
  }
  
  public static Date todayToDateEnd() {
    String d = dateToStrShort(new Date());
    return strToDateTime(String.valueOf(d) + " 23:59:59");
  }
  
  public static void copyNewValue(Object pojo, Object data) throws Exception {
    Class<?> pojoc = pojo.getClass();
    Class<?> datac = data.getClass();
    if (pojoc.equals(datac)) {
      Method[] pms = pojoc.getMethods();
      String mn = "";
      byte b;
      int i;
      Method[] arrayOfMethod1;
      for (i = (arrayOfMethod1 = pms).length, b = 0; b < i; ) {
        Method pm = arrayOfMethod1[b];
        if (pm.getName().startsWith("get") || pm.getName().startsWith("is")) {
          mn = pm.getName();
          if (pojoc.getMethod(mn, new Class[0]).invoke(pojo, new Object[0]) == null || !pojoc.getMethod(mn, new Class[0]).invoke(pojo, new Object[0]).equals(datac.getMethod(mn, new Class[0]).invoke(data, new Object[0]))) {
            if (mn.startsWith("get")) {
              pojoc.getMethod("set" + mn.substring(3), new Class[] { pojoc.getMethod(mn, new Class[0]).getReturnType() }).invoke(pojo, new Object[] { datac.getMethod(mn, new Class[0]).invoke(data, new Object[0]) });
            } else if (mn.startsWith("is")) {
              pojoc.getMethod("set" + mn.substring(2), new Class[] { pojoc.getMethod(mn, new Class[0]).getReturnType() }).invoke(pojo, new Object[] { datac.getMethod(mn, new Class[0]).invoke(data, new Object[0]) });
            }
          }
        } 
        b++;
      } 
    } else {
      throw new Exception("更新时数据类型不匹配异常");
    } 
  }
  
  public static Properties getProps(String fileName) {
    Properties props = new Properties();
    try {
      InputStream in = new BufferedInputStream(new FileInputStream(fileName));
      props.load(in);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } 
    return props;
  }
  
  public static void modifyExcel(WritableWorkbook wbe, int sheetNum, int cel, int row, int count, String ygName, Map<Integer, Boolean> mapBool) {
    try {
      WritableSheet sheet = wbe.getSheet(sheetNum);
      Cell cell = sheet.getCell(cel, row);
      int value = 0;
      try {
        String oldValue = cell.getContents();
        if (oldValue == null || oldValue.isEmpty()) {
          value = count;
        } else {
          value = Integer.parseInt(oldValue) + count;
        } 
      } catch (Exception exception) {}
      Number lbl = new Number(cel, row, value);
      sheet.addCell((WritableCell)lbl);
      WritableCell cellYGName = sheet.getWritableCell(0, row);
      CellFormat ygcf = cellYGName.getCellFormat();
      String ygValue = cellYGName.getContents();
      if (ygValue == null || ygValue.isEmpty()) {
        Label ygLbl = new Label(0, row, ygName);
        if (ygcf != null) {
          ygLbl.setCellFormat(ygcf);
        }
        if (value > 0) {
          sheet.addCell((WritableCell)ygLbl);
          mapBool.put(Integer.valueOf(sheetNum), Boolean.valueOf(true));
        } 
      } 
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
  
  public static boolean checkCellValueExist(WritableWorkbook wbe, int sheetNum, int cel, int row) {
    WritableSheet sheet = wbe.getSheet(sheetNum);
    WritableCell cellYGName = sheet.getWritableCell(cel, row);
    String ygValue = cellYGName.getContents();
    if (ygValue == null || ygValue.isEmpty()) {
      return false;
    }
    return true;
  }
  
  public static void main(String[] args) {
    Map<Integer, Integer> map = new HashMap<Integer, Integer>();
    map.put(Integer.valueOf(1), Integer.valueOf(2));
    map.put(Integer.valueOf(2), Integer.valueOf(2));
    System.out.println((map.get(Integer.valueOf(3)) == null));
  }
  
  public static Integer getAge(Date birth) {
    if (birth == null) {
      return null;
    }
    Calendar cal = Calendar.getInstance();
    int y = cal.get(1);
    cal.setTime(birth);
    return Integer.valueOf(y - cal.get(1));
  }
}
