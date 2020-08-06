package cn.com.oims.dao.impl;

import cn.com.oims.dao.IJcdDao;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jcxm;
import cn.com.oims.web.form.JcdSearchForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class JcdDaoImpl extends BaseDaoImpl implements IJcdDao {
  private String countHql = "select count(*) from Jcd j";
  
  private String clazzName = Jcd.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Jcd.class);
  }
  
  @Override
  public int counts() {
    int i = ((Integer)this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0)).intValue();
    return i;
  }
  
  @Override
  public List<Jcd> findAllJcd4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), p.getStartRow().intValue(), 
        p.getPageSize().intValue());
  }
  
  @Override
  public List<Jcd> findAllJcd() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public Serializable saveJcd(Jcd o) {
    return this.hibernateTemplate.save(o);
  }
  
  @Override
  public void delJcd(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public void saveOrUpdateJcd(Jcd o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  @Override
  public Jcd findJcdById(Serializable id) {
    return (Jcd)this.hibernateTemplate.get(Jcd.class, id);
  }
  
  @Override
  public void updateJcd(Jcd jcd) {
    this.hibernateTemplate.update(jcd);
  }
  
  @Override
  public boolean isBumenByIdToJcd(Integer id) {
    String hql = "from Jcd j where (j.kdksId = " + id + " or j.jcksId=" + 
      id + ")";
    List list = this.hibernateTemplate.find(hql);
    return (list.size() > 0);
  }
  
  @Override
  public boolean isYuanGongByGonghaoToJcd(String gonghao) {
    String hql = "from Jcd j where (j.kdys = '" + gonghao + "' or j.jcys='" + 
      gonghao + "')";
    List list = this.hibernateTemplate.find(hql);
    return (list.size() > 0);
  }
  
  @Override
  public List<Jcd> findJcdByHuanzheId(long huanzheid) {
    String hql = " from Jcd j where j.huanzheId=" + huanzheid;
    List<Jcd> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public List getOneWJCjcd(int jcsbid, int bgsid) {
    String jcxmsql = getJcxmIdsByJcsbid(jcsbid);
    Map<String, Date> map = new HashMap<String, Date>();
    map.put("startTime", MultiUtils.getStartTimeOfDay());
    map.put("endTime", MultiUtils.getEndTimeOfDay());
    String hql = "select new map(h.binglihao as binglihao,h.xingming as xingming,h.xingbie as xingbie,h.id as huanzheId,h.shengri as shengri,j.id as jcdid,j.jiuzhenId as jiuzhenId,j.jcxmIds as jcxmIds,j.biaoti as jcxmmc,j.yanbie as yanbie) from Jcd j,HuanZheXinXi h,Paidui p where h.id=j.huanzheId and j.id=p.jcdId and p.officeId=" + 
      
      bgsid + 
      " and j.biaoshi=" + 
      '2' + 
      " and j.jcxmIds in (" + 
      jcxmsql + 
      ") and p.addTime between :startTime and :endTime";
    List list = findList(hql, map);
    return list;
  }
  
  @Override
  public List getOneExcuteJcdByJcdid(String jcdid, int officeid, String gonghao) {
    String factorSql = " 1=1 and j.huanzheId=h.id and j.id='" + jcdid + "'";
    String hql = "select new map(h.binglihao as binglihao,h.xingming as xingming,h.xingbie as xingbie,h.shengri as shengri,h.shouji as shouji,j.id as jcdid,j.biaoti as jcxmmc,j.jiuzhenId as jiuzhenId,j.yanbie as yanbie,j.jcyq as yaoqiu) from Jcd j,HuanZheXinXi h where " + 
      
      factorSql;
    return this.hibernateTemplate.find(hql);
  }
  
  private String getJcxmIdsByManagerUser(String gonghao) {
    String jcxmidsStr = "";
    String hql = "select s.jcxmIds from SheBei s where s.manageUser='" + 
      gonghao + "'";
    List<String> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      jcxmidsStr = list.get(0);
    }
    return jcxmidsStr;
  }
  
  @Override
  public List getExecuteJcdNoPaiduiList(Page page, String gonghao, JcdSearchForm jcdsearchform) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = getQueryCondition(jcdsearchform, map);
    String hql_count = "select count(j.id) from Jcd j,YuanGong y,HuanZheXinXi h,Jiuzhen jz where h.id=j.huanzheId and jz.id=j.jiuzhenId and j.kdys=y.gonghao and " + 
      
      factorSql;
    String hql_map = "select new map(h.binglihao as binglihao,h.xingming as hzxm,h.xingbie as hzxb,h.shengri as csrq,h.sfzh as sfzh,h.shouji as shouji,j.id as id,j.huanzheId as huanzheid,j.jiuzhenId as jiuzhenid,j.jcdh as jcdh,j.biaoti as jcxmmc,y.xingming as xingming,j.biaoshi as biaoshi,j.kdTime as kdsj,j.jcjsTime as jssj,j.yanbie as yanbie,j.jcyq as yaoqiu) from  Jcd j,YuanGong y,HuanZheXinXi h,Jiuzhen jz where h.id=j.huanzheId and jz.id=j.jiuzhenId and j.kdys=y.gonghao and " + 
      
      factorSql;
    if (!map.isEmpty()) {
      page.setRowsCount(Integer.valueOf(counts(hql_count, map)));
    } else {
      page.setRowsCount(Integer.valueOf(count(hql_count)));
    } 
    page.init();
    List list = new ArrayList();
    if (!map.isEmpty()) {
      list = getListForPage(hql_map, page.getStartRow().intValue(), 
          page.getPageSize().intValue(), map);
    } else {
      list = getListForPage(hql_map, page.getStartRow().intValue(), 
          page.getPageSize().intValue());
    } 
    return list;
  }
  
  public List getDaijianJcdList(Page page, JcdSearchForm jsf) {
    jsf.setJcys(null);
    List list = new ArrayList();
    Map<String, Date> map = new HashMap<String, Date>();
    String factorStr = page.getFactor();
    String[] factor = factorStr.split(",");
    int biaoshi = Integer.parseInt(factor[0]);
    int jcsbid = 0;
    if (!"null".equals(factor[1])) {
      jcsbid = Integer.parseInt(factor[1]);
    }
    String jcxmids = getJcxmIdsByJcsbid(jcsbid);
    String[] jcxmId = jcxmids.split(",");
    String hql = "select new map(h.binglihao as binglihao,h.xingming as hzxm,h.xingbie as hzxb,h.shengri as csrq,h.sfzh as sfzh,h.shouji as shouji,j.id as id,j.huanzheId as huanzheid,j.jiuzhenId as jiuzhenid,j.jcdh as jcdh,j.biaoti as jcxmmc,j.biaoshi as biaoshi,j.kdTime as kdsj,j.jcjsTime as jssj,j.yanbie as yanbie,j.jcyq as yaoqiu,y.xingming as xingming) from Jcd j,Paidui p, YuanGong y,HuanZheXinXi h,Jiuzhen jz where p.jcdId=j.id and j.huanzheId=h.id and jz.id=j.jiuzhenId and j.kdys=y.gonghao and j.biaoshi=" + 
      
      biaoshi;
    hql = String.valueOf(hql) + " and (";
    int i = 0;
    byte b;
    int j;
    String[] arrayOfString1;
    for (j = (arrayOfString1 = jcxmId).length, b = 0; b < j; ) {
      String xmId = arrayOfString1[b];
      if (i > 0) {
        hql = String.valueOf(hql) + " or ";
      }
      hql = String.valueOf(hql) + "j.jcxmIds like '" + xmId + "' " + "or j.jcxmIds like '" + 
        xmId + ",%'" + "or j.jcxmIds like '%," + xmId + ",%'" + 
        "or j.jcxmIds like '%," + xmId + "'";
      i++;
      b++;
    } 
    hql = String.valueOf(hql) + ")";
    hql = String.valueOf(hql) + " and " + getQueryCondition(jsf, map);
    if (!map.isEmpty()) {
      page.setRowsCount(Integer.valueOf(counts(
              "select count(*) " + hql.substring(hql.indexOf("from")), 
              map)));
      page.init();
      list = getListForPage(String.valueOf(hql) + " order by p.xuhao,j.id", 
          page.getStartRow().intValue(), page.getPageSize().intValue(), map);
    } else {
      page.setRowsCount(Integer.valueOf(counts("select count(*) " + 
              hql.substring(hql.indexOf("from")))));
      page.init();
      list = getListForPage(String.valueOf(hql) + " order by p.xuhao,j.id", 
          page.getStartRow().intValue(), page.getPageSize().intValue());
    } 
    return list;
  }
  
  @Override
  public List getExecuteJcdList(Page page, String gonghao, int officeid, JcdSearchForm jsf) {
    return getDaijianJcdList(page, jsf);
  }
  
  @Override
  public List getDengJiJcdList(Page page, String gonghao, int officeid, JcdSearchForm jsf) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorStr = page.getFactor();
    String[] factor = factorStr.split(",");
    int biaoshi = Integer.parseInt(factor[0]);
    String hql = "";
    String factorSql = getQueryCondition(jsf, map);
    String jcxmids = getJcxmStrToSheBeiByBmid(officeid);
    if (!"".equals(jcxmids)) {
      factorSql = String.valueOf(factorSql) + " and (";
      int i = 0;
      byte b;
      int j;
      String[] arrayOfString;
      for (j = (arrayOfString = jcxmids.split(",")).length, b = 0; b < j; ) {
        String xmId = arrayOfString[b];
        if (i > 0) {
          factorSql = String.valueOf(factorSql) + " or ";
        }
        factorSql = String.valueOf(factorSql) + "j.jcxmIds like '" + xmId + "' " + 
          "or j.jcxmIds like '" + xmId + ",%'" + 
          "or j.jcxmIds like '%," + xmId + ",%'" + 
          "or j.jcxmIds like '%," + xmId + "'";
        i++;
        b++;
      } 
      factorSql = String.valueOf(factorSql) + ")";
    } else {
      factorSql = String.valueOf(factorSql) + " and 1=0 ";
    } 
    factorSql = String.valueOf(factorSql) + " and j.biaoshi=" + biaoshi + " order by j.kdTime desc";
    int size = 0;
    if (!map.isEmpty()) {
      size = 
        counts(String.valueOf(this.countHql) + 
          " ,Jiuzhen jz,YuanGong y,HuanZheXinXi h where  h.id=j.huanzheId and j.jiuzhenId=jz.id and j.kdys=y.gonghao and " + 
          factorSql, map);
    } else {
      size = 
        count(String.valueOf(this.countHql) + 
          " ,Jiuzhen jz,YuanGong y,HuanZheXinXi h where  h.id=j.huanzheId and j.jiuzhenId=jz.id and j.kdys=y.gonghao and " + 
          factorSql);
    } 
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    hql = "select new map(h.binglihao as binglihao,h.xingming as hzxm,h.xingbie as hzxb,h.shengri as csrq,h.sfzh as sfzh,h.shouji as shouji,h.dianhua as dianhua,j.id as id,j.huanzheId as huanzheid,j.jiuzhenId as jiuzhenid,j.jcdh as jcdh,j.biaoti as jcxmmc,j.kdys as kdysgh,j.kdksId as kdksId,y.xingming as xingming,j.jcxmIds as jcxmIds, j.biaoshi as biaoshi,j.kdTime as kdsj,j.jcjsTime as jssj,j.yanbie as yb,j.jcyq as yaoqiu,j.jfbs as jfbsflag,jz.haoma as haoma,jz.zhenbie as zhenbie) from Jcd j,Jiuzhen jz,YuanGong y ,HuanZheXinXi h where j.huanzheId=h.id and j.jiuzhenId=jz.id and j.kdys=y.gonghao and " + 
      
      factorSql;
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List list = null;
    if (!map.isEmpty()) {
      list = getListForPage(hql, startRow, pageSize, map);
    } else {
      list = getListForPage(hql, startRow, pageSize);
    } 
    return list;
  }
  
  @Override
  public List getJcdListByJcdSearchForm(Page page, JcdSearchForm jcdsearchform) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = getQueryCondition(jcdsearchform, map);
    String hql_count = "select count(j.id) from Jcd j,YuanGong y,HuanZheXinXi h,Jiuzhen jz where h.id=j.huanzheId and jz.id=j.jiuzhenId and j.kdys=y.gonghao and " + 
      
      factorSql;
    String hql_map = "select new map(h.binglihao as binglihao,h.xingming as hzxm,h.xingbie as hzxb,h.shengri as csrq,h.sfzh as sfzh,h.shouji as shouji,j.id as id,j.huanzheId as huanzheid,j.jiuzhenId as jiuzhenid,j.jcdh as jcdh,j.biaoti as jcxmmc,y.xingming as xingming,j.biaoshi as biaoshi,j.state as state,j.kdTime as kdsj,j.jcjsTime as jssj,j.jcxmIds as jcxmIds,j.jcksId as jcksId,j.id as jcdid,j.jfbs as jfbs,jz.zhenbie as zb,h.id as huanzheId,j.yanbie as yanbie,j.jcyq as yaoqiu) from  Jcd j,YuanGong y,HuanZheXinXi h,Jiuzhen jz where h.id=j.huanzheId and jz.id=j.jiuzhenId and j.kdys=y.gonghao and " + 
      
      factorSql;
    if (jcdsearchform.getBiaoshi() != null && 
      !jcdsearchform.getBiaoshi().isEmpty()) {
      if (jcdsearchform.getBiaoshi().indexOf(",") == -1 && (Integer.parseInt(jcdsearchform.getBiaoshi()) == 50 || Integer.parseInt(jcdsearchform.getBiaoshi()) == 53)) {
        hql_map = String.valueOf(hql_map) + " order by j.kdTime ";
      } else {
        hql_map = String.valueOf(hql_map) + " order by j.jcksTime desc";
      }
    }
    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + hql_map);
    if (!map.isEmpty()) {
      page.setRowsCount(Integer.valueOf(counts(hql_count, map)));
    } else {
      page.setRowsCount(Integer.valueOf(count(hql_count)));
    } 
    page.init();
    List list = new ArrayList();
    if (!map.isEmpty()) {
      list = getListForPage(hql_map, page.getStartRow().intValue(), 
          page.getPageSize().intValue(), map);
    } else {
      list = getListForPage(hql_map, page.getStartRow().intValue(), 
          page.getPageSize().intValue());
    } 
    return list;
  }
  
  @Override
  public List getJcdListByJcdSearchFormPaidui(Page page, JcdSearchForm jcdsearchform) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = getQueryCondition(jcdsearchform, map);
    factorSql = String.valueOf(factorSql) + " order by  j.kdTime desc";
    String hql_count = "select count(j.id) from Jcd j,YuanGong y,HuanZheXinXi h,Paidui p,Jiuzhen jz where h.id=j.huanzheId and jz.id=j.jiuzhenId and p.jcdId=j.id and j.kdys=y.gonghao and " + 
      
      factorSql;
    String hql_map = "select new map(h.binglihao as binglihao,h.xingming as hzxm,h.xingbie as hzxb,h.shengri as csrq,h.sfzh as sfzh,h.shouji as shouji,j.id as id,j.huanzheId as huanzheid,j.jiuzhenId as jiuzhenid,j.jcdh as jcdh,j.biaoti as jcxmmc,y.xingming as xingming,j.biaoshi as biaoshi,j.kdTime as kdsj,j.jcjsTime as jssj,j.jcxmIds as jcxmIds,j.jcksId as jcksId,j.id as jcdid,j.jfbs as jfbs,jz.zhenbie as zb,h.id as huanzheId,j.yanbie as yanbie,j.jcyq as yaoqiu) from  Jcd j,YuanGong y,HuanZheXinXi h,Paidui p,Jiuzhen jz where h.id=j.huanzheId and jz.id=j.jiuzhenId and j.kdys=y.gonghao and p.jcdId=j.id and " + 
      
      factorSql;
    System.out.println("=======================================" + hql_map);
    if (!map.isEmpty()) {
      page.setRowsCount(Integer.valueOf(counts(hql_count, map)));
    } else {
      page.setRowsCount(Integer.valueOf(count(hql_count)));
    } 
    page.init();
    List list = new ArrayList();
    if (!map.isEmpty()) {
      list = getListForPage(hql_map, page.getStartRow().intValue(), 
          page.getPageSize().intValue(), map);
    } else {
      list = getListForPage(hql_map, page.getStartRow().intValue(), 
          page.getPageSize().intValue());
    } 
    return list;
  }
  
  @Override
  public List<String> getHzxxJcsjList(Long hzid, Integer jcxmid) {
    String hql = "select new map(j.id as jcdid,j.jcjsTime as jsrq) from Jcd j,Jcxm x where x.id=j.jcxmIds and j.biaoshi=56 and j.huanzheId=" + 
      
      hzid;
    if (jcxmid != null) {
      hql = String.valueOf(hql) + " and j.jcxmIds=" + jcxmid;
    }
    hql = String.valueOf(hql) + " order by j.jcjsTime desc";
    List<String> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public List<String> getHuanzheJcsjList(Long hzid, Integer jcxmid) {
    String hql = "select distinct j.jcjsTime from Jcd j,Jcxm x where x.id=j.jcxmIds and j.biaoshi=56 and j.jcjsTime is not null and j.huanzheId=" + 
      
      hzid;
    if (jcxmid != null) {
      hql = String.valueOf(hql) + " and j.jcxmIds=" + jcxmid;
    }
    hql = String.valueOf(hql) + " order by j.jcjsTime desc";
    List<String> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public List getHuanzheJcdList(Long hzid, int jcxmid, String date) {
    String factorSql = "";
    if (jcxmid != 0) {
      factorSql = String.valueOf(factorSql) + " and j.jcxmIds=" + jcxmid;
    }
    Map<String, Date> map = new HashMap<String, Date>();
    if (date != null) {
      if (date.indexOf(" ") == -1) {
        date = String.valueOf(date) + " 00:00:00";
      }
      try {
        map.put("startTime", 
            MultiUtils.getStartTimeOfDay((new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss")).parse(date)));
        map.put("endTime", 
            MultiUtils.getEndTimeOfDay((new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss")).parse(date)));
      } catch (ParseException e) {
        e.printStackTrace();
      } 
      factorSql = String.valueOf(factorSql) + " and j.jcjsTime between :startTime and :endTime ";
    } 
    String hql = "from Jcd j where j.biaoshi=56 and j.huanzheId=" + 
      hzid + 
      factorSql;
    List list = null;
    if (map.isEmpty()) {
      list = this.hibernateTemplate.find(hql);
    } else {
      list = findList(hql, map);
    } 
    return list;
  }
  
  @Override
  public List<Jcxm> getFinishHuanzheJcxmListByHzid(Long hzid) {
    String hql = "select j.jcxmIds,j.biaoti from Jcd j where j.biaoshi=56 and j.huanzheId=" + 
      hzid + 
      " group by j.jcxmIds,j.biaoti";
    List list = this.hibernateTemplate.find(hql);
    List<Jcxm> jcxmlist = new ArrayList<Jcxm>();
    Object[] object = null;
    Jcxm jcxm = null;
    Iterator<Object[]> itr = list.iterator();
    while (itr.hasNext()) {
      object = itr.next();
      jcxm = new Jcxm();
      jcxm.setId(Integer.valueOf(Integer.parseInt(object[0].toString())));
      jcxm.setXmmc(object[1].toString());
      jcxmlist.add(jcxm);
    } 
    return jcxmlist;
  }
  
  @Override
  public List getFinishHzxxJcxmByHzidAndDateList(Long hzid, String date) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(j.id as jcdid,j.jcxmIds as jcxmid,j.biaoti as xmmc) from Jcd j, Jcxm x where x.id=j.jcxmIds and j.biaoshi=56 and j.huanzheId=:hzid";
    map.put("hzid", hzid);
    try {
      if (date != null) {
        Date d = (new SimpleDateFormat("yyyy-MM-dd")).parse(date);
        hql = String.valueOf(hql) + " and j.jcjsTime between :startTime and :endTime ";
        map.put("startTime", MultiUtils.getStartTimeOfDay(d));
        map.put("endTime", MultiUtils.getEndTimeOfDay(d));
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    List list = findList(hql, map);
    return list;
  }
  
  @Override
  public List<Jcxm> getFinishHuanzheJcxmByHzidAndDateList(Long hzid, String date) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select distinct j.jcxmIds,j.biaoti from Jcd j, Jcxm x where x.id=j.jcxmIds and j.biaoshi=56 and j.huanzheId=:hzid";
    map.put("hzid", hzid);
    try {
      if (date != null) {
        Date d = (new SimpleDateFormat("yyyy-MM-dd")).parse(date);
        hql = String.valueOf(hql) + " and j.jcjsTime between :startTime and :endTime ";
        map.put("startTime", MultiUtils.getStartTimeOfDay(d));
        map.put("endTime", MultiUtils.getEndTimeOfDay(d));
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    List list = findList(hql, map);
    List<Jcxm> jcxmlist = new ArrayList<Jcxm>();
    Object[] object = null;
    Jcxm jcxm = null;
    Iterator<Object[]> itr = list.iterator();
    while (itr.hasNext()) {
      object = itr.next();
      jcxm = new Jcxm();
      jcxm.setId(Integer.valueOf(Integer.parseInt(object[0].toString())));
      jcxm.setXmmc(object[1].toString());
      jcxmlist.add(jcxm);
    } 
    return jcxmlist;
  }
  
  @Override
  public List<Jcd> getJcdListByJcxmidAndDate(Long hzid, Date date, int jcxmid) {
    String hql = " from Jcd j where j.biaoshi=56 and j.huanzheId=" + 
      hzid + 
      " and j.jcjsTime between :startTime and :endTime " + 
      " and j.jcxmIds='" + jcxmid + "' order by j.jcjsTime desc";
    Date startTime = MultiUtils.getStartTimeOfDay(date);
    Date endTime = MultiUtils.getEndTimeOfDay(date);
    Map<Object, Object> map = new HashMap<Object, Object>();
    map.put("startTime", startTime);
    map.put("endTime", endTime);
    return findList(hql, map);
  }
  
  @Override
  public List findJcdsByPageAndJcdAndHuanZheXinXi(Page page, JcdSearchForm jcd, HuanZheXinXi huanzhexinxi, Integer haveBaogao) {
    String hql_count = "select count(jcd.id) from Jcd as jcd,";
    hql_count = String.valueOf(hql_count) + "Jiuzhen as jiuzhen,Jcxm as jcxm,Category as category_yanbie,Category as category_biaoshi,HuanZheXinXi as huanzhexinxi";
    String hql_map = "select new map(jcd.id as jcdid, jcd.jcdh as jcdh, jcd.jiuzhenId as jiuzhenId, jiuzhen.haoma as haoma,huanzhexinxi.binglihao as binglihao,jcd.biaoti as biaoti, jcd.jcsbId as jcsbId, jcd.huanzheId as huanzheId, huanzhexinxi.xingming as xingming,huanzhexinxi.xingbie as xingbie,huanzhexinxi.shengri as shengri,huanzhexinxi.shouji as shouji,huanzhexinxi.sfzh as sfzh,jcd.jcxmIds as jcxmIds, jcxm.xmmc as jcxmmc, jcd.kdksId as kdksId, jcd.kdys as kdys, jcd.kdTime as kdTime,jcd.jcksId as jcksId, jcd.jcys as jcys,jcd.jcksTime as jcksTime,jcd.jcjsTime as jcjsTime,jcd.leftPic as leftPic,jcd.rightPic as rightPic,jcd.jfbs as jfbs,jcd.biaoshi as biaoshi,(case jcd.state when 1 then '已完成' else '未完成' end) as state,jcd.yanbie as yanbie,category_biaoshi.category as biaoshiName,category_yanbie.category as yanbie_name,";
    hql_map = String.valueOf(hql_map) + "jcd.jcyq as jcyq) from Jcd as jcd,";
    hql_map = String.valueOf(hql_map) + "Jiuzhen as jiuzhen,Jcxm as jcxm,Category as category_yanbie,Category as category_biaoshi,HuanZheXinXi as huanzhexinxi";
    if (haveBaogao.intValue() == 1) {
      hql_count = String.valueOf(hql_count) + ",BaoGaoRelation as br ";
      hql_map = String.valueOf(hql_map) + ",BaoGaoRelation as br ";
    } 
    String strWhere = " where 1=1 ";
    if (jcd.getBiaoshi() != null) {
      strWhere = String.valueOf(strWhere) + " and jcd.biaoshi=" + jcd.getBiaoshi();
    }
    if (jcd.getJcdh() != null && !"".equals(jcd.getJcdh())) {
      strWhere = String.valueOf(strWhere) + " and jcd.jcdh like '%" + jcd.getJcdh() + "%'";
    }
    if (huanzhexinxi.getBinglihao() != null && 
      !"".equals(huanzhexinxi.getBinglihao())) {
      strWhere = String.valueOf(strWhere) + " and (huanzhexinxi.binglihao like '%" +
        huanzhexinxi.getBinglihao() + "%' or huanzhexinxi.xingming like '%" + huanzhexinxi.getBinglihao() + "%')";
    }
    if (huanzhexinxi.getXingming() != null && 
      !"".equals(huanzhexinxi.getXingming())) {
      strWhere = String.valueOf(strWhere) + " and huanzhexinxi.xingming like '%" +
        huanzhexinxi.getXingming() + "%'";
    }
    if (huanzhexinxi.getSfzh() != null && 
      !"".equals(huanzhexinxi.getSfzh())) {
      strWhere = String.valueOf(strWhere) + " and huanzhexinxi.sfzh like '%" +
        huanzhexinxi.getSfzh() + "%'";
    }
    if (huanzhexinxi.getShouji() != null && 
      !"".equals(huanzhexinxi.getShouji())) {
      strWhere = String.valueOf(strWhere) + " and huanzhexinxi.shouji like '%" +
        huanzhexinxi.getShouji() + "%'";
    }
    if (jcd.getJcsbId() != null) {
      strWhere = String.valueOf(strWhere) + " and jcd.jcsbId = " + jcd.getJcsbId();
    }
    if (jcd.getJcxmid() != null && !"".equals(jcd.getJcxmid())) {
      strWhere = String.valueOf(strWhere) + " and jcd.jcxmIds in (" + jcd.getJcxmid() + ") ";
    }
    if (jcd.getKdys() != null && !"".equals(jcd.getKdys())) {
      strWhere = String.valueOf(strWhere) + " and jcd.kdys = '" + jcd.getKdys() + "'";
    }
    if (haveBaogao.intValue() == 1) {
      if (jcd.getJcys() != null && !"".equals(jcd.getJcys())) {
        strWhere = String.valueOf(strWhere) + " and br.insertUser = '" + jcd.getJcys() + "'";
      }
    } else if (jcd.getJcys() != null && !"".equals(jcd.getJcys())) {
      strWhere = String.valueOf(strWhere) + " and jcd.jcys = '" + jcd.getJcys() + "'";
    } 
    Map<String, Date> map = new HashMap<String, Date>();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    if (jcd.getStartkdsj() != null && 
      !jcd.getStartkdsj().isEmpty() && 
      jcd.getEndkdsj() != null && 
      !jcd.getEndkdsj().isEmpty()) {
      try {
        map.put("startTime1", 
            sdf.parse(String.valueOf(jcd.getStartkdsj()) + " 00:00:00"));
        map.put("endTime1", 
            sdf.parse(String.valueOf(jcd.getEndkdsj()) + " 23:59:59"));
      } catch (ParseException e) {
        e.printStackTrace();
      } 
      strWhere = String.valueOf(strWhere) + " and jcd.kdTime between :startTime1 and :endTime1";
    } 
    if (jcd.getStartkdsj() != null && 
      !jcd.getStartkdsj().isEmpty() && (
      jcd.getEndkdsj() == null || jcd
      .getEndkdsj().isEmpty())) {
      try {
        Date time = sdf.parse(String.valueOf(jcd.getStartkdsj()) +
            " 00:00:00");
        Date time1 = sdf.parse(String.valueOf(jcd.getStartkdsj()) +
            " 23:59:59");
        map.put("startTime1", MultiUtils.getStartTimeOfDay(time));
        map.put("endTime1", MultiUtils.getEndTimeOfDay(time1));
        strWhere = String.valueOf(strWhere) + " and jcd.kdTime between :startTime1 and :endTime1";
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    if (jcd.getStartjcsj() != null && 
      !jcd.getStartjcsj().isEmpty() && 
      jcd.getEndjcsj() != null && 
      !jcd.getEndjcsj().isEmpty()) {
      try {
        map.put("startTime", 
            sdf.parse(String.valueOf(jcd.getStartjcsj()) + " 00:00:00"));
        map.put("endTime", 
            sdf.parse(String.valueOf(jcd.getEndjcsj()) + " 23:59:59"));
      } catch (ParseException e) {
        e.printStackTrace();
      } 
      strWhere = String.valueOf(strWhere) + " and jcd.jcjsTime between :startTime and :endTime";
    } 
    if (jcd.getStartjcsj() != null && 
      !jcd.getStartjcsj().isEmpty() && (
      jcd.getEndjcsj() == null || jcd
      .getEndjcsj().isEmpty())) {
      try {
        Date time = sdf.parse(String.valueOf(jcd.getStartjcsj()) +
            " 00:00:00");
        Date time1 = sdf.parse(String.valueOf(jcd.getStartjcsj()) +
            " 23:59:59");
        map.put("startTime", MultiUtils.getStartTimeOfDay(time));
        map.put("endTime", MultiUtils.getEndTimeOfDay(time1));
        strWhere = String.valueOf(strWhere) + " and jcd.jcjsTime between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    if (haveBaogao.intValue() == 1) {
      strWhere = String.valueOf(strWhere) + " and jcd.state= 1";
    }
    if (haveBaogao.intValue() == 0) {
      strWhere = String.valueOf(strWhere) + " and jcd.state is null";
    }
    strWhere = String.valueOf(strWhere) + " and jcd.jiuzhenId=jiuzhen.id ";
    strWhere = String.valueOf(strWhere) + " and jiuzhen.huanzheId=huanzhexinxi.id ";
    strWhere = String.valueOf(strWhere) + " and jcd.jcxmIds=jcxm.id ";
    strWhere = String.valueOf(strWhere) + " and jcd.yanbie=category_yanbie.id ";
    strWhere = String.valueOf(strWhere) + " and jcd.biaoshi=category_biaoshi.id ";
    if (haveBaogao.intValue() == 0) {
      strWhere = String.valueOf(strWhere) + " order by jcd.kdTime desc";
    } else {
      strWhere = String.valueOf(strWhere) + " and br.jcdId = jcd.id ";
      strWhere = String.valueOf(strWhere) + " order by  jcd.kdTime desc ";
    } 
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(Integer.parseInt(findList(hql_count, map).get(0).toString())));
    page.init();
    List list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue(), map);
    return list;
  }
  
  private String getQueryCondition(JcdSearchForm jcdsearchform, Map<String, Date> map) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String factorSql = " 1=1 ";
    if (jcdsearchform.getSearch() != null && 
      !jcdsearchform.getSearch().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and (h.binglihao like '%" +
        jcdsearchform.getSearch() + "%' or h.xingming like '%" +
        jcdsearchform.getSearch() + "%')";
    }
    if (jcdsearchform.getBlh() != null && !jcdsearchform.getBlh().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.binglihao like '%" + jcdsearchform.getBlh() +
        "%'";
    }
    if (jcdsearchform.getHzxm() != null && 
      !jcdsearchform.getHzxm().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.xingming like'%" + jcdsearchform.getHzxm() +
        "%'";
    }
    if (jcdsearchform.getXingbie() != null && 
      jcdsearchform.getXingbie().intValue() != 2) {
      factorSql = String.valueOf(factorSql) + " and h.xingbie =" + jcdsearchform.getXingbie();
    }
    if (jcdsearchform.getShouji() != null && 
      !jcdsearchform.getShouji().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.shouji like '%" + jcdsearchform.getShouji() +
        "%'";
    }
    if (jcdsearchform.getSfzh() != null && 
      !jcdsearchform.getSfzh().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.sfzh like '%" + jcdsearchform.getSfzh() + "%'";
    }
    if (jcdsearchform.getZhenbie() != null && 
      jcdsearchform.getZhenbie().intValue() != 1) {
      factorSql = String.valueOf(factorSql) + " and jz.zhenbie=" + jcdsearchform.getZhenbie();
    }
    if (jcdsearchform.getJcxmid() != null && 
      !"".equals(jcdsearchform.getJcxmid())) {
      factorSql = String.valueOf(factorSql) + " and j.jcxmIds like '%" + jcdsearchform.getJcxmid() +
        "%'";
    }
    if (jcdsearchform.getJcys() != null && 
      !jcdsearchform.getJcys().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and j.jcys='" + jcdsearchform.getJcys() + "'";
    }
    if (jcdsearchform.getKdys() != null && 
      !jcdsearchform.getKdys().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and j.kdys like '%" + jcdsearchform.getKdys() + "%'";
    }
    if (jcdsearchform.getJcdid() != null && 
      !jcdsearchform.getJcdid().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and j.id like'%" + jcdsearchform.getJcdid() + "%'";
    }
    if (jcdsearchform.getJcdh() != null && 
      !jcdsearchform.getJcdh().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and j.jcdh like '%" + jcdsearchform.getJcdh() + "%'";
    }
    if (jcdsearchform.getYbh() != null && !jcdsearchform.getYbh().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.yibaohao like '%" + jcdsearchform.getYbh() +
        "%'";
    }
    if (jcdsearchform.getStartkdsj() != null && 
      !jcdsearchform.getStartkdsj().isEmpty() && 
      jcdsearchform.getEndkdsj() != null && 
      !jcdsearchform.getEndkdsj().isEmpty()) {
      try {
        map.put("startTime", 
            sdf.parse(String.valueOf(jcdsearchform.getStartkdsj()) + " 00:00:00"));
        map.put("endTime", 
            sdf.parse(String.valueOf(jcdsearchform.getEndkdsj()) + " 23:59:59"));
      } catch (ParseException e) {
        e.printStackTrace();
      } 
      factorSql = String.valueOf(factorSql) + " and j.kdTime between :startTime and :endTime";
    } 
    if (jcdsearchform.getStartkdsj() != null && 
      !jcdsearchform.getStartkdsj().isEmpty() && (
      jcdsearchform.getEndkdsj() == null || jcdsearchform
      .getEndkdsj().isEmpty())) {
      try {
        Date time = sdf.parse(String.valueOf(jcdsearchform.getStartkdsj()) +
            " 00:00:00");
        map.put("startTime", MultiUtils.getStartTimeOfDay(time));
        map.put("endTime", MultiUtils.getEndTimeOfDay(time));
        factorSql = String.valueOf(factorSql) + " and j.kdTime between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    if (jcdsearchform.getStartjcsj() != null && 
      !jcdsearchform.getStartjcsj().isEmpty() && 
      jcdsearchform.getEndjcsj() != null && 
      !jcdsearchform.getEndjcsj().isEmpty()) {
      try {
        map.put("startTime", 
            sdf.parse(String.valueOf(jcdsearchform.getStartjcsj()) + " 00:00:00"));
        map.put("endTime", 
            sdf.parse(String.valueOf(jcdsearchform.getEndjcsj()) + " 23:59:59"));
      } catch (ParseException e) {
        e.printStackTrace();
      } 
      factorSql = String.valueOf(factorSql) + " and j.jcjsTime between :startTime and :endTime";
    } 
    if (jcdsearchform.getStartjcsj() != null && 
      !jcdsearchform.getStartjcsj().isEmpty() && (
      jcdsearchform.getEndjcsj() == null || jcdsearchform
      .getEndjcsj().isEmpty())) {
      try {
        Date time = sdf.parse(String.valueOf(jcdsearchform.getStartjcsj()) +
            " 00:00:00");
        map.put("startTime", MultiUtils.getStartTimeOfDay(time));
        map.put("endTime", MultiUtils.getEndTimeOfDay(time));
        factorSql = String.valueOf(factorSql) + " and j.jcjsTime between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    if (jcdsearchform.getBiaoshi() != null && 
      !jcdsearchform.getBiaoshi().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and j.biaoshi in(" + jcdsearchform.getBiaoshi() + ")";
    }
    if (jcdsearchform.getJcsbId() != null) {
      String jcxmids = getJcxmIdsByJcsbid(jcdsearchform.getJcsbId().intValue());
      if (!"".equals(jcxmids)) {
        factorSql = String.valueOf(factorSql) + " and j.jcxmIds in(" + jcxmids + ")";
      } else {
        factorSql = String.valueOf(factorSql) + " and 1=0 ";
      } 
    } 
    return factorSql;
  }
  
  private String getJcxmIdsByJcsbid(int jcsbid) {
    String jcxmids = "";
    String hql = "select s.jcxmIds from SheBei s where s.id =" + jcsbid;
    List<String> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      jcxmids = list.get(0);
    }
    return jcxmids;
  }
  
  private String getJcxmStrToSheBeiByBmid(int bmid) {
    String hql = "select jcxmIds from SheBei where bmId=" + bmid;
    String jcxmids = "";
    List list = this.hibernateTemplate.find(hql);
    int i;
    for (i = 0; i < list.size() - 1; i++) {
      if (list.get(i) != null && !"".equals(list.get(i).toString())) {
        jcxmids = String.valueOf(jcxmids) + list.get(i).toString() + ",";
      }
    } 
    if (i == list.size() - 1) {
      if (list.get(i) != null && !"".equals(list.get(i).toString())) {
        jcxmids = String.valueOf(jcxmids) + list.get(i).toString();
      } else {
        jcxmids = jcxmids.substring(0, jcxmids.lastIndexOf(","));
      }
    }
    return jcxmids;
  }
  
  @Override
  public List findJCDByPage(Page p) {
    String hqlcount = "select count(*) from Jcd as j ,BuMen as b,YuanGong as y ,Category as c ,Category as cc,YuanGong as yy ,Jcxm as jj  where y.gonghao =j.jcys and c.id=j.biaoshi and cc.id=j.yanbie and b.id=j.kdksId and yy.gonghao=j.kdys and jj.id=j.jcxmIds";
    p.setRowsCount(Integer.valueOf(count(hqlcount)));
    p.init();
    String hql = " select new map ( j.id as id, j.jcdh as jcdh ,j.jiuzhenId as jiuzhenId, j.biaoti as biaoti, y.xingming as jcys,j.kdTime as kdTime ,j.jfbs as jfbs , j.yanbie as yanbie ,j.jcyq as jcyq, c.category as state ) from Jcd as j ,BuMen as b,YuanGong as y ,Category as c,Category as cc , YuanGong as yy ,Jcxm as jj where y.gonghao =j.jcys  and c.id=j.biaoshi and yy.gonghao =j.kdys and cc.id=j.yanbie and b.id=j.kdksId and jj.id=j.jcxmIds";
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  @Override
  public List<Jcd> getJcdByHzidAndJiuzhenIdAndJcxmId(Long huanzheId, Long jiuzhenId, Integer jcxmId) {
    String hql = " from Jcd j where j.biaoshi=50 and j.huanzheId=" + 
      
      huanzheId + " and j.jiuzhenId=" + jiuzhenId + 
      " and j.jcxmIds='" + jcxmId + "' order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Jcd> getJcdByHzidAndJiuzhenIdAndJcxmIdTwo(Long huanzheId, Long jiuzhenId, Integer jcxmId) {
    System.out.println(huanzheId + "=====" + jiuzhenId + "======" + jcxmId);
    String hql = " from Jcd j where  j.biaoshi=56 and j.huanzheId=" + 
      
      huanzheId + " and j.jiuzhenId=" + jiuzhenId + 
      " and j.jcxmIds='" + jcxmId + "'";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public Long getMaxJcdId() {
    String hql = "select Max(id) from Jcd ";
    List list = this.hibernateTemplate.find(hql);
    Long maxJcdId = new Long(0L);
    if (list.size() > 0) {
      if (list.get(0) != null) {
        maxJcdId = Long.valueOf(Long.parseLong(list.get(0).toString()));
      } else {
        maxJcdId = new Long(1L);
      }
    }
    return maxJcdId;
  }
  
  @Override
  public List getListOfWatchJcdByJcdSearchForm(JcdSearchForm jcdsearchform) {
    String hql = "select distinct jcd.jcjsTime from  Jcd jcd,Jcxm jcxm where 1=1";
    if (jcdsearchform.getBiaoshi() != null && 
      !"".equals(jcdsearchform.getBiaoshi())) {
      hql = String.valueOf(hql) + " and jcd.biaoshi=" + jcdsearchform.getBiaoshi();
    }
    if (jcdsearchform.getJcxmid() != null && 
      !"".equals(jcdsearchform.getJcxmid())) {
      hql = String.valueOf(hql) + " and jcd.jcxmIds='" + jcdsearchform.getJcxmid() + "'";
    }
    if (jcdsearchform.getHuanzheId() != null && 
      !"".equals(jcdsearchform.getHuanzheId())) {
      hql = String.valueOf(hql) + " and jcd.huanzheId=" + jcdsearchform.getHuanzheId();
    }
    hql = String.valueOf(hql) + " and jcd.jcxmIds=jcxm.id ";
    hql = String.valueOf(hql) + " order by jcd.jcjsTime desc ";
    List list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public void deleteJcd(Jcd jcd) {
    this.hibernateTemplate.delete(jcd);
  }
  
  @Override
  public List<Map<String, Object>> findJCDInfoByjcdhForCapture(String jcdh) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(j.id as id,h.id as huanzheID,j.jiuzhenId as jiuzhenid,j.leftPic as leftPic,j.rightPic as rightPic,j.jfbs as jfbs,j.jcyq as jcyq,z.zhenbie as zhenbie,h.xingming as xingming,h.binglihao as binglihao,h.xingbie as xingbie,h.shengri as shengri,h.shouji as shouji,j.kdTime as kdsj,y.xingming as kdys,j.biaoshi as biaoshi) from Jcd j,HuanZheXinXi h,Jiuzhen z, YuanGong y where j.huanzheId = h.id and j.jiuzhenId = z.id and j.kdys = y.gonghao and j.jcdh = '" + 
      jcdh + "'";
    System.out.println("+++++++++++++++++++++++++++++++++++++++++" + hql);
    List<Map<String, Object>> list = findList(hql, map);
    return list;
  }
  
  @Override
  public Jcd findJcdByJCDH(String jcdh) {
    String hql = "from Jcd where jcdh='" + jcdh + "'";
    List<Jcd> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public int getTodayJcdCount() {
    Map<String, Date> map = new HashMap<String, Date>();
    map.put("startDate", MultiUtils.getStartTimeOfDay());
    map.put("endDate", MultiUtils.getEndTimeOfDay());
    return 
      counts("select count(*) from Jcd where kdTime between :startDate and :endDate", 
        map);
  }
  
  @Override
  public List<Jcd> findJcdByJcd(Long hzid, String jcxmId) {
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("huanzheId", hzid)).add((Criterion)Restrictions.eq("jcxmIds", jcxmId)));
  }
}
