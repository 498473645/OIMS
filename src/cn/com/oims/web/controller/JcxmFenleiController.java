package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.JcxmFenlei;
import cn.com.oims.service.IJcxmFenleiService;
import cn.com.oims.service.IOimsLogService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"jcxmfenlei"})
public class JcxmFenleiController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IJcxmFenleiService jcxmFenleiService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @RequestMapping(value = {"/findJcxmFenleisByJcxmId.htm"}, method = {RequestMethod.POST})
  public void findJcxmFenleisByJcxmId(HttpServletResponse response, HttpServletRequest request, JcxmFenlei jcxmfenlei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List jcxmfenleis = new ArrayList();
    this.doing = "根据检查项目ID查询相关的项目归类信息";
    try {
      jcxmfenleis = this.jcxmFenleiService
        .findJcxmFenleisByJcxmId(jcxmfenlei.getJcxmId());
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(jcxmfenleis);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findJcxmFenleisByJcxmFenlei.htm"}, method = {RequestMethod.POST})
  public void findJcxmFenleisByJcxmFenlei(HttpServletResponse response, HttpServletRequest request, JcxmFenlei jcxmfenlei) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<JcxmFenlei> jcxmfenleis = new ArrayList<>();
    this.doing = "根据检查项目分类对象查询符合条件的检查项目分类信息";
    try {
      jcxmfenleis = this.jcxmFenleiService
        .findJcxmFenleisByJcxmFenlei(jcxmfenlei);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(jcxmfenleis);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
