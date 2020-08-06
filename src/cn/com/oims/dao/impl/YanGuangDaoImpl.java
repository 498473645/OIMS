package cn.com.oims.dao.impl;

import cn.com.oims.dao.IYanGuangDao;
import cn.com.oims.dao.pojo.YanGuang;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class YanGuangDaoImpl extends BaseDaoImpl implements IYanGuangDao {
  private String clazzName = YanGuang.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(YanGuang.class);
  }
  
  public int counts() {
    Long i = (Long) this.hibernateTemplate.findByCriteria(getDC()
        .setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  public List<YanGuang> findAllYanGuang4Page(Page p) {
    String countHql = "select count(*) from Jcd as j  where j.biaoshi in(50,56) and j.jcxmIds = 78";
    p.setRowsCount(Integer.valueOf(count(countHql)));
    p.init();
    String hql = "select new map(j.id as id , j.jcdh as jcdh , j.biaoshi as biaoshi , (select y.od from YanYa as y where y.jcd_id=j.id) as od , (select y.os  from YanYa as y where y.jcd_id=j.id) as os, (select yg.xingming from YuanGong as yg ,YanYa as y  where yg.gonghao=y.jcys   and y.jcd_id=j.id) as jcys, (select y.ycsj from YanYa as y where y.jcd_id=j.id) as ycsj ) from Jcd as j where j.biaoshi in (50,56) and j.jcxmIds=78";
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  public List<YanGuang> findAllYanGuang() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable saveYanGuang(YanGuang o) {
    return this.hibernateTemplate.save(o);
  }
  
  public void delYanGuang(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdateYanGuang(YanGuang o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public YanGuang findYanGuangById(Serializable id) {
    String hql = "from YanGuang as s  where  s.jcdid=" + 
      id;
    List<YanGuang> l = this.hibernateTemplate.find(hql);
    return (l.size() > 0) ? l.get(0) : null;
  }
  
  public void updateYanGuang(YanGuang o) {
    this.hibernateTemplate.update(o);
  }
  
  public List<YanGuang> findYanGuangList(Page p, Serializable id) {
    String countHql = "select count(*) from YanGuang as y  where y.jcdid = " + 
      id;
    p.setRowsCount(Integer.valueOf(count(countHql)));
    p.init();
    String hql = "select new map(y.refRS as rs,y.refLS as ls,y.refRC as rc, y.refLC as lc,y.refRA as ra,y.refLA as la,y.kxd_r as r,y.kxd_l as l) from YanGuang as y where y.jcdid = " + 
      
      id;
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
}
