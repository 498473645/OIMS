package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.UserOnline;
import cn.com.oims.dao.pojo.Yhpz;
import cn.com.oims.dao.pojo.YuYan;
import cn.com.oims.service.IUserOnlineService;
import cn.com.oims.service.IYhpzService;
import cn.com.oims.service.IYuYanService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ManagerController {
  private IUserOnlineService uos;
  
  private IYuYanService ys;
  
  private IYhpzService yhpzService;
  
  @Autowired
  public void setUos(IUserOnlineService uos) {
    this.uos = uos;
  }
  
  @Autowired
  public void setYhpzService(IYhpzService yhpzService) {
    this.yhpzService = yhpzService;
  }
  
  @Autowired
  public void setYs(IYuYanService ys) {
    this.ys = ys;
  }
  
  @RequestMapping({"/index.htm"})
  public ModelAndView manager(HttpServletRequest request, HttpServletResponse response) {
    ModelAndView mav = new ModelAndView();
    mav.setViewName("manager/index");
    return mav;
  }
  
  @RequestMapping(value = {"/findLanaguage.htm"}, method = {RequestMethod.POST})
  public void findLanguage(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("重设语言");
    try {
      HttpSession session = request.getSession();
      String gh = (String)session.getAttribute("gonghao");
      Yhpz yhpz = this.yhpzService.findYhpzById(gh);
      Enumeration<String> pn = request.getParameterNames();
      Map<String, String> map = new HashMap<>();
      String ids = "";
      String yuyanLoad = request.getParameter("yuyanListOnLoad");
      if (yuyanLoad == null) {
        while (pn.hasMoreElements()) {
          String n = pn.nextElement();
          String v = request.getParameter(n);
          if (v != null && !"tag".equals(n)) {
            int id = Integer.parseInt(v);
            ids = String.valueOf(ids) + id + ",";
          } 
        } 
        if (!"".equals(ids))
          ids = ids.substring(0, ids.lastIndexOf(",")); 
        List<YuYan> y = this.ys.findAllYuYansByIdsAndFenlei(ids, yhpz.getYuyan());
        if (y != null && y.size() > 0)
          for (YuYan yuyan : y)
            map.put(yuyan.getMc(), yuyan.getWenzi());  
        map.put("yuyanListOnLoad", "true");
        result.setState(1);
        result.setObj(map);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/userOnlineUpdate.htm"}, method = {RequestMethod.GET})
  public void updateOnline(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("更新在线状态");
    try {
      String gonghao = request.getSession().getAttribute("uid").toString();
      UserOnline uo = this.uos.findUserOnlineById(gonghao);
      uo.setVisitTime(new Date());
      this.uos.updateUserOnline(uo);
      result.setGonghao(gonghao);
      result.setState(1);
    } catch (Exception exception) {}
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
