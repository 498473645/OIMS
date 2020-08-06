package cn.com.oims.web.form;

import java.io.File;
import java.io.IOException;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

public class ExcelTest {
  public static void main(String[] adf) {
    try {
      Workbook workbook = Workbook.getWorkbook(new File("C:\\Users\\Think-Pad\\Downloads\\old.xls"));
      Sheet sheet = workbook.getSheet(0);
      String[] tempValue = new String[sheet.getColumns()];
      for (int i = 0; i < sheet.getRows(); i++) {
        for (int j = 0; j < sheet.getColumns(); j++) {
          String value = sheet.getCell(j, i).getContents();
          System.out.print(String.valueOf(value) + "\t\t");
        } 
        System.out.println();
      } 
    } catch (BiffException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } 
  }
}
