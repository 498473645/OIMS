package cn.com.oims.dao.impl;

import cn.com.oims.dao.IDanWeiDao;
import cn.com.oims.dao.pojo.DanWei;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class DanWeiDaoImpl extends BaseDaoImpl implements IDanWeiDao {
  private String clazzName = DanWei.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(DanWei.class);
  }
  
  public int counts() {
    Long i = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  public List<DanWei> findAllDanWei4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    String hql = " select new map(d.id as id , d.dwmc as dwmc ,d.dianhua as dianhua ,d.dizhi as dizhi, d.youbian as youbian, d.lianxiren as lianxiren , c.category as danweijibie) from DanWei as d,Category as c where 1=1 and d.danweijibie = c.id order by  d.id desc ";
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  public List<DanWei> findAllDanWei() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable saveDanWei(DanWei danwei) {
    return this.hibernateTemplate.save(danwei);
  }
  
  public void delDanWei(Serializable id) {
    String sql = "delete from  " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdateDanWei(DanWei o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public DanWei findDanWeiById(Serializable id) {
    return (DanWei)this.hibernateTemplate.get(DanWei.class, id);
  }
  
  public void updateDanWei(DanWei danwei) {
    this.hibernateTemplate.update(danwei);
  }
}
