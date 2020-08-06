package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IYanYaService;
import cn.com.oims.web.form.HzXxSearchForm;
import cn.com.oims.web.form.YanyaForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.Date;
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
@RequestMapping({"yanya"})
public class YanYaController {
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IYanYaService YanYaService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @RequestMapping(value = {"/getYanYaList.htm"}, method = {RequestMethod.POST})
  public void getJiuZhenHuanZheList(Page page, HttpServletRequest request, HttpServletResponse response, HzXxSearchForm hzxx) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    String factor = request.getParameter("state");
    page.setFactor(factor);
    Map map = new HashMap<>();
    map = this.YanYaService.findAllYanYa4Page(page, hzxx);
    if (map != null) {
      result.setState(1);
      result.setMessage("成功");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/selectYanYasByYanYa.htm"}, method = {RequestMethod.POST})
  public void selectYanYasByYanYa(HttpServletRequest request, HttpServletResponse response, YanYa yanya) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<YanYa> list = null;
    this.doing = "根据眼压对象查询符合条件的眼压对象集合";
    try {
      list = this.YanYaService.selectYanYasByYanYa(yanya);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(list);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYanYaByJiuzheId.htm"}, method = {RequestMethod.POST})
  public void getYanYaByJiuzheId(Long jiuzhenId, HttpServletRequest request, HttpServletResponse response, HzXxSearchForm hzxx) {
    MyResult result = new MyResult();
    try {
      String gonghao = (String)request.getSession().getAttribute("gonghao");
      YanYa yanya = this.YanYaService.getYanYaByJiuzheId(jiuzhenId);
      result.setState(1);
      result.setObj(yanya);
      result.setMessage("成功");
      result.setGonghao(gonghao);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYanYaByHzId.htm"}, method = {RequestMethod.POST})
  public void getYanYaByHzId(Long hzId, HttpServletRequest request, HttpServletResponse response, HzXxSearchForm hzxx) {
    MyResult result = new MyResult();
    try {
      String gonghao = (String)request.getSession().getAttribute("gonghao");
      YanYa yanya = this.YanYaService.getYanYaByHzId(hzId);
      result.setState(1);
      result.setObj(yanya);
      result.setMessage("成功");
      result.setGonghao(gonghao);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveYanYa.htm"}, method = {RequestMethod.POST})
  public void getYanYaByJiuzheId(YanyaForm form, HttpServletRequest request, HttpServletResponse response, HzXxSearchForm hzxx) {
    MyResult result = new MyResult();
    try {
      String gonghao = (String)request.getSession().getAttribute("gonghao");
      YanYa yanya = new YanYa();
      yanya.setHuanzhe_id(form.getHuanzheId());
      yanya.setId(form.getId());
      yanya.setOd(form.getOD());
      yanya.setOs(form.getOS());
      yanya.setMethodOD(form.getOD_METHOD());
      yanya.setMethodOS(form.getOS_METHOD());
      yanya.setJiuzhen_id(Long.valueOf(form.getJiuzhenId()));
      yanya.setJcys(gonghao);
      yanya.setYcsj(new Date());
      yanya.setBeizhu(form.getBeizhu());
      yanya.setRefuse(form.getRefuse());
      if (form.getId() == null) {
        yanya.setId((Long)this.YanYaService.saveYanYa(yanya));
      } else {
        this.YanYaService.updateYanYa(yanya);
      } 
      result.setState(1);
      result.setObj(yanya.getId());
      result.setMessage("成功");
      result.setGonghao(gonghao);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
