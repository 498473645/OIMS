package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Yhpz;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IYhpzService;
import cn.com.oims.web.form.yhpzForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"yhpz"})
public class YhpzController {
  private IYhpzService yhpzService;
  
  private IOimsLogService oimsLogService;
  
  @Autowired
  public void setYhpzService(IYhpzService yhpzService) {
    this.yhpzService = yhpzService;
  }
  
  @Autowired
  public void setOimsLogService(IOimsLogService oimsLogService) {
    this.oimsLogService = oimsLogService;
  }
  
  @RequestMapping(value = {"/getYhpzByGonghao.htm"}, method = {RequestMethod.GET})
  public void getYhpzByGonghao(HttpServletRequest req, HttpServletResponse res) {
    MyResult result = new MyResult();
    result.setDoing("根据工号提取用户配置信息");
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    Yhpz yhpz = this.yhpzService.findYhpzById(gonghao);
    if (yhpz != null) {
      result.setObj(yhpz);
      result.setState(1);
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, res);
  }
  
  @RequestMapping(value = {"/modifyYhpz.htm"}, method = {RequestMethod.POST})
  public void modifyYhpz(yhpzForm yhpzform, HttpServletRequest req, HttpServletResponse res) {
    MyResult result = new MyResult();
    result.setDoing("修改用户配置");
    HttpSession session = req.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    String uid = (session.getAttribute("uid") != null) ? session
      .getAttribute("uid").toString() : null;
    try {
      if (uid != null) {
        Yhpz yhpz = this.yhpzService.findYhpzById(gonghao);
        if (yhpz == null) {
          result.setMessage("用户配置信息不存在！");
        } else {
          yhpz.setGzt(yhpzform.getGzt());
          yhpz.setHyc(yhpzform.getHyc());
          yhpz.setXslx(yhpzform.getXslx());
          yhpz.setXssj((yhpzform.getXssj().intValue() == 1));
          yhpz.setYuyan(yhpzform.getYuyan());
          yhpz.setJclist(yhpzform.getJclist());
          this.yhpzService.updateYhpz(yhpz);
          result.setMessage("用户配置信息修改成功！");
          result.setState(1);
        } 
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, res);
  }
}
