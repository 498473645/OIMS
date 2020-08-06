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

public class CreateExcelUtils {
  private WritableSheet writeHead(WritableSheet sheet) {
    try {
      Label l = null;
      l = new Label(0, 0, "序号");
      sheet.addCell((WritableCell)l);
      l = new Label(1, 0, "病例号");
      sheet.addCell((WritableCell)l);
      l = new Label(2, 0, "患者姓名");
      sheet.addCell((WritableCell)l);
      l = new Label(3, 0, "性别");
      sheet.addCell((WritableCell)l);
      l = new Label(4, 0, "生日");
      sheet.addCell((WritableCell)l);
      l = new Label(5, 0, "身份证号");
      sheet.addCell((WritableCell)l);
      l = new Label(6, 0, "手机");
      sheet.addCell((WritableCell)l);
      l = new Label(7, 0, "工作单位");
      sheet.addCell((WritableCell)l);
      l = new Label(8, 0, "注册日期");
      sheet.addCell((WritableCell)l);
      l = new Label(9, 0, "地区");
      sheet.addCell((WritableCell)l);
    } catch (RowsExceededException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
    return sheet;
  }
  
  private WritableSheet writeData(WritableSheet sheet, List<Map<String, Object>> hzlist) {
    int r = 0;
    try {
      for (Map<String, Object> h : hzlist) {
        r++;
        Label l = null;
        l = new Label(0, r, (String)h.get("id"));
        sheet.addCell((WritableCell)l);
        l = new Label(1, r, (String)h.get("binglihao"));
        sheet.addCell((WritableCell)l);
        l = new Label(2, r, (String)h.get("xingming"));
        sheet.addCell((WritableCell)l);
        l = new Label(3, r, (String)h.get("xingbie"));
        sheet.addCell((WritableCell)l);
        l = new Label(4, r, (String)h.get("shengri"));
        sheet.addCell((WritableCell)l);
        l = new Label(5, r, (String)h.get("sfzh"));
        sheet.addCell((WritableCell)l);
        l = new Label(6, r, (String)h.get("shouji"));
        sheet.addCell((WritableCell)l);
        l = new Label(7, r, (String)h.get("gzdw"));
        sheet.addCell((WritableCell)l);
        l = new Label(8, r, (String)h.get("zcrq"));
        sheet.addCell((WritableCell)l);
        l = new Label(9, r, (String)h.get("diqu"));
        sheet.addCell((WritableCell)l);
      } 
    } catch (RowsExceededException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
    return sheet;
  }
  
  public String exportHuanZheXinXi(String filePath, List<Map<String, Object>> hzlist) throws Exception {
    File p = new File(filePath);
    if (!p.exists() && !p.isDirectory())
      p.mkdirs(); 
    String fileName = String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".xls";
    String filePathName = String.valueOf(filePath) + System.getProperty("file.separator") + fileName;
    File file = new File(filePathName);
    file.createNewFile();
    WritableWorkbook wbook = Workbook.createWorkbook(file);
    WritableSheet wsheet = wbook.createSheet("患者信息", 0);
    WritableFont wfont = new WritableFont(WritableFont.ARIAL, 16, WritableFont.BOLD, false, 
        UnderlineStyle.NO_UNDERLINE, 
        Colour.BLACK);
    WritableCellFormat titleFormat = new WritableCellFormat(wfont);
    writeHead(wsheet);
    writeData(wsheet, hzlist);
    wbook.write();
    wbook.close();
    return fileName;
  }
}
