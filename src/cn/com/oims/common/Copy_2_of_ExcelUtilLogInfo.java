package cn.com.oims.common;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import jxl.Workbook;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public class Copy_2_of_ExcelUtilLogInfo {
  public File exportLogInfo(String filePath, List<Map<String, Object>> className, List<List> list) throws Exception {
    File p = new File(filePath);
    if (!p.exists() && !p.isDirectory())
      p.mkdirs(); 
    String fileName = 
      String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".xls";
    String filePathName = String.valueOf(filePath) + System.getProperty("file.separator") + 
      fileName;
    File file = new File(filePathName);
    file.createNewFile();
    WritableWorkbook wbook = Workbook.createWorkbook(file);
    WritableSheet wsheet = wbook.createSheet("信息记录", 0);
    WritableFont wfont = new WritableFont(WritableFont.ARIAL, 16, 
        WritableFont.BOLD, false, 
        UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
    WritableCellFormat titleFormat = new WritableCellFormat(wfont);
    writeHead(wsheet, list);
    writeData(wsheet, className, list);
    wbook.write();
    wbook.close();
    return file;
  }
  
  public void exportLogInfo(File file, List<Map<String, Object>> data, List<List> list) throws Exception {
    System.out.println("file path:" + file.getAbsolutePath());
    Workbook wbook = Workbook.getWorkbook(file);
    WritableWorkbook wwb = Workbook.createWorkbook(file, wbook);
    WritableSheet wsheet = wwb.getSheet(0);
    writeData(wsheet, data, list);
    wwb.write();
    wwb.close();
  }
  
  private WritableSheet writeHead(WritableSheet sheet, List<List> list) {
    try {
      List<String> p = list.get(0);
      Label l = null;
      int r = 0;
      for (int i = 0; i < p.size(); i++) {
        l = new Label(r, 0, p.get(i));
        sheet.addCell((WritableCell)l);
        r++;
      } 
    } catch (RowsExceededException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
    return sheet;
  }
  
  private WritableSheet writeData(WritableSheet sheet, List<Map<String, Object>> log, List<List> list) {
    int r = 0, j = 0;
    Label l = null;
    try {
      for (int i = 0; i < log.size(); i++) {
        Map h = log.get(i);
        r++;
        for (int k = 0; k < ((List)list.get(1)).size(); k++) {
          Object value = h.get(((List<String>)list.get(1)).get(k));
          Object object1 = (value == null) ? "" : value;
          l = new Label(k, r, (String)object1);
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
}
