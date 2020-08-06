package cn.com.oims.web.controller;

import cn.com.oims.common.FileUpOrDownLoad;
import cn.com.oims.dao.pojo.FixedAssets;
import cn.com.oims.dao.pojo.MaintainRecord;
import cn.com.oims.service.IFixedAssetsService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.FixedAssetsSearchForm;
import cn.com.oims.web.form.MaintainRecordForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jxl.Workbook;
import jxl.biff.DisplayFormat;
import jxl.format.Alignment;
import jxl.format.CellFormat;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.NumberFormat;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping({"fixedAssets"})
public class FixedAssetsController {
  @Autowired
  private IFixedAssetsService fas;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @RequestMapping(value = {"findFixedAssets.htm"}, method = {RequestMethod.POST})
  public void findFixedAssets(Page page, FixedAssetsSearchForm form, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.fas.findFixedAssets(form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"getFixedAssetsById.htm"}, method = {RequestMethod.POST})
  public void getFixedAssetsById(Integer id, HttpServletRequest request, HttpServletResponse response) {
    FixedAssets fa = this.fas.getFixedAssetsById(id);
    JSONWriterUtils.writeJSONObj(fa, response);
  }
  
  @RequestMapping(value = {"delFixedAssetsById.htm"}, method = {RequestMethod.POST})
  public void delFixedAssetsById(Integer id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      this.fas.delFixedAsset(id);
      result.setGonghao(gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateFixedAssets.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateFixedAssets(FixedAssets form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      this.fas.saveOrUpdateFixedAssets(form, gonghao);
      result.setGonghao(gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"setScrapFlag.htm"}, method = {RequestMethod.POST})
  public void setScrapFlag(Integer id, Boolean scrapFlag, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      result.setObj(Boolean.valueOf(this.fas.setScrapFlag(id, scrapFlag)));
      result.setGonghao(gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findFixedAssetsInMaintainTime.htm"}, method = {RequestMethod.POST})
  public void findFixedAssetsInMaintainTime(Page page, int days, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.fas.findFixedAssetsInMaintainTime(days, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"saveOrUpdateMaintainRecord.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateMaintainRecord(MaintainRecordForm form, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      this.fas.saveOrUpdateMaintainRecord(form, gonghao);
      result.setGonghao(gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findMaintainRecords.htm"}, method = {RequestMethod.POST})
  public void findMaintainRecords(Integer fixedAssetsId, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      List<MaintainRecord> list = this.fas.findMaintainRecords(fixedAssetsId);
      result.setGonghao(gonghao);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"delMaintainRecordById.htm"}, method = {RequestMethod.POST})
  public void delMaintainRecordById(Long id, HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      this.fas.delMaintainRecord(id);
      result.setGonghao(gonghao);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"getMaintainRecordById.htm"}, method = {RequestMethod.POST})
  public void getMaintainRecordById(Long id, HttpServletRequest request, HttpServletResponse response) {
    MaintainRecord mr = this.fas.getMaintainRecordById(id);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/importExcel.htm"}, method = {RequestMethod.POST})
  public void importExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
    String path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("固定资产报表导入");
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile url_file = multipartRequest.getFile("url_file");
    String uploadPath = FileUpOrDownLoad.doFileUpLoad(url_file, path);
    System.out.println("上传结束服务器路径" + uploadPath + "开始解析");
    try {
      int[] x = this.fas.importFixedAssetsFromExcel(new File(String.valueOf(path) + File.separator + uploadPath), (String)session.getAttribute("gonghao"));
      result.setState(1);
      result.setObj(x);
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  private List ValiatefixedAssets(List<Map<String, Object>> fixedAssetsList) {
    List<Map<String, Object>> list = new ArrayList<>();
    for (Map<String, Object> map : fixedAssetsList) {
      String id = map.get("id").toString();
      String price = map.get("price").toString();
      String money = map.get("money").toString();
      String num = map.get("num").toString();
      String category = map.get("category").toString();
      FixedAssets fa = new FixedAssets();
      fa.setId(Integer.valueOf(id));
      fa.setCategory(Integer.valueOf(stringToInt(category)));
      fa.setFlowerNo((String)map.get("flowerNo"));
      fa.setName((String)map.get("name"));
      fa.setGuige((String)map.get("guige"));
      fa.setXinghao((String)map.get("xinghao"));
      fa.setDanwei((String)map.get("danwei"));
      fa.setPrice(Float.valueOf(price));
      fa.setNum(Integer.valueOf(num));
      fa.setMoney(Float.valueOf(money));
      fa.setDepartment((String)map.get("department"));
      fa.setUserDepartment((String)map.get("userDepartment"));
      fa.setScrapFlag(((String)map.get("scrapFlag") == "在用"));
      fa.setYongtu((String)map.get("yongtu"));
      fa.setLocal((String)map.get("local"));
      fa.setOperator((String)map.get("operator"));
      fa.setDetalieduse((String)map.get("detalieduse"));
      fa.setInfomation((String)map.get("information"));
      this.fas.saveFixedAssets(fa);
      list.add(map);
    } 
    return list;
  }
  
  private int stringToInt(String str) {
    if (str.equals("医疗设备"))
      return 1; 
    if (str.equals("信息化设备"))
      return 2; 
    if (str.equals("文体设备"))
      return 3; 
    if (str.equals("营房营具"))
      return 4; 
    if (str.equals("通信设备"))
      return 5; 
    return 6;
  }
  
  @RequestMapping(value = {"/exportExecel.htm"}, method = {RequestMethod.POST})
  public void exportExecel(HttpServletRequest request, HttpServletResponse response, FixedAssetsSearchForm fasf) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("固定资产报表导出");
    String fileName = "";
    String sheetName = "固定资产表";
    File excelFile = getNewFile(request);
    fileName = excelFile.getName();
    WritableWorkbook book = null;
    try {
      book = Workbook.createWorkbook(excelFile);
      WritableSheet sheet = book.createSheet(sheetName, 0);
      WritableFont titleFont = new WritableFont(WritableFont.ARIAL, 12, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableFont normalFont = new WritableFont(WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableCellFormat wcfTitle = new WritableCellFormat(titleFont);
      wcfTitle.setAlignment(Alignment.CENTRE);
      WritableCellFormat wcfNormal = new WritableCellFormat(normalFont);
      wcfNormal.setAlignment(Alignment.CENTRE);
      NumberFormat nf = new NumberFormat("#.00");
      WritableCellFormat wcfMoney = new WritableCellFormat((DisplayFormat)nf);
      String[] titles = { 
          "序号", "资产类别", "编号", "名称", "规格", "型号", "金额", "使用地点", "制造商", "制造商联系人", 
          "制造商联系人电话", "制造商联系人手机", "制造商传真", "制造商邮箱", "供应商", "供应商联系人", "供应商联系人电话", "供应商联系人手机", "供应商传真", "供应商邮箱", 
          "使用说明", "保养需知", "状态" };
      for (int i = 0; i < titles.length; i++) {
        Label label = new Label(i, 0, titles[i], (CellFormat)wcfTitle);
        sheet.addCell((WritableCell)label);
      } 
      Page page = new Page();
      page.setCurrentPage(Integer.valueOf(1));
      page.setPageSize(Integer.valueOf(100));
      Map<String, Object> map = this.fas.findFixedAssets(fasf, page);
      int n = 1;
      while (true) {
        List<FixedAssets> listFixedAssets = (List<FixedAssets>)map.get("list");
        Iterator<FixedAssets> itr = listFixedAssets.iterator();
        while (itr.hasNext()) {
          FixedAssets fa = itr.next();
          Number label = new Number(0, n, n);
          sheet.addCell((WritableCell)label);
          String category = getCategory(fa.getCategory());
          Label label1 = new Label(1, n, category, (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label1);
          Label label2 = new Label(2, n, fa.getFlowerNo(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label2);
          Label label3 = new Label(3, n, fa.getName(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label3);
          Label label4 = new Label(4, n, fa.getGuige(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label4);
          Label label5 = new Label(5, n, fa.getXinghao(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label5);
          Number label6 = new Number(6, n, fa.getPrice().floatValue(), (CellFormat)wcfMoney);
          sheet.addCell((WritableCell)label6);
          Label label7 = new Label(7, n, fa.getLocal(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label7);
          Label label8 = new Label(8, n, fa.getManufacturer(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label8);
          Label label9 = new Label(9, n, fa.getContacts(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label9);
          Label label10 = new Label(10, n, fa.getTel(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label10);
          Label label11 = new Label(11, n, fa.getMobile(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label11);
          Label label12 = new Label(12, n, fa.getFax(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label12);
          Label label13 = new Label(13, n, fa.getMail(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label13);
          Label label14 = new Label(14, n, fa.getSupplier(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label14);
          Label label15 = new Label(15, n, fa.getSupporter(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label15);
          Label label16 = new Label(16, n, fa.getSupporttel(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label16);
          Label label17 = new Label(17, n, fa.getSupportmobile(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label17);
          Label label18 = new Label(18, n, fa.getSupportfax(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label18);
          Label label19 = new Label(19, n, fa.getSupportmail(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label19);
          Label label20 = new Label(20, n, fa.getInfomation(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label20);
          Label label21 = new Label(21, n, fa.getMaintenanceNotice(), (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label21);
          String state = fa.isScrapFlag() ? "已报废" : "正常";
          Label label22 = new Label(22, n, state, (CellFormat)wcfNormal);
          sheet.addCell((WritableCell)label22);
          n++;
        } 
        if (page.getPageCount().intValue() <= page.getCurrentPage().intValue())
          break; 
        page.setCurrentPage(Integer.valueOf(page.getCurrentPage().intValue() + 1));
        listFixedAssets.clear();
        listFixedAssets = null;
      } 
      book.write();
      book.close();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } 
    result.setObj("/fixedAssets_excel/" + fileName);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private String getCategory(Integer category) {
    String category_str = "";
    if (category == null)
      return category_str; 
    switch (category.intValue()) {
      case 1:
        category_str = "医疗设备";
        break;
      case 2:
        category_str = "信息化设备";
        break;
      case 3:
        category_str = "文体设备";
        break;
      case 4:
        category_str = "营房营具";
        break;
      case 5:
        category_str = "通信设备";
        break;
      case 6:
        category_str = "其他设备";
        break;
    } 
    return category_str;
  }
  
  private String exportExcel(HttpServletRequest request, List<FixedAssets> listFixedAssets) {
    String fileName = "";
    String sheetName = "固定资产表";
    try {
      File excelFile = getNewFile(request);
      fileName = excelFile.getName();
      WritableWorkbook book = Workbook.createWorkbook(excelFile);
      WritableSheet sheet = book.createSheet(sheetName, 0);
      WritableFont title_style = new WritableFont(
          WritableFont.ARIAL, 10, WritableFont.BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableFont content_style = new WritableFont(
          WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableCellFormat wcfFC_title = new WritableCellFormat(title_style);
      WritableCellFormat wcfFC_content = new WritableCellFormat(content_style);
      wcfFC_title.setAlignment(Alignment.CENTRE);
      wcfFC_content.setAlignment(Alignment.CENTRE);
      fixedAssets_book(listFixedAssets, wcfFC_title, wcfFC_content, sheet);
      book.write();
      book.close();
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return fileName;
  }
  
  public File getNewFile(HttpServletRequest request) {
    String realPath = request.getServletContext().getRealPath("/fixedAssets_excel");
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");
    String fileName = String.valueOf(sdf.format(date)) + ".xls";
    if ((new File(realPath)).exists())
      return new File(String.valueOf(realPath) + "/" + fileName); 
    (new File(realPath)).mkdir();
    return new File(String.valueOf(realPath) + "/" + fileName);
  }
  
  public void fixedAssets_book(List<FixedAssets> list, WritableCellFormat title_style, WritableCellFormat content_style, WritableSheet sheet) {
    String[] titles = { 
        "序号", "资产类别", "病历编号", "名称", "规格", "型号", "单位", "单价", "数量", "金额", 
        "所属单位", "使用单位", "状态", "用途", "所在位置", "保管人", "详细用途", "备注" };
    Integer[] widths = { 
        Integer.valueOf(7), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(18), 
        Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(12), Integer.valueOf(12), Integer.valueOf(12), Integer.valueOf(12), Integer.valueOf(30), Integer.valueOf(30) };
    try {
      int i;
      for (i = 0; i < titles.length; i++) {
        Label label = new Label(i, 0, titles[i], (CellFormat)title_style);
        sheet.addCell((WritableCell)label);
      } 
      for (i = 0; i < list.size(); i++) {
        FixedAssets form = list.get(i);
        String isFlag = "";
        boolean isf = form.isScrapFlag();
        if (isf) {
          isFlag = "报废";
        } else {
          isFlag = "正常";
        } 
        String category_str = "";
        Integer cagtegory = form.getCategory();
        switch (cagtegory.intValue()) {
          case 1:
            category_str = "医疗设备";
            break;
          case 2:
            category_str = "信息化设备";
            break;
          case 3:
            category_str = "文体设备";
            break;
          case 4:
            category_str = "营房营具";
            break;
          case 5:
            category_str = "通信设备";
            break;
          case 6:
            category_str = "其他设备";
            break;
        } 
        String[] values = { 
            (form.getId() == null) ? "" : form.getId().toString(), 
            category_str, 
            (form.getFlowerNo() == null) ? "" : form.getFlowerNo().toString(), 
            (form.getName() == null) ? "" : form.getName().toString(), 
            (form.getGuige() == null) ? "" : form.getGuige().toString(), 
            (form.getXinghao() == null) ? "" : form.getXinghao().toString(), 
            (form.getDanwei() == null) ? "" : form.getDanwei().toString(), 
            (form.getPrice() == null) ? "" : form.getPrice().toString(), 
            (form.getNum() == null) ? "" : form.getNum().toString(), 
            (form.getMoney() == null) ? "" : form.getMoney().toString(), 
            (form.getDepartment() == null) ? "" : form.getDepartment().toString(), 
            (form.getUserDepartment() == null) ? "" : form.getUserDepartment().toString(), 
            isFlag, 
            (form.getYongtu() == null) ? "" : form.getYongtu().toString(), 
            (form.getLocal() == null) ? "" : form.getLocal().toString(), 
            (form.getOperator() == null) ? "" : form.getOperator().toString(), 
            (form.getDetalieduse() == null) ? "" : form.getDetalieduse().toString(), 
            (form.getInfomation() == null) ? "" : form.getInfomation().toString() };
        for (int j = 0; j < titles.length; j++) {
          Label label = new Label(j, i + 1, values[j], (CellFormat)content_style);
          sheet.addCell((WritableCell)label);
          sheet.setColumnView(j, widths[j].intValue());
        } 
      } 
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
}
