package cn.com.oims.web.controller;

import cn.com.oims.common.ChildExpImpUtils;
import cn.com.oims.dao.pojo.AChao;
import cn.com.oims.dao.pojo.Fzyy;
import cn.com.oims.dao.pojo.Fzyyjl;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Pcao;
import cn.com.oims.dao.pojo.XiaoErChuZhen;
import cn.com.oims.dao.pojo.YanGuang;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.service.IChildCheckService;
import cn.com.oims.service.IHuanZheXinXiService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.service.IJcxmService;
import cn.com.oims.service.IJiuzhenService;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.service.IYanYaService;
import cn.com.oims.web.form.AChaoForm;
import cn.com.oims.web.form.ChildCheckPcaoForm;
import cn.com.oims.web.form.ChildSearchForm;
import cn.com.oims.web.form.ChildTiGeForm;
import cn.com.oims.web.form.ChileCheckYanYaForm;
import cn.com.oims.web.form.ChuZhenForm;
import cn.com.oims.web.form.FuZhenForm;
import cn.com.oims.web.form.FzyyForm;
import cn.com.oims.web.form.FzyySearchForm;
import cn.com.oims.web.form.FzyyjlForm;
import cn.com.oims.web.form.FzyyjlSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import cn.com.oims.web.form.QuGuangForm;
import com.codesnet.common.JSONWriterUtils;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping({"child"})
public class ChildCheckController {
  @Resource
  private IOimsLogService oimsLogService;
  
  @Resource
  private IChildCheckService iChildCheckService;
  
  @Resource
  private IHuanZheXinXiService iHuanZheXinXiService;
  
  @Resource
  private IJiuzhenService iJiuzhenService;
  
  @Resource
  private IJcxmService iJcxmService;
  
  @Resource
  private IJcdService iJcdService;
  
  @Resource
  private IYanYaService iYanYaService;
  
