package cn.com.oims.web.controller;

import cn.com.oims.common.XLSHead;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.service.*;
import cn.com.oims.web.form.BingliForm;
import cn.com.oims.web.form.HuanZheSearchExForm;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import com.codesnet.common.PhotoUtilsImpl;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping({"bingli"})
public class BingLiController extends BaseController {
  IBingliService blingliService;
  
  private IOimsLogService oimsLogService;
  
  private String path_Jcd = "/UploadFile";
  
  private String path_BingLi = "/BingLi";
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  private IHuanZheXinXiService huanZheXinXiService;
  
  private IJiuzhenService jiuzhenService;
  
  private IJcdService jcdService;
  
  @Autowired
  public void setJcdService(IJcdService jcdService) {
    this.jcdService = jcdService;
  }
  
  @Autowired
  public void setHuanZheXinXiService(IHuanZheXinXiService huanZheXinXiService) {
    this.huanZheXinXiService = huanZheXinXiService;
  }
  
  @Autowired
  public void setJiuzhenService(IJiuzhenService jiuzhenService) {
    this.jiuzhenService = jiuzhenService;
  }
  
  @Autowired
  public void setOimsLogService(IOimsLogService oimsLogService) {
    this.oimsLogService = oimsLogService;
  }
  
  @Autowired
  public void setBlingliService(IBingliService blingliService) {
    this.blingliService = blingliService;
  }
  
