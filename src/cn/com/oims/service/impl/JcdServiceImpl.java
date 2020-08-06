package cn.com.oims.service.impl;

import cn.com.oims.common.CommonFunction;
import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJcdDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.IManageItemDao;
import cn.com.oims.dao.IPaiduiDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Manageitem;
import cn.com.oims.dao.pojo.Paidui;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IEyejgzlService;
import cn.com.oims.service.IEyeldcxService;
import cn.com.oims.service.IJcdService;
import cn.com.oims.web.form.JcdExecuteForm;
import cn.com.oims.web.form.JcdSearchForm;
import com.codesnet.common.FileUtils;
import com.codesnet.common.Page;
import java.io.File;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JcdServiceImpl implements IJcdService {
  @Autowired
  IJcdDao dao = null;
  
  @Autowired
  ICategoryDao categoryDao = null;
  
  @Autowired
  IYuanGongDao yuanGongDao = null;
  
  @Autowired
  IPaiduiDao paiduiDao = null;
  
  @Autowired
  IJzjlDao jzjlDao = null;
  
  @Autowired
  IHuanZheXinXiDao huanzhexinxiDao = null;
  
  @Autowired
  IManageItemDao manageItemDao = null;
  
  @Autowired
  IJiuzhenDao jiuzhenDao;
  
  @Autowired
  IEyeldcxService eyeldcxService;
  
  @Autowired
  IEyejgzlService eyejgzlService;
  
  public Serializable saveJcd(Jcd o) {
    String jcdh = o.getJcdh();
    if (jcdh != null && !jcdh.isEmpty()) {
      Jcd old = this.dao.findJcdByJCDH(jcdh);
      if (old != null)
        throw new RuntimeException("检查单号已使用！"); 
    } else {
      o.setJcdh(getJcdhstr(0));
    } 
    return this.dao.saveJcd(o);
  }
  
  public void delJcdById(Serializable id) {
    this.dao.delJcd(id);
  }
  
  public void saveOrUpdateJcd(Jcd o) {
    String jcdh = o.getJcdh();
    if (o.getId() != null) {
      updateJcd(o);
      return;
    } 
    if (jcdh != null && !jcdh.isEmpty()) {
      Jcd old = this.dao.findJcdByJCDH(jcdh);
      if (old != null)
        throw new RuntimeException("检查单号已使用！"); 
    } else {
      o.setJcdh(getJcdhstr(0));
    } 
    this.dao.saveOrUpdateJcd(o);
  }
  
  public String getJcdhstr(int n) {
    if (n == 0) {
      n = this.dao.getTodayJcdCount() + 1;
    } else {
      n++;
    } 
    String str = "OIMSJCD" + (
      new SimpleDateFormat("yyyyMMdd")).format(new Date());
    if (n < 10) {
      str = String.valueOf(str) + "00" + n;
    } else if (n >= 10 && n < 100) {
      str = String.valueOf(str) + "0" + n;
    } else {
      str = String.valueOf(str) + n;
    } 
    if (this.dao.findJcdByJCDH(str) != null)
      return getJcdhstr(n); 
    return str;
  }
  
  public List<Jcd> findAllJcd() {
    return this.dao.findAllJcd();
  }
  
  public Map<String, Object> findAllJcd4Page(Page p) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllJcd4Page(p));
    m.put("page", p);
    return m;
  }
  
  public JcdExecuteForm getOneWJCjcd(int jcsbid, int bgsid) {
    List list = this.dao.getOneWJCjcd(jcsbid, bgsid);
    JcdExecuteForm jef = null;
    return jef;
  }
  
  public boolean isBumenByIdToJcd(Integer id) {
    return this.dao.isBumenByIdToJcd(id);
  }
  
  public boolean isYuanGongByGonghaoToJcd(String gonghao) {
    return this.dao.isYuanGongByGonghaoToJcd(gonghao);
  }
  
  public Jcd getJcdById(Serializable id) {
    return this.dao.findJcdById(id);
  }
  
  public void updateJcd(Jcd jcd) {
    String jcdh = jcd.getJcdh();
    Jcd old = this.dao.findJcdById(jcd.getId());
    if (old == null)
      throw new RuntimeException("检查单不存在！"); 
    if (jcdh != null && !jcdh.equals(old.getJcdh())) {
      Jcd j = this.dao.findJcdByJCDH(jcdh);
      if (j != null && !old.equals(j))
        throw new RuntimeException("检查单号重复！"); 
    } 
    this.dao.updateJcd(jcd);
  }
  
  public JcdExecuteForm getJcdExecuteFormByJcd(Jcd jcd) {
    jcd = this.dao.findJcdById(jcd.getId());
    HuanZheXinXi huanzhexinxi = this.huanzhexinxiDao.findHuanZheById(jcd
        .getHuanzheId());
    List<Jzjl> jzjls = this.jzjlDao.findJzjlByJiuzhenid(jcd.getJiuzhenId().longValue());
    List<Map<String, Object>> list = this.jiuzhenDao.getZhenDuanList(jcd
        .getJiuzhenId().toString());
    String zhenDuan = "";
    for (Map<String, Object> map : list) {
      zhenDuan = String.valueOf(zhenDuan) + map.get("eye");
      zhenDuan = String.valueOf(zhenDuan) + (map.get("confirmed").toString().equals("1") ? "" : "疑似");
      zhenDuan = String.valueOf(zhenDuan) + map.get("zdflname") + ";";
    } 
    JcdExecuteForm jcdexecuteform = new JcdExecuteForm();
    jcdexecuteform.setBinglihao(huanzhexinxi.getBinglihao());
    jcdexecuteform.setXingming(huanzhexinxi.getXingming());
    jcdexecuteform.setXingbie(huanzhexinxi.isXingbie());
    jcdexecuteform.setShengri(huanzhexinxi.getShengri().toString()
        .split(" ")[0]);
    jcdexecuteform.setNianling(
        CommonFunction.getNianlingByCsrq(huanzhexinxi.getShengri().toString()
          .split(" ")[0]));
    jcdexecuteform.setShouji(huanzhexinxi.getShouji());
    jcdexecuteform.setJcxm(jcd.getBiaoti());
    jcdexecuteform.setYanbie(jcd.getYanbie().intValue());
    jcdexecuteform.setJcdh(jcd.getJcdh());
    jcdexecuteform.setYaoqiu(jcd.getJcyq());
    jcdexecuteform.setBiaoshi(jcd.getBiaoshi());
    jcdexecuteform.setZhenduan(zhenDuan);
    jcdexecuteform.setJcsj("");
    Iterator<Jzjl> iterator = jzjls.iterator();
    while (iterator.hasNext()) {
      Jzjl jzjl = iterator.next();
      if (jzjl.getCategoryId().intValue() == 30100) {
        jcdexecuteform.setZushu(jzjl.getJilu());
        continue;
      } 
      if (jzjl.getCategoryId().intValue() == 30103) {
        jcdexecuteform.setJiwangshi(jzjl.getJilu());
        continue;
      } 
      if (jzjl.getCategoryId().intValue() == 30102) {
        jcdexecuteform.setXianbingshi(jzjl.getJilu());
        continue;
      } 
      if (jzjl.getCategoryId().intValue() == 30105)
        jcdexecuteform.setJiazushi(jzjl.getJilu()); 
    } 
    jcdexecuteform.setJcdid(jcd.getId());
    jcdexecuteform.setHuanzhexinxiid(huanzhexinxi.getId());
    return jcdexecuteform;
  }
  
  public JcdExecuteForm getOneExcuteJcdByJcdid(String jcdid, int officeid, String gonghao) {
    List list = this.dao.getOneExcuteJcdByJcdid(jcdid, officeid, gonghao);
    JcdExecuteForm jef = null;
    return jef;
  }
  
  public List getExecuteJcdList(Page page, String gonghao, int bumenid, JcdSearchForm jcdsearchform) {
    List list = new ArrayList();
    Manageitem manageitem = this.manageItemDao
      .findManageItemById(OimsCategoryConfig.MANAGEITEM_ID_ZIDONGPAIDUIPEIZHI);
    if ((manageitem != null && !manageitem.isState()) || (
      manageitem != null && 
      !"1".equals(manageitem.getVals()))) {
      System.out.println("提取执行检查单数据不关联排队表(高级查询)");
      list = this.dao.getExecuteJcdNoPaiduiList(page, gonghao, 
          jcdsearchform);
    } else {
      System.out.println("提取执行检查单数据关联排队表(高级查询)");
    } 
    convert(page, list);
    return list;
  }
  
  public List getJcdListByJcdSearchForm(Page page, JcdSearchForm jcdsearchform) {
    List list = new ArrayList();
    list = this.dao.getJcdListByJcdSearchForm(page, jcdsearchform);
    convert(page, list);
    return list;
  }
  
  public List getJcdListByJcdSearchFormPaidui(Page page, JcdSearchForm jcdsearchform) {
    List list = new ArrayList();
    list = this.dao.getJcdListByJcdSearchFormPaidui(page, jcdsearchform);
    convert(page, list);
    return list;
  }
  
  public List getDengJiJcdList(Page page, String gonghao, int bumenid, JcdSearchForm jsf) {
    List list = new ArrayList();
    list = this.dao.getDengJiJcdList(page, gonghao, bumenid, jsf);
    List daiDengjiJcdList = filterDengJiJcdList(page, list);
    convert(page, daiDengjiJcdList);
    return daiDengjiJcdList;
  }
  
  public Map<String, Object> findJcdsByPageAndJcdAndHuanZheXinXi(Page page, JcdSearchForm jcd, HuanZheXinXi huanzhexinxi, Integer haveBaogao) {
    Map<String, Object> map = new HashMap<>();
    map.put("list", this.dao.findJcdsByPageAndJcdAndHuanZheXinXi(page, jcd, 
          huanzhexinxi, haveBaogao));
    map.put("page", page);
    return map;
  }

  @Override
  public List<Map> getHzxxJcsjList(Long hzid, Integer jcxmId) {
    List list = this.dao.getHzxxJcsjList(hzid, jcxmId);
    Iterator itr = list.iterator();
    while (itr.hasNext()) {
      Map map = (Map) itr.next();
      String jsrq = null;
      if (map.get("jsrq") != null) {
        Date jsrqDate = (Date) map.get("jsrq");
        jsrq = new SimpleDateFormat("yyyy-MM-dd").format(jsrqDate);
        map.put("jsrq", jsrq);
      }
    }
    return list;
  }
  
  public List<Map> getHuanzheJcsjList(Long hzid, Integer jcxmId) {
    List list = this.dao.getHuanzheJcsjList(hzid, jcxmId);
    List<Map> jsrqList = new ArrayList<>();
    Iterator<Date> itr = list.iterator();
    while (itr.hasNext()) {
      Date jsrqDate = itr.next();
      String jsrq = null;
      if (jsrqDate != null)
        jsrq = (new SimpleDateFormat("yyyy-MM-dd")).format(jsrqDate); 
      Map<Object, Object> map = new HashMap<>();
      map.put("jsrq", jsrq);
      int x = jsrqList.indexOf(map);
      if (x == -1)
        jsrqList.add(map); 
    } 
    return jsrqList;
  }
  
  public List getHuanzheJcjgList(String realPath, String vPath, String saveDirectory, Long hzid, int jcxmid, String date) {
    List list = new ArrayList();
    List jcdList = this.dao.getHuanzheJcdList(hzid, jcxmid, date);
    Iterator<Jcd> itr = jcdList.iterator();
    while (itr.hasNext()) {
      Jcd jcd = itr.next();
      Long jiuzhenId = jcd.getJiuzhenId();
      Long jcdid = jcd.getId();
      String picRealPath = String.valueOf(realPath) + hzid + File.separator + jiuzhenId + 
        File.separator + jcdid + File.separator + "thumb";
      String picVPath = String.valueOf(vPath) + hzid + "/" + jiuzhenId + "/" + jcdid;
      List l = getJcdFileListNormal(picRealPath, picVPath, saveDirectory);
      if (l.size() > 0)
        list.addAll(l); 
    } 
    return list;
  }
  
  public List getHuanzhePDFJcjgList(String realPath, String vPath, Long hzid, int jcxmid, String date) {
    List list = new ArrayList();
    List jcdList = this.dao.getHuanzheJcdList(hzid, jcxmid, date);
    Iterator<Jcd> itr = jcdList.iterator();
    while (itr.hasNext()) {
      Jcd jcd = itr.next();
      Long jiuzhenId = jcd.getJiuzhenId();
      Long jcdid = jcd.getId();
      List l = getJcdPDFList(jcdid, hzid, jiuzhenId, realPath, vPath);
      if (l.size() > 0)
        list.addAll(l); 
    } 
    return list;
  }
  
  private List getJcdFileListNormal(String picRealPath, String picVPath, String saveDirectory) {
    List fileList = new ArrayList();
    List jcdList = FileUtils.getPhotoAndFlvFileList(picRealPath, String.valueOf(picVPath) + 
        saveDirectory);
    if (jcdList.size() > 0)
      fileList.addAll(jcdList); 
    return fileList;
  }
  
  public List getFinishHuanzheJcxmListByHzid(Long hzid) {
    List list = this.dao.getFinishHuanzheJcxmListByHzid(hzid);
    return list;
  }
  
  public List getFinishHzxxJcxmByHzidAndDateList(Long hzid, String date) {
    return this.dao.getFinishHzxxJcxmByHzidAndDateList(hzid, date);
  }
  
  public List getFinishHuanzheJcxmByHzidAndDateList(Long hzid, String date) {
    return this.dao.getFinishHuanzheJcxmByHzidAndDateList(hzid, date);
  }
  
  public Jcd getJcdByHzidAndJiuzhenIdAndJcxmId(Long huanzheId, Long jiuzhenId, Integer jcxmId) {
    List<Jcd> list = this.dao.getJcdByHzidAndJiuzhenIdAndJcxmId(huanzheId, 
        jiuzhenId, jcxmId);
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  public List<Jcd> getJcdListByJcxmidAndDate(Long hzid, Date date, int jcxmid) {
    return this.dao.getJcdListByJcxmidAndDate(hzid, date, jcxmid);
  }
  
  public List getJcdFileList(Long jcdid, Long huanzheid, Long jiuzhenid, String realPath, String vPath) {
    List list = new ArrayList();
    realPath = String.valueOf(realPath) + System.getProperty("file.separator") + huanzheid + 
      System.getProperty("file.separator") + jiuzhenid + 
      System.getProperty("file.separator") + jcdid + 
      System.getProperty("file.separator") + "thumb";
    vPath = String.valueOf(vPath) + "/" + huanzheid + "/" + jiuzhenid + "/" + jcdid + 
      "/thumb";
    return FileUtils.getPhotoAndFlvFileList(realPath, vPath);
  }
  
  public List getJcdPDFList(Long jcdid, Long huanzheid, Long jiuzhenid, String realPath, String vPath) {
    List list = new ArrayList();
    realPath = String.valueOf(realPath) + System.getProperty("file.separator") + huanzheid + 
      System.getProperty("file.separator") + jiuzhenid + 
      System.getProperty("file.separator") + jcdid;
    vPath = String.valueOf(vPath) + File.separator + huanzheid + File.separator + jiuzhenid + 
      File.separator + jcdid;
    return getPDFList(realPath, vPath);
  }
  
  public List<String> getPDFList(String realPath, String vPath) {
    List<String> list = new ArrayList<>();
    File folder = new File(realPath);
    if (!folder.exists() || !folder.isDirectory())
      return list; 
    File[] files = folder.listFiles();
    if (files.length < 1)
      return list; 
    byte b;
    int i;
    File[] arrayOfFile1;
    for (i = (arrayOfFile1 = files).length, b = 0; b < i; ) {
      File file = arrayOfFile1[b];
      String fileName = file.getName();
      if (fileName.lastIndexOf(".") != -1 && 
        fileName.substring(fileName.lastIndexOf("."))
        .equalsIgnoreCase(".PDF")) {
        System.out.println(fileName);
        list.add(String.valueOf(vPath) + File.separator + fileName);
      } 
      b++;
    } 
    return list;
  }
  
  public Map<String, Object> findJcdByPage(Page p) {
    Map<Object, Object> map = new HashMap<>();
    List list = this.dao.findJCDByPage(p);
    map.put("list", list);
    map.put("page", p);
    return (Map)map;
  }
  
  private List filterDengJiJcdList(Page page, List list) {
    List<Map> daiDengjiJcdList = new ArrayList<>();
    Iterator<Map> itr = list.iterator();
    int rowsCount = page.getRowsCount().intValue();
    while (itr.hasNext()) {
      Map map = itr.next();
      if (map.get("id") != null) {
        String jcdid = map.get("id").toString();
        Paidui paidui = this.paiduiDao.findPaiduiById(Long.valueOf(Long.parseLong(jcdid)));
        if (paidui == null) {
          daiDengjiJcdList.add(map);
          continue;
        } 
        rowsCount--;
      } 
    } 
    page.setRowsCount(Integer.valueOf(rowsCount));
    return daiDengjiJcdList;
  }
  
  private void convert(Page page, List list) {
    Iterator itr = list.iterator();
    int i = (page.getCurrentPage().intValue() - 1) * page.getPageSize().intValue() + 1;
    while (itr.hasNext()) {
      Map map = (Map) itr.next();
      map.put("paihao", Integer.valueOf(i));
      i++;
      if (map.get("biaoshi") != null) {
        int biaoshi = Integer.parseInt(map.get("biaoshi").toString());
        Category category = this.categoryDao.findCategoryById(Integer.valueOf(biaoshi));
        if (category != null) {
          map.put("biaoshi", category.getCategory());
        } else {
          map.put("biaoshi", "");
        } 
      } 
      if (map.get("kdysgh") != null) {
        String kdys = map.get("kdysgh").toString();
        YuanGong yuangong = this.yuanGongDao.obtainYuanGongByGonghao(kdys);
        if (yuangong != null) {
          map.put("kdys", yuangong.getXingming());
        } else {
          map.put("kdys", "");
        } 
      } 
      if (map.get("kdsj") != null) {
        String kdsj = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"))
          .format(map.get("kdsj"));
        map.put("kdsj", kdsj);
      } 
      if (map.get("jssj") != null) {
        String jssj = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"))
          .format(map.get("jssj"));
        map.put("jssj", jssj);
      } 
      if (map.get("yb") != null) {
        int yanbie = Integer.parseInt(map.get("yb").toString());
        Category category = this.categoryDao.findCategoryById(Integer.valueOf(yanbie));
        if (category != null) {
          map.put("yanbie", category.getCategory());
        } else {
          map.put("yanbie", "");
        } 
      } 
      if (map.get("yaoqiu") != null) {
        String yaoqius = map.get("yaoqiu").toString();
        map.put("yaoqiu", yaoqius);
      } 
      if (map.get("csrq") != null) {
        String csrq = (new SimpleDateFormat("yyyy-MM-dd")).format(map
            .get("csrq"));
        map.put("csrq", csrq);
        map.put("nianling", CommonFunction.getNianlingByCsrq(csrq));
      } else {
        map.put("csrq", "");
        map.put("nianling", "");
      } 
      if (map.get("hzxb") != null) {
        boolean xb = ((Boolean)map.get("hzxb")).booleanValue();
        String xbstr = xb ? "男" : "女";
        map.put("hzxb", xbstr);
      } 
      if (map.get("sfzh") == null)
        map.put("sfzh", " "); 
      if (map.get("jfbsflag") != null) {
        boolean jfbs = ((Boolean)map.get("jfbsflag")).booleanValue();
        String jfbsstr = jfbs ? "已缴费" : "未缴费";
        map.put("jfbs", jfbsstr);
      } 
    } 
  }
  
  public Jcd getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(Long huanzheId, Long jiuzhenId, Integer jcxmId) {
    List<Jcd> list = this.dao.getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(huanzheId, 
        jiuzhenId, jcxmId);
    System.out.println(list.size());
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  public Long getMaxJcdId() {
    return this.dao.getMaxJcdId();
  }
  
  @Transactional
  public void deleteJcd(Jcd jcd) {
    this.dao.deleteJcd(jcd);
  }
  
  public List getListOfWatchJcdByJcdSearchForm(JcdSearchForm jcdsearchform) {
    List list = this.dao.getListOfWatchJcdByJcdSearchForm(jcdsearchform);
    List<Map> maps = new ArrayList<>();
    Iterator<Date> iterator = list.iterator();
    while (iterator.hasNext()) {
      Date jcjsTime = iterator.next();
      String jcjsDate = "";
      if (jcjsTime != null)
        jcjsDate = (new SimpleDateFormat("yyyy-MM-dd")).format(jcjsTime); 
      Map<Object, Object> map = new HashMap<>();
      map.put("jcjsDate", jcjsDate);
      maps.add(map);
    } 
    return maps;
  }
  
  public List<Map<String, Object>> findJCDInfoByjcdhForCapture(String jcdh) {
    List<Map<String, Object>> list = this.dao.findJCDInfoByjcdhForCapture(jcdh);
    for (Map<String, Object> map : list) {
      if (map.get("kdsj") != null) {
        String kdsj = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"))
          .format(map.get("kdsj"));
        map.put("kdsj", kdsj);
        System.out.println(kdsj);
      } 
      if (map.get("shengri") != null) {
        String csrq = (new SimpleDateFormat("yyyy-MM-dd")).format(map
            .get("shengri"));
        map.put("csrq", csrq);
        map.put("nianling", CommonFunction.getNianlingByCsrq(csrq));
      } else {
        map.put("csrq", "");
        map.put("nianling", "0");
      } 
      if (map.get("xingbie") != null) {
        boolean xb = ((Boolean)map.get("xingbie")).booleanValue();
        String xbstr = xb ? "男" : "女";
        map.put("hzxb", xbstr);
      } 
    } 
    return list;
  }
  
  public Jcd findJcdByJCDH(String jcdh) {
    return this.dao.findJcdByJCDH(jcdh);
  }
  
  public List<Jcd> findJcdByHuanzheId(long huanzheid) {
    return this.dao.findJcdByHuanzheId(huanzheid);
  }
  
  public Map getTreatResult(String patientId) {
    Map<String, Object> map = new HashMap<>();
    List list1 = this.eyeldcxService.getTreatResult(patientId);
    List list2 = this.eyejgzlService.getTreatResult(patientId);
    map.put("ldcx", list1);
    map.put("jgzl", list2);
    return map;
  }
}
