package cn.com.oims.dao.impl;

import cn.com.oims.dao.IManageItemDao;
import cn.com.oims.dao.pojo.Manageitem;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class ManageItemDaoImpl extends BaseDaoImpl implements IManageItemDao {
  private String clazzName = Manageitem.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Manageitem.class);
  }
  
  public int counts() {
    int i = ((Integer)this.hibernateTemplate.findByCriteria(getDC()
        .setProjection(Projections.rowCount())).get(0)).intValue();
    return i;
  }
  
  public List<Manageitem> findAllManageItem4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), 
        p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  public List<Manageitem> findAllManageItem() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable saveManageItem(Manageitem o) {
    return this.hibernateTemplate.save(o);
  }
  
  public void delManageItem(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdateManageItem(Manageitem o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public Manageitem findManageItemById(Serializable id) {
    return (Manageitem)this.hibernateTemplate.get(Manageitem.class, id);
  }
  
  public void updateManageItem(Manageitem manageitem) {
    this.hibernateTemplate.update(manageitem);
  }
  
  public List<Manageitem> findManageitemListByCategoryId(Integer categoryId) {
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("categoryId", categoryId)));
  }
  
  public Manageitem getUserConfState(boolean state, int categoryId) {
    List<Manageitem> list = this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Restrictions.eq("state", Boolean.valueOf(state))).add((Criterion)Restrictions.eq("categoryId", Integer.valueOf(categoryId))));
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  public List<Manageitem> findManageitemListNotIdByCategoryId(boolean state, Long id, Integer categoryId) {
    String hql = "from Manageitem where id not in (" + id + ") and categoryId=" + categoryId;
    return this.hibernateTemplate.find(hql);
  }
}
