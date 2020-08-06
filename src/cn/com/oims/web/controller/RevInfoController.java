package cn.com.oims.web.controller;

import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.ReserveInfo;
import cn.com.oims.dao.pojo.RevProj;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IReserveInfoService;
import cn.com.oims.service.IRevProjService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.utils.DateUtils;
import cn.com.oims.web.form.RevInfoForm;
import cn.com.oims.web.form.RevInfoSumitForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"revinfo"})
public class RevInfoController extends BaseController {
  @Autowired
  private IReserveInfoService iRevInfoService;
  
  @Autowired
  private IRevProjService iRevProjService;
  
  @Autowired
  private IJcdService iJcdService;
  
  @Autowired
  private IJcxmService iJcxmService;
  
  @Autowired
  private IYuanGongService iYuanGongService;
  
  @RequestMapping(value = {"/findRevInfoByUser.htm"}, method = {RequestMethod.POST})
  public void findRevInfoByUser(HttpServletRequest request, HttpServletResponse response, Page page, RevInfoForm form) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = null;
    try {
      String factor = request.getParameter("factor");
      page.setFactor(factor);
      form.setUid(getCurrentUser(request).getGonghao());
      list = this.iRevInfoService.findRevInfoByForm(page, form);
      map.put("list", list);
      map.put("page", page);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/mrgRevInfo.htm"}, method = {RequestMethod.POST})
  public void mrgRevInfo(HttpServletRequest request, HttpServletResponse response, RevInfoSumitForm form) {
    MyResult rs = new MyResult();
    try {
      Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmId(form.getHuanzheId(), form.getJiuzhenId(), form.getJcxmId());
      if (jcd == null) {
        jcd = new Jcd();
        jcd.setJcdh("");
        jcd.setJcsbId(Integer.valueOf(0));
        jcd.setHuanzheId(form.getHuanzheId());
        jcd.setJiuzhenId(form.getJiuzhenId());
        jcd.setJcxmIds(String.valueOf(form.getJcxmId()));
        jcd.setBiaoshi(Integer.valueOf(50));
        Jcxm jcxm = this.iJcxmService.getJcxmById(form.getJcxmId());
        jcd.setBiaoti(jcxm.getXmmc());
        jcd.setKdys(getCurrentUser(request).getGonghao());
        YuanGong yg = this.iYuanGongService.obtainYuanGongByGonghao(getCurrentUser(request).getGonghao());
        if (yg != null)
          jcd.setKdksId(yg.getBumenId()); 
        jcd.setKdTime(new Date());
        jcd.setYanbie(Integer.valueOf(Integer.parseInt(form.getEyeType())));
        jcd.setState(Integer.valueOf(1));
        Long jcdid = (Long)this.iJcdService.saveJcd(jcd);
        jcd.setId(jcdid);
      } else {
        jcd.setState(Integer.valueOf(1));
        this.iJcdService.updateJcd(jcd);
      } 
      ReserveInfo ri = null;
      if (form.getRevInfoId() != null)
        ri = this.iRevInfoService.getReserveInfoById(form.getRevInfoId()); 
      if (ri == null) {
        ri = new ReserveInfo();
        ri.setJcdIds(String.valueOf(jcd.getId()));
        ri.setOpertm(new Date());
        ri.setHuanzheId(form.getHuanzheId());
        ri.setJiuzhenId(form.getJiuzhenId());
        ri.setJcxmIds(String.valueOf(form.getJcxmId()));
        Jcxm jcxm = this.iJcxmService.getJcxmById(form.getJcxmId());
        ri.setJcxmmc(jcxm.getXmmc());
        RevProj revProj = this.iRevProjService.getRevProjById(form.getRevProjId());
        if (revProj != null) {
          ri.setJcbmid(revProj.getBumenId());
          ri.setUserId(revProj.getUserId());
        } 
        ri.setYanbie(form.getEyeType());
        ri.setReservedt((new SimpleDateFormat("yyy-MM-dd HH:mm:ss")).parse(String.valueOf(form.getRevdt()) + " " + form.getTimeFlag()));
        ri.setXmnum(Integer.valueOf(1));
        ri.setRevprojId(form.getRevProjId());
        ri.setRevstate(Integer.valueOf(0));
        this.iRevInfoService.saveReserveInfo(ri);
      } 
      rs.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      rs.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(rs, response);
  }
  
  @RequestMapping(value = {"/updRevInfo.htm"}, method = {RequestMethod.POST})
  public void updRevInfo(HttpServletRequest request, HttpServletResponse response, RevInfoSumitForm form) {
    MyResult rs = new MyResult();
    try {
      ReserveInfo ri = null;
      if (form.getRevInfoId() != null)
        ri = this.iRevInfoService.getReserveInfoById(form.getRevInfoId()); 
      if (ri != null) {
        ri.setOpertm(new Date());
        ri.setJcxmIds(String.valueOf(form.getJcxmId()));
        Jcxm jcxm = this.iJcxmService.getJcxmById(form.getJcxmId());
        ri.setJcxmmc(jcxm.getXmmc());
        RevProj revProj = this.iRevProjService.getRevProjById(form.getRevProjId());
        if (revProj != null) {
          ri.setJcbmid(revProj.getBumenId());
          ri.setUserId(revProj.getUserId());
        } 
        ri.setYanbie(form.getEyeType());
        ri.setReservedt((new SimpleDateFormat("yyy-MM-dd HH:mm:ss")).parse(String.valueOf(form.getRevdt()) + " " + form.getTimeFlag()));
        ri.setXmnum(Integer.valueOf(1));
        ri.setRevprojId(form.getRevProjId());
        ri.setRevstate(Integer.valueOf(0));
        this.iRevInfoService.updateReserveInfo(ri);
      } 
      rs.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      rs.setState(0);
    } 
    JSONWriterUtils.writeJSONObj(rs, response);
  }
  
  @RequestMapping(value = {"/delRevInfo.htm"}, method = {RequestMethod.POST})
  public void delRevInfo(HttpServletRequest request, HttpServletResponse response, Long[] ids) {
    MyResult rs = new MyResult();
    if (ids != null && ids.length > 0)
      try {
        ReserveInfo info = null;
        byte b;
        int i;
        Long[] arrayOfLong;
        for (i = (arrayOfLong = ids).length, b = 0; b < i; ) {
          Long id = arrayOfLong[b];
          info = this.iRevInfoService.getReserveInfoById(id);
          Jcd j = this.iJcdService.getJcdById(Long.valueOf(Long.parseLong(info.getJcdIds())));
          j.setState(Integer.valueOf(0));
          this.iJcdService.updateJcd(j);
          this.iRevInfoService.delReserveInfoById(id);
          b++;
        } 
        rs.setState(1);
      } catch (Exception e) {
        e.printStackTrace();
        rs.setState(0);
      }  
    JSONWriterUtils.writeJSONObj(rs, response);
  }
  
  @RequestMapping(value = {"/getDateShow.htm"}, method = {RequestMethod.POST})
  public void getDateShow(HttpServletRequest request, HttpServletResponse response, Date dt, Integer flag) {
    MyResult result = new MyResult();
    List<Map<String, Object>> dtshow = new ArrayList<>();
    Calendar cal = Calendar.getInstance();
    cal.setTime(dt);
    if (flag.intValue() < 0) {
      cal.add(5, -5);
    } else if (flag.intValue() > 0) {
      cal.add(5, 1);
    } 
    Map<String, Object> tmp = null;
    for (int i = 0; i < 5; i++) {
      tmp = new HashMap<>();
      tmp.put("dt", DateUtils.formatDate(cal.getTime(), null));
      dtshow.add(tmp);
      cal.add(5, 1);
    } 
    result.setObj(dtshow);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getWeiYueManYyDateByXmid.htm"}, method = {RequestMethod.POST})
  public void getWeiYueManYyDateByXmid(Long revProjId, HttpServletRequest request, HttpServletResponse response) {
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    MyResult result = new MyResult();
    result.setDoing("获取近期内的未预约满预约日期");
    try {
      String yuyuedate = this.iRevInfoService.getWeiYueManYyDateByXmid(gonghao, revProjId);
      result.setState(1);
      result.setObj(yuyuedate);
      result.setMessage("预约日期：" + yuyuedate);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage(e.getMessage());
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
}
