package cn.com.oims.web.controller;

import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

@Controller
@RequestMapping({"temp"})
public class TmpFileUpload {
  @RequestMapping(value = {"/saveTmpFile.htm"}, method = {RequestMethod.POST})
  public void savePatientPhoto(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("临时文件上传");
    String vPath = "/tmp";
    String realPath = request.getSession().getServletContext()
      .getRealPath(vPath);
    File file = new File(realPath);
    if (!file.exists() || !file.isDirectory())
      file.mkdirs(); 
    String filename = request.getParameter("filename");
    String path = String.valueOf(realPath) + File.separator + filename;
    if (fileSave(request, path)) {
      result.setState(1);
      result.setObj(String.valueOf(vPath) + "/" + filename);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private boolean fileSave(HttpServletRequest request, String filePath) {
    ServletInputStream servletInputStream = null;
    boolean x = false;
    InputStream in = null;
    FileOutputStream out = null;
    try {
      File f = new File(filePath.substring(0, 
            filePath.lastIndexOf(File.separator)));
      if (!f.exists() || !f.isDirectory())
        f.mkdirs(); 
      servletInputStream = request.getInputStream();
      if (servletInputStream != null) {
        out = new FileOutputStream(new File(filePath));
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = servletInputStream.read(buffer)) > 0)
          out.write(buffer, 0, bytesRead); 
        out.flush();
      } 
      x = true;
    } catch (Exception ex) {
      ex.printStackTrace();
    } finally {
      if (servletInputStream != null)
        try {
          servletInputStream.close();
        } catch (IOException iOException) {} 
      if (out != null)
        try {
          out.close();
        } catch (IOException iOException) {} 
    } 
    return x;
  }
  
  @RequestMapping(value = {"upload.htm"}, method = {RequestMethod.POST})
  public void saveFile(HttpServletRequest request, HttpServletResponse response) {
    try {
      String vPath = "/tmp";
      String realPath = request.getSession().getServletContext()
        .getRealPath(vPath);
      File file = new File(realPath);
      if (!file.exists() || !file.isDirectory())
        file.mkdirs(); 
      String filename = request.getParameter("filename");
      if (filename == null || filename.equals("")) {
        response.getWriter().write("没有传文件名");
        return;
      } 
      String filePath = file + File.separator + filename;
      DefaultMultipartHttpServletRequest req = (DefaultMultipartHttpServletRequest)request;
      CommonsMultipartFile cmf = (CommonsMultipartFile)(req.getMultiFileMap().get("file").get(0)) ;
      InputStream in = cmf.getInputStream();
      OutputStream out = null;
      if (in != null) {
        out = new FileOutputStream(new File(filePath));
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) > 0)
          out.write(buffer, 0, bytesRead); 
        out.flush();
        out.close();
      } 
      response.getWriter().write("success");
    } catch (Exception e) {
      e.printStackTrace();
      try {
        response.getWriter().write("fail");
      } catch (Exception exception) {}
    } 
  }
}
