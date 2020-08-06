package cn.com.oims.dao.impl;

import cn.com.oims.dao.IShiGuangDao;
import cn.com.oims.dao.pojo.Eyejmspjs;
import cn.com.oims.dao.pojo.Eyeygnew;
import cn.com.oims.dao.pojo.Jiuzhen;
import cn.com.oims.dao.pojo.SgBlfy;
import cn.com.oims.dao.pojo.SgCcdj;
import cn.com.oims.dao.pojo.SgDpjl;
import cn.com.oims.dao.pojo.SgFcjl;
import cn.com.oims.dao.pojo.SgQjd;
import cn.com.oims.dao.pojo.Sgbl;
import cn.com.oims.utils.LxlUtil;
import cn.com.oims.web.form.SgZkjcForm;
import com.codesnet.common.Page;
import java.sql.Clob;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class ShiGuangDaoImpl extends BaseDaoImpl implements IShiGuangDao {
  @Override
  public void saveSgbl(Sgbl sgbl) {
    this.hibernateTemplate.save(sgbl);
  }
  
  @Override
  public void updateSgbl(Sgbl sgbl) {
    this.hibernateTemplate.update(sgbl);
  }
  
  @Override
  public Sgbl getSgblById(Long id) {
    return (Sgbl)this.hibernateTemplate.get(Sgbl.class, id);
  }
  
  @Override
  public List<Sgbl> findSgbl4page(Page page, String blh) {
    String hql_count = " select count(sgbl.id) from Sgbl as sgbl where sgbl.blh=" + blh;
    String hql_map = " from Sgbl as sgbl where sgbl.blh=" + blh + " order by sgbl.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<Sgbl> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveSgCcdj(SgCcdj ccdj) {
    this.hibernateTemplate.save(ccdj);
  }
  
  @Override
  public void updateSgCcdj(SgCcdj ccdj) {
    this.hibernateTemplate.update(ccdj);
  }
  
  @Override
  public SgCcdj getSgCcdjById(Long id) {
    return (SgCcdj)this.hibernateTemplate.get(SgCcdj.class, id);
  }
  
  @Override
  public SgCcdj getSgCcdjByBlbh(Long blbh) {
    String hql = " from SgCcdj as s where s.bl_id=" + blbh;
    List<SgCcdj> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      return list.get(0);
    }
    return null;
  }
  
  @Override
  public List<SgCcdj> findSgCcdj4page(Page page, Long bl_id) {
    String hql_count = " select count(ccdj.id) from SgCcdj as ccdj where ccdj.bl_id=" + bl_id;
    String hql_map = " from SgCcdj as ccdj where ccdj.bl_id=" + bl_id + " order by ccdj.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<SgCcdj> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveSgDpjl(SgDpjl dpjl) {
    this.hibernateTemplate.save(dpjl);
  }
  
  @Override
  public void updateSgDpjl(SgDpjl dpjl) {
    this.hibernateTemplate.update(dpjl);
  }
  
  @Override
  public SgDpjl getSgDpjlById(Long id) {
    return (SgDpjl)this.hibernateTemplate.get(SgDpjl.class, id);
  }
  
  @Override
  public SgDpjl getSgDpjlByBlbh(Long blbh) {
    String hql = " from SgDpjl s where s.bl_id=" + blbh;
    List<SgDpjl> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      return list.get(0);
    }
    return null;
  }
  
  @Override
  public List<SgDpjl> findSgDpjl4page(Page page, Long bl_id) {
    String hql_count = " select count(dpjl.id) from SgDpjl as dpjl where dpjl.bl_id=" + bl_id;
    String hql_map = " from SgDpjl as dpjl where dpjl.bl_id=" + bl_id + " order by dpjl.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<SgDpjl> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveSgQjd(SgQjd qjd) {
    this.hibernateTemplate.save(qjd);
  }
  
  @Override
  public void updateSgQjd(SgQjd qjd) {
    this.hibernateTemplate.update(qjd);
  }
  
  @Override
  public SgQjd getSgQjdById(Long id) {
    return (SgQjd)this.hibernateTemplate.get(SgQjd.class, id);
  }
  
  @Override
  public SgQjd getSgQjdByBlbh(Long blbh) {
    String hql = " from SgQjd s where s.bl_id=" + blbh;
    List<SgQjd> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      return list.get(0);
    }
    return null;
  }
  
  @Override
  public List<SgQjd> findSgQjd4page(Page page, Long bl_id) {
    String hql_count = " select count(qjd.id) from SgQjd as qjd where qjd.bl_id=" + bl_id;
    String hql_map = " from SgQjd as qjd where qjd.bl_id=" + bl_id + " order by qjd.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<SgQjd> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void saveSgFcjl(SgFcjl fcjl) {
    this.hibernateTemplate.save(fcjl);
  }
  
  @Override
  public void updateSgFcjl(SgFcjl fcjl) {
    this.hibernateTemplate.update(fcjl);
  }
  
  @Override
  public SgFcjl getSgFcjlById(Long id) {
    return (SgFcjl)this.hibernateTemplate.get(SgFcjl.class, id);
  }
  
  @Override
  public SgFcjl getSgFcjlByBlbh(Long blbh) {
    String hql = " from SgFcjl s where s.bl_id=" + blbh;
    List<SgFcjl> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      return list.get(0);
    }
    return null;
  }
  
  @Override
  public List<SgFcjl> findSgFcjl4page(Page page, Long bl_id) {
    String hql_count = " select count(fcjl.id) from SgFcjl as fcjl where fcjl.bl_id=" + bl_id;
    String hql_map = " from SgFcjl as fcjl where fcjl.bl_id=" + bl_id + " order by fcjl.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<SgFcjl> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<Sgbl> findSgbl(String blh) {
    String hql = "from Sgbl as s where s.blh = '" + blh + "' order by id desc";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<SgFcjl> findSgFcjlByBlbh(Long bl_id) {
    String hql = "from SgFcjl as s where s.bl_id=" + bl_id + "order by s.id";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public Eyejmspjs getEyejmspjs(Long huanzheId) {
    String sql = "select FLOW_NO,BIANYIXISHU,CHECK_DOC,CLI_DATE,DAXIAO,DOCTOR,JCD_ID,L_AA,L_AVE,L_CD,L_CV,L_MAX,L_MIN,L_NUM,L_SD,MEMO,MIDU,R_AA,R_AVE,R_CD,R_CV,R_MAX,R_MIN,R_NUM,R_SD,REP_DOC,YB from eyejmspjs where jcd_id = (select id from (select id from jcd where jcd.huanzhe_id = " + 
      
      huanzheId + 
      " and jcd.jcxm_ids = 1000021" + 
      " order by id desc)" + 
      " where rownum < 2)";
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql);
    List<Object[]> list = sQLQuery.list();
    Eyejmspjs e = null;
    if (list != null && list.size() != 0) {
      e = new Eyejmspjs();
      Object[] objs = list.get(0);
      Integer len = Integer.valueOf(objs.length);
      if (len.intValue() > 0) {
        e.setFlowNo(Long.valueOf(Long.parseLong((objs[0] == null) ? "0" : objs[0].toString())));
      }
      if (len.intValue() > 1) {
        e.setBianyixishu((objs[1] == null) ? "" : objs[1].toString());
      }
      if (len.intValue() > 2) {
        e.setCheck_doc((objs[2] == null) ? "" : objs[2].toString());
      }
      if (len.intValue() > 3) {
        e.setCli_date(null);
      }
      if (len.intValue() > 4) {
        e.setDaxiao((objs[4] == null) ? "" : objs[4].toString());
      }
      if (len.intValue() > 5) {
        e.setDoctor((objs[5] == null) ? "" : objs[5].toString());
      }
      if (len.intValue() > 6) {
        e.setJcdId(Long.valueOf(Long.parseLong((objs[6] == null) ? "0" : objs[6].toString())));
      }
      if (len.intValue() > 7) {
        e.setL_aa((objs[7] == null) ? "" : objs[7].toString());
      }
      if (len.intValue() > 8) {
        e.setL_ave((objs[8] == null) ? "" : objs[8].toString());
      }
      if (len.intValue() > 9) {
        e.setL_cd((objs[9] == null) ? "" : objs[9].toString());
      }
      if (len.intValue() > 10) {
        e.setL_cv((objs[10] == null) ? "" : objs[10].toString());
      }
      if (len.intValue() > 11) {
        e.setL_max((objs[11] == null) ? "" : objs[11].toString());
      }
      if (len.intValue() > 12) {
        e.setL_min((objs[12] == null) ? "" : objs[12].toString());
      }
      if (len.intValue() > 13) {
        e.setL_num((objs[13] == null) ? "" : objs[13].toString());
      }
      if (len.intValue() > 14) {
        e.setL_sd((objs[14] == null) ? "" : objs[14].toString());
      }
      if (len.intValue() > 15) {
        e.setMemo((objs[15] == null) ? "" : objs[15].toString());
      }
      if (len.intValue() > 16) {
        e.setMidu((objs[16] == null) ? "" : objs[16].toString());
      }
      if (len.intValue() > 17) {
        e.setR_aa((objs[17] == null) ? "" : objs[17].toString());
      }
      if (len.intValue() > 18) {
        e.setR_ave((objs[18] == null) ? "" : objs[18].toString());
      }
      if (len.intValue() > 19) {
        e.setR_cd((objs[19] == null) ? "" : objs[19].toString());
      }
      if (len.intValue() > 20) {
        e.setR_cv((objs[20] == null) ? "" : objs[20].toString());
      }
      if (len.intValue() > 21) {
        e.setR_max((objs[21] == null) ? "" : objs[21].toString());
      }
      if (len.intValue() > 22) {
        e.setR_min((objs[22] == null) ? "" : objs[22].toString());
      }
      if (len.intValue() > 23) {
        e.setR_num((objs[23] == null) ? "" : objs[23].toString());
      }
      if (len.intValue() > 24) {
        e.setR_sd((objs[24] == null) ? "" : objs[24].toString());
      }
      if (len.intValue() > 25) {
        e.setRep_doc((objs[25] == null) ? "" : objs[25].toString());
      }
      if (len.intValue() > 26) {
        e.setYb((objs[26] == null) ? "" : objs[26].toString());
      }
    } 
    session.close();
    return e;
  }
  
  @Override
  public Eyeygnew getEyeygnew(Long huanzheId, Long jcxmId, String kt_xt) {
    String sql = "select flow_no,qj_sp2_r, zj_sp2_r, z_sp2_r, jzsl_sp2_r,qj_sp2_l, zj_sp2_l, z_sp2_l, jzsl_sp2_l, jcd_id, kt_xt from eyeygnew e where e.jcd_id = (select id from (select id from jcd where jcd.huanzhe_id = " + 
      
      huanzheId + 
      " and jcd.jcxm_ids = " + jcxmId + 
      " order by id desc)" + 
      " where rownum < 2)" + 
      " and e.kt_xt = '" + kt_xt + "'";
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql);
    List<Object[]> list = sQLQuery.list();
    Eyeygnew eyeygnew = new Eyeygnew();
    if (list != null && list.size() > 0) {
      Object[] objs = list.get(0);
      Integer len = Integer.valueOf(objs.length);
      if (len.intValue() > 0) {
        eyeygnew.setFlowNo(Long.valueOf(Long.parseLong((objs[0] == null) ? "0" : objs[0].toString())));
      }
      if (len.intValue() > 1) {
        eyeygnew.setQj_sp2_r((objs[1] == null) ? "" : objs[1].toString());
      }
      if (len.intValue() > 2) {
        eyeygnew.setZj_sp2_r((objs[2] == null) ? "" : objs[2].toString());
      }
      if (len.intValue() > 3) {
        eyeygnew.setZ_sp2_r((objs[3] == null) ? "" : objs[3].toString());
      }
      if (len.intValue() > 4) {
        eyeygnew.setJzsl_sp2_r((objs[4] == null) ? "" : objs[4].toString());
      }
      if (len.intValue() > 5) {
        eyeygnew.setQj_sp2_l((objs[5] == null) ? "" : objs[5].toString());
      }
      if (len.intValue() > 6) {
        eyeygnew.setZj_sp2_l((objs[6] == null) ? "" : objs[6].toString());
      }
      if (len.intValue() > 7) {
        eyeygnew.setZ_sp2_l((objs[7] == null) ? "" : objs[7].toString());
      }
      if (len.intValue() > 8) {
        eyeygnew.setJzsl_sp2_l((objs[8] == null) ? "" : objs[8].toString());
      }
      if (len.intValue() > 9) {
        eyeygnew.setJcdId(Long.valueOf(Long.parseLong((objs[9] == null) ? "" : objs[9].toString())));
      }
      if (len.intValue() > 10) {
        eyeygnew.setKt_xt((objs[10] == null) ? "" : objs[10].toString());
      }
    } 
    session.close();
    return eyeygnew;
  }
  
  @Override
  public List<SgZkjcForm> findZkjcByHzId(Long hz_id) {
    String sql = "select j.id,j.category_id,j.jilu, c.category from jzjl j, oims_category c where jiuzhen_id in (select id from jiuzhen where huanzhe_id = " + 
      
      hz_id + ")" + 
      " and j.category_id = c.id" + 
      " and j.category_id in (select id from oims_category where fatherid in (select id from oims_category where fatherid=30002))" + 
      " order by j.category_id, j.id desc";
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql);
    List<SgZkjcForm> listRes = new ArrayList<SgZkjcForm>();
    List<Object[]> list = sQLQuery.list();
    if (list != null && list.size() > 0) {
      for (int i = 0; i < list.size(); i++) {
        Object[] objs = list.get(i);
        if (objs != null) {
          SgZkjcForm sg = new SgZkjcForm();
          Integer len = Integer.valueOf(objs.length);
          if (len.intValue() > 0) {
            sg.setId(Long.valueOf((objs[0] == null) ? 0L : Long.parseLong(objs[0].toString())));
          }
          if (len.intValue() > 1) {
            sg.setCategory_id(Long.valueOf((objs[1] == null) ? 0L : Long.parseLong(objs[1].toString())));
          }
          if (len.intValue() > 2) {
            Clob cc = (Clob)objs[2];
            String jilu = LxlUtil.ClobToString(cc);
            jilu = LxlUtil.removeTag(jilu);
            sg.setJilu(jilu);
          }
          if (len.intValue() > 3) {
            sg.setCategory((objs[3] == null) ? "" : objs[3].toString());
          }
          listRes.add(sg);
        }
      }
    }
    session.close();
    return listRes;
  }
  
  @Override
  public List<SgZkjcForm> findZkjcByJiuzhenId(Long jiuzhenId) {
    String sql = "select j.id,j.category_id,j.jilu, c.category from jzjl j, oims_category c where jiuzhen_id =" + 
      
      jiuzhenId + 
      " and j.category_id = c.id" + 
      " and j.category_id in (select id from oims_category where fatherid in (select id from oims_category where fatherid=30002))" + 
      " order by j.category_id, j.id desc";
    Session session = this.hibernateTemplate.getSessionFactory().openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql);
    List<SgZkjcForm> listRes = new ArrayList<SgZkjcForm>();
    List<Object[]> list = sQLQuery.list();
    if (list != null && list.size() > 0) {
      for (int i = 0; i < list.size(); i++) {
        Object[] objs = list.get(i);
        if (objs != null) {
          SgZkjcForm sg = new SgZkjcForm();
          Integer len = Integer.valueOf(objs.length);
          if (len.intValue() > 0) {
            sg.setId(Long.valueOf((objs[0] == null) ? 0L : Long.parseLong(objs[0].toString())));
          }
          if (len.intValue() > 1) {
            sg.setCategory_id(Long.valueOf((objs[1] == null) ? 0L : Long.parseLong(objs[1].toString())));
          }
          if (len.intValue() > 2) {
            Clob cc = (Clob)objs[2];
            String jilu = LxlUtil.ClobToString(cc);
            jilu = LxlUtil.removeTag(jilu);
            sg.setJilu(jilu);
          }
          if (len.intValue() > 3) {
            sg.setCategory((objs[3] == null) ? "" : objs[3].toString());
          }
          listRes.add(sg);
        }
      }
    }
    session.close();
    return listRes;
  }
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Jiuzhen.class);
  }
  
  @Override
  public List<Jiuzhen> findJiuzheIdByHzId(String hz_id) {
    Long huanzheId = Long.valueOf(Long.parseLong(hz_id));
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("huanzheId", huanzheId)).addOrder(Order.desc("id")));
  }
  
  @Override
  public void saveSgBlfy(SgBlfy blfy) {
    this.hibernateTemplate.save(blfy);
  }
  
  @Override
  public void updateSgBlfy(SgBlfy blfy) {
    this.hibernateTemplate.update(blfy);
  }
  
  @Override
  public SgBlfy getSgBlfyById(Long id) {
    return (SgBlfy)this.hibernateTemplate.get(SgBlfy.class, id);
  }
  
  @Override
  public List<SgBlfy> findSgBlfy4page(Page page, Long bl_id) {
    String hql_count = " select count(blfy.id) from SgBlfy as blfy where blfy.bl_id=" + bl_id;
    String hql_map = " from SgBlfy as blfy where blfy.bl_id=" + bl_id + " order by blfy.id desc";
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<SgBlfy> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<SgBlfy> findSgBlfyByBlbh(Long bl_id) {
    String hql = "from SgBlfy as s where s.bl_id=" + bl_id + "order by s.id";
    return this.hibernateTemplate.find(hql);
  }
}
