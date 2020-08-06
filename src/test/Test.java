package test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import jxl.Workbook;
import jxl.format.CellFormat;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

public class Test {
  public static void main(String[] args) {
    try {
      Workbook wb = null;
      String excelpath = "E:\\a.xls";
      try {
        InputStream is = new FileInputStream(excelpath);
        wb = Workbook.getWorkbook(is);
      } catch (BiffException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      } 
      WritableWorkbook wbe = Workbook.createWorkbook(new File(excelpath), wb);
      WritableSheet sheet = wbe.getSheet(0);
      WritableCell cell = sheet.getWritableCell(0, 0);
      System.out.println(cell.getContents());
      CellFormat cf = cell.getCellFormat();
      Label lbl = new Label(0, 0, "修改后的值");
      if (cf != null)
        lbl.setCellFormat(cf); 
      sheet.addCell((WritableCell)lbl);
      wbe.write();
      wbe.close();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
}
