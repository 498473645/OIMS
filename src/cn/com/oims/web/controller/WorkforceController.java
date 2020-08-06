package cn.com.oims.web.controller;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.PaibanBGS;
import cn.com.oims.dao.pojo.WorkforceChild;
import cn.com.oims.dao.pojo.WorkforceManager;
import cn.com.oims.service.IBanGongShiService;
import cn.com.oims.service.IWorkforceService;
import cn.com.oims.web.form.WorkforceForm;
import cn.com.oims.web.form.WorkforceManagerForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.ArrayList;
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
@RequestMapping({"workforce"})
public class WorkforceController {
  @Autowired
  private IWorkforceService workforceService;
  
  @Autowired
  private IBanGongShiService banGongShiService;
  
  @RequestMapping(value = {"findWorkforceByPage.htm"}, method = {RequestMethod.POST})
  public void findWorkforceByPage(HttpServletRequest request, HttpServletResponse response, Page page, WorkforceManagerForm wmf) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取排班列表！");
    try {
      result.setGonghao(gonghao);
      Map<String, Object> forceMap = this.workforceService.findWorkForceManagerByPage(page, wmf);
      result.setObj(forceMap);
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result.getObj(), response);
  }
  
  @RequestMapping(value = {"findPaibanBGSListQiyong.htm"}, method = {RequestMethod.POST})
  public void findPaibanBGSListQiyong(HttpServletRequest request, HttpServletResponse response, int leibie) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取启用的排班办公室信息！");
    try {
      List<PaibanBGS> list = this.workforceService.findPaibanBGSList();
      List<BanGongShi> bglist = new ArrayList<>();
      if (list != null) {
        PaibanBGS pb = null;
        for (PaibanBGS p : list) {
          if (p.getLeibie() == leibie && p.getIsqiyong() == 1)
            pb = p; 
        } 
        if (pb != null) {
          String[] str = pb.getBgsids().split(",");
          byte b;
          int i;
          String[] arrayOfString1;
          for (i = (arrayOfString1 = str).length, b = 0; b < i; ) {
            String s = arrayOfString1[b];
            BanGongShi bgs = this.banGongShiService.getBanGongShiById(Integer.valueOf(Integer.parseInt(s)));
            if (bgs != null)
              bglist.add(bgs); 
            b++;
          } 
          if (bglist != null && bglist.size() > 0)
            result.setObj(bglist); 
          result.setState(1);
        } else {
          result.setState(0);
        } 
      } else {
        result.setState(0);
      } 
      result.setGonghao(gonghao);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveWorkforceObject.htm"}, method = {RequestMethod.POST})
  public void saveWorkforceObject(HttpServletRequest request, HttpServletResponse response, int leibie, int istemp, String startTime, String endTime) {
    int isqiyong = 0;
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("新增排班记录");
    result.setGonghao(gonghao);
    try {
      WorkforceManager wm = new WorkforceManager();
      wm.setGonghao(gonghao);
      wm.setIsqiyong(isqiyong);
      wm.setIstemp(istemp);
      wm.setLeibie(leibie);
      wm.setStartTime(Utils.strToDateDay(startTime));
      if (endTime != null && !endTime.trim().equals(""))
        wm.setEndTime(Utils.strToDateDay(endTime)); 
      Long wmid = Long.valueOf(0L);
      wmid = this.workforceService.saveWorkforceManager(wm);
      if (wmid.longValue() != 0L) {
        result.setObj(wmid);
        result.setState(1);
      } 
    } catch (Exception e) {
      result.setState(0);
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"saveWorkforceChild.htm"}, method = {RequestMethod.POST})
  public void saveWorkforceChild(HttpServletRequest request, HttpServletResponse response, WorkforceForm wfm) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("新增排班记录人员加入");
    result.setGonghao(gonghao);
    try {
      if (wfm != null && !wfm.getGonghaos().trim().equals("")) {
        WorkforceChild wfc = new WorkforceChild();
        wfc.setWorkid(wfm.getWmid());
        wfc.setIsend(0);
        wfc.setEndTime(Utils.strToDateDay(wfm.getEndTime()));
        wfc.setZsid(String.valueOf(wfm.getBgsid()));
        wfc.setWeekday(wfm.getLie());
        wfc.setYggroup(wfm.getGonghaos());
        wfc.setYggroupxm(wfm.getNames());
        wfc.setChenum(wfm.getChenum());
        this.workforceService.saveWorkforceChild(wfc);
      } 
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findWorkforceChildByWid.htm"}, method = {RequestMethod.POST})
  public void findWorkforceChildByWid(HttpServletRequest request, HttpServletResponse response, String wid) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("通过排班id 查询排班详细信息内容！");
    try {
      result.setGonghao(gonghao);
      List<WorkforceChild> list = this.workforceService.findWorkForceChildByworkid(wid);
      if (list != null && list.size() > 0)
        result.setObj(list); 
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"updateWorkforceObject.htm"}, method = {RequestMethod.POST})
  public void updateWorkforceObject(HttpServletRequest request, HttpServletResponse response, WorkforceManagerForm wfm) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("修改排班记录");
    result.setGonghao(gonghao);
    try {
      WorkforceManager wm = this.workforceService.findWorkforceManager(Long.valueOf(Long.parseLong(wfm.getId())));
      if (wfm.getBiaoshi() == 0) {
        wm.setIsqiyong(wfm.getIsqiyong());
      } else {
        wm.setLeibie(wfm.getLeibie());
        wm.setIstemp(wfm.getIstemp());
        wm.setStartTime(Utils.strToDateDay(wfm.getStartTime()));
        wm.setIstemp(wfm.getIstemp());
        wm.setEndTime(Utils.strToDateDay(wfm.getEndTime()));
      } 
      this.workforceService.updateWorkforceManager(wm);
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"updateWorkforceChild.htm"}, method = {RequestMethod.POST})
  public void updateWorkforceChild(HttpServletRequest request, HttpServletResponse response, WorkforceForm wfm) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("修改排班记录人员");
    result.setGonghao(gonghao);
    try {
      WorkforceChild wfc = null;
      if (wfm.getId() != null && !wfm.getId().trim().equals("")) {
        wfc = this.workforceService.findWorkforceChild(Long.valueOf(Long.parseLong(wfm.getId())));
      } else {
        wfc = new WorkforceChild();
        wfc.setIsend(0);
      } 
      if (wfm != null && !wfm.getGonghaos().trim().equals("")) {
        wfc.setWorkid(wfm.getWmid());
        wfc.setEndTime(Utils.strToDateDay(wfm.getEndTime()));
        wfc.setZsid(String.valueOf(wfm.getBgsid()));
        wfc.setWeekday(wfm.getLie());
        wfc.setYggroup(wfm.getGonghaos());
        wfc.setYggroupxm(wfm.getNames());
        wfc.setChenum(wfm.getChenum());
        if (wfm.getId() != null && !wfm.getId().trim().equals("")) {
          this.workforceService.updateWorkforceChild(wfc);
        } else {
          this.workforceService.saveWorkforceChild(wfc);
        } 
      } else if (wfc != null && wfc.getId() != null) {
        this.workforceService.delWorkforceManager(wfc.getId());
      } 
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteWorkforce.htm"}, method = {RequestMethod.POST})
  public void deleteWorkforce(HttpServletRequest request, HttpServletResponse response, String id) {
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("删除排版记录");
    result.setGonghao(gonghao);
    try {
      WorkforceManager wfm = this.workforceService.findWorkforceManager(Long.valueOf(Long.parseLong(id)));
      if (wfm != null) {
        if (wfm.getIsqiyong() == 1) {
          result.setMessage("启用中，无法删除！");
          result.setState(0);
        } else {
          List<WorkforceChild> list = this.workforceService.findWorkForceChildByworkid(wfm.getId().toString());
          if (list != null && list.size() > 0)
            this.workforceService.delChildList(list); 
          this.workforceService.delWorkforceManager(wfm.getId());
          result.setState(1);
          result.setMessage("删除成功！");
        } 
      } else {
        result.setState(0);
        result.setMessage("删除失败！");
      } 
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("删除失败！");
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
