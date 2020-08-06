package cn.com.oims.service.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.common.XLSHead;
import cn.com.oims.dao.IBaoGaoRelationDao;
import cn.com.oims.dao.ICategoryDao;
import cn.com.oims.dao.IDiquDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJiBingDao;
import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.ITJDao;
import cn.com.oims.dao.IYuanGongDao;
import cn.com.oims.dao.pojo.Category;
import cn.com.oims.dao.pojo.Diqu;
import cn.com.oims.service.ITJService;
import cn.com.oims.utils.XlsTool;
import cn.com.oims.web.form.BlTjForm;
import cn.com.oims.web.form.DiseaseForm;
import cn.com.oims.web.form.HzTjForm;
import cn.com.oims.web.form.TJForm;
import cn.com.oims.web.form.TongJiForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.Vector;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TJServiceImpl implements ITJService {
  @Autowired
  private IBaoGaoRelationDao baoGaoRelationDao;
  
  @Autowired
  private IYuanGongDao yuanGongDao;
  
  @Autowired
  private IJiuzhenDao jiuzhenDao;
  
  @Autowired
  private ICategoryDao categoryDao;
  
  @Autowired
  private IJiBingDao jibingDao;
  
  private ITJDao dao;
  
  @Autowired
  private IHuanZheXinXiDao huanZheXinXiDao;
  
  @Autowired
  private IDiquDao diquDao;
  
  @Autowired
  private IJzjlDao jzjlDao;
  
  @Autowired
  public void setDao(ITJDao dao) {
    this.dao = dao;
  }
  
  public List<Map<String, Object>> chart(TJForm f) {
    return this.dao.chart(f);
  }
  
  public List<Map<String, Object>> chartEx(TJForm f) {
    if (f.getFindEx().trim().length() > 0) {
      String[] ss = f.getFindEx().split(" ");
      String rt = "";
      byte b;
      int i;
      String[] arrayOfString1;
      for (i = (arrayOfString1 = ss).length, b = 0; b < i; ) {
        String tmp = arrayOfString1[b];
        char cs = (char)(int)Long.parseLong(tmp.replace(",", ""));
        rt = String.valueOf(rt) + cs;
        b++;
      } 
      Utils.tLog(rt, String.valueOf(getClass().getSimpleName()) + ".chartEx$rt");
      f.setFindEx(rt);
    } 
    return this.dao.chartEx(f);
  }
  
  public static void main(String[] args) {
    String s = "104 122 46 100 105 113 117 60 102 103 62 21271 20140";
    String[] ss = s.split(" ");
    String rt = "";
    byte b;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = ss).length, b = 0; b < i; ) {
      String tmp = arrayOfString1[b];
      char cs = (char)(int)Long.parseLong(tmp);
      rt = String.valueOf(rt) + cs;
      b++;
    } 
    System.out.println(rt);
  }
  
  public Map<String, Object> list(TJForm f, Page page) {
    Map<String, Object> m = new HashMap<>(2);
    m.put("list", this.dao.list(f, page));
    m.put("page", page);
    return m;
  }
  
  public List<Map<String, Object>> pro(TJForm f) {
    return this.dao.pro(f);
  }
  
  public Vector<XLSHead> headVector(TJForm f) {
    if (Utils.strIsEmpty(f.getTjlx()))
      throw new RuntimeException("TJService.headVector not tjlx param"); 
    Vector<XLSHead> vector = getHead(f);
    return vector;
  }
  
  private Vector<XLSHead> getHead(TJForm f) {
    Vector<XLSHead> v = new Vector<>();
    if (f.getTjlx().equals("hz")) {
      v.add(new XLSHead("id", "患者id"));
      v.add(new XLSHead("xingming", "姓名"));
      v.add(new XLSHead("sfzh", "身份证号"));
      v.add(new XLSHead("shouji", "患者手机"));
      v.add(new XLSHead("shengri", "生日", "date"));
      v.add(new XLSHead("xingbie", "性别", "bool", "男", "女"));
      v.add(new XLSHead("binglihao", "病历号"));
      v.add(new XLSHead("diqu", "地区"));
      v.add(new XLSHead("zcrq", "注册日期", "date"));
      v.add(new XLSHead("laiyuan", "来源"));
    } else if (f.getTjlx().equals("jcd")) {
      v.add(new XLSHead("id", "检查单id"));
      v.add(new XLSHead("jcdh", "检查单号"));
      v.add(new XLSHead("jcTime", "检查时间", "date"));
      v.add(new XLSHead("hzName", "患者姓名"));
      v.add(new XLSHead("jcys", "检查医生"));
      v.add(new XLSHead("jcxm", "检查项目"));
      v.add(new XLSHead("yb", "眼别"));
      v.add(new XLSHead("jczt", "状态"));
      v.add(new XLSHead("kdTime", "开单时间", "date"));
      v.add(new XLSHead("jcsb", "检查设备"));
    } else if (f.getTjlx().equals("zd")) {
      v.add(new XLSHead("zdmc", "病名"));
      v.add(new XLSHead("zdys", "诊断医生"));
      v.add(new XLSHead("zdsj", "诊断时间", "date"));
      v.add(new XLSHead("ghdh", "就诊id"));
    } 
    return v;
  }
  
  public List<Map<String, Object>> findYuanGongByBumen(String bumenId) {
    return this.dao.findYuanGongByBumen(bumenId);
  }
  
  public List<Map<String, Object>> findSheBieByBumen(String bumenId, String bgsId) {
    return this.dao.findSheBieByBumen(bumenId, bgsId);
  }
  
  public List<Map<String, Object>> tjBaoGaoNumByDoctor(TongJiForm form) {
    List<Map<String, Object>> list = this.baoGaoRelationDao
      .groupDoctorByTongJiForm(form);
    for (Map<String, Object> map : list)
      map.put("searchData", form); 
    return list;
  }
  
  public Map<String, Object> tjBaoGaoNumByJcxm(TongJiForm form) {
    Map<String, Object> mapResult = new HashMap<>();
    List<Map<String, Object>> list = this.baoGaoRelationDao
      .groupJcxmByTongJiForm(form);
    List<String> jcxmName = new ArrayList<>();
    for (Map<String, Object> map : list)
      jcxmName.add(map.get("name").toString()); 
    mapResult.put("xAxis", jcxmName);
    mapResult.put("seriesData", list);
    return mapResult;
  }
  
  public Map<String, Object> tjBaoGaoNumAndJcxm(TongJiForm form) {
    Map<String, Object> mapResult = new HashMap<>();
    List<Map<String, Object>> listJcxm = this.baoGaoRelationDao
      .groupJcxmByTongJiForm(form);
    List<Map<String, Object>> listGongHao = this.baoGaoRelationDao
      .groupYuanGongByTongJiForm(form);
    List<Map<String, Object>> data = new ArrayList<>();
    for (int i = 0; i < listJcxm.size(); i++) {
      Map<String, Object> map = new HashMap<>();
      map.put("name", ((Map)listJcxm.get(i)).get("name").toString());
      List<Map<String, Object>> list = new ArrayList<>();
      for (Map<String, Object> yg : listGongHao) {
        Map<String, Object> mapList = new HashMap<>();
        mapList.put("name", yg.get("name").toString());
        form.setJcxms(((Map)listJcxm.get(i)).get("jcxmId").toString());
        form.setDoctors(yg.get("gonghao").toString());
        Long num = this.baoGaoRelationDao.getCountByTongJiForm(form);
        mapList.put("y", num);
        list.add(mapList);
      } 
      map.put("data", list);
      data.add(map);
    } 
    mapResult.put("columnData", data);
    return mapResult;
  }
  
  public void expBaoGaoCountByTongJiForm(String propertiesFile, String execelFile, TongJiForm form) {
    WritableWorkbook wbe = null;
    try {
      Workbook wb = Workbook.getWorkbook(new FileInputStream(execelFile));
      wbe = Workbook.createWorkbook(new File(execelFile), wb);
      tjBaoGaoCountByTongJiForm(propertiesFile, wbe, form);
    } catch (BiffException e) {
      e.printStackTrace();
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        wbe.write();
        wbe.close();
      } catch (WriteException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      } 
    } 
  }
  
  public void tjBaoGaoCountByTongJiForm(String propertiesFile, WritableWorkbook wbe, TongJiForm form) {
    TongJiForm jcxmForm = new TongJiForm();
    jcxmForm.setDoctors(form.getDoctors());
    jcxmForm.setfTime1(form.getfTime1());
    jcxmForm.setfTime2(form.getfTime2());
    jcxmForm.setJcxms(form.getJcxms());
    jcxmForm.setTimeType(form.getTimeType());
    Properties props = Utils.getProps(propertiesFile);
    List<Map<String, Object>> listGongHao = this.baoGaoRelationDao
      .groupYuanGongByTongJiForm(form);
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < listGongHao.size(); i++) {
      Map<Integer, Boolean> mapBool = new HashMap<>();
      jcxmForm.setDoctors(((Map)listGongHao.get(i)).get("gonghao").toString());
      List<Map<String, Object>> listJcxm = this.baoGaoRelationDao.groupJcxmByTongJiForm(jcxmForm);
      for (Map<String, Object> jcxm : listJcxm) {
        form.setDoctors(((Map)listGongHao.get(i)).get("gonghao").toString());
        form.setJcxms(jcxm.get("jcxmId").toString());
        String str = (String)props.get(jcxm.get("jcxmId").toString());
        String[] cells = new String[0];
        if (str != null) {
          cells = str.split(",");
        } else {
          System.out.println("jcxmId:" + jcxm.get("jcxmId") + " 未找到相应的配置！");
          continue;
        } 
        if (cells.length > 0) {
          byte b;
          int j;
          String[] arrayOfString;
          for (j = (arrayOfString = cells).length, b = 0; b < j; ) {
            Long count;
            String cell = arrayOfString[b];
            String[] param = cell.split("_");
            int sheet = ((param[0] == null) ? null : 
              Integer.valueOf(Integer.parseInt(param[0]))).intValue();
            int cel = ((param[1] == null) ? null : 
              Integer.valueOf(Integer.parseInt(param[1]))).intValue();
            int startRow = ((param[2] == null) ? null : 
              Integer.valueOf(Integer.parseInt(param[2]))).intValue();
            if (map.get(Integer.valueOf(sheet - 1)) == null)
              map.put(Integer.valueOf(sheet - 1), Integer.valueOf(startRow)); 
            String sqlKey = "";
            String sql = "";
            if (param.length > 3)
              sqlKey = param[3]; 
            if (sqlKey != null && !sqlKey.isEmpty())
              sql = (String)props.get(sqlKey); 
            if (sql != null && !sql.isEmpty()) {
              count = this.baoGaoRelationDao
                .getBaoGaoCountByProperties(sql, form);
            } else {
              count = this.baoGaoRelationDao
                .getBaoGaoCountByProperties(form);
            } 
            Utils.modifyExcel(wbe, sheet - 1, cel - 1, (
                (Integer)map.get(Integer.valueOf(sheet - 1))).intValue() - 1, count.intValue(), (
                (Map)listGongHao.get(i)).get("name").toString(), 
                mapBool);
            b++;
          } 
        } 
      } 
      Set<Integer> set = mapBool.keySet();
      for (Integer integer : set) {
        if (((Boolean)mapBool.get(integer)).booleanValue())
          map.put(integer, Integer.valueOf(((Integer)map.get(integer)).intValue() + 1)); 
      } 
    } 
  }
  
  public List<Map<String, Object>> tjJiuZhenNumByTongJi(TongJiForm form) {
    List<Map<String, Object>> jiuZhenData = new ArrayList<>();
    List<Category> categoriesList = new ArrayList<>();
    List<Category> categories = this.categoryDao.findCategorysByFather(Integer.valueOf(26));
    for (Category category : categories) {
      System.out.println(category.getId());
      List<Category> li = this.categoryDao.findCategorysByFather(category.getId());
      for (Category category2 : li)
        categoriesList.add(category2); 
    } 
    List<Map<String, Object>> ygs = this.jiuzhenDao.groupDoctorByTongJiForm(form);
    for (Category category : categoriesList) {
      Map<String, Object> map = new HashMap<>();
      map.put("name", category.getCategory());
      List<Map<String, Object>> list = new ArrayList<>();
      for (Map<String, Object> yg : ygs) {
        Map<String, Object> jiuzhenMap = new HashMap<>();
        form.setMzDoctors(yg.get("gonghao").toString());
        long num = this.jiuzhenDao.groupJiuZhen(form, category.getId()).longValue();
        jiuzhenMap.put("y", Long.valueOf(num));
        jiuzhenMap.put("name", yg.get("name"));
        list.add(jiuzhenMap);
      } 
      map.put("data", list);
      jiuZhenData.add(map);
    } 
    return jiuZhenData;
  }
  
  public List<Map<String, Object>> tjBLFinishNumByTongJi(TongJiForm form) {
    List<Map<String, Object>> blData = new ArrayList<>();
    List<Map<String, Object>> ygs = this.jiuzhenDao.groupDoctorByTongJiForm(form);
    Map<String, Object> finishMap = new HashMap<>();
    finishMap.put("name", "已完成");
    Map<String, Object> noFinishMap = new HashMap<>();
    noFinishMap.put("name", "未完成");
    List<Map<String, Object>> list = new ArrayList<>();
    List<Map<String, Object>> noList = new ArrayList<>();
    for (Map<String, Object> yg : ygs) {
      Map<String, Object> blMap = new HashMap<>();
      form.setMzDoctors(yg.get("gonghao").toString());
      long num = this.jiuzhenDao.groupBLFinish(form).longValue();
      blMap.put("y", Long.valueOf(num));
      blMap.put("name", yg.get("name"));
      list.add(blMap);
      Map<String, Object> noMap = new HashMap<>();
      long sum = this.jiuzhenDao.groupJiuZhen(form, null).longValue();
      noMap.put("y", Long.valueOf(sum - num));
      noMap.put("name", yg.get("name"));
      noList.add(noMap);
    } 
    finishMap.put("data", list);
    blData.add(finishMap);
    noFinishMap.put("data", noList);
    blData.add(noFinishMap);
    return blData;
  }
  
  public List<Map<String, Object>> groupJcdStrateByTongJiForm(TongJiForm form) {
    return this.dao.groupJcdStrateByTongJiForm(form);
  }
  
  public List<Map<String, Object>> groupJcdTypeByTongJiForm(TongJiForm form) {
    return this.dao.groupJcdTypeByTongJiForm(form);
  }
  
  public List<Map<String, Object>> groupCheckDoctorByTongJiForm(TongJiForm form) {
    List<Map<String, Object>> list = this.dao.groupCheckDoctorByTongJiForm(form);
    return list;
  }
  
  public List<Map<String, Object>> groupCheckJcxmByTongJiForm(TongJiForm form) {
    List<Map<String, Object>> list = this.dao.groupCheckJcxmByTongJiForm(form);
    return list;
  }
  
  public List<Map<String, Object>> groupCheckDeviceByTongJiForm(TongJiForm form) {
    return this.dao.groupCheckDeviceByTongJiForm(form);
  }
  
  public List<Map<String, Object>> tjDiseaseByDiseaseForm(DiseaseForm form) {
    List<Map<String, Object>> list = this.jibingDao.tjDiseaseTop10ByDiseaseForm(form);
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < list.size(); i++) {
      builder.append(((Map)list.get(i)).get("jzzdId"));
      if (i != list.size() - 1)
        builder.append(","); 
    } 
    Map<String, Object> map = new HashMap<>();
    map.put("name", "其他");
    map.put("y", Long.valueOf(this.jibingDao.tjDiseaseOtherByDiseaseForm(builder.toString(), form)));
    list.add(map);
    return list;
  }
  
  public Map<String, Object> tjPersonalTJ(String gonghao, Date parse, Date parse2) {
    Map<String, Object> map = new HashMap<>();
    map.put("mz", Integer.valueOf(this.dao.getPersonalMzQuantity("28,29,94", gonghao, parse, parse2)));
    map.put("jc", getPersonJcQuantity(gonghao, parse, parse2));
    map.put("ss", this.dao.getPersonalSsQuantity(gonghao, MultiUtils.getStartTimeOfDay(parse), MultiUtils.getEndTimeOfDay(parse2)));
    return map;
  }
  
  private List<Map<String, Object>> getPersonJcQuantity(String gonghao, Date parse, Date parse2) {
    Map<String, Object> mapResult = new HashMap<>();
    TongJiForm tjf = new TongJiForm();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    tjf.setfTime1(sdf.format(parse));
    tjf.setfTime2(sdf.format(parse2));
    tjf.setTimeType("sj");
    tjf.setDoctors(gonghao);
    List<Map<String, Object>> listJcxm = this.baoGaoRelationDao
      .groupJcxmByTongJiForm(tjf);
    List<Map<String, Object>> data = new ArrayList<>();
    for (int i = 0; i < listJcxm.size(); i++) {
      Map<String, Object> map = new HashMap<>();
      map.put("name", ((Map)listJcxm.get(i)).get("name").toString());
      tjf.setJcxms(((Map)listJcxm.get(i)).get("jcxmId").toString());
      Long num = this.baoGaoRelationDao.getCountByTongJiForm(tjf);
      map.put("data", num);
      data.add(map);
    } 
    mapResult.put("columnData", data);
    return data;
  }
  
  public void exportMzysExecel(String tempFile, TongJiForm form) {
    OutputStream os = null;
    try {
      os = new FileOutputStream(tempFile);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } 
    List<List<String>> list = new ArrayList<>();
    List<String> headList = new ArrayList<>();
    headList.add("姓名");
    headList.add("接诊数");
    headList.add("未接诊数");
    headList.add("填写病例数");
    headList.add("完成数");
    headList.add("复查数");
    list.add(headList);
    List<Map<String, Object>> listData = this.jiuzhenDao.groupJiuZhenFzysByTongJiForm(form);
    for (Map<String, Object> map : listData) {
      List<String> tempList = new ArrayList<>();
      tempList.add(map.get("fzysName").toString());
      tempList.add(map.get("jzs").toString());
      tempList.add(map.get("dzs").toString());
      tempList.add(map.get("txbls").toString());
      tempList.add(map.get("wcs").toString());
      tempList.add(map.get("fcs").toString());
      list.add(tempList);
    } 
    XlsTool.createXlsOS(os, list);
  }
  
  public List<Map<String, Object>> tjXingBieByJiBingId(String jiBingId) {
    List<Map<String, Object>> list = this.jiuzhenDao.tjXingBieByJiBingId(jiBingId);
    for (Map<String, Object> map : list) {
      System.out.print(map.get("sex"));
      if (map.get("sex").toString().equals("false")) {
        map.put("name", "女");
        continue;
      } 
      if (map.get("sex").toString().equals("true"))
        map.put("name", "男"); 
    } 
    return list;
  }
  
  public List<Map<String, Object>> tjdrugDictByJiBingId(String jiBingId) {
    List<Map<String, Object>> list = this.jiuzhenDao.tjdrugDictTop10ByJiBingId(jiBingId);
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < list.size(); i++) {
      builder.append(((Map)list.get(i)).get("yaopinId"));
      if (i != list.size() - 1)
        builder.append(","); 
    } 
    Map<String, Object> map = new HashMap<>();
    map.put("name", "其他");
    map.put("y", Long.valueOf(this.jiuzhenDao.tjdrugDictOtherByJiBingId(builder.toString(), jiBingId)));
    list.add(map);
    return list;
  }
  
  public List<Map<String, Object>> tjJiuZhenAgeByJiBingId(String jiBingId, List<Map<String, Object>> list) {
    List<Map<String, Object>> maps = new ArrayList<>();
    for (int i = 0; i < list.size(); i++) {
      Map<String, Object> tempMap = list.get(i);
      String startAge = tempMap.get("startDate").toString();
      String endAge = tempMap.get("endDate").toString();
      Map<String, Object> map = new HashMap<>();
      long count = this.jiuzhenDao.getCountByJiBingIdAndJiuZhenAge(jiBingId, startAge, endAge);
      map.put("y", Long.valueOf(count));
      map.put("name", String.valueOf(startAge) + "-" + endAge + "第" + i + "年龄段");
      maps.add(map);
    } 
    return maps;
  }
  
  public List<Map<String, Object>> tjHuanZheXinXiByHzTjForm(HzTjForm hzTjForm) {
    List<Map<String, Object>> listMaps = new ArrayList<>();
    if (hzTjForm.getDiquIds().isEmpty())
      hzTjForm.setDiquIds("0"); 
    List<Diqu> list = this.diquDao.findDiqus(Integer.valueOf(Integer.parseInt(hzTjForm.getDiquIds())));
    for (Diqu diqu : list) {
      Map<String, Object> map = new HashMap<>();
      map.put("name", diqu.getName());
      System.out.println(getRecursionDiQuId(diqu.getId()));
      hzTjForm.setDiquIds(getRecursionDiQuId(diqu.getId()));
      map.put("y", this.huanZheXinXiDao.getHzxxCountByHzTjForm(hzTjForm));
      listMaps.add(map);
    } 
    return listMaps;
  }
  
  private String getRecursionDiQuId(Integer diquId) {
    StringBuilder sb = new StringBuilder();
    sb.append(diquId);
    List<Diqu> list = this.diquDao.findDiqus(diquId);
    for (Diqu diqu : list)
      sb.append("," + getRecursionDiQuId(diqu.getId())); 
    return sb.toString();
  }
  
  public List<List<String>> showWenZhenByBlTjForm(BlTjForm form) {
    return findWenZhenByBlTjForm(form);
  }
  
  public void exportWenZhenExcel(String tmpFile, BlTjForm form) {
    List<List<String>> data = findWenZhenByBlTjForm(form);
    OutputStream os = null;
    try {
      os = new FileOutputStream(tmpFile);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } 
    XlsTool.createXlsOS(os, data);
  }
  
  private List<List<String>> findWenZhenByBlTjForm(BlTjForm form) {
    List<List<String>> list = new ArrayList<>();
    List<String> title = new ArrayList<>();
    title.add("类型");
    title.add("未完成");
    title.add("完成");
    title.add("总量");
    list.add(title);
    List<Map<String, Object>> listMap = selBljlByBlTjForm(
        30001, form);
    for (Map<String, Object> map : listMap) {
      List<String> tmp = new ArrayList<>();
      tmp.add(map.get("category").toString());
      tmp.add(map.get("ncomp").toString());
      tmp.add(map.get("comp").toString());
      tmp.add(map.get("total").toString());
      list.add(tmp);
    } 
    return list;
  }
  
  private List<Map<String, Object>> selBljlByBlTjForm(int categoryIds, BlTjForm form) {
    List<Map<String, Object>> listMap = new ArrayList<>();
    List<Category> list = this.categoryDao
      .findCategorysByFather(Integer.valueOf(categoryIds));
    for (Category category : list) {
      Map<String, Object> map = new HashMap<>();
      map.put("category", category.getCategory());
      map.put("total", this.jiuzhenDao.getJiuZhenNumByCategoryId(form));
      map.put("comp", this.jiuzhenDao.getJzjlNumByCategoryId(category
            .getId().toString(), form));
      map.put("ncomp", 
          Long.valueOf(Long.parseLong((map.get("total") == null) ? "0" : map.get(
                "total").toString()) - 
            Long.parseLong((map.get("comp") == null) ? "0" : 
              map.get("comp").toString())));
      listMap.add(map);
    } 
    return listMap;
  }
  
  public List<List<String>> showZKJCByBlTjForm(BlTjForm form) {
    return findZKJCByTjForm(form);
  }
  
  public void exportZKJCExcel(String tmpFile, BlTjForm form) {
    List<List<String>> data = findZKJCByTjForm(form);
    OutputStream os = null;
    try {
      os = new FileOutputStream(tmpFile);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } 
    XlsTool.createXlsOS(os, data);
  }
  
  private List<List<String>> findZKJCByTjForm(BlTjForm form) {
    List<List<String>> list = new ArrayList<>();
    List<String> title = new ArrayList<>();
    title.add("类型");
    title.add("未完成");
    title.add("完成");
    title.add("总量");
    list.add(title);
    int jiuZhenNum = this.jiuzhenDao.getJiuZhenNumByCategoryId(form).intValue();
    List<String> shiliTmp = new ArrayList<>();
    shiliTmp.add("视力");
    int shiliNum = this.jiuzhenDao.getShiLiNumByTlTjForm(form).intValue();
    shiliTmp.add((new StringBuilder(String.valueOf(jiuZhenNum - shiliNum))).toString());
    shiliTmp.add((new StringBuilder(String.valueOf(shiliNum))).toString());
    shiliTmp.add((new StringBuilder(String.valueOf(jiuZhenNum))).toString());
    list.add(shiliTmp);
    List<String> yanyaTmp = new ArrayList<>();
    yanyaTmp.add("眼压");
    int yanyaNum = this.jiuzhenDao.getYanYaNumByTlTjForm(form).intValue();
    yanyaTmp.add((new StringBuilder(String.valueOf(jiuZhenNum - yanyaNum))).toString());
    yanyaTmp.add((new StringBuilder(String.valueOf(yanyaNum))).toString());
    yanyaTmp.add((new StringBuilder(String.valueOf(jiuZhenNum))).toString());
    list.add(yanyaTmp);
    List<Category> categorys = this.categoryDao
      .findCategorysByFather(Integer.valueOf(30002));
    for (Category category : categorys) {
      int fatherId = category.getId().intValue();
      List<Category> tmpCategorys = this.categoryDao
        .findCategorysByFather(Integer.valueOf(fatherId));
      for (Category category2 : tmpCategorys) {
        List<String> tmp = new ArrayList<>();
        tmp.add(category2.getCategory());
        int jzjlNum = this.jiuzhenDao.getJzjlNumByCategoryId(category2
            .getId().toString(), form).intValue();
        tmp.add((new StringBuilder(String.valueOf(jiuZhenNum - jzjlNum))).toString());
        tmp.add((new StringBuilder(String.valueOf(jzjlNum))).toString());
        tmp.add((new StringBuilder(String.valueOf(jiuZhenNum))).toString());
        list.add(tmp);
      } 
    } 
    return list;
  }
  
  public List<List<String>> showJzZhenDuanByBlTjForm(BlTjForm form) {
    return findJzZhenDuanByBlTjForm(form);
  }
  
  public void exportJzZhenDuanExcel(String tmpFile, BlTjForm form) {
    List<List<String>> data = findJzZhenDuanByBlTjForm(form);
    OutputStream os = null;
    try {
      os = new FileOutputStream(tmpFile);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } 
    XlsTool.createXlsOS(os, data);
  }
  
  private List<List<String>> findJzZhenDuanByBlTjForm(BlTjForm form) {
    List<List<String>> list = new ArrayList<>();
    List<String> title = new ArrayList<>();
    title.add("类型");
    title.add("未完成");
    title.add("完成");
    title.add("总量");
    list.add(title);
    int jiuZhenNum = this.jiuzhenDao.getJiuZhenNumByCategoryId(form).intValue();
    List<String> jzzdTmp = new ArrayList<>();
    jzzdTmp.add("诊断");
    int jzzdNum = this.jiuzhenDao.getJzZhenNumDuanByTlTjForm(form).intValue();
    jzzdTmp.add((new StringBuilder(String.valueOf(jiuZhenNum - jzzdNum))).toString());
    jzzdTmp.add((new StringBuilder(String.valueOf(jzzdNum))).toString());
    jzzdTmp.add((new StringBuilder(String.valueOf(jiuZhenNum))).toString());
    list.add(jzzdTmp);
    return list;
  }
  
  public List<List<String>> showChuZhiByBlTjForm(BlTjForm form) {
    return findChuZhiByBlTjForm(form);
  }
  
  public void exportChuZhiExcel(String tmpFile, BlTjForm form) {
    List<List<String>> data = findChuZhiByBlTjForm(form);
    OutputStream os = null;
    try {
      os = new FileOutputStream(tmpFile);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } 
    XlsTool.createXlsOS(os, data);
  }
  
  private List<List<String>> findChuZhiByBlTjForm(BlTjForm form) {
    List<List<String>> list = new ArrayList<>();
    List<String> title = new ArrayList<>();
    title.add("类型");
    title.add("未完成");
    title.add("完成");
    title.add("总量");
    list.add(title);
    int chuZhiNum = this.jiuzhenDao.getJiuZhenNumByCategoryId(form).intValue();
    List<String> chuZhiTmp = new ArrayList<>();
    chuZhiTmp.add("处置");
    int jzzdNum = this.jiuzhenDao.getSuifangNumDuanByTlTjForm(form).intValue();
    chuZhiTmp.add((new StringBuilder(String.valueOf(chuZhiNum - jzzdNum))).toString());
    chuZhiTmp.add((new StringBuilder(String.valueOf(jzzdNum))).toString());
    chuZhiTmp.add((new StringBuilder(String.valueOf(chuZhiNum))).toString());
    list.add(chuZhiTmp);
    return list;
  }
  
  public void exportMzysExecel(String tempFile, String mzgzltj, String blwctj) {
    OutputStream os = null;
    try {
      os = new FileOutputStream(tempFile);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } 
    List<List<String>> list = new ArrayList<>();
    List<String> headList = new ArrayList<>();
    headList.add("姓名");
    headList.add("待诊数");
    headList.add("接诊数");
    headList.add("复查数");
    headList.add("病历填写数量");
    headList.add("病历完成数量");
    headList.add("总数");
    list.add(headList);
    JSONArray data0 = JSONArray.fromObject(mzgzltj);
    JSONArray data1 = JSONArray.fromObject(blwctj);
    JSONArray wjcData = data0.getJSONObject(0).getJSONArray("data");
    JSONArray ghData = data0.getJSONObject(1).getJSONArray("data");
    JSONArray fzData = data0.getJSONObject(2).getJSONArray("data");
    JSONArray ywcData = data0.getJSONObject(3).getJSONArray("data");
    JSONArray jzzData = data0.getJSONObject(4).getJSONArray("data");
    for (int i = 0; i < wjcData.size(); i++) {
      List<String> result = new ArrayList<>();
      JSONObject obj = wjcData.getJSONObject(i);
      result.add(obj.getString("name"));
      int a = obj.getInt("y") + ghData.getJSONObject(i).getInt("y");
      result.add((new StringBuilder(String.valueOf(a))).toString());
      int b = fzData.getJSONObject(i).getInt("y");
      int c = ywcData.getJSONObject(i).getInt("y") + jzzData.getJSONObject(i).getInt("y");
      result.add((new StringBuilder(String.valueOf(c))).toString());
      result.add((new StringBuilder(String.valueOf(b))).toString());
      result.add((new StringBuilder(String.valueOf(b + c))).toString());
      int d = data1.getJSONObject(0).getJSONArray("data").getJSONObject(i).getInt("y");
      result.add((new StringBuilder(String.valueOf(d))).toString());
      result.add((new StringBuilder(String.valueOf(a + b + c))).toString());
      list.add(result);
    } 
    XlsTool.createXlsOS(os, list);
  }
}
