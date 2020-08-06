package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Eyejmspjs;
import cn.com.oims.dao.pojo.Eyeygnew;
import cn.com.oims.dao.pojo.SgBlfy;
import cn.com.oims.dao.pojo.SgCcdj;
import cn.com.oims.dao.pojo.SgDpjl;
import cn.com.oims.dao.pojo.SgFcjl;
import cn.com.oims.dao.pojo.SgQjd;
import cn.com.oims.dao.pojo.Sgbl;
import cn.com.oims.service.IQuGuangService;
import cn.com.oims.service.IShiGuangService;
import cn.com.oims.web.form.SgZkjcForm;
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
@RequestMapping({"shiGuang"})
public class ShiGuangController {
  @Autowired
  private IShiGuangService shiGuangService;
  
  @Autowired
  private IQuGuangService emrQuGuangService;
  
  @RequestMapping(value = {"/saveSgbl.htm"}, method = {RequestMethod.POST})
  public void saveSgbl(HttpServletResponse response, HttpServletRequest request, Sgbl sgbl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.saveSgbl(sgbl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateSgbl.htm"}, method = {RequestMethod.POST})
  public void updateSgbl(HttpServletResponse response, HttpServletRequest request, Sgbl sgbl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.updateSgbl(sgbl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgblById.htm"}, method = {RequestMethod.GET})
  public void getSgblById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgblById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findSgblByBlhFy.htm"}, method = {RequestMethod.POST})
  public void findSgblByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.shiGuangService.findSgbl4page(page, blh);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(map);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getLastSgbl.htm"}, method = {RequestMethod.GET})
  public void getLastSgbl(HttpServletResponse response, HttpServletRequest request) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getLastSgbl(blh));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveSgCcdj.htm"}, method = {RequestMethod.POST})
  public void saveSgCcdj(HttpServletResponse response, HttpServletRequest request, SgCcdj ccdj) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.saveSgCcdj(ccdj);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateSgCcdj.htm"}, method = {RequestMethod.POST})
  public void updateSgCcdj(HttpServletResponse response, HttpServletRequest request, SgCcdj ccdj) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.updateSgCcdj(ccdj);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgCcdjById.htm"}, method = {RequestMethod.GET})
  public void getSgCcdjById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgCcdjById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgCcdjByBlbh.htm"}, method = {RequestMethod.GET})
  public void getSgCcdjByBlbh(HttpServletResponse response, HttpServletRequest request) {
    Long blbh = Long.valueOf(Long.parseLong(request.getParameter("blbh")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgCcdjByBlbh(blbh));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findSgCcdj4page.htm"}, method = {RequestMethod.POST})
  public void findSgCcdj4page(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long bl_id = Long.valueOf(Long.parseLong(request.getParameter("bl_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.shiGuangService.findSgCcdj4page(page, bl_id);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(map);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/saveSgDpjl.htm"}, method = {RequestMethod.POST})
  public void saveSgDpjl(HttpServletResponse response, HttpServletRequest request, SgDpjl dpjl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.saveSgDpjl(dpjl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateSgDpjl.htm"}, method = {RequestMethod.POST})
  public void updateSgDpjl(HttpServletResponse response, HttpServletRequest request, SgDpjl dpjl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.updateSgDpjl(dpjl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgDpjlById.htm"}, method = {RequestMethod.GET})
  public void getSgDpjlById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgDpjlById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgDpjlByBlbh.htm"}, method = {RequestMethod.GET})
  public void getSgDpjlByBlbh(HttpServletResponse response, HttpServletRequest request) {
    Long blbh = Long.valueOf(Long.parseLong(request.getParameter("blbh")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgDpjlByBlbh(blbh));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findSgDpjl4page.htm"}, method = {RequestMethod.POST})
  public void findSgDpjl4page(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long bl_id = Long.valueOf(Long.parseLong(request.getParameter("bl_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.shiGuangService.findSgDpjl4page(page, bl_id);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(map);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/saveSgQjd.htm"}, method = {RequestMethod.POST})
  public void saveSgQjd(HttpServletResponse response, HttpServletRequest request, SgQjd qjd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.saveSgQjd(qjd);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateSgQjd.htm"}, method = {RequestMethod.POST})
  public void updateSgQjds(HttpServletResponse response, HttpServletRequest request, SgQjd qjd) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.updateSgQjd(qjd);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgQjdById.htm"}, method = {RequestMethod.GET})
  public void getSgQjdById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgQjdById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgQjdByBlbh.htm"}, method = {RequestMethod.GET})
  public void getSgQjdByBlbh(HttpServletResponse response, HttpServletRequest request) {
    Long blbh = Long.valueOf(Long.parseLong(request.getParameter("blbh")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgQjdByBlbh(blbh));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findSgQjd4page.htm"}, method = {RequestMethod.POST})
  public void findSgQjd4page(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long bl_id = Long.valueOf(Long.parseLong(request.getParameter("bl_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.shiGuangService.findSgQjd4page(page, bl_id);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(map);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/saveSgFcjl.htm"}, method = {RequestMethod.POST})
  public void saveSgFcjl(HttpServletResponse response, HttpServletRequest request, SgFcjl fcjl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.saveSgFcjl(fcjl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateSgFcjl.htm"}, method = {RequestMethod.POST})
  public void updateSgFcjl(HttpServletResponse response, HttpServletRequest request, SgFcjl fcjl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.shiGuangService.updateSgFcjl(fcjl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgFcjlById.htm"}, method = {RequestMethod.GET})
  public void getSgFcjlById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgFcjlById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgFcjlByBlbh.htm"}, method = {RequestMethod.GET})
  public void getSgFcjlByBlbh(HttpServletResponse response, HttpServletRequest request) {
    Long blbh = Long.valueOf(Long.parseLong(request.getParameter("blbh")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgFcjlByBlbh(blbh));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findSgFcjl4page.htm"}, method = {RequestMethod.POST})
  public void findSgFcjl4page(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long bl_id = Long.valueOf(Long.parseLong(request.getParameter("bl_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.shiGuangService.findSgFcjl4page(page, bl_id);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(map);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findSgFcjlByBlbh.htm"}, method = {RequestMethod.POST})
  public void findSgFcjlByBlbh(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long bl_id = Long.valueOf(Long.parseLong(request.getParameter("bl_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    List list = null;
    try {
      list = this.shiGuangService.findSgFcjl(bl_id);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(list);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/autoGetEyeygnew.htm"}, method = {RequestMethod.POST})
  public void autoGetEyeygnew(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long huanzheId = Long.valueOf(Long.parseLong(request.getParameter("hz_id")));
    Long jcxmId = Long.valueOf(Long.parseLong(request.getParameter("jcxm_id")));
    String kt_xt = request.getParameter("kt_xt");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    Eyeygnew eyeygnew = null;
    try {
      eyeygnew = this.shiGuangService.getEyeygnew(huanzheId, jcxmId, kt_xt);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(eyeygnew);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/autoGetEyejmspjs.htm"}, method = {RequestMethod.POST})
  public void autoGetEyejmspjs(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long huanzheId = Long.valueOf(Long.parseLong(request.getParameter("hz_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    Eyejmspjs jmspjs = null;
    try {
      jmspjs = this.shiGuangService.getEyejmspjs(huanzheId);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(jmspjs);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/autoFindZkjc.htm"}, method = {RequestMethod.POST})
  public void autoFindZkjc(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long huanzheId = Long.valueOf(Long.parseLong(request.getParameter("hz_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    List<SgZkjcForm> list = null;
    try {
      list = this.shiGuangService.findZkjcByHzId(huanzheId);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(list);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/autoFindZkjc1.htm"}, method = {RequestMethod.POST})
  public void autoFindZkjc1(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long huanzheId = Long.valueOf(Long.parseLong(request.getParameter("hz_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    List<SgZkjcForm> list = null;
    try {
      list = this.shiGuangService.getLastZkjcByHzId(huanzheId + "");
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(list);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findYuanGongList.htm"}, method = {RequestMethod.POST})
  public void findYuanGongList(HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    try {
      result.setState(1);
      result.setObj(this.emrQuGuangService.findYuanGong(Integer.valueOf(10), Integer.valueOf(11)));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveSgBlfy.htm"}, method = {RequestMethod.POST})
  public void saveSgBlfy(HttpServletResponse response, HttpServletRequest request, SgBlfy blfy) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存角膜塑形镜不良反应");
    try {
      this.shiGuangService.saveSgBlfy(blfy);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateSgBlfy.htm"}, method = {RequestMethod.POST})
  public void updateSgBlfy(HttpServletResponse response, HttpServletRequest request, SgBlfy blfy) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("修改角膜塑形镜不良反应");
    try {
      this.shiGuangService.updateSgBlfy(blfy);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgBlfyById.htm"}, method = {RequestMethod.GET})
  public void getSgBlfyById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("通过id查询角膜塑形镜不良反应");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgBlfyById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSgBlfyByBlbh.htm"}, method = {RequestMethod.GET})
  public void getSgBlfyByBlbh(HttpServletResponse response, HttpServletRequest request) {
    Long blbh = Long.valueOf(Long.parseLong(request.getParameter("blbh")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("通过病历id查询角膜塑形镜不良反应");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.shiGuangService.getSgBlfyByBlbh(blbh));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findSgBlfy4page.htm"}, method = {RequestMethod.POST})
  public void findSgBlfy4page(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long bl_id = Long.valueOf(Long.parseLong(request.getParameter("bl_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("通过病历id查询所有角膜塑形镜不良反应");
    try {
      map = this.shiGuangService.findSgBlfy4page(page, bl_id);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(map);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findSgBlfyByBlbh.htm"}, method = {RequestMethod.POST})
  public void findSgBlfyByBlbh(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long bl_id = Long.valueOf(Long.parseLong(request.getParameter("bl_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("通过病历id查询所有角膜塑形镜不良反应");
    List list = null;
    try {
      list = this.shiGuangService.findSgBlfyByBlbh(bl_id);
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(list);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
