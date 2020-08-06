package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.web.form.HuanZheSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

@Component
public class JzjlDaoImpl extends BaseDaoImpl implements IJzjlDao {
  private String clazzName = Jzjl.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Jzjl.class);
  }
  
  @Override
  public int counts() {
    int i = ((Integer)this.hibernateTemplate.findByCriteria(getDC()
        .setProjection(Projections.rowCount())).get(0)).intValue();
    return i;
  }
  
  @Override
  public List<Jzjl> findAllJzjl4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), 
        p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  @Override
  public List<Jzjl> findAllJzjl() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public Serializable saveJzjl(Jzjl o) {
    return this.hibernateTemplate.save(o);
  }
  
  @Override
  public void delJzjl(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public void saveOrUpdateJzjl(Jzjl o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  @Override
  public Jzjl findJzjlById(Serializable id) {
    return (Jzjl)this.hibernateTemplate.get(Jzjl.class, id);
  }
  
  @Override
  public void updateJzjl(Jzjl o) {
    this.hibernateTemplate.update(o);
  }
  
  @Override
  public List<Jzjl> getJzjlListByJiuzhenId(String jiuzhenId) {
    Long jiuzhenid = Long.valueOf(Long.parseLong(jiuzhenId));
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("jiuzhenId", jiuzhenid)));
  }
  
  @Override
  public List<Jzjl> medicalRecords(Page page, Integer categoryId, Long jiuzhenId) {
    int count = ((Integer)this.hibernateTemplate.findByCriteria(getDC()
        .add((Criterion)Restrictions.eq("jiuzhenId", jiuzhenId)).add((Criterion)Restrictions.eq("categoryId", categoryId))
        .setProjection(Projections.rowCount())).get(0)).intValue();
    page.setRowsCount(Integer.valueOf(count));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("jiuzhenId", jiuzhenId)).add((Criterion)Restrictions.eq("categoryId", categoryId)), 
        page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<Jzjl> findJzjlListByCategoryIdAndJiuzhenId(Integer categoryId, Long jiuzhenId) {
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("jiuzhenId", jiuzhenId)).add((Criterion)Restrictions.eq("categoryId", categoryId)));
  }
  
  @Override
  public List<HuanZheXinXi> findTodayHuanZhe(Page page, HuanZheSearchForm searchForm) throws Exception {
    String hqltmpAll = "from HuanZheXinXi h,Jiuzhen jz,Jzjl jzjl where jz.id=jzjl.jiuzhenId and h.id = jz.huanzheId and jz.caozuoTime>:caozuoTimeStart and jz.caozuoTime<:caozuoTimeEnd";
    String hqltmpother = "from HuanZheXinXi h,Jiuzhen jz where h.id = jz.huanzheId and jz.caozuoTime>:caozuoTimeStart and jz.caozuoTime<:caozuoTimeEnd";
    String hqltmp = "";
    if (Utils.strIsNotEmpty(searchForm.getBingZhongId()) || 
      Utils.strIsNotEmpty(searchForm.getBingLiKey())) {
      hqltmp = hqltmpAll;
    } else {
      hqltmp = hqltmpother;
    } 
    Map<String, Object> m = new HashMap<String, Object>(0);
    m.put("caozuoTimeStart", Utils.todayToDateStart());
    m.put("caozuoTimeEnd", Utils.todayToDateEnd());
    hqltmp = queryStr(hqltmp, m, searchForm);
    String hql = "select new map( h.gongfei as gongfei,h.shangbao as shangbao,h.photourl as photourl,h.id as id,h.binglihao as binglihao,h.xingming as xingming,h.xingbie as xingbie,h.yibao as yibao,h.yibaohao as yibaohao,h.shengri as shengri,h.sfzh as sfzh,h.shouji as shouji,h.dianhua as dianhua,h.zcrq as zcrq,h.diqu as diqu,h.gzdw as gzdw,h.dwdz as dwdz,h.jtdz as jtdz,h.dwyb as dwyb,h.dwdh as dwdh,h.youbian as youbian,h.hzlxr as hzlxr,h.hzlxrdh as hzlxrdh,h.laiyuan as laiyuan,h.beizhu as beizhu)" + 
      
      hqltmp + " group by h.id";
    int c = count("select max(h.id) " + hqltmp, m).intValue();
    page.setStartRow(Integer.valueOf((page.getStartRow() == null) ? 0 : page.getStartRow().intValue()));
    page.setRowsCount(Integer.valueOf(c));
    page.init();
    List<HuanZheXinXi> list = getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue(), m);
    return list;
  }
  
  private String queryStr(String hqltmp, Map<String, Object> m, HuanZheSearchForm searchForm) {
    if (Utils.strIsNotEmpty(searchForm.getSearch())) {
      hqltmp = String.valueOf(hqltmp) + " and (h.xingming like '%" + searchForm.getSearch() + "%' or h.binglihao like '%" + searchForm.getSearch() + "%')";
    }
    if (Utils.strIsNotEmpty(searchForm.getXingming())) {
      hqltmp = String.valueOf(hqltmp) + " and h.xingming like '%" + searchForm.getXingming() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getXingbie())) {
      hqltmp = String.valueOf(hqltmp) + " and h.xingbie in (" + searchForm.getXingbie() + ")";
    }
    if (Utils.strIsNotEmpty(searchForm.getDiqu())) {
      hqltmp = String.valueOf(hqltmp) + " and h.diqu like '%" + searchForm.getDiqu() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getSfzh())) {
      hqltmp = String.valueOf(hqltmp) + " and h.sfzh like '" + searchForm.getSfzh() + "%' ";
    }
    if (Utils.strIsNotEmpty(searchForm.getYibao())) {
      hqltmp = String.valueOf(hqltmp) + " and h.yibao in (" + searchForm.getSfzh() + ")";
    }
    if (Utils.strIsNotEmpty(searchForm.getShouji())) {
      hqltmp = String.valueOf(hqltmp) + " and h.shouji like '%" + searchForm.getShouji() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getDianhua())) {
      hqltmp = String.valueOf(hqltmp) + " and h.dianhua like '%" + searchForm.getDianhua() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getHzlxr())) {
      hqltmp = String.valueOf(hqltmp) + " and h.hzlxr like '%" + searchForm.getHzlxr() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getHzlxrdh())) {
      hqltmp = String.valueOf(hqltmp) + " and h.hzlxrdh like '%" + searchForm.getHzlxrdh() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getJtdz())) {
      hqltmp = String.valueOf(hqltmp) + " and h.jtdz like '%" + searchForm.getJtdz() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getDwdh())) {
      hqltmp = String.valueOf(hqltmp) + " and h.dwdh like '%" + searchForm.getDwdh() + "%'";
    }
    if (Utils.strIsNotEmpty(searchForm.getLaiyuan())) {
      hqltmp = String.valueOf(hqltmp) + " and h.laiyuan in (" + searchForm.getLaiyuan() + ")";
    }
    if (Utils.strIsNotEmpty(searchForm.getBingZhongId())) {
      hqltmp = String.valueOf(hqltmp) + " and jzjl.categoryId in (" + searchForm.getBingZhongId() + ")";
    }
    if (Utils.strIsNotEmpty(searchForm.getBingLiKey())) {
      hqltmp = String.valueOf(hqltmp) + " and jzjl.jilu like '%" + searchForm.getBingLiKey() + "%'";
    }
    if (Utils.ObjIsNotNull(searchForm.getShengriStart())) {
      hqltmp = String.valueOf(hqltmp) + " and h.shengri >:shengristart";
      m.put("shengristart", Utils.ageToBirthday(searchForm.getShengriStart().intValue()));
    } 
    if (Utils.ObjIsNotNull(searchForm.getShengriEnd())) {
      hqltmp = String.valueOf(hqltmp) + " and h.shengri <:shengrisend";
      m.put("shengrisend", Utils.ageToBirthday(searchForm.getShengriEnd().intValue()));
    } 
    if (Utils.ObjIsNotNull(searchForm.getZcrqStart())) {
      hqltmp = String.valueOf(hqltmp) + " and h.zcrq >:ZcrqStart";
      m.put("ZcrqStart", Utils.strToDateStart(searchForm.getZcrqStart()));
    } 
    if (Utils.ObjIsNotNull(searchForm.getZcrqEnd())) {
      hqltmp = String.valueOf(hqltmp) + " and h.zcrq <:ZcrqEnd";
      m.put("ZcrqEnd", Utils.strToDateStart(searchForm.getZcrqEnd()));
    } 
    return hqltmp;
  }
  
  private Integer count(final String hql, final Map<String, Object> map) throws Exception {
    HibernateCallback hc = new HibernateCallback() {
        @Override
        public Object doInHibernate(Session session) throws HibernateException, SQLException {
          Query query = session.createQuery(hql);
          if (map.size() > 0) {
            query.setProperties(map);
          }
          return Integer.valueOf(query.list().size());
        }
      };
    return Integer.valueOf(((Integer)this.hibernateTemplate.execute(hc)).intValue());
  }
  
  @Override
  public List<Jzjl> findJzjlByJiuzhenid(long parseLong) {
    String hql = "from Jzjl where jiuzhenId=" + parseLong;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public Jzjl findTgjc(int jiaomood, Long parseLong) {
    String hql = "from Jzjl where categoryId=" + jiaomood + " and jiuzhenId=" + parseLong;
    List<Jzjl> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public Map<String, Object> getLastJzjl(Integer categoryId, Long huanzheId) {
    String hql = "select new map(jl.jilu as jilu,jl.jiuzhenId as jiuzhenId) from Jzjl jl, Jiuzhen jz where jl.jiuzhenId=jz.id and jl.categoryId=" + categoryId + " and jz.huanzheId=" + huanzheId + " order by jl.jlTime desc";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
}
