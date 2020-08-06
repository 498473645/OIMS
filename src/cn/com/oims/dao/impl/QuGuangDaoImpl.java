package cn.com.oims.dao.impl;

import cn.com.oims.dao.IQuGuangDao;
import cn.com.oims.dao.pojo.QgErSsjl;
import cn.com.oims.dao.pojo.QgJtssjl;
import cn.com.oims.dao.pojo.QgSgConf;
import cn.com.oims.dao.pojo.QgShfc;
import cn.com.oims.dao.pojo.QgShfcEr;
import cn.com.oims.dao.pojo.QgShjl;
import cn.com.oims.dao.pojo.QgSsjl;
import cn.com.oims.dao.pojo.QgYy;
import cn.com.oims.dao.pojo.Qgbl;
import cn.com.oims.dao.pojo.QgblEr;
import cn.com.oims.dao.pojo.Qglc;
import cn.com.oims.dao.pojo.YuanGong;
import cn.com.oims.utils.QgUtil;
import cn.com.oims.web.form.QgErSsjlForm;
import cn.com.oims.web.form.QgJtssjlForm;
import cn.com.oims.web.form.QgSearchForm;
import cn.com.oims.web.form.QgShfcErForm;
import cn.com.oims.web.form.QgShfcForm;
import cn.com.oims.web.form.QgShjlForm;
import cn.com.oims.web.form.QgYyForm;
import cn.com.oims.web.form.QgblErForm;
import cn.com.oims.web.form.QgblForm;
import cn.com.oims.web.form.QgtjConditionForm;
import com.codesnet.common.Page;
import java.io.Serializable;
//import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.SQLQuery;
import org.hibernate.classic.Session;
import org.springframework.stereotype.Component;

@Component
public class QuGuangDaoImpl extends BaseDaoImpl implements IQuGuangDao {
  private List list;
  
  @Override
  public Serializable saveQuss(QgSsjl qgss) {
    return this.hibernateTemplate.save(qgss);
  }
  
  @Override
  public void updateQuss(QgSsjl qgss) {
    this.hibernateTemplate.update(qgss);
  }
  
  @Override
  public List<QgSsjl> findQuss4page(Page page, String blh) {
    String hql_count = " select count(qg_ssjl.id) from QgSsjl as qg_ssjl where qg_ssjl.blh=" + blh;
    String hql_map = " from QgSsjl as qg_ssjl where qg_ssjl.blh=" + blh + " order by id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgSsjl> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<QgSsjl> findQuss4page(Page page, Long lc_id) {
    String hql_count = " select count(qg_ssjl.id) from QgSsjl as qg_ssjl where qg_ssjl.lc_id=" + lc_id;
    String hql_map = " from QgSsjl as qg_ssjl where qg_ssjl.lc_id=" + lc_id + " order by id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgSsjl> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public QgSsjl getQgssById(Long id) {
    return (QgSsjl)this.hibernateTemplate.get(QgSsjl.class, id);
  }
  
  @Override
  public void saveShjl(QgShjl shjl) {
    this.hibernateTemplate.save(shjl);
  }
  
  @Override
  public void updateShjl(QgShjl shjl) {
    this.hibernateTemplate.update(shjl);
  }
  
  @Override
  public List<QgShjlForm> findShjl4page(Page page, String blh) {
    String hql_count = " select count(qg_shjl.id) from QgShjl as qg_shjl where qg_shjl.blh=" + blh;
    String hql_map = "select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.sj as sj) from QgShjl as q,HuanZheXinXi as h where q.blh=h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgShjlForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<QgShjlForm> findShjl4page(Page page, Long lc_id) {
    String hql_count = " select count(qg_shjl.id) from QgShjl as qg_shjl where qg_shjl.lc_id=" + lc_id;
    String hql_map = "select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.sj as sj) from QgShjl as q,HuanZheXinXi as h where q.blh=h.binglihao and q.lc_id=" + lc_id + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgShjlForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<QgShjl> findShjlAll(String blh) {
    String hql = " from QgShjl as qg_shjl where qg_shjl.blh=" + blh + " order by sj desc";
    List<QgShjl> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public QgShjl getShjlById(Long id) {
    return (QgShjl)this.hibernateTemplate.get(QgShjl.class, id);
  }
  
  @Override
  public void saveYy(QgYy qgyy) {
    this.hibernateTemplate.save(qgyy);
  }
  
  @Override
  public void updateQgyy(QgYy qgyy) {
    this.hibernateTemplate.update(qgyy);
  }
  
  @Override
  public QgYy getQgYyById(Long id) {
    return (QgYy)this.hibernateTemplate.get(QgYy.class, id);
  }
  
  @Override
  public List<QgYyForm> findQgYy4page(Page page, String blh) {
    String hql_count = " select count(qg_yy.id) from QgYy as qg_yy where qg_yy.blh=" + blh;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.yyxm as yyxm,q.yysj as yysj) from QgYy as q,HuanZheXinXi as h where q.blh=h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgYyForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<QgYyForm> findQgYy4page(Page page, Long lc_id) {
    String hql_count = " select count(qg_yy.id) from QgYy as qg_yy where qg_yy.lc_id=" + lc_id;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.yyxm as yyxm,q.yysj as yysj) from QgYy as q,HuanZheXinXi as h where q.blh=h.binglihao and q.lc_id=" + lc_id + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgYyForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List findQgYyAll4page(Page page) {
    String hql_count = " select count(qg_yy.id) from QgYy as qg_yy";
    String hql_map = " select new map(q.id as id,q.blh as blh,q.yysj as yysj) from QgYy as q order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveQgbl(Qgbl qgbl) {
    this.hibernateTemplate.save(qgbl);
  }
  
  @Override
  public void updateQgbl(Qgbl qgbl) {
    this.hibernateTemplate.update(qgbl);
  }
  
  @Override
  public Qgbl getQgblById(Long id) {
    return (Qgbl)this.hibernateTemplate.get(Qgbl.class, id);
  }
  
  @Override
  public List<QgblForm> findQgbl4page(Page page, String blh) {
    String hql_count = " select count(qg_bl.id) from Qgbl as qg_bl";
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.yb as yb,q.czrq as czrq) from Qgbl as q,HuanZheXinXi h where q.blh = h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgblForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public Serializable saveJtssjl(QgJtssjl jt) {
    return this.hibernateTemplate.save(jt);
  }
  
  @Override
  public void updateJtssjl(QgJtssjl jt) {
    this.hibernateTemplate.update(jt);
  }
  
  @Override
  public QgJtssjl getJtssjlById(Long id) {
    return (QgJtssjl)this.hibernateTemplate.get(QgJtssjl.class, id);
  }
  
  @Override
  public List<QgJtssjlForm> findJtssjl4page(Page page, String blh) {
    String hql_count = " select count(q.id) from QgJtssjl as q where q.blh=" + blh;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.yanbie as yanbie,q.ssrq as ssrq,q.czrq as czrq) from QgJtssjl as q,HuanZheXinXi h where q.blh = h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgJtssjlForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<QgJtssjlForm> findJtssjl4page(Page page, Long lc_id) {
    String hql_count = " select count(q.id) from QgJtssjl as q where q.lc_id=" + lc_id;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.yanbie as yanbie,q.ssrq as ssrq,q.czrq as czrq) from QgJtssjl as q,HuanZheXinXi h where q.blh = h.binglihao and q.lc_id=" + lc_id + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgJtssjlForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveShfc(QgShfc fc) {
    this.hibernateTemplate.save(fc);
  }
  
  @Override
  public void updateShfc(QgShfc fc) {
    this.hibernateTemplate.update(fc);
  }
  
  @Override
  public QgShfc getShfcById(Long id) {
    return (QgShfc)this.hibernateTemplate.get(QgShfc.class, id);
  }
  
