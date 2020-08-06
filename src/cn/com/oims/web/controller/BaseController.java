package cn.com.oims.web.controller;

import cn.com.oims.common.Utils;
import cn.com.oims.common.XLSHead;
import cn.com.oims.dao.pojo.User;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

public class BaseController {
  public static int level_saveOrUpdate = 1;
  
  public static int level_del = 2;
  
  public static int level_find = 3;
  
  public static int level_exception = 4;
  
  public static int success = 1;
  
  public static int fail = 0;
  
  public static String doing = "操作成功";
  
  protected void writeObjectJson(Object o, HttpServletResponse res) {
    res.setCharacterEncoding("UTF-8");
    res.setContentType("application/Json");
    try {
      res.getWriter().print(JSONObject.fromObject(o));
    } catch (IOException e) {
      e.printStackTrace();
    } 
  }
  
  protected void writeArrayJson(List<?> ls, HttpServletResponse res) {
    JSONWriterUtils.writeJSONList(ls, res);
  }
  
  protected User getCurrentUser(HttpServletRequest request) {
    User user = (User)request.getSession().getAttribute("currentUser");
    return user;
  }
  
  protected MyResult createResult(String doing, HttpServletRequest req) {
    MyResult mr = new MyResult();
    mr.setDoing(doing);
    mr.setDate(new Date());
    String gh = "-1";
    if (getCurrentUser(req) != null) {
      gh = getCurrentUser(req).getGonghao();
    } else {
      gh = (String)req.getAttribute("gonghao");
    } 
    mr.setGonghao(gh);
    return mr;
  }
  
  protected boolean isLogin(MyResult mr, HttpServletResponse res) {
    if (mr.getGonghao().equals("-1")) {
      mr.setState(-1);
      mr.setMessage("未登录");
      writeObjectJson(mr, res);
      return false;
    } 
    return true;
  }
  
  protected void mrSuccess(MyResult mr) {
    mr.setState(success);
    mr.setMessage(doing);
  }
  
  protected void mrSuccess(MyResult mr, Object obj) {
    mr.setState(success);
    mr.setMessage(doing);
    mr.setObj(obj);
  }
  
  protected void mrFail(String msg, MyResult mr) {
    mr.setMessage(msg);
    mr.setState(fail);
  }
  
  protected void mrFail(Exception e, MyResult mr) {
    mr.setMessage(e.getMessage());
    mr.setState(fail);
  }
  
  protected void writeLog(MyResult mr) {}
  
  protected void writeLog(MyResult mr, int level) {}
  
  protected void exportXls(List<Map<String, Object>> data, Vector<XLSHead> heads, HttpServletRequest req, HttpServletResponse res) {
    MyResult mr = createResult("导出数据", req);
    res.reset();
    res.setContentType("application/vnd.ms-excel");
    res.setCharacterEncoding("UTF-8");
    try {
      int b;
      String name = "attachment;filename=" + 
        URLEncoder.encode(
          "export-" + Utils.dateToStrShort(new Date()) + 
          ".xls", "UTF-8");
      res.setHeader("Content-disposition", name);
      File f = Utils.createXLS(data, heads);
      writeLog(mr, level_find);
      FileInputStream fis = new FileInputStream(f);
      ServletOutputStream sos = res.getOutputStream();
      byte[] bs = new byte[1024];
      do {
        b = fis.read(bs);
        sos.write(bs);
      } while (b != -1);
      sos.flush();
      sos.close();
      fis.close();
    } catch (Exception e) {
      Utils.tLog(e.getMessage(), "导出报表失败");
      e.printStackTrace();
    } 
  }
  
  public String uploadFile(MultipartFile oimsUpload, String uploadTag, String filePath, HttpServletRequest request, HttpServletResponse response) {
    String webcontentFilePath = request.getSession().getServletContext()
      .getRealPath("/" + filePath);
    File file = null;
    try {
      if (oimsUpload.getSize() != 0L) {
        String name = String.valueOf(fileName(uploadTag)) + 
          oimsUpload.getOriginalFilename().substring(
            oimsUpload.getOriginalFilename().lastIndexOf(
              "."));
        file = new File(webcontentFilePath, name);
        if (!file.exists())
          file.mkdirs(); 
        oimsUpload.transferTo(file);
      } 
      String path = "/" + filePath + "/" + file.getName();
      request.getSession().setAttribute(uploadTag, path);
      Utils.tLog(file.getName(), toString());
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return file.getName();
  }
  
  private String fileName(String tag) {
    Date d = new Date();
    return String.valueOf(tag) + "_" + d.getTime();
  }
}
