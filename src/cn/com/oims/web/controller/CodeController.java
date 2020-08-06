package cn.com.oims.web.controller;

import cn.com.oims.common.QcodeUtils;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.google.zxing.BarcodeFormat;
import java.io.File;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"code"})
public class CodeController {
  @RequestMapping(value = {"getQCodeImg.htm"}, method = {RequestMethod.GET})
  public void getCodeImg(String filename, String text, int width, int height, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取二维玛图片");
    try {
      String path = "/images/qcode";
      String realpath = request.getServletContext().getRealPath(path);
      File folder = new File(realpath);
      if (!folder.exists() || !folder.isDirectory())
        folder.mkdirs(); 
      if (filename == null || filename.isEmpty())
        filename = String.valueOf(text) + "_" + width + "X" + height + ".png"; 
      File file = new File(String.valueOf(realpath) + File.separator + filename);
      result.setState(1);
      if (!file.exists() && 
        !QcodeUtils.generateCodeImg(file, text, BarcodeFormat.QR_CODE, width, height, "utf-8"))
        result.setState(0); 
      result.setObj(String.valueOf(path) + "/" + filename);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
