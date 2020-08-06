package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.QgErSsjl;
import cn.com.oims.dao.pojo.QgJtssjl;
import cn.com.oims.dao.pojo.QgShfc;
import cn.com.oims.dao.pojo.QgShfcEr;
import cn.com.oims.dao.pojo.QgShjl;
import cn.com.oims.dao.pojo.QgSsjl;
import cn.com.oims.dao.pojo.QgYy;
import cn.com.oims.dao.pojo.Qgbl;
import cn.com.oims.dao.pojo.QgblEr;
import cn.com.oims.dao.pojo.Qglc;
import cn.com.oims.service.IQuGuangService;
import cn.com.oims.web.form.QgSearchForm;
import cn.com.oims.web.form.QgtjConditionForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.CellFormat;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"quguang"})
public class QuGuangController {
  private static final Logger LOG = LoggerFactory.getLogger(QuGuangController.class);

  @Autowired
  private IQuGuangService emrQuGuangService;
  
  @RequestMapping(value = {"/saveQgss.htm"}, method = {RequestMethod.POST})
  public void saveQgss(HttpServletResponse response, HttpServletRequest request, QgSsjl qgss) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    LOG.info("saveQgss-保存屈光手术记录,病历号：" + qgss.getBlh());
    try {
      Long id = (Long)this.emrQuGuangService.saveQuss(qgss);
      result.setObj(id);
      result.setState(1);
      result.setMessage("操作成功");
      LOG.info("saveQgss-保存屈光手术记录,病历号：" + qgss.getBlh() + "操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      LOG.error("saveQgss-保存屈光手术记录,病历号：" + qgss.getBlh() + "操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateQgss.htm"}, method = {RequestMethod.POST})
  public void updateQgss(HttpServletResponse response, HttpServletRequest request, QgSsjl qgss) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.emrQuGuangService.updateQuss(qgss);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgssByBlhFy.htm"}, method = {RequestMethod.GET})
  public void findQgssByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQuss4page(page, blh);
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
  
  @RequestMapping(value = {"/findQgssByLcFy.htm"}, method = {RequestMethod.GET})
  public void findQgssByLcFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQuss4page(page, lc_id);
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
  
  @RequestMapping(value = {"/findQgssFy_look.htm"}, method = {RequestMethod.GET})
  public void findQgssFy_look(HttpServletResponse response, HttpServletRequest request, Page page) {
    String str = request.getParameter("str");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      map = this.emrQuGuangService.findQuss4page_look(page, str);
      result.setState(1);
      result.setObj(map);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getQgssById.htm"}, method = {RequestMethod.POST})
  public void getQgssById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQussById(id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgssByLc_id.htm"}, method = {RequestMethod.POST})
  public void getQgssByLc_id(HttpServletResponse response, HttpServletRequest request) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQussByLc_id(lc_id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveShjl.htm"}, method = {RequestMethod.POST})
  public void saveShjl(HttpServletResponse response, HttpServletRequest request, QgShjl shjl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.emrQuGuangService.saveShjl(shjl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateShjl.htm"}, method = {RequestMethod.POST})
  public void updateShjl(HttpServletResponse response, HttpServletRequest request, QgShjl shjl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.emrQuGuangService.updateShjl(shjl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findShjlByBlhFy.htm"}, method = {RequestMethod.GET})
  public void findShjlByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findShjl4page(page, blh);
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
  
  @RequestMapping(value = {"/findShjlByLcFy.htm"}, method = {RequestMethod.GET})
  public void findShjlByLcFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findShjl4page(page, lc_id);
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
  
  @RequestMapping(value = {"/getShjlById.htm"}, method = {RequestMethod.POST})
  public void getShjlById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getShjlById(id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllShjlByBlh.htm"}, method = {RequestMethod.POST})
  public void findAllShjlByBlh(HttpServletResponse response, HttpServletRequest request, QgShjl shjl) {
    List list = null;
    String blh = shjl.getBlh();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("blh查询全部术后记录");
    try {
      result.setMessage("操作成功");
      list = this.emrQuGuangService.findShjlAll(blh);
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONList(list, response);
  }
  
  @RequestMapping(value = {"/getShjlByLc_id.htm"}, method = {RequestMethod.POST})
  public void getShjlByLc_id(HttpServletResponse response, HttpServletRequest request) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgShjlByLc_id(lc_id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveYy.htm"}, method = {RequestMethod.POST})
  public void saveYy(HttpServletResponse response, HttpServletRequest request, QgYy qgyy) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.emrQuGuangService.saveYy(qgyy);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateYy.htm"}, method = {RequestMethod.POST})
  public void updateYy(HttpServletResponse response, HttpServletRequest request, QgYy qgyy) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.emrQuGuangService.updateQgyy(qgyy);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgYyByBlhFy.htm"}, method = {RequestMethod.POST})
  public void findQgYyByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQgYy4page(page, blh);
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
  
  @RequestMapping(value = {"/findQgYyByLcFy.htm"}, method = {RequestMethod.POST})
  public void findQgYyByLcFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQgYy4page(page, lc_id);
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
  
  @RequestMapping(value = {"/findQgYyAllFy.htm"}, method = {RequestMethod.GET})
  public void findQgYyAllFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQgYyAll4page(page);
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
  
  @RequestMapping(value = {"/getQgYyById.htm"}, method = {RequestMethod.POST})
  public void getQgYyById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgYyById(id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgYyByLc_id.htm"}, method = {RequestMethod.POST})
  public void getQgYyByLc_id(HttpServletResponse response, HttpServletRequest request) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgYyByLc_id(lc_id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveQgbl.htm"}, method = {RequestMethod.POST})
  public void saveQgbl(HttpServletResponse response, HttpServletRequest request, Qgbl qgbl) {
    qgbl.setSsf_rq(getNullDate(qgbl.getSsf_rq()));
    qgbl.setJcf_rq(getNullDate(qgbl.getJcf_rq()));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光病历");
    try {
      this.emrQuGuangService.saveQgbl(qgbl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public static Date getNullDate(Date d) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(d);
    if (cal.getWeekYear() == 1970)
      return null; 
    return d;
  }
  
  @RequestMapping(value = {"/updateQgbl.htm"}, method = {RequestMethod.POST})
  public void updateQgbl(HttpServletResponse response, HttpServletRequest request, Qgbl qgbl) {
    qgbl.setSsf_rq(getNullDate(qgbl.getSsf_rq()));
    qgbl.setJcf_rq(getNullDate(qgbl.getJcf_rq()));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.emrQuGuangService.updateQgbl(qgbl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgblByBlhFy.htm"}, method = {RequestMethod.POST})
  public void findQgblByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光病历列表");
    try {
      map = this.emrQuGuangService.findQgbl4page(page, blh);
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
  
  @RequestMapping(value = {"/getQgblById.htm"}, method = {RequestMethod.POST})
  public void getQgblById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgblById(id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgblLastOne.htm"}, method = {RequestMethod.POST})
  public void getQgblLastOne(HttpServletResponse response, HttpServletRequest request) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgblLastOne(blh));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgblByLc_id.htm"}, method = {RequestMethod.POST})
  public void getQgblByLc_id(HttpServletResponse response, HttpServletRequest request) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setObj(this.emrQuGuangService.getQgblByLc_id(lc_id));
      result.setMessage("操作成功");
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveQgJtssjl.htm"}, method = {RequestMethod.POST})
  public void saveQgJtssjl(HttpServletResponse response, HttpServletRequest request, QgJtssjl jt) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光病历");
    try {
      Long id = (Long)this.emrQuGuangService.saveJtssjl(jt);
      result.setObj(id);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateQgJtssjl.htm"}, method = {RequestMethod.POST})
  public void updateQgJtssjl(HttpServletResponse response, HttpServletRequest request, QgJtssjl jt) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.emrQuGuangService.updateJtssjl(jt);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgJtssjlByBlhFy.htm"}, method = {RequestMethod.POST})
  public void findQgJtssjlByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光病历列表");
    try {
      map = this.emrQuGuangService.findJtssjl4page(page, blh);
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
  
  @RequestMapping(value = {"/findQgJtssjlByLcFy.htm"}, method = {RequestMethod.POST})
  public void findQgJtssjlByLcFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光病历列表");
    try {
      map = this.emrQuGuangService.findJtssjl4page(page, lc_id);
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
  
  @RequestMapping(value = {"/getQgJtssjlById.htm"}, method = {RequestMethod.POST})
  public void getQgJtssjlById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getJtssjlById(id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgJtssjlByLc_id.htm"}, method = {RequestMethod.POST})
  public void getQgJtssjlByLc_id(Long lc_id, String yanbie, HttpServletResponse response, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getJtssjlByLc_id(lc_id, yanbie));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveQgShfc.htm"}, method = {RequestMethod.POST})
  public void saveQgShfc(HttpServletResponse response, HttpServletRequest request, QgShfc fc) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光术后复查");
    try {
      this.emrQuGuangService.saveShfc(fc);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateQgShfc.htm"}, method = {RequestMethod.POST})
  public void updateQgShfc(HttpServletResponse response, HttpServletRequest request, QgShfc fc) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("修改屈光术后复查");
    try {
      this.emrQuGuangService.updateShfc(fc);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgShfcByLcFy.htm"}, method = {RequestMethod.POST})
  public void findQgShfcByLcFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("分页查询屈光术后复查列表");
    try {
      map = this.emrQuGuangService.findShfc4page(page, lc_id);
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
  
  @RequestMapping(value = {"/getQgShfcById.htm"}, method = {RequestMethod.POST})
  public void getQgShfcById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getShfcById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgShfcByLc_id.htm"}, method = {RequestMethod.POST})
  public void getQgShfcByLc_id(HttpServletResponse response, HttpServletRequest request) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgShjlByLc_id(lc_id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveQgErSsjl.htm"}, method = {RequestMethod.POST})
  public void saveQgErSsjl(HttpServletResponse response, HttpServletRequest request, QgErSsjl ssjl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光儿童手术记录");
    try {
      Long id = (Long)this.emrQuGuangService.saveErSsjl(ssjl);
      result.setObj(id);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateQgErSsjl.htm"}, method = {RequestMethod.POST})
  public void updateQgErSsjl(HttpServletResponse response, HttpServletRequest request, QgErSsjl ssjl) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光儿童手术记录");
    try {
      this.emrQuGuangService.updateErSsjl(ssjl);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgErSsjlByBlhFy.htm"}, method = {RequestMethod.POST})
  public void findQgErSsjlByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光儿童手术记录列表");
    try {
      map = this.emrQuGuangService.findErSsjl4page(page, blh);
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
  
  @RequestMapping(value = {"/findQgErSsjlByLcFy.htm"}, method = {RequestMethod.POST})
  public void findQgErSsjlByLcFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光儿童手术记录列表");
    try {
      map = this.emrQuGuangService.findErSsjl4page(page, lc_id);
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
  
  @RequestMapping(value = {"/getQgErSsjlById.htm"}, method = {RequestMethod.POST})
  public void getQgErSsjlById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光儿童手术记录");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getErSsjlById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgErSsjlByLc_id.htm"}, method = {RequestMethod.POST})
  public void getQgErSsjlByLc_id(HttpServletResponse response, HttpServletRequest request) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光儿童手术记录");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getErSsjlByLc_id(lc_id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveQgblEr.htm"}, method = {RequestMethod.POST})
  public void saveQgblEr(HttpServletResponse response, HttpServletRequest request, QgblEr er) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光病历");
    try {
      this.emrQuGuangService.saveQgblEr(er);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateQgblEr.htm"}, method = {RequestMethod.POST})
  public void updateQgblEr(HttpServletResponse response, HttpServletRequest request, QgblEr er) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光手术记录");
    try {
      this.emrQuGuangService.updateQgblEr(er);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgblErByBlhFy.htm"}, method = {RequestMethod.POST})
  public void findQgblErByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光病历列表");
    try {
      map = this.emrQuGuangService.findQgblEr4page(page, blh);
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
  
  @RequestMapping(value = {"/getQgblErById.htm"}, method = {RequestMethod.POST})
  public void getQgblErById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgblErById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgblErByLc_id.htm"}, method = {RequestMethod.POST})
  public void getQgblErByLc_id(HttpServletResponse response, HttpServletRequest request) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgblErByLc_id(lc_id));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgblErLastOne.htm"}, method = {RequestMethod.POST})
  public void getQgblErLastOne(HttpServletResponse response, HttpServletRequest request) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("查询屈光手术列表");
    try {
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQgblErLastOne(blh));
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveQgShfcEr.htm"}, method = {RequestMethod.POST})
  public void saveQgShfcEr(HttpServletResponse response, HttpServletRequest request, QgShfcEr fc) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光术后复查");
    try {
      this.emrQuGuangService.saveShfcEr(fc);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateQgShfcEr.htm"}, method = {RequestMethod.POST})
  public void updateQgShfcEr(HttpServletResponse response, HttpServletRequest request, QgShfcEr fc) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("修改屈光术后复查");
    try {
      this.emrQuGuangService.updateShfcEr(fc);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgShfcErByBlhFy.htm"}, method = {RequestMethod.POST})
  public void findQgShfcErByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("分页查询屈光术后复查列表");
    try {
      map = this.emrQuGuangService.findShfcEr4page(page, blh);
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
  
  @RequestMapping(value = {"/findQgShfcErByLcFy.htm"}, method = {RequestMethod.POST})
  public void findQgShfcErByLcFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("分页查询屈光术后复查列表");
    try {
      map = this.emrQuGuangService.findShfcEr4page(page, lc_id);
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
  
  @RequestMapping(value = {"/getQgShfcErById.htm"}, method = {RequestMethod.POST})
  public void getQgShfcErById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getShfcErById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getQgShfcErByLc_id.htm"}, method = {RequestMethod.POST})
  public void getQgShfcErByLc_id(HttpServletResponse response, HttpServletRequest request) {
    Long lc_id = Long.valueOf(Long.parseLong(request.getParameter("lc_id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getShfcByLc_id(lc_id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveQglc.htm"}, method = {RequestMethod.POST})
  public void saveQglc(HttpServletResponse response, HttpServletRequest request, Qglc lc) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("保存屈光术后复查");
    try {
      this.emrQuGuangService.saveQglc(lc);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateQglc.htm"}, method = {RequestMethod.POST})
  public void updateQglc(HttpServletResponse response, HttpServletRequest request, Qglc lc) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("修改屈光术后复查");
    try {
      this.emrQuGuangService.updateQglc(lc);
      result.setState(1);
      result.setMessage("操作成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQglcByBlhFy.htm"}, method = {RequestMethod.POST})
  public void findQglcByBlhFy(HttpServletResponse response, HttpServletRequest request, Page page) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("分页查询屈光术后复查列表");
    try {
      map = this.emrQuGuangService.findQglc4page(page, blh);
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
  
  @RequestMapping(value = {"/getQglcById.htm"}, method = {RequestMethod.POST})
  public void getQglcById(HttpServletResponse response, HttpServletRequest request) {
    Long id = Long.valueOf(Long.parseLong(request.getParameter("id")));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    try {
      result.setState(1);
      result.setMessage("操作成功");
      result.setObj(this.emrQuGuangService.getQglcById(id));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQglcByBlhWwc.htm"}, method = {RequestMethod.POST})
  public void findQglcByBlhWwc(HttpServletResponse response, HttpServletRequest request) {
    String blh = request.getParameter("blh");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    Qglc qglc = null;
    try {
      result.setState(1);
      result.setMessage("操作成功");
      qglc = this.emrQuGuangService.findQglcByIdWwc(blh);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(qglc, response);
  }
  
  @RequestMapping(value = {"/getQglcByBl_id.htm"}, method = {RequestMethod.POST})
  public void getQglcByBl_id(HttpServletResponse response, HttpServletRequest request) {
    String bl_id = request.getParameter("bl_id");
    Long id = Long.valueOf(Long.parseLong(bl_id));
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    Qglc qglc = null;
    try {
      result.setState(1);
      result.setMessage("操作成功");
      qglc = this.emrQuGuangService.getQglcByBl_id(id);
      result.setObj(qglc);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/autoCreateBinglihao.htm"}, method = {RequestMethod.POST})
  public void autoCreateBinglihao(HttpServletResponse response, HttpServletRequest request) {
    String id = request.getParameter("id");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    try {
      result.setMessage(this.emrQuGuangService.autoCreateBinglihao(id));
      result.setState(1);
      result.setObj(null);
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
      result.setObj(this.emrQuGuangService.findYuanGong(Integer.valueOf(9), Integer.valueOf(12)));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgSgConf.htm"}, method = {RequestMethod.POST})
  public void findQgSgConf(HttpServletResponse response, HttpServletRequest request) {
    String tag = request.getParameter("tag");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("id查询屈光术后复查");
    try {
      result.setState(1);
      result.setObj(this.emrQuGuangService.findQgSgConf(tag));
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("操作失败");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findQgbl.htm"}, method = {RequestMethod.POST})
  public void findQgbl(HttpServletResponse response, HttpServletRequest request, Page page, QgSearchForm qgSearchForm) {
    String realPath = request.getSession().getServletContext()
      .getRealPath("/qg_resource/qg_tjcx_sql.txt");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQgbl(page, qgSearchForm);
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
  
  @RequestMapping(value = {"/findQgYY.htm"}, method = {RequestMethod.POST})
  public void findQgYY(HttpServletResponse response, HttpServletRequest request, Page page, QgSearchForm qgSearchForm) {
    String blh_name = request.getParameter("blh_name");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQgYY(page, qgSearchForm);
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
  
  @RequestMapping(value = {"/findQgss.htm"}, method = {RequestMethod.POST})
  public void findQgss(HttpServletResponse response, HttpServletRequest request, Page page, QgSearchForm qgSearchForm) {
    String blh_name = request.getParameter("blh_name");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQgSsjl(page, qgSearchForm);
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
  
  @RequestMapping(value = {"/findQgShjl.htm"}, method = {RequestMethod.POST})
  public void findQgShjl(HttpServletResponse response, HttpServletRequest request, Page page, QgSearchForm qgSearchForm) {
    String blh_name = request.getParameter("blh_name");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    Map<String, Object> map = new HashMap<>();
    result.setDoing("查询屈光手术列表");
    try {
      map = this.emrQuGuangService.findQgShjl(page, qgSearchForm);
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
  
  @RequestMapping(value = {"/qg_export.htm"}, method = {RequestMethod.POST})
  public void qg_export(HttpServletResponse response, HttpServletRequest request, QgSearchForm qgSearchForm) throws IOException {
    List<QgSearchForm> list = null;
    String tag = request.getParameter("tag");
    MyResult result = new MyResult();
    result.setDoing("屈光导出");
    if (tag.equals("bl_radio")) {
      list = this.emrQuGuangService.findQgbl(qgSearchForm);
    } else if (tag.equals("yy_radio")) {
      list = this.emrQuGuangService.findQgYY(qgSearchForm);
    } else if (tag.equals("ssjl_radio")) {
      list = this.emrQuGuangService.findQgSsjl(qgSearchForm);
    } else if (tag.equals("shfc_radio")) {
      list = this.emrQuGuangService.findQgShjl(qgSearchForm);
    } 
    String fileName = exportExcel(request, list, tag);
    result.setObj("/qg_excel/" + fileName);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/qg_export_all.htm"}, method = {RequestMethod.POST})
  public void qg_export_all(HttpServletResponse response, HttpServletRequest request, QgSearchForm qgSearchForm) throws IOException {
    List<QgSearchForm> list_bl = this.emrQuGuangService.findQgbl(qgSearchForm);
    List<QgSearchForm> list_yy = this.emrQuGuangService.findQgYY(qgSearchForm);
    List<QgSearchForm> list_ssjl = this.emrQuGuangService.findQgSsjl(qgSearchForm);
    List<QgSearchForm> list_shfc = this.emrQuGuangService.findQgShjl(qgSearchForm);
    MyResult result = new MyResult();
    result.setDoing("屈光导出");
    String fileName = exportExcel(request, list_bl, list_yy, list_ssjl, list_shfc);
    result.setObj("/qg_excel/" + fileName);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public File getNewFile(String tag, HttpServletRequest request) {
    String realPath = request.getServletContext().getRealPath("/qg_excel");
    File file = new File(realPath);
    if (!file.exists() || !file.isDirectory())
      file.mkdirs(); 
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");
    String fileName = String.valueOf(tag) + sdf.format(date) + ".xls";
    String filePath = String.valueOf(realPath) + "/" + fileName;
    File excelFile = new File(filePath);
    if (excelFile.exists()) {
      excelFile.delete();
      excelFile = new File(filePath);
    } 
    return excelFile;
  }
  
  public String exportExcel(HttpServletRequest request, List<QgSearchForm> list, String tag) {
    String fileName = "";
    String tagName = "";
    String sheetName = "";
    if (tag.equals("bl_radio")) {
      tagName = "BL";
      sheetName = "病历";
    } else if (tag.equals("yy_radio")) {
      tagName = "YY";
      sheetName = "预约";
    } else if (tag.equals("ssjl_radio")) {
      tagName = "SSJL";
      sheetName = "手术记录";
    } else if (tag.equals("shfc_radio")) {
      tagName = "SHFC";
      sheetName = "复查记录";
    } 
    try {
      File excelFile = getNewFile(tagName, request);
      fileName = excelFile.getName();
      WritableWorkbook book = Workbook.createWorkbook(excelFile);
      WritableSheet sheet = book.createSheet(sheetName, 0);
      WritableFont title_style = new WritableFont(
          WritableFont.ARIAL, 10, WritableFont.BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableFont content_style = new WritableFont(
          WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableCellFormat wcfFC_title = new WritableCellFormat(title_style);
      WritableCellFormat wcfFC_content = new WritableCellFormat(content_style);
      wcfFC_title.setAlignment(Alignment.CENTRE);
      wcfFC_content.setAlignment(Alignment.CENTRE);
      if (tag.equals("bl_radio")) {
        bl_book(list, wcfFC_title, wcfFC_content, sheet);
      } else if (tag.equals("yy_radio")) {
        yy_book(list, wcfFC_title, wcfFC_content, sheet);
      } else if (tag.equals("ssjl_radio")) {
        ssjl_book(list, wcfFC_title, wcfFC_content, sheet);
      } else if (tag.equals("shfc_radio")) {
        shfc_book(list, wcfFC_title, wcfFC_content, sheet);
      } 
      book.write();
      book.close();
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return fileName;
  }
  
  public String exportExcel(HttpServletRequest request, List<QgSearchForm> list_bl, List<QgSearchForm> list_yy, List<QgSearchForm> list_ssjl, List<QgSearchForm> list_shfc) {
    String fileName = "";
    String tagName = "BLS";
    String sheetName_bl = "病历";
    String sheetName_yy = "预约";
    String sheetName_ssjl = "手术记录";
    String sheetName_shfc = "复查记录";
    try {
      File excelFile = getNewFile(tagName, request);
      fileName = excelFile.getName();
      WritableWorkbook book = Workbook.createWorkbook(excelFile);
      WritableSheet sheet_bl = book.createSheet(sheetName_bl, 0);
      WritableSheet sheet_yy = book.createSheet(sheetName_yy, 1);
      WritableSheet sheet_ssjl = book.createSheet(sheetName_ssjl, 2);
      WritableSheet sheet_shfc = book.createSheet(sheetName_shfc, 3);
      WritableFont title_style = new WritableFont(
          WritableFont.ARIAL, 10, WritableFont.BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableFont content_style = new WritableFont(
          WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableCellFormat wcfFC_title = new WritableCellFormat(title_style);
      WritableCellFormat wcfFC_content = new WritableCellFormat(content_style);
      wcfFC_title.setAlignment(Alignment.CENTRE);
      wcfFC_content.setAlignment(Alignment.CENTRE);
      bl_book(list_bl, wcfFC_title, wcfFC_content, sheet_bl);
      yy_book(list_yy, wcfFC_title, wcfFC_content, sheet_yy);
      ssjl_book(list_ssjl, wcfFC_title, wcfFC_content, sheet_ssjl);
      shfc_book(list_shfc, wcfFC_title, wcfFC_content, sheet_shfc);
      book.write();
      book.close();
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return fileName;
  }
  
  public void bl_book(List<QgSearchForm> list, WritableCellFormat title_style, WritableCellFormat content_style, WritableSheet sheet) {
    String[] titles = { 
        "序号", "ID号", "病历编号", "患者姓名", "患者性别", "患者年龄", "电话号码", "手术费用", "交手术费日期", "检查费用", 
        "交检查费日期", "就诊日期", "手术方式1", "手术方式2", "手术方式3" };
    Integer[] widths = { 
        Integer.valueOf(7), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(18), 
        Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(12), Integer.valueOf(12), Integer.valueOf(12) };
    try {
      int i;
      for (i = 0; i < titles.length; i++) {
        Label label = new Label(i, 0, titles[i], (CellFormat)title_style);
        sheet.addCell((WritableCell)label);
      } 
      for (i = 0; i < list.size(); i++) {
        QgSearchForm form = list.get(i);
        String sj = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        Date date = form.getSj();
        if (date != null)
          sj = sdf.format(date); 
        String ssf_rq_str = "";
        Date ssf_rq = form.getSsf_rq();
        if (ssf_rq != null)
          ssf_rq_str = sdf.format(date); 
        String jcf_rq_str = "";
        Date jcf_rq = form.getJcf_rq();
        if (jcf_rq != null)
          jcf_rq_str = sdf.format(date); 
        String[] values = { 
            (form.getXh() == null) ? "" : form.getXh().toString(), 
            (form.getBlh() == null) ? "" : form.getBlh().toString(), 
            (form.getBinglinumber() == null) ? "" : form.getBinglinumber().toString(), 
            (form.getXingming() == null) ? "" : form.getXingming().toString(), 
            (form.getXingbie() == null) ? "" : form.getXingbie().toString(), 
            (form.getAge() == null) ? "" : form.getAge().toString(), 
            (form.getShouji() == null) ? "" : form.getShouji().toString(), 
            (form.getSsfy() == null) ? "" : form.getSsfy().toString(), 
            ssf_rq_str, 
            (form.getQg_jcf() == null) ? "" : form.getQg_jcf().toString(), 
            jcf_rq_str, 
            sj, 
            (form.getSsfs1() == null) ? "" : form.getSsfs1().toString(), 
            (form.getSsfs2() == null) ? "" : form.getSsfs2().toString(), 
            (form.getSsfs3() == null) ? "" : form.getSsfs3().toString() };
        for (int j = 0; j < titles.length; j++) {
          Label label = new Label(j, i + 1, values[j], (CellFormat)content_style);
          sheet.addCell((WritableCell)label);
          sheet.setColumnView(j, widths[j].intValue());
        } 
      } 
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
  
  public void yy_book(List<QgSearchForm> list, WritableCellFormat title_style, WritableCellFormat content_style, WritableSheet sheet) {
    String[] titles = { "序号", "ID号", "病历编号", "患者姓名", "患者性别", "患者年龄", "电话号码", "预约时间", "医生姓名" };
    Integer[] widths = { Integer.valueOf(7), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(18), Integer.valueOf(26), Integer.valueOf(10) };
    try {
      int i;
      for (i = 0; i < titles.length; i++) {
        Label label = new Label(i, 0, titles[i], (CellFormat)title_style);
        sheet.addCell((WritableCell)label);
      } 
      for (i = 0; i < list.size(); i++) {
        QgSearchForm form = list.get(i);
        String sj = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
        Date date = form.getSj();
        if (date != null)
          sj = sdf.format(date); 
        String[] values = { (form.getXh() == null) ? "" : form.getXh().toString(), 
            (form.getBlh() == null) ? "" : form.getBlh().toString(), 
            (form.getBinglinumber() == null) ? "" : form.getBinglinumber().toString(), 
            (form.getXingming() == null) ? "" : form.getXingming().toString(), 
            (form.getXingbie() == null) ? "" : form.getXingbie().toString(), 
            (form.getAge() == null) ? "" : form.getAge().toString(), 
            (form.getShouji() == null) ? "" : form.getShouji().toString(), 
            sj, 
            (form.getYs_xingming() == null) ? "" : form.getXingming().toString() };
        for (int j = 0; j < titles.length; j++) {
          Label label = new Label(j, i + 1, values[j], (CellFormat)content_style);
          sheet.addCell((WritableCell)label);
          sheet.setColumnView(j, widths[j].intValue());
        } 
      } 
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
  
  public void ssjl_book(List<QgSearchForm> list, WritableCellFormat title_style, WritableCellFormat content_style, WritableSheet sheet) {
    String[] titles = { 
        "序号", "ID号", "病历编号", "患者姓名", "患者性别", "患者年龄", "电话号码", "手术费用", "交手术费日期", "眼别", 
        "手术日期", "手术方式1", "手术方式2", "手术方式3", "手术医生", "配台技师", "配台护士" };
    Integer[] widths = { 
        Integer.valueOf(7), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(15), Integer.valueOf(15), Integer.valueOf(15), Integer.valueOf(10), 
        Integer.valueOf(15), Integer.valueOf(12), Integer.valueOf(12), Integer.valueOf(12), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(10) };
    try {
      int i;
      for (i = 0; i < titles.length; i++) {
        Label label = new Label(i, 0, titles[i], (CellFormat)title_style);
        sheet.addCell((WritableCell)label);
      } 
      for (i = 0; i < list.size(); i++) {
        QgSearchForm form = list.get(i);
        if (form != null) {
          String sj = "";
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
          Date date = form.getSj();
          if (date != null)
            sj = sdf.format(date); 
          String ssf_rq_str = "";
          Date ssf_rq = form.getSsf_rq();
          if (ssf_rq != null)
            ssf_rq_str = sdf.format(ssf_rq); 
          String[] values = { 
              (form.getXh() == null) ? "" : form.getXh().toString(), 
              (form.getBlh() == null) ? "" : form.getBlh().toString(), 
              (form.getBinglinumber() == null) ? "" : form.getBinglinumber().toString(), 
              (form.getXingming() == null) ? "" : form.getXingming().toString(), 
              (form.getXingbie() == null) ? "" : form.getXingbie().toString(), 
              (form.getAge() == null) ? "" : form.getAge().toString(), 
              (form.getShouji() == null) ? "" : form.getShouji().toString(), 
              (form.getSsfy() == null) ? "" : form.getSsfy().toString(), 
              ssf_rq_str, 
              (form.getYb() == null) ? "" : form.getYb().toString(), 
              sj, 
              (form.getSsfs1() == null) ? "" : form.getSsfs1().toString(), 
              (form.getSsfs2() == null) ? "" : form.getSsfs2().toString(), 
              (form.getSsfs3() == null) ? "" : form.getSsfs3().toString(), 
              (form.getYs_xingming() == null) ? "" : form.getYs_xingming(), 
              (form.getPtjs_xingming() == null) ? "" : form.getPtjs_xingming(), 
              (form.getPths_xingming() == null) ? "" : form.getPths_xingming() };
          for (int j = 0; j < titles.length; j++) {
            Label label = new Label(j, i + 1, values[j], (CellFormat)content_style);
            sheet.addCell((WritableCell)label);
            sheet.setColumnView(j, widths[j].intValue());
          } 
        } 
      } 
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
  
  public void shfc_book(List<QgSearchForm> list, WritableCellFormat title_style, WritableCellFormat content_style, WritableSheet sheet) {
    String[] titles = { 
        "序号", "ID号", "病历编号", "患者姓名", "患者性别", "患者年龄", "电话号码", "复查日期", "手术方式1", "手术方式2", 
        "手术方式3" };
    Integer[] widths = { 
        Integer.valueOf(7), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(10), Integer.valueOf(18), Integer.valueOf(18), Integer.valueOf(12), Integer.valueOf(12), 
        Integer.valueOf(12) };
    try {
      int i;
      for (i = 0; i < titles.length; i++) {
        Label label = new Label(i, 0, titles[i], (CellFormat)title_style);
        sheet.addCell((WritableCell)label);
        sheet.setColumnView(i, 50);
      } 
      for (i = 0; i < list.size(); i++) {
        QgSearchForm form = list.get(i);
        if (form != null) {
          String sj = "";
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
          Date date = form.getSj();
          if (date != null)
            sj = sdf.format(date); 
          String[] values = { 
              (form.getXh() == null) ? "" : form.getXh().toString(), 
              (form.getBlh() == null) ? "" : form.getBlh().toString(), 
              (form.getBinglinumber() == null) ? "" : form.getBinglinumber().toString(), 
              (form.getXingming() == null) ? "" : form.getXingming().toString(), 
              (form.getXingbie() == null) ? "" : form.getXingbie().toString(), 
              (form.getAge() == null) ? "" : form.getAge().toString(), 
              (form.getShouji() == null) ? "" : form.getShouji().toString(), 
              sj, 
              (form.getSsfs1() == null) ? "" : form.getSsfs1().toString(), 
              (form.getSsfs2() == null) ? "" : form.getSsfs2().toString(), 
              (form.getSsfs3() == null) ? "" : form.getSsfs3().toString() };
          for (int j = 0; j < titles.length; j++) {
            Label label = new Label(j, i + 1, values[j], (CellFormat)content_style);
            sheet.addCell((WritableCell)label);
            sheet.setColumnView(j, widths[j].intValue());
          } 
        } 
      } 
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
  
  @RequestMapping(value = {"/getAllYsAndCount.htm"}, method = {RequestMethod.POST})
  public void getAllYsAndCount(HttpServletResponse response, HttpServletRequest request, QgtjConditionForm form) {
    String realPath = request.getSession().getServletContext()
      .getRealPath("/qg_resource/qg_tjcx_sql.txt");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("医生和数量");
    List<ArrayList> list = null;
    try {
      list = this.emrQuGuangService.getAllYsAndCount(realPath, form);
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
  
  @RequestMapping(value = {"/getAllJcxmAndCount.htm"}, method = {RequestMethod.POST})
  public void getAllJcxmAndCount(HttpServletResponse response, HttpServletRequest request, QgtjConditionForm form) {
    String realPath = request.getSession().getServletContext()
      .getRealPath("/qg_resource/qg_tjcx_sql.txt");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("检查项目和数量");
    List<ArrayList> list = null;
    try {
      list = this.emrQuGuangService.getAllJcxmAndCount(realPath, form);
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
  
  @RequestMapping(value = {"/getAllJcxm.htm"}, method = {RequestMethod.POST})
  public void getAllJcxm(HttpServletResponse response, HttpServletRequest request) {
    String realPath = request.getSession().getServletContext()
      .getRealPath("/qg_resource/qg_tjcx_sql.txt");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("检查项目和数量");
    List<String> list = null;
    try {
      list = this.emrQuGuangService.getAllJcxm(realPath, null);
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
  
  @RequestMapping(value = {"/getAllYs.htm"}, method = {RequestMethod.POST})
  public void getAllYs(HttpServletResponse response, HttpServletRequest request) {
    String realPath = request.getSession().getServletContext()
      .getRealPath("/qg_resource/qg_tjcx_sql.txt");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("医生和数量");
    List<Map<String, String>> list = null;
    try {
      list = this.emrQuGuangService.getAllYs(realPath, null);
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
  
  @RequestMapping(value = {"/qgtj_report.htm"}, method = {RequestMethod.POST})
  public void qgtj_report(HttpServletResponse response, HttpServletRequest request, String data_export) {
    ArrayList exportList = StringToList(data_export);
    String fileName = exportExcel_jctj(request, exportList);
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("导出excel");
    result.setGonghao(gonghao);
    result.setObj("/qg_excel/" + fileName);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public String exportExcel_jctj(HttpServletRequest request, ArrayList<ArrayList> listBoth) {
    String fileName = "";
    if (listBoth != null && listBoth.size() == 2)
      try {
        ArrayList list1 = listBoth.get(0);
        ArrayList list2 = listBoth.get(1);
        File excelFile = getNewFile("xmtj", request);
        fileName = excelFile.getName();
        WritableFont title_style = new WritableFont(
            WritableFont.ARIAL, 10, WritableFont.BOLD, false, 
            UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
        WritableFont content_style = new WritableFont(
            WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, 
            UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
        WritableCellFormat wcfFC_title = new WritableCellFormat(title_style);
        WritableCellFormat wcfFC_content = new WritableCellFormat(content_style);
        wcfFC_title.setAlignment(Alignment.CENTRE);
        wcfFC_content.setAlignment(Alignment.CENTRE);
        WritableWorkbook book = Workbook.createWorkbook(excelFile);
        WritableSheet sheet1 = book.createSheet("按医生统计", 0);
        WritableSheet sheet2 = book.createSheet("按项目统计", 1);
        jctj_book(list1, wcfFC_title, wcfFC_content, sheet1, "ys");
        jctj_book(list2, wcfFC_title, wcfFC_content, sheet2, "jcxm");
        book.write();
        book.close();
      } catch (Exception e) {
        e.printStackTrace();
      }  
    return fileName;
  }
  
  public void jctj_book(ArrayList<String[]> list, WritableCellFormat title_style, WritableCellFormat content_style, WritableSheet sheet, String tag) {
    for (int i = 0; i < list.size(); i++) {
      String[] strs = list.get(i);
      WritableCellFormat _style = null;
      if (i == 0) {
        _style = title_style;
      } else {
        _style = content_style;
      } 
      for (int j = 0; j < strs.length; j++) {
        Label label = new Label(j, i, strs[j], (CellFormat)_style);
        try {
          sheet.addCell((WritableCell)label);
        } catch (WriteException e) {
          e.printStackTrace();
        } 
        if (tag.equals("ys")) {
          sheet.setColumnView(j, 10);
        } else {
          sheet.setColumnView(j, 15);
        } 
      } 
    } 
  }
  
  public ArrayList StringToList(String str) {
    ArrayList<ArrayList<String[]>> aaList = null;
    if (str != null) {
      String[] aa = str.split("`");
      aaList = new ArrayList();
      for (int i = 0; i < aa.length; i++) {
        String[] bb = aa[i].split("@");
        ArrayList<String[]> bbList = new ArrayList();
        for (int j = 0; j < bb.length; j++) {
          String[] cc = bb[j].split(",");
          bbList.add(cc);
        } 
        aaList.add(bbList);
      } 
    } 
    return aaList;
  }
  
  @RequestMapping(value = {"/getAllYsAndCount_ss.htm"}, method = {RequestMethod.POST})
  public void getAllYsAndCount_ss(HttpServletResponse response, HttpServletRequest request, QgtjConditionForm form) {
    String biaoshi = request.getParameter("biaoshi");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("医生和数量");
    List<ArrayList> list = null;
    try {
      list = this.emrQuGuangService.getAllYsAndCount_ss(form, biaoshi);
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
  
  @RequestMapping(value = {"/getAllYs_ss.htm"}, method = {RequestMethod.POST})
  public void getAllYs_ss(HttpServletResponse response, HttpServletRequest request) {
    String biaoshi = request.getParameter("biaoshi");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setGonghao(gonghao);
    result.setDoing("医生和数量");
    List<Map<String, String>> list = null;
    try {
      list = this.emrQuGuangService.getAllSsYs(null, biaoshi);
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
  
  @RequestMapping(value = {"/qgtjssl_report.htm"}, method = {RequestMethod.POST})
  public void qgtjssl_report(HttpServletResponse response, HttpServletRequest request, QgtjConditionForm form) {
    String biaoshi = request.getParameter("biaoshi");
    List<ArrayList> list = this.emrQuGuangService.getAllYsAndCount_ss(form, biaoshi);
    String fileName = exportExcel_jctjss(request, list);
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("导出excel");
    result.setGonghao(gonghao);
    result.setObj("/qg_excel/" + fileName);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  public String exportExcel_jctjss(HttpServletRequest request, List<ArrayList> list) {
    String fileName = "";
    try {
      File excelFile = getNewFile("xmtjss", request);
      fileName = excelFile.getName();
      WritableFont title_style = new WritableFont(
          WritableFont.ARIAL, 10, WritableFont.BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableFont content_style = new WritableFont(
          WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, 
          UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
      WritableCellFormat wcfFC_title = new WritableCellFormat(title_style);
      WritableCellFormat wcfFC_content = new WritableCellFormat(content_style);
      wcfFC_title.setAlignment(Alignment.CENTRE);
      wcfFC_content.setAlignment(Alignment.CENTRE);
      WritableWorkbook book = Workbook.createWorkbook(excelFile);
      WritableSheet sheet = book.createSheet("手术量统计", 0);
      jctj_book_ss(list, wcfFC_title, wcfFC_content, sheet);
      book.write();
      book.close();
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return fileName;
  }
  
  public void jctj_book_ss(List<ArrayList> list, WritableCellFormat title_style, WritableCellFormat content_style, WritableSheet sheet) {
    try {
      for (int i = 0; i < list.size(); i++) {
        ArrayList ysAndSl = list.get(i);
        if (i == 0) {
          Label label2 = new Label(0, i, "医生", (CellFormat)title_style);
          sheet.addCell((WritableCell)label2);
          sheet.setColumnView(0, 20);
          Label label3 = new Label(1, i, "数量", (CellFormat)title_style);
          sheet.addCell((WritableCell)label3);
          sheet.setColumnView(1, 20);
        } 
        Label label0 = new Label(0, i + 1, (ysAndSl.get(0) == null) ? "" : ysAndSl.get(0).toString(), (CellFormat)content_style);
        sheet.addCell((WritableCell)label0);
        Label label1 = new Label(1, i + 1, (ysAndSl.get(1) == null) ? "" : ysAndSl.get(1).toString(), (CellFormat)content_style);
        sheet.addCell((WritableCell)label1);
      } 
    } catch (WriteException e) {
      e.printStackTrace();
    } 
  }
}
