package cn.com.oims.service.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.*;
import cn.com.oims.dao.pojo.*;
import cn.com.oims.service.IBingliService;
import cn.com.oims.service.IEMRService;
import cn.com.oims.service.IShiLiService;
import cn.com.oims.utils.JsonUtil;
import cn.com.oims.web.form.BingliForm;
import cn.com.oims.web.form.HuanZheSearchExForm;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BingliServiceImpl implements IBingliService {
  IBingliDao bingliDao;
  
  IHuanZheXinXiDao huanzheDao;
  
  @Autowired
  private IHuanZheXinXiDao patientDao;
  
  @Autowired
  private IDoctorsWorkstationDao doctorsWorkstationDao;
  
  @Autowired
  private IYuanGongDao yuanGongDao;
  
  @Autowired
  private IJzjlDao jzjlDao;
  
  @Autowired
  private IShiLiDao shiLiDao;
  
  @Autowired
  private IShiLiService shiLiService;
  
  @Autowired
  private IEMRService iemrService;
  
  @Autowired
  private IJiuzhenDao jiuzhenDao;
  
  @Autowired
  public void setBingliDao(IBingliDao bingliDao) {
    this.bingliDao = bingliDao;
  }
  
  @Autowired
  public void setHuanzheDao(IHuanZheXinXiDao huanzheDao) {
    this.huanzheDao = huanzheDao;
  }
  
  @Override
  public Map<String, Object> findBy(BingliForm bl, Page p) {
    Map<String, Object> rt = new HashMap<String, Object>(0);
    Map<Long, Map<String, Object>> tmp2 = null;
    List<HuanZheXinXi> hs = this.bingliDao.findByXmOrBl(bl, p);
    tmp2 = findBy(hs);
    hs = this.bingliDao.findByZd(bl, p);
    tmp2.putAll(findBy(hs));
    rt.put("list", tmp2.values());
    p.setRowsCount(Integer.valueOf(tmp2.size()));
    p.init();
    rt.put("page", p);
    return rt;
  }
  
  private Map<Long, Map<String, Object>> findBy(List<HuanZheXinXi> hs) {
    Map<Long, Map<String, Object>> tmp = new HashMap<Long, Map<String, Object>>(0);
    Map<Long, Map<String, Object>> tmp2 = new HashMap<Long, Map<String, Object>>(0);
    if (hs == null || hs.size() <= 0) {
      return tmp2;
    }
    for (HuanZheXinXi h : hs) {
      Map<String, Object> m = new HashMap<String, Object>(0);
      m.put("xingming", h.getXingming());
      m.put("shengri", h.getShengri());
      m.put("xingbie", Boolean.valueOf(h.isXingbie()));
      m.put("binglihao", h.getBinglihao());
      m.put("id", h.getId());
      tmp.put(h.getId(), m);
    } 
    Utils.tLog((new StringBuilder(String.valueOf(tmp.size()))).toString(), "患者数量");
    List<Map<String, Object>> jiuzheCs = this.bingliDao.findJzCs(hs);
    Utils.tLog((new StringBuilder(String.valueOf(jiuzheCs.size()))).toString(), "患者就诊次数");
    for (Map<String, Object> m : jiuzheCs) {
      ((Map)tmp.get(m.get("huanzheId"))).put("cs", m.get("cs"));
      String category = this.bingliDao.getLastCategory((Long)m.get("huanzheId"));
      if (category == null) {
        tmp.remove(m.get("huanzheId"));
        Utils.tLog(m.get("huanzheId").toString(), "移除患者");
        continue;
      } 
      tmp.get(m.get("huanzheId")).put("category", category);
      tmp2.put((Long)m.get("huanzheId"), tmp.get(m.get("huanzheId")));
      Utils.tLog(m.get("huanzheId").toString(), "添加患者");
    } 
    return tmp2;
  }
  
  @Override
  public Map<String, Object> findByCategory(BingliForm bl, Page p) {
    if (bl == null || bl.getCategory() == null) {
      throw new RuntimeException(getClass() + ".findByCategory\t参数异常");
    }
    Map<Long, Map<String, Object>> tmp2 = null;
    List<HuanZheXinXi> hs = this.bingliDao.findByZdId(bl, p);
    tmp2 = findBy(hs);
    Map<String, Object> rt = new HashMap<String, Object>(0);
    rt.put("list", tmp2.values());
    p.setRowsCount(Integer.valueOf(tmp2.size()));
    p.init();
    rt.put("page", p);
    return rt;
  }
  
  @Override
  public Map<String, Object> findEx(HuanZheSearchExForm from, Page p) {
    List<Map<String, Object>> hzm = this.bingliDao.getHuanZheXinXiListByPage(p, from);
    List<Long> hzids = new ArrayList<Long>(0);
    for (Map<String, Object> m : hzm) {
      hzids.add((Long)m.get("id"));
    }
    List<HuanZheXinXi> hs = this.bingliDao.findEx(hzids, p);
    Map<String, Object> rt = new HashMap<String, Object>(0);
    Map<Long, Map<String, Object>> tmp2 = null;
    tmp2 = findBy(hs);
    rt.put("list", tmp2.values());
    p.setRowsCount(Integer.valueOf(tmp2.size()));
    p.init();
    rt.put("page", p);
    return rt;
  }
  
  @Override
  public List<Map<String, Object>> findEx4Export(HuanZheSearchForm hzf) {
    List<Map<String, Object>> hs = this.bingliDao.findHuanZheBySearchForm(hzf);
    return hs;
  }
  
  @Override
  public List<Map<String, Object>> findByCategory4Exprot(Long categoryId) {
    return this.bingliDao.findByCategory4Exprot(categoryId);
  }
  
  @Override
  public List<Map<String, Object>> findBy4Exprot(String categoryId) {
    List<Map<String, Object>> list = this.bingliDao.findBy4Exprot(categoryId);
//    for (Map<String, Object> map : list) {
//      Long jiuzhenId = Long.valueOf(Long.parseLong(map.get("id").toString()));
//      Jiuzhen jz = this.jiuzhenDao.findJiuzhenById(jiuzhenId);
//      ShiLi o = this.shiLiDao.getShiliByJiuzhenId(jiuzhenId);
//      StringBuffer sb_l = new StringBuffer("");
//      if (o != null) {
//        if (o.getLj() != null) {
//          sb_l.append("近视力").append("(" + this.shiLiService.getShiLiValue(o.getLj().floatValue()) + ")、");
//        }
//        if (o.getLjz() != null) {
//          sb_l.append("矫正视力").append("(" + this.shiLiService.getShiLiValue(o.getLjz().floatValue()) + ")、");
//        }
//        if (o.getLl() != null) {
//          sb_l.append("裸眼视力").append("(" + this.shiLiService.getShiLiValue(o.getLl().floatValue()) + ")、");
//        }
//        if (o.getLedtrs() != null && !o.getLedtrs().equals(new Integer(0))) {
//          sb_l.append("EDTRS").append("(" + this.shiLiService.getShiLiValue(o.getLedtrs().intValue()) + ")、");
//        }
//        StringBuffer sb_r = new StringBuffer("");
//        if (o.getRj() != null) {
//          sb_r.append("近视力").append("(" + this.shiLiService.getShiLiValue(o.getRj().floatValue()) + ")、");
//        }
//        if (o.getRjz() != null) {
//          sb_r.append("矫正视力").append("(" + this.shiLiService.getShiLiValue(o.getRjz().floatValue()) + ")、");
//        }
//        if (o.getRl() != null) {
//          sb_r.append("裸眼视力").append("(" + this.shiLiService.getShiLiValue(o.getRl().floatValue()) + ")、");
//        }
//        if (o.getRedtrs() != null && !o.getRedtrs().equals(new Integer(0))) {
//          sb_r.append("EDTRS").append("(" + this.shiLiService.getShiLiValue(o.getRedtrs().intValue()) + ")、");
//        }
//        map.put("shili_od", sb_r.toString());
//        map.put("shili_os", sb_l.toString());
//      } else {
//        map.put("shili_od", "");
//        map.put("shili_os", "");
//      }
//      Map<String, Object> handle_map = this.iemrService
//        .findCombineChuZhi(jiuzhenId);
//      Set<String> set = handle_map.keySet();
//      for (String s : set) {
//        map.put(s, handle_map.get(s));
//      }
//      map.put("age", Integer.valueOf(DateUtils.calculateAge(jz.getCaozuoTime(), (Date)map.get("shengri"))));
//    }
    return list;
  }
  
  @Override
  public Map<String, Object> findBySeach(BingliForm bl, Page p) {
    Map<String, Object> rt = new HashMap<String, Object>(0);
    long t0 = System.currentTimeMillis();
    List<Map<String, Object>> list = this.bingliDao.findBySeach(bl, p);
    long t1 = System.currentTimeMillis();
    System.out.println("新方法查询时间:" + (t1 - t0));
    Iterator<Map<String, Object>> itr = list.iterator();
    while (itr.hasNext()) {
      Map<String, Object> map = itr.next();
      Long patientId = (Long)map.get("id");
      List jbList = this.bingliDao.findPatientZhenduan(patientId);
      map.put("disease", jbList);
    } 
    rt.put("list", list);
    rt.put("page", p);
    long t2 = System.currentTimeMillis();
    System.out.println("新方法查询时间合计:" + (t2 - t0));
    return rt;
  }
  
  public Map<String, Object> findBySeachOld(BingliForm bl, Page p) {
    Map<String, Object> rt = new HashMap<String, Object>(0);
    long t0 = System.currentTimeMillis();
    List<Map<String, Object>> list = this.bingliDao.findBySeachOld(bl, p);
    System.out.println("老方法查询时间:" + (System.currentTimeMillis() - t0));
    List<Map<String, Object>> targetList = new ArrayList<Map<String, Object>>();
    Iterator<Map<String, Object>> itr = list.iterator();
    while (itr.hasNext()) {
      Map<String, Object> map = itr.next();
      Long patientId = (Long)map.get("id");
      List jbList = this.bingliDao.findPatientZhenduan(patientId);
      map.put("disease", jbList);
      targetList.add(map);
    } 
    long t2 = System.currentTimeMillis();
    rt.put("list", targetList);
    rt.put("page", p);
    list = null;
    long t1 = System.currentTimeMillis();
    System.out.println("老方法查询时间合计:" + (t1 - t0));
    return rt;
  }
  
  @Override
  public Map<String, Object> findByCategory2(BingliForm bl, Page p) {
    Map<String, Object> rt = new HashMap<String, Object>(0);
    rt.put("list", this.bingliDao.findByCategory2(bl, p));
    rt.put("page", p);
    return rt;
  }
  
  @Override
  public Map<String, Object> findBySeachEx(HuanZheSearchExForm bl, Page p) {
    List<Map<String, Object>> rt = this.bingliDao.findBySeachEx(bl, p);
    Map<String, Object> r = new HashMap<String, Object>(0);
    r.put("list", rt);
    r.put("page", p);
    return r;
  }
  
  @Override
  public JSONObject getDiagnosisPatientInfo(String patientId) {
    Jiuzhen visit = this.bingliDao.getDiagnosisPatientVisitInfo(patientId);
    if (visit != null) {
      SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      HuanZheXinXi patient = this.patientDao.findHuanZheById(visit.getHuanzheId());
      ShiLi vision = this.doctorsWorkstationDao.getVisionByVisitId(visit.getId().toString());
      YanYa iop = this.doctorsWorkstationDao.getIopByVisitId(visit.getId().toString());
      YuanGong employee = this.yuanGongDao.obtainYuanGongByGonghao(visit.getFzys());
      String endTime = formater.format(visit.getCaozuoTime());
      List<Jiuzhen> history = this.doctorsWorkstationDao.getRecordsOfHistory(patient.getId().toString(), endTime, visit.getId(), visit.getFzys());
      JSONArray visitArr = new JSONArray();
      JSONObject visitObj = new JSONObject();
      visitObj.put("id", visit.getId());
      visitObj.put("doctorName", employee.getXingming());
      visitObj.put("state", visit.getState());
      visitObj.put("zhenbie", visit.getZhenbie());
      visitObj.put("date", formater.format(visit.getCaozuoTime()));
      List<Jzjl> records = this.jzjlDao.findJzjlByJiuzhenid(visit.getId().longValue());
      visitObj.put("records", (records == null) ? "[]" : records);
      visitObj.put("serialNo", visit.getSerialNo());
      visitArr.add(visitObj);
      if (history != null) {
        for (Jiuzhen historyRecord : history) {
          JSONObject historyRecordObj = new JSONObject();
          YuanGong employeeHistory = this.yuanGongDao.obtainYuanGongByGonghao(historyRecord.getFzys());
          historyRecordObj.put("id", historyRecord.getId());
          historyRecordObj.put("doctorName", employeeHistory.getXingming());
          historyRecordObj.put("state", historyRecord.getState());
          historyRecordObj.put("date", formater.format(historyRecord.getCaozuoTime()));
          historyRecordObj.put("serialNo", visit.getSerialNo());
          visitArr.add(historyRecordObj);
        }
      }
      JSONObject patientObj = JSONObject.fromObject(patient, JsonUtil.toJsonDateForamt("yyyy-MM-dd"));
      patientObj.put("visit", visitArr);
      if (vision != null) {
        patientObj.put("vision", vision);
      }
      if (iop != null) {
        patientObj.put("iop", iop);
      }
      return patientObj;
    } 
    return null;
  }
  
  @Override
  public List<Jiuzhen> findJiuzhenListByPatientIdAndJibingId(Long patientId, Integer jibingId) {
    return this.bingliDao.findPatientJiuzheByJiBingId(patientId, jibingId);
  }
}
