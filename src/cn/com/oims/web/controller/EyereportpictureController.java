package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Eyereportpicture;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.service.IEyereportpictureService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"Eyereportpicture"})
public class EyereportpictureController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcdService jcdservice;
  
  @Autowired
  private IEyereportpictureService eyereportpictureservice;
  
  @Autowired
  private IOimsLogService oimslogservice;
  
  @RequestMapping(value = {"/saveOrUpdateEyereportpicture.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateEyereportpicture(HttpServletResponse response, HttpServletRequest request, Eyereportpicture eyereportpicture) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "报告图片报告保存或者修改";
    try {
      Eyereportpicture eyereportpictureSelect = new Eyereportpicture();
      eyereportpictureSelect.setJcdId(eyereportpicture.getJcdId());
      eyereportpictureSelect = this.eyereportpictureservice
        .selectEyereportpictureByEyereportpicture(eyereportpictureSelect);
      if (eyereportpictureSelect == null) {
        this.eyereportpictureservice.saveEyereportpicture(eyereportpicture);
      } else {
        eyereportpicture
          .setFlowNo(eyereportpictureSelect.getFlowNo());
        this.eyereportpictureservice
          .updateEyereportpicture(eyereportpicture);
      } 
      Jcd jcd = this.jcdservice.getJcdById(eyereportpicture.getJcdId());
      jcd.setState(Integer.valueOf(1));
      this.jcdservice.updateJcd(jcd);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimslogservice.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/selectEyereportpictureByEyereportpicture.htm"}, method = {RequestMethod.POST})
  public void selectEyereportpictureByEyereportpicture(HttpServletResponse response, HttpServletRequest request, Eyereportpicture eyereportpicture) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据报告图片报告对象查询符合条件的报告图片报告对象";
    try {
      eyereportpicture = this.eyereportpictureservice
        .selectEyereportpictureByEyereportpicture(eyereportpicture);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(eyereportpicture);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/selectEyereportpicturesByEyereportpicture.htm"}, method = {RequestMethod.POST})
  public void selectEyereportpicturesByEyereportpicture(HttpServletResponse response, HttpServletRequest request, Eyereportpicture eyereportpicture) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据报告图片报告对象查询符合条件的报告图片报告对象集合";
    List<Eyereportpicture> list = null;
    try {
      list = this.eyereportpictureservice
        .selectEyereportpicturesByEyereportpicture(eyereportpicture);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(list);
    this.oimslogservice.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
