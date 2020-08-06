package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IShiLiService;
import cn.com.oims.service.IYanYaService;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
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

@Controller
@RequestMapping({"hushi"})
public class HuShiWorkController {
  private IYanYaService yanyaService;
  
  private IShiLiService shiliService;
  
  private IJcdService jcdservice;
  
  private ShiLi s;
  
  private YanYa y_y;
  
  private IOimsLogService oimsLogService;
  
  private IHuanZheXinXiService huanzhexinxiservice;
  
  private HuanZheXinXi huanzhexinxi;
  
  private Map<String, Object> map = new HashMap<>();
  
  @Autowired
  public void setHuanzhexinxiservice(IHuanZheXinXiService huanzhexinxiservice) {
    this.huanzhexinxiservice = huanzhexinxiservice;
  }
  
  @Autowired
  public void setOimslogService(IOimsLogService oimslogService) {
    this.oimsLogService = oimslogService;
  }
  
  @Autowired
  public void setJcdservice(IJcdService jcdservice) {
    this.jcdservice = jcdservice;
  }
  
  @Autowired
  public void setYanyaService(IYanYaService yanyaService) {
    this.yanyaService = yanyaService;
  }
  
  @Autowired
  public void setShiliService(IShiLiService shiliService) {
    this.shiliService = shiliService;
  }
  
