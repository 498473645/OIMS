package cn.com.oims.web.form;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class CleanExcel {
  public static void clean(String inFile, String outFile) {
    InputStream is = null;
    Workbook inWb = null;
    OutputStream os = null;
    WritableWorkbook outWb = null;
    try {
      is = new FileInputStream(inFile);
      inWb = Workbook.getWorkbook(is);
      os = new FileOutputStream(outFile);
      outWb = Workbook.createWorkbook(os);
      Sheet inSheet = inWb.getSheet(0);
      WritableSheet outSheet = outWb.createSheet("日志信息", 0);
      boolean flag = true;
      int i = 0;
      while (flag) {
        Cell tmp = inSheet.getCell(0, i);
        String c = tmp.getContents().trim();
        if (c.equals("break")) {
          flag = false;
          break;
        } 
        for (int j = 0; j < 6; j++) {
          Cell inCell = inSheet.getCell(j, i);
          String content = inCell.getContents().trim();
          Label labelCF = new Label(j, i, content);
          outSheet.addCell((WritableCell)labelCF);
        } 
        i++;
      } 
      System.out.println(i);
      outWb.write();
      outWb.close();
      os.close();
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public static void main(String[] args) {
    try {
      String in = "C:\\Users\\Think-Pad\\Downloads\\old.xls";
      String out = "C:\\Users\\Think-Pad\\Downloads\\out.xls";
      clean(in, out);
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
}
