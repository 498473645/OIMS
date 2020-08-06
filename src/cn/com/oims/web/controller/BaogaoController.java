package cn.com.oims.web.controller;

import cn.com.oims.common.CommonFunction;
import cn.com.oims.common.Utils;
import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.Baogao;
import cn.com.oims.dao.pojo.BaogaoPic;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IBaoGaoRelationService;
import cn.com.oims.service.IBaogaoPicService;
import cn.com.oims.service.IBaogaoService;
import cn.com.oims.service.IBuMenService;
import cn.com.oims.service.ICategoryService;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IYuanGongService;
import cn.com.oims.web.form.BaogaoForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"baogao"})
public class BaogaoController {
  private static final int state = 50023;
  
  private int doState = 1;
  
  private String doing = "";
  
  private String message = "";
  
  @Autowired
  private IBaogaoService baogaoService;
  
  @Autowired
  private IHuanZheXinXiService huanzhexinxiService;
  
  @Autowired
  private IJcdService jcdService;
  
  @Autowired
  private ICategoryService categoryService;
  
  @Autowired
  private IBuMenService bumenService;
  
  @Autowired
  private IBaogaoPicService baogaopicService;
  
  @Autowired
  private IYuanGongService yuanGongService;
  
  @Autowired
  private IOimsLogService oimsLogService;
  
  @Autowired
  private IBaoGaoRelationService baoGaoRelationService;
  
