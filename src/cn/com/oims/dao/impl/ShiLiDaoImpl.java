package cn.com.oims.dao.impl;

import cn.com.oims.dao.IShiLiDao;
import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class ShiLiDaoImpl extends BaseDaoImpl implements IShiLiDao {
  private String clazzName = ShiLi.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(ShiLi.class);
  }
  
  public int counts() {
    Long i = (Long) this.hibernateTemplate.findByCriteria(getDC()
        .setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  public List<ShiLi> findAllShiLi4Page(Page p) {
    String hqlcountsl = "select count(*) from Jcd as j where 1=1 and  j.biaoshi in(50,56) and j.jcxmIds = 49";
    p.setRowsCount(Integer.valueOf(count(hqlcountsl)));
    p.init();
    String hql = "select new map(d.id  as id , d.jcdh as jcdh ,d.biaoshi as biaoshi ,(select h.binglihao from HuanZheXinXi as h where h.id=d.huanzheId) as blh ,(select h.xingming from HuanZheXinXi as h where h.id=d.huanzheId) as xm ,(select h.xingbie from HuanZheXinXi as h where h.id=d.huanzheId) as xb ,(select h.shengri from HuanZheXinXi as h where h.id=d.huanzheId) as sr ,(select s.ll from ShiLi as s where s.jcd_id = d.id ) as ll ,(select s.ljz from ShiLi as s where s.jcd_id = d.id ) as ljz ,(select s.lj from ShiLi as s where s.jcd_id = d.id ) as lj ,(select s.rl from ShiLi as s where s.jcd_id = d.id ) as rl ,(select s.rjz from ShiLi as s where s.jcd_id = d.id ) as rjz ,(select s.rj from ShiLi as s where s.jcd_id = d.id ) as rj ,(select y.xingming from YuanGong as y,ShiLi as s where s.jcys = y.gonghao and s.jcd_id=d.id) as jcys , (select s.jcsj from ShiLi as s where s.jcd_id=d.id) as jcsj  )  from  Jcd as d  where  d.biaoshi in(50,56) and d.jcxmIds = 49";
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  public List<ShiLi> findAllShiLi() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable saveShiLi(ShiLi o) {
    return this.hibernateTemplate.save(o);
  }
  
  public void delShiLi(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdateShiLi(ShiLi o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public ShiLi findShiLiById(Serializable id) {
    return (ShiLi)this.hibernateTemplate.get(ShiLi.class, id);
  }
  
  public void updateShiLi(ShiLi o) {
    this.hibernateTemplate.update(o);
  }
  
  public void updateJcdBiaoShi(Jcd o) {
    String hql = " update Jcd as j set biaoshi = 56 where id=" + o.getId();
    executeUpdate(hql);
  }
  
  public List<Map<String, Object>> findShiLiByJcd(Serializable id) {
    String hql = "select new map(s.ll as ll,s.ljz as ljz,s.lj as lj,s.rl as rl,s.rjz as rjz,s.rj as rj,s.jcd_id as jcd_id,s.id as id,s.huanzhe_id as huanzhe_id,s.jiuzhen_id as jiuzhen_id,s.jcys as jcys,s.jcsj as jcsj)from ShiLi as s  where  s.jcd_id=" + 
      id;
    List<Map<String, Object>> l = null;
    try {
      l = this.hibernateTemplate.find(hql);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return (l.size() > 0) ? l : null;
  }
  
  public List<ShiLi> getShiLiListByHzid(Long hzid) {
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("huanzhe_id", hzid)));
  }
  
  public List findAllShiLi4Page(Page page, HzXxSearchForm hzxx) {
    String factorSql = " and 1=1 ";
    if (hzxx.getSearch() != null && !hzxx.getSearch().isEmpty())
      factorSql = String.valueOf(factorSql) + " and (h.binglihao ='" + hzxx.getSearch() + 
        "' or h.xingming like '%" + hzxx.getSearch() + "%')"; 
    int size = count("select count(*) from HuanZheXinXi as h,ShiLi as s,Jcd as d where h.id=s.huanzhe_id and d.id=s.jcd_id " + 
        factorSql);
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(d.id  as id , d.jcdh as jcdh ,d.biaoshi as biaoshi ,h.binglihao as blh ,h.xingming as xm ,h.xingbie as xb ,h.shengri as sr ,s.ll as ll ,s.ljz as ljz ,s.lj as lj ,s.rl as rl ,s.rjz as rjz ,s.rj as rj ,y.xingming as jcys , s.jcsj as jcsj  )  from HuanZheXinXi as h,ShiLi as s,Jcd as d,YuanGong as y where h.id=s.huanzhe_id and d.id=s.jcd_id and s.jcys = y.gonghao and d.biaoshi in(50,56) and d.jcxmIds = 49 " + 
      
      factorSql;
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List list = getListForPage(hql, startRow, pageSize);
    return list;
  }
  
  public List<ShiLi> findShiLi(Long patientId, Integer max) {
    return this.hibernateTemplate.findByCriteria(DetachedCriteria.forClass(ShiLi.class).add((Criterion)Restrictions.eq("huanzhe_id", patientId)).addOrder(Order.desc("jcsj")), 0, 10);
  }
  
  public Jcd findJcdByJiuzhenId(Long jiuzhen_id) {
    String hql = " from Jcd where jiuzhenId=" + jiuzhen_id + " and jcxmIds='" + '\001' + "'";
    List<Jcd> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  public ShiLi getShiLiByJcdId(Long jcdId) {
    String hql = "from ShiLi where jcd_id=" + jcdId;
    List<ShiLi> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  public ShiLi getShiliByJiuzhenId(Long jiuzhenId) {
    String hql = "from ShiLi where jiuzhen_id=" + jiuzhenId;
    List<ShiLi> list = this.hibernateTemplate.find(String.valueOf(hql) + " order by id desc");
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  public ShiLi getShiliByHzId(Long hzId) {
    String hql = "from ShiLi where huanzhe_id=" + hzId + " order by id desc";
    List<ShiLi> list = this.hibernateTemplate.find(hql);
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
}