  @RequestMapping(value = {"/findAllYanYaByPage.htm"}, method = {RequestMethod.POST})
  public void findYanYaByPage(HttpServletRequest request, HttpServletResponse response, Page page, HzXxSearchForm hzxx) {
    Map<String, Object> map = new HashMap<>();
    MyResult result = new MyResult();
    result.setDoing("分页查询眼压信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    try {
      map = this.yanyaService.findAllYanYa4Page(page, hzxx);
      if (map != null) {
        result.setState(1);
        result.setMessage("成功");
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findAllShiLiByPage.htm"}, method = {RequestMethod.POST})
  public void findShiLiByPage(HttpServletRequest request, HttpServletResponse response, Page page, HzXxSearchForm hzxx) {
    Map<String, Object> map = new HashMap<>();
    MyResult result = new MyResult();
    result.setDoing("分页查询视力信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    try {
      map = this.shiliService.findAllShiLi4Page(page, hzxx);
      if (map != null) {
        result.setState(1);
        result.setMessage("成功");
        result.setObj(map);
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/addYanYa.htm"}, method = {RequestMethod.POST})
  public void saveYanYa(HttpServletRequest request, HttpServletResponse response, YanYa o) {
    MyResult result = new MyResult();
    result.setDoing("录入眼压信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    Jcd j = null;
    YanYa y = null;
    Long jcd_id = Long.valueOf(request.getParameter("jcd_id"));
    try {
      j = this.jcdservice.getJcdById(jcd_id);
      if (this.yanyaService.getYanYaByJcd(jcd_id) != null)
        o.setId(this.yanyaService.getYanYaByJcd(jcd_id).getId()); 
      o.setJcys(gonghao);
      o.setYcsj(result.getDate());
      o.setJcd_id(jcd_id);
      o.setJiuzhen_id(j.getJiuzhenId());
      o.setHuanzhe_id(j.getHuanzheId());
      this.yanyaService.saveOrUpdateYanYa(o);
      this.shiliService.updateJcdBiaoShi(j);
      result.setState(1);
      result.setMessage("成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("失败");
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/addShiLi.htm"}, method = {RequestMethod.POST})
  public void saveShiLi(HttpServletRequest request, HttpServletResponse response, ShiLi o) {
    MyResult result = new MyResult();
    result.setDoing("修改视力信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List<Map<String, Object>> l = null;
    try {
      Jcd j = this.jcdservice.getJcdById(Long.valueOf(request
            .getParameter("jcd_id")));
      l = this.shiliService.findShiLiByJcdId(request
          .getParameter("jcd_id"));
      if (l != null)
        o.setId(Long.valueOf(Long.parseLong(((Map)l.get(0)).get("id").toString()))); 
      o.setJcsj(result.getDate());
      o.setJcys(gonghao);
      o.setHuanzhe_id(j.getHuanzheId());
      o.setJiuzhen_id(j.getJiuzhenId());
      o.setJcd_id(Long.valueOf(request.getParameter("jcd_id")));
      this.shiliService.saveOrUpdateShiLi(o);
      this.shiliService.updateJcdBiaoShi(j);
      result.setState(1);
      result.setMessage("成功");
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
      result.setMessage("失败");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYanYaByID.htm"}, method = {RequestMethod.POST})
  public void findYanYaByJcd(HttpServletRequest request, HttpServletResponse response, Long id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("查询眼压信息根据检查单ID");
    YanYa yy = null;
    try {
      Jcd j = this.jcdservice.getJcdById(id);
      yy = this.yanyaService.getYanYaByJcd(j.getId());
      this.huanzhexinxi = this.huanzhexinxiservice.findHuanZheById(yy
          .getHuanzhe_id());
      this.map.put("yy", yy);
      this.map.put("huanzhexinxi", this.huanzhexinxi);
      if (yy != null && this.huanzhexinxi != null) {
        this.y_y = yy;
        result.setState(1);
        result.setObj(this.map);
        result.setMessage("成功");
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShiLiByJcd.htm"}, method = {RequestMethod.POST})
  public void findShiLiByJcd(HttpServletRequest request, HttpServletResponse response, Long id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List<Map<String, Object>> l = null;
    HuanZheXinXi huanzhexinxi = null;
    MyResult result = new MyResult();
    result.setDoing("查询眼压信息根据ID");
    Map<String, Object> map = new HashMap<>();
    try {
      l = this.shiliService.findShiLiByJcdId(id);
      huanzhexinxi = this.huanzhexinxiservice.findHuanZheById(
          Long.valueOf(Long.parseLong(((Map)l.get(0)).get("huanzhe_id").toString())));
      if (l != null && huanzhexinxi != null) {
        map.put("shili", l.get(0));
        map.put("huanzhexinxi", huanzhexinxi);
        result.setState(1);
        result.setObj(map);
        result.setMessage("成功");
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShiLiByID.htm"}, method = {RequestMethod.POST})
  public void findShiLiByID(HttpServletRequest request, HttpServletResponse response, Long id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    ShiLi yy = null;
    MyResult result = new MyResult();
    result.setDoing("查询视力信息根据ID");
    try {
      yy = this.shiliService.getShiLiById(id);
      this.s = yy;
      if (yy != null) {
        result.setState(1);
        result.setObj(yy);
        result.setMessage("成功");
      } else {
        result.setMessage("失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateYanYa.htm"}, method = {RequestMethod.POST})
  public void updateYanYa(HttpServletRequest request, HttpServletResponse response, YanYa o) {
    MyResult result = new MyResult();
    result.setDoing("修改眼压信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    System.out.println("yanya的id：" + o.getId());
    try {
      o.setJcys(gonghao);
      o.setYcsj(result.getDate());
      Jcd j = this.jcdservice.getJcdById(o.getJcd_id());
      this.yanyaService.updateYanYa(o);
      result.setState(1);
      result.setMessage("成功");
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
      result.setMessage("失败");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateShiLi.htm"}, method = {RequestMethod.POST})
  public void updateShiLi(HttpServletRequest request, HttpServletResponse response, ShiLi o) {
    MyResult result = new MyResult();
    result.setDoing("修改视力信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    try {
      o.setJcsj(result.getDate());
      o.setJcys(gonghao);
      o.setJcd_id(this.s.getJcd_id());
      ShiLi sl = this.shiliService.getShiLiById(o.getId());
      Jcd j = this.jcdservice.getJcdById(sl.getJcd_id());
      this.shiliService.updateShiLi(o);
      this.shiliService.updateJcdBiaoShi(j);
      result.setState(1);
      result.setMessage("成功");
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
      result.setMessage("失败");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
