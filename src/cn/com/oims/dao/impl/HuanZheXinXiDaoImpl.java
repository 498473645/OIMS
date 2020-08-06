package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.web.form.HuanZheSearchForm;
import cn.com.oims.web.form.HzTjForm;
import cn.com.oims.web.form.PatientSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class HuanZheXinXiDaoImpl extends BaseDaoEx implements IHuanZheXinXiDao {
  private String clazzName = HuanZheXinXi.class.getSimpleName();
  
  private String countHql = "select count(*) from HuanZheXinXi h";
  
  @Override
  public List<Map<String, Object>> findHuanZhe4Page(String hqlC, String hqlM, Page p) {
    return findObject4Page(hqlM, hqlC, p);
  }
  
  @Override
  public Serializable saveHuanZhe(HuanZheXinXi hz) {
    return this.hibernateTemplate.save(hz);
  }
  
  @Override
  public void updateHuanZhe(HuanZheXinXi hzxx) {
    this.hibernateTemplate.update(hzxx);
  }
  
  @Override
  public void delHuanZhe(List<Long> ids) {
    delObject(ids, "id", BaseDaoEx.IdType.NotStr, HuanZheXinXi.class);
  }
  
  @Override
  public void delHuanZheXinXi(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public void delHuanZheXinXi(HuanZheXinXi hz) {
    this.hibernateTemplate.delete(hz);
  }
  
  @Override
  public HuanZheXinXi findHuanZheById(Long id) {
    return (HuanZheXinXi)this.hibernateTemplate.get(HuanZheXinXi.class, id);
  }
  
  @Override
  public String findMaxBinglihao() {
    String hql = "select max(binglihao) from " + 
      HuanZheXinXi.class.getName() + 
      " where binglihao like 'oims%'";
    List<Object> list = findByHql(hql);
    return (list.size() > 0) ? (String)list.get(0) : "";
  }
  
  @Override
  public List<Map<String, Object>> findHuanZheByBingLiHao(String hql) {
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public HuanZheXinXi getPatientById(Long patientId) {
    return (HuanZheXinXi)this.hibernateTemplate.get(HuanZheXinXi.class, patientId);
  }
  
  @Override
  public List<Map<String, Object>> findPatients(Page page, PatientSearchForm psf) {
    String hql = "";
    int size = 0;
    String paramSql = "";
    paramSql = getQuery(psf);
    size = count("select count(*) from HuanZheXinXi ");
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    hql = "select new map(h as patient, j as jz)from HuanZheXinXi as h , Jiuzhen as j where h.id=j.huanzheId and j.caozuoTime = (select max(jz.caozuoTime) from Jiuzhen jz where jz.huanzheId=h.id) ";
    if (paramSql != "") {
      hql = String.valueOf(hql) + paramSql;
    }
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List<Map> list = null;
    list = getListForPage(hql, startRow, pageSize);
    List<Map<String, Object>> result = convert(list);
    return result;
  }
  
  private List convert(List<Map> list) {
    String sql = "select mc from MedicalCertificate as mc where mc.id.jiuzhenId = :jzid and mc.addTime = (select max(mce.addTime) from MedicalCertificate mce where mce.id.jiuzhenId = :jzid)";
    for (int i = 0; i < list.size(); i++) {
      Jiuzhen jz = (Jiuzhen)((Map)list.get(i)).get("jz");
      Long jzid = jz.getId();
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("jzid", jzid);
      List<Object> temp = new ArrayList();
      temp = findList(sql, map);
      ((Map)list.get(i)).remove("jz");
      if (temp.size() > 0) {
        ((Map)list.get(i)).put("mc", temp.get(0));
      } else {
        ((Map<String, String>)list.get(i)).put("mc", "");
      } 
    } 
    return list;
  }
  
  private String getQuery(PatientSearchForm psf) {
    String searchSql = "";
    if (psf.getName() != null && !psf.getName().isEmpty()) {
      searchSql = String.valueOf(searchSql) + " and h.xingming like '%" + psf.getName() + "%'";
    }
    if (psf.getPatientId() != null && !psf.getPatientId().isEmpty()) {
      searchSql = String.valueOf(searchSql) + " and h.binglihao = '" + psf.getPatientId() + "'";
    }
    if (psf.getPid() != null && !psf.getPid().isEmpty()) {
      searchSql = String.valueOf(searchSql) + " and h.sfzh = '" + psf.getPid() + "'";
    }
    if (psf.getMobile() != null && !psf.getMobile().isEmpty()) {
      searchSql = String.valueOf(searchSql) + " and h.shouji = '" + psf.getMobile() + "'";
    }
    if (psf.getTel() != null && !psf.getTel().isEmpty()) {
      searchSql = String.valueOf(searchSql) + " and h.dianhua = '" + psf.getTel() + "'";
    }
    return searchSql;
  }
  
  @Override
  public List<Map<String, Object>> getHuanZheXinXiListByCondition(HuanZheSearchForm searchForm, String ids) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = getQueryCondition(searchForm, map);
    if ((searchForm.getBingLiKey() != null && 
      !searchForm.getBingLiKey().isEmpty()) || (
      searchForm.getBingZhongId() != null && 
      !searchForm.getBingZhongId().isEmpty())) {
      return searchHuanZheXinXiToJzjlNoPage(map, factorSql);
    }
    return searchHuanZheXinXiNoJzjlNoPage(map, factorSql, ids);
  }
  
  private List<Map<String, Object>> searchHuanZheXinXiNoJzjlNoPage(Map map, String factorSql, String ids) {
    String hql = "select new map(h.id as id,h.binglihao as binglihao,h.xingming as xingming,h.xingbie as xingbie,h.yibao as yibao,h.yibaohao as yibaohao,h.shengri as shengri,h.sfzh as sfzh,h.shouji as shouji,h.dianhua as dianhua,h.zcrq as zcrq,h.diqu as diqu,h.gzdw as gzdw,h.dwdz as dwdz,h.jtdz as jtdz,h.dwyb as dwyb,h.dwdh as dwdh,h.youbian as youbian,h.hzlxr as hzlxr,h.hzlxrdh as hzlxrdh,h.laiyuan as laiyuan,h.beizhu as beizhu) from HuanZheXinXi h where " + 
      
      factorSql;
    if (Utils.strIsNotEmpty(ids)) {
      hql = String.valueOf(hql) + " and h.id in (" + ids + ") ";
    }
    List<Map<String, Object>> list = null;
    if (!map.isEmpty()) {
      list = findList(hql, map);
    } else {
      list = this.hibernateTemplate.find(hql);
    } 
    return list;
  }
  
  private List<Map<String, Object>> searchHuanZheXinXiToJzjlNoPage(Map map, String factorSql) {
    int size = 0;
    String hql = "select new map(h.id as id,h.binglihao as binglihao,h.xingming as xingming,h.xingbie as xingbie,h.yibao as yibao,h.yibaohao as yibaohao,h.shengri as shengri,h.sfzh as sfzh,h.shouji as shouji,h.dianhua as dianhua,h.zcrq as zcrq,h.diqu as diqu,h.gzdw as gzdw,h.dwdz as dwdz,h.jtdz as jtdz,h.dwyb as dwyb,h.dwdh as dwdh,h.youbian as youbian,h.hzlxr as hzlxr,h.hzlxrdh as hzlxrdh,h.laiyuan as laiyuan,h.beizhu as beizhu) from HuanZheXinXi h,Jiuzhen jz,Jzjl jzjl where h.id=jz.huanzheId and jz.id=jzjl.jiuzhenId and" + 
      
      factorSql;
    List<Map<String, Object>> list = null;
    if (!map.isEmpty()) {
      list = findList(hql, map);
    } else {
      list = this.hibernateTemplate.find(hql);
    } 
    return list;
  }
  
  @Override
  public List<Map<String, Object>> findHuanZheToExaminedByPageList(Page page, HuanZheSearchForm searchForm) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = getQueryCondition(searchForm, map);
    String hql = "select new map(h.id as id,h.binglihao as binglihao,h.xingming as xingming,h.xingbie as xingbie,h.shengri as shengri,h.shouji as shouji) from HuanZheXinXi h,Jcd j where h.id=j.huanzheId and j.biaoshi=56 and j.jcjsTime is not null and " + 
      
      factorSql;
    hql = String.valueOf(hql) + " group by h.id,h.binglihao,h.xingming,h.xingbie,h.shengri,h.shouji";
    int size = 0;
    List<Map<String, Object>> list = null;
    if (!map.isEmpty()) {
      list = findList(hql, map);
      if (list != null) {
        size = list.size();
      }
    } else {
      list = this.hibernateTemplate.find(hql);
      if (list != null) {
        size = list.size();
      }
    } 
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    if (!map.isEmpty()) {
      list = getListForPage(hql, startRow, pageSize, map);
    } else {
      list = getListForPage(hql, startRow, pageSize);
    } 
    return list;
  }
  
  @Override
  public List<Map<String, Object>> getHuanZheXinXiListByPage(Page page, HuanZheSearchForm searchForm) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = getQueryCondition(searchForm, map);
    if ((searchForm.getBingLiKey() != null && 
      !searchForm.getBingLiKey().isEmpty()) || (
      searchForm.getBingZhongId() != null && 
      !searchForm.getBingZhongId().isEmpty())) {
      return searchHuanZheXinXiToJzjl(map, page, factorSql);
    }
    return searchHuanZheXinXiNoJzjl(map, page, factorSql);
  }
  
  private List<Map<String, Object>> searchHuanZheXinXiNoJzjl(Map map, Page page, String factorSql) {
    int size = 0;
    if (!map.isEmpty()) {
      size = counts(String.valueOf(this.countHql) + " where " + factorSql, map);
    } else {
      size = count(String.valueOf(this.countHql) + " where " + factorSql);
    } 
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(h.gongfei as gongfei,h.shangbao as shangbao,h.photourl as photourl,h.id as id,h.binglihao as binglihao,h.xingming as xingming,h.xingbie as xingbie,h.yibao as yibao,h.yibaohao as yibaohao,h.shengri as shengri,h.sfzh as sfzh,h.shouji as shouji,h.dianhua as dianhua,h.zcrq as zcrq,h.diqu as diqu,h.gzdw as gzdw,h.dwdz as dwdz,h.jtdz as jtdz,h.dwyb as dwyb,h.dwdh as dwdh,h.youbian as youbian,h.hzlxr as hzlxr,h.hzlxrdh as hzlxrdh,h.laiyuan as laiyuan,h.beizhu as beizhu) from HuanZheXinXi h where " + 
      
      factorSql + 
      " order by h.zcrq desc";
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List<Map<String, Object>> list = null;
    if (!map.isEmpty()) {
      list = getListForPage(hql, startRow, pageSize, map);
    } else {
      list = getListForPage(hql, startRow, pageSize);
    } 
    return list;
  }
  
  private List<Map<String, Object>> searchHuanZheXinXiToJzjl(Map map, Page page, String factorSql) {
    int size = 0;
    if (!map.isEmpty()) {
      size = 
        counts(String.valueOf(this.countHql) + 
          ",Jiuzhen jz,Jzjl jzjl where h.id=jz.huanzheId and jz.id=jzjl.jiuzhenId and" + 
          factorSql, map);
    } else {
      size = 
        count(String.valueOf(this.countHql) + 
          ",Jiuzhen jz,Jzjl jzjl where h.id=jz.huanzheId and jz.id=jzjl.jiuzhenId and" + 
          factorSql);
    } 
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(jz.id as jzid, h.gongfei as gongfei,h.shangbao as shangbao,h.photourl as photourl,h.id as id,h.binglihao as binglihao,h.xingming as xingming,h.xingbie as xingbie,h.yibao as yibao,h.yibaohao as yibaohao,h.shengri as shengri,h.sfzh as sfzh,h.shouji as shouji,h.dianhua as dianhua,h.zcrq as zcrq,h.diqu as diqu,h.gzdw as gzdw,h.dwdz as dwdz,h.jtdz as jtdz,h.dwyb as dwyb,h.dwdh as dwdh,h.youbian as youbian,h.hzlxr as hzlxr,h.hzlxrdh as hzlxrdh,h.laiyuan as laiyuan,h.beizhu as beizhu) from HuanZheXinXi h,Jiuzhen jz,Jzjl jzjl where h.id=jz.huanzheId and jz.id=jzjl.jiuzhenId and" + 
      
      factorSql + " order by h.zcrq desc";
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List<Map<String, Object>> list = null;
    if (!map.isEmpty()) {
      list = getListForPage(hql, startRow, pageSize, map);
    } else {
      list = getListForPage(hql, startRow, pageSize);
    } 
    return list;
  }
  
  private String getQueryCondition(HuanZheSearchForm searchForm, Map<String, Date> map) {
    String factorSql = " 1=1 ";
    if (searchForm.getSearch() != null && !searchForm.getSearch().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and (h.binglihao like '" + searchForm.getSearch() +
        "' or h.xingming like '%" + searchForm.getSearch() +
        "%')";
    }
    if (searchForm.getXingming() != null && 
      !searchForm.getXingming().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.xingming like '%" + searchForm.getXingming() +
        "%')";
    }
    if (searchForm.getXingbie() != null && 
      !searchForm.getXingbie().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.xingbie in (" + searchForm.getXingbie() + ")";
    }
    if (Utils.strIsNotEmpty(searchForm.getDiqu())) {
      factorSql = String.valueOf(factorSql) + " and h.diqu like '%" + searchForm.getDiqu() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getZcrqStart())) {
      factorSql = String.valueOf(factorSql) + " and h.zcrq >:ZcrqStart";
      map.put("ZcrqStart", Utils.strToDateDay(searchForm.getZcrqStart()));
    } 
    if (Utils.strIsNotEmpty(searchForm.getZcrqEnd())) {
      factorSql = String.valueOf(factorSql) + " and h.zcrq <:ZcrqEnd";
      map.put("ZcrqEnd", Utils.strToDateDay(searchForm.getZcrqEnd()));
    } 
    if (searchForm.getShouji() != null && !searchForm.getShouji().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.shouji like '%" + searchForm.getShouji() +
        "%'";
    }
    if (searchForm.getYibao() != null && !searchForm.getYibao().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.yibao in (" + searchForm.getYibao() + ")";
    }
    if (Utils.strIsNotEmpty(searchForm.getHzlxrdh())) {
      factorSql = String.valueOf(factorSql) + " and h.hzlxrdh like '%" + searchForm.getHzlxrdh() +
        "%'";
    }
    if (searchForm.getShengriStart() != null && 
      !searchForm.getShengriStart().equals("")) {
      Date shengristart = Utils.ageToBirthday(searchForm
          .getShengriStart().intValue());
      factorSql = String.valueOf(factorSql) + " and h.shengri <:shengriStart";
      map.put("shengriStart", shengristart);
    } 
    if (searchForm.getShengriEnd() != null && 
      !searchForm.getShengriEnd().equals("")) {
      Date shengriend = Utils.ageToBirthday(searchForm.getShengriEnd().intValue());
      factorSql = String.valueOf(factorSql) + " and h.shengri >:shengriend";
      map.put("shengriend", shengriend);
    } 
    if (Utils.strIsNotEmpty(searchForm.getDwdh())) {
      factorSql = String.valueOf(factorSql) + " and h.dwdh like '%" + searchForm.getDwdh() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getHzlxr())) {
      factorSql = String.valueOf(factorSql) + " and h.hzlxr like '%" + searchForm.getHzlxr() + "%'";
    }
    if (searchForm.getSfzh() != null && !searchForm.getSfzh().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.sfzh like '%" + searchForm.getSfzh() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getLaiyuan())) {
      factorSql = String.valueOf(factorSql) + "and h.laiyuan in (" + searchForm.getLaiyuan() + ")";
    }
    if (Utils.strIsNotEmpty(searchForm.getJtdz())) {
      factorSql = String.valueOf(factorSql) + "and h.jtdz like '%" + searchForm.getJtdz() + "%'";
    }
    if (searchForm.getBingZhongId() != null && 
      !searchForm.getBingZhongId().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and jzjl.categoryId in (" +
        searchForm.getBingZhongId() + ")";
    }
    if (searchForm.getBingLiKey() != null && 
      !searchForm.getBingLiKey().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and jzjl.jilu like '%" + searchForm.getBingLiKey() +
        "%'";
    }
    return factorSql;
  }
  
  @Override
  public boolean isHuanZheXinXiExist(HuanZheXinXi hzxx) {
    String hql = "select count(*) from HuanZheXinXi where ";
    String binglihao = hzxx.getBinglihao();
    if (binglihao != null && !binglihao.equals("")) {
      hql = String.valueOf(hql) + "binglihao='" + binglihao + "'";
      return (count(hql) > 0);
    } 
    if (hzxx.getSfzh() != null && !hzxx.getSfzh().equals("") && 
      hzxx.getSfzh().length() > 10) {
      hql = String.valueOf(hql) + "sfzh='" + hzxx.getSfzh() + "'";
      return (count(hql) > 0);
    } 
    if (hzxx.isYibao() && hzxx.getYibaohao() != null && 
      !hzxx.getYibaohao().equals("")) {
      hql = String.valueOf(hql) + "yibao=1 and yibaohao='" + hzxx.getYibaohao() + "'";
      return (count(hql) > 0);
    } 
    if (hzxx.getShengri() != null) {
      Map<Object, Object> map = new HashMap<Object, Object>();
      map.put("shengri", hzxx.getShengri());
      hql = String.valueOf(hql) + "xingming='" + hzxx.getXingming() + 
        "' and shengri= :shengri and xingbie=" + hzxx.isXingbie();
      return (counts(hql, map) > 0);
    } 
    return false;
  }
  
  @Override
  public HuanZheXinXi getHuanzhexinxiByExample(HuanZheXinXi hzxx) {
    String hql = "from HuanZheXinXi where ";
    String binglihao = hzxx.getBinglihao();
    if (binglihao != null && !binglihao.equals("")) {
      hql = String.valueOf(hql) + "binglihao='" + binglihao + "'";
      List<HuanZheXinXi> list = this.hibernateTemplate.find(hql);
      return (list.size() > 0) ? list.get(0) : null;
    } 
    if (hzxx.getSfzh() != null && !hzxx.getSfzh().equals("")) {
      hql = String.valueOf(hql) + "sfzh='" + hzxx.getSfzh() + "'";
      List<HuanZheXinXi> list = this.hibernateTemplate.find(hql);
      return (list.size() > 0) ? list.get(0) : null;
    } 
    if (hzxx.isYibao() && hzxx.getYibaohao() != null && 
      !hzxx.getYibaohao().equals("")) {
      hql = String.valueOf(hql) + "yibao=1 and yibaohao='" + hzxx.getYibaohao() + "'";
      List<HuanZheXinXi> list = this.hibernateTemplate.find(hql);
      return (list.size() > 0) ? list.get(0) : null;
    } 
    if (hzxx.getShengri() != null) {
      hql = String.valueOf(hql) + "xingming='" + 
        hzxx.getXingming() + 
        "' and shengri='" + (
        new SimpleDateFormat("yyyy-MM-dd")).format(hzxx
          .getShengri()) + "' and xingbie=" + 
        hzxx.isXingbie();
      List<HuanZheXinXi> list = this.hibernateTemplate.find(hql);
      return (list.size() > 0) ? list.get(0) : null;
    } 
    return null;
  }
  
  @Override
  public HuanZheXinXi getHuanzhexinxiBySFZH(String sfzh) {
    List<HuanZheXinXi> list = this.hibernateTemplate.findByCriteria(
        DetachedCriteria.forClass(HuanZheXinXi.class).add(
          (Criterion)Restrictions.eq("sfzh", sfzh)), 0, 1);
    if (list.size() > 0) {
      return list.get(0);
    }
    return null;
  }
  
  @Override
  public HuanZheXinXi getHuanzhexinxiByBLH(String blh) {
    List<HuanZheXinXi> list = this.hibernateTemplate.findByCriteria(
        DetachedCriteria.forClass(HuanZheXinXi.class).add(
          (Criterion)Restrictions.eq("binglihao", blh)), 0, 1);
    if (list.size() > 0) {
      return list.get(0);
    }
    return null;
  }
  
  @Override
  public List<HuanZheXinXi> getHuanZheXinXiListBySearch(String search) {
    String hql = "from HuanZheXinXi where ";
    String factorSql = " 1=1 ";
    if (search != null && !search.isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and (binglihao ='" + search +
        "' or xingming like '%" + search + "%')";
    }
    return this.hibernateTemplate.find(String.valueOf(hql) + factorSql);
  }
  
  @Override
  public Long getOneExamedHzId() {
    String hql = "select h.id as hzid from HuanZheXinXi h,Jcd j where h.id=j.huanzheId and j.biaoshi=56 and j.jcjsTime is not null order by j.kdTime desc ";
    List<Long> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public String findMaxXiaoErBinglihao(String time) {
    String hql = "select max(binglihao) from " + 
      HuanZheXinXi.class.getName() + " where binglihao like '" + 
      time + "%'";
    List<Object> l = findByHql(hql);
    return (l.size() > 0) ? (String)l.get(0) : "";
  }
  
  @Override
  public Map<String, Object> getHuanZheXinXiMapByBLH(String blh) {
    List<Map<String, Object>> list = this.hibernateTemplate.find("select new map(xingming as xingming,xingbie as xingbie,shengri as shengri) from HuanZheXinXi where binglihao='" + blh + "'");
    if (list != null && list.size() > 0) {
      return list.get(0);
    }
    return null;
  }
  
  @Override
  public void evictHibernateTemplate(Object o) {
    this.hibernateTemplate.evict(o);
  }
  
  @Override
  public Long getHzxxCountByHzTjForm(HzTjForm hzTjForm) {
    String hql = "select count(*) from HuanZheXinXi where 1=1 ";
    Map<String, Object> map = new HashMap<String, Object>();
    hql = String.valueOf(hql) + createSelectByHzTjForm(hzTjForm, map);
    hql = String.valueOf(hql) + " group by diquId";
    System.out.println(hql);
    List list = findList(hql, map);
    return Long.valueOf((list.size() > 0) ? Long.parseLong(list.get(0).toString()) : 0L);
  }
  
  private String createSelectByHzTjForm(HzTjForm form, Map<String, Object> map) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    StringBuilder sb = new StringBuilder();
    sb.append(" and id in (select huanzheId from Jiuzhen jz where 1=1 ");
    if ("sj".equals(form.getTimeType())) {
      if ((form.getfTime1() != null && !form.getfTime1().isEmpty()) || (
        form.getfTime2() != null && !form.getfTime2().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        sb.append(" and jz.caozuoTime between :startTime and :endTime");
      } else if (form.getfTime1() != null && !form.getfTime1().isEmpty() && (
        form.getfTime2() == null || form.getfTime2().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime1()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        sb.append(" and jz.caozuoTime between :startTime and :endTime");
      } else if (form.getfTime2() != null && !form.getfTime2().isEmpty() && (
        form.getfTime1() == null || form.getfTime1().isEmpty())) {
        try {
          map.put("startTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 00:00:00"));
          map.put("endTime", 
              sdf.parse(String.valueOf(form.getfTime2()) + " 23:59:59"));
        } catch (ParseException e) {
          e.printStackTrace();
        } 
        sb.append(" and jz.caozuoTime between :startTime and :endTime");
      } 
      sb.append(")");
    } else {
      SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
      Calendar c = Calendar.getInstance();
      c.set(1, Integer.parseInt(form.getfTime1()));
      c.set(2, Integer.parseInt(form.getfTime2()) - 1);
      c.set(5, c.getActualMinimum(5));
      String time1 = format.format(c.getTime());
      c.set(5, c.getActualMaximum(5));
      String time2 = format.format(c.getTime());
      try {
        map.put("startTime", sdf.parse(String.valueOf(time1) + " 00:00:00"));
        map.put("endTime", sdf.parse(String.valueOf(time2) + " 23:59:59"));
        sb.append(" and jz.caozuoTime between :startTime and :endTime");
      } catch (ParseException e) {
        e.printStackTrace();
      } 
      sb.append(")");
    } 
    if (form.getDiquIds() != null && !form.getDiquIds().isEmpty()) {
      String[] str = form.getDiquIds().split(",");
      if (str.length == 1) {
        sb.append(" and diquId = " + str[0]);
      } else {
        sb.append(" and diquId in(" + form.getDiquIds() + ")");
      } 
    } 
    return sb.toString();
  }
}
