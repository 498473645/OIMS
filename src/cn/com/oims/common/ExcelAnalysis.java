package cn.com.oims.common;

import cn.com.oims.dao.pojo.FixedAssets;
import cn.com.oims.dao.pojo.YuYan;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

public class ExcelAnalysis {
  public static List<YuYan> exportYuYanToExcel(String path) {
    File f = new File(path);
    List<YuYan> yuyanList = new ArrayList<YuYan>();
    try {
      Workbook book = Workbook.getWorkbook(f);
      Sheet sheet = book.getSheet(0);
      for (int i = 0; i < sheet.getRows(); i++) {
        if (i > 0) {
          YuYan yuyan = new YuYan();
          for (int j = 0; j < sheet.getColumns(); j++) {
            Cell cell = sheet.getCell(j, i);
            String content = cell.getContents();
            if (j == 1)
              yuyan.setId(Integer.valueOf(Integer.parseInt(content))); 
            if (j == 2)
              yuyan.setMc(content); 
            if (j == 3)
              yuyan.setWenzi(content); 
            if (j == 4)
              yuyan.setFenlei(Integer.valueOf(Integer.parseInt(content))); 
          } 
          yuyanList.add(yuyan);
        } 
      } 
    } catch (BiffException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } 
    return yuyanList;
  }
  
  public static List<Map<String, Object>> importExcelToObject(String path, List l, List<String> ll) {
    boolean b = false;
    File f = new File(path);
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    try {
      InputStream stream = new FileInputStream(f);
      Workbook book = Workbook.getWorkbook(stream);
      Sheet sheet = book.getSheet(0);
      if (sheet.getColumns() == ll.size()) {
        for (int k = 0; k < sheet.getColumns(); k++) {
          Cell c = sheet.getCell(k, 0);
          String ct = c.getContents();
          if (ct.equals(ll.get(k)))
            b = true; 
        } 
      } else {
        b = false;
      } 
      if (b) {
        for (int i = 1; i < sheet.getRows(); i++) {
          if (i > 1 || i == 1) {
            if (sheet.getCell(0, i).getContents() == "" || 
              sheet.getCell(0, i).getContents().equals(""))
              break;
            Map map = new HashMap();
            for (int j = 0; j < sheet.getColumns(); j++) {
              Cell cell = sheet.getCell(j, i);
              String content = cell.getContents();
              map.put(l.get(j), content);
            } 
            list.add(map);
          } 
        } 
      } else {
        list = null;
      } 
    } catch (BiffException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } 
    return list;
  }
  
  public static void importExcelToObject(File file) {
    InputStream stream = null;
    Workbook book = null;
    try {
      stream = new FileInputStream(file);
      book = Workbook.getWorkbook(stream);
      Sheet[] sheets = book.getSheets();
      byte b;
      int i;
      Sheet[] arrayOfSheet1;
      for (i = (arrayOfSheet1 = sheets).length, b = 0; b < i; ) {
        Sheet sheet = arrayOfSheet1[b];
        for (int j = 0; j < sheet.getRows(); j++) {
          FixedAssets fa = new FixedAssets();
          Cell c = sheet.getCell(2, 1);
          String no = c.getContents();
          System.out.println(no);
        } 
        b++;
      } 
    } catch (Exception exception) {
    
    } finally {
      if (book != null)
        book.close(); 
      if (stream != null)
        try {
          stream.close();
          file.delete();
        } catch (IOException iOException) {} 
    } 
  }
  
  public static void main(String[] args) {
    File f = new File("C:\\Users\\liyan\\Downloads\\20160509032034.xls");
    importExcelToObject(f);
  }
}
