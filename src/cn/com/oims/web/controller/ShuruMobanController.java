package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.InquiryComboTreeNode;
import cn.com.oims.dao.pojo.InspectionItemCombo;
import cn.com.oims.dao.pojo.RecordSets;
import cn.com.oims.dao.pojo.RecordSetsDetail;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IShuruMobanService;
import cn.com.oims.utils.InputPinYinToDatabase;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"shurumoban"})
public class ShuruMobanController {
  private static final int level_log_select = 1;
  
  private static final int level_log_save = 2;
  
  private static final int level_log_update = 2;
  
  private static final int level_log_delete = 2;
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  private String chinese = "";
  
  @Autowired
  private IShuruMobanService shuruMobanService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @RequestMapping(value = {"/saveShuruMoban.htm"}, method = {RequestMethod.POST})
  public void saveShuruMoban(HttpServletResponse response, HttpServletRequest request, ShuruMoban shurumoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    shurumoban.setGonghao(gonghao);
    shurumoban.setAddTime(new Date());
    MyResult result = new MyResult();
    this.doing = "输入模版新增操作";
    try {
      this.shuruMobanService.saveShuruMoban(shurumoban);
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
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAllShuruMobansByPage.htm"}, method = {RequestMethod.POST})
  public void findAllShuruMobansByPage(HttpServletResponse response, HttpServletRequest request, Page page, ShuruMoban shurumoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    this.doing = "分页查询输入模版信息";
    try {
      map = this.shuruMobanService.findAllShuruMobansByPage(page, 
          shurumoban);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(map);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/updateShuruMoban.htm"}, method = {RequestMethod.POST})
  public void updateShuruMoban(HttpServletResponse response, HttpServletRequest request, ShuruMoban shurumoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    shurumoban.setGonghao(gonghao);
    shurumoban.setAddTime(new Date());
    MyResult result = new MyResult();
    this.doing = "修改输入模版实体对象操作";
    try {
      this.shuruMobanService.updateShuruMoban(shurumoban);
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
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteShuruMobanById.htm"}, method = {RequestMethod.POST})
  public void deleteShuruMobanById(HttpServletResponse response, HttpServletRequest request, ShuruMoban shurumoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据主键ID，删除输入模版实体对象";
    try {
      this.shuruMobanService.deleteShuruMobanById(shurumoban.getId());
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
    this.oimsLogService.saveOimsLog(result, 3);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findShuruMobansByShuruMoban.htm"}, method = {RequestMethod.GET})
  public void findShuruMobansByShuruMoban(HttpServletResponse response, HttpServletRequest request, ShuruMoban shurumoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List shurumobans = new ArrayList();
    this.doing = "根据输入模板对象查询符合条件的输入模板";
    try {
      shurumobans = this.shuruMobanService
        .findShuruMobansByShuruMoban(shurumoban);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(shurumobans);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/selectShuruMobansByShuruMoban.htm"}, method = {RequestMethod.POST})
  public void selectShuruMobansByShuruMoban(HttpServletResponse response, HttpServletRequest request, ShuruMoban shurumoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<ShuruMoban> shurumobans = new ArrayList<>();
    this.doing = "根据输入模板对象查询符合条件的输入模板";
    try {
      shurumobans = this.shuruMobanService
        .selectShuruMobansByShuruMoban(shurumoban);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(shurumobans);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveTemplet.htm"}, method = {RequestMethod.POST})
  public void saveWenZhenMoban(HttpServletResponse response, HttpServletRequest request, ShuruMoban shurumoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    shurumoban.setGonghao(gonghao);
    shurumoban.setAddTime(new Date());
    MyResult result = new MyResult();
    this.doing = "输入模版新增操作";
    try {
      this.shuruMobanService.saveShuruMobanEMR(shurumoban);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    result.setObj(shurumoban);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findTempletForPage.htm"}, method = {RequestMethod.POST})
  public void findWenZhenTemplatesForPage(HttpServletRequest request, HttpServletResponse response, Page page, String categoryId, String suoyin) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.shuruMobanService.findInputTemplateForPage(page, categoryId, gonghao, suoyin);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/updateTemplet.htm"}, method = {RequestMethod.POST})
  public void updateWenZhenTemplates(HttpServletRequest request, HttpServletResponse response, ShuruMoban shurumoban) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    shurumoban.setGonghao(gonghao);
    shurumoban.setAddTime(new Date());
    MyResult result = new MyResult();
    String doing = "修改输入模版实体对象操作";
    int doState = 0;
    String message = "";
    try {
      this.shuruMobanService.updateInputTemplates(shurumoban);
      doState = 1;
      message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      doState = 0;
      message = "操作失败";
    } 
    result.setDoing(doing);
    result.setState(doState);
    result.setMessage(message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteTempletById.htm"}, method = {RequestMethod.POST})
  public void deleteWenZhenMobanById(HttpServletResponse response, HttpServletRequest request, String id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      this.shuruMobanService.deleteShuruMoban(id);
      result.setState(1);
      result.setMessage("删除成功");
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("删除失败");
    } 
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 2);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveCompositeTemplate.htm"}, method = {RequestMethod.POST})
  public void saveCompositeTemplate(HttpServletResponse response, HttpServletRequest request) {
    String recordsets = request.getParameter("recordsets");
    String recordsetsdetail = request.getParameter("recordsetsdetail");
    JSONObject json_recordsets = JSONObject.fromObject(recordsets);
    JSONArray json_recordsetsdetail = JSONArray.fromObject(recordsetsdetail);
    RecordSets rs = (RecordSets)JSONObject.toBean(json_recordsets, RecordSets.class);
    List<RecordSetsDetail> list = new ArrayList<>();
    for (int i = 0; i < json_recordsetsdetail.size(); i++) {
      JSONObject jo = json_recordsetsdetail.getJSONObject(i);
      RecordSetsDetail rsd = (RecordSetsDetail)JSONObject.toBean(jo, RecordSetsDetail.class);
      list.add(rsd);
    } 
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    rs.setOperator(gonghao);
    MyResult result = new MyResult();
    try {
      this.shuruMobanService.saveCompositeTemplate(rs, list);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findCompositeTemplateByPage.htm"}, method = {RequestMethod.POST})
  public void findCompositeTemplateByPage(HttpServletRequest request, HttpServletResponse response, Page page, String search) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.shuruMobanService.findCompositeTemplateByPage(page, gonghao, search);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setObj(map);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findAllTemplateByCompositeId.htm"}, method = {RequestMethod.POST})
  public void findAllTemplateByCompositeId(HttpServletRequest request, HttpServletResponse response, String id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<RecordSetsDetail> list = new ArrayList<>();
    try {
      list = this.shuruMobanService.findAllTemplateByCompositeId(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    result.setObj(list);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateAllTemplateByCompositeId.htm"}, method = {RequestMethod.POST})
  public void updateAllTemplateByCompositeId(HttpServletRequest request, HttpServletResponse response) {
    String recordsets = request.getParameter("recordsets");
    String recordsetsdetail = request.getParameter("recordsetsdetail");
    JSONObject json_recordsets = JSONObject.fromObject(recordsets);
    JSONArray json_recordsetsdetail = JSONArray.fromObject(recordsetsdetail);
    RecordSets rs = (RecordSets)JSONObject.toBean(json_recordsets, RecordSets.class);
    List<RecordSetsDetail> list = new ArrayList<>();
    for (int i = 0; i < json_recordsetsdetail.size(); i++) {
      JSONObject jo = json_recordsetsdetail.getJSONObject(i);
      RecordSetsDetail rsd = (RecordSetsDetail)JSONObject.toBean(jo, RecordSetsDetail.class);
      list.add(rsd);
    } 
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    rs.setOperator(gonghao);
    try {
      this.shuruMobanService.updateCompositeTemplate(rs, list);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/deleteCompositeTemplate.htm"}, method = {RequestMethod.POST})
  public void deleteCompositeTemplate(HttpServletRequest request, HttpServletResponse response, String id) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    try {
      this.shuruMobanService.deleteCompositeTemplate(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findInspectionItemComboByPage.htm"}, method = {RequestMethod.POST})
  public void findInspectionItemComboByPage(HttpServletRequest request, HttpServletResponse response, String search, Page page) {
    String gonghao = (request.getSession().getAttribute("gonghao") != null) ? request.getSession().getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.shuruMobanService.findInspectionItemComboByPage(page, gonghao, search);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/addInspectionItemCombo.htm"}, method = {RequestMethod.POST})
  public void addInspectionItemCombo(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String param = request.getParameter("param");
    JSONObject jo = JSONObject.fromObject(param);
    InspectionItemCombo iic = (InspectionItemCombo)JSONObject.toBean(jo, InspectionItemCombo.class);
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    iic.setOperator(gonghao);
    try {
      this.shuruMobanService.addInspectionItemCombo(iic);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/updateInspectionItemCombo.htm"}, method = {RequestMethod.POST})
  public void updateInspectionItemCombo(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    String param = request.getParameter("param");
    JSONObject jo = JSONObject.fromObject(param);
    InspectionItemCombo iic = (InspectionItemCombo)JSONObject.toBean(jo, InspectionItemCombo.class);
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    iic.setOperator(gonghao);
    try {
      this.shuruMobanService.updateInspectionItemCombo(iic);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/delInspectionItemComboById.htm"}, method = {RequestMethod.POST})
  public void delInspectionItemComboById(HttpServletResponse response, HttpServletRequest request, String id) {
    MyResult result = new MyResult();
    try {
      this.shuruMobanService.delInspectionItemComboById(id);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping({"/findComboTreeChildrenByPid.htm"})
  public void findComboTreeChildrenByPid(HttpServletResponse response, HttpServletRequest request) {
    MyResult mr = new MyResult();
    String id = request.getParameter("id");
    String categoryId = request.getParameter("categoryId");
    String msg = "";
    try {
      msg = this.shuruMobanService.findComboTreeChildrenByPid(id, categoryId);
      mr.setObj(msg);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONObject jo = new JSONObject();
    jo.put("msg", msg);
    JSONWriterUtils.writeJSONObj(jo, response);
  }
  
  @RequestMapping(value = {"/templetSortSaveOrUpdate.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateTempletSort(HttpServletResponse response, HttpServletRequest request) {
    String id = request.getParameter("id");
    String pid = request.getParameter("pid");
    String name = request.getParameter("name");
    String categoryId = request.getParameter("categoryId");
    InquiryComboTreeNode combo = new InquiryComboTreeNode();
    try {
      combo.setId(Integer.valueOf(id));
    } catch (NumberFormatException e) {
      combo.setId(null);
    } 
    combo.setPid(Integer.valueOf("".equals(pid) ? 0 : Integer.valueOf(pid).intValue()));
    combo.setText(name);
    combo.setCategoryId(Integer.valueOf(categoryId));
    JSONObject result = this.shuruMobanService.saveOrUpdateTempletSort(combo);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/combotreeDelNode.htm"}, method = {RequestMethod.POST})
  public void combotreeDelNode(HttpServletResponse response, HttpServletRequest request) {
    MyResult mr = new MyResult();
    Integer i = this.shuruMobanService.combotreeDelNode(request.getParameter("id"));
    if (i.intValue() > 0) {
      mr.setState(0);
      mr.setMessage("该类别包含子类别或模板，不能删除");
    } else {
      mr.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/combotreeModifyNode.htm"}, method = {RequestMethod.POST})
  public void combotreeModifyNode(HttpServletResponse response, HttpServletRequest request) {
    MyResult mr = new MyResult();
    this.shuruMobanService.combotreeModifyNode(request.getParameter("id"), request.getParameter("text"));
  }
  
  @RequestMapping({"/findNodeAndMoBanByPid.htm"})
  public void findNodeAndMoBanByPid(HttpServletResponse response, HttpServletRequest request) {
    MyResult mr = new MyResult();
    String msg = this.shuruMobanService.findNodeAndMoBanByPid(request.getParameter("id"), request.getParameter("categoryId"));
    JSONObject jo = new JSONObject();
    jo.put("msg", msg);
    JSONWriterUtils.writeJSONObj(jo, response);
  }
  
  @RequestMapping(value = {"/forPhsicalMoBanInput.htm"}, method = {RequestMethod.POST})
  public void forPhsicalMoBanInput(HttpServletResponse response, HttpServletRequest request) {
    List<ShuruMoban> sms = this.shuruMobanService.findAllShuruMobans();
    List<ShuruMoban> list = new ArrayList<>();
    for (ShuruMoban sm : sms) {
      if (sm.getCategoryId().intValue() >= 30200 && sm.getCategoryId().intValue() <= 30210) {
        InputPinYinToDatabase ipytd = new InputPinYinToDatabase(sm);
        Map map = ipytd.inputAndPinyinToDatabase();
        sm.setShuru(map.get("input").toString());
        sm.setPinyin(map.get("pinyin").toString());
        this.shuruMobanService.updateShuruMoban(sm);
      } 
    } 
  }
}
