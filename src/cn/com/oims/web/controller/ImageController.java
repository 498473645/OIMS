package cn.com.oims.web.controller;

import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"image"})
public class ImageController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  double width_Image = 0.0D;
  
  double height_Image = 0.0D;
  
  double width = this.width_Image;
  
  double height = this.height_Image;
  
  @RequestMapping(value = {"/getImageInfoByPath.htm"}, method = {RequestMethod.POST})
  public void getImageInfoByPath(HttpServletRequest request, HttpServletResponse response, String path_Image, double clientWidth, double clientHeight) {
    path_Image = path_Image.replaceAll("\\\\", "/");
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    File file_Image = new File(request.getSession().getServletContext()
        .getRealPath("/" + path_Image));
    System.out.print(file_Image.getAbsolutePath());
    BufferedImage image = null;
    this.doing = "根据图片路径，取得图片的相关信息";
    try {
      image = ImageIO.read(file_Image);
      this.width_Image = image.getWidth();
      this.height_Image = image.getHeight();
      double rate_width = this.width_Image / clientWidth;
      double rate_height = this.height_Image / clientHeight;
      this.width = this.width_Image;
      this.height = this.height_Image;
      if (this.width_Image <= clientWidth && this.height_Image <= clientHeight) {
        this.width = this.width_Image;
        this.height = this.height_Image;
      } 
      if (this.width_Image <= clientWidth && this.height_Image > clientHeight) {
        this.width = clientHeight / rate_height;
        this.height = clientHeight;
      } 
      if (this.width_Image > clientWidth && this.height_Image <= clientHeight) {
        this.width = clientWidth;
        this.height = clientWidth * rate_width;
      } 
      if (this.width_Image > clientWidth && this.height_Image > clientHeight) {
        if (rate_width < rate_height) {
          this.height = this.height_Image / rate_height;
          this.width = this.width_Image / rate_height;
        } 
        if (rate_width > rate_height) {
          this.height = this.height_Image / rate_width;
          this.width = this.width_Image / rate_width;
        } 
        if (rate_width == rate_height) {
          this.width = clientWidth;
          this.height = clientHeight;
        } 
      } 
      this.doState = 1;
      this.message = "操作成功";
    } catch (IOException e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    map.put("width_Image", Double.valueOf(this.width_Image));
    map.put("height_Image", Double.valueOf(this.height_Image));
    map.put("path_Image", path_Image);
    map.put("width", Double.valueOf(this.width));
    map.put("height", Double.valueOf(this.height));
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(map);
    result.setMessage(this.message);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