  @RequestMapping(value = {"/invalidBaogao.htm"}, method = {RequestMethod.POST})
  public void invalidBaogao(HttpServletResponse response, HttpServletRequest request, Baogao baogao) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "作废检查单报告";
    try {
      this.baogaoService.updateBaogaoByBaogao(baogao);
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
  
  @RequestMapping(value = {"/extractBaogao.htm"}, method = {RequestMethod.POST})
  public void extractBaogao(HttpServletResponse response, HttpServletRequest request, Baogao baogao) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "提取检查单报告";
    try {
      this.baogaoService.updateBaogaoByBaogao(baogao);
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
    this.oimsLogService.saveOimsLog(result, 4);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateBaogaoByBaogao.htm"}, method = {RequestMethod.POST})
  public void updateBaogaoByBaogao(HttpServletResponse response, HttpServletRequest request, Baogao baogao, BaogaoPic baogaopic) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    baogao.setBgTime(new Date());
    String pic_urls = request.getParameter("pic_urls");
    String[] pic_url = pic_urls.split(",");
    this.doing = "报告修改";
    try {
      this.baogaoService.updateBaogaoByBaogao(baogao);
      this.baogaopicService.deleteBaogaoPicByBaogaoPic(baogaopic);
      for (int i = 0; pic_url != null && i < pic_url.length && 
        !pic_url[i].equals(""); i++) {
        baogaopic = new BaogaoPic();
        baogaopic.setReportId(baogao.getId());
        baogaopic.setPicUrl(pic_url[i]);
        baogaopic.setInfo("第" + i + "张图片");
        baogaopic.setXuhao(Integer.valueOf(i));
        this.baogaopicService.saveBaogaoPic(baogaopic);
      } 
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
  
  @RequestMapping(value = {"/saveBaogao.htm"}, method = {RequestMethod.POST})
  public void saveBaogao(HttpServletResponse response, HttpServletRequest request, Baogao baogao) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    String[] pic_url = null;
    BaogaoPic baogaopic = null;
    baogao.setBgTime(new Date());
    String pic_urls = request.getParameter("pic_urls");
    if (pic_urls != null)
      pic_url = pic_urls.split(","); 
    this.doing = "已完成检查单出报告";
    try {
      baogao.setState(Integer.valueOf(50023));
      Serializable reportId = this.baogaoService.saveBaogao(baogao);
      for (int i = 0; pic_url != null && i < pic_url.length && 
        !pic_url[i].equals(""); i++) {
        baogaopic = new BaogaoPic();
        baogaopic.setReportId((Long)reportId);
        baogaopic.setPicUrl(pic_url[i]);
        baogaopic.setInfo("第" + i + "张图片");
        baogaopic.setXuhao(Integer.valueOf(i));
        this.baogaopicService.saveBaogaoPic(baogaopic);
      } 
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
  
  @RequestMapping(value = {"/findBaogaoByBaogao.htm"}, method = {RequestMethod.POST})
  public void findBaogaoByBaogao(HttpServletResponse response, HttpServletRequest request, Baogao baogao) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "根据报告对象查询报告";
    try {
      baogao = this.baogaoService.findBaogaoByBaogao(baogao);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      e.printStackTrace();
      this.doState = 0;
      this.message = "操作失败";
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(baogao);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findBaogaosByBaogao.htm"}, method = {RequestMethod.POST})
  public void findBaogaosByBaogao(HttpServletResponse response, HttpServletRequest request, Baogao baogao) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    List<Baogao> baogaos = new ArrayList<>();
    this.doing = "根据报告对象查询符合条件的报告对象集合";
    try {
      baogaos = this.baogaoService.findBaogaosByBaogao(baogao);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(baogaos);
    result.setMessage(this.message);
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/outBaogaoHelp.htm"}, method = {RequestMethod.POST})
  public void outBaogaoHelp(HttpServletResponse response, HttpServletRequest request, Jcd jcd, HuanZheXinXi huanzhexinxi, Category category_eyeSex, BuMen bumen) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    BaogaoForm baogaoForm = new BaogaoForm();
    this.doing = "出报告的辅助方法";
    try {
      huanzhexinxi = this.huanzhexinxiService.findHuanZheById(jcd
          .getHuanzheId());
      jcd = this.jcdService.getJcdById(jcd.getId());
      category_eyeSex = this.categoryService.getCategoryById(jcd
          .getYanbie());
      if (jcd.getJcksId() != null) {
        bumen = this.bumenService.getBuMenById(jcd.getJcksId());
      } else {
        bumen = null;
      } 
      YuanGong yuangong_kaidan = new YuanGong();
      yuangong_kaidan.setGonghao(jcd.getKdys());
      List<YuanGong> yuangongs_kaidan = this.yuanGongService
        .findYuanGongsByYuanGong(yuangong_kaidan);
      if (yuangongs_kaidan.size() >= 1)
        yuangong_kaidan = yuangongs_kaidan.get(0); 
      YuanGong yuangong_jiancha = new YuanGong();
      if (jcd.getJcys() == null || jcd.getJcys().length() <= 0) {
        yuangong_jiancha.setGonghao(gonghao);
      } else {
        yuangong_jiancha.setGonghao(jcd.getJcys());
      } 
      List<YuanGong> yuangongs_jiancha = this.yuanGongService
        .findYuanGongsByYuanGong(yuangong_jiancha);
      if (yuangongs_jiancha.size() >= 1)
        yuangong_jiancha = yuangongs_jiancha.get(0); 
      baogaoForm = setBaogaoForm(jcd, huanzhexinxi, bumen, 
          category_eyeSex, yuangong_kaidan, yuangong_jiancha);
      this.doState = 1;
      this.message = "操作成功";
    } catch (Exception e) {
      baogaoForm = new BaogaoForm();
      this.doState = 0;
      this.message = "操作失败";
      e.printStackTrace();
    } 
    result.setGonghao(gonghao);
    result.setDoing(this.doing);
    result.setState(this.doState);
    result.setObj(baogaoForm);
    result.setMessage(this.message);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  private BaogaoForm setBaogaoForm(Jcd jcd, HuanZheXinXi huanzhexinxi, BuMen bumen, Category category_eyeSex, YuanGong yuangong_kaidan, YuanGong yuangong_jiancha) {
    BaogaoForm baogaoForm = new BaogaoForm();
    baogaoForm.setSuffererName(huanzhexinxi.getXingming());
    baogaoForm.setSex(huanzhexinxi.isXingbie() ? "男" : "女");
    baogaoForm.setAge(CommonFunction.getNianlingByCsrq(huanzhexinxi
          .getShengri().toString()).toString());
    baogaoForm.setCaseNumber(huanzhexinxi.getBinglihao());
    baogaoForm.setDepartment((bumen == null) ? "" : bumen.getBmmc());
    baogaoForm.setEyeSex(category_eyeSex.getCategory());
    baogaoForm.setReportDate(Utils.dateToStrShort(new Date()));
    baogaoForm.setShengQingYiSheng(yuangong_kaidan.getXingming());
    baogaoForm.setJianChaYiSheng(yuangong_jiancha.getXingming());
    baogaoForm.setJianChaYiShengGongHao(yuangong_jiancha.getGonghao());
    baogaoForm.setShengQingYiShengGongHao(yuangong_kaidan.getGonghao());
    return baogaoForm;
  }
  
  @RequestMapping(value = {"/deleteBaogaoByBaogao.htm"}, method = {RequestMethod.POST})
  public void deleteBaogaoByBaogao(HttpServletResponse response, HttpServletRequest request, BaoGaoRelation baogaoRelation) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "删除检查单报告信息 ";
    try {
      List<BaoGaoRelation> list = this.baoGaoRelationService.getBaoGaoRelationsByBaoGaoRelation(baogaoRelation);
      if (list.size() > 0 && list != null) {
        BaoGaoRelation baogaoRelationSelect = list.get(0);
        String className = baogaoRelationSelect.getClassName();
        Long jcdId = baogaoRelation.getJcdId();
        this.baogaoService.deleteBaogaoByBaogao(className, jcdId);
        this.baoGaoRelationService.deleteBaogaoRelationByJcdId(jcdId);
      } 
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
  
  @RequestMapping(value = {"/getBaoGaoRelationTimeTag.htm"}, method = {RequestMethod.POST})
  public void getBaoGaoRelationTimeTag(HttpServletResponse response, HttpServletRequest request, String binglihao, String jcxmId) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    this.doing = "获取时间标签 ";
    try {
      List<BaoGaoRelation> lists = this.baoGaoRelationService.getBaoGaoRelationTimeTag(binglihao, jcxmId);
      this.doState = 1;
      this.message = "操作成功";
      result.setObj(lists);
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
}
