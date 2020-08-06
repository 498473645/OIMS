package cn.com.oims.service.impl;

import cn.com.oims.dao.IOimsDataDao;
import cn.com.oims.dao.pojo.Baogao;
import cn.com.oims.dao.pojo.BaogaoMoban;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.dao.pojo.ShuruMoban;
import cn.com.oims.dao.pojo.User;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.service.IOimsDataService;
import cn.com.oims.web.form.BaogaoXinxiSearchForm;
import cn.com.oims.web.form.BgMbSearchForm;
import cn.com.oims.web.form.HzXxSearchForm;
import cn.com.oims.web.form.JcXmSearchForm;
import cn.com.oims.web.form.JcdSearchForm;
import cn.com.oims.web.form.SheBeiSearchForm;
import cn.com.oims.web.form.SrMbSearchForm;
import cn.com.oims.web.form.UserSearchForm;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OimsDataServiceImpl implements IOimsDataService {
  IOimsDataDao dao = null;
  
  public IOimsDataDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IOimsDataDao dao) {
    this.dao = dao;
  }
  
  public List<Map<String, Object>> getUserInfoList(UserSearchForm usf) {
    List<Map<String, Object>> list = null;
    list = this.dao.getUserInfoList(usf);
    for (Map<String, Object> m : list) {
      if (((Boolean)m.get("qiyong")).booleanValue()) {
        m.put("qiyong", "启用");
        continue;
      } 
      m.put("qiyong", "禁用");
    } 
    return list;
  }
  
  public List<Map<String, Object>> getSheBeiInfoList(SheBeiSearchForm usf) {
    List<Map<String, Object>> list = this.dao.getSheBeiInfoList(usf);
    for (Map<String, Object> m : list) {
      if (((Boolean)m.get("qiyong")).booleanValue()) {
        m.put("qiyong", "启用");
      } else {
        m.put("qiyong", "禁用");
      } 
      if (((Boolean)m.get("online")).booleanValue()) {
        m.put("online", "连接");
        continue;
      } 
      m.put("online", "未连接");
    } 
    return list;
  }
  
  public List<Map<String, Object>> getHuanZheInfoList(HzXxSearchForm usf) {
    List<Map<String, Object>> list = this.dao.getHuanZheInfoList(usf);
    for (Object o : list) {
      Map<String, Object> map = (Map<String, Object>)o;
      if (((Boolean)map.get("xingbie")).booleanValue()) {
        map.put("xingbie", "男");
      } else {
        map.put("xingbie", "女");
      } 
      if (((Boolean)map.get("yibao")).booleanValue()) {
        map.put("yibao", "是");
      } else {
        map.put("yibao", "否");
      } 
      if (((Boolean)map.get("gongfei")).booleanValue()) {
        map.put("gongfei", "是");
      } else {
        map.put("gongfei", "否");
      } 
      if (((Boolean)map.get("shangbao")).booleanValue()) {
        map.put("shangbao", "是");
        continue;
      } 
      map.put("shangbao", "否");
    } 
    return list;
  }
  
  public List<Map<String, Object>> getJcXmInfoList(JcXmSearchForm usf) {
    List<Map<String, Object>> list = new ArrayList();
    list = this.dao.getJcXmInfoList(usf);
    return list;
  }
  
  public List<Map<String, Object>> getSrMbInfoList(SrMbSearchForm usf) {
    return this.dao.getSrMbInfoList(usf);
  }
  
  public List<Map<String, Object>> getBgMbInfoList(BgMbSearchForm usf) {
    return this.dao.getBgMbInfoList(usf);
  }
  
  public List<Map<String, Object>> getJcdInfoList(JcdSearchForm usf) {
    List<Map<String, Object>> list = this.dao.getJcdInfoList(usf);
    for (Object o : list) {
      Map<String, Object> map = (Map<String, Object>)o;
      if (((Boolean)map.get("jfbs")).booleanValue()) {
        map.put("jfbs", "是");
        continue;
      } 
      map.put("jfbs", "否");
    } 
    return list;
  }
  
  public List<Map<String, Object>> getbgxxInfoList(BaogaoXinxiSearchForm usf) {
    return this.dao.getbgxxInfoList(usf);
  }
  
  public List getDoctorHasCheckList(int s) {
    return this.dao.getDoctorHasCheckList(s);
  }
  
  public List getBuMenBaoGaoInfo() {
    return this.dao.getBuMenBaoGaoInfo();
  }
  
  public List<SheBei> getSheBeisInBuMen(String s) {
    return this.dao.getSheBeisInBuMen(s);
  }
  
  public List getJcxmsInSheBei(String s) {
    return this.dao.getJcxmsInSheBei(s);
  }
  
  public List<User> getUserList(User s) {
    return this.dao.getUserList(s);
  }
  
  public List<YuanGong> getYuanGongList(YuanGong s) {
    return this.dao.getYuanGongList(s);
  }
  
  public List<BuMen> getBuMenList(BuMen s) {
    return this.dao.getBuMenList(s);
  }
  
  public List<SheBei> getSheBeiList(SheBei s) {
    return this.dao.getSheBeiList(s);
  }
  
  public List<HuanZheXinXi> getHuanZheXinXiList(HuanZheXinXi s) {
    return this.dao.getHuanZheXinXiList(s);
  }
  
  public List<Jcxm> getJcXmiList(Jcxm s) {
    return this.dao.getJcxmList(s);
  }
  
  public List<Jcd> getJcdList(Jcd s) {
    return this.dao.getJcdList(s);
  }
  
  public List<Baogao> getBaogaoList(Baogao s) {
    return this.dao.getBaogaoList(s);
  }
  
  public List<ShuruMoban> getSrMbiList(ShuruMoban s) {
    return this.dao.getShuruMobanList(s);
  }
  
  public List<OimsLog> getOimsLogiList(OimsLog s) {
    return this.dao.getOimsLogList(s);
  }
  
  public List<BaogaoMoban> getBaogaoMobaniList(BaogaoMoban s) {
    return this.dao.getBaogaoMobanList(s);
  }
}
