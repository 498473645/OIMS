package cn.com.oims.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class ChildExpImpUtils {
  public static final int PCHAOJIANCHASHEBEIID = 110;
  
  public static final int ACHAOJIANCHASHEBEIID = 112;
  
  public static final int PCHAOJIANCHAXIANGMUID = 83;
  
  public static final int ACHAOJIANCHAXIANGMUID = 56;
  
  public static final int YANYAJIANCHASHEBEIID = 111;
  
  public static final int YANYAJIANCHAXIANGMUID = 78;
  
  public static File createXLS(List<Map<String, Object>> data, Vector<XLSHead> heads, List<String> sheets) throws Exception {
    WritableWorkbook workbook = null;
    String path = ChildExpImpUtils.class.getClassLoader().getResource("/").getPath();
    path = path.substring(1, path.lastIndexOf("/"));
    path = path.substring(0, path.lastIndexOf("/"));
    File temp = new File(String.valueOf(path) + "/oimsv3_xls/child/temp");
    temp.mkdirs();
    File f = new File(String.valueOf(path) + "/oimsv3_xls/child/temp/child.xls");
    f.createNewFile();
    workbook = Workbook.createWorkbook(f);
    List<WritableSheet> sheet = new ArrayList<WritableSheet>();
    for (int i = 0; i < sheets.size(); i++) {
      if (sheets.get(i) != null)
        sheet.add(workbook.createSheet(sheets.get(i), i)); 
    } 
    for (WritableSheet writableSheet : sheet)
      Utils.writeChartHeadAndData(writableSheet, heads, data); 
    workbook.write();
    workbook.close();
    return f;
  }
  
  public static String importChildTemFilePath() throws Exception {
    String path = ChildExpImpUtils.class.getClassLoader().getResource("/").getPath();
    path = path.substring(1, path.lastIndexOf("/"));
    path = path.substring(0, path.lastIndexOf("/"));
    File temp = new File(String.valueOf(path) + "/oimsv3_xls/childimport/temp");
    temp.mkdirs();
    File f = new File(String.valueOf(path) + "/oimsv3_xls/childimport/temp/child.xls");
    f.createNewFile();
    return String.valueOf(path) + "/oimsv3_xls/childimport/temp/child.xls";
  }
  
  public static void exportXls(List<Map<String, Object>> data, Vector<XLSHead> heads, List<String> sheets, HttpServletRequest req, HttpServletResponse res) {
    res.reset();
    res.setContentType("application/vnd.ms-excel");
    res.setCharacterEncoding("UTF-8");
    try {
      int b;
      String name = "attachment;filename=" + URLEncoder.encode("????????????-" + Utils.dateToStrShort(new Date()) + ".xls", "UTF-8");
      res.setHeader("Content-disposition", name);
      File f = createXLS(data, heads, sheets);
      FileInputStream fis = new FileInputStream(f);
      ServletOutputStream sos = res.getOutputStream();
      byte[] bs = new byte[1024];
      do {
        b = fis.read(bs);
        sos.write(bs);
      } while (b != -1);
      sos.flush();
      sos.close();
    } catch (Exception e) {
      Utils.tLog(e.getMessage(), "??????????????????");
      e.printStackTrace();
    } 
  }
  
  public static Vector<XLSHead> createXlsHead() {
    Vector<XLSHead> hs = new Vector<XLSHead>();
    XLSHead h = null;
    h = new XLSHead("binglihao", "?????????");
    hs.add(h);
    h = new XLSHead("lianxiren", "????????????");
    hs.add(h);
    h = new XLSHead("xingming", "????????????");
    hs.add(h);
    h = new XLSHead("yuchanqi", "????????????");
    hs.add(h);
    h = new XLSHead("xingbie", "??????");
    hs.add(h);
    h = new XLSHead("shengri", "????????????");
    hs.add(h);
    h = new XLSHead("age", "????????????");
    hs.add(h);
    h = new XLSHead("chushengtizhong", "????????????");
    hs.add(h);
    h = new XLSHead("chushengshengao", "????????????");
    hs.add(h);
    h = new XLSHead("shengao", "????????????");
    hs.add(h);
    h = new XLSHead("tizhong", "????????????");
    hs.add(h);
    h = new XLSHead("chushengqingkuang", "????????????");
    hs.add(h);
    h = new XLSHead("danqianqingkuang", "????????????");
    hs.add(h);
    h = new XLSHead("keyichuanqingkuang", "???????????????");
    hs.add(h);
    h = new XLSHead("caozuo_Time", "????????????");
    hs.add(h);
    h = new XLSHead("mobile", "??????");
    hs.add(h);
    h = new XLSHead("fenmianfangshi", "????????????");
    hs.add(h);
    h = new XLSHead("state", "??????");
    hs.add(h);
    h = new XLSHead("zhenbie", "??????");
    hs.add(h);
    h = new XLSHead("jiuzhenkeshi", "????????????");
    hs.add(h);
    h = new XLSHead("caozuoren", "?????????");
    hs.add(h);
    h = new XLSHead("youyanyanya", "????????????");
    hs.add(h);
    h = new XLSHead("youyanyanya", "????????????");
    hs.add(h);
    h = new XLSHead("yanyajianchashijian", "??????????????????");
    hs.add(h);
    h = new XLSHead("youyanpchao1", "??????P???1");
    hs.add(h);
    h = new XLSHead("youyanpchao2", "??????P???2");
    hs.add(h);
    h = new XLSHead("youyanpchao3", "??????P???3");
    hs.add(h);
    h = new XLSHead("youyanpingjunzhi", "??????P????????????");
    hs.add(h);
    h = new XLSHead("zuoyanpchao1", "??????P???1");
    hs.add(h);
    h = new XLSHead("zuoyanpchao2", "??????P???2");
    hs.add(h);
    h = new XLSHead("zuoyanpchao3", "??????P???3");
    hs.add(h);
    h = new XLSHead("zuoyanpingjunzhi", "??????P????????????");
    hs.add(h);
    h = new XLSHead("pcaojianchashijian", "P???????????????");
    hs.add(h);
    h = new XLSHead("youyanac1", "??????A???AC1");
    hs.add(h);
    h = new XLSHead("youyanl", "L1");
    hs.add(h);
    h = new XLSHead("youyanv", "V1");
    hs.add(h);
    h = new XLSHead("youyanal", "AL1");
    hs.add(h);
    h = new XLSHead("zuoyanac1", "??????A???AC1");
    hs.add(h);
    h = new XLSHead("youyanl", "L1");
    hs.add(h);
    h = new XLSHead("youyanv", "V1");
    hs.add(h);
    h = new XLSHead("youyanal", "AL1");
    hs.add(h);
    h = new XLSHead("acaojianchashijian", "A???????????????");
    hs.add(h);
    h = new XLSHead("zuoyanqiujing", "????????????");
    hs.add(h);
    h = new XLSHead("zuoyanzhujing", "????????????");
    hs.add(h);
    h = new XLSHead("zuoyanzhoudu", "????????????");
    hs.add(h);
    h = new XLSHead("zuoyankexindu", "???????????????");
    hs.add(h);
    h = new XLSHead("youyanqiujing", "????????????");
    hs.add(h);
    h = new XLSHead("youyanzhujing", "????????????");
    hs.add(h);
    h = new XLSHead("youyanzhoudu", "????????????");
    hs.add(h);
    h = new XLSHead("youyankexindu", "???????????????");
    hs.add(h);
    h = new XLSHead("quguangjianchashijian", "??????????????????");
    hs.add(h);
    h = new XLSHead("youyanjiaomo", "????????????");
    hs.add(h);
    h = new XLSHead("youyanjiemo", "????????????");
    hs.add(h);
    h = new XLSHead("youyanjingti", "????????????");
    hs.add(h);
    h = new XLSHead("youyanboliti", "???????????????");
    hs.add(h);
    h = new XLSHead("youyanshiwangmo", "???????????????");
    hs.add(h);
    h = new XLSHead("youyanshipan", "????????????");
    hs.add(h);
    h = new XLSHead("zuoyanjiaomo", "????????????");
    hs.add(h);
    h = new XLSHead("zuoyanjiemo", "????????????");
    hs.add(h);
    h = new XLSHead("zuoyanjingti", "????????????");
    hs.add(h);
    h = new XLSHead("zuoyanboliti", "???????????????");
    hs.add(h);
    h = new XLSHead("zuoyanshiwangmo", "???????????????");
    hs.add(h);
    h = new XLSHead("zuoyanshipan", "????????????");
    hs.add(h);
    h = new XLSHead("tigejianchashijian", "??????????????????");
    hs.add(h);
    return hs;
  }
  
  public static List<List<String>> importChildCheckInfo(String filePath) {
    List<List<String>> list = new ArrayList<List<String>>();
    File file = new File(filePath);
    try {
      Workbook workbook = Workbook.getWorkbook(file);
      Sheet sheets = workbook.getSheets()[0];
      for (int i = 1; i < sheets.getRows(); i++) {
        List<String> list2 = new ArrayList();
        for (int j = 0; j < sheets.getColumns(); j++)
          list2.add(sheets.getCell(j, i).getContents()); 
        list.add(list2);
      } 
    } catch (BiffException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } 
    return list;
  }
  
  public static Date convertStringToDate(String str) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    if (str.equals("") || str == null) {
      try {
        return sdf.parse(sdf.format(new Date()));
      } catch (ParseException e) {
        e.printStackTrace();
      } 
    } else {
      try {
        return sdf.parse(str);
      } catch (ParseException e) {
        e.printStackTrace();
      } 
    } 
    return null;
  }
  
  public static Float convertStringToFloat(String str) {
    if (str.equals("") || str.equals(null))
      return Float.valueOf(Float.parseFloat("0.0")); 
    return Float.valueOf(Float.parseFloat(str));
  }
  
  public static Integer convertStringToInteger(String str) {
    return Integer.valueOf((str.equals("") || str.equals(null)) ? 0 : Integer.parseInt(str));
  }
  
  public static Boolean convertStringToBoolean(String str) {
    return Boolean.valueOf((str.equals("") || str.equals(null)) ? false : Boolean.parseBoolean(str));
  }
  
  public static int calDays(Date startDate, Date endDate) {
    return (int)((endDate.getTime() - startDate.getTime()) / 86400000L + 280L);
  }
  
  public static void main(String[] args) {
    System.out.println((((List)importChildCheckInfo("E:\\????????????-2014-01-03.xls").get(0)).get(9) == null));
    System.out.println((((List<String>)importChildCheckInfo("E:\\????????????-2014-01-03.xls").get(0)).get(9) == ""));
    System.out.println(((String)((List<String>)importChildCheckInfo("E:\\????????????-2014-01-03.xls").get(0)).get(9)).equals(""));
  }
}