  @Override
  public List<QgShfcForm> findShfc4page(Page page, String blh) {
    String hql_count = " select count(fc.id) from QgShfc as fc where fc.blh=" + blh;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.sj as sj) from QgShfc as q,HuanZheXinXi h where q.blh = h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgShfcForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<QgShfcForm> findShfc4page(Page page, Long lc_id) {
    String hql_count = " select count(fc.id) from QgShfc as fc where fc.lc_id=" + lc_id;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.sj as sj) from QgShfc as q,HuanZheXinXi h where q.blh = h.binglihao and q.lc_id=" + lc_id + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgShfcForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public Serializable saveErSsjl(QgErSsjl ssjl) {
    return this.hibernateTemplate.save(ssjl);
  }
  
  @Override
  public void updateErSsjl(QgErSsjl ssjl) {
    this.hibernateTemplate.update(ssjl);
  }
  
  @Override
  public QgErSsjl getErSsjlById(Long id) {
    return (QgErSsjl)this.hibernateTemplate.get(QgErSsjl.class, id);
  }
  
  @Override
  public List<QgErSsjlForm> findErSsjl4page(Page page, String blh) {
    String hql_count = " select count(q.id) from QgErSsjl as q where q.blh=" + blh;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.ssrq_r as ssrq_r,q.ssrq_l as ssrq_l,q.czrq as czrq) from QgErSsjl as q,HuanZheXinXi h where q.blh = h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgErSsjlForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<QgErSsjlForm> findErSsjl4page(Page page, Long lc_id) {
    String hql_count = " select count(q.id) from QgErSsjl as q where q.lc_id=" + lc_id;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.ssrq_r as ssrq_r,q.ssrq_l as ssrq_l,q.czrq as czrq) from QgErSsjl as q,HuanZheXinXi h where q.blh = h.binglihao and q.lc_id=" + lc_id + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgErSsjlForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveBler(QgblEr er) {
    this.hibernateTemplate.save(er);
  }
  
  @Override
  public void updateBler(QgblEr er) {
    this.hibernateTemplate.update(er);
  }
  
  @Override
  public QgblEr getBlerById(Long id) {
    return (QgblEr)this.hibernateTemplate.get(QgblEr.class, id);
  }
  
  @Override
  public List<QgblErForm> findBler4page(Page page, String blh) {
    String hql_count = " select count(q.id) from QgblEr as q";
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.yb as yb,q.czrq as czrq) from QgblEr as q,HuanZheXinXi h where q.blh = h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgblErForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveShfcEr(QgShfcEr fc) {
    this.hibernateTemplate.save(fc);
  }
  
  @Override
  public void updateShfcEr(QgShfcEr fc) {
    this.hibernateTemplate.update(fc);
  }
  
  @Override
  public QgShfcEr getShfcErById(Long id) {
    return (QgShfcEr)this.hibernateTemplate.get(QgShfcEr.class, id);
  }
  
  @Override
  public List<QgShfcErForm> findShfcEr4page(Page page, String blh) {
    String hql_count = " select count(fc.id) from QgShfcEr as fc where fc.blh=" + blh;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.sj as sj) from QgShfcEr as q,HuanZheXinXi h where q.blh = h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgShfcErForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<QgShfcErForm> findShfcEr4page(Page page, Long lc_id) {
    String hql_count = " select count(fc.id) from QgShfcEr as fc where fc.lc_id=" + lc_id;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.sj as sj) from QgShfcEr as q,HuanZheXinXi h where q.blh = h.binglihao and q.lc_id=" + lc_id + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgShfcErForm> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveQglc(Qglc lc) {
    this.hibernateTemplate.save(lc);
  }
  
  @Override
  public void updateQglc(Qglc lc) {
    this.hibernateTemplate.update(lc);
  }
  
  @Override
  public Qglc getQglcById(Long id) {
    return (Qglc)this.hibernateTemplate.get(Qglc.class, id);
  }
  
  @Override
  public List<Qglc> findQglc4page(Page page, String blh) {
    String hql_count = " select count(q.id) from Qglc as q where q.blh=" + blh;
    String hql_map = " select new map(q.id as id,q.blh as blh,h.xingming as xingming,q.ssfs1 as ssfs1,q.ssfs2 as ssfs2,q.ssfs3 as ssfs3,q.state as state,q.startTime as startTime,q.endTime as endTime) from Qglc as q,HuanZheXinXi h where q.blh = h.binglihao and q.blh=" + blh + " order by q.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<Qglc> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List findQglcByBlhWwc(String blh) {
    String hql = "from Qglc where blh='" + blh + "' and state!=5 order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List getQgblLastOne(String blh) {
    String hql = "from Qgbl where blh='" + blh + "' order by id desc";
    return getListForPage(hql, 0, 1);
  }
  
  @Override
  public List getQgblErLastOne(String blh) {
    String hql = "from QgblEr where blh='" + blh + "' order by id desc";
    return getListForPage(hql, 0, 1);
  }
  
  @Override
  public List findQgssByLc_id(Long lc_id) {
    String hql = "from QgSsjl where lc_id=" + lc_id + " order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List findQgShjlByLc_id(Long lc_id) {
    String hql = "from QgShjl where lc_id=" + lc_id + " order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List findQgYyByLc_id(Long lc_id) {
    String hql = "from QgYy where lc_id=" + lc_id + " order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List findJtssjlByLc_id(Long lc_id) {
    String hql = "from QgJtssjl where lc_id=" + lc_id + " order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List findShfcByLc_id(Long lc_id) {
    String hql = "from QgShfc where lc_id=" + lc_id + " order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List findQgErSsjlBylc_id(Long lc_id) {
    String hql = "from QgErSsjl where lc_id=" + lc_id + " order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List findShfcErBylc_id(Long lc_id) {
    String hql = "from QgShfc where lc_id=" + lc_id + " order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List findQglcBybl_id(Long bl_id) {
    String hql = "from Qglc where bl_id=" + bl_id;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public Qgbl getQgblLastOne(Integer year, String id) {
    String hql = "";
    if (id == null) {
      hql = "from Qgbl where bingliNumber like '" + year + "%' and bingliNumber !='201650144' order by bingliNumber desc";
    } else {
      hql = "from Qgbl where bingliNumber like '" + year + "%' and id!=" + id + " and bingliNumber !='201650144'  order by bingliNumber desc";
    } 
    List<Qgbl> list = getListForPage(hql, 0, 1);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public QgblEr getQgblErLastOne(Integer year, String id) {
    String hql = "";
    if (id == null) {
      hql = "from QgblEr where bingliNumber like '" + year + "%' order by bingliNumber desc";
    } else {
      hql = "from QgblEr where bingliNumber like '" + year + "%' and id!=" + id + " order by bingliNumber desc";
    } 
    List<QgblEr> list = getListForPage(hql, 0, 1);
    if (list != null && list.size() > 0) {
      return list.get(0);
    }
    return null;
  }
  
  @Override
  public List<YuanGong> getQgYuanGong(Integer role1, Integer role2) {
    String sql = "select u.gonghao,y.xingming from oims_user u,yuangong y where u.gonghao = y.gonghao and (u.jiaose=" + role1 + " or u.jiaose=" + role2 + ")";
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql);
    List<YuanGong> list_yg = new ArrayList<YuanGong>();
    List<Object[]> list = sQLQuery.list();
    for (int i = 0; i < list.size(); i++) {
      YuanGong yg = new YuanGong();
      Object[] objs = list.get(i);
      if (objs != null && objs.length > 1) {
        yg.setGonghao(objs[0].toString());
        yg.setXingming(objs[1].toString());
        list_yg.add(yg);
      } 
    } 
    session.close();
    return list_yg;
  }
  
  @Override
  public List<QgSgConf> findQgSgConf(String tag) {
    String hql = "from QgSgConf where tag='" + tag + "' order by id";
    List<QgSgConf> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  public List<QgSsjl> findQuss4page_look(Page page, String str) {
    String hql_count = "";
    String hql_map = "";
    if (str != null) {
      hql_count = "select count(qg_ssjl.id) from QgSsjl as qg_ssjl,HuanZheXinXi as huanZheXinXi where qg_ssjl.blh = huanZheXinXi.binglihao and (qg_ssjl.blh=" + str + " or huanZheXinXi.xingming=" + str + ")";
      hql_map = "select qg_ssjl from QgSsjl as qg_ssjl,HuanZheXinXi as huanZheXinXi where qg_ssjl.blh=huanZheXinXi.binglihao and qg_ssjl.blh=" + str + " or huanZheXinXi.xingming=" + str + " order by qg_ssjl.id desc";
    } else {
      hql_count = "select count(qg_ssjl.id) from QgSsjl as qg_ssjl";
      hql_map = " from QgSsjl";
    } 
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<QgSsjl> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  public String getCondition(QgSearchForm form, Integer tag) {
    String isNull = "-";
    String sql = "";
    if (form != null) {
      sql = " where 1=1";
      if (form.getSearch() != null && !form.getSearch().isEmpty()) {
        sql = String.valueOf(sql) + " and (b.blh='" + form.getSearch() + "' or b.xingming like '%" + form.getSearch() + "%')";
      }
      if (form.getXingming() != null && !form.getXingming().isEmpty()) {
        sql = String.valueOf(sql) + " and b.xingming like '%" + form.getXingming() + "%'";
      }
      if (form.getXingbie() != null && !form.getXingbie().isEmpty()) {
        String sex = "";
        if (form.getXingbie().equals("1")) {
          sex = "男";
        }
        if (form.getXingbie().equals("0")) {
          sex = "女";
        }
        sql = String.valueOf(sql) + " and b.xingbie='" + sex + "'";
      } 
      if (form.getShouji() != null && !form.getShouji().isEmpty()) {
        sql = String.valueOf(sql) + " and b.shouji='" + form.getShouji() + "'";
      }
      if (form.getRqStart() != null && !form.getRqStart().isEmpty()) {
        String str = getDateStr(form.getRqStart());
        if (str != null) {
          sql = String.valueOf(sql) + " and b.sj>='" + str + "'";
        }
      } 
      if (form.getRqEnd() != null && !form.getRqEnd().isEmpty()) {
        String str = getDateStr(form.getRqEnd());
        if (str != null) {
          sql = String.valueOf(sql) + " and b.sj<='" + str + "'";
        }
      } 
      if (form.getBinglinumber() != null && !form.getBinglinumber().isEmpty()) {
        if (form.getBinglinumber().equals(isNull)) {
          sql = String.valueOf(sql) + " and b.binglinumber is null";
        } else {
          sql = String.valueOf(sql) + " and b.binglinumber='" + form.getBinglinumber() + "'";
        }
      }
      if ((tag.intValue() == 2 || tag.intValue() == 3) && 
        form.getYs_xingming() != null && !form.getYs_xingming().isEmpty()) {
        if (form.getYs_xingming().equals(isNull)) {
          sql = String.valueOf(sql) + " and b.ys_xingming is null";
        } else {
          sql = String.valueOf(sql) + " and b.ys_xingming like '%" + form.getYs_xingming() + "%'";
        }
      }
      if (form.getShengriStart() != null && !form.getShengriStart().isEmpty()) {
        try {
          Integer ageStart = Integer.valueOf(Integer.parseInt(form.getShengriStart()));
          sql = String.valueOf(sql) + " and b.age>=" + ageStart;
        } catch (NumberFormatException numberFormatException) {}
      }
      if (form.getShengriEnd() != null && !form.getShengriEnd().isEmpty()) {
        try {
          Integer ageEnd = Integer.valueOf(Integer.parseInt(form.getShengriEnd()));
          sql = String.valueOf(sql) + " and b.age<=" + ageEnd;
        } catch (NumberFormatException numberFormatException) {}
      }
      if (tag.intValue() == 1 || tag.intValue() == 3) {
        if (form.getSsfyStart() != null && !form.getSsfyStart().isEmpty()) {
          if (form.getSsfyStart().equals(isNull)) {
            sql = String.valueOf(sql) + " and b.ssfy is null";
          } else {
            try {
              Double ssfy = Double.valueOf(Double.parseDouble(form.getSsfyStart()));
              sql = String.valueOf(sql) + " and b.ssfy>=" + ssfy;
            } catch (NumberFormatException numberFormatException) {}
          }
        }
        if (form.getSsfyEnd() != null && !form.getSsfyEnd().isEmpty()) {
          if (form.getSsfyEnd().equals(isNull)) {
            sql = String.valueOf(sql) + " and b.ssfy is null";
          } else {
            try {
              Double ssfy = Double.valueOf(Double.parseDouble(form.getSsfyEnd()));
              sql = String.valueOf(sql) + " and b.ssfy<=" + ssfy;
            } catch (NumberFormatException numberFormatException) {}
          }
        }
      } 
      if (tag.intValue() == 3 && 
        form.getYb() != null && !form.getYb().isEmpty()) {
        String yanbie = "";
        if (form.getYb().equals("0")) {
          yanbie = "右眼";
        }
        if (form.getYb().equals("1")) {
          yanbie = "左眼";
        }
        sql = String.valueOf(sql) + " and b.yb='" + yanbie + "'";
      } 
      if (tag.intValue() == 1 || tag.intValue() == 3 || tag.intValue() == 4) {
        if (form.getSsfs1() != null && !form.getSsfs1().isEmpty()) {
          sql = String.valueOf(sql) + " and b.ssfs1='" + form.getSsfs1() + "'";
        }
        if (form.getSsfs2() != null && !form.getSsfs2().isEmpty()) {
          sql = String.valueOf(sql) + " and b.ssfs2='" + form.getSsfs2() + "'";
        }
        if (form.getSsfs3() != null && !form.getSsfs3().isEmpty()) {
          sql = String.valueOf(sql) + " and b.ssfs3='" + form.getSsfs3() + "'";
        }
      } 
      if (tag.intValue() == 1) {
        if (form.getJcfyStart() != null && !form.getJcfyStart().isEmpty()) {
          if (form.getJcfyStart().equals(isNull)) {
            sql = String.valueOf(sql) + " and b.qg_jcf is null";
          } else {
            try {
              Double jcfy = Double.valueOf(Double.parseDouble(form.getJcfyStart()));
              sql = String.valueOf(sql) + " and b.qg_jcf>=" + jcfy;
            } catch (NumberFormatException numberFormatException) {}
          }
        }
        if (form.getJcfyEnd() != null && !form.getJcfyEnd().isEmpty()) {
          if (form.getJcfyEnd().equals(isNull)) {
            sql = String.valueOf(sql) + " and b.qg_jcf is null";
          } else {
            try {
              Double jcfy = Double.valueOf(Double.parseDouble(form.getJcfyEnd()));
              sql = String.valueOf(sql) + " and b.qg_jcf<=" + jcfy;
            } catch (NumberFormatException numberFormatException) {}
          }
        }
      } 
      if (tag.intValue() == 3) {
        if (form.getPtjs_xingming() != null && !form.getPtjs_xingming().isEmpty()) {
          if (form.getPtjs_xingming().equals(isNull)) {
            sql = String.valueOf(sql) + " and b.ptjs_xingming is null";
          } else {
            sql = String.valueOf(sql) + " and b.ptjs_xingming like '%" + form.getPtjs_xingming() + "%'";
          }
        }
        if (form.getPths_xingming() != null && !form.getPths_xingming().isEmpty()) {
          if (form.getPths_xingming().equals(isNull)) {
            sql = String.valueOf(sql) + " and b.pths_xingming is null";
          } else {
            sql = String.valueOf(sql) + " and b.pths_xingming like '%" + form.getPths_xingming() + "%'";
          }
        }
      } 
      if (tag.intValue() == 1 || tag.intValue() == 3) {
        if (form.getSsfrq_start() != null && !form.getSsfrq_start().isEmpty()) {
          if (form.getSsfrq_start().equals(isNull)) {
            sql = String.valueOf(sql) + " and b.ssf_rq is null";
          } else {
            sql = String.valueOf(sql) + " and b.ssf_rq >= '" + getDateStr(form.getSsfrq_start()) + "'";
          }
        }
        if (form.getSsfrq_end() != null && !form.getSsfrq_end().isEmpty()) {
          if (form.getSsfrq_end().equals(isNull)) {
            sql = String.valueOf(sql) + " and b.ssf_rq is null";
          } else {
            sql = String.valueOf(sql) + " and b.ssf_rq < '" + getDateStr(form.getSsfrq_end()) + "'";
          }
        }
        if (tag.intValue() == 1) {
          if (form.getJcfrq_start() != null && !form.getJcfrq_start().isEmpty()) {
            if (form.getSsfrq_start().equals(isNull)) {
              sql = String.valueOf(sql) + " and b.jcf_rq is null";
            } else {
              sql = String.valueOf(sql) + " and b.jcf_rq >= '" + getDateStr(form.getJcfrq_start()) + "'";
            }
          }
          if (form.getJcfrq_end() != null && !form.getJcfrq_end().isEmpty()) {
            if (form.getJcfrq_end().equals(isNull)) {
              sql = String.valueOf(sql) + " and b.jcf_rq is null";
            } else {
              sql = String.valueOf(sql) + " and b.jcf_rq < '" + getDateStr(form.getJcfrq_end()) + "'";
            }
          }
        } 
      } 
    } 
    return sql;
  }
  
  public String getDateStr(String strDate) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date date = null;
    try {
      date = (Date) sdf.parse(strDate);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    String s = "";
    String c = date.toLocaleString();
    String[] strs = c.split(" ");
    String str = strs[0];
    strs = str.split("-");
    for (int i = strs.length; i >= 1; i--) {
      s = String.valueOf(s) + strs[i - 1];
      if (i == 2) {
        s = String.valueOf(s) + "月";
      }
      if (i != 1) {
        s = String.valueOf(s) + "-";
      }
    } 
    return s;
  }
  
  @Override
  public List<QgSearchForm> findQgbl(Page page, QgSearchForm form) {
    String sql_count = "";
    String sql_map = "";
    String sql_body = "";
    String sql_condition = getCondition(form, Integer.valueOf(1));
    sql_body = " from ( select q.id, q.blh, q.binglinumber, h.xingming, (case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, q.sj, q.ssfy, q.ssf_rq, q.qg_jcf, q.jcf_rq, q.ssfs1, q.ssfs2, q.ssfs3, h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id from ( ( select q.id,q.blh,q.binglinumber,q.jzrq as sj,q.ssfy,q.ssf_rq,q.qg_jcf,q.jcf_rq,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_bl q, qg_lc l where q.id = l.bl_id and (l.ssfs1='准分子' or l.ssfs1='晶体植入') ) union ( select q.id,q.blh,q.binglinumber,q.jzrq as sj,q.ssfy,q.ssf_rq,q.qg_jcf,q.jcf_rq,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_bl_er q, qg_lc l where q.id = l.bl_id and (l.ssfs1='儿童屈光') ) ) q,huanzhexinxi h where q.blh = h.binglihao order by q.sj desc ) b";
    sql_count = "select count(b.id)";
    sql_map = "select rownum xh,b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.sj,b.ssfy,b.ssf_rq,b.qg_jcf,b.jcf_rq,b.ssfs1,b.ssfs2,b.ssfs3,b.sfzh,b.shengri,b.age,b.lc_id";
    sql_count = String.valueOf(sql_count) + sql_body;
    sql_map = String.valueOf(sql_map) + sql_body;
    sql_count = String.valueOf(sql_count) + sql_condition;
    sql_map = String.valueOf(sql_map) + sql_condition;
    Session session1 = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery1 = session1.createSQLQuery(sql_count);
    Object uniqueResult = sQLQuery1.uniqueResult();
    session1.close();
    Integer count = Integer.valueOf(0);
    if (uniqueResult != null) {
      count = Integer.valueOf(Integer.parseInt(uniqueResult.toString()));
    }
    page.setRowsCount(count);
    page.init();
    Session session2 = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery2 = session2.createSQLQuery(sql_map);
    sQLQuery2.setFirstResult(page.getStartRow().intValue());
    sQLQuery2.setMaxResults(page.getPageSize().intValue());
    List<Object[]> list = sQLQuery2.list();
    session2.close();
    List<QgSearchForm> listSearch = null;
    if (list != null) {
      listSearch = new ArrayList<QgSearchForm>();
      for (int i = 0; i < list.size(); i++) {
        QgSearchForm qf = new QgSearchForm();
        Object[] objs = list.get(i);
        qf.setXh(Integer.valueOf(Integer.parseInt((objs[0] == null) ? "" : objs[0].toString())));
        qf.setId(Long.valueOf(Long.parseLong((objs[1] == null) ? "" : objs[1].toString())));
        qf.setBlh((objs[2] == null) ? "" : objs[2].toString());
        qf.setBinglinumber((objs[3] == null) ? "" : objs[3].toString());
        qf.setXingming((objs[4] == null) ? "" : objs[4].toString());
        qf.setXingbie((objs[5] == null) ? "" : objs[5].toString());
        qf.setShouji((objs[6] == null) ? "" : objs[6].toString());
        qf.setSj((objs[7] == null) ? null : (Date)objs[7]);
        qf.setSsfy((objs[8] == null) ? "" : objs[8].toString());
        qf.setSsf_rq((objs[9] == null) ? null : (Date)objs[9]);
        qf.setQg_jcf((objs[10] == null) ? "" : objs[10].toString());
        qf.setJcf_rq((objs[11] == null) ? null : (Date)objs[11]);
        qf.setSsfs1((objs[12] == null) ? "" : objs[12].toString());
        qf.setSsfs2((objs[13] == null) ? "" : objs[13].toString());
        qf.setSsfs3((objs[14] == null) ? "" : objs[14].toString());
        qf.setSfzh((objs[15] == null) ? "" : objs[15].toString());
        qf.setShengri((objs[16] == null) ? null : new Date(((Date)objs[16]).getTime()));
        qf.setAge(Integer.valueOf(Integer.parseInt((objs[17] == null) ? "" : objs[17].toString())));
        qf.setLc_id((objs[18] == null) ? null : Long.valueOf(Long.parseLong(objs[18].toString())));
        listSearch.add(qf);
      } 
    } 
    return listSearch;
  }
  
  @Override
  public List<QgSearchForm> findQgYY(Page page, QgSearchForm form) {
    String sql_count = "";
    String sql_map = "";
    String sql_body = "";
    String sql_condition = getCondition(form, Integer.valueOf(2));
    sql_body = " from ( select q.id,q.blh,q.binglinumber,h.xingming, (case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji,q.sj,q.ys_gonghao,q.ys_xingming,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id from ( select distinct y.id,y.blh,b.binglinumber,y.yysj as sj,y.yy_qz as ys_gonghao,(select xingming from yuangong where gonghao=y.yy_qz) as ys_xingming,y.lc_id from qg_yy y,qg_lc l,qg_bl b,yuangong g where y.lc_id = l.id and l.bl_id=b.id and (l.ssfs1='准分子' or l.ssfs1='晶体植入') union select distinct y.id,y.blh,b.binglinumber,y.yysj as sj,y.yy_qz as ys_gonghao,(select xingming from yuangong where gonghao=y.yy_qz) as ys_xingming,y.lc_id from qg_yy y,qg_lc l,qg_bl_er b where y.lc_id = l.id and l.bl_id=b.id and l.ssfs1='儿童屈光' ) q,huanzhexinxi h where q.blh=h.binglihao order by q.sj desc ) b";
    sql_count = "select count(b.id)";
    sql_map = "select rownum xh,b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.sj,b.ys_gonghao,b.ys_xingming,b.sfzh,b.shengri,b.age,b.lc_id";
    sql_count = String.valueOf(sql_count) + sql_body;
    sql_map = String.valueOf(sql_map) + sql_body;
    sql_count = String.valueOf(sql_count) + sql_condition;
    sql_map = String.valueOf(sql_map) + sql_condition;
    Session session1 = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery1 = session1.createSQLQuery(sql_count);
    Object uniqueResult = sQLQuery1.uniqueResult();
    session1.close();
    Integer count = Integer.valueOf(0);
    if (uniqueResult != null) {
      count = Integer.valueOf(Integer.parseInt(uniqueResult.toString()));
    }
    page.setRowsCount(count);
    page.init();
    Session session2 = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery2 = session2.createSQLQuery(sql_map);
    sQLQuery2.setFirstResult(page.getStartRow().intValue());
    sQLQuery2.setMaxResults(page.getPageSize().intValue());
    List<Object[]> list = sQLQuery2.list();
    session2.close();
    List<QgSearchForm> listSearch = null;
    if (list != null) {
      listSearch = new ArrayList<QgSearchForm>();
      for (int i = 0; i < list.size(); i++) {
        QgSearchForm qf = new QgSearchForm();
        Object[] objs = list.get(i);
        qf.setXh(Integer.valueOf(Integer.parseInt((objs[0] == null) ? "" : objs[0].toString())));
        qf.setId(Long.valueOf(Long.parseLong((objs[1] == null) ? "" : objs[1].toString())));
        qf.setBlh((objs[2] == null) ? "" : objs[2].toString());
        qf.setBinglinumber((objs[3] == null) ? "" : objs[3].toString());
        qf.setXingming((objs[4] == null) ? "" : objs[4].toString());
        qf.setXingbie((objs[5] == null) ? "" : objs[5].toString());
        qf.setShouji((objs[6] == null) ? "" : objs[6].toString());
        qf.setSj((objs[7] == null) ? null : (Date)objs[7]);
        qf.setYs_gonghao((objs[8] == null) ? "" : objs[8].toString());
        qf.setYs_xingming((objs[9] == null) ? "" : objs[9].toString());
        qf.setSfzh((objs[10] == null) ? "" : objs[10].toString());
        qf.setShengri((objs[11] == null) ? null : new Date(((Date)objs[11]).getTime()));
        qf.setAge(Integer.valueOf(Integer.parseInt((objs[12] == null) ? "" : objs[12].toString())));
        qf.setLc_id((objs[13] == null) ? null : Long.valueOf(Long.parseLong(objs[13].toString())));
        listSearch.add(qf);
      } 
    } 
    return listSearch;
  }
  
  @Override
  public List<QgSearchForm> findQgSsjl(Page page, QgSearchForm form) {
    String sql_count = "";
    String sql_map = "";
    String sql_body = "";
    String sql_condition = getCondition(form, Integer.valueOf(3));
    String sql_desc = " order by xh";
    sql_body = " from (select c.id,c.blh,c.binglinumber,c.xingming,c.xingbie,c.shouji,c.ssfy,c.ssf_rq,c.yb,c.ssfs1,c.ssfs2,c.ssfs3,c.sj,c.ys_gonghao,y.xingming as ys_xingming,c.sfzh,c.shengri,c.age,c.lc_id,c.ptjs as ptjs_gonghao,y1.xingming as ptjs_xingming,c.pths as pths_gonghao,y2.xingming as pths_xingming from ( select q.id,q.blh,q.binglinumber,h.xingming,(case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, q.ssfy,q.ssf_rq,q.yb,q.ssfs1,q.ssfs2,q.ssfs3,q.sj,q.ys_gonghao,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id, q.ptjs, q.pths from ( (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(select '右眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_r as sj,s.ssys_r as ys_gonghao,l.id as lc_id,s.ptjs_r as ptjs,s.pths_r as pths from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(select '左眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_l as sj,s.ssys_l as ys_gonghao,l.id as lc_id,s.ptjs_l as ptjs,s.pths_l as pths from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(case s.yanbie when 'r' then '右眼' when 'l' then '左眼' else '' end) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq as sj,s.zdys as ys_gonghao,l.id as lc_id,s.zsys as ptjs,s.hs as pths from qg_jt_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id  and l.ssfs1='晶体植入') union (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(select '右眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_r as sj,s.ssys_r as ys_gonghao,l.id as lc_id,(select '-' from dual) as ptjs,(select '-' from dual) as pths from qg_er_ssjl s,qg_bl_er b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='儿童屈光' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(select '左眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_l as sj,s.ssys_l as ys_gonghao,l.id as lc_id,(select '-' from dual) as ptjs,(select '-' from dual) as pths from qg_er_ssjl s,qg_bl_er b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='儿童屈光' ) ) q,huanzhexinxi h where q.blh = h.binglihao order by q.sj desc) c  left join yuangong y on c.ys_gonghao = y.gonghao left join yuangong y1 on c.ptjs = y1.gonghao left join yuangong y2 on c.pths = y2.gonghao ) b";
    sql_map = "select rownum xh,b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.ssfy,b.ssf_rq,b.yb,b.ssfs1,b.ssfs2,b.ssfs3,b.sj,b.ys_gonghao,b.ys_xingming,b.sfzh,b.shengri,b.age,b.lc_id,ptjs_gonghao,ptjs_xingming,pths_gonghao,pths_xingming";
    sql_count = "select count(b.id)";
    sql_count = String.valueOf(sql_count) + sql_body;
    sql_map = String.valueOf(sql_map) + sql_body;
    sql_count = String.valueOf(sql_count) + sql_condition;
    sql_map = String.valueOf(sql_map) + sql_condition;
    sql_map = String.valueOf(sql_map) + sql_desc;
    Session session1 = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery1 = session1.createSQLQuery(sql_count);
    Object uniqueResult = sQLQuery1.uniqueResult();
    session1.close();
    Integer count = Integer.valueOf(0);
    if (uniqueResult != null) {
      count = Integer.valueOf(Integer.parseInt(uniqueResult.toString()));
    }
    page.setRowsCount(count);
    page.init();
    Session session2 = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery2 = session2.createSQLQuery(sql_map);
    sQLQuery2.setFirstResult(page.getStartRow().intValue());
    sQLQuery2.setMaxResults(page.getPageSize().intValue());
    List<Object[]> list = sQLQuery2.list();
    session2.close();
    List<QgSearchForm> listSearch = null;
    if (list != null) {
      listSearch = new ArrayList<QgSearchForm>();
      for (int i = 0; i < list.size(); i++) {
        QgSearchForm qf = new QgSearchForm();
        Object[] objs = list.get(i);
        qf.setXh(Integer.valueOf(Integer.parseInt((objs[0] == null) ? "" : objs[0].toString())));
        qf.setId(Long.valueOf(Long.parseLong((objs[1] == null) ? "" : objs[1].toString())));
        qf.setBlh((objs[2] == null) ? "" : objs[2].toString());
        qf.setBinglinumber((objs[3] == null) ? "" : objs[3].toString());
        qf.setXingming((objs[4] == null) ? "" : objs[4].toString());
        qf.setXingbie((objs[5] == null) ? "" : objs[5].toString());
        qf.setShouji((objs[6] == null) ? "" : objs[6].toString());
        qf.setSsfy((objs[7] == null) ? "" : objs[7].toString());
        qf.setSsf_rq((objs[8] == null) ? null : (Date)objs[8]);
        qf.setYb((objs[9] == null) ? "" : objs[9].toString());
        qf.setSsfs1((objs[10] == null) ? "" : objs[10].toString());
        qf.setSsfs2((objs[11] == null) ? "" : objs[11].toString());
        qf.setSsfs3((objs[12] == null) ? "" : objs[12].toString());
        qf.setSj((objs[13] == null) ? null : (Date)objs[13]);
        qf.setYs_gonghao((objs[14] == null) ? "" : objs[14].toString());
        qf.setYs_xingming((objs[15] == null) ? "" : objs[15].toString());
        qf.setSfzh((objs[16] == null) ? "" : objs[16].toString());
        qf.setShengri((objs[17] == null) ? null : new Date(((Date)objs[17]).getTime()));
        qf.setAge(Integer.valueOf(Integer.parseInt((objs[18] == null) ? "" : objs[18].toString())));
        qf.setLc_id((objs[19] == null) ? null : Long.valueOf(Long.parseLong(objs[19].toString())));
        qf.setPtjs_gonghao((objs[20] == null) ? "" : objs[20].toString());
        qf.setPtjs_xingming((objs[21] == null) ? "" : objs[21].toString());
        qf.setPths_gonghao((objs[22] == null) ? "" : objs[22].toString());
        qf.setPths_xingming((objs[23] == null) ? "" : objs[23].toString());
        listSearch.add(qf);
      } 
    } 
    return listSearch;
  }
  
  @Override
  public List<QgSearchForm> findQgShjl(Page page, QgSearchForm form) {
    String sql_count = "";
    String sql_map = "";
    String sql_body = "";
    String sql_condition = getCondition(form, Integer.valueOf(4));
    String sql_desc = " order by b.sj desc";
    sql_body = " from ( select j.id,j.blh,j.binglinumber,h.xingming, (case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, j.sj,j.ssfs1,j.ssfs2,j.ssfs3,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, j.lc_id from( select s.id,s.blh,q.binglinumber,s.sj,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_shjl s,qg_lc l,qg_bl q where s.lc_id=l.id and l.ssfs1='准分子' and l.bl_id=q.id union select s.id,s.blh,q.binglinumber,s.sj,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_shfc s,qg_lc l,qg_bl q where s.lc_id=l.id and l.ssfs1='晶体植入' and l.bl_id=q.id union select s.id,s.blh,q.binglinumber,s.sj,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_shfc_er s,qg_lc l,qg_bl_er q where s.lc_id=l.id and l.ssfs1='儿童屈光' and l.bl_id=q.id ) j,huanzhexinxi h where j.blh = h.binglihao order by j.sj desc ) b";
    sql_count = "select count(b.id)";
    sql_map = "select rownum xh,b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.sj,b.ssfs1,b.ssfs2,b.ssfs3,b.sfzh,b.shengri,b.age,b.lc_id";
    sql_count = String.valueOf(sql_count) + sql_body;
    sql_map = String.valueOf(sql_map) + sql_body;
    sql_count = String.valueOf(sql_count) + sql_condition;
    sql_map = String.valueOf(sql_map) + sql_condition;
    sql_count = String.valueOf(sql_count) + sql_desc;
    sql_map = String.valueOf(sql_map) + sql_desc;
    Session session1 = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery1 = session1.createSQLQuery(sql_count);
    Object uniqueResult = sQLQuery1.uniqueResult();
    session1.close();
    Integer count = Integer.valueOf(0);
    if (uniqueResult != null) {
      count = Integer.valueOf(Integer.parseInt(uniqueResult.toString()));
    }
    page.setRowsCount(count);
    page.init();
    Session session2 = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery2 = session2.createSQLQuery(sql_map);
    sQLQuery2.setFirstResult(page.getStartRow().intValue());
    sQLQuery2.setMaxResults(page.getPageSize().intValue());
    List<Object[]> list = sQLQuery2.list();
    session2.close();
    List<QgSearchForm> listSearch = null;
    if (list != null) {
      listSearch = new ArrayList<QgSearchForm>();
      for (int i = 0; i < list.size(); i++) {
        QgSearchForm qf = new QgSearchForm();
        Object[] objs = list.get(i);
        qf.setXh(Integer.valueOf(Integer.parseInt((objs[0] == null) ? "" : objs[0].toString())));
        qf.setId(Long.valueOf(Long.parseLong((objs[1] == null) ? "" : objs[1].toString())));
        qf.setBlh((objs[2] == null) ? "" : objs[2].toString());
        qf.setBinglinumber((objs[3] == null) ? "" : objs[3].toString());
        qf.setXingming((objs[4] == null) ? "" : objs[4].toString());
        qf.setXingbie((objs[5] == null) ? "" : objs[5].toString());
        qf.setShouji((objs[6] == null) ? "" : objs[6].toString());
        qf.setSj((objs[7] == null) ? null : (Date)objs[7]);
        qf.setSsfs1((objs[8] == null) ? "" : objs[8].toString());
        qf.setSsfs2((objs[9] == null) ? "" : objs[9].toString());
        qf.setSsfs3((objs[10] == null) ? "" : objs[10].toString());
        qf.setSfzh((objs[11] == null) ? "" : objs[11].toString());
        qf.setShengri((objs[12] == null) ? null : new Date(((Date)objs[12]).getTime()));
        qf.setAge(Integer.valueOf(Integer.parseInt((objs[13] == null) ? "" : objs[13].toString())));
        qf.setLc_id((objs[14] == null) ? null : Long.valueOf(Long.parseLong(objs[14].toString())));
        listSearch.add(qf);
      } 
    } 
    return listSearch;
  }
  
  @Override
  public List<QgSearchForm> findQgbl(QgSearchForm form) {
    String sql_map = "";
    String sql_body = "";
    String sql_condition = getCondition(form, Integer.valueOf(1));
    sql_body = " from ( select q.id, q.blh, q.binglinumber, h.xingming, (case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, q.sj, q.ssfy, q.ssf_rq, q.qg_jcf, q.jcf_rq, q.ssfs1, q.ssfs2, q.ssfs3, h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id from ( ( select q.id,q.blh,q.binglinumber,q.jzrq as sj,q.ssfy,q.ssf_rq,q.qg_jcf,q.jcf_rq,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_bl q, qg_lc l where q.id = l.bl_id and (l.ssfs1='准分子' or l.ssfs1='晶体植入') ) union ( select q.id,q.blh,q.binglinumber,q.jzrq as sj,q.ssfy,q.ssf_rq,q.qg_jcf,q.jcf_rq,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_bl_er q, qg_lc l where q.id = l.bl_id and (l.ssfs1='儿童屈光') ) ) q,huanzhexinxi h where q.blh = h.binglihao order by q.sj desc ) b";
    sql_map = "select rownum xh,b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.sj,b.ssfy,b.ssf_rq,b.qg_jcf,b.jcf_rq,b.ssfs1,b.ssfs2,b.ssfs3,b.sfzh,b.shengri,b.age,b.lc_id";
    sql_map = String.valueOf(sql_map) + sql_body;
    sql_map = String.valueOf(sql_map) + sql_condition;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_map);
    List<Object[]> list = sQLQuery.list();
    session.close();
    List<QgSearchForm> listSearch = null;
    if (list != null) {
      listSearch = new ArrayList<QgSearchForm>();
      for (int i = 0; i < list.size(); i++) {
        QgSearchForm qf = new QgSearchForm();
        Object[] objs = list.get(i);
        qf.setXh(Integer.valueOf(Integer.parseInt((objs[0] == null) ? "" : objs[0].toString())));
        qf.setId(Long.valueOf(Long.parseLong((objs[1] == null) ? "" : objs[1].toString())));
        qf.setBlh((objs[2] == null) ? "" : objs[2].toString());
        qf.setBinglinumber((objs[3] == null) ? "" : objs[3].toString());
        qf.setXingming((objs[4] == null) ? "" : objs[4].toString());
        qf.setXingbie((objs[5] == null) ? "" : objs[5].toString());
        qf.setShouji((objs[6] == null) ? "" : objs[6].toString());
        qf.setSj((objs[7] == null) ? null : (Date)objs[7]);
        qf.setSsfy((objs[8] == null) ? "" : objs[8].toString());
        qf.setSsf_rq((objs[9] == null) ? null : (Date)objs[9]);
        qf.setQg_jcf((objs[10] == null) ? "" : objs[10].toString());
        qf.setJcf_rq((objs[11] == null) ? null : (Date)objs[11]);
        qf.setSsfs1((objs[12] == null) ? "" : objs[12].toString());
        qf.setSsfs2((objs[13] == null) ? "" : objs[13].toString());
        qf.setSsfs3((objs[14] == null) ? "" : objs[14].toString());
        qf.setSfzh((objs[15] == null) ? "" : objs[15].toString());
        qf.setShengri((objs[16] == null) ? null : new Date(((Date)objs[16]).getTime()));
        qf.setAge(Integer.valueOf(Integer.parseInt((objs[17] == null) ? "" : objs[17].toString())));
        qf.setLc_id((objs[18] == null) ? null : Long.valueOf(Long.parseLong(objs[18].toString())));
        listSearch.add(qf);
      } 
    } 
    return listSearch;
  }
  
  @Override
  public List<QgSearchForm> findQgYY(QgSearchForm form) {
    String sql_map = "";
    String sql_body = "";
    String sql_condition = getCondition(form, Integer.valueOf(2));
    sql_body = " from ( select q.id,q.blh,q.binglinumber,h.xingming, (case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji,q.sj,q.ys_gonghao,q.ys_xingming,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id from ( select distinct y.id,y.blh,b.binglinumber,y.yysj as sj,y.yy_qz as ys_gonghao,(select xingming from yuangong where gonghao=y.yy_qz) as ys_xingming,y.lc_id from qg_yy y,qg_lc l,qg_bl b,yuangong g where y.lc_id = l.id and l.bl_id=b.id and (l.ssfs1='准分子' or l.ssfs1='晶体植入') union select distinct y.id,y.blh,b.binglinumber,y.yysj as sj,y.yy_qz as ys_gonghao,(select xingming from yuangong where gonghao=y.yy_qz) as ys_xingming,y.lc_id from qg_yy y,qg_lc l,qg_bl_er b where y.lc_id = l.id and l.bl_id=b.id and l.ssfs1='儿童屈光' ) q,huanzhexinxi h where q.blh=h.binglihao order by q.sj desc ) b";
    sql_map = "select rownum xh,b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.sj,b.ys_gonghao,b.ys_xingming,b.sfzh,b.shengri,b.age,b.lc_id";
    sql_map = String.valueOf(sql_map) + sql_body;
    sql_map = String.valueOf(sql_map) + sql_condition;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_map);
    List<Object[]> list = sQLQuery.list();
    session.close();
    List<QgSearchForm> listSearch = null;
    if (list != null) {
      listSearch = new ArrayList<QgSearchForm>();
      for (int i = 0; i < list.size(); i++) {
        QgSearchForm qf = new QgSearchForm();
        Object[] objs = list.get(i);
        qf.setXh(Integer.valueOf(Integer.parseInt((objs[0] == null) ? "" : objs[0].toString())));
        qf.setId(Long.valueOf(Long.parseLong((objs[1] == null) ? "" : objs[1].toString())));
        qf.setBlh((objs[2] == null) ? "" : objs[2].toString());
        qf.setBinglinumber((objs[3] == null) ? "" : objs[3].toString());
        qf.setXingming((objs[4] == null) ? "" : objs[4].toString());
        qf.setXingbie((objs[5] == null) ? "" : objs[5].toString());
        qf.setShouji((objs[6] == null) ? "" : objs[6].toString());
        qf.setSj((objs[7] == null) ? null : (Date)objs[7]);
        qf.setYs_gonghao((objs[8] == null) ? "" : objs[8].toString());
        qf.setYs_xingming((objs[9] == null) ? "" : objs[9].toString());
        qf.setSfzh((objs[10] == null) ? "" : objs[10].toString());
        qf.setShengri((objs[11] == null) ? null : new Date(((Date)objs[11]).getTime()));
        qf.setAge(Integer.valueOf(Integer.parseInt((objs[12] == null) ? "" : objs[12].toString())));
        qf.setLc_id((objs[13] == null) ? null : Long.valueOf(Long.parseLong(objs[13].toString())));
        listSearch.add(qf);
      } 
    } 
    return listSearch;
  }
  
  @Override
  public List<QgSearchForm> findQgSsjl(QgSearchForm form) {
    String sql_map = "";
    String sql_body = "";
    String sql_condition = getCondition(form, Integer.valueOf(3));
    String sql_desc = " order by xh";
    sql_body = " from (select c.id,c.blh,c.binglinumber,c.xingming,c.xingbie,c.shouji,c.ssfy,c.ssf_rq,c.yb,c.ssfs1,c.ssfs2,c.ssfs3,c.sj,c.ys_gonghao,y.xingming as ys_xingming,c.sfzh,c.shengri,c.age,c.lc_id,c.ptjs as ptjs_gonghao,y1.xingming as ptjs_xingming,c.pths as pths_gonghao,y2.xingming as pths_xingming from ( select q.id,q.blh,q.binglinumber,h.xingming,(case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, q.ssfy,q.ssf_rq,q.yb,q.ssfs1,q.ssfs2,q.ssfs3,q.sj,q.ys_gonghao,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id, q.ptjs, q.pths from ( (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(select '右眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_r as sj,s.ssys_r as ys_gonghao,l.id as lc_id,s.ptjs_r as ptjs,s.pths_r as pths from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(select '左眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_l as sj,s.ssys_l as ys_gonghao,l.id as lc_id,s.ptjs_l as ptjs,s.pths_l as pths from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(case s.yanbie when 'r' then '右眼' when 'l' then '左眼' else '' end) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq as sj,s.zdys as ys_gonghao,l.id as lc_id,s.zsys as ptjs,s.hs as pths from qg_jt_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id  and l.ssfs1='晶体植入') union (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(select '右眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_r as sj,s.ssys_r as ys_gonghao,l.id as lc_id,(select '-' from dual) as ptjs,(select '-' from dual) as pths from qg_er_ssjl s,qg_bl_er b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='儿童屈光' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,b.ssf_rq,(select '左眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_l as sj,s.ssys_l as ys_gonghao,l.id as lc_id,(select '-' from dual) as ptjs,(select '-' from dual) as pths from qg_er_ssjl s,qg_bl_er b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='儿童屈光' ) ) q,huanzhexinxi h where q.blh = h.binglihao order by q.sj desc) c  left join yuangong y on c.ys_gonghao = y.gonghao left join yuangong y1 on c.ptjs = y1.gonghao left join yuangong y2 on c.pths = y2.gonghao ) b";
    sql_map = "select rownum xh,b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.ssfy,b.ssf_rq,b.yb,b.ssfs1,b.ssfs2,b.ssfs3,b.sj,b.ys_gonghao,b.ys_xingming,b.sfzh,b.shengri,b.age,b.lc_id,ptjs_gonghao,ptjs_xingming,pths_gonghao,pths_xingming";
    sql_map = String.valueOf(sql_map) + sql_body;
    sql_map = String.valueOf(sql_map) + sql_condition;
    sql_map = String.valueOf(sql_map) + sql_desc;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_map);
    List<Object[]> list = sQLQuery.list();
    session.close();
    List<QgSearchForm> listSearch = null;
    if (list != null) {
      listSearch = new ArrayList<QgSearchForm>();
      for (int i = 0; i < list.size(); i++) {
        QgSearchForm qf = new QgSearchForm();
        Object[] objs = list.get(i);
        qf.setXh(Integer.valueOf(Integer.parseInt((objs[0] == null) ? "" : objs[0].toString())));
        qf.setId(Long.valueOf(Long.parseLong((objs[1] == null) ? "" : objs[1].toString())));
        qf.setBlh((objs[2] == null) ? "" : objs[2].toString());
        qf.setBinglinumber((objs[3] == null) ? "" : objs[3].toString());
        qf.setXingming((objs[4] == null) ? "" : objs[4].toString());
        qf.setXingbie((objs[5] == null) ? "" : objs[5].toString());
        qf.setShouji((objs[6] == null) ? "" : objs[6].toString());
        qf.setSsfy((objs[7] == null) ? "" : objs[7].toString());
        qf.setSsf_rq((objs[8] == null) ? null : (Date)objs[8]);
        qf.setYb((objs[9] == null) ? "" : objs[9].toString());
        qf.setSsfs1((objs[10] == null) ? "" : objs[10].toString());
        qf.setSsfs2((objs[11] == null) ? "" : objs[11].toString());
        qf.setSsfs3((objs[12] == null) ? "" : objs[12].toString());
        qf.setSj((objs[13] == null) ? null : (Date)objs[13]);
        qf.setYs_gonghao((objs[14] == null) ? "" : objs[14].toString());
        qf.setYs_xingming((objs[15] == null) ? "" : objs[15].toString());
        qf.setSfzh((objs[16] == null) ? "" : objs[16].toString());
        qf.setShengri((objs[17] == null) ? null : new Date(((Date)objs[17]).getTime()));
        qf.setAge(Integer.valueOf(Integer.parseInt((objs[18] == null) ? "" : objs[18].toString())));
        qf.setLc_id((objs[19] == null) ? null : Long.valueOf(Long.parseLong(objs[19].toString())));
        qf.setPtjs_gonghao((objs[20] == null) ? "" : objs[20].toString());
        qf.setPtjs_xingming((objs[21] == null) ? "" : objs[21].toString());
        qf.setPths_gonghao((objs[22] == null) ? "" : objs[22].toString());
        qf.setPths_xingming((objs[23] == null) ? "" : objs[23].toString());
        listSearch.add(qf);
      } 
    } 
    return listSearch;
  }
  
  @Override
  public List<QgSearchForm> findQgShjl(QgSearchForm form) {
    String sql_map = "";
    String sql_body = "";
    String sql_condition = getCondition(form, Integer.valueOf(4));
    String sql_desc = " order by b.sj desc";
    sql_body = " from ( select j.id,j.blh,j.binglinumber,h.xingming, (case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, j.sj,j.ssfs1,j.ssfs2,j.ssfs3,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, j.lc_id from( select s.id,s.blh,q.binglinumber,s.sj,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_shjl s,qg_lc l,qg_bl q where s.lc_id=l.id and l.ssfs1='准分子' and l.bl_id=q.id union select s.id,s.blh,q.binglinumber,s.sj,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_shfc s,qg_lc l,qg_bl q where s.lc_id=l.id and l.ssfs1='晶体植入' and l.bl_id=q.id union select s.id,s.blh,q.binglinumber,s.sj,l.ssfs1,l.ssfs2,l.ssfs3,l.id as lc_id from qg_shfc_er s,qg_lc l,qg_bl_er q where s.lc_id=l.id and l.ssfs1='儿童屈光' and l.bl_id=q.id ) j,huanzhexinxi h where j.blh = h.binglihao order by j.sj desc ) b";
    sql_map = "select rownum xh,b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.sj,b.ssfs1,b.ssfs2,b.ssfs3,b.sfzh,b.shengri,b.age,b.lc_id";
    sql_map = String.valueOf(sql_map) + sql_body;
    sql_map = String.valueOf(sql_map) + sql_condition;
    sql_map = String.valueOf(sql_map) + sql_desc;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_map);
    List<Object[]> list = sQLQuery.list();
    session.close();
    List<QgSearchForm> listSearch = null;
    if (list != null) {
      listSearch = new ArrayList<QgSearchForm>();
      for (int i = 0; i < list.size(); i++) {
        QgSearchForm qf = new QgSearchForm();
        Object[] objs = list.get(i);
        qf.setXh(Integer.valueOf(Integer.parseInt((objs[0] == null) ? "" : objs[0].toString())));
        qf.setId(Long.valueOf(Long.parseLong((objs[1] == null) ? "" : objs[1].toString())));
        qf.setBlh((objs[2] == null) ? "" : objs[2].toString());
        qf.setBinglinumber((objs[3] == null) ? "" : objs[3].toString());
        qf.setXingming((objs[4] == null) ? "" : objs[4].toString());
        qf.setXingbie((objs[5] == null) ? "" : objs[5].toString());
        qf.setShouji((objs[6] == null) ? "" : objs[6].toString());
        qf.setSj((objs[7] == null) ? null : (Date)objs[7]);
        qf.setSsfs1((objs[8] == null) ? "" : objs[8].toString());
        qf.setSsfs2((objs[9] == null) ? "" : objs[9].toString());
        qf.setSsfs3((objs[10] == null) ? "" : objs[10].toString());
        qf.setSfzh((objs[11] == null) ? "" : objs[11].toString());
        qf.setShengri((objs[12] == null) ? null : new Date(((Date)objs[12]).getTime()));
        qf.setAge(Integer.valueOf(Integer.parseInt((objs[13] == null) ? "" : objs[13].toString())));
        qf.setLc_id((objs[14] == null) ? null : Long.valueOf(Long.parseLong(objs[14].toString())));
        listSearch.add(qf);
      } 
    } 
    return listSearch;
  }
  
  @Override
  public Integer getCountByTj(String realPath, QgtjConditionForm form) {
    Integer count = Integer.valueOf(0);
    String sql_condition = "";
    if (form != null) {
      if (form.getJcxm() != null && !form.getJcxm().equals("")) {
        if (form.getJcxm().indexOf("@") > -1) {
          String[] jcxms = form.getJcxm().split("@");
          if (jcxms.length > 0) {
            sql_condition = String.valueOf(sql_condition) + " and (";
            for (int i = 0; i < jcxms.length; i++) {
              if (!jcxms[i].equals("")) {
                String jcxm = jcxms[i];
                if (i == 0) {
                  sql_condition = String.valueOf(sql_condition) + "t.jcxm='" + jcxm + "'";
                } else {
                  sql_condition = String.valueOf(sql_condition) + " or t.jcxm='" + jcxm + "'";
                }
              }
            }
            sql_condition = String.valueOf(sql_condition) + ")";
          }
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.jcxm='" + form.getJcxm() + "'";
        }
      }
      if (form.getBeginSj() != null && !form.getBeginSj().equals("")) {
        String dStr = getDateStr(form.getBeginSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj>='" + dStr + "'";
      } 
      if (form.getEndSj() != null && !form.getEndSj().equals("")) {
        String dStr = getDateStr(form.getEndSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj<='" + dStr + "'";
      } 
      if (form.getSsfs1() != null && !form.getSsfs1().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs1='" + form.getSsfs1() + "'";
      }
      if (form.getSsfs2() != null && !form.getSsfs2().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs2='" + form.getSsfs2() + "'";
      }
      if (form.getSsfs3() != null && !form.getSsfs3().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs3='" + form.getSsfs3() + "'";
      }
      if (form.getXmfl() != null && !form.getXmfl().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.xmfl='" + form.getXmfl() + "'";
      }
      if (form.getYsqz() != null && !form.getYsqz().equals("")) {
        if (form.getYsqz().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz is null";
        } else if (form.getYsqz().indexOf("@") > -1) {
          String[] ysqzs = form.getYsqz().split("@");
          if (ysqzs.length > 0) {
            sql_condition = String.valueOf(sql_condition) + " and (";
            for (int i = 0; i < ysqzs.length; i++) {
              if (!ysqzs[i].equals("")) {
                String[] strs = ysqzs[i].split("[(]");
                String[] strs1 = strs[1].split("[)]");
                String gonghao = strs1[0];
                if (i == 0) {
                  if (gonghao.equals("null")) {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz is null";
                  } else {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz='" + gonghao + "'";
                  }
                } else if (gonghao.equals("null")) {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz is null";
                } else {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz='" + gonghao + "'";
                }
              }
            }
            sql_condition = String.valueOf(sql_condition) + ")";
          }
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz='" + form.getYsqz() + "'";
        }
      }
      if (form.getYs_xingming() != null && !form.getYs_xingming().equals("")) {
        if (form.getYs_xingming().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming is null";
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming='" + form.getYs_xingming() + "'";
        }
      }
    } 
    String mainSql = QgUtil.getQgtjMainSql(realPath);
    mainSql = String.valueOf(mainSql) + sql_condition;
    String sql_head = "select count(z.jcxm) as count ";
    String sql_body = "from (" + mainSql + ") z";
    String sql_finally = String.valueOf(sql_head) + sql_body;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_finally);
    count = Integer.valueOf(Integer.parseInt(sQLQuery.uniqueResult().toString()));
    session.close();
    return count;
  }
  
  @Override
  public List<Map<String, String>> getAllYs(String realPath, QgtjConditionForm form) {
    List<Map<String, String>> list_map = null;
    Integer count = Integer.valueOf(0);
    String sql_condition = "";
    if (form != null) {
      if (form.getJcxm() != null && !form.getJcxm().equals("")) {
        if (form.getJcxm().indexOf("@") > -1) {
          String[] jcxms = form.getJcxm().split("@");
          if (jcxms.length > 0) {
            sql_condition = String.valueOf(sql_condition) + " and (";
            for (int i = 0; i < jcxms.length; i++) {
              if (!jcxms[i].equals("")) {
                String jcxm = jcxms[i];
                if (i == 0) {
                  sql_condition = String.valueOf(sql_condition) + "t.jcxm='" + jcxm + "'";
                } else {
                  sql_condition = String.valueOf(sql_condition) + " or t.jcxm='" + jcxm + "'";
                }
              }
            }
            sql_condition = String.valueOf(sql_condition) + ")";
          }
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.jcxm='" + form.getJcxm() + "'";
        }
      }
      if (form.getBeginSj() != null && !form.getBeginSj().equals("")) {
        String dStr = getDateStr(form.getBeginSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj>='" + dStr + "'";
      } 
      if (form.getEndSj() != null && !form.getEndSj().equals("")) {
        String dStr = getDateStr(form.getEndSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj<='" + dStr + "'";
      } 
      if (form.getSsfs1() != null && !form.getSsfs1().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs1='" + form.getSsfs1() + "'";
      }
      if (form.getSsfs2() != null && !form.getSsfs2().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs2='" + form.getSsfs2() + "'";
      }
      if (form.getSsfs3() != null && !form.getSsfs3().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs3='" + form.getSsfs3() + "'";
      }
      if (form.getXmfl() != null && !form.getXmfl().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.xmfl='" + form.getXmfl() + "'";
      }
      if (form.getYsqz() != null && !form.getYsqz().equals("")) {
        if (form.getYsqz().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz is null";
        } else if (form.getYsqz().indexOf("@") > -1) {
          String[] ysqzs = form.getYsqz().split("@");
          if (ysqzs.length > 0) {
            sql_condition = String.valueOf(sql_condition) + " and (";
            for (int i = 0; i < ysqzs.length; i++) {
              if (!ysqzs[i].equals("")) {
                String[] strs = ysqzs[i].split("[(]");
                String[] strs1 = strs[1].split("[)]");
                String gonghao = strs1[0];
                if (i == 0) {
                  if (gonghao.equals("null")) {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz is null";
                  } else {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz='" + gonghao + "'";
                  }
                } else if (gonghao.equals("null")) {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz is null";
                } else {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz='" + gonghao + "'";
                }
              }
            }
            sql_condition = String.valueOf(sql_condition) + ")";
          }
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz='" + form.getYsqz() + "'";
        }
      }
      if (form.getYs_xingming() != null && !form.getYs_xingming().equals("")) {
        if (form.getYs_xingming().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming is null";
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming='" + form.getYs_xingming() + "'";
        }
      }
    } 
    String mainSql = QgUtil.getQgtjMainSql(realPath);
    mainSql = String.valueOf(mainSql) + sql_condition;
    String sql_head = "select distinct z.ysqz,z.ys_xingming ";
    String sql_body = "from (" + mainSql + ") z";
    String sql_finally = String.valueOf(sql_head) + sql_body;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_finally);
    List<Object[]> list = sQLQuery.list();
    if (list != null) {
      list_map = new ArrayList<Map<String, String>>();
      for (int i = 0; i < list.size(); i++) {
        Object[] objs = list.get(i);
        if (objs.length == 2) {
          Map<String, String> map = new HashMap<String, String>();
          map.put("gonghao", (objs[0] == null) ? "" : objs[0].toString());
          map.put("xingming", (objs[1] == null) ? "" : objs[1].toString());
          list_map.add(map);
        } 
      } 
    } 
    session.close();
    return list_map;
  }
  
  @Override
  public List<String> getAllJcxm(String realPath, QgtjConditionForm form) {
    List<String> list_str = null;
    Integer count = Integer.valueOf(0);
    String sql_condition = "";
    if (form != null) {
      if (form.getJcxm() != null && !form.getJcxm().equals("")) {
        if (form.getJcxm().indexOf("@") > -1) {
          String[] jcxms = form.getJcxm().split("@");
          if (jcxms.length > 0) {
            sql_condition = String.valueOf(sql_condition) + " and (";
            for (int i = 0; i < jcxms.length; i++) {
              if (!jcxms[i].equals("")) {
                String jcxm = jcxms[i];
                if (i == 0) {
                  sql_condition = String.valueOf(sql_condition) + "t.jcxm='" + jcxm + "'";
                } else {
                  sql_condition = String.valueOf(sql_condition) + " or t.jcxm='" + jcxm + "'";
                }
              }
            }
            sql_condition = String.valueOf(sql_condition) + ")";
          }
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.jcxm='" + form.getJcxm() + "'";
        }
      }
      if (form.getBeginSj() != null && !form.getBeginSj().equals("")) {
        String dStr = getDateStr(form.getBeginSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj>='" + dStr + "'";
      } 
      if (form.getEndSj() != null && !form.getEndSj().equals("")) {
        String dStr = getDateStr(form.getEndSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj<='" + dStr + "'";
      } 
      if (form.getSsfs1() != null && !form.getSsfs1().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs1='" + form.getSsfs1() + "'";
      }
      if (form.getSsfs2() != null && !form.getSsfs2().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs2='" + form.getSsfs2() + "'";
      }
      if (form.getSsfs3() != null && !form.getSsfs3().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs3='" + form.getSsfs3() + "'";
      }
      if (form.getXmfl() != null && !form.getXmfl().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.xmfl='" + form.getXmfl() + "'";
      }
      if (form.getYsqz() != null && !form.getYsqz().equals("")) {
        if (form.getYsqz().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz is null";
        } else if (form.getYsqz().indexOf("@") > -1) {
          String[] ysqzs = form.getYsqz().split("@");
          if (ysqzs.length > 0) {
            sql_condition = String.valueOf(sql_condition) + " and (";
            for (int i = 0; i < ysqzs.length; i++) {
              if (!ysqzs[i].equals("")) {
                String[] strs = ysqzs[i].split("[(]");
                String[] strs1 = strs[1].split("[)]");
                String gonghao = strs1[0];
                if (i == 0) {
                  if (gonghao.equals("null")) {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz is null";
                  } else {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz='" + gonghao + "'";
                  }
                } else if (gonghao.equals("null")) {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz is null";
                } else {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz='" + gonghao + "'";
                }
              }
            }
            sql_condition = String.valueOf(sql_condition) + ")";
          }
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz='" + form.getYsqz() + "'";
        }
      }
      if (form.getYs_xingming() != null && !form.getYs_xingming().equals("")) {
        if (form.getYs_xingming().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming is null";
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming='" + form.getYs_xingming() + "'";
        }
      }
    } 
    String mainSql = QgUtil.getQgtjMainSql(realPath);
    mainSql = String.valueOf(mainSql) + sql_condition;
    String sql_head = "select distinct z.jcxm ";
    String sql_body = "from (" + mainSql + ") z";
    String sql_finally = String.valueOf(sql_head) + sql_body;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_finally);
    List list = sQLQuery.list();
    if (list != null) {
      list_str = new ArrayList<String>();
      for (int i = 0; i < list.size(); i++) {
        String str = list.get(i).toString();
        list_str.add(str);
      } 
    } 
    session.close();
    return list_str;
  }
  
  @Override
  public Integer getCountByTjss(QgtjConditionForm form) {
    Integer count = Integer.valueOf(0);
    String sql_condition = "";
    if (form != null) {
      if (form.getBeginSj() != null && !form.getBeginSj().equals("")) {
        String dStr = getDateStr(form.getBeginSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj>='" + dStr + "'";
      } 
      if (form.getEndSj() != null && !form.getEndSj().equals("")) {
        String dStr = getDateStr(form.getEndSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj<='" + dStr + "'";
      } 
      if (form.getSsfs1() != null && !form.getSsfs1().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs1='" + form.getSsfs1() + "'";
      }
      if (form.getSsfs2() != null && !form.getSsfs2().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs2='" + form.getSsfs2() + "'";
      }
      if (form.getSsfs3() != null && !form.getSsfs3().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs3='" + form.getSsfs3() + "'";
      }
      if (form.getYsqz() != null && !form.getYsqz().equals("")) {
        if (form.getYsqz().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz is null";
        } else if (form.getYsqz().indexOf("@") > -1) {
          String[] ysqzs = form.getYsqz().split("@");
          if (ysqzs.length > 0) {
            sql_condition = String.valueOf(sql_condition) + " and (";
            for (int i = 0; i < ysqzs.length; i++) {
              if (!ysqzs[i].equals("")) {
                String[] strs = ysqzs[i].split("[(]");
                String[] strs1 = strs[1].split("[)]");
                String gonghao = strs1[0];
                if (i == 0) {
                  if (gonghao.equals("null")) {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz is null";
                  } else {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz='" + gonghao + "'";
                  }
                } else if (gonghao.equals("null")) {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz is null";
                } else {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz='" + gonghao + "'";
                }
              }
            }
            sql_condition = String.valueOf(sql_condition) + ")";
          }
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz='" + form.getYsqz() + "'";
        }
      }
      if (form.getYs_xingming() != null && !form.getYs_xingming().equals("")) {
        if (form.getYs_xingming().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming is null";
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming='" + form.getYs_xingming() + "'";
        }
      }
    } 
    String mainSql = getQgtjMainSql();
    mainSql = String.valueOf(mainSql) + sql_condition;
    String sql_head = "select count(z.id) as count ";
    String sql_body = "from (" + mainSql + ") z";
    String sql_finally = String.valueOf(sql_head) + sql_body;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_finally);
    count = Integer.valueOf(Integer.parseInt(sQLQuery.uniqueResult().toString()));
    session.close();
    return count;
  }
  
  @Override
  public List<Map<String, String>> getAllSsYs(QgtjConditionForm form, String biaoshi) {
    List<Map<String, String>> list_map = null;
    Integer count = Integer.valueOf(0);
    String sql_condition = "";
    if (form != null) {
      if (form.getBeginSj() != null && !form.getBeginSj().equals("")) {
        String dStr = getDateStr(form.getBeginSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj>='" + dStr + "'";
      } 
      if (form.getEndSj() != null && !form.getEndSj().equals("")) {
        String dStr = getDateStr(form.getEndSj());
        sql_condition = String.valueOf(sql_condition) + " and t.sj<='" + dStr + "'";
      } 
      if (form.getSsfs1() != null && !form.getSsfs1().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs1='" + form.getSsfs1() + "'";
      }
      if (form.getSsfs2() != null && !form.getSsfs2().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs2='" + form.getSsfs2() + "'";
      }
      if (form.getSsfs3() != null && !form.getSsfs3().equals("")) {
        sql_condition = String.valueOf(sql_condition) + " and t.ssfs3='" + form.getSsfs3() + "'";
      }
      if (form.getYsqz() != null && !form.getYsqz().equals("")) {
        if (form.getYsqz().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz is null";
        } else if (form.getYsqz().indexOf("@") > -1) {
          String[] ysqzs = form.getYsqz().split("@");
          if (ysqzs.length > 0) {
            sql_condition = String.valueOf(sql_condition) + " and (";
            for (int i = 0; i < ysqzs.length; i++) {
              if (!ysqzs[i].equals("")) {
                String[] strs = ysqzs[i].split("[(]");
                String[] strs1 = strs[1].split("[)]");
                String gonghao = strs1[0];
                if (i == 0) {
                  if (gonghao.equals("null")) {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz is null";
                  } else {
                    sql_condition = String.valueOf(sql_condition) + "t.ysqz='" + gonghao + "'";
                  }
                } else if (gonghao.equals("null")) {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz is null";
                } else {
                  sql_condition = String.valueOf(sql_condition) + " or t.ysqz='" + gonghao + "'";
                }
              }
            }
            sql_condition = String.valueOf(sql_condition) + ")";
          }
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ysqz='" + form.getYsqz() + "'";
        }
      }
      if (form.getYs_xingming() != null && !form.getYs_xingming().equals("")) {
        if (form.getYs_xingming().equals("null")) {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming is null";
        } else {
          sql_condition = String.valueOf(sql_condition) + " and t.ys_xingming='" + form.getYs_xingming() + "'";
        }
      }
    } 
    String mainSql = "";
    if (biaoshi.equals("'ssys'")) {
      mainSql = getQgtjMainSql();
    } else if (biaoshi.equals("'ptjs'")) {
      mainSql = getQgtjMainSql_ptjs();
    } else if (biaoshi.equals("'pths'")) {
      mainSql = getQgtjMainSql_pths();
    } 
    mainSql = String.valueOf(mainSql) + sql_condition;
    String sql_head = "select distinct z.ysqz,z.ys_xingming ";
    String sql_body = "from (" + mainSql + ") z";
    String sql_finally = String.valueOf(sql_head) + sql_body;
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql_finally);
    List<Object[]> list = sQLQuery.list();
    if (list != null) {
      list_map = new ArrayList<Map<String, String>>();
      for (int i = 0; i < list.size(); i++) {
        Object[] objs = list.get(i);
        if (objs.length == 2) {
          Map<String, String> map = new HashMap<String, String>();
          map.put("gonghao", (objs[0] == null) ? "" : objs[0].toString());
          map.put("xingming", (objs[1] == null) ? "" : objs[1].toString());
          list_map.add(map);
        } 
      } 
    } 
    session.close();
    return list_map;
  }
  
  public String getQgtjMainSql() {
    String main_sql = "select t.id,t.blh,t.binglinumber,t.xingming,t.xingbie,t.shouji,t.ssfy,t.yb,t.ssfs1,t.ssfs2,t.ssfs3,t.sj,t.ysqz,t.ys_xingming,t.sfzh,t.shengri,t.age,t.lc_id from (select c.id,c.blh,c.binglinumber,c.xingming,c.xingbie,c.shouji,c.ssfy,c.yb,c.ssfs1,c.ssfs2,c.ssfs3,c.sj,c.ys_gonghao as ysqz,y.xingming as ys_xingming,c.sfzh,c.shengri,c.age,c.lc_id from ( select q.id,q.blh,q.binglinumber,h.xingming,(case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, q.ssfy,q.yb,q.ssfs1,q.ssfs2,q.ssfs3,q.sj,q.ys_gonghao,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id from ( (select s.id,s.blh,b.binglinumber,b.ssfy,(select '右眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_r as sj,s.ssys_r as ys_gonghao,l.id as lc_id from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,(select '左眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_l as sj,s.ssys_l as ys_gonghao,l.id as lc_id from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,(case s.yanbie when 'r' then '右眼' when 'l' then '左眼' else '' end) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq as sj,s.zdys as ys_gonghao,l.id as lc_id from qg_jt_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id  and l.ssfs1='晶体植入') union (select s.id,s.blh,b.binglinumber,b.ssfy,(select '右眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_r as sj,s.ssys_r as ys_gonghao,l.id as lc_id from qg_er_ssjl s,qg_bl_er b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='儿童屈光' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,(select '左眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_l as sj,s.ssys_l as ys_gonghao,l.id as lc_id from qg_er_ssjl s,qg_bl_er b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='儿童屈光' ) ) q,huanzhexinxi h where q.blh = h.binglihao order by q.sj desc) c left join yuangong y on c.ys_gonghao = y.gonghao ) t where 1=1 ";
    return main_sql;
  }
  
  public String getQgtjMainSql_ptjs() {
    String main_sql = "select t.id,t.blh,t.binglinumber,t.xingming,t.xingbie,t.shouji,t.ssfy,t.yb,t.ssfs1,t.ssfs2,t.ssfs3,t.sj,t.ysqz,t.ys_xingming,t.sfzh,t.shengri,t.age,t.lc_id from (select c.id,c.blh,c.binglinumber,c.xingming,c.xingbie,c.shouji,c.ssfy,c.yb,c.ssfs1,c.ssfs2,c.ssfs3,c.sj,c.ys_gonghao as ysqz,y.xingming as ys_xingming,c.sfzh,c.shengri,c.age,c.lc_id from ( select q.id,q.blh,q.binglinumber,h.xingming,(case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, q.ssfy,q.yb,q.ssfs1,q.ssfs2,q.ssfs3,q.sj,q.ys_gonghao,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id from ( (select s.id,s.blh,b.binglinumber,b.ssfy,(select '右眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_r as sj,s.ptjs_r as ys_gonghao,l.id as lc_id from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,(select '左眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_l as sj,s.ptjs_l as ys_gonghao,l.id as lc_id from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,(case s.yanbie when 'r' then '右眼' when 'l' then '左眼' else '' end) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq as sj,s.zsys as ys_gonghao,l.id as lc_id from qg_jt_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id  and l.ssfs1='晶体植入') ) q,huanzhexinxi h where q.blh = h.binglihao order by q.sj desc) c left join yuangong y on c.ys_gonghao = y.gonghao ) t where 1=1 ";
    return main_sql;
  }
  
  public String getQgtjMainSql_pths() {
    String main_sql = "select t.id,t.blh,t.binglinumber,t.xingming,t.xingbie,t.shouji,t.ssfy,t.yb,t.ssfs1,t.ssfs2,t.ssfs3,t.sj,t.ysqz,t.ys_xingming,t.sfzh,t.shengri,t.age,t.lc_id from (select c.id,c.blh,c.binglinumber,c.xingming,c.xingbie,c.shouji,c.ssfy,c.yb,c.ssfs1,c.ssfs2,c.ssfs3,c.sj,c.ys_gonghao as ysqz,y.xingming as ys_xingming,c.sfzh,c.shengri,c.age,c.lc_id from ( select q.id,q.blh,q.binglinumber,h.xingming,(case h.xingbie when 1 then '男' when 0 then '女' else ''end) as xingbie, (case h.shouji when null then (case h.dianhua when null then (case h.hzlxrdh when null then (case h.dwdh when null then '' else h.dwdh end) else h.hzlxrdh end) else h.dianhua end) else h.shouji end) as shouji, q.ssfy,q.yb,q.ssfs1,q.ssfs2,q.ssfs3,q.sj,q.ys_gonghao,h.sfzh, h.shengri, floor(months_between(sysdate,h.shengri)/12) as age, q.lc_id from ( (select s.id,s.blh,b.binglinumber,b.ssfy,(select '右眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_r as sj,s.pths_r as ys_gonghao,l.id as lc_id from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,(select '左眼' from dual) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq_l as sj,s.pths_l as ys_gonghao,l.id as lc_id from qg_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id and l.ssfs1='准分子' ) union (select s.id,s.blh,b.binglinumber,b.ssfy,(case s.yanbie when 'r' then '右眼' when 'l' then '左眼' else '' end) as yb,l.ssfs1,l.ssfs2,l.ssfs3,s.ssrq as sj,s.hs as ys_gonghao,l.id as lc_id from qg_jt_ssjl s,qg_bl b,qg_lc l where s.lc_id = l.id and l.bl_id = b.id  and l.ssfs1='晶体植入') ) q,huanzhexinxi h where q.blh = h.binglihao order by q.sj desc) c left join yuangong y on c.ys_gonghao = y.gonghao ) t where 1=1 ";
    return main_sql;
  }
  
  @Override
  public QgJtssjl getJtssjlByLc_id(Long lc_id, String yanbie) {
    String hql = "from QgJtssjl where lc_id=" + lc_id + " order by id desc";
    List<QgJtssjl> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public String getBingliNumber() {
    Calendar cal = Calendar.getInstance();
    int year = cal.get(1);
    cal.set(year, 0, 1, 0, 0, 0);
    String hql0 = "select count(*) from Qgbl where jzrq>=?";
    String hql1 = "select count(*) from QgblEr where jzrq>=?";
    String numberStr = (new StringBuilder(String.valueOf(count(hql0, new Object[] { cal.getTime() }) + count(hql1, new Object[] { cal.getTime() }) + 1))).toString();
    while (5 - numberStr.length() > 0) {
      numberStr = "0" + numberStr;
    }
    int number = Integer.parseInt(String.valueOf(year) + numberStr);
    while (bingliNumberExists((new StringBuilder(String.valueOf(number))).toString())) {
      number++;
    }
    return (new StringBuilder(String.valueOf(number))).toString();
  }
  
  @Override
  public boolean bingliNumberExists(String bingliNumber) {
    String hql0 = "select count(*) from Qgbl where bingliNumber=?";
    String hql1 = "select count(*) from QgblEr where bingliNumber=?";
    if (count(hql0, new Object[] { bingliNumber }) > 0 && count(hql1, new Object[] { bingliNumber }) > 0) {
      return true;
    }
    return false;
  }
}
