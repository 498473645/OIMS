package cn.com.oims.dao.impl;

import cn.com.oims.dao.IJiuzhenDao;
import cn.com.oims.dao.pojo.ChuFangList;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.JzZhenduan;
import cn.com.oims.dao.pojo.JzZhenduanPK;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.dao.pojo.Paidui;
import cn.com.oims.web.form.BlTjForm;
import cn.com.oims.web.form.JiuZhenSearchform;
import cn.com.oims.web.form.TongJiForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import javax.imageio.ImageIO;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.ResultTransformer;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StringType;
import org.hibernate.type.Type;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

@Component
public class JiuzhenDaoImpl extends BaseDaoImpl implements IJiuzhenDao {
  private String countHql = "select count(*) from Jiuzhen j";

  private String clazzName = Jiuzhen.class.getSimpleName();

  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Jiuzhen.class);
  }

  @Override
  public int counts() {
    int i = (Integer)this.hibernateTemplate.findByCriteria(this.getDC().setProjection(Projections.rowCount())).get(0);
    return i;
  }

  @Override
  public List<Jiuzhen> findAllJiuzhen4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), p.getStartRow().intValue(),
        p.getPageSize().intValue());
  }

  @Override
  public List<Jiuzhen> findAllJiuzhen() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }

  @Override
  public Serializable saveJiuzhen(Jiuzhen o) {
    return this.hibernateTemplate.save(o);
  }

  @Override
  public void delJiuzhen(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }

  @Override
  public void saveOrUpdateJiuzhen(Jiuzhen o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }

  @Override
  public Jiuzhen findJiuzhenById(Serializable id) {
    return (Jiuzhen)this.hibernateTemplate.get(Jiuzhen.class, id);
  }

  @Override
  public void updateJiuzhen(Jiuzhen o) {
    this.hibernateTemplate.update(o);
  }

  @Override
  public int getJiuZhenTime(Long huanzheid, int state) {
    int i = counts(String.valueOf(this.countHql) + " where j.huanzheId=" + huanzheid +
        " and j.state=" + state);
    return i;
  }

  @Override
  public List getJiuZhenHuanZheList(Page page, JiuZhenSearchform jzsf) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorStr = page.getFactor();
    String state = factorStr;
    String hql = "";
    String factorSql = getQueryCondition(jzsf, map);
    factorSql = String.valueOf(factorSql) + " and j.state=" + state + " order by j.caozuoTime desc";
    int size = 0;
    if (!map.isEmpty()) {
      size = counts(String.valueOf(this.countHql) +
          " ,HuanZheXinXi h where h.id=j.huanzheId and " +
          factorSql, map);
    } else {
      size = count(String.valueOf(this.countHql) +
          " ,HuanZheXinXi h where h.id=j.huanzheId and " +
          factorSql);
    }
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    hql = "select new map(h.binglihao as binglihao,h.xingming as hzxm,h.xingbie as hzxb,h.shengri as csrq,h.sfzh as sfzh,h.shouji as shouji,j.id as id,j.huanzheId as huanzheid,j.fzys as fzys,j.state as jiuzhenState,j.caozuoTime as caozuoTime,j.zhenbie as zhenbie) from Jiuzhen j,HuanZheXinXi h where j.huanzheId=h.id and " +

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

  private String getQueryCondition(JiuZhenSearchform jzsf, Map<String, Date> map) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String factorSql = " 1=1 ";
    if (jzsf.getSearch() != null && !jzsf.getSearch().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and (h.binglihao ='" + jzsf.getSearch() +
        "' or h.xingming like '%" + jzsf.getSearch() + "%')";
    }
    if (jzsf.getBinglihao() != null && !jzsf.getBinglihao().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.binglihao ='" + jzsf.getBinglihao() + "'";
    }
    if (jzsf.getXingbie() != null && jzsf.getXingbie().intValue() != 2) {
      factorSql = String.valueOf(factorSql) + " and h.xingbie ='" + jzsf.getXingbie() + "'";
    }
    if (jzsf.getXingming() != null && !jzsf.getXingming().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.xingming like '%" + jzsf.getXingming() + "%'";
    }
    if (jzsf.getSfzh() != null && !jzsf.getSfzh().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.sfzh='" + jzsf.getSfzh() + "'";
    }
    if (jzsf.getShouji() != null && !jzsf.getShouji().isEmpty()) {
      factorSql = String.valueOf(factorSql) + " and h.shouji='" + jzsf.getShouji() + "'";
    }
    if (jzsf.getZhenbie() != null) {
      factorSql = String.valueOf(factorSql) + " and j.zhenbie=" + jzsf.getZhenbie();
    }
    if (jzsf.getStartTime() != null && !jzsf.getStartTime().isEmpty() &&
      jzsf.getEndTime() != null && !jzsf.getEndTime().isEmpty()) {
      try {
        map.put("startTime",
            sdf.parse(String.valueOf(jzsf.getStartTime()) + " 00:00:00"));
        map.put("endTime", sdf.parse(String.valueOf(jzsf.getEndTime()) + " 23:59:59"));
      } catch (ParseException e) {
        e.printStackTrace();
      }
      factorSql = String.valueOf(factorSql) + " and j.caozuoTime between :startTime and :endTime";
    }
    if (jzsf.getStartTime() != null && !jzsf.getStartTime().isEmpty() && (
      jzsf.getEndTime() == null || jzsf.getEndTime().isEmpty())) {
      try {
        Date time = sdf.parse(String.valueOf(jzsf.getStartTime()) + " 00:00:00");
        map.put("startTime", MultiUtils.getStartTimeOfDay(time));
        map.put("endTime", MultiUtils.getEndTimeOfDay(time));
        factorSql = String.valueOf(factorSql) + " and j.caozuoTime between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    return factorSql;
  }

  @Override
  public Long findJzcsByHuanzheId(Long id, Integer state) {
    List<Long> ls = this.hibernateTemplate.findByCriteria(
        DetachedCriteria.forClass(Jiuzhen.class).add((Criterion)Restrictions.eq("huanzheId", id))
        .add((Criterion)Restrictions.eq("state", state))
        .setProjection(Projections.rowCount()));
    Long t = ls.get(0);
    return t;
  }

  @Override
  public List getPatientListToday(String state, String gonghao, String search, String path) {
    boolean b = Pattern.matches("^[0-9]+$", search);
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.id as id,a.serialNo as serial_no,a.haoma as haoma,a.huanzheId as patientId,a.caozuoren as caozuoren,a.caozuoTime as caozuotime,a.fzys as fzys,a.zhenbie as zhenbie,a.state as state ,h.xingming as name,h.shengri as birthday,h.photourl as photo,h.shouji as mobile,h.xingbie as sex,h.binglihao as binglihao,h.sfzh as sfzh,h.gzdw as gzdw,h.dwyb as dwyb,h.dwdz as dwdz,h.dwdh as dwdh,h.jtdz as jtdz,h.youbian as youbian,h.dianhua as dianhua,h.hzlxr as hzlxr,h.hzlxrdh as hzlxrdh,h.yhzgx as yhzgx,h.yibao as yibao,h.yibaohao as yibaohao,h.shangbao as shangbao,h.gongfei as gongfei,h.zcrq as zcrq,h.jilvren as jilvren,h.beizhu as beizhu,( select f.category from Category f where f.id = h.laiyuan) as laiyuan) from Jiuzhen a, HuanZheXinXi h  where h.id=j.huanzheId ";
    hql = String.valueOf(hql) + "and ((a.caozuoTime between :startTime and :endTime)";
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    map.put("startTime", startTime);
    map.put("endTime", endTime);
    hql = String.valueOf(hql) + " or (a.zhenbie=3 and a.state!=29))";
    if (state != null) {
      hql = String.valueOf(hql) + " and a.state in (" + state + ")";
    }
    if (gonghao != null) {
      hql = String.valueOf(hql) + " and a.fzys=:gonghao";
      map.put("gonghao", gonghao);
    }
    if (b) {
      hql = String.valueOf(hql) + " and exists (from HuanZheXinXi where id=a.huanzheId and binglihao=:search) ";
      map.put("search", search);
    } else if (search.contains("oims")) {
      hql = String.valueOf(hql) + " and exists (from HuanZheXinXi t where id=a.huanzheId and t.binglihao=:search)";
      if (search.startsWith("oims")) {
        map.put("search", search);
      } else {
        map.put("search", search.substring(1, search.length()));
      }
    } else if (search != null && !"".equals(search) &&
      !"请输入患者ID号或姓名".equals(search)) {
      hql = String.valueOf(hql) + " and exists ( from HuanZheXinXi t where t.id=a.huanzheId and (t.xingming like :search or t.binglihao=:blh))";
      map.put("search", "%" + search + "%");
      map.put("blh", search);
    }
    hql = String.valueOf(hql) + " order by serial_no";
    list = findList(hql, map);
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    SimpleDateFormat sdf_00 = new SimpleDateFormat("yyyy-MM-dd");
    for (int i = 0; i < list.size(); i++) {
      (list.get(i)).put("SN", Integer.valueOf(i + 1));
      Object oo = ((Map)list.get(i)).get("caozuotime");
      if (oo != null) {
        Date dd = (Date)oo;
        String cztime = sdf.format(dd);
        (list.get(i)).put("cztime", cztime);
      } else {
        (list.get(i)).put("cztime", "");
      }
      Object o1 = ((Map)list.get(i)).get("zcrq");
      if (o1 != null) {
        Date dd = (Date)o1;
        String zcrq = sdf.format(dd);
        (list.get(i)).put("zcrq_str", zcrq);
      } else {
        (list.get(i)).put("zcrq_str", "");
      }
      Object o2 = ((Map)list.get(i)).get("birthday");
      if (o2 != null) {
        Date dd = (Date)o2;
        String birthday = sdf_00.format(dd);
        (list.get(i)).put("birthday_str", birthday);
      } else {
        (list.get(i)).put("birthday_str", "");
      }
      String photo = (((Map)list.get(i)).get("photo") != null) ? ((Map)list.get(i))
        .get("photo").toString() : "";
      if (!"".equals(photo)) {
        Map<String, Object> map_wh = new HashMap<String, Object>();
        map_wh = get_w_h(String.valueOf(path) + photo);
        if (map_wh == null) {
          (list.get(i)).put("w", Integer.valueOf(0));
          (list.get(i)).put("h", Integer.valueOf(0));
        } else {
          ((Map)list.get(i)).put("w", map_wh.get("w"));
          ((Map)list.get(i)).put("h", map_wh.get("h"));
        }
      }
    }
    return list;
  }

  @Override
  public List getPatientStateCount(Integer state, String gonghao) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    String hql = "select  new map(a.id as id)  from Jiuzhen a  where 1=1 ";
    hql = String.valueOf(hql) + "and a.caozuoTime between :startTime and :endTime";
    map.put("startTime", startTime);
    map.put("endTime", endTime);
    if (state != null) {
      hql = String.valueOf(hql) + " and a.state=:state";
      map.put("state", Integer.valueOf(state.intValue()));
    }
    if (gonghao != null) {
      hql = String.valueOf(hql) + " and a.fzys=:gonghao";
      map.put("gonghao", gonghao);
    }
    list = findList(hql, map);
    return list;
  }

  @Override
  public List getMedicalRecords(String hzid) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql_01 = "select new map(a.id as id,a.caozuoTime as czdate,a.state as state,a.fzys as fzys,a.huanzheId as hzid ,(select c.xingming from YuanGong c where c.gonghao = a.fzys ) as doctor ,(select d.bmmc from BuMen d where d.id = (select c.bumenId from YuanGong c where c.gonghao = a.fzys))as bumen)  from  Jiuzhen a  where a.huanzheId =:hzid order by a.caozuoTime desc";
    map.put("hzid", Long.valueOf(Long.parseLong(hzid)));
    list = findList(hql_01, map);
    for (int i = 0; i < list.size(); i++) {
      Object oo = ((Map)list.get(i)).get("czdate");
      if (oo != null) {
        Date dd = (Date)oo;
        String date = sdf.format(dd);
        (list.get(i)).put("date", date);
      }
    }
    return list;
  }

  @Override
  public List<Jzjl> getMC(String jzid, String cid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.id as jlid,a.jilu as info, a.picPath as iurl )from Jzjl a where a.jiuzhenId = :jzid  and a.categoryId = :cid  ";
    map.put("jzid", Long.valueOf(Long.parseLong(jzid)));
    map.put("cid", Integer.valueOf(Integer.parseInt(cid)));
    list = findList(hql, map);
    List<Jzjl> list_c = new ArrayList<Jzjl>();
    if (list.size() > 0) {
      for (int i = 0; i < list.size(); i++) {
        Jzjl j = new Jzjl();
        Map<String, Object> m = new HashMap<String, Object>();
        m = list.get(i);
        j.setJiuzhenId(Long.valueOf(Long.parseLong(jzid)));
        j.setCategoryId(Integer.valueOf(Integer.parseInt(cid)));
        j.setId((m.get("jlid") != null) ? Long.valueOf(Long.parseLong(m.get("jlid")
                .toString())) : null);
        j.setJilu((m.get("info") != null) ? m.get("info").toString() :
            null);
        j.setPicPath((m.get("iurl") != null) ? m.get("iurl").toString() :
            null);
        list_c.add(j);
      }
    }
    return list_c;
  }

  @Override
  public String saveOrUpdateMC(String jlid, String jlr, String jzid, String cid, String jl) {
    String bl = "";
    Jzjl j = new Jzjl();
    j.setId((jlid != null && jlid != "") ? Long.valueOf(Long.parseLong(jlid)) : null);
    j.setJiuzhenId(Long.valueOf(Long.parseLong(jzid)));
    j.setCategoryId(Integer.valueOf(Integer.parseInt(cid)));
    j.setJilu(jl);
    j.setJlren(jlr);
    j.setJlTime(new Date());
    try {
      this.hibernateTemplate.saveOrUpdate(j);
      bl = j.getId().toString();
    } catch (DataAccessException e) {
      bl = j.getId().toString();
      e.printStackTrace();
    }
    return bl;
  }

  @Override
  public List getShiLiUrl(String jzid) {
    String hql = "select new map(a.id as id,a.jiuzhen_id as jzid,a.ll as l_l,a.ljz as jz_l,a.lj as j_l,a.rl as l_r,a.rjz as jz_r,a.rj as j_r,a.jcys as jcys,a.jcsj as jcsj,a.ledtrs as ledtrs,a.redtrs as redtrs ) from ShiLi a where a.jiuzhen_id = " +

      jzid + " " +
      "order by a.jcsj desc";
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    list = this.hibernateTemplate.find(hql);
    return list;
  }

  @Override
  public List getStudyList(String jzid) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    String hql = "select new map(a.id as id,a.jcdh as jcdh, a.jiuzhenId as jiuzhenid,a.biaoti as title,a.jcsbId as jcsbid,a.huanzheId as hzid,a.jcxmIds as jcxmids, a.kdksId as kdksid,a.kdys as kdys, a.kdTime as kdtime, a.jcksId as jcksid, a.jcys as jcys, a.jcksTime as startTime, a.jcjsTime as endTime, a.leftPic as leftpic, a.rightPic as rightpic, a.jfbs as jfbs, a.biaoshi as biaoshi, a.yanbie as yanbie,a.jcyq as jcyq,a.state as state)  from  Jcd a  where a.jiuzhenId = " +

      jzid +
      " " +
      " and a.jcxmIds not in (select b.id from Jcxm b where b.categoryId = 8)";
    list = this.hibernateTemplate.find(hql);
    for (int i = 0; i < list.size(); i++) {
      String s = (((Map)list.get(i)).get("startTime") != null) ? ((Map)list.get(i))
        .get("startTime").toString() : null;
      String e = (((Map)list.get(i)).get("endTime") != null) ? ((Map)list.get(i))
        .get("endTime").toString() : null;
      if (s != null && e != null) {
        s = s.substring(0, s.length() - 2);
        e = e.substring(11, e.length() - 2);
        (list.get(i)).put("startTime", s);
        (list.get(i)).put("endTime", e);
      }
    }
    return list;
  }

  @Override
  public List getYanYaUrl(String jzid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    String hql = "select new map(a.id as id,a.od as right,a.os as left,a.jiuzhen_id as jzid,a.jcys as jcys,a.ycsj as ycsj,a.beizhu as beizhu,a.methodOD as methodOD,a.methodOS as methodOS,a.refuse as refuse) from YanYa a where a.jiuzhen_id = " +

      jzid;
    list = this.hibernateTemplate.find(hql);
    return list;
  }

  @Override
  public List getOnePatient(String jzid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    String hql_01 = "select new map(a.id as patientId,a.xingming as name,a.xingbie as sex,a.shengri as birthday) from HuanZheXinXi a where a.id = (select b.huanzheId from Jiuzhen b where b.id = " +

      jzid + ")";
    String hql_03 = "select new map(b.huanzheId as hzid,b.id as jzid) from Jiuzhen b where b.id > 0 order by b.caozuoTime ";
    list = this.hibernateTemplate.find(hql_03);
    String hzid = "";
    if (list.size() > 0) {
      hzid = ((Map)list.get(0)).get("hzid").toString();
    }
    String hql_02 = "select new map(a.xingming as name,a.xingbie as sex,a.id as patientId,a.shengri as birthday) from HuanZheXinXi a where a.id =  " +

      hzid;
    if (jzid == null || "".equals(jzid)) {
      list = this.hibernateTemplate.find(hql_02);
    } else {
      list = this.hibernateTemplate.find(hql_01);
    }
    return list;
  }

  @Override
  public List<Map<String, Object>> getShuruMoBan(String cid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.suoyin as index,a.shuru as val) from ShuruMoban a where a.categoryId = :cid ";
    map.put("cid", Integer.valueOf(Integer.parseInt(cid)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public boolean isExistJiuZhenToHuanZheXinXi(Long hzid) {
    String hql = "from Jiuzhen jz where jz.huanzheId=" + hzid;
    List list = this.hibernateTemplate.find(hql);
    return (list.size() > 0);
  }

  @Override
  public List<Map<String, Object>> getStudy(String jcdid, String path) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    List<String> filelist = new ArrayList<String>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map (a.huanzheId as hzid,a.jiuzhenId as jzid) from  Jcd a  where a.id = :id";
    map.put("id", Long.valueOf(Long.parseLong(jcdid)));
    list = findList(hql, map);
    String hzid = "";
    String jzid = "";
    if (list.size() > 0) {
      Object oo1 = ((Map)list.get(0)).get("hzid");
      hzid = (oo1 != null) ? oo1.toString() : null;
      Object oo2 = ((Map)list.get(0)).get("jzid");
      jzid = (oo2 != null) ? oo2.toString() : null;
    }
    String filepath = "";
    String absolutepath = "";
    if (hzid != null && jzid != null) {
      filepath = String.valueOf(path) + "\\UploadFile\\" + hzid + "\\" + jzid + "\\" +
        jcdid + "\\thumb";
      absolutepath = "\\UploadFile\\" + hzid + "\\" + jzid + "\\" + jcdid +
        "\\thumb";
    }
    list.clear();
    filelist = readfile(filepath, absolutepath);
    for (int i = 0; i < filelist.size(); i++) {
      Map<String, Object> ma = new HashMap<String, Object>();
      ma.put("path", filelist.get(i));
      String temp = ((String)filelist.get(i)).substring((
          (String)filelist.get(i)).lastIndexOf(".") + 1, (
          (String)filelist.get(i)).length());
      if ("flv".equals(temp) || "FLV".equals(temp)) {
        ma.put("w", Integer.valueOf(0));
        ma.put("h", Integer.valueOf(0));
      } else {
        Map<String, Object> map_wh = new HashMap<String, Object>();
        map_wh = get_w_h(String.valueOf(path) + (String)filelist.get(i));
        if (map_wh == null) {
          ma.put("w", Integer.valueOf(0));
          ma.put("h", Integer.valueOf(0));
        } else {
          ma.put("w", map_wh.get("w"));
          ma.put("h", map_wh.get("h"));
        }
      }
      ma.put("message", "");
      list.add(ma);
    }
    return list;
  }

  public Map<String, Object> get_w_h(String imgpath) {
    Map<String, Object> map = new HashMap<String, Object>();
    File imgfile = new File(imgpath);
    try {
      FileInputStream fis = new FileInputStream(imgfile);
      BufferedImage buff = ImageIO.read(imgfile);
      map.put("w", Long.valueOf(buff.getWidth() * 1L));
      map.put("h", Long.valueOf(buff.getHeight() * 1L));
      fis.close();
    } catch (FileNotFoundException e) {
      System.err.println("所给的图片文件" + imgfile.getPath() +
          "不存在！计算图片尺寸大小信息失败！");
      map = null;
    } catch (IOException e) {
      System.err.println("计算图片" + imgfile.getPath() + "尺寸大小信息失败！");
      map = null;
    }
    return map;
  }

  public static List<String> readfile(String filepath, String absolutepath) {
    List<String> list = new ArrayList<String>();
    File file = new File(filepath);
    if (file.isDirectory()) {
      String[] filelist = file.list();
      for (int i = 0; i < filelist.length; i++) {
        File readfile = new File(String.valueOf(filepath) + "\\" + filelist[i]);
        if (!readfile.isDirectory()) {
          String filename = readfile.getName();
          if (filename.indexOf(".db") == -1) {
            list.add(String.valueOf(absolutepath) + "\\" + readfile.getName());
          }
        }
      }
    }
    return list;
  }

  @Override
  public List<Map<String, Object>> getChangGuiList(String cid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    int ci = Integer.parseInt(cid);
    String hql = "select new map(a.categoryId as categoryid,a.id as id ,a.xmmc as xmmc ,a.xmms as xmms ,a.bianma as bianma ) from  Jcxm a  where a.categoryId = :cid";
    map.put("cid", Integer.valueOf(ci));
    list = findList(hql, map);
    return list;
  }

  @Override
  public List<Map<String, Object>> getTeShuList(String cid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.jbflId as jbflid)from  JcxmFenlei a  where  a.jcxmId in (select b.id from Jcxm b where b.categoryId = :cid)";
    String hql_1 = "select new map (a.id as id ,a.category as category,a.intr as intr) from  Category a where  a.id = :id ";
    String hql_2 = "select new map(a.id as id,a.bianma as bianma,a.categoryId as categoryid,a.xmmc as xmmc,a.xmms as xmms) from  Jcxm a  where  a.id in  ( select b.jcxmId from JcxmFenlei b where b.jbflId = :jbid  ) order by a.bianma";
    int ci = Integer.parseInt(cid);
    map.put("cid", Integer.valueOf(ci));
    list = findList(hql, map);
    List<String> list_jbid = new ArrayList<String>();
    for (int i = 0; i < list.size(); i++) {
      if (!list_jbid.contains(((Map)list.get(i)).get("jbflid").toString())) {
        list_jbid.add(((Map)list.get(i)).get("jbflid").toString());
      }
    }
    List<Map<String, Object>> result_list = new ArrayList<Map<String, Object>>();
    for (int j = 0; j < list_jbid.size(); j++) {
      map.clear();
      String id = list_jbid.get(j);
      int i_d = Integer.parseInt(id);
      map.put("id", Integer.valueOf(i_d));
      list.clear();
      list = findList(hql_1, map);
      if (list.size() > 0) {
        Map<String, Object> m = new HashMap<String, Object>();
        m.put("jbid", ((Map)list.get(0)).get("id"));
        m.put("jbname", ((Map)list.get(0)).get("category"));
        map.clear();
        map.put("jbid", ((Map)list.get(0)).get("id"));
        list.clear();
        list = findList(hql_2, map);
        List<Map<String, Object>> jbxm = new ArrayList<Map<String, Object>>();
        for (int y = 0; y < list.size(); y++) {
          Map<String, Object> n = new HashMap<String, Object>();
          n.put("xmid", ((Map)list.get(y)).get("id"));
          n.put("xmmc", ((Map)list.get(y)).get("xmmc"));
          jbxm.add(n);
        }
        m.put("jcxm", jbxm);
        result_list.add(m);
      }
    }
    return result_list;
  }

  @Override
  public List getJiuZhenState(String state) {
    Map<String, Object> map = new HashMap<String, Object>();
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    String hql = "select new map(a.id as id,a.category as category,a.intr as intr) from  Category a  where a.fatherid = :id";
    map.put("id", Integer.valueOf(Integer.parseInt(state)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public List<Map<String, Object>> getZhenDuanList(String jzid) {
    Map<String, Object> map = new HashMap<String, Object>();
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    String hql = "select new map(a.jiuzhen_id as jzid ,a.zdfl_id as zdflid,a.zdys as zdys,a.zd_time as zd_time ,a.confirmed as confirmed,a.eye as eye,(select b.disease from JiBing b where b.id = a.zdfl_id)as zdflname,(select b.icd_code from JiBing b where b.id = a.zdfl_id)as icdCode) from JzZhenduan a  where a.jiuzhen_id = :jzid";
    map.put("jzid", Long.valueOf(Long.parseLong(jzid)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public String saveJcdInfo(String jzid, String hzid, String jcxmid, String jcxmmc, String pic_1, String pic_2, String kdys, String yb, String jcyq) {
    String jcdid = "";
    try {
      String hql = "select new map(a.id as id,a.gonghao as gonghao,a.bumenId as bumenid) from  YuanGong a where a.gonghao = :gh";
      Map<String, Object> map = new HashMap<String, Object>();
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      map.put("gh", kdys);
      list = findList(hql, map);
      Jcd j = new Jcd();
      String bumen = "";
      if (list.size() > 0) {
        Object oo = ((Map)list.get(0)).get("bumenid");
        bumen = (oo != null) ? oo.toString() : "0";
      }
      j.setJcdh("M125");
      j.setJiuzhenId(Long.valueOf(Long.parseLong(jzid)));
      j.setBiaoti(jcxmmc);
      j.setJcsbId(Integer.valueOf(0));
      j.setHuanzheId(Long.valueOf(Long.parseLong(hzid)));
      j.setJcxmIds(jcxmid);
      j.setKdksId(Integer.valueOf(Integer.parseInt(bumen)));
      j.setKdys(kdys);
      j.setKdTime(new Date());
      j.setJfbs(true);
      j.setYanbie(Integer.valueOf(Integer.parseInt(yb)));
      j.setBiaoshi(Integer.valueOf(50));
      j.setLeftPic(pic_1);
      j.setRightPic(pic_2);
      j.setJcyq(jcyq);
      save(Jcd.class.getSimpleName(), j);
      j.setJcdh(j.getId().toString());
      update(Jcd.class.getSimpleName(), j);
      jcdid = j.getId().toString();
    } catch (NumberFormatException e) {
      e.printStackTrace();
    }
    return jcdid;
  }

  @Override
  public boolean updateJiuZhenState(String jzid, String czys, String newstate) {
    boolean bl = false;
    try {
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql = "select new map(a.id as id,a.caozuoren as caozuoren,a.caozuoTime as caozuoTime,a.fzys as fzys,a.haoma as haoma,a.huanzheId as huanzheId,a.state as state,a.zhenbie as zhenbie) from Jiuzhen a where a.id = :jzid";
      map.put("jzid", Long.valueOf(Long.parseLong(jzid)));
      list = findList(hql, map);
      Jiuzhen jz = new Jiuzhen();
      if (list.size() > 0) {
        Object o1 = ((Map)list.get(0)).get("id");
        jz.setId((o1 != null) ? Long.valueOf(Long.parseLong(o1.toString())) : null);
        Object o2 = ((Map)list.get(0)).get("caozuoren");
        jz.setCaozuoren((o2 != null) ? o2.toString() : null);
        Object o3 = ((Map)list.get(0)).get("caozuoTime");
        jz.setCaozuoTime((o3 != null) ? (Date)o3 : null);
        Object o4 = ((Map)list.get(0)).get("fzys");
        jz.setFzys((o4 != null) ? o4.toString() : null);
        Object o5 = ((Map)list.get(0)).get("haoma");
        jz.setHaoma((o5 != null) ? o5.toString() : null);
        Object o6 = ((Map)list.get(0)).get("huanzheId");
        jz.setHuanzheId((o6 != null) ? Long.valueOf(Long.parseLong(o6.toString())) :
            null);
        Object o7 = ((Map)list.get(0)).get("zhenbie");
        jz.setZhenbie((o7 != null) ? Integer.valueOf(Integer.parseInt(o7.toString())) :
            null);
        update(Jiuzhen.class.getSimpleName(), jz);
        bl = true;
      } else {
        bl = false;
      }
    } catch (Exception e) {
      bl = false;
      e.printStackTrace();
    }
    return bl;
  }

  @Override
  public List<Map<String, Object>> getJiBingList(String jblb) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.id as id, a.fatherid as fatherid, a.intr as intr, a.category as category) from  Category a  where a.fatherid = :jblb";
    map.put("jblb", Integer.valueOf(Integer.parseInt(jblb)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public boolean delZhenDuan(Integer zdflid, String jzid) {
    boolean bl = false;
    try {
      String hql = "delete from JzZhenduan a where a.jiuzhen_id = :jzid and a.zdfl_id = :zdflid";
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("zdflid", zdflid);
      map.put("jzid", jzid);
      JzZhenduanPK p = new JzZhenduanPK();
      p.setJiuzhen_id(Long.valueOf(Long.parseLong(jzid)));
      p.setZdfl_id(zdflid);
      JzZhenduan jz = new JzZhenduan();
      jz.setJiuzhen_id(Long.valueOf(Long.parseLong(jzid)));
      jz.setZdfl_id(zdflid);
      this.hibernateTemplate.delete(JzZhenduan.class.getSimpleName(), jz);
      bl = true;
    } catch (NumberFormatException e) {
      bl = false;
      e.printStackTrace();
    }
    return bl;
  }

  @Override
  public List<Map<String, Object>> matchJiBingName(String name) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.id as id,a.category as category) from  Category a  where a.category = :name";
    map.put("name", name);
    list = findList(hql, map);
    return list;
  }

  @Override
  public boolean saveZhenDuan(Integer jbfl, String jzid, String confirm, String czys) {
    boolean bl = false;
    try {
      JzZhenduan jz = new JzZhenduan();
      jz.setZdfl_id(jbfl);
      jz.setJiuzhen_id(Long.valueOf(Long.parseLong(jzid)));
      jz.setConfirmed(Integer.valueOf(Integer.parseInt(confirm)));
      jz.setZd_time(new Date());
      jz.setZdys(czys);
      save(JzZhenduan.class.getSimpleName(), jz);
      bl = true;
    } catch (NumberFormatException e) {
      bl = false;
      e.printStackTrace();
    }
    return bl;
  }

  @Override
  public List<Map<String, Object>> getYanBieCategory(String fid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.id as id, a.category as category ) from  Category a  where a.fatherid = :fid";
    map.put("fid", Integer.valueOf(Integer.parseInt(fid)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public List<Map<String, Object>> getJiuZhenImage(String jlid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.id as id, a.categoryId as category, a.picPath as iurl) from  Jzjl a  where a.id = :jlid";
    map.put("jlid", Long.valueOf(Long.parseLong(jlid)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public List<Map<String, Object>> getZhenDuanInfo(String jzid) {
    return getZhenDuanList(jzid);
  }

  @Override
  public List getJiBingIntrList(String jblb) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.id as id, a.fatherid as fatherid, a.intr as intr, a.category as category) from  Category a  where a.fatherid = :jblb";
    map.put("jblb", Integer.valueOf(Integer.parseInt(jblb)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public String getOfficeId(String jcxmid) {
    String bgs = "";
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> m = new HashMap<String, Object>();
    String hql = "select new map( a.bgsId as bgsId,  a.bmId as bmId,  a.id as id,  a.jcxmIds as jcxmIds,  a.protocol as protocol) from  SheBei a ";
    list = findList(hql, m);
    for (int i = 0; i < list.size(); i++) {
      Map<String, Object> map = new HashMap<String, Object>();
      map = list.get(i);
      String jcxmids = (map.get("jcxmIds") != null) ? map.get("jcxmIds")
        .toString() : "";
      if (jcxmids.length() > 0) {
        String[] jc = jcxmids.split(",");
        for (int x = 0; x < jc.length; x++) {
          if (jcxmid.equals(jc[x])) {
            bgs = (map.get("bgsId") != null) ? map.get("bgsId")
              .toString() : "";
          }
        }
      }
    }
    return bgs;
  }

  @Override
  public String getMaxPaiDuiXuHao() {
    String max = "0";
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> m = new HashMap<String, Object>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.jcdId as jcdId, a.officeId as officeId, a.xuhao as xuhao, a.yxjb as yxjb, a.addTime as addTime) from  Paidui a  order by a.xuhao desc";
    list = findList(hql, m);
    if (list.size() > 0) {
      map = list.get(0);
      max = (map.get("xuhao") != null) ? map.get("xuhao").toString() : "0";
    }
    return max;
  }

  @Override
  public boolean addPaiDuiInfo(String jcdh, String bgsid, int xh) {
    boolean bl = false;
    try {
      Paidui p = new Paidui();
      p.setAddTime(new Date());
      p.setJcdId(Long.valueOf(Long.parseLong(jcdh)));
      p.setOfficeId(Integer.valueOf(Integer.parseInt(bgsid)));
      p.setXuhao(Integer.valueOf(xh));
      p.setYxjb(Integer.valueOf(1));
      save(Paidui.class.getSimpleName(), p);
      bl = true;
    } catch (NumberFormatException e) {
      bl = false;
      e.printStackTrace();
    }
    return bl;
  }

  @Override
  public List getPatientListTodayByPage(String state, String gonghao, Page p, String search, String path) {
    boolean b = Pattern.matches("^[0-9]+$", search);
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    SimpleDateFormat sdf_ymd = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat sdf_01 = new SimpleDateFormat("yyyy");
    String nowYear = sdf_01.format(new Date());
    int ny = Integer.parseInt(nowYear);
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    int count = 0;
    Map<String, Object> pmap = new HashMap<String, Object>();
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    Date startTimeJz = MultiUtils.getPreviousDay(startTime, 1);
    String startTimeJz_str = sdf_ymd.format(startTimeJz);
    try {
      startTimeJz = sdf_ymd.parse(startTimeJz_str);
    } catch (ParseException e) {
      e.printStackTrace();
    }
    String hql = "select new map(a.id as id,a.serialNo as serial_no,a.haoma as haoma,a.huanzheId as patientId,a.caozuoren as caozuoren,a.caozuoTime as caozuotime,a.beizhu as keshi,a.fzys as fzys,( select e.xingming from YuanGong e where e.gonghao=a.fzys) as fzysName,a.zhenbie as zhenbie,a.state as state ,( select b.binglihao from HuanZheXinXi b where b.id = a.huanzheId )as binglihao,( select d.category from Category d where d.id = a.state )as pstate,( select b.xingming from HuanZheXinXi b where b.id = a.huanzheId )as name,( select d.shengri from HuanZheXinXi d where d.id = a.huanzheId ) as birthday,( select d.photourl from HuanZheXinXi d where d.id = a.huanzheId ) as photo,( select d.shouji from HuanZheXinXi d where d.id = a.huanzheId ) as mobile,( select d.xingbie from HuanZheXinXi d where d.id = a.huanzheId ) as sex) from Jiuzhen a  where 1=1 ";
    hql = String.valueOf(hql) + " and ((a.caozuoTime>=:startTime and a.caozuoTime<=:endTime) ";
    hql = String.valueOf(hql) + " or (a.zhenbie=60100 and a.caozuoTime>=:startTimeJz))";
    map.put("startTime", startTime);
    map.put("endTime", endTime);
    map.put("startTimeJz", startTimeJz);
    if (state != null && !state.isEmpty()) {
      hql = String.valueOf(hql) + " and a.state in (" + state + ") ";
    }
    if (gonghao != null && !gonghao.isEmpty()) {
      hql = String.valueOf(hql) + " and a.fzys=:gonghao";
      map.put("gonghao", gonghao);
    }
    if (b) {
      hql = String.valueOf(hql) + " and exists (from HuanZheXinXi where id=a.huanzheId and binglihao=:search) ";
      map.put("search", search);
    } else if (search.contains("oims")) {
      hql = String.valueOf(hql) + " and exists (from HuanZheXinXi t where and t.id=a.huanzheId and t.binglihao = :search)";
      if (search.startsWith("oims")) {
        map.put("search", search);
      } else {
        map.put("search", search.substring(1, search.length()));
      }
    } else if (search != null && !"".equals(search) &&
      !"请输入患者ID号或姓名".equals(search)) {
      hql = String.valueOf(hql) + " and exists ( from HuanZheXinXi t where t.id=a.huanzheId and (t.xingming like :search or t.binglihao=:blh))";
      map.put("search", "%" + search + "%");
      map.put("blh", search);
    }
    hql = String.valueOf(hql) + " order by serialNo";
    list = findList(hql, map);
    for (int i = 0; i < list.size(); i++) {
      list.get(i).put("SN", Integer.valueOf(i + 1));
    }
    count = list.size();
    p.setRowsCount(Integer.valueOf(count));
    p.init();
    List<Map<String, Object>> result_list = getListForPage(hql, p
        .getStartRow().intValue(), p.getPageSize().intValue(), map);
    int j;
    for (j = 0; j < result_list.size(); j++) {
      for (int y = 0; y < list.size(); y++) {
        String li = ((Map)result_list.get(j)).get("id").toString();
        String ly = ((Map)list.get(y)).get("id").toString();
        if (li.equals(ly)) {
          String sn = ((Map)list.get(y)).get("SN").toString();
          (result_list.get(j)).put("SN", sn);
        }
      }
    }
    for (j = 0; j < result_list.size(); j++) {
      String sexstr = (((Map)result_list.get(j)).get("sex") != null) ? ((Map)result_list
        .get(j)).get("sex").toString() : "";
      if (sexstr.equals("true")) {
        sexstr = "男";
      } else if (sexstr.equals("false")) {
        sexstr = "女";
      } else {
        sexstr = "";
      }
      (result_list.get(j)).put("psex", sexstr);
      Object o1 = ((Map)result_list.get(j)).get("birthday");
      if (o1 != null) {
        Date dd = (Date)o1;
        String birthday = sdf_01.format(dd);
        int age = ny - Integer.parseInt(birthday);
        (result_list.get(j)).put("page", Integer.valueOf(age));
        (result_list.get(j)).put("birthday", (
            new SimpleDateFormat("yyyy-MM-dd")).format(o1));
      } else {
        (result_list.get(j)).put("page", "");
      }
      Object o2 = ((Map)result_list.get(j)).get("caozuotime");
      if (o2 != null) {
        Date dd = (Date)o2;
        String ghtime = sdf.format(dd);
        (result_list.get(j)).put("ptime", ghtime);
      } else {
        (result_list.get(j)).put("ptime", "");
      }
      String photo = (((Map)list.get(j)).get("photo") != null) ? ((Map)list.get(j))
        .get("photo").toString() : "";
      if (!"".equals(photo)) {
        Map<String, Object> map_wh = new HashMap<String, Object>();
        map_wh = get_w_h(String.valueOf(path) + photo);
        System.out.println("map_wh");
        System.out.println(map_wh);
        if (map_wh == null) {
          (result_list.get(j)).put("w", Integer.valueOf(0));
          (result_list.get(j)).put("h", Integer.valueOf(0));
        } else {
          ((Map)result_list.get(j)).put("w", map_wh.get("w"));
          ((Map)result_list.get(j)).put("h", map_wh.get("h"));
        }
      }
    }
    pmap.put("page", p);
    result_list.add(0, pmap);
    return result_list;
  }

  @Override
  public Jiuzhen findLastJiuZhenByHuanZhe(Long hzid) {
    Date d = MultiUtils.getPreviousDay(MultiUtils.getStartTimeOfDay(), 7);
    List<Jiuzhen> list = this.hibernateTemplate.findByCriteria(DetachedCriteria.forClass(Jiuzhen.class).add((Criterion)Restrictions.ge("caozuoTime", d)).add((Criterion)Restrictions.eq("huanzheId", hzid)).addOrder(Order.desc("caozuoTime")), 0, 1);
    return (list.size() > 0) ? list.get(0) : null;
  }

  @Override
  public Long saveOrUpdateMC_New(String jl_id, String jz_id, String category_id, String jl_info, String pic_path, String jlr) {
    Long bl = null;
    Jzjl j = new Jzjl();
    j.setId((jl_id != null && jl_id != "") ? Long.valueOf(Long.parseLong(jl_id)) : null);
    j.setJiuzhenId(Long.valueOf(Long.parseLong(jz_id)));
    j.setCategoryId(Integer.valueOf(Integer.parseInt(category_id)));
    j.setJilu(jl_info);
    j.setJlren(jlr);
    j.setJlTime(new Date());
    j.setPicPath(pic_path);
    try {
      this.hibernateTemplate.saveOrUpdate(j);
      bl = (j.getId() != null) ? j.getId() : null;
    } catch (Exception e) {
      bl = (j.getId() != null) ? j.getId() : null;
      e.printStackTrace();
    }
    return bl;
  }

  @Override
  public String getJcxmIntrUrl(String jcxmid) {
    String pic_url = "";
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.id as id, a.leftPicPath as leftPicPath, a.rightPicPath as rightPicPath, a.xmmc as xmmc, a.xmms as xmms) from  Jcxm a  where a.id = :id";
    map.put("id", Integer.valueOf(Integer.parseInt(jcxmid)));
    list = findList(hql, map);
    if (list.size() > 0) {
      map.clear();
      map = list.get(0);
      String left = "";
      String right = "";
      left = (map.get("leftPicPath") != null) ? map.get("leftPicPath")
        .toString() : "";
      right = (map.get("rightPicPath") != null) ? map.get("rightPicPath")
        .toString() : "";
      pic_url = String.valueOf(left) + "," + right;
    }
    return pic_url;
  }

  @Override
  public List<Map<String, Object>> getTeShuListAll(String cid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql_0 = "select new map  (  b.id as xmid,  b.xmmc as xmmc  )  from  Jcxm b  where  b.categoryId = :cid";
    int ci = Integer.parseInt(cid);
    map.put("cid", Integer.valueOf(ci));
    list = findList(hql_0, map);
    return list;
  }

  @Override
  public List getYanGuangUrl(String jzid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql_0 = "select new map  (  b.id as id,  b.jcdid as jcdid,  b.jcsj as jcsj,  b.jcys as jcys,  b.jiuzhenid as jiuzhenid,  b.krtLAved as krtLAved,  b.krtLAvemm as krtLAvemm,  b.krtLCyla as krtLCyla,  b.krtLCylmm as krtLCylmm,  b.krtLHa as krtLHa,  b.krtLHd as krtLHd,  b.krtLHmm as krtLHmm,  b.krtLVa as krtLVa,  b.krtLVd as krtLVd,  b.krtLVmm as krtLVmm,  b.krtRAved as krtRAved,  b.krtRAvemm as krtRAvemm,  b.krtRCyla as krtRCyla,  b.krtRCylmm as krtRCylmm,  b.krtRHa as krtRHa,  b.krtRHd as krtRHd,  b.krtRHmm as krtRHmm,  b.krtRVa as krtRVa,  b.krtRVd as krtRVd,  b.krtRVmm as krtRVmm,  b.refLA as refLA,  b.refLC as refLC,  b.refLS as refLS,  b.refPd as refPd,  b.refRA as refRA,  b.refRC as refRC,  b.refRS as refRS  )  from  YanGuang b  where  b.jiuzhenid = :jzid";
    map.put("jzid", Long.valueOf(Long.parseLong(jzid)));
    list = findList(hql_0, map);
    return list;
  }

  @Override
  public List getJiuZhenByBlh(String blh) {
    String hql = "select new map(h.xingming as xingming,h.xingbie as xingbie,h.shengri as shengri,h.sfzh as sfzh,h.shouji as shouji,h.dianhua as dianhua,h.jtdz as jtdz,jz.id as jiuzhenId,jz.huanzheId as huanzheId) from HuanZheXinXi h,Jiuzhen jz where h.id=jz.huanzheId and h.binglihao='" +

      blh +
      "' and jz.caozuoTime is not null order by jz.caozuoTime desc";
    List list = this.hibernateTemplate.find(hql);
    return list;
  }

  @Override
  public List<Map<String, Object>> getDuiBiItemsInfoUrl(String jzids) {
    String jzidin = "";
    String[] jzidlist = jzids.split("#");
    for (int i = 0; i < jzidlist.length; i++) {
      jzidin = String.valueOf(jzidin) + jzidlist[i] + ",";
    }
    if (jzidin.length() > 0) {
      if (",".equals(jzidin.substring(jzidin.length() - 1,
            jzidin.length()))) {
        jzidin = jzidin.substring(0, jzidin.length() - 1);
      }
      System.out.println("jzidiin:" + jzidin);
    }
    List<Map<String, Object>> list_result = new ArrayList<Map<String, Object>>();
    int j;
    for (j = 0; j < jzidlist.length; j++) {
      List<Map<String, Object>> alist = new ArrayList<Map<String, Object>>();
      Map<String, Object> amap = new HashMap<String, Object>();
      String hql_0 = "select new map  (  b.id as jzid,  b.huanzheId as huanzheid,  b.caozuoTime as jztime  )  from  Jiuzhen b  where  b.id = :jzidin";
      amap.put("jzidin", Long.valueOf(Long.parseLong(jzidlist[j])));
      alist = findList(hql_0, amap);
      list_result.add(alist.get(0));
    }
    for (j = 0; j < list_result.size(); j++) {
      List<Map<String, Object>> alist = new ArrayList<Map<String, Object>>();
      Map<String, Object> amap = new HashMap<String, Object>();
      String hql_0 = "select new map  (  (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30100) as A30100 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30102) as A30102 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30103) as A30103 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30104) as A30104  )  from  Jiuzhen b  where  b.id = :jzidin";
      amap.put("jzidin",
          Long.valueOf(Long.parseLong(((Map)list_result.get(j)).get("jzid").toString())));
      alist = findList(hql_0, amap);
      if (alist.size() > 0) {
        ((Map)list_result.get(j)).put("A30001", alist.get(0));
      } else {
        (list_result.get(j)).put("A30001", "");
      }
    }
    for (j = 0; j < list_result.size(); j++) {
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql_1 = "select new map  (  (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30200) as A30200 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30201) as A30201 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30202) as A30202 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30203) as A30203 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30204) as A30204 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30205) as A30205 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30206) as A30206 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30207) as A30207 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30208) as A30208 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30209) as A30209 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30210) as A30210 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30211) as A30211 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30212) as A30212 , (select c.jilu from Jzjl c where c.jiuzhenId = b.id and c.categoryId = 30213) as A30213  )  from  Jiuzhen b  where  b.id = :jzidin ";
      map.put("jzidin",
          Long.valueOf(Long.parseLong(((Map)list_result.get(j)).get("jzid").toString())));
      list = findList(hql_1, map);
      if (list.size() > 0) {
        ((Map)list_result.get(j)).put("A30002", list.get(0));
      } else {
        (list_result.get(j)).put("A30002", "");
      }
    }
    for (j = 0; j < list_result.size(); j++) {
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql_1 = "select new map(  a.category as zhenduan , a.id as zhenduan_id  ) from Category a  where  a.id in  ( select  d.zdfl_id  from  JzZhenduan d  where  d.jiuzhen_id = :jzid )";
      map.put("jzid",
          Long.valueOf(Long.parseLong(((Map)list_result.get(j)).get("jzid").toString())));
      list = findList(hql_1, map);
      if (list.size() > 0) {
        String str = "";
        for (int n = 0; n < list.size(); n++) {
          str = String.valueOf(str) + "<p>" + ((Map)list.get(n)).get("zhenduan") + "</p>";
        }
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30005", str);
        list_result.get(j).put("A30005", temp);
      } else {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30005", "");
        list_result.get(j).put("A30005", temp);
      }
    }
    for (j = 0; j < list_result.size(); j++) {
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql_2 = "select new map(  a.ll as left_luoyan,  a.ljz as left_jiaozheng,  a.lj as left_jin,  a.rl as right_luoyan,  a.rjz as right_jiaozheng,  a.rj as right_jin) from ShiLi a  where  a.jiuzhen_id = :jzid ";
      map.put("jzid",
          Long.valueOf(Long.parseLong(((Map)list_result.get(j)).get("jzid").toString())));
      list = findList(hql_2, map);
      if (list.size() > 0) {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30007", list.get(0));
        list_result.get(j).put("A30007", temp);
      } else {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30007", "");
        list_result.get(j).put("A30007", temp);
      }
    }
    for (j = 0; j < list_result.size(); j++) {
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql_2 = "select new map(  a.od as right,  a.os as left,  a.ycsj as ycsj  )  from YanYa a  where  a.jiuzhen_id = :jzid ";
      map.put("jzid",
          Long.valueOf(Long.parseLong(((Map)list_result.get(j)).get("jzid").toString())));
      list = findList(hql_2, map);
      if (list.size() > 0) {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30008", list);
        list_result.get(j).put("A30008", temp);
      } else {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30008", "");
        list_result.get(j).put("A30008", temp);
      }
    }
    for (j = 0; j < list_result.size(); j++) {
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql_2 = "select new map  (  b.id as id,  b.jcdid as jcdid,  b.jcsj as jcsj,  b.jcys as jcys,  b.jiuzhenid as jiuzhenid,  b.krtLAved as krtLAved,  b.krtLAvemm as krtLAvemm,  b.krtLCyla as krtLCyla,  b.krtLCylmm as krtLCylmm,  b.krtLHa as krtLHa,  b.krtLHd as krtLHd,  b.krtLHmm as krtLHmm,  b.krtLVa as krtLVa,  b.krtLVd as krtLVd,  b.krtLVmm as krtLVmm,  b.krtRAved as krtRAved,  b.krtRAvemm as krtRAvemm,  b.krtRCyla as krtRCyla,  b.krtRCylmm as krtRCylmm,  b.krtRHa as krtRHa,  b.krtRHd as krtRHd,  b.krtRHmm as krtRHmm,  b.krtRVa as krtRVa,  b.krtRVd as krtRVd,  b.krtRVmm as krtRVmm,  b.refLA as refLA,  b.refLC as refLC,  b.refLS as refLS,  b.refPd as refPd,  b.refRA as refRA,  b.refRC as refRC,  b.refRS as refRS  )  from  YanGuang b  where  b.jiuzhenid = :jzid";
      map.put("jzid",
          Long.valueOf(Long.parseLong(((Map)list_result.get(j)).get("jzid").toString())));
      list = findList(hql_2, map);
      if (list.size() > 0) {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30009", list.get(0));
        list_result.get(j).put("A30009", temp);
      } else {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30009", "");
        list_result.get(j).put("A30009", temp);
      }
    }
    for (j = 0; j < list_result.size(); j++) {
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql_2 = "select new map(a.id as id,a.jcdh as jcdh, a.jiuzhenId as jiuzhenid,a.biaoti as title,a.jcsbId as jcsbid,a.huanzheId as hzid,a.jcxmIds as jcxmids, a.kdksId as kdksid,a.kdys as kdys, a.kdTime as kdtime, a.jcksId as jcksid, a.jcys as jcys, a.jcksTime as startTime, a.jcjsTime as endTime, a.leftPic as leftpic, a.rightPic as rightpic, a.jfbs as jfbs, a.biaoshi as biaoshi, a.yanbie as yanbie,a.jcyq as jcyq,a.state as state)  from  Jcd a  where a.jiuzhenId = :jzid";
      map.put("jzid",
          Long.valueOf(Long.parseLong(((Map)list_result.get(j)).get("jzid").toString())));
      list = findList(hql_2, map);
      if (list.size() > 0) {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30010", list);
        list_result.get(j).put("A30010", temp);
      } else {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30010", "");
        list_result.get(j).put("A30010", temp);
      }
    }
    for (j = 0; j < list_result.size(); j++) {
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql_2 = "select new map(  a.huayan_id as huayan_id,  a.type as type, (select b.category from Category b where b.id = a.type) as huayanitem  )  from HuaYanList a  where  a.jiuzhen_id = :jzid ";
      map.put("jzid",
          Integer.valueOf(Integer.parseInt(((Map)list_result.get(j)).get("jzid").toString())));
      list = findList(hql_2, map);
      if (list.size() > 0) {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30011", list);
        list_result.get(j).put("A30011", temp);
      } else {
        Map<String, Object> temp = new HashMap<String, Object>();
        temp.put("A30011", "");
        list_result.get(j).put("A30011", temp);
      }
    }
    System.out.println("list_result:");
    System.out.println(list_result);
    return list_result;
  }

  @Override
  public List<Map<String, Object>> getCategoryInfoUrl(String db_items) {
    List<Map<String, Object>> list_result = new ArrayList<Map<String, Object>>();
    String[] dbitemlist = db_items.split("##");
    for (int i = 0; i < dbitemlist.length; i++) {
      System.out.println("检查项目id：" + dbitemlist[i]);
      List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
      Map<String, Object> map = new HashMap<String, Object>();
      String hql_2 = "select new map (a.id as id ,a.category as category,a.intr as intr) from  Category a  where a.id = :id";
      map.put("id", Integer.valueOf(Integer.parseInt(dbitemlist[i].toString())));
      list = findList(hql_2, map);
      if (list.size() > 0) {
        list_result.add(list.get(0));
      }
    }
    return list_result;
  }

  @Override
  public List<Map<String, Object>> getHuaYanDanListUrl(String jzid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map (a.huayan_id as huayan_id ,a.jiuzhen_id as jiuzhen_id,a.type as type,(select b.category from Category b where b.id = a.type) as huayanitem,a.kd_time as kd_time,a.kd_doctor as kd_doctor,a.hy_doctor as hy_doctor,a.finish_time as finish_time) from  HuaYanList a  where a.jiuzhen_id = :jzid";
    map.put("jzid", Integer.valueOf(Integer.parseInt(jzid)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public List<Map<String, Object>> getHuaYanDanDetailInfoUrl(String hyid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map (a.id as id ,a.huayan_id as huayan_id,a.item as item,(select b.name from HuaYanCategory b where b.id = a.item) as name,(select b.code from HuaYanCategory b where b.id = a.item) as code,(select b.reference from HuaYanCategory b where b.id = a.item) as reference,(select b.unit from HuaYanCategory b where b.id = a.item) as unit,a.value as value ) from  HuaYanListDetail a  where a.huayan_id = :hyid";
    map.put("hyid", Integer.valueOf(Integer.parseInt(hyid)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public List<String> getSearchYaoPinNameUrl(String text) {
    List<String> list = new ArrayList<String>();
    List<Map<String, Object>> alist = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map (a.name as name ) from  YaoPinInfo a  where a.name like :text";
    map.put("text", "%" + text + "%");
    alist = findList(hql, map);
    for (int i = 0; i < alist.size(); i++) {
      list.add(((Map)alist.get(i)).get("name").toString());
    }
    return list;
  }

  @Override
  public List<Map<String, Object>> getYaoPinInfoByNameUrl(String text) {
    List<Map<String, Object>> alist = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map ( a.yaopin_id as ypid ,  a.name as name ,  a.direction as dir ,  a.unit as unit ,  a.yp_type as type ,  (select b.type_name from YaoPinType b where b.type_id = a.yp_type) as type_name) from  YaoPinInfo a  where a.name = :text";
    map.put("text", text);
    alist = findList(hql, map);
    return alist;
  }

  @Override
  public String saveChuFangInfoUrl(String jzid, String ypid, String num, String cus_dir) {
    int id = 0;
    ChuFangList cf = new ChuFangList();
    cf.setJiuzhen_id(Integer.valueOf(Integer.parseInt(jzid)));
    cf.setYaopin_id(Integer.valueOf(Integer.parseInt(ypid)));
    cf.setNum(Integer.valueOf(Integer.parseInt(num)));
    cf.setCus_dir(cus_dir);
    try {
      this.hibernateTemplate.saveOrUpdate(cf);
      id = ((cf.getChufang_id() != null) ? cf.getChufang_id() : null).intValue();
    } catch (Exception e) {
      id = ((cf.getChufang_id() != null) ? cf.getChufang_id() : null).intValue();
      e.printStackTrace();
    }
    return String.valueOf(id);
  }

  @Override
  public String delChuFangInfoUrl(String cf_id) {
    String bl = "";
    ChuFangList cfl = new ChuFangList();
    cfl.setChufang_id(Integer.valueOf(Integer.parseInt(cf_id)));
    try {
      this.hibernateTemplate.delete(cfl);
      bl = "true";
    } catch (DataAccessException e) {
      bl = "false";
      e.printStackTrace();
    }
    return bl;
  }

  @Override
  public List<Map<String, Object>> getJiuZhenChuFangInfoUrl(String jzid) {
    List<Map<String, Object>> alist = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map ( a.chufang_id as chufang_id ,  a.jiuzhen_id as jiuzhen_id ,  a.yaopin_id as yaopin_id ,  a.num as num ,  a.cus_dir as cus_dir ,  ( select c.name from YaoPinInfo c where c.yaopin_id = a.yaopin_id ) as yaopin_name ,  ( select c.unit from YaoPinInfo c where c.yaopin_id = a.yaopin_id ) as yaopin_unit ,  (select b.type_name from YaoPinType b where b.type_id = (select c.yp_type from YaoPinInfo c where c.yaopin_id = a.yaopin_id ) ) as type_name) from  ChuFangList a  where a.jiuzhen_id = :jzid";
    map.put("jzid", Integer.valueOf(Integer.parseInt(jzid)));
    alist = findList(hql, map);
    return alist;
  }

  @Override
  public List<Map<String, Object>> getPrintBingLiDataUrl(String mbid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map( a.id as id, a.biaoti as biaoti, a.moban as moban, a.jibie as jibie, a.bumenId as bumenid, a.gonghao as gonghao, a.categoryId as categoryid, a.jcxmIds as jcxmids, a.url as url) from  BaogaoMoban a  where a.id = :mbid";
    map.put("mbid", Long.valueOf(Long.parseLong(mbid)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public List<Map<String, Object>> getBingLiInfoUrl(String jzid, String hzid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30100 ) as zhushu , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30102 ) as xianbingshi , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30103 ) as jiwangshi , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30104 ) as jiazushi , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30200 ) as yanjian , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30201 ) as jiemo , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30202 ) as gongmo , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30203 ) as yanwaiji , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30204 ) as jiaomo , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30205 ) as qianfang , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30206 ) as hongmo , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30207 ) as tongkong , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30208 ) as jingzhuangti , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30209 ) as boliti , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30210 ) as shipan , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30211 ) as huangban , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30212 ) as xueguan , ( select b.jilu from Jzjl b where b.jiuzhenId = a.id and b.categoryId = 30213 ) as shiwangmo  ) from  Jiuzhen a  where a.id = :jzid";
    map.put("jzid", Long.valueOf(Long.parseLong(jzid)));
    list = findList(hql, map);
    return list;
  }

  @Override
  public List<Map<String, Object>> findOimsCategories(Integer fatherId) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(a.category as category,a.id as id,a.fatherid as fatherid,a.intr as intr)from Category a where fatherid = :fatherid";
    map.put("fatherid", fatherId);
    list = findList(hql, map);
    return list;
  }

  @Override
  public Map<String, Object> getCategoryById(Integer cateid) {
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    Map<String, Object> param = new HashMap<String, Object>();
    String hql = "select new map(a.id as id,a.category as category , a.fatherid as fatherid , a.intr as intr) from  Category a where a.id = :id";
    param.put("id", cateid);
    list = findList(hql, param);
    if (list.size() > 0) {
      map = list.get(0);
    }
    return map;
  }

  @Override
  public int getMinVisitNoOfCurrentDate(Date date) {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    String dateStr = format.format(date);
    format.applyPattern("yyyy-MM-dd HH:mm:ss");
    DetachedCriteria dc = DetachedCriteria.forClass(Jiuzhen.class);
    dc.setProjection(Projections.sqlProjection("min(haoma+0) as haoma", new String[]{"haoma"}, new Type[]{StringType.INSTANCE}));

    try {
      dc.add(Restrictions.ge("caozuoTime", format.parseObject(dateStr + " 00:00:00")));
      dc.add(Restrictions.le("caozuoTime", format.parseObject(dateStr + " 23:59:59")));
    } catch (ParseException var6) {
      var6.printStackTrace();
    }

    dc.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
    Map<String, Object> map = (Map)this.hibernateTemplate.findByCriteria(dc).get(0);
    return map.get("haoma") == null ? 0 : Integer.parseInt(map.get("haoma").toString());
  }

  @Override
  public List<Jiuzhen> getAlljzjlByIDAndTimeAndGonghao(Long huanzheId, Date date, String gonghao) throws DataAccessException, ParseException {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    String dateStr = format.format(date);
    String beginTime = String.valueOf(dateStr) + " 00:00:00";
    String endTime = String.valueOf(dateStr) + " 23:59:59";
    format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    StringBuilder buffer = new StringBuilder(
        "from Jiuzhen where 1=1 and (caozuoTime between ? and ?) ");
    if (huanzheId != null) {
      buffer.append(" and huanzheId = " + huanzheId);
    }
    if (gonghao != null && !gonghao.isEmpty()) {
      buffer.append(" and caozuoren = '" + gonghao + "'");
    }
    List<Jiuzhen> list = this.hibernateTemplate.find(buffer.toString(), new Object[] { format.parse(beginTime), format.parse(endTime) });
    if (list != null && list.size() > 0) {
      return list;
    }
    return null;
  }

  @Override
  public List<Jiuzhen> findJiuzhenList(Long hzid, String gonghao) {
    Date today = MultiUtils.getStartTimeOfDay();
    String hql = "from Jiuzhen j where j.huanzheId=" + hzid + " and ((" + " state!=" + 27 + " and state!=" + 30 + ") or (caozuoTime>=?" + (gonghao == null ? "" : " and fzys='" + gonghao + "'") + "))" + " order by caozuoTime desc, serial_no desc,id desc";
    return this.hibernateTemplate.find(hql, today);
  }

  @Override
  public Jiuzhen getPrevJiuzhen(Long jiuzhenId, Long patientId) {
    String hql = " from Jiuzhen where id!=" + jiuzhenId +
      " and huanzheId='" + patientId + "' order by caozuoTime desc";
    List<Jiuzhen> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }

  @Override
  public Jiuzhen findNextPatient(String gonghao) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String d = sdf.format(new Date());
    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
    Date d1 = null;

    try {
      d1 = sdf1.parse(d);
    } catch (ParseException var8) {
    }

    String hql = " from Jiuzhen where fzys='" + gonghao + "' and state=" + 27 + " and caozuoTime=?  order by serial_no";
    List<Jiuzhen> list = this.hibernateTemplate.find(hql, d1);
    return list.size() > 0 ? (Jiuzhen)list.get(0) : null;
  }

  @Override
  public int getJiuzhenTodayCount() {
    String hql = "select count(*) from Jiuzhen where haoma like 'OIMS%' and caozuoTime between :startTime and :endTime";
    Map<Object, Object> map = new HashMap<Object, Object>();
    map.put("startTime", MultiUtils.getStartTimeOfDay());
    map.put("endTime", new Date());
    return counts(hql, map);
  }

  @Override
  public Jiuzhen findJiuzhenByHaoma(String haoma) {
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    Map<String, Object> params = new HashMap<String, Object>();
    params.put("startTime", startTime);
    params.put("endTime", endTime);
    params.put("haoma", haoma);
    List<Jiuzhen> list = findList(
        " from Jiuzhen j where caozuoTime between :startTime and :endTime and j.haoma=:haoma order by caozuoTime desc", params);
    return (list.size() > 0) ? list.get(0) : null;
  }

  @Override
  public List<JzZhenduan> findJzZhenList(Long id) {
    String hql = "from JzZhenduan where jiuzhen_id=" + id;
    List<JzZhenduan> list = this.hibernateTemplate.find(hql);
    return list;
  }

  @Override
  public List<Map<String, Object>> findJzZhenduanList(Long long1) {
    String hql = "select new Map(j.disease as disease,z.id as id,z.confirmed as confirmed, z.eye as eye) from JzZhenduan z,JiBing j where j.id=z.zdfl_id and z.jiuzhen_id=" + long1;
    return this.hibernateTemplate.find(hql);
  }

  private String createSelectByTongJiForm(TongJiForm form, Map<String, Object> map) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String hql = " ";
    if ("sj".equals(form.getTimeType())) {
      if (form.getfTime1() != null && !form.getfTime1().isEmpty()) {
        try {
          map.put("startTime", sdf.parse(String.valueOf(form.getfTime1()) + " 00:00:00"));
          hql = String.valueOf(hql) + " and jz.caozuoTime >= :startTime";
        } catch (ParseException parseException) {}
      } else if (form.getfTime2() != null && !form.getfTime2().isEmpty()) {
        try {
          map.put("endTime", sdf.parse(String.valueOf(form.getfTime2()) + " 23:59:59"));
          hql = String.valueOf(hql) + " and jz.caozuoTime <= :endTime";
        } catch (ParseException parseException) {}
      }
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
        hql = String.valueOf(hql) + " and jz.caozuoTime between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    if (form.getMzDoctors() != null && !form.getMzDoctors().isEmpty()) {
      String[] str = form.getMzDoctors().split(",");
      StringBuffer buffer = new StringBuffer();
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and jz.fzys = '" + str[0] + "'";
      } else {
        for (int i = 0; i < str.length; i++) {
          if (i == 0) {
            buffer.append("'" + str[i] + "'");
          } else {
            buffer.append(",'" + str[i] + "'");
          }
        }
        hql = String.valueOf(hql) + " and jz.fzys in(" + buffer + ")";
      }
    }
    return hql;
  }

  @Override
  public List<Map<String, Object>> groupDoctorByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(gonghao as gonghao,xingming as name) from YuanGong where gonghao in (select fzys from Jiuzhen jz where 1=1 ";
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    hql = String.valueOf(hql) + " group by fzys)";
    System.out.println(hql);
    return findList(hql, map);
  }

  @Override
  public List<Map<String, Object>> groupJieZhenNumByTongJiForm(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select new map(count(*) as y,c.category as name) from Jiuzhen jz,Category c where c.id = jz.state ";
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    hql = String.valueOf(hql) + " group by c.category";
    System.out.println(hql);
    return findList(hql, map);
  }

  @Override
  public Long groupBLFinish(TongJiForm form) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from Jiuzhen jz,Jzjl jzjl,JzZhenduan zd where jz.id = jzjl.jiuzhenId and jz.id = zd.jiuzhen_id and jzjl.categoryId = 30100";
    hql = String.valueOf(hql) + createSelectByTongJiForm(form, map);
    hql = String.valueOf(hql) + " group by jz.id";
    return Long.valueOf(findList(hql, map).size());
  }

  @Override
  public Long groupJiuZhen(TongJiForm form, Integer categoryId) {
    Map<String, Object> map = new HashMap();
    String hql = "select count(*) from Jiuzhen jz where 1=1 ";
    if (categoryId != null && categoryId != 0) {
      hql = hql + " and jz.state=" + categoryId;
    }

    hql = hql + this.createSelectByTongJiForm((TongJiForm)form, map);
    return (Long)this.findList(hql, map).get(0);
  }

  @Override
  public List<Map<String, Object>> groupJiuZhenFzysByTongJiForm(TongJiForm form) {
    StringBuilder builder = new StringBuilder();
    Map<String, Object> map = new HashMap<String, Object>();
    builder.append(" select new map( jz.fzys as fzysId,");
    builder.append(" (select xingming from YuanGong where gonghao = jz.fzys) as fzysName,");
    builder.append(" (select count(*) from Jiuzhen where fzys = jz.fzys and state in(28,29,94)) as jzs,");
    builder.append(" (select count(*) from Jiuzhen where fzys = jz.fzys and state in(27,30) ) as dzs,");
    builder.append(" (select count(*) from Jiuzhen j, Jzjl jzjl, ShiLi sl, JzZhenduan zd, Suifang sf where sf.jiuzhenId = j.id   and jzjl.jiuzhenId = j.id   and sl.jiuzhen_id = j.id   and zd.jiuzhen_id = j.id   and jzjl.categoryId = 30100   and (sl.ll is not null or sl.rl is not null) and j.fzys = jz.fzys) as txbls,");
    builder.append(" (select count(*) from Jiuzhen where fzys = jz.fzys and state = 29) as wcs,");
    builder.append(" (select count(*) from Jiuzhen where fzys = jz.fzys and state = 28 ) as fcs )");
    builder.append(" from Jiuzhen jz where 1=1");
    builder.append(createSelectByTongJiForm(form, map));
    builder.append(" group by jz.fzys");
    System.out.println(builder.toString());
    return findList(builder.toString(), map);
  }

  @Override
  public boolean validateVisit(String patientId, String haoma, Date date) {
    StringBuilder hql = new StringBuilder();
    hql.append("select count(*) from Jiuzhen where 1=1 ");
    hql.append("and huanzheId=").append(patientId).append(" ");
    hql.append("and haoma='").append(haoma).append("' ");
    hql.append("and caozuoTime=?");
    int count = Integer.parseInt(this.hibernateTemplate.find(hql.toString(), date).get(0).toString());
    if (count > 0) {
      return false;
    }
    return true;
  }

  @Override
  public List getPatientListFuChaByPage(String state, String gonghao, Page p, String search, String path, Integer fenzhenkaidan) {
    boolean b = Pattern.matches("^[0-9]+$", search);
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    SimpleDateFormat sdf_01 = new SimpleDateFormat("yyyy");
    String nowYear = sdf_01.format(new Date());
    int ny = Integer.parseInt(nowYear);
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    Map<String, Object> map = new HashMap<String, Object>();
    int count = 0;
    Map<String, Object> pmap = new HashMap<String, Object>();
    //十天前
    Date startTime = new Date(MultiUtils.getStartTimeOfDay().getTime() - 864000000L);
    //昨天
    Date endTime = new Date(MultiUtils.getEndTimeOfDay().getTime() - 86400000L);
    String hql = "select new map(a.id as id,a.serialNo as serial_no,a.haoma as haoma,a.huanzheId as patientId,a.caozuoren as caozuoren,a.caozuoTime as caozuotime,a.beizhu as keshi,a.fzys as fzys,( select e.xingming from YuanGong e where e.gonghao=a.fzys) as fzysName,a.zhenbie as zhenbie,a.state as state ,( select b.binglihao from HuanZheXinXi b where b.id = a.huanzheId )as binglihao,( select d.category from Category d where d.id = a.state )as pstate,( select b.xingming from HuanZheXinXi b where b.id = a.huanzheId )as name,( select d.shengri from HuanZheXinXi d where d.id = a.huanzheId ) as birthday,( select d.photourl from HuanZheXinXi d where d.id = a.huanzheId ) as photo,( select d.shouji from HuanZheXinXi d where d.id = a.huanzheId ) as mobile,( select d.xingbie from HuanZheXinXi d where d.id = a.huanzheId ) as sex) from Jiuzhen a  where 1=1 ";
    if (fenzhenkaidan == null || fenzhenkaidan.intValue() == 0) {
      hql = String.valueOf(hql) + " and a.caozuoTime>=:startTime and a.caozuoTime<=:endTime ";
      map.put("startTime", startTime);
      map.put("endTime", endTime);
      if (state != null) {
        hql = String.valueOf(hql) + " and a.state in (" + state + ") ";
      }
      if (gonghao != null && !gonghao.isEmpty()) {
        hql = String.valueOf(hql) + " and a.fzys=:gonghao";
        map.put("gonghao", gonghao);
      }
      if (b) {
        hql = String.valueOf(hql) + " and exists (from HuanZheXinXi where id = a.huanzheId and binglihao = :search) ";
        map.put("search", search);
      } else if (search.contains("oims")) {
        hql = String.valueOf(hql) + " and exists (from HuanZheXinXi t where id=a.huanzheId and t.binglihao = :search)";
        if (search.startsWith("oims")) {
          map.put("search", search);
        } else {
          map.put("search", search.substring(1, search.length()));
        }
      } else if (search != null && !"".equals(search) &&
        !"请输入患者ID号或姓名".equals(search)) {
        hql = String.valueOf(hql) + " and exists ( from HuanZheXinXi t where id = a.huanzheId and (t.xingming like :search or t.binglihao=:blh))";
        map.put("search", "%" + search + "%");
        map.put("blh", search);
      }
      hql = String.valueOf(hql) + " order by serial_no";
    } else {
      hql = String.valueOf(hql) + "and a.id=(select max(id) from Jiuzhen j where";
      if (state != null) {
        hql = String.valueOf(hql) + " j.state in (" + state + ") ";
      }
      if (gonghao != null && !gonghao.isEmpty()) {
        hql = String.valueOf(hql) + " and j.fzys=:gonghao";
        map.put("gonghao", gonghao);
      }
      if (b) {
        hql = String.valueOf(hql) + " and exists (from HuanZheXinXi where id=j.huanzheId and binglihao= :search) ";
        map.put("search", search);
      } else if (search.contains("oims")) {
        hql = String.valueOf(hql) + " and exists (from HuanZheXinXi t where t.id=j.huanzheId and t.binglihao = :search)";
        if (search.startsWith("oims")) {
          map.put("search", search);
        } else {
          map.put("search", search.substring(1, search.length()));
        }
      } else if (search != null && !"".equals(search) &&
        !"请输入患者ID号或姓名".equals(search)) {
        hql = String.valueOf(hql) + " and exists ( from HuanZheXinXi t where t.id=j.huanzheId and (t.xingming like :search or t.binglihao=:blh))";
        map.put("search", "%" + search + "%");
        map.put("blh", search);
      }
      hql = String.valueOf(hql) + ")";
    }
    list = findList(hql, map);
    for (int i = 0; i < list.size(); i++) {
      list.get(i).put("SN", Integer.valueOf(i + 1));
    }
    count = list.size();
    p.setRowsCount(Integer.valueOf(count));
    p.init();
    List<Map<String, Object>> result_list = getListForPage(hql, p
        .getStartRow().intValue(), p.getPageSize().intValue(), map);
    int j;
    for (j = 0; j < result_list.size(); j++) {
      for (int y = 0; y < list.size(); y++) {
        String li = ((Map)result_list.get(j)).get("id").toString();
        String ly = ((Map)list.get(y)).get("id").toString();
        if (li.equals(ly)) {
          String sn = ((Map)list.get(y)).get("SN").toString();
          (result_list.get(j)).put("SN", sn);
        }
      }
    }
    for (j = 0; j < result_list.size(); j++) {
      String sexstr = (((Map)result_list.get(j)).get("sex") != null) ? ((Map)result_list
        .get(j)).get("sex").toString() : "";
      if (sexstr.equals("true")) {
        sexstr = "男";
      } else if (sexstr.equals("false")) {
        sexstr = "女";
      } else {
        sexstr = "";
      }
      (result_list.get(j)).put("psex", sexstr);
      Object o1 = ((Map)result_list.get(j)).get("birthday");
      if (o1 != null) {
        Date dd = (Date)o1;
        String birthday = sdf_01.format(dd);
        int age = ny - Integer.parseInt(birthday);
        (result_list.get(j)).put("page", Integer.valueOf(age));
        (result_list.get(j)).put("birthday", (
            new SimpleDateFormat("yyyy-MM-dd")).format(o1));
      } else {
        (result_list.get(j)).put("page", "");
      }
      Object o2 = ((Map)result_list.get(j)).get("caozuotime");
      if (o2 != null) {
        Date dd = (Date)o2;
        String ghtime = sdf.format(dd);
        (result_list.get(j)).put("ptime", ghtime);
      } else {
        (result_list.get(j)).put("ptime", "");
      }
      String photo = (((Map)list.get(j)).get("photo") != null) ? ((Map)list.get(j))
        .get("photo").toString() : "";
      if (!"".equals(photo)) {
        Map<String, Object> map_wh = new HashMap<String, Object>();
        map_wh = get_w_h(String.valueOf(path) + photo);
        System.out.println("map_wh");
        System.out.println(map_wh);
        if (map_wh == null) {
          (result_list.get(j)).put("w", Integer.valueOf(0));
          (result_list.get(j)).put("h", Integer.valueOf(0));
        } else {
          ((Map)result_list.get(j)).put("w", map_wh.get("w"));
          ((Map)result_list.get(j)).put("h", map_wh.get("h"));
        }
      }
    }
    pmap.put("page", p);
    result_list.add(0, pmap);
    return result_list;
  }

  @Override
  public List<Map<String, Object>> findPatientList(String gonghao, Integer[] states, String search, Date startDate, Date endDate, Page page) {
    String query = "select new map(j.id as id,h.id as pateintId, h.binglihao as patientNo,h.xingming as name, h.xingbie as sex, h.shengri as birthday, h.dianhua as tel, h.shouji as mobile, j.haoma as hisId,j.serialNo as serialNo, j.state as state, (select category from Category where id=j.state) as stateName,j.jzks as deptId, b.bmmc as deptName";
    String hql = " from Jiuzhen j, HuanZheXinXi h, BuMen b where h.id=j.huanzheId and j.jzks=b.id and j.caozuoTime between :startDate and :endDate";
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("startDate", startDate);
    map.put("endDate", endDate);
    if (gonghao != null) {
      hql = String.valueOf(hql) + " and j.fzys=:workNo";
      map.put("workNo", gonghao);
    }
    if (states != null) {
      hql = String.valueOf(hql) + " and j.state in (:states)";
      map.put("states", states);
    }
    if (search != null) {
      hql = String.valueOf(hql) + " and h.binglihao like :patientId or h.xingming like :search";
      map.put("patientId", search);
      map.put("search", "%" + search + "%");
    }
    page.setRowsCount(Integer.valueOf(counts(hql, map)));
    page.init();
    return getListForPage(String.valueOf(query) + hql + " order by j.serialNo", page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }

  @Override
  public Integer findJzByDoctorToday(String gonghao, Long huanzheId) {
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    StringBuffer hql = new StringBuffer("select count(*) from Jiuzhen j where ");
    if (gonghao != null) {
      hql.append("fzys='" + gonghao + "'");
    }
    hql.append(" and huanzheId=" + huanzheId);
    hql.append(" and caozuoTime between :startTime and :endTime");
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("startTime", startTime);
    map.put("endTime", endTime);
    return Integer.valueOf(Integer.parseInt(findList(hql.toString(), map).get(0).toString()));
  }

  @Override
  public Jiuzhen findLastJiuzhen(String id) {
    String hql = "from Jiuzhen jz where jz.huanzheId=" + id + " and haoma is not null order by jz.caozuoTime desc";
    List<Jiuzhen> list = getListForPage(hql.toString(), 0, 1);
    if (list != null && list.size() == 1) {
      return list.get(0);
    }
    return null;
  }

  @Override
  public List<Map<String, Object>> tjXingBieByJiBingId(String jiBingId) {
    StringBuilder sb = new StringBuilder();
    sb.append("select new map( xingbie as sex, count(*) as y)");
    sb.append(" from HuanZheXinXi");
    sb.append(" where id in (select huanzheId");
    sb.append(" from Jiuzhen");
    sb.append(" where id in (select jiuzhen_id");
    sb.append("  from JzZhenduan");
    if (!jiBingId.isEmpty()) {
      sb.append(" where zdfl_id in (" + jiBingId + ")))");
    }
    sb.append(" group by xingbie");
    return this.hibernateTemplate.find(sb.toString());
  }

  @Override
  public List<Map<String, Object>> tjdrugDictTop10ByJiBingId(String jiBingId) {
    StringBuilder sb = new StringBuilder();
    sb.append("select new map( cfmx.yaopinId as yaopinId, cfmx.yaoming as name,count(*) as y) ");
    sb.append(" from EMRChufangQindan cfmx");
    sb.append(" where chufangId in");
    sb.append(" (select id");
    sb.append(" from EMRChufang cf");
    sb.append(" where cf.jiuzhenId in (select jiuzhen_id");
    sb.append(" from JzZhenduan");
    if (!jiBingId.isEmpty()) {
      sb.append(" where zdfl_id in (" + jiBingId + ")))");
    }
    sb.append(" group by cfmx.yaopinId, cfmx.yaoming");
    sb.append(" order by count(*) desc");
    return getListForPage(sb.toString(), 0, 10);
  }

  @Override
  public long tjdrugDictOtherByJiBingId(String notDrugDictIds, String jiBingId) {
    StringBuilder sb = new StringBuilder();
    sb.append("select count(*) as y ");
    sb.append(" from EMRChufangQindan cfmx");
    sb.append(" where chufangId in");
    sb.append(" (select id");
    sb.append(" from EMRChufang cf");
    sb.append(" where cf.jiuzhenId in (select jiuzhen_id");
    sb.append(" from JzZhenduan  where 1=1");
    if (!jiBingId.isEmpty()) {
      sb.append(" and zdfl_id in (" + jiBingId + ")))");
    }
    if (!notDrugDictIds.isEmpty()) {
      sb.append(" and yaopinId not in (" + notDrugDictIds + ")))");
    }
    List<Long> list = this.hibernateTemplate.find(sb.toString());
    return ((Long)list.get(0)).longValue();
  }

  @Override
  public long getCountByJiBingIdAndJiuZhenAge(String jiBingId, String startAge, String endAge) {
    StringBuilder sb = new StringBuilder();
    sb.append("select count(*) as y from Jiuzhen where id in ");
    sb.append("  (select jiuzhen_id from JzZhenduan where 1=1 ");
    if (!jiBingId.isEmpty()) {
      sb.append(" and zdfl_id in (" + jiBingId + "))");
    }
    if (!startAge.isEmpty()) {
      sb.append(" and age >= " + startAge);
    }
    if (!endAge.isEmpty()) {
      sb.append(" and age < " + endAge);
    }
    return count(sb.toString());
  }

  @Override
  public List<Map<String, Object>> tjfinishStateByCateogryId(String categoryIds, BlTjForm blTjForm) {
    Map<String, Object> map = new HashMap<String, Object>();
    StringBuilder sb = new StringBuilder();
    sb.append("select new map( (select category");
    sb.append(" from Category");
    sb.append(" where id = jzjl.categoryId) as category,");
    sb.append(" count(*) as comp,");
    sb.append(" (select count(*) from Jiuzhen jz where 1=1 " +
        createSelectByTongJiForm(blTjForm, map) +
        ") as total)");
    sb.append(" from Jzjl jzjl");
    sb.append(" where 1=1");
    if (!categoryIds.isEmpty()) {
      sb.append(" and categoryId in (" + categoryIds + ")");
    }
    sb.append(" and jiuzhenId in (select id from Jiuzhen jz where 1=1 " +
        createSelectByTongJiForm(blTjForm, map) +
        ")");
    sb.append(" group by categoryId");
    System.out.println(sb.toString());
    return findList(sb.toString(), map);
  }

  private String createSelectByTongJiForm(BlTjForm form, Map<String, Object> map) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String hql = " ";
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
        hql = String.valueOf(hql) + " and jz.caozuoTime between :startTime and :endTime";
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
        hql = String.valueOf(hql) + " and jz.caozuoTime between :startTime and :endTime";
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
        hql = String.valueOf(hql) + " and jz.caozuoTime between :startTime and :endTime";
      }
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
        hql = String.valueOf(hql) + " and jz.caozuoTime between :startTime and :endTime";
      } catch (ParseException e) {
        e.printStackTrace();
      }
    }
    if (form.getMzDoctors() != null && !form.getMzDoctors().isEmpty()) {
      String[] str = form.getMzDoctors().split(",");
      StringBuffer buffer = new StringBuffer();
      if (str.length == 1) {
        hql = String.valueOf(hql) + " and jz.fzys = '" + str[0] + "'";
      } else {
        for (int i = 0; i < str.length; i++) {
          if (i == 0) {
            buffer.append("'" + str[i] + "'");
          } else {
            buffer.append(",'" + str[i] + "'");
          }
        }
        hql = String.valueOf(hql) + " and jz.fzys in(" + buffer + ")";
      }
    }
    return hql;
  }

  @Override
  public Integer getJzjlNumByCategoryId(String categoryIds, BlTjForm blTjForm) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from Jzjl jzjl where 1=1 ";
    if (!categoryIds.isEmpty()) {
      hql = String.valueOf(hql) + " and jzjl.categoryId = " + categoryIds;
    }
    hql = String.valueOf(hql) + " and jiuzhenId in (select id from Jiuzhen jz where 1=1 " +
      createSelectByTongJiForm(blTjForm, map) + ")";
    return Integer.valueOf(counts(hql, map));
  }

  @Override
  public Integer getJiuZhenNumByCategoryId(BlTjForm blTjForm) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from Jiuzhen jz where 1=1 " +
      createSelectByTongJiForm(blTjForm, map);
    return Integer.valueOf(counts(hql, map));
  }

  @Override
  public Integer getShiLiNumByTlTjForm(BlTjForm blTjForm) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from ShiLi where 1=1 ";
    hql = String.valueOf(hql) + " and jiuzhen_id in (select id from Jiuzhen jz where 1=1 " +
      createSelectByTongJiForm(blTjForm, map) + ")";
    return Integer.valueOf(counts(hql, map));
  }

  @Override
  public Integer getYanYaNumByTlTjForm(BlTjForm blTjForm) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from YanYa where 1=1 ";
    hql = String.valueOf(hql) + " and jiuzhen_id in (select id from Jiuzhen jz where 1=1 " +
      createSelectByTongJiForm(blTjForm, map) + ")";
    return Integer.valueOf(counts(hql, map));
  }

  @Override
  public Integer getJzZhenNumDuanByTlTjForm(BlTjForm blTjForm) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from Jiuzhen where id in( select jiuzhen_id from JzZhenduan where 1=1 ";
    hql = String.valueOf(hql) + " and jiuzhen_id in (select id from Jiuzhen jz where 1=1 " +
      createSelectByTongJiForm(blTjForm, map) + "))";
    return Integer.valueOf(counts(hql, map));
  }

  @Override
  public Integer getSuifangNumDuanByTlTjForm(BlTjForm blTjForm) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "select count(*) from Suifang where 1=1 ";
    hql = String.valueOf(hql) + " and jiuzhenId in (select id from Jiuzhen jz where 1=1 " +
      createSelectByTongJiForm(blTjForm, map) + ")";
    return Integer.valueOf(counts(hql, map));
  }

  @Override
  public List<Jiuzhen> findFZJiuzhenList(Long hzid, String gonghao) {
    String hql = "from Jiuzhen j where j.huanzheId=" + hzid + " order by caozuoTime desc, serial_no desc,id desc";
    return this.hibernateTemplate.find(hql);
  }
}