  @RequestMapping(value = {"/getChildList.htm"}, method = {RequestMethod.POST})
  public void showChildList(HttpServletRequest request, HttpServletResponse response, Page page, ChildSearchForm csf) {
    MyResult result = new MyResult();
    result.setDoing("正在查询小儿信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session
      .getAttribute("gonghao").toString() : null;
    List list = this.iChildCheckService.findChildByPage(page, csf);
    session.setAttribute("childSearchForm", csf);
    Map<Object, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    result.setDate(new Date());
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/saveChildRegistration.htm"}, method = {RequestMethod.POST})
  public void saveChildRegistration(HttpServletRequest request, HttpServletResponse response, ChuZhenForm czf) throws Exception {
    HuanZheXinXi hzxx = new HuanZheXinXi();
    Jiuzhen jz = new Jiuzhen();
    XiaoErChuZhen xecz = new XiaoErChuZhen();
    hzxx.setBinglihao(czf.getPatientID());
    hzxx.setXingming(czf.getName());
    HttpSession session = request.getSession();
    String jilvren = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : "";
    hzxx.setJilvren(jilvren);
    hzxx.setLaiyuan(Integer.valueOf(1006));
    hzxx.setXingbie(czf.getSex().equals("1"));
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    try {
      hzxx.setShengri(format.parse(czf.getBirthday()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    hzxx.setDianhua(czf.getTel());
    hzxx.setShouji(czf.getMobile());
    jz.setCaozuoTime(new Date());
    jz.setCaozuoren(jilvren);
    jz.setState(Integer.valueOf(27));
    jz.setFzys(jilvren);
    jz.setZhenbie(Integer.valueOf(Integer.parseInt(czf.getZhenbie())));
    jz.setShengao((czf.getHeight().trim() != "") ? Integer.valueOf(Integer.parseInt(czf.getHeight())) : null);
    jz.setTizhong((czf.getHeight().trim() != "") ? Integer.valueOf(Integer.parseInt(czf.getHeight())) : null);
    jz.setHzlxr(czf.getGuardian());
    try {
      xecz.setYcrq(format.parse(czf.getEdc()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    int a = this.iChildCheckService.calculateYq(czf.getGESTATION());
    xecz.setYunqi(Integer.valueOf(a));
    xecz.setTaibie((czf.getMultiple_Birth().trim() != "") ? Integer.valueOf(Integer.parseInt(czf.getMultiple_Birth())) : null);
    xecz.setCstz((czf.getBirth_weight().trim() != "") ? Integer.valueOf(Integer.parseInt(czf.getBirth_weight())) : null);
    xecz.setCsqk(czf.getBirth_note());
    xecz.setDqqk(czf.getNote());
    xecz.setKyycqk(czf.getHistoryOfGenetics());
    xecz.setFmfs((czf.getFmfs().trim() != "") ? Integer.valueOf(Integer.parseInt(czf.getFmfs())) : null);
    xecz.setCssg((czf.getBirth_height().trim() != "") ? Integer.valueOf(Integer.parseInt(czf.getBirth_height())) : null);
    MyResult result = new MyResult();
    result.setDoing("添加初诊信息");
    try {
      this.iChildCheckService.addChildRegistration(hzxx, jz, xecz);
      result.setState(1);
      result.setMessage("添加初诊信息成功");
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("添加初诊信息失败");
    } 
    result.setGonghao(jilvren);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findChild.htm"}, method = {RequestMethod.POST})
  public void findChild(HttpServletRequest request, HttpServletResponse response, String blh) {
    MyResult result = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (request.getAttribute("gonghao") != null) ? request.getAttribute("gonghao").toString() : null;
    result.setDoing("查询患儿信息");
    if (blh.trim() == "") {
      result.setState(1);
      result.setMessage("初诊添加");
    } else {
      try {
        Map<String, Object> map = this.iChildCheckService.findXiaoErFUZhen(blh);
        if (map == null) {
          result.setState(1);
          result.setMessage("输入病历号有误");
        } else {
          result.setState(1);
          result.setObj(map);
          result.setMessage("");
        } 
      } catch (Exception e) {
        e.printStackTrace();
        result.setMessage("数据库异常");
      } 
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateFuZhen.htm"}, method = {RequestMethod.POST})
  public void updateFunZhen(HttpServletRequest request, HttpServletResponse response, FuZhenForm fzf) {
    HuanZheXinXi hzxx = new HuanZheXinXi();
    Jiuzhen jz = new Jiuzhen();
    XiaoErChuZhen xecz = new XiaoErChuZhen();
    hzxx.setBinglihao(fzf.getPatientID());
    hzxx.setXingming(fzf.getName());
    HttpSession session = request.getSession();
    String jilvren = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : "";
    hzxx.setJilvren(jilvren);
    hzxx.setLaiyuan(Integer.valueOf(1006));
    hzxx.setXingbie(fzf.getSex().equals("1"));
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    try {
      hzxx.setShengri(format.parse(fzf.getBirthday()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    hzxx.setDianhua(fzf.getTel());
    hzxx.setShouji(fzf.getMobile());
    hzxx.setId(Long.valueOf(Long.parseLong(fzf.getHzid())));
    jz.setCaozuoTime(new Date());
    jz.setCaozuoren(jilvren);
    jz.setState(Integer.valueOf(27));
    jz.setFzys(jilvren);
    jz.setZhenbie((fzf.getZhenbie() != "") ? Integer.valueOf(Integer.parseInt(fzf.getZhenbie())) : null);
    jz.setShengao((fzf.getHeight().trim() != "") ? Integer.valueOf(Integer.parseInt(fzf.getHeight())) : null);
    jz.setTizhong((fzf.getWeight().trim() != "") ? Integer.valueOf(Integer.parseInt(fzf.getWeight())) : null);
    jz.setHzlxr(fzf.getMother_name());
    jz.setHuanzheId(Long.valueOf(Long.parseLong(fzf.getHzid())));
    try {
      xecz.setYcrq(format.parse(fzf.getEdc()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    int a = this.iChildCheckService.calculateYq(fzf.getGESTATION());
    xecz.setYunqi(Integer.valueOf(a));
    xecz.setTaibie((fzf.getMultiple_Birth() != "") ? Integer.valueOf(Integer.parseInt(fzf.getMultiple_Birth())) : null);
    xecz.setCstz((fzf.getBirth_weight().trim() != "") ? Integer.valueOf(Integer.parseInt(fzf.getBirth_weight())) : null);
    xecz.setCsqk(fzf.getBirth_note());
    xecz.setDqqk(fzf.getNote());
    xecz.setKyycqk(fzf.getHistoryOfGenetics());
    xecz.setFmfs((fzf.getFmfs() != "") ? Integer.valueOf(Integer.parseInt(fzf.getFmfs())) : null);
    xecz.setCssg((fzf.getBirth_height().trim() != "") ? Integer.valueOf(Integer.parseInt(fzf.getBirth_height())) : null);
    xecz.setHzid(Long.valueOf(Long.parseLong(fzf.getHzid())));
    MyResult result = new MyResult();
    result.setDoing("添加更新出诊信息");
    try {
      this.iChildCheckService.addChildReexamination(hzxx, jz, xecz);
      result.setState(1);
      result.setMessage("添加更新复诊信息成功");
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("添加更新复诊信息失败");
    } 
    result.setGonghao(jilvren);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getChildByHzIdAndJiuzhenid.htm"}, method = {RequestMethod.POST})
  public void getChildByHzIdAndJiuzhenid(HttpServletRequest request, HttpServletResponse response, String hzid, String jiuzhenid) {
    MyResult myresult = new MyResult();
    myresult.setDoing("查询患儿信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    try {
      HuanZheXinXi hzxx = this.iHuanZheXinXiService.findHuanZheById(Long.valueOf(Long.parseLong(hzid)));
      XiaoErChuZhen xecz = this.iChildCheckService.findChuZhenByHzid(Long.valueOf(Long.parseLong(hzid)));
      Jiuzhen jz = this.iJiuzhenService.getJiuzhenById(Long.valueOf(Long.parseLong(jiuzhenid)));
      FuZhenForm fzf = new FuZhenForm();
      fzf.setPatientID(hzxx.getBinglihao());
      fzf.setBirth_height((xecz.getCssg() == null) ? "" : xecz.getCssg().toString());
      fzf.setBirth_note(xecz.getCsqk());
      fzf.setBirth_weight((xecz.getCstz() == null) ? "" : xecz.getCstz().toString());
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      fzf.setBirthday(sdf.format(hzxx.getShengri()));
      fzf.setEdc(sdf.format(xecz.getYcrq()));
      fzf.setFmfs(xecz.getFmfs().toString());
      fzf.setGESTATION(String.valueOf(xecz.getYunqi().intValue() / 7) + "周" + (xecz.getYunqi().intValue() % 7) + "日");
      fzf.setHeight((jz.getShengao() == null) ? "" : jz.getShengao().toString());
      fzf.setHistoryOfGenetics(xecz.getKyycqk());
      fzf.setHzid(hzid);
      fzf.setMobile(hzxx.getShouji());
      fzf.setMother_name(jz.getHzlxr());
      fzf.setMultiple_Birth(xecz.getTaibie().toString());
      fzf.setName(hzxx.getXingming());
      fzf.setNote(xecz.getDqqk());
      fzf.setSex(hzxx.isXingbie() ? "1" : "0");
      fzf.setTel(hzxx.getDianhua());
      fzf.setWeight((jz.getTizhong() == null) ? "" : jz.getTizhong().toString());
      fzf.setZhenbie(jz.getZhenbie().toString());
      map.put("result", fzf);
      map.put("jiuzhenid", jiuzhenid);
      myresult.setState(1);
      myresult.setObj(map);
      myresult.setMessage("查找成功");
    } catch (Exception e) {
      e.printStackTrace();
      myresult.setMessage("查找失败");
    } 
    myresult.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(myresult, response);
  }
  
  @RequestMapping(value = {"/updateChildRegistration.htm"}, method = {RequestMethod.POST})
  public void saveChildRegistration(HttpServletRequest request, HttpServletResponse response, FuZhenForm fzf, String jiuzhenid) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Jiuzhen jz = this.iJiuzhenService.getJiuzhenById(Long.valueOf(Long.parseLong(jiuzhenid)));
    jz.setCaozuoTime(new Date());
    jz.setCaozuoren((request.getSession().getAttribute("gonghao") != null) ? request.getSession().getAttribute("gonghao").toString() : "");
    jz.setZhenbie((fzf.getZhenbie() != "") ? Integer.valueOf(Integer.parseInt(fzf.getZhenbie())) : null);
    jz.setShengao((fzf.getHeight().trim() != "") ? Integer.valueOf(Integer.parseInt(fzf.getHeight())) : null);
    jz.setTizhong((fzf.getWeight().trim() != "") ? Integer.valueOf(Integer.parseInt(fzf.getWeight())) : null);
    jz.setHzlxr(fzf.getMother_name());
    HuanZheXinXi hzxx = this.iHuanZheXinXiService.findHuanZheById(Long.valueOf(Long.parseLong(fzf.getHzid())));
    hzxx.setXingming(fzf.getName());
    hzxx.setJilvren((request.getSession().getAttribute("gonghao") != null) ? request.getSession().getAttribute("gonghao").toString() : "");
    hzxx.setXingbie(fzf.getSex().equals("1"));
    try {
      hzxx.setShengri(sdf.parse(fzf.getBirthday()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    hzxx.setDianhua(fzf.getTel());
    hzxx.setShouji(fzf.getMobile());
    XiaoErChuZhen xecz = this.iChildCheckService.findChuZhenByHzid(Long.valueOf(Long.parseLong(fzf.getHzid())));
    try {
      xecz.setYcrq(sdf.parse(fzf.getEdc()));
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    int a = this.iChildCheckService.calculateYq(fzf.getGESTATION());
    xecz.setYunqi(Integer.valueOf(a));
    xecz.setTaibie((fzf.getMultiple_Birth() != "") ? Integer.valueOf(Integer.parseInt(fzf.getMultiple_Birth())) : null);
    xecz.setCstz((fzf.getBirth_weight().trim() != "") ? Integer.valueOf(Integer.parseInt(fzf.getBirth_weight())) : null);
    xecz.setCsqk(fzf.getBirth_note());
    xecz.setDqqk(fzf.getNote());
    xecz.setKyycqk(fzf.getHistoryOfGenetics());
    xecz.setFmfs((fzf.getFmfs() != "") ? Integer.valueOf(Integer.parseInt(fzf.getFmfs())) : null);
    xecz.setCssg((fzf.getBirth_height().trim() != "") ? Integer.valueOf(Integer.parseInt(fzf.getBirth_height())) : null);
    MyResult result = new MyResult();
    result.setDoing("更新患儿信息");
    try {
      this.iChildCheckService.updateChildInfo(hzxx, jz, xecz);
      result.setState(1);
      result.setMessage("更新患儿信息成功");
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("更新患儿信息失败");
    } 
    result.setGonghao((request.getSession().getAttribute("gonghao") != null) ? request.getSession().getAttribute("gonghao").toString() : null);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findPchaoList.htm"}, method = {RequestMethod.POST})
  public void findPchaoList(HttpServletRequest request, HttpServletResponse response, Page page, ChildCheckPcaoForm pFrom) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    String factor = request.getParameter("state");
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("p超");
    jcxm = this.iJcxmService.findJcxmsByJcxm(jcxm).get(0);
    System.out.println("患者ID：" + pFrom.getHuanzheId() + "   " + pFrom.getJiuzhenId());
    Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(pFrom.getHuanzheId(), pFrom.getJiuzhenId(), jcxm.getId());
    Map map = new HashMap<>();
    try {
      page.setFactor(factor);
      map = this.iChildCheckService.findPChaoList(page, jcd.getId());
      System.out.println(map.get("list"));
      if (map != null) {
        result.setObj(map);
        result.setState(1);
        result.setMessage("成功");
      } 
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("失败");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/addPcao.htm"}, method = {RequestMethod.POST})
  public void savePcaoAndjcd(ChildCheckPcaoForm childCheckForm, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDoing("保存小儿P超检查的结果");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      childCheckForm.setGonghao(gonghao);
      Jcxm jcxm = new Jcxm();
      jcxm.setXmmc("p超");
      List<Jcxm> l = this.iJcxmService.findJcxmsByJcxm(jcxm);
      if (l != null && l.size() > 0)
        jcxm = l.get(0); 
      Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(
          childCheckForm.getHuanzheId(), 
          childCheckForm.getJiuzhenId(), jcxm.getId());
      if (jcd != null) {
        Pcao p = this.iChildCheckService.findPcaoByJcdID(jcd.getId());
        p.setOD1(childCheckForm.getOD1());
        p.setOD2(childCheckForm.getOD2());
        p.setOD3(childCheckForm.getOD3());
        p.setODave(childCheckForm.getODave());
        p.setOS1(childCheckForm.getOS1());
        p.setOS2(childCheckForm.getOS2());
        p.setOS3(childCheckForm.getOS3());
        p.setOSave(childCheckForm.getOSave());
        this.iChildCheckService.updatePChao(p);
        result.setMessage("小儿P超检查结果保存成功");
        result.setState(1);
      } else {
        this.iChildCheckService.savePcaoAndjcd(childCheckForm);
        result.setMessage("小儿P超检查结果保存成功");
        result.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("小儿P超检查结果保存失败");
      result.setState(0);
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findHzxxById.htm"}, method = {RequestMethod.POST})
  public void findByBingLiHao(HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    result.setDoing("根据小儿患者ID获取小儿患者信息");
    HttpSession session = request.getSession();
    try {
      Long jiuzhenid = Long.valueOf(Long.parseLong(request.getParameter("jiuzhenid")));
      System.out.println("===============" + jiuzhenid);
      Long huanzheid = Long.valueOf(Long.parseLong(request.getParameter("huanzheid")));
      HuanZheXinXi hzxx = this.iHuanZheXinXiService.findHuanZheById(huanzheid);
      String huanzhelianxiren = this.iChildCheckService
        .findHuanZheLianXiRenByHuanZheID(huanzheid);
      hzxx.setHzlxr(huanzhelianxiren);
      Jcxm jcxm = new Jcxm();
      jcxm.setXmmc("p超");
      List<Jcxm> l = this.iJcxmService.findJcxmsByJcxm(jcxm);
      if (l != null && l.size() > 0)
        jcxm = l.get(0); 
      Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(huanzheid, 
          jiuzhenid, jcxm.getId());
      if (jcd != null) {
        System.out.println(jcd.getId() + "jcd");
        Pcao p = this.iChildCheckService.findPcaoByJcdID(jcd.getId());
        if (p != null)
          map.put("pcao", p); 
        System.out.println(p.getOD1());
      } 
      map.put("hzxx", hzxx);
      map.put("jiuzhenid", jiuzhenid);
      result.setObj(map);
      result.setMessage("显示小儿Pcao信息展示成功！");
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("显示小儿Pcao信息展示失败！");
      result.setState(0);
    } 
    result.setGonghao((String)session.getAttribute("gonghao"));
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/getYanYaList.htm"}, method = {RequestMethod.POST})
  public void getJiuZhenHuanZheList(Page page, HttpServletRequest request, HttpServletResponse response, HzXxSearchForm hzxx) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    String factor = request.getParameter("state");
    page.setFactor(factor);
    Map<Object, Object> map = new HashMap<>();
    System.out.println(hzxx.getSearch());
    map = this.iChildCheckService.findAllYanYa4Page(page, hzxx);
    if (map != null) {
      result.setState(1);
      result.setMessage("成功");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/addYanYa.htm"}, method = {RequestMethod.POST})
  public void saveChileYanYa(HttpServletRequest request, HttpServletResponse response, ChileCheckYanYaForm chileCheckYanYaForm) {
    MyResult result = new MyResult();
    result.setDoing("保存小儿眼压检查的结果");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    try {
      chileCheckYanYaForm.setGonghao(gonghao);
      this.iChildCheckService.saveYanYa(chileCheckYanYaForm);
      result.setMessage("小儿眼压检查结果保存成功");
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
      result.setMessage("小儿眼压检查结果保存失败");
      result.setState(0);
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/updateYanYa.htm"}, method = {RequestMethod.POST})
  public void updateChileYanYa(HttpServletRequest request, HttpServletResponse response, ChileCheckYanYaForm chileCheckYanYaForm) {
    System.out.println(chileCheckYanYaForm.getOd());
    System.out.println(chileCheckYanYaForm.getOs());
    System.out.println(chileCheckYanYaForm.getHuanzeId());
    System.out.println(chileCheckYanYaForm.getJiuzhenId());
    MyResult result = new MyResult();
    result.setDoing("修改小儿眼压检查的结果");
    HttpSession session = request.getSession();
    String gonghao = (String)session.getAttribute("gonghao");
    System.out.println(chileCheckYanYaForm.getJcdid());
    YanYa yy = this.iYanYaService.getYanYaByJcd(chileCheckYanYaForm.getJcdid());
    try {
      yy.setOd(Float.valueOf(chileCheckYanYaForm.getOd()));
      yy.setOs(Float.valueOf(chileCheckYanYaForm.getOs()));
      yy.setYcsj(new Date());
      this.iYanYaService.updateYanYa(yy);
      result.setMessage("小儿眼压检查结果修改成功");
      result.setState(1);
    } catch (Exception e) {
      result.setState(0);
      e.printStackTrace();
      result.setMessage("小儿眼压检查结果修改失败");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findAchaoList.htm"}, method = {RequestMethod.POST})
  public void findAchaoList(HttpServletRequest request, HttpServletResponse response, Page page, AChaoForm aForm) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    String factor = request.getParameter("state");
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("A超");
    jcxm = this.iJcxmService.findJcxmsByJcxm(jcxm).get(0);
    Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(aForm.getHuanzheId(), aForm.getJiuzhenId(), jcxm.getId());
    Map map = new HashMap<>();
    try {
      page.setFactor(factor);
      map = this.iChildCheckService.findAChaoList(page, jcd.getId());
      System.out.println(map.get("list"));
      if (map != null) {
        result.setObj(map);
        result.setState(1);
        result.setMessage("成功");
      } 
    } catch (Exception e) {
      result.setState(0);
      result.setMessage("失败");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findAllAChao.htm"}, method = {RequestMethod.POST})
  public void findAllAChao(HttpServletRequest request, HttpServletResponse response) {
    System.out.println("进入");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    result.setDoing("查询A超信息");
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.iChildCheckService.findAllAChao();
      if (map != null) {
        result.setState(1);
        result.setObj(map);
        result.setMessage("查询操作成功");
      } else {
        result.setState(0);
        result.setMessage("查询操作失败");
      } 
    } catch (Exception e) {
      e.printStackTrace();
      result.setState(0);
      result.setMessage("查询操作失败");
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findUpdateAChao.htm"}, method = {RequestMethod.POST})
  public void findUpdateAChao(HttpServletRequest request, HttpServletResponse response) {
    System.out.println("进入");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    result.setGonghao(gonghao);
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("A超");
    jcxm = this.iJcxmService.findJcxmsByJcxm(jcxm).get(0);
    Long jiuzhenid = Long.valueOf(Long.parseLong(request.getParameter("jiuzhenid")));
    Long huanzheid = Long.valueOf(Long.parseLong(request.getParameter("huanzheid")));
    System.out.println(jcxm.getId() + "____" + jiuzhenid + "____" + huanzheid);
    Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(huanzheid, jiuzhenid, jcxm.getId());
    if (jcd != null) {
      AChao aChao = this.iChildCheckService.findAChaoByJcdID(jcd.getId());
      map.put("ac", aChao);
      result.setObj(map);
      result.setState(2);
      result.setMessage("查询A超信息成功");
    } else {
      result.setState(1);
      result.setObj(null);
      result.setMessage("查询A超信息失败");
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveOrUpdateAChao"}, method = {RequestMethod.POST})
  public void saveOrUpdateAChao(HttpServletRequest request, HttpServletResponse response, AChaoForm aF) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    aF.setGonghao(gonghao);
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("A超");
    jcxm = this.iJcxmService.findJcxmsByJcxm(jcxm).get(0);
    Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(aF.getHuanzheId(), aF.getJiuzhenId(), jcxm.getId());
    if (jcd != null) {
      result.setDoing("修改A超信息");
      try {
        AChao aChao = this.iChildCheckService.findAChaoByJcdID(jcd.getId());
        aChao.setOd_a(aF.getOd_a());
        aChao.setOd_l(aF.getOd_l());
        aChao.setOd_v(aF.getOd_v());
        aChao.setOs_a(aF.getOs_a());
        aChao.setOs_l(aF.getOs_l());
        aChao.setOs_v(aF.getOs_v());
        aChao.setOd_al(aF.getOd_al());
        aChao.setOs_al(aF.getOs_al());
        this.iChildCheckService.updateAChao(aChao);
        result.setDate(new Date());
        result.setMessage("修改A超信息成功");
        result.setObj(aChao);
        result.setState(2);
      } catch (Exception e) {
        e.printStackTrace();
        result.setMessage("修改A超信息失败");
        result.setState(0);
      } 
    } else {
      result.setDoing("新增A超信息");
      try {
        Serializable acID = this.iChildCheckService.saveAChao(aF);
        if (acID != null) {
          result.setObj(this.iChildCheckService.findAChaoByID(acID));
          result.setDate(new Date());
          result.setMessage("新增A超信息成功");
          result.setState(1);
        } else {
          result.setMessage("新增A超信息失败");
        } 
      } catch (Exception e) {
        result.setMessage("新增A超信息失败");
        result.setState(0);
        e.printStackTrace();
      } 
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/addTiGeInfo.htm"}, method = {RequestMethod.POST})
  public void addTiGeCheckInfo(HttpServletRequest request, HttpServletResponse response, ChildTiGeForm form) {
    MyResult result = new MyResult();
    System.out.println("进入asfsafsa");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    result.setDate(new Date());
    result.setDoing("添加小儿体格检查信息");
    result.setGonghao(gonghao);
    Jzjl jzjl = new Jzjl();
    jzjl.setJiuzhenId(Long.valueOf(Long.parseLong(request.getParameter("jiuzhenId"))));
    jzjl.setJlren(gonghao);
    jzjl.setJlTime(new Date());
    try {
      List list = this.iChildCheckService.findTGJC(Long.parseLong(request.getParameter("jiuzhenId")));
      if (list.size() > 0) {
        this.iChildCheckService.updateTgjc(jzjl, form, Long.valueOf(Long.parseLong(request.getParameter("jiuzhenId"))));
        result.setMessage("更新成功");
        result.setState(2);
      } else if (this.iChildCheckService.getaddTgjc(jzjl, form)) {
        result.setMessage("插入成功");
        result.setState(1);
      } else {
        result.setMessage("插入失败");
        result.setState(0);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findTGJC.htm"}, method = {RequestMethod.POST})
  public void findTGJC(HttpServletRequest request, HttpServletResponse response, String huanzheid, String jiuzhenid) {
    MyResult mr = new MyResult();
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    System.out.println(huanzheid);
    try {
      HuanZheXinXi hzxx = this.iHuanZheXinXiService.findHuanZheById(Long.valueOf(Long.parseLong(huanzheid)));
      map.put("hzxx", hzxx);
      List<Jzjl> list = this.iChildCheckService.findTGJC(Long.parseLong(jiuzhenid));
      if (list.size() > 0) {
        for (int i = 0; i < list.size(); i++) {
          for (int j = 30313; j <= 60112; j++) {
            if (((Jzjl)list.get(i)).getCategoryId().intValue() == j)
              map.put("tgjc" + j, ((Jzjl)list.get(i)).getJilu()); 
          } 
        } 
        mr.setState(2);
      } else {
        mr.setState(1);
      } 
      mr.setObj(map);
    } catch (Exception e) {
      mr.setState(0);
      e.printStackTrace();
    } 
    mr.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findQuGuang.htm"}, method = {RequestMethod.POST})
  public void findQuGuang(HttpServletRequest request, HttpServletResponse response, Page page, QuGuangForm qForm) {
    MyResult result = new MyResult();
    String gonghao = (String)request.getSession().getAttribute("gonghao");
    String factor = request.getParameter("state");
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("屈光");
    jcxm = this.iJcxmService.findJcxmsByJcxm(jcxm).get(0);
    System.out.println("患者ID：" + qForm.getHuanzheID() + "   " + qForm.getJiuzhenID());
    Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(qForm.getHuanzheID(), qForm.getJiuzhenID(), jcxm.getId());
    page.setFactor(factor);
    Map map = new HashMap<>();
    try {
      map = this.iChildCheckService.findYanGuangList(page, jcd.getId());
      if (map != null) {
        result.setState(1);
        result.setMessage("成功");
      } 
    } catch (Exception e) {
      result.setState(0);
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/findUpdateQuGuang.htm"}, method = {RequestMethod.POST})
  public void findUpdateQuGuang(HttpServletRequest request, HttpServletResponse response) {
    System.out.println("进入");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    Map<String, Object> map = new HashMap<>();
    result.setGonghao(gonghao);
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("屈光");
    jcxm = this.iJcxmService.findJcxmsByJcxm(jcxm).get(0);
    Long jiuzhenid = Long.valueOf(Long.parseLong(request.getParameter("jiuzhenid")));
    Long huanzheid = Long.valueOf(Long.parseLong(request.getParameter("huanzheid")));
    System.out.println(jcxm.getId() + "____" + jiuzhenid + "____" + huanzheid);
    Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(huanzheid, jiuzhenid, jcxm.getId());
    if (jcd != null) {
      YanGuang yanG = this.iChildCheckService.findYanGuangByJcdid(jcd.getId());
      map.put("yanG", yanG);
      result.setObj(map);
      result.setState(2);
      result.setMessage("查询屈光信息成功");
    } else {
      result.setState(1);
      result.setObj(null);
      result.setMessage("查询屈光信息失败");
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/saveOrUpdateQuGuang.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateQuGuang(HttpServletRequest request, HttpServletResponse response, QuGuangForm qForm) {
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    MyResult result = new MyResult();
    qForm.setGonghao(gonghao);
    Jcxm jcxm = new Jcxm();
    jcxm.setXmmc("屈光");
    jcxm = this.iJcxmService.findJcxmsByJcxm(jcxm).get(0);
    Jcd jcd = this.iJcdService.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(qForm.getHuanzheID(), qForm.getJiuzhenID(), jcxm.getId());
    if (jcd != null) {
      try {
        result.setDoing("修改屈光信息");
        YanGuang yanG = this.iChildCheckService.findYanGuangByJcdid(jcd.getId());
        yanG.setJcdid(jcd.getId());
        yanG.setRefLA(qForm.getRef_l_a());
        yanG.setRefRA(qForm.getRef_r_a());
        yanG.setRefLC(Float.valueOf(qForm.getRef_l_c()));
        yanG.setRefRC(Float.valueOf(qForm.getRef_r_c()));
        yanG.setRefLS(Float.valueOf(qForm.getRef_l_s()));
        yanG.setRefRS(Float.valueOf(qForm.getRef_r_s()));
        yanG.setKxd_l(qForm.getKxd_l());
        yanG.setKxd_r(qForm.getKxd_r());
        this.iChildCheckService.updateQuGuang(yanG);
        result.setDate(new Date());
        result.setMessage("修改屈光信息成功");
        result.setObj(yanG);
        result.setState(2);
      } catch (Exception e) {
        e.printStackTrace();
        result.setMessage("修改屈光信息失败");
        result.setState(0);
      } 
    } else {
      result.setDoing("新增屈光信息");
      try {
        qForm.setGonghao(gonghao);
        Serializable qgID = this.iChildCheckService.saveQuGuang(qForm);
        result.setObj(qgID);
        result.setMessage("新增屈光信息成功");
        result.setDate(new Date());
        result.setState(1);
      } catch (Exception e) {
        result.setMessage("新增屈光信息失败");
        result.setState(0);
        e.printStackTrace();
      } 
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/findHFJL.htm"}, method = {RequestMethod.POST})
  public void findHFJL(HttpServletRequest request, HttpServletResponse response, Page page, FzyyjlSearchForm ff) {
    MyResult result = new MyResult();
    result.setDoing("查看回访记录");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    List list = this.iChildCheckService.findFzyyjlList(page, ff);
    Map<Object, Object> map = new HashMap<>();
    System.out.println("id===" + ff.getFzyyid());
    System.out.println("search" + ff.getSearch());
    map.put("list", list);
    map.put("page", page);
    result.setDate(new Date());
    result.setGonghao(gonghao);
    this.oimsLogService.saveOimsLog(result, 1);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/showFzyyjl.htm"}, method = {RequestMethod.POST})
  public void showFzyyjl(HttpServletResponse response, HttpServletRequest request, Page page, FzyySearchForm ff) {
    MyResult mr = new MyResult();
    mr.setDoing("复诊预约列表");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.iChildCheckService.findFzyy4Page(page, ff);
      mr.setObj(map);
      mr.setState(1);
      mr.setMessage("成功");
    } catch (Exception e) {
      e.printStackTrace();
    } 
    mr.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(map, response);
  }
  
  @RequestMapping(value = {"/saveOrUpdateFuZhenYuYue.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateFuZhenYuYue(HttpServletRequest request, HttpServletResponse response, FzyyForm form) {
    MyResult mr = new MyResult();
    mr.setDoing("添加随诊预约记录");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : "";
    Fzyy fzyy = new Fzyy();
    System.out.println(gonghao);
    fzyy.setYyren(gonghao);
    try {
      Fzyy fzyy1 = this.iChildCheckService.findFzyyByJiuzhenid(form.getJiuzhenID());
      if (fzyy1 != null) {
        fzyy1.setYyren(gonghao);
        this.iChildCheckService.updateFzyyInfo(fzyy1, form);
        mr.setState(2);
      } else {
        fzyy.setBiaoshi(Integer.valueOf(60201));
        this.iChildCheckService.addFzyyInfo(fzyy, form);
        mr.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    mr.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findHzxxAndFzyyByHzidAndJzid.htm"}, method = {RequestMethod.POST})
  public void findHzxxAndFzyyByHzidAndJzid(HttpServletRequest request, HttpServletResponse response, String huanzheid, String jiuzhenid) {
    MyResult mr = new MyResult();
    mr.setDoing("查询患者信息和复诊预约信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    try {
      HuanZheXinXi hzxx = this.iHuanZheXinXiService.findHuanZheById(Long.valueOf(Long.parseLong(huanzheid)));
      Fzyy fzyy = this.iChildCheckService.findFzyyByJiuzhenid(jiuzhenid);
      System.out.println(String.valueOf(jiuzhenid) + "!!!");
      System.out.println(String.valueOf(huanzheid) + "!!!");
      map.put("hzxx", hzxx);
      System.out.println(fzyy + "!!!");
      if (fzyy != null) {
        map.put("fzyy", fzyy);
        mr.setObj(map);
        mr.setState(2);
      } else {
        mr.setObj(map);
        mr.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    mr.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/findHzxxAndSfjlByHzidAndFzyyid.htm"}, method = {RequestMethod.POST})
  public void findHzxxAndSfjlByHzidAndFzyyid(HttpServletRequest request, HttpServletResponse response, String huanzheid, String fzyyid) {
    MyResult mr = new MyResult();
    mr.setDoing("查询患者信息和随访记录信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : null;
    Map<String, Object> map = new HashMap<>();
    try {
      HuanZheXinXi hzxx = this.iHuanZheXinXiService.findHuanZheById(Long.valueOf(Long.parseLong(huanzheid)));
      Fzyyjl fzyyjl = this.iChildCheckService.findSfjlByFzyyid(fzyyid);
      System.out.println(String.valueOf(huanzheid) + "!!!");
      System.out.println(String.valueOf(fzyyid) + "!!!");
      map.put("hzxx", hzxx);
      System.out.println(fzyyjl + "!!!");
      if (fzyyjl != null) {
        map.put("fzyyjl", fzyyjl);
        mr.setObj(map);
        mr.setState(2);
      } else {
        mr.setObj(map);
        mr.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    mr.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/saveOrUpdateSFJL.htm"}, method = {RequestMethod.POST})
  public void saveOrUpdateSFJL(HttpServletRequest request, HttpServletResponse response, FzyyjlForm form) {
    MyResult mr = new MyResult();
    mr.setDoing("添加随诊预约记录");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : "";
    Fzyyjl fzyyjl = new Fzyyjl();
    fzyyjl.setYyren(gonghao);
    try {
      Fzyyjl fzyyjl1 = this.iChildCheckService.findSfjlByFzyyid(form.getFzyyID());
      if (fzyyjl1 != null) {
        fzyyjl1.setYyren(gonghao);
        this.iChildCheckService.updateFzyyjl1Info(fzyyjl1, form);
        mr.setState(2);
      } else {
        Fzyy fzyy = this.iChildCheckService.findFzyyById(form.getFzyyID());
        fzyy.setBiaoshi(Integer.valueOf(60202));
        this.iChildCheckService.updateFzyy(fzyy);
        this.iChildCheckService.addFzyyjlInfo(fzyyjl, form);
        mr.setState(1);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    mr.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(mr, response);
  }
  
  @RequestMapping(value = {"/aorpresult.htm"}, method = {RequestMethod.POST})
  public void aOrPResult(HttpServletRequest request, HttpServletResponse response, String id, String title) {
    MyResult result = new MyResult();
    result.setDoing("根据检查单id取得a超或p超记录");
    Map<String, Object> map = new HashMap<>();
    try {
      map = this.iChildCheckService.findAOrP(id, title);
      result.setObj(map);
      result.setState(1);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"exportChild.htm"}, method = {RequestMethod.POST})
  public void exportChildCheckInfo(String where, HttpServletRequest request, HttpServletResponse response) {
    MyResult result = new MyResult();
    result.setDate(new Date());
    result.setDoing("正在导出患儿信息");
    HttpSession session = request.getSession();
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : "";
    result.setGonghao(gonghao);
    ChildSearchForm form = (ChildSearchForm)session.getAttribute("childSearchForm");
    List list = this.iChildCheckService.exportXiaoErXinXi(form, where);
    System.out.println(String.valueOf(list.size()) + "导出长度");
    List<String> s = new ArrayList<>();
    s.add("总表");
    ChildExpImpUtils.exportXls(this.iChildCheckService.exportXiaoErXinXi(form, where), ChildExpImpUtils.createXlsHead(), s, request, response);
  }
  
  @RequestMapping({"importChild"})
  public void importChild(HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException {
    MultipartHttpServletRequest request2 = (MultipartHttpServletRequest)request;
    HttpSession session = request.getSession();
    MyResult result = new MyResult();
    result.setDate(new Date());
    result.setDoing("导入患儿信息");
    String gonghao = (session.getAttribute("gonghao") != null) ? session.getAttribute("gonghao").toString() : "";
    result.setGonghao(gonghao);
    try {
      request2.getFile("url_excel_child").transferTo(new File(ChildExpImpUtils.importChildTemFilePath()));
    } catch (Exception e1) {
      e1.printStackTrace();
    } 
    HuanZheXinXi huanZheXinXi = new HuanZheXinXi();
    huanZheXinXi.setJilvren(gonghao);
    Jiuzhen jiuzhen = new Jiuzhen();
    jiuzhen.setCaozuoren(gonghao);
    int state = 0;
    try {
      state = this.iChildCheckService.importXiaoErXinXiToApp(ChildExpImpUtils.importChildTemFilePath(), gonghao);
      result.setState(state);
    } catch (Exception e) {
      result.setMessage(e.getMessage());
      result.setState(0);
    } 
    result.setGonghao(gonghao);
    JSONWriterUtils.writeJSONObj(result, response);
  }
  
  @RequestMapping(value = {"/isXiaoEr.htm"}, method = {RequestMethod.POST})
  public void isXiaoEr(HttpServletRequest request, HttpServletResponse response) {
    String hzid = request.getParameter("hzid");
    MyResult mr = new MyResult();
    mr.setDoing("判断患者是否是小儿");
    try {
      Boolean b = Boolean.valueOf(false);
      if (b.booleanValue())
        mr.setState(1); 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    JSONWriterUtils.writeJSONObj(mr, response);
  }
}
