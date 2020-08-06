package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.service.ICategoryService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IMedicalRecordService;
import cn.com.oims.web.form.MCForm;
import cn.com.oims.web.form.PaintForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"doctor"})
public class DoctorController {
  private ICategoryService categoryService;
  
  private IJiuzhenService IJiuzhenService;
  
  @Autowired
  public void setCategoryService(ICategoryService categoryService) {
    this.categoryService = categoryService;
  }
  
  @Autowired
  public void setMrService(IMedicalRecordService mrService) {}
  
  @Autowired
  public void setIJiuzhenService(IJiuzhenService iJiuzhenService) {
    this.IJiuzhenService = iJiuzhenService;
  }
  
  @RequestMapping(value = {"/workListForDoctor.htm"}, method = {RequestMethod.GET})
  public void workListForDoctor(HttpServletRequest request, HttpServletResponse response) {}
  
  @RequestMapping(value = {"/saveOrUpdateMC.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateMC(MCForm mc, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存或更新就诊记录");
    HttpSession session = request.getSession();
    Object oo1 = session.getAttribute("gonghao");
    String jlr = (oo1 != null) ? oo1.toString() : null;
    try {
      Long id = this.IJiuzhenService.saveOrUpdateMC(mc, jlr);
      boolean re = false;
      if (mc.getPath() != null && mc.getPath().length() > 0) {
        String[] paths = mc.getPath().split(",");
        for (int i = 0; i < paths.length; i++) {
          String path = paths[i];
          int n = path.lastIndexOf("/");
          String filename = path.substring(n + 1);
          String realPath = request.getSession().getServletContext().getRealPath(path);
          File file = new File(realPath);
          String newpath = path.replaceAll("/temp_", "/" + id + "_");
          String newrealpath = request.getSession().getServletContext().getRealPath(newpath);
          if (filename.indexOf("temp_") == 0 && file.renameTo(new File(newrealpath))) {
            paths[i] = newpath;
            re = true;
          } 
        } 
        if (re) {
          mc.setPath(toString(paths));
          mc.setId(id);
          this.IJiuzhenService.saveOrUpdateMC(mc, jlr);
        } 
      } 
      result.setObj(mc);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage("sava or update error！");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private String toString(String[] str) {
    StringBuffer s = new StringBuffer();
    for (int i = 0; i < str.length; i++) {
      if (i > 0)
        s.append(","); 
      s.append(str[i]);
    } 
    return s.toString();
  }
  
  @RequestMapping(value = {"/saveOrUpdateMC_New.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateMC_New(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存或更新就诊记录");
    HttpSession session = request.getSession();
    Object oo1 = session.getAttribute("gonghao");
    String jlr = (oo1 != null) ? oo1.toString() : null;
    String jl_id = request.getParameter("jl_id");
    String jz_id = request.getParameter("jz_id");
    String category_id = request.getParameter("category_id");
    String jl_info = request.getParameter("jl_info");
    String pic_path = request.getParameter("pic_path");
    try {
      Long jl_id_result = this.IJiuzhenService.saveOrUpdateMC_New(jl_id, jz_id, category_id, jl_info, pic_path, jlr);
      result.setObj(jl_id_result);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage("sava or update error！");
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getMedicalRecordCategory.htm"}, method = {RequestMethod.GET})
  public void getMedicalRecordCategory(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取病历记录分类列表");
    Integer id = Integer.valueOf(30000);
    String idStr = request.getParameter("id");
    List<Map<String, Object>> list = new ArrayList<>();
    try {
      if (idStr != null && !"".equals(idStr))
        id = Integer.valueOf(Integer.parseInt(idStr)); 
      list = this.IJiuzhenService.findOimsCategories(id);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage("OIMSERR_10002");
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getCategoryById.htm"}, method = {RequestMethod.GET})
  public void getCategoryById(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String idStr = request.getParameter("id");
    int id = 0;
    if (idStr != null && !"".equals(idStr))
      id = Integer.parseInt(idStr); 
    Map<String, Object> map = new HashMap<>();
    map = this.IJiuzhenService.getCategoryById(Integer.valueOf(id));
    result.setDoing("获取单个分类信息——根据分类id");
    result.setObj(map);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/patientListToday.htm"}, method = {RequestMethod.POST})
  public void getPatientListToday(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取今日待诊患者列表");
    String gh = (request.getSession().getAttribute("gonghao") != null) ? request.getSession().getAttribute("gonghao").toString() : null;
    String search = (request.getParameter("searchText") != null) ? request.getParameter("searchText").toString() : "";
    String path = request.getSession().getServletContext().getRealPath("/");
    Integer state = null;
    String s = request.getParameter("state");
    List list = this.IJiuzhenService.getPatientListToday(s, gh, search, path);
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getPatientStateCount.htm"}, method = {RequestMethod.POST})
  public void getPatientStateCount(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    MyResult result = new MyResult();
    result.setDoing("获取今日患者状态统计");
    String gh = "";
    Object gh_o = request.getSession().getAttribute("gonghao");
    if (gh_o != null)
      gh = gh_o.toString(); 
    Integer state = null;
    String s = request.getParameter("state");
    if (s != null)
      state = Integer.valueOf(Integer.parseInt(s)); 
    list = this.IJiuzhenService.getPatientStateCount(state, gh);
    result.setObj(Integer.valueOf(list.size()));
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/patientListTodayByPage.htm"}, method = {RequestMethod.POST})
  public void patientListTodayByPage(HttpServletRequest request, HttpServletResponse response, Page page) {
    MyResult result = new MyResult();
    result.setDoing("分页获取今日待诊患者列表");
    String gh = (request.getSession().getAttribute("gonghao") != null) ? request.getSession().getAttribute("gonghao").toString() : null;
    Integer state = null;
    String s = request.getParameter("state");
    String search = request.getParameter("searchText");
    String path = request.getSession().getServletContext().getRealPath("/");
    List<Map<String, Object>> list = this.IJiuzhenService.getPatientListTodayByPage(s, gh, page, search, path);
    Map<String, Object> map = new HashMap<>();
    map.put("list", list.subList(1, list.size()));
    map.put("page", ((Map)list.get(0)).get("page"));
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/getMedicalRecords.htm"}, method = {RequestMethod.GET})
  public void getMedicalRecords(HttpServletRequest request, HttpServletResponse response) {
    String id = request.getParameter("id");
    MyResult result = new MyResult();
    result.setDoing("显示患者历次就诊记录列表");
    List list = this.IJiuzhenService.getMedicalRecords(id);
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getMC.htm"}, method = {RequestMethod.GET})
  public void getMC(HttpServletRequest request, HttpServletResponse response) {
    String jzid = request.getParameter("id");
    String cid = request.getParameter("categoryId");
    List<Jzjl> list = new ArrayList<>();
    list = this.IJiuzhenService.getMC(jzid, cid);
    MyResult result = new MyResult();
    result.setDoing("获取记录信息");
    result.setObj((list.size() > 0) ? list.get(0) : list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShiLiUrl.htm"}, method = {RequestMethod.GET})
  public void getShiLiUrl(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取视力记录");
    String jzid = request.getParameter("id");
    List list = this.IJiuzhenService.getShiLiUrl(jzid);
    if (list.size() != 0) {
      result.setObj(list.get(0));
      result.setState(1);
    } else {
      result.setObj("");
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYanGuangUrl.htm"}, method = {RequestMethod.GET})
  public void getYanGuangUrl(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取验光记录");
    String jzid = request.getParameter("id");
    List list = this.IJiuzhenService.getYanGuangUrl(jzid);
    if (list.size() != 0) {
      result.setObj(list.get(0));
      result.setState(1);
    } else {
      result.setObj("");
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/studyList.htm"}, method = {RequestMethod.GET})
  public void getStudyList(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取检查单列表");
    String jzid = request.getParameter("id");
    List list = this.IJiuzhenService.getStudyList(jzid);
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getStudy.htm"}, method = {RequestMethod.GET})
  public void getStudy(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取检查单信息");
    String jcdid = request.getParameter("id");
    String path = request.getSession().getServletContext().getRealPath("/");
    List<Map<String, Object>> list = this.IJiuzhenService.getStudy(jcdid, path);
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYanYaUrl.htm"}, method = {RequestMethod.GET})
  public void getYanYaUrl(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取眼压信息");
    String jzid = request.getParameter("id");
    List list = this.IJiuzhenService.getYanYaUrl(jzid);
    if (list.size() != 0) {
      result.setObj(list);
      result.setState(1);
    } else {
      result.setObj("");
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getOnePatient.htm"}, method = {RequestMethod.GET})
  public void getOnePatient(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取一位就诊患者信息");
    String jzid = request.getParameter("id");
    List list = this.IJiuzhenService.getOnePatient(jzid);
    if (list.size() > 0) {
      result.setObj(list.get(0));
      result.setState(1);
    } else {
      result.setObj("");
      result.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getShuruMoBan.htm"}, method = {RequestMethod.GET})
  public void getShuruMoBan(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取输入模板");
    String cid = request.getParameter("categoryId");
    List<Map<String, Object>> list = new ArrayList<>();
    list = this.IJiuzhenService.getShuruMoBan(cid);
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJiBingFenLei.htm"}, method = {RequestMethod.GET})
  public void getJiBingFenLei(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取疾病分类");
    String cid = request.getParameter("categoryId");
  }
  
  @RequestMapping(value = {"/getChangGuiListUrl.htm"}, method = {RequestMethod.GET})
  public void getChangGuiList(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    MyResult result = new MyResult();
    String cid = request.getParameter("id");
    list = this.IJiuzhenService.getChangGuiList(cid);
    result.setDoing("获取常规检查列表");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getTeShuListUrl.htm"}, method = {RequestMethod.GET})
  public void getTeShuList(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    String cid = request.getParameter("id");
    List<Map<String, Object>> list = this.IJiuzhenService.getTeShuList(cid);
    result.setDoing("获取特殊检查列表");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getTeShuListAllUrl.htm"}, method = {RequestMethod.GET})
  public void getTeShuListAll(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    MyResult result = new MyResult();
    String cid = request.getParameter("id");
    list = this.IJiuzhenService.getTeShuListAll(cid);
    result.setDoing("获取特殊检查列表(全部)");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJiuZhenStateUrl.htm"}, method = {RequestMethod.GET})
  public void getJiuZhenState(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取就诊状态列表");
    String state = request.getParameter("state");
    List list = this.IJiuzhenService.getJiuZhenState(state);
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getZhenDuanListUrl.htm"}, method = {RequestMethod.GET})
  public void getZhenDuanList(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取一次就诊的诊断信息");
    String jzid = request.getParameter("jzid");
    List<Map<String, Object>> list = new ArrayList<>();
    list = this.IJiuzhenService.getZhenDuanList(jzid);
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveJcdInfoUrl.htm"}, method = {RequestMethod.POST})
  public void saveJcdInfo(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    Object oo = session.getAttribute("gonghao");
    String kdys = (oo != null) ? oo.toString() : null;
    MyResult result = new MyResult();
    result.setDoing("保存检查单信息");
    String jzid = request.getParameter("jzid");
    String hzid = request.getParameter("hzid");
    String jcxmids = request.getParameter("jcxmids");
    String yb = request.getParameter("yb");
    String jcyq = request.getParameter("jcyq");
    boolean bl = this.IJiuzhenService.saveJcdInfo(jzid, hzid, jcxmids, kdys, yb, jcyq);
    result.setObj(Boolean.valueOf(bl));
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSessionGongHaoUrl.htm"}, method = {RequestMethod.GET})
  public void getSessionGongHao(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    Object oo = session.getAttribute("gonghao");
    String dqys = (oo != null) ? oo.toString() : null;
    MyResult result = new MyResult();
    result.setDoing("获取当前登录员工工号");
    result.setObj(dqys);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateJiuZhenStateUrl.htm"}, method = {RequestMethod.GET})
  public void updateJiuZhenState(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    Object oo = session.getAttribute("gonghao");
    String czys = (oo != null) ? oo.toString() : null;
    String jzid = request.getParameter("jzid");
    String newstate = request.getParameter("newstate");
    boolean bl = this.IJiuzhenService.updateJiuZhenState(jzid, czys, newstate);
    MyResult result = new MyResult();
    result.setDoing("过号（更改就诊状态）");
    result.setObj(Boolean.valueOf(bl));
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJiBingListUrl.htm"}, method = {RequestMethod.GET})
  public void getJiBingList(HttpServletRequest request, HttpServletResponse response) {
    String jblb = request.getParameter("jblb");
    List<Map<String, Object>> list = this.IJiuzhenService.getJiBingList(jblb);
    MyResult result = new MyResult();
    result.setDoing("获取疾病分类信息");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delZhenDuanUrl.htm"}, method = {RequestMethod.GET})
  public void delZhenDuan(HttpServletRequest request, HttpServletResponse response) {
    String zdflid = request.getParameter("zdflid");
    String jzid = request.getParameter("jzid");
    boolean bl = this.IJiuzhenService.delZhenDuan(zdflid, jzid);
    MyResult result = new MyResult();
    result.setDoing("获取疾病分类信息");
    result.setObj(Boolean.valueOf(bl));
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/matchJiBingNameUrl.htm"}, method = {RequestMethod.POST})
  public void matchJiBingName(HttpServletRequest request, HttpServletResponse response) {
    String name = request.getParameter("name");
    List<Map<String, Object>> list = new ArrayList<>();
    list = this.IJiuzhenService.matchJiBingName(name);
    MyResult result = new MyResult();
    result.setDoing("匹配疾病名称");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveZhenDuanUrl.htm"}, method = {RequestMethod.GET})
  public void saveZhenDuan(HttpServletRequest request, HttpServletResponse response) {
    String jbfl = request.getParameter("jbfl");
    String jzid = request.getParameter("jzid");
    String confirm = request.getParameter("confirm");
    HttpSession session = request.getSession();
    Object oo = session.getAttribute("gonghao");
    String czys = (oo != null) ? oo.toString() : null;
    boolean bl = this.IJiuzhenService.saveZhenDuan(jbfl, jzid, confirm, czys);
    MyResult result = new MyResult();
    result.setDoing("保存就诊诊断信息");
    result.setObj(Boolean.valueOf(bl));
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYanBieCategoryUrl.htm"}, method = {RequestMethod.GET})
  public void getYanBieCategory(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    String fid = request.getParameter("fid");
    list = this.IJiuzhenService.getYanBieCategory(fid);
    MyResult result = new MyResult();
    result.setDoing("获取眼别分类");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJiuZhenImageUrl.htm"}, method = {RequestMethod.GET})
  public void getJiuZhenImage(HttpServletRequest request, HttpServletResponse response) {
    String jlid = request.getParameter("jlid");
    List<Map<String, Object>> list = new ArrayList<>();
    list = this.IJiuzhenService.getJiuZhenImage(jlid);
    MyResult result = new MyResult();
    result.setDoing("获取就诊记录图片");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getZhenDuanInfoUrl.htm"}, method = {RequestMethod.GET})
  public void getZhenDuanInfo(HttpServletRequest request, HttpServletResponse response) {
    String jzid = request.getParameter("jzid");
    List<Map<String, Object>> list = this.IJiuzhenService.getZhenDuanInfo(jzid);
    MyResult result = new MyResult();
    result.setDoing("获取该次就诊是否有诊断信息");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJiBingIntrListUrl.htm"}, method = {RequestMethod.GET})
  public void getJiBingIntrList(HttpServletRequest request, HttpServletResponse response) {
    String jblb = request.getParameter("jblb");
    List list = this.IJiuzhenService.getJiBingIntrList(jblb);
    MyResult result = new MyResult();
    result.setDoing("获取疾病信息索引");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJcxmIntrUrl.htm"}, method = {RequestMethod.POST})
  public void getJcxmIntrUrl(HttpServletRequest request, HttpServletResponse response) {
    String jcxmid = request.getParameter("jcxmid");
    String pic_url = this.IJiuzhenService.getJcxmIntrUrl(jcxmid);
    MyResult result = new MyResult();
    result.setDoing("获取检查项目眼睛图片");
    result.setObj(pic_url);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getDuiBiItemsInfoUrl.htm"}, method = {RequestMethod.POST})
  public void getDuiBiItemsInfoUrl(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取需要对比的历次就诊的就诊项目数据");
    String jzids = request.getParameter("jzids");
    try {
      List<Map<String, Object>> list = new ArrayList<>();
      list = this.IJiuzhenService.getDuiBiItemsInfoUrl(jzids);
      result.setObj(list);
      result.setState(1);
      JSONWriterUtils.writeJSONObj(result, response);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("程序异常：getDuiBiItemsInfoUrl.htm->" + jzids);
      JSONWriterUtils.writeJSONObj(result, response);
    } 
  }
  
  @RequestMapping(value = {"/getCategoryInfoUrl.htm"}, method = {RequestMethod.POST})
  public void getCategoryInfoUrl(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    String db_items = request.getParameter("ids");
    list = this.IJiuzhenService.getCategoryInfoUrl(db_items);
    MyResult result = new MyResult();
    result.setDoing("通过分类id获取分类名称");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getHuaYanDanListUrl.htm"}, method = {RequestMethod.POST})
  public void getHuaYanDanListUrl(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    String jzid = request.getParameter("jzid");
    list = this.IJiuzhenService.getHuaYanDanListUrl(jzid);
    MyResult result = new MyResult();
    result.setDoing("获取化验单列表");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getHuaYanDanDetailInfoUrl.htm"}, method = {RequestMethod.POST})
  public void getHuaYanDanDetailInfoUrl(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    String hyid = request.getParameter("hyid");
    list = this.IJiuzhenService.getHuaYanDanDetailInfoUrl(hyid);
    MyResult result = new MyResult();
    result.setDoing("获取化验单详细信息");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getSearchYaoPinNameUrl.htm"}, method = {RequestMethod.POST})
  public void getSearchYaoPinNameUrl(HttpServletRequest request, HttpServletResponse response) {
    List<String> list = new ArrayList<>();
    String text = request.getParameter("text");
    list = this.IJiuzhenService.getSearchYaoPinNameUrl(text);
    MyResult result = new MyResult();
    result.setDoing("获取药品名称列表");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYaoPinInfoByNameUrl.htm"}, method = {RequestMethod.POST})
  public void getYaoPinInfoByNameUrl(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    String text = request.getParameter("text");
    list = this.IJiuzhenService.getYaoPinInfoByNameUrl(text);
    MyResult result = new MyResult();
    result.setDoing("获取药品信息BY药品名称");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveChuFangInfoUrl.htm"}, method = {RequestMethod.POST})
  public void saveChuFangInfoUrl(HttpServletRequest request, HttpServletResponse response) {
    String cfid = "";
    String jzid = request.getParameter("jzid");
    String ypid = request.getParameter("ypid");
    String num = request.getParameter("num");
    String cus_dir = request.getParameter("cus_dir");
    cfid = this.IJiuzhenService.saveChuFangInfoUrl(jzid, ypid, num, cus_dir);
    MyResult result = new MyResult();
    result.setDoing("保存处方药品信息");
    result.setObj(cfid);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/delChuFangInfoUrl.htm"}, method = {RequestMethod.POST})
  public void delChuFangInfoUrl(HttpServletRequest request, HttpServletResponse response) {
    String bl = "";
    String cf_id = request.getParameter("cf_id");
    bl = this.IJiuzhenService.delChuFangInfoUrl(cf_id);
    MyResult result = new MyResult();
    result.setDoing("删除处方药品信息");
    result.setObj(bl);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getJiuZhenChuFangInfoUrl.htm"}, method = {RequestMethod.POST})
  public void getJiuZhenChuFangInfoUrl(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    String jzid = request.getParameter("jzid");
    list = this.IJiuzhenService.getJiuZhenChuFangInfoUrl(jzid);
    MyResult result = new MyResult();
    result.setDoing("获取本次就诊的处方信息");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getPrintBingLiDataUrl"}, method = {RequestMethod.POST})
  public void getPrintBingLiDataUrl(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    String mbid = request.getParameter("mobanid");
    list = this.IJiuzhenService.getPrintBingLiDataUrl(mbid);
    MyResult result = new MyResult();
    result.setDoing("获取打印电子病历模版数据");
    result.setObj(list);
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getBingLiInfoUrl"}, method = {RequestMethod.POST})
  public void getBingLiInfoUrl(HttpServletRequest request, HttpServletResponse response) {
    List<Map<String, Object>> list = new ArrayList<>();
    String jzid = request.getParameter("jzid");
    String hzid = request.getParameter("hzid");
    HttpSession session = request.getSession();
    Object oo_cf = session.getAttribute("chufang");
    Object oo_zd = session.getAttribute("zhenduan");
    String chufang = (oo_cf != null) ? oo_cf.toString() : "";
    String zhenduan = (oo_zd != null) ? oo_zd.toString() : "";
    list = this.IJiuzhenService.getBingLiInfoUrl(jzid, hzid);
    MyResult result = new MyResult();
    result.setDoing("获取电子病历记录信息");
    if (list.size() > 0) {
      if (!"".equals(chufang))
        list.get(0).put("chufang", chufang);
      if (!"".equals(zhenduan))
        list.get(0).put("zhenduan", zhenduan);
      result.setObj(list.get(0));
    } 
    result.setState(1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/paintSave.htm"}, method = {RequestMethod.POST})
  public void paintSave(PaintForm pf, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存画图");
    System.out.println("***pf.getCategoryId():" + pf.getCategoryId());
    System.out.println("***pf.getEyes():" + pf.getEyes());
    System.out.println("***pf.getPhotoType():" + pf.getPhotoType());
    System.out.println("***pf.getId():" + pf.getId());
    System.out.println("***pf.getPatientId():" + pf.getPatientId());
    System.out.println("***pf.getRegId():" + pf.getRegId());
    System.out.println("***pf.getPath():" + pf.getPath());
    String[] path = getPhotoPath(pf, request);
    System.out.println("***path[0]相对路径:" + path[0].toString());
    System.out.println("***path[1]绝对路径:" + path[1].toString());
    if (fileSave(request, path[1])) {
      result.setObj(path[0]);
      result.setState(1);
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private String[] getPhotoPath(PaintForm pf, HttpServletRequest request) {
    String[] x = new String[2];
    String datetime = MultiUtils.getTimeRodem();
    System.out.println("***datetime:" + datetime);
    String vPath = "/UploadFile";
    String realPath = request.getSession().getServletContext().getRealPath(vPath);
    String filePath = String.valueOf(realPath) + File.separator + pf.getPatientId() + 
      File.separator + pf.getRegId() + File.separator;
    String path = String.valueOf(vPath) + "/" + pf.getPatientId() + "/" + pf.getRegId() + "/";
    String dirpath = filePath;
    String idstr = "temp";
    if (pf.getId() != null && pf.getId().longValue() != 0L)
      idstr = pf.getId().toString(); 
    if (pf.getPhotoType() == 3) {
      filePath = String.valueOf(filePath) + "reports";
      filePath = String.valueOf(filePath) + File.separator + idstr + "_" + datetime + 
        ".jpg";
      path = String.valueOf(path) + "reports/" + idstr + "_" + datetime + ".jpg";
    } else if (pf.getPhotoType() == 2) {
      filePath = String.valueOf(filePath) + idstr + File.separator + pf.getEyes() + "_" + datetime + ".jpg";
      path = String.valueOf(path) + idstr + "/" + pf.getEyes() + "_" + datetime + ".jpg";
      dirpath = String.valueOf(dirpath) + idstr + File.separator;
    } else if (pf.getPhotoType() == 1) {
      filePath = String.valueOf(filePath) + "m_r_photos" + File.separator + idstr + "_" + 
        pf.getEyes() + "_" + datetime + ".jpg";
      path = String.valueOf(path) + "m_r_photos/" + idstr + "_" + pf.getEyes() + "_" + 
        datetime + ".jpg";
    } 
    x[0] = path;
    x[1] = filePath;
    return x;
  }
  
  private boolean fileSave(HttpServletRequest request, String filePath) {
    ServletInputStream servletInputStream = null;
    boolean x = false;
    InputStream in = null;
    FileOutputStream out = null;
    try {
      File f = new File(filePath.substring(0, filePath.lastIndexOf(File.separator)));
      if (!f.exists() || !f.isDirectory())
        f.mkdirs(); 
      servletInputStream = request.getInputStream();
      if (servletInputStream != null) {
        out = new FileOutputStream(new File(filePath));
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = servletInputStream.read(buffer)) > 0)
          out.write(buffer, 0, bytesRead); 
        out.flush();
      } 
      x = true;
    } catch (Exception ex) {
      ex.printStackTrace();
    } finally {
      if (servletInputStream != null)
        try {
          servletInputStream.close();
        } catch (IOException iOException) {} 
      if (out != null)
        try {
          out.close();
        } catch (IOException iOException) {} 
    } 
    return x;
  }
}
