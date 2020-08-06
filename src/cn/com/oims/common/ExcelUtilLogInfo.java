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

public class ExcelUtilLogInfo {
  private WritableSheet writeHead(WritableSheet sheet) {
    try {
      Label l = null;
      l = new Label(0, 0, "序号");
      sheet.addCell((WritableCell)l);
      l = new Label(1, 0, "操作内容");
      sheet.addCell((WritableCell)l);
      l = new Label(2, 0, "操作人");
      sheet.addCell((WritableCell)l);
      l = new Label(3, 0, "操作时间");
      sheet.addCell((WritableCell)l);
      l = new Label(4, 0, "日志级别");
      sheet.addCell((WritableCell)l);
      l = new Label(5, 0, "操作结果");
      sheet.addCell((WritableCell)l);
    } catch (RowsExceededException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
    return sheet;
  }
  
  private WritableSheet writeData(WritableSheet sheet, List<Map<String, Object>> log) {
    int r = 0;
    try {
      for (Map<String, Object> h : log) {
        r++;
        Label l = null;
        l = new Label(0, r, (String)h.get("id"));
        sheet.addCell((WritableCell)l);
        l = new Label(1, r, (String)h.get("cznr"));
        sheet.addCell((WritableCell)l);
        l = new Label(2, r, (String)h.get("czr"));
        sheet.addCell((WritableCell)l);
        l = new Label(3, r, (String)h.get("czsj"));
        sheet.addCell((WritableCell)l);
        l = new Label(4, r, (String)h.get("rzjb"));
        sheet.addCell((WritableCell)l);
        l = new Label(5, r, (String)h.get("czjg"));
        sheet.addCell((WritableCell)l);
      } 
    } catch (RowsExceededException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
    return sheet;
  }
  
  public String exportLogInfo(String filePath, List<Map<String, Object>> OimsLog) throws Exception {
    File p = new File(filePath);
    if (!p.exists() && !p.isDirectory())
      p.mkdirs(); 
    String fileName = String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".xls";
    String filePathName = String.valueOf(filePath) + System.getProperty("file.separator") + fileName;
    File file = new File(filePathName);
    file.createNewFile();
    WritableWorkbook wbook = Workbook.createWorkbook(file);
    WritableSheet wsheet = wbook.createSheet("日志信息", 0);
    WritableFont wfont = new WritableFont(WritableFont.ARIAL, 16, WritableFont.BOLD, false, 
        UnderlineStyle.NO_UNDERLINE, 
        Colour.BLACK);
    WritableCellFormat titleFormat = new WritableCellFormat(wfont);
    writeHead(wsheet);
    writeData(wsheet, OimsLog);
    wbook.write();
    wbook.close();
    return fileName;
  }
}
