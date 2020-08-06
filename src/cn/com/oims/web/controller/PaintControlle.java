package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.service.IBaogaoService;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IMedicalRecordService;
import cn.com.oims.web.form.PaintForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"paint"})
public class PaintControlle {
  private IMedicalRecordService mrService;
  
  private IJcdService jcdService;
  
  private IBaogaoService gaogaoService;
  
  private IHuanZheXinXiService huanzheService;
  
  @Autowired
  public void setMrService(IMedicalRecordService mrService) {
    this.mrService = mrService;
  }
  
  @Autowired
  public void setJcdService(IJcdService jcdService) {
    this.jcdService = jcdService;
  }
  
  @Autowired
  public void setGaogaoService(IBaogaoService gaogaoService) {
    this.gaogaoService = gaogaoService;
  }
  
  @Autowired
  public void setHuanzheService(IHuanZheXinXiService huanzheService) {
    this.huanzheService = huanzheService;
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
  
  @RequestMapping(value = {"/savePatientPhoto.htm"}, method = {RequestMethod.POST})
  public void savePatientPhoto(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String datetime = (new SimpleDateFormat("yyyyMMddHHmmss")).format(result.getDate());
    result.setDoing("保存患者图片");
    String vPath = "/UploadFile";
    String realPath = request.getSession().getServletContext()
      .getRealPath(vPath);
    String id = request.getParameter("id");
    if (id == null || id.equals("0"))
      id = "patientTmp"; 
    String filePath = String.valueOf(realPath) + File.separator + id + File.separator + datetime + ".jpg";
    String path = String.valueOf(vPath) + "/" + id + "/" + datetime + ".jpg";
    if (fileSave(request, filePath)) {
      result.setState(1);
      result.setObj(path);
      if (!"patientTmp".equals(id)) {
        HuanZheXinXi hzxx = this.huanzheService.findHuanZheById(Long.valueOf(Long.parseLong(id)));
        hzxx.setPhotourl(path);
        this.huanzheService.saveHuanZhe(hzxx);
      } 
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/paintSave.htm"}, method = {RequestMethod.POST})
  public void paintSave(PaintForm pf, HttpServletRequest request, HttpServletResponse response) {
    ServletInputStream servletInputStream = null;
    System.out.println("患者id：" + pf.getPatientId());
    System.out.println("就诊id：" + pf.getRegId());
    System.out.println("记录id：" + pf.getId());
    System.out.println("图片类型：" + pf.getPhotoType());
    MyResult result = new MyResult();
    String datetime = (new SimpleDateFormat("yyyyMMddHHmmss")).format(result.getDate());
    result.setDoing("保存画图");
    String vPath = "/UploadFile";
    String realPath = request.getSession().getServletContext().getRealPath(vPath);
    String filePath = String.valueOf(realPath) + File.separator + pf.getPatientId() + 
      File.separator + pf.getRegId() + File.separator;
    String path = String.valueOf(vPath) + "/" + pf.getPatientId() + "/" + pf.getRegId() + 
      "/";
    String dirpath = filePath;
    if (pf.getPhotoType() == 3) {
      filePath = String.valueOf(filePath) + "reports";
      filePath = String.valueOf(filePath) + File.separator + pf.getId() + "_" + datetime + ".jpg";
      path = String.valueOf(path) + "reports/" + pf.getId() + "_" + datetime + ".jpg";
    } else if (pf.getPhotoType() == 2) {
      filePath = String.valueOf(filePath) + pf.getId() + File.separator + pf.getEyes() + "_" + 
        datetime + ".jpg";
      path = String.valueOf(path) + pf.getId() + "/" + pf.getEyes() + "_" + datetime + ".jpg";
      dirpath = String.valueOf(dirpath) + pf.getId() + File.separator;
    } else if (pf.getPhotoType() == 1) {
      filePath = String.valueOf(filePath) + "m_r_photos" + File.separator + pf.getId() + "_" + 
        pf.getEyes() + "_" + datetime + ".jpg";
      path = String.valueOf(path) + "m_r_photos/" + pf.getId() + "_" + pf.getEyes() + "_" + 
        datetime + ".jpg";
    } 
    InputStream in = null;
    FileOutputStream out = null;
    try {
      Jzjl jzjl;
      String[] arrayOfString;
      Jcd jcd;
      File f = new File(dirpath);
      if (!f.exists() || !f.isDirectory()){
        boolean bool = f.mkdirs();
      }
      servletInputStream = request.getInputStream();
      if (servletInputStream != null) {
        out = new FileOutputStream(new File(filePath));
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = servletInputStream.read(buffer)) > 0)
          out.write(buffer, 0, bytesRead); 
        out.flush();
      } 
      result.setState(1);
      switch (pf.getPhotoType()) {
        case 1:
          jzjl = this.mrService.getMedicalRecord(pf.getId());
          arrayOfString = new String[2];
          if (jzjl.getPicPath() != null)
            arrayOfString = jzjl.getPicPath().split(","); 
          if (pf.getEyes() != null)
            if (pf.getEyes().equals("OD")) {
              arrayOfString[0] = path;
            } else if (pf.getEyes().equals("OS")) {
              arrayOfString[1] = path;
            }  
          jzjl.setPicPath(arrayOfString.toString());
          this.mrService.updateMedicalRecord(jzjl);
          break;
        case 2:
          System.out.println("记录id：" + pf.getId());
          jcd = this.jcdService.getJcdById(pf.getId());
          System.out.println("jcd对象：");
          System.out.println(jcd);
          if (pf.getEyes().equals("OD")) {
            System.out.println("保存右眼图片地址");
            System.out.println(path);
            String a = path;
            jcd.setRightPic(a);
            break;
          } 
          if (pf.getEyes().equals("OS")) {
            System.out.println("保存左眼图片地址");
            System.out.println(path);
            try {
              String a = path;
              jcd.setLeftPic(a);
            } catch (Exception e) {
              e.printStackTrace();
            } 
          } 
          break;
      } 
      result.setObj(path);
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
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
