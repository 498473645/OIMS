package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.DrugStock;
import cn.com.oims.dao.pojo.EMRChufang;
import cn.com.oims.dao.pojo.EMRChufangQindan;
import cn.com.oims.service.IEMRChufangService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.web.form.CommonSerchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.CellFormat;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
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

@Controller
@RequestMapping({"chufang"})
public class EMRChufangController {
  @Autowired
  private IEMRChufangService chufangService;
  
  @Autowired
  private IJiuzhenService jiuzhenService;
  
  @RequestMapping(value = {"syncDrug.htm"}, method = {RequestMethod.GET})
  public void syncDrug(HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("同步药品清单！");
    try {
      this.chufangService.syncDrug();
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findDrugDictList.htm"}, method = {RequestMethod.POST})
  public void findDrugDictList(Page page, Integer categoryId, String search, String storename, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取药品清单！");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      List<DrugDict> list = this.chufangService.findDrugDictList(page, categoryId, search, storename);
      result.setState(1);
      result.setObj(list);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findDrugStoreList.htm"}, method = {RequestMethod.POST})
  public void findDrugStoreList(Long drugDictId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取库存药品清单！");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      List<DrugStock> list = this.chufangService.findDrugStockList(drugDictId);
      result.setState(1);
      result.setObj(list);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findDrugStore.htm"}, method = {RequestMethod.POST})
  public void findDrugStore(Long drugStockId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取库存药品！");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      DrugStock drugStock = this.chufangService.getDrugStockById(drugStockId);
      result.setState(1);
      result.setObj(drugStock);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"getDrugDictInfo.htm"}, method = {RequestMethod.GET})
  public void getDrugDictInfo(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取药品信息！");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      DrugDict dict = this.chufangService.getDrugDictInfo(id);
      result.setState(1);
      result.setObj(dict);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveChufang.htm"}, method = {RequestMethod.POST})
  public void saveChufang(Long jiuzhenId, Long huanzheId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存处方！");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      String[] ids = request.getParameterValues("id");
      String[] count = request.getParameterValues("count");
      String[] yongfa = request.getParameterValues("yongfa");
      String[] yongliang = request.getParameterValues("yongliang");
      String[] pinglv = request.getParameterValues("frequencys");
      EMRChufang chufang = new EMRChufang();
      chufang.setJiuzhenId(jiuzhenId);
      chufang.setHuanzheId(huanzheId);
      chufang.setCfys(gonghao);
      chufang.setCfsj(new Date());
      List<EMRChufangQindan> list = new ArrayList<>();
      if (ids != null && ids.length > 0) {
        for (int i = 0; i < ids.length; i++) {
          EMRChufangQindan qd = new EMRChufangQindan();
          Long ypid = Long.valueOf(Long.parseLong(ids[i]));
          Float sl = Float.valueOf(Float.parseFloat(count[i]));
          qd.setYaopinId(ypid);
          qd.setShuliang(sl);
          qd.setYongfa(yongfa[i]);
          qd.setYongliang(yongliang[i]);
          qd.setYongyaopinlv(pinglv[i]);
          list.add(qd);
        } 
        List<Long> list_l = this.chufangService.saveChufang(list, jiuzhenId, huanzheId, gonghao);
        this.jiuzhenService.setPatientState(jiuzhenId, Integer.valueOf(28));
        result.setObj(list_l);
      } else {
        this.chufangService.saveChufang(new ArrayList(), jiuzhenId, huanzheId, gonghao);
      } 
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findChufang.htm"}, method = {RequestMethod.GET})
  public void findChufang(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取处方！");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      List<Map<String, Object>> list = this.chufangService.findEMRChufang(jiuzhenId);
      result.setState(1);
      result.setObj(list);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findChufangQindan.htm"}, method = {RequestMethod.GET})
  public void findChufangQindan(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取处方！");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      List<Map<String, Object>> list = this.chufangService.findEMRChufangQindan(jiuzhenId);
      result.setState(1);
      result.setObj(list);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteAllChufang.htm"}, method = {RequestMethod.GET})
  public void deleteAllChufang(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除本次就诊下的所有处方！");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      this.chufangService.deleteChufangAll(jiuzhenId);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteEMRCHUFANGQINGDAN.htm"}, method = {RequestMethod.POST})
  public void deleteEMRCHUFANGQINGDAN(Long jiuzhenId, Long yaopinId, HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    try {
      List<EMRChufangQindan> oldList = this.chufangService.findQINDANByJzAndYaoPin(jiuzhenId, yaopinId);
      List<Long> l = new ArrayList<>();
      if (oldList != null && oldList.size() > 0)
        l = this.chufangService.deleteChufangQindan(oldList); 
      mr.setObj(l);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"findDrugDictPageList.htm"}, method = {RequestMethod.POST})
  public void findDrugDictPageList(Page page, String search, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.chufangService.findDrugDictPageList(page, search);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findDrugTJPageList.htm"}, method = {RequestMethod.POST})
  public void findDrugTJPageList(Page page, CommonSerchForm searchform, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.chufangService.findDrugTJPageList(page, searchform);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"findUseDocList.htm"}, method = {RequestMethod.POST})
  public void findUseDocList(CommonSerchForm form, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> result = this.chufangService.findUseDocList(form);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"ypmxexport.htm"}, method = {RequestMethod.POST})
  public void yaopinTJExport(HttpServletResponse response, HttpServletRequest request, CommonSerchForm form) {
    List<Object> list = null;
    MyResult result = new MyResult();
    result.setDoing("药品统计导出");
    Map<String, Object> map = this.chufangService.findUseDocList(form);
    list = (List)map.get("list");
    String fileName = exportExcel(request, list);
    result.setObj("/yaopintj_excel/" + fileName);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public String exportExcel(HttpServletRequest request, List<Object> list) {
    String fileName = "";
    try {
      File excelFile = getNewFile("yaopintj", request);
      fileName = excelFile.getName();
      WritableWorkbook book = Workbook.createWorkbook(excelFile);
      WritableSheet sheet = book.createSheet("yaopintj", 0);
      WritableFont title_style = new WritableFont(WritableFont.ARIAL, 10, 
          WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, 
          Colour.BLACK);
      WritableFont content_style = new WritableFont(WritableFont.ARIAL, 
          10, WritableFont.NO_BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableCellFormat wcfFC_title = new WritableCellFormat(title_style);
      WritableCellFormat wcfFC_content = new WritableCellFormat(
          content_style);
      wcfFC_title.setAlignment(Alignment.CENTRE);
      wcfFC_content.setAlignment(Alignment.CENTRE);
      yappintj_book(list, wcfFC_title, wcfFC_content, sheet);
      book.write();
      book.close();
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return fileName;
  }
  
  public File getNewFile(String tag, HttpServletRequest request) {
    String realPath = request.getServletContext().getRealPath(
        "/yaopintj_excel");
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");
    String fileName = String.valueOf(tag) + sdf.format(date) + ".xls";
    String filePath = String.valueOf(realPath) + "/" + fileName;
    File excelFile = new File(filePath);
    if (!excelFile.exists() && !excelFile.isDirectory())
      excelFile.mkdirs(); 
    if (excelFile.exists()) {
      excelFile.delete();
      excelFile = new File(filePath);
    } 
    return excelFile;
  }
  
  public void yappintj_book(List<Object> list, WritableCellFormat title_style, WritableCellFormat content_style, WritableSheet sheet) {
    String[] titles = { "药品名称", "使用医生", "使用数量", "诊断内容" };
    Integer[] widths = { Integer.valueOf(50), Integer.valueOf(20), 
        Integer.valueOf(20), Integer.valueOf(100) };
    try {
      for (int i = 0; i < titles.length; i++) {
        Label label = new Label(i, 0, titles[i], (CellFormat)title_style);
        sheet.addCell((WritableCell)label);
      } 
      Object[] arg = new Object[5];
      for (int j = 0, loop = list.size(); j < loop; j++) {
        arg = (Object[])list.get(j);
        String[] values = { (String)arg[0], (String)arg[2], 
            String.valueOf(arg[1]), (String)arg[3] };
        for (int k = 0; k < titles.length; k++) {
          Label label = new Label(k, j + 1, values[k], (CellFormat)content_style);
          sheet.addCell((WritableCell)label);
          sheet.setColumnView(k, widths[k].intValue());
        } 
      } 
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
  
  @RequestMapping(value = {"updateDrugUse.htm"}, method = {RequestMethod.POST})
  public void updateDrugUse(HttpServletRequest request, HttpServletResponse response, Long id) {
    MyResult mr = new MyResult();
    try {
      this.chufangService.updateDrugUse(id);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
}
