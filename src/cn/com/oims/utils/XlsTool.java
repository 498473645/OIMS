package cn.com.oims.utils;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class XlsTool {
  public static String ColumnOver = "OVER";
  
  public static void createXlsOS(OutputStream os, List<List<String>> data) {
    try {
      WritableWorkbook writableWorkbook = Workbook.createWorkbook(os);
      WritableSheet writableSheet = writableWorkbook.createSheet("Sheet0", 0);
      Label cell = null;
      List<String> colLst = null;
      for (int row = 0; row < data.size(); row++) {
        colLst = data.get(row);
        for (int col = 0; col < colLst.size(); col++) {
          cell = new Label(col, row, colLst.get(col));
          writableSheet.addCell((WritableCell)cell);
        } 
      } 
      writableWorkbook.write();
      writableWorkbook.close();
      os.flush();
      os.close();
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public static List<List<String>> readXls(InputStream inputStream) {
    Workbook book = null;
    try {
      book = Workbook.getWorkbook(inputStream);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    Sheet sheet = book.getSheet(0);
    int columns = getColumns(sheet);
    List<List<String>> lstSheet = new ArrayList<>(sheet.getRows());
    List<String> row = null;
    for (int r = 0; r < sheet.getRows(); r++) {
      row = new ArrayList<>(columns);
      for (int c = 0; c < columns; c++)
        row.add(sheet.getCell(c, r).getContents().trim()); 
      lstSheet.add(row);
    } 
    return lstSheet;
  }
  
  private static int getColumns(Sheet sheet) {
    Cell[] row = sheet.getRow(0);
    for (int i = 0; i < row.length; i++) {
      if (ColumnOver.equals(row[i].getContents().trim()))
        return i; 
    } 
    return 0;
  }
}
