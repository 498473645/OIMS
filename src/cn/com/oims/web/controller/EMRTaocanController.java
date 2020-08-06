package cn.com.oims.web.controller;

import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.EMRJcxmFushu;
import cn.com.oims.dao.pojo.EMRTaocan;
import cn.com.oims.dao.pojo.EMRTaocanXM;
import cn.com.oims.dao.pojo.EMRTaocanXMMX;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IEMRTaocanService;
import cn.com.oims.service.IJcxmService;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"taocan"})
public class EMRTaocanController {
  @Autowired
  private IYuanGongDao ygDao;
  
  @Autowired
  private IEMRTaocanService taocanService;
  
  @Autowired
  private IJcxmService jcxmService;
  
  @RequestMapping(value = {"saveEMRTaocan.htm"}, method = {RequestMethod.POST})
  public void saveEMRTaocan(String tcmc, boolean belong, String beizhu, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存套餐");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      YuanGong yg = this.ygDao.getYuanGongByGH(gonghao);
      String[] ids = request.getParameterValues("taocanId");
      String[] jcxmIds = request.getParameterValues("jcxmId");
      String[] categoryIds = request.getParameterValues("categoryId");
      String[] count = request.getParameterValues("count");
      String[] excutiveDept = request.getParameterValues("zhixingkeshiSelected");
      String[] yanbiebiaoben = request.getParameterValues("yanbiebiaoben");
      EMRTaocan emrTaocan = new EMRTaocan();
      emrTaocan.setGonghao(gonghao);
      emrTaocan.setBmId(yg.getBumenId());
      emrTaocan.setCjsj(new Date());
      emrTaocan.setTcmc(tcmc);
      emrTaocan.setBeizhu(beizhu);
      emrTaocan.setGongxiang(belong);
      String[] orderDetail = request.getParameterValues("orderDetail");
      List<EMRTaocanXM> list = new ArrayList<>();
      int i;
      for (i = 0; i < jcxmIds.length; i++) {
        EMRTaocanXM xm = new EMRTaocanXM();
        int xmId = Integer.parseInt(jcxmIds[i]);
        int category = Integer.parseInt(categoryIds[i]);
        Float q = Float.valueOf(Float.parseFloat(count[i]));
        int e = Integer.parseInt(excutiveDept[i]);
        xm.setShuliang(q);
        xm.setXmId(Integer.valueOf(xmId));
        xm.setXmType(Integer.valueOf(category));
        xm.setExcutiveDept(Integer.valueOf(e));
        if (!yanbiebiaoben[i].isEmpty())
          try {
            int yb = Integer.parseInt(yanbiebiaoben[i]);
            xm.setYanbiebiaoben(Integer.valueOf(yb));
          } catch (Exception exception) {} 
        List<EMRTaocanXMMX> l = new ArrayList<>();
        if (orderDetail != null) {
          if (!orderDetail[i].isEmpty()) {
            String[] txt = orderDetail[i].split(",");
            byte b;
            int j;
            String[] arrayOfString1;
            for (j = (arrayOfString1 = txt).length, b = 0; b < j; ) {
              String s = arrayOfString1[b];
              EMRTaocanXMMX xmmx = new EMRTaocanXMMX();
              String[] s0 = s.split("=");
              xmmx.setFsxmId(Integer.valueOf(Integer.parseInt(s0[0])));
              xmmx.setShuliang(Float.valueOf(Float.parseFloat(s0[1])));
              l.add(xmmx);
              b++;
            } 
          } 
        } else {
          List<EMRJcxmFushu> l0 = this.jcxmService.findJcxmOptions(Integer.valueOf(xmId));
          Iterator<EMRJcxmFushu> itr = l0.iterator();
          while (itr.hasNext()) {
            EMRJcxmFushu fs = itr.next();
            EMRTaocanXMMX xmmx = new EMRTaocanXMMX();
            xmmx.setFsxmId(fs.getId());
            xmmx.setShuliang(fs.getDefaultNum());
            l.add(xmmx);
          } 
        } 
        xm.setTcxmmx(l);
        list.add(xm);
      } 
      emrTaocan.setTaocanXM(list);
      for (i = 0; i < ids.length; i++) {
        String _id = ids[i];
        if (!_id.isEmpty()) {
          Integer id = Integer.valueOf(Integer.parseInt(ids[i]));
          emrTaocan.setId(id);
        } 
        EMRTaocan taocan = (EMRTaocan)BeanUtils.cloneBean(emrTaocan);
        this.taocanService.saveEMRTaocan(taocan);
      } 
      result.setState(1);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"deleteEMRTaocan.htm"}, method = {RequestMethod.GET})
  public void deleteEMRTaocan(Integer id, Integer tcxmId, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("删除套餐");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      if (tcxmId == null) {
        this.taocanService.deleteEMRTaocan(id);
      } else {
        this.taocanService.deleteEMRTaocanXM(tcxmId);
      } 
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"findEMRTaocan.htm"}, method = {RequestMethod.POST})
  public void findEMRTaocan(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("获取套餐");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      List<EMRTaocan> list = this.taocanService.findEMRTaocan(gonghao);
      result.setObj(list);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"editEMRTaocan.htm"}, method = {RequestMethod.POST})
  public void editEMRTaocan(Integer id, String name, boolean belong, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("修改套餐名称");
    try {
      String gonghao = request.getSession().getAttribute("gonghao").toString();
      result.setGonghao(gonghao);
      EMRTaocan taocan = new EMRTaocan();
      taocan.setId(id);
      taocan.setTcmc(name);
      taocan.setGongxiang(belong);
      this.taocanService.updateTaocan(taocan);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"updateEMRTaocan.htm"}, method = {RequestMethod.POST})
  public void updateEMRTaocan(HttpServletRequest request, HttpServletResponse response) {
    MyResult mr = new MyResult();
    try {
      String temp = request.getParameter("ary");
      JSONArray ja = JSONArray.fromObject(temp);
      this.taocanService.updateEMRTaocan(ja);
      mr.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"findEMRTaocanPageList.htm"}, method = {RequestMethod.POST})
  public void findEMRTaocanPageList(Page page, String search, Boolean share, HttpServletRequest request, HttpServletResponse response) {
    Map<String, Object> map = this.taocanService.findEMRTaocanPageList(page, search, share);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"getEMRTaocan.htm"}, method = {RequestMethod.POST})
  public void getEMRTaocan(Integer id, HttpServletResponse response) {
    MyResult mr = new MyResult();
    try {
      EMRTaocan taocan = this.taocanService.getEMRTaocan(id);
      mr.setState(1);
      mr.setObj(taocan);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
}
