package cn.com.oims.web.controller;

import cn.com.oims.common.CommonFunction;
import cn.com.oims.common.FavFTPUtil;
import cn.com.oims.dao.pojo.Operation;
import cn.com.oims.dao.pojo.OperationDict;
import cn.com.oims.service.IOperationService;
import cn.com.oims.web.form.*;
import cn.com.oims.webservice.HisWebService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.CellFormat;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.lang.Boolean;

@Controller
@RequestMapping({"shoushu"})
public class OperationController {
  @Autowired
  private IOperationService operationService;

  @Autowired
  private HisWebService hisWebService;

  @RequestMapping(value = {"saveOrUpdateOperationDict.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateOperationDict(OperationDict dict, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存手术字典");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      this.operationService.saveOrUpdateOperationDict(dict);
      result.setObj(dict);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"getOperationDict.htm"}, method = {RequestMethod.GET})
  public void getOperationDict(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取手术字典");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      OperationDict dict = this.operationService.getOperationDict(id);
      result.setState(1);
      result.setObj(dict);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"findOperationDictList.htm"}, method = {RequestMethod.POST})
  public void findOperationDictList(String inputCode, Page page, HttpServletRequest request, HttpServletResponse response) {
    String contextPath = request.getContextPath();
    String vPath = "/UploadFile";
    String realPath = request.getSession().getServletContext()
      .getRealPath(vPath);
    List list = this.operationService.findOperationDictList(inputCode, page);
    Map<Object, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    JSONWriterUtils.writeJSONObj(map, response);
  }

  @RequestMapping(value = {"deleteOperationDict.htm"}, method = {RequestMethod.POST})
  public void deleteOperationDict(Integer id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除手术字典");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      this.operationService.deleteOperationDict(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"saveOrUpdateOperation.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateOperation(OperationAppointmentForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存手术预约");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      this.operationService.saveOrUpdateOperation(form, result.getGonghao());
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"saveOrUpdateOperationApplication.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateOperationApplication(OperationApplicationForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存手术申请");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      this.operationService.saveOrUpdateOperationApplication(form, result.getGonghao());
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"saveOrUpdateOperationPlan.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateOperationPlan(OperationPlanForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存手术安排");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      this.operationService.saveOrUpdateOperationPlan(form, result.getGonghao());
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"saveOrUpdateOperationRecord.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateOperationRecord(OperationRecordForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存手术安排");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      if (form.getId() == null)
        throw new RuntimeException("");
      this.operationService.saveOrUpdateOperationRecord(form, result.getGonghao());
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"findOperationList.htm"}, method = {RequestMethod.POST})
  public void findOperationList(OperationSearchForm form, Page page, HttpServletRequest request, HttpServletResponse response) {
    Map map = this.operationService.findOperationList(page, form);
    JSONWriterUtils.writeJSONObj(map, response);
  }

  @RequestMapping(value = {"deleteOperation.htm"}, method = {RequestMethod.POST})
  public void deleteOperation(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除手术预约");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      this.operationService.deleteOperation(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"getOperation.htm"}, method = {RequestMethod.GET})
  public void getOperation(Long id, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取手术信息");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      Operation operation = this.operationService.getOperation(id);
      result.setState(1);
      result.setObj(operation);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"getOperationMap.htm"}, method = {RequestMethod.GET})
  public void getOperationMap(String binglihao, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取手术信息");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      Map operation = this.operationService.getOperationMap(binglihao);
      result.setState(1);
      result.setObj(operation);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"showOperationMap.htm"}, method = {RequestMethod.GET})
  public void showOperation(OperationShowForm form, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取手术安排信息");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      Map operation = this.operationService.showOperationMap(form);
      result.setState(1);
      result.setObj(operation);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"setOperationState.htm"}, method = {RequestMethod.GET})
  public void setOperationState(String ids, Integer state, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取手术安排信息");
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      String[] _ids = ids.split(",");
      Long[] id = new Long[_ids.length];
      for (int i = 0; i < _ids.length; i++)
        id[i] = Long.valueOf(Long.parseLong(_ids[i]));
      this.operationService.setOperationProcessState(id, state, result.getGonghao());
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"findPatsInHospital.htm"}, method = {RequestMethod.POST})
  public void findPatsInHospital(String deptCode, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    List list = new ArrayList();
    try {
      list = this.hisWebService.findPatsInHospital(deptCode);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    }
    result.setObj(list);
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"findOperationConsumable.htm"}, method = {RequestMethod.GET})
  public void findOperationConsumable(Long operationId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    try {
      List list = this.operationService.findOperationConsumable(operationId);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"findOperationConsumablePageList.htm"}, method = {RequestMethod.POST})
  public void findOperationConsumablePageList(Page page, OperationConsumableSearchForm form, HttpServletRequest request, HttpServletResponse response) {
    Map map = this.operationService.findOperationConsumablePageList(form, page);
    JSONWriterUtils.writeJSONObj(map, response);
  }

  @RequestMapping(value = {"saveOrUpdateOperationConsumable.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateOperationConsumable(Long operationId, Boolean used, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    result.setGonghao((String)session.getAttribute("gonghao"));
    try {
      result.setDoing("保存手术耗材");
      String[] code = request.getParameterValues("code");
      String[] expiDate = request.getParameterValues("expiDate");
      String[] manufacturers = request.getParameterValues("manufacturers");
      String[] name = request.getParameterValues("name");
      String[] quantity = request.getParameterValues("quantity");
      String[] regName = request.getParameterValues("regName");
      String[] regNo = request.getParameterValues("regNo");
      String[] sn = request.getParameterValues("sn");
      String[] specification = request.getParameterValues("specification");
      String[] unit = request.getParameterValues("unit");
      String[] price = request.getParameterValues("price");
      Vector<OperationConsumableForm> vec = new Vector();
      if (used == null)
        used = Boolean.valueOf(false);
      if (code != null && code.length > 0)
        for (int i = 0; i < code.length; i++) {
          OperationConsumableForm oc = new OperationConsumableForm();
          oc.setCode(code[i]);
          Date ed = expiDate[i].isEmpty() ? null : (new SimpleDateFormat("yyyy-MM-dd")).parse(expiDate[i]);
          oc.setExpiDate(ed);
          oc.setManufacturers(manufacturers[i]);
          oc.setName(name[i]);
          oc.setQuantity(Float.valueOf(Float.parseFloat(quantity[i])));
          oc.setRegName(regName[i]);
          oc.setRegNo(regNo[i]);
          oc.setSn(sn[i]);
          oc.setSpecification(specification[i]);
          oc.setUnit(unit[i]);
          oc.setPrice(Float.valueOf(Float.parseFloat(price[i])));
          vec.add(oc);
        }
      this.operationService.saveOrUpdateOperationConsumable(operationId, used, vec, result.getGonghao());
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"operation_export.htm"}, method = {RequestMethod.POST})
  public void operationExport(HttpServletResponse response, HttpServletRequest request, OperationSearchForm form) {
    MyResult result = new MyResult();
    result.setDoing("手术导出");
    Page page = new Page();
    page.setCurrentPage(Integer.valueOf(1));
    page.setPageSize(Integer.valueOf(100));
    page.setPageCount(Integer.valueOf(1));
    File excelFile = getNewFile("operation", request);
    String fileName = excelFile.getName();
    WritableWorkbook book = null;
    try {
      book = Workbook.createWorkbook(excelFile);
      WritableSheet sheet = book.createSheet("operation", 0);
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
      String[] titles = {
          "加急", "患者ID号", "患者姓名", "性别", "年龄", "诊断", "手术类别", "手术大小", "手术级别", "手术名称",
          "手术时间", "主刀医生", "专业组", "状态", "第一助手", "巡回", "住院手术分类", "手术间", "眼别","麻醉方式" };
      Integer[] widths = {
          Integer.valueOf(5), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(40), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(30),
          Integer.valueOf(30), Integer.valueOf(18), Integer.valueOf(12), Integer.valueOf(12), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(18),Integer.valueOf(18) };
      for (int i = 0; i < titles.length; i++) {
        Label label = new Label(i, 0, titles[i], (CellFormat)wcfFC_title);
        sheet.addCell((WritableCell)label);
        sheet.setColumnView(i, widths[i].intValue());
      }
      while (page.getCurrentPage().intValue() <= page.getPageCount().intValue()) {
        Map map = this.operationService.findOperationList(page, form);
        shoushu_book((List<Map<String, Object>>)map.get("list"), titles.length, page.getPageSize().intValue() * (page.getCurrentPage().intValue() - 1), wcfFC_content, sheet);
        page = (Page)map.get("page");
        page.setCurrentPage(Integer.valueOf(page.getCurrentPage().intValue() + 1));
      }
      book.write();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (WriteException e) {
      e.printStackTrace();
    } finally {
      if (book != null)
        try {
          book.close();
        } catch (Exception exception) {}
    }
    result.setObj("/shoushu_excel/" + fileName);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }

  public File getNewFile(String tag, HttpServletRequest request) {
    String realPath = request.getServletContext().getRealPath("/shoushu_excel");
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

  public void shoushu_book(List<Map<String, Object>> list, int titleLength, int startRow, WritableCellFormat content_style, WritableSheet sheet) {
    try {
      for (int i = 0; i < list.size(); i++) {
        Map map = list.get(i);
        String operationTime = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = (Date)map.get("appointmentTime");
        if (date != null)
          operationTime = sdf.format(date);
        Date birthday = (Date)map.get("birthday");
        String[] values = {
            (map.get("urgent") == null) ? "-" : "急",
            (map.get("patientNo") == null) ? "" : map.get("patientNo").toString(),
            (map.get("patientName") == null) ? "" : map.get("patientName").toString(),
            !Boolean.parseBoolean(map.get("sex").toString()) ? "女" : "男",
            (map.get("birthday") == null) ? "" : CommonFunction.getNianlingByCsrq(map.get("birthday").toString()).toString(),
            (map.get("medical") == null) ? "" : map.get("medical").toString(),
            map.get("category").toString().equals("0") ? "门诊手术" : "住院手术",
            getOperationSize(map.get("operationSize").toString()),
            getOperationLevel(map.get("levelFlag").toString()),
            getOperationName((List<Map<String, Object>>)map.get("operationDetails")),
            operationTime,
            (map.get("doctorName") == null) ? "" : map.get("doctorName").toString(),
            (map.get("groupName") == null) ? "" : map.get("groupName").toString(),
            getProcessState(map.get("processState").toString()),
            (map.get("firstAssistantName") == null) ? "" : map.get("firstAssistantName").toString(),
            (map.get("circuitNurseName") == null) ? "" : map.get("circuitNurseName").toString(),
            map.get("category").toString().equals("0") ? "" : ((map.get("childCategory") == null) ? "" : ((Integer.parseInt(map.get("childCategory").toString()) == 1) ? "常规" : ((Integer.parseInt(map.get("childCategory").toString()) == 2) ? "日间手术" : ((Integer.parseInt(map.get("childCategory").toString()) == 3) ? "非二次计划手术" : "周末手术")))),
            (map.get("operationRoom") == null) ? "" : map.get("operationRoom").toString(),
            (map.get("yanbie") == null) ? "" : map.get("yanbie").toString(),
                getAnesthesiaName(Integer.parseInt(map.get("anesthesia").toString()))};
        int row = i + startRow + 1;
        System.out.println("row:" + row);
        for (int j = 0; j < titleLength; j++) {
          Label label = new Label(j, row, values[j], (CellFormat)content_style);
          sheet.addCell((WritableCell)label);
        }
      }
    } catch (WriteException e) {
      e.printStackTrace();
    }
  }

  public String getAnesthesiaName(Integer anesthesia) {
    String n = "";
    switch (anesthesia.intValue()) {
      case 0:
        n = "无麻醉";
        break;
      case 1:
        n = "表面麻醉";
        break;
      case 2:
        n = "局部麻醉";
        break;
      case 3:
        n = "吸入全麻";
        break;
      case 4:
        n = "静脉全麻";
        break;
    }
    return n;
  }

  private String getProcessState(String string) {
    if (string != null) {
      if (Integer.parseInt(string) == 0)
        return "已预约";
      if (Integer.parseInt(string) == 1)
        return "已申请";
      if (Integer.parseInt(string) == 2)
        return "已安排";
      if (Integer.parseInt(string) == 3)
        return "已手术";
      if (Integer.parseInt(string) == 4)
        return "未手术";
      if (Integer.parseInt(string) == 5)
        return "停手术";
      return null;
    }
    return null;
  }

  private String getOperationName(List<Map<String, Object>> list) {
    StringBuilder sb = new StringBuilder("");
    for (int i = 0; i < list.size(); i++) {
      if (i > 0)
        sb.append("+");
      String eye = "";
      switch (Integer.parseInt(((Map)list.get(i)).get("eyes").toString())) {
        case 48:
          eye = "双眼";
          break;
        case 47:
          eye = "右眼";
          break;
        case 46:
          eye = "左眼";
          break;
      }
      sb.append(eye);
      sb.append(((Map)list.get(i)).get("name").toString());
    }
    return sb.toString();
  }

  private String getOperationLevel(String string) {
    if (string != null) {
      if (Integer.parseInt(string) == 0)
        return "一级手术";
      if (Integer.parseInt(string) == 1)
        return "二级手术";
      if (Integer.parseInt(string) == 2)
        return "三级手术";
      if (Integer.parseInt(string) == 3)
        return "四级手术";
      return null;
    }
    return null;
  }

  private String getOperationSize(String string) {
    if (string != null) {
      if (Integer.parseInt(string) == 0)
        return "小型手术";
      if (Integer.parseInt(string) == 1)
        return "中型手术";
      if (Integer.parseInt(string) == 2)
        return "大型手术";
      return null;
    }
    return null;
  }

  @RequestMapping(value = {"uploadforvideo.htm"}, method = {RequestMethod.POST})
  public void uploadForvideo(MultipartFile vediofile, Long opeid, HttpServletRequest request, HttpServletResponse response) throws IOException {
    MyResult result = new MyResult();
    result.setDoing("手术录像");
    ServletContext sctx = request.getSession().getServletContext();
    String basePath = sctx.getRealPath("/video");
    String hostname = "192.168.58.1";
    int port = 21;
    String username = "zxg";
    String password = "zxg";
    String oldFileName = vediofile.getOriginalFilename();
    String fileFormat = oldFileName.substring(oldFileName.lastIndexOf("."));
    String filename = String.valueOf(opeid.toString()) + fileFormat;
    FavFTPUtil.uploadFileFromProduction(hostname, port, username, password,
        basePath, filename, vediofile);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"checkIsUploadedOrDel.htm"}, method = {RequestMethod.POST})
  public void checkIsUploadedOrDel(Long opeid, Long delflag, HttpServletRequest request, HttpServletResponse response) throws IOException {
    MyResult result = new MyResult();
    result.setDoing("手术导出");
    ServletContext sctx = request.getSession().getServletContext();
    String path = sctx.getRealPath("/video");
    File root = new File(path);
    File[] files = root.listFiles();
    byte b;
    int i;
    File[] arrayOfFile1;
    for (i = (arrayOfFile1 = files).length, b = 0; b < i; ) {
      File file = arrayOfFile1[b];
      String originalFilename = file.getName();
      String filename = originalFilename.substring(0,
          originalFilename.lastIndexOf("."));
      String fileFormat = originalFilename.substring(originalFilename
          .lastIndexOf(".") + 1);
      if (String.valueOf(opeid).equals(filename)) {
        result.setState(1);
        result.setMessage(fileFormat);
        if (delflag.longValue() == 1L)
          file.delete();
      }
      b++;
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"isInHospital.htm"}, method = {RequestMethod.POST})
  public void isInHospital(String patientId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    List list = new ArrayList();
    try {
      Integer i = this.hisWebService.findHzInHospital(patientId);
      if (i.intValue() > 0) {
        result.setObj(Boolean.valueOf(true));
      } else {
        result.setObj(Boolean.valueOf(false));
      }
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    }
    JSONWriterUtils.writeJSONObj(result, response);
  }

  @RequestMapping(value = {"/getOperationList.htm"}, method = {RequestMethod.POST})
  public void getOperationList(String patientId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    OperationSearchForm osf = new OperationSearchForm();
    osf.setPatientId(patientId);
    osf.setProcess("3");
    List list = this.operationService.findOperationList(osf);
    result.setObj(list);
    JSONWriterUtils.writeJSONObj(result, response);
  }

  /**
   * @Description: 查询手术列表(首页)
   * @param form 手术查询表单
   * @param page 分页查询对象
   * @param request
   * @param response
   * @author huxiaoqiang
   * @date 2019-12-17 11:40:41
   */
  @RequestMapping(value = { "findOperationListForIndex.htm" }, method = {
          org.springframework.web.bind.annotation.RequestMethod.POST })
  public void findOperationListForIndex(OperationSearchForm form, Page page, HttpServletRequest request,
                                        HttpServletResponse response) {
    Map map = this.operationService.findOperationListForIndex(page, form);
    response.setContentType("application/json");
    JSONWriterUtils.writeJSONObj(map, response);
  }
}
