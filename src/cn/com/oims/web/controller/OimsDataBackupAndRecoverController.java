package cn.com.oims.web.controller;

import cn.com.oims.common.GetFileList;
import cn.com.oims.common.getListForPage;
import cn.com.oims.service.IOimsDataRecoverService;
import cn.com.oims.service.IOimsDatabackupService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"oims_data_backup"})
public class OimsDataBackupAndRecoverController {
  private IOimsDatabackupService dataBackupService;
  
  private IOimsDataRecoverService dataRecoverService;
  
  @Autowired
  public void setDataBackupService(IOimsDatabackupService dataBackupService) {
    this.dataBackupService = dataBackupService;
  }
  
  @Autowired
  public void setDataRecoverService(IOimsDataRecoverService dataRecoverService) {
    this.dataRecoverService = dataRecoverService;
  }
  
  protected void exportSQL(File f, HttpServletRequest req, HttpServletResponse res) {
    res.reset();
    res.setContentType("text/plain; charset=utf-8");
    res.setCharacterEncoding("UTF-8");
    DateFormat dateformat = new SimpleDateFormat("yyyyMMddHHmm");
    String date = dateformat.format(new Date());
    try {
      int b;
      String name = "attachment;filename=" + URLEncoder.encode(String.valueOf(date) + ".sql", "UTF-8");
      res.setHeader("Content-disposition", name);
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
      e.printStackTrace();
    } 
  }
  
  @RequestMapping(value = {"/findAllDataFiles.htm"}, method = {RequestMethod.POST})
  public void findDataFilesByPage(HttpServletRequest request, HttpServletResponse response, Page p) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("查询备份记录");
    Map<String, Object> map = new HashMap<>();
    String target_path = 
      String.valueOf(request.getSession().getServletContext().getRealPath("/")) + 
      "temp";
    try {
      List list = GetFileList.getList(target_path);
      request.getSession().setAttribute("list", list);
      int maxNum = 15;
      int pageNum = 0;
      if (list.size() % maxNum == 0) {
        pageNum = list.size() / maxNum;
      } else {
        pageNum = list.size() / maxNum + 1;
      } 
      List l = getListForPage.getPageList(list, p.getCurrentPage().intValue(), maxNum, pageNum);
      p.setCurrentPage(p.getCurrentPage());
      p.setPageCount(Integer.valueOf(pageNum));
      p.setPageSize(Integer.valueOf(15));
      p.setRowsCount(Integer.valueOf(list.size()));
      p.setStartRow(p.getStartRow());
      map.put("list", l);
      map.put("page", p);
      if (map != null) {
        result.setState(1);
        result.setMessage("Success");
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
      result.setMessage("Failed");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/backupOimsdata.htm"}, method = {RequestMethod.POST})
  public void backupOimsdata(HttpServletRequest request, HttpServletResponse response, String[] a) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("备份数据库信息");
    String s = request.getParameter("list");
    System.out.println(String.valueOf(s) + "字符串");
    String[] list = s.split(",");
    String dd = "";
    String target_path = String.valueOf(request.getSession().getServletContext().getRealPath("/")) + "temp";
    String fileName = String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())) + ".sql";
    String filePathName = String.valueOf(target_path) + System.getProperty("file.separator") + fileName;
    try {
      System.out.println(String.valueOf(filePathName) + "\n" + list[0] + "\t" + list[1]);
      dd = this.dataBackupService.backup(filePathName, list);
      if (dd != null && dd.equals("成功")) {
        result.setState(1);
        result.setObj(fileName);
        request.getSession().setAttribute("filename", fileName);
      } else {
        result.setState(0);
        result.setMessage("输入错误");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      result.setGonghao(gonghao);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  @RequestMapping(value = {"/downFile.htm"}, method = {RequestMethod.POST})
  public void downFile(HttpServletRequest request, HttpServletResponse response, int id) {
    String fileName = "";
    List<Map<Object, Object>> l = (List)request.getSession().getAttribute("list");
    System.out.println("session得到的list长度" + l.size());
    Map<Object, Object> map = new HashMap<>();
    for (int i = 0; i < l.size(); i++) {
      map = l.get(i);
      if (Integer.valueOf(map.get("id").toString()).intValue() == id) {
        fileName = (String)map.get("path");
        System.out.println(String.valueOf(fileName) + "下载时得到的文件名");
      } 
    } 
    File f = new File(fileName);
    if (f != null)
      exportSQL(f, request, response); 
  }
  
  @RequestMapping(value = {"/recoverOimsdata.htm"}, method = {RequestMethod.POST})
  public void recoverOimsdata(HttpServletRequest request, HttpServletResponse response, int id, String username, String password) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String user = request.getParameter("username");
    String pass = request.getParameter("password");
    String[] a = new String[2];
    a[0] = user;
    a[1] = pass;
    result.setDoing("恢复数据库信息");
    String fileName = "";
    try {
      List<Map<Object, Object>> l = (List)request.getSession().getAttribute("list");
      Map<Object, Object> map = new HashMap<>();
      for (int i = 0; i < l.size(); i++) {
        map = l.get(i);
        if (Integer.valueOf(map.get("id").toString()).intValue() == id)
          fileName = (String)map.get("path"); 
      } 
      String info = this.dataRecoverService.recover(fileName, a);
      System.out.println(String.valueOf(info) + "返回信息");
      if (info.equals("成功")) {
        result.setState(1);
        result.setMessage("还原成功！");
      } else {
        result.setState(0);
        result.setMessage(info);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delrecoverInfo.htm"}, method = {RequestMethod.POST})
  public void delRecoverInfo(HttpServletRequest request, HttpServletResponse response, String path) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    result.setDoing("删除备份记录");
    try {
      List<Map> l = (List)request.getSession().getAttribute("list");
      for (int i = 0; i < l.size(); i++) {
        Map map = l.get(i);
        if (map.get("path").equals(path)) {
          File file = new File(path);
          if (file.isFile() && file.exists()) {
            file.delete();
            System.out.println("删除本地文件成功");
          } 
          l.remove(i);
          result.setState(1);
          result.setMessage("成功");
          break;
        } 
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
      result.setMessage("输入错误");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