  @RequestMapping(value = {"findBySeach.htm"}, method = {RequestMethod.POST})
  public void findBySeach(BingliForm bl, Page p, HttpServletRequest req, HttpServletResponse res) {
    req.getSession().setAttribute("seachType", "findBy");
    req.getSession().setAttribute("seach", bl);
    MyResult mr = createResult("??????????????????", req);
    try {
      Map<String, Object> map = this.blingliService.findBySeach(bl, p);
      if (map != null)
        mrSuccess(mr, map); 
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e.getMessage(), mr);
    } 
    this.oimsLogService.saveOimsLog(mr, 1);
    writeObjectJson(mr.getObj(), res);
  }
  
  @RequestMapping(value = {"findByCategory.htm"}, method = {RequestMethod.POST})
  public void findByCategory(BingliForm bl, Page p, HttpServletRequest req, HttpServletResponse res) {
    req.getSession().setAttribute("seachType", "findByCategory");
    req.getSession().setAttribute("seach", bl);
    MyResult mr = createResult("??????????????????", req);
    try {
      mrSuccess(mr, this.blingliService.findByCategory2(bl, p));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e.getMessage(), mr);
    } 
    this.oimsLogService.saveOimsLog(mr, 1);
    writeObjectJson(mr.getObj(), res);
  }
  
  @RequestMapping(value = {"findEx.htm"}, method = {RequestMethod.POST})
  public void findEx(HuanZheSearchExForm bl, Page p, HttpServletRequest req, HttpServletResponse res) {
    req.getSession().setAttribute("seachType", "findEx");
    req.getSession().setAttribute("seach", bl);
    MyResult mr = createResult("??????????????????", req);
    try {
      mrSuccess(mr, this.blingliService.findBySeachEx(bl, p));
    } catch (Exception e) {
      e.printStackTrace();
      mrFail(e.getMessage(), mr);
    } 
    this.oimsLogService.saveOimsLog(mr, 1);
    writeObjectJson(mr.getObj(), res);
  }
  
  @RequestMapping(value = {"export.htm"}, method = {RequestMethod.POST})
  public void export(HttpServletRequest req, HttpServletResponse res) {
    String seachType = (String)req.getSession().getAttribute("seachType");
    List<Map<String, Object>> m = null;
    String ids = req.getParameter("patient_ids");
    if (seachType.equals("findEx")) {
      HuanZheSearchForm hzf = (HuanZheSearchForm)req.getSession()
        .getAttribute("seach");
      m = this.blingliService.findEx4Export(hzf);
    } else if (seachType.equals("findByCategory")) {
      BingliForm fl = (BingliForm)req.getSession().getAttribute("seach");
      Long categoryId = Long.valueOf(fl.getCategory());
      m = this.blingliService.findByCategory4Exprot(categoryId);
    } else if (seachType.equals("findBy")) {
      String[] temp = ids.split(",");
      String s = "(";
      for (int i = 0; i < temp.length; i++) {
        s = String.valueOf(s) + "'" + temp[i] + "'";
        if (i != temp.length - 1)
          s = String.valueOf(s) + ","; 
      } 
      s = String.valueOf(s) + ")";
      m = this.blingliService.findBy4Exprot(s);
    } 
    exportXls(m, exportHead(), req, res);
  }
  
  private Vector<XLSHead> exportHead() {
    Vector<XLSHead> vh = new Vector<>();
    XLSHead h = null;
    h = new XLSHead("binglihao", "?????????");
    vh.add(h);
    h = new XLSHead("haoma", "????????????");
    vh.add(h);
    h = new XLSHead("caozuo_time", "????????????", "date");
    vh.add(h);
    h = new XLSHead("xingming", "????????????");
    vh.add(h);
    h = new XLSHead("xingbie", "??????", "bool", "???", "???");
    vh.add(h);
    h = new XLSHead("shengri", "??????", "date");
    vh.add(h);
    h = new XLSHead("age", "??????");
    vh.add(h);
    h = new XLSHead("jtdz", "??????");
    vh.add(h);
    h = new XLSHead("shouji", "??????");
    vh.add(h);
    h = new XLSHead("disease", "??????");
    vh.add(h);
    h = new XLSHead("zhusu", "??????");
    vh.add(h);
    h = new XLSHead("xianbingshi", "?????????");
    vh.add(h);
    h = new XLSHead("jiwangshi", "?????????");
    vh.add(h);
    h = new XLSHead("guominshi", "?????????");
    vh.add(h);
    h = new XLSHead("jiazushi", "?????????");
    vh.add(h);
    h = new XLSHead("shili_od", "????????????");
    vh.add(h);
    h = new XLSHead("shili_os", "????????????");
    vh.add(h);
    h = new XLSHead("r_yw", "????????????");
    vh.add(h);
    h = new XLSHead("l_yw", "????????????");
    vh.add(h);
    h = new XLSHead("r_yqyd", "??????????????????");
    vh.add(h);
    h = new XLSHead("l_yqyd", "??????????????????");
    vh.add(h);
    h = new XLSHead("r_yj", "????????????");
    vh.add(h);
    h = new XLSHead("l_yj", "????????????");
    vh.add(h);
    h = new XLSHead("r_lq", "????????????");
    vh.add(h);
    h = new XLSHead("l_lq", "????????????");
    vh.add(h);
    h = new XLSHead("r_jiemo", "????????????");
    vh.add(h);
    h = new XLSHead("l_jiemo", "????????????");
    vh.add(h);
    h = new XLSHead("r_gm", "????????????");
    vh.add(h);
    h = new XLSHead("l_gm", "????????????");
    vh.add(h);
    h = new XLSHead("r_jiaomo", "????????????");
    vh.add(h);
    h = new XLSHead("l_jiaomo", "????????????");
    vh.add(h);
    h = new XLSHead("r_qf", "????????????");
    vh.add(h);
    h = new XLSHead("l_qf", "????????????");
    vh.add(h);
    h = new XLSHead("r_hm", "????????????");
    vh.add(h);
    h = new XLSHead("l_hm", "????????????");
    vh.add(h);
    h = new XLSHead("r_tk", "????????????");
    vh.add(h);
    h = new XLSHead("l_tk", "????????????");
    vh.add(h);
    h = new XLSHead("r_jt", "????????????");
    vh.add(h);
    h = new XLSHead("l_jt", "????????????");
    vh.add(h);
    h = new XLSHead("r_blt", "???????????????");
    vh.add(h);
    h = new XLSHead("l_blt", "???????????????");
    vh.add(h);
    h = new XLSHead("r_yd", "????????????");
    vh.add(h);
    h = new XLSHead("l_yd", "????????????");
    vh.add(h);
    h = new XLSHead("r_yk", "????????????");
    vh.add(h);
    h = new XLSHead("l_yk", "????????????");
    vh.add(h);
    h = new XLSHead("l_yk", "????????????");
    vh.add(h);
    h = new XLSHead("l_yk", "????????????");
    vh.add(h);
    h = new XLSHead("doctor", "????????????");
    vh.add(h);
    h = new XLSHead("yanya", "????????????");
    vh.add(h);
    h = new XLSHead("special", "??????");
    vh.add(h);
    h = new XLSHead("hospital", "??????");
    vh.add(h);
    h = new XLSHead("lis", "??????");
    vh.add(h);
    h = new XLSHead("prescription", "??????");
    vh.add(h);
    h = new XLSHead("treat", "??????");
    vh.add(h);
    h = new XLSHead("suifang", "??????");
    vh.add(h);
    return vh;
  }
  
  @RequestMapping(value = {"/getpatientinfo.htm"}, method = {RequestMethod.POST})
  public void getPatientInfo(HttpServletRequest request, HttpServletResponse response) {
    String patientId = request.getParameter("patientId");
    JSONObject patientObj = this.blingliService
      .getDiagnosisPatientInfo(patientId);
    JSONWriterUtils.writeJSONObj(patientObj, response);
  }
  
  @RequestMapping(value = {"/everyExport.htm"}, method = {RequestMethod.POST})
  public void photoExport(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "???????????????????????????";
    String path = "";
    try {
      String path_BingLi = request.getSession().getServletContext()
        .getRealPath(this.path_BingLi);
      File file_BingLi = new File(path_BingLi);
      if (!file_BingLi.exists() && !file_BingLi.isDirectory())
        file_BingLi.mkdirs(); 
      String[] binglihaoAry = request.getParameter("patient_id_arys").split(",");
      String path_UploadFile = request.getSession().getServletContext()
        .getRealPath(this.path_Jcd);
      List<File> huanzhezip = new ArrayList<>();
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = binglihaoAry).length, b = 0; b < i; ) {
        String binglihao = arrayOfString1[b];
        List<File> list_path = new ArrayList();
        HuanZheXinXi hzxx = this.huanZheXinXiService.getHuanzhexinxiByBLH(binglihao);
        String fileName_BingLi = String.valueOf(hzxx.getBinglihao()) + ".zip";
        String path_one = String.valueOf(this.path_BingLi) + System.getProperty("file.separator") + 
          fileName_BingLi;
        String path_outFile = String.valueOf(path_BingLi) + 
          System.getProperty("file.separator") + fileName_BingLi;
        String huanzhexinxi_path = String.valueOf(path_UploadFile) + File.separator + hzxx.getId();
        File huanzhexinxi_file = new File(huanzhexinxi_path);
        if (huanzhexinxi_file.exists()) {
          File[] jiuzhen_files = huanzhexinxi_file.listFiles();
          byte b1;
          int j;
          File[] arrayOfFile1;
          for (j = (arrayOfFile1 = jiuzhen_files).length, b1 = 0; b1 < j; ) {
            File jiuzhen_file = arrayOfFile1[b1];
            String jiuzhenid = jiuzhen_file.getName();
            File[] jcd_files = jiuzhen_file.listFiles();
            byte b2;
            int k;
            File[] arrayOfFile2;
            for (k = (arrayOfFile2 = jcd_files).length, b2 = 0; b2 < k; ) {
              File jcd_file = arrayOfFile2[b2];
              String jcdid = jcd_file.getName();
              File[] objects = jcd_file.listFiles();
              List<File> data_name = new ArrayList();
              byte b3;
              int m;
              File[] arrayOfFile3;
              for (m = (arrayOfFile3 = objects).length, b3 = 0; b3 < m; ) {
                File f = arrayOfFile3[b3];
                String file_name = f.getName();
                if (!file_name.equals("thumb")) {
                  String path_absolute_big = String.valueOf(path_UploadFile) + System.getProperty("file.separator") + hzxx.getId() + 
                    System.getProperty("file.separator") + jiuzhenid + 
                    System.getProperty("file.separator") + jcdid + System.getProperty("file.separator") + file_name;
                  File file_absolute_big = new File(path_absolute_big);
                  if (file_absolute_big.isFile()) {
                    data_name.add(file_absolute_big);
                  } else {
                    path_absolute_big = path_absolute_big.replaceFirst(".flv", "");
                    file_absolute_big = new File(path_absolute_big);
                    if (file_absolute_big.isFile())
                      data_name.add(file_absolute_big); 
                  } 
                  System.out.println("????????????????????????=" + path_absolute_big);
                } 
                b3++;
              } 
              if (data_name != null && data_name.size() > 0)
                list_path.addAll(data_name); 
              b2++;
            } 
            b1++;
          } 
          if (list_path != null && list_path.size() > 0) {
            PhotoUtilsImpl photoUtils = new PhotoUtilsImpl();
            photoUtils.zipPhotoList(list_path, path_outFile);
          } 
          huanzhezip.add(new File(path_outFile));
        } 
        b++;
      } 
      if (huanzhezip != null && huanzhezip.size() > 0) {
        path = 
          String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".zip";
        String path_result = String.valueOf(path_BingLi) + 
          System.getProperty("file.separator") + path;
        PhotoUtilsImpl photoUtils = new PhotoUtilsImpl();
        photoUtils.zipPhotoList(huanzhezip, path_result);
        for (File f : huanzhezip)
          f.delete(); 
      } 
      this.doState = 1;
      this.message = "????????????";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "????????????";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(String.valueOf(this.path_BingLi) + System.getProperty("file.separator") + path);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
