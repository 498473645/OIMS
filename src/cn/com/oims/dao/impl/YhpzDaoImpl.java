package cn.com.oims.dao.impl;

import cn.com.oims.dao.IYhpzDao;
import cn.com.oims.dao.pojo.Yhpz;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class YhpzDaoImpl extends BaseDaoImpl implements IYhpzDao {
  private String clazzName = Yhpz.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Yhpz.class);
  }
  
  public int countsOfYhpz() {
    Long l = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  public List<Yhpz> findYhpzsByPage(Page page) {
    page.setRowsCount(Integer.valueOf(countsOfYhpz()));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC(), page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public List<Yhpz> findAllYhpzs() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public void deleteYhpzById(Serializable id) {
    Yhpz yhpz = findYhpzById(id);
    this.hibernateTemplate.delete(yhpz);
  }
  
  public Serializable saveYhpz(Yhpz yhpz) {
    return this.hibernateTemplate.save(yhpz);
  }
  
  public void saveOrUpdateYhpz(Yhpz yhpz) {
    this.hibernateTemplate.saveOrUpdate(yhpz);
  }
  
  public void updateYhpz(Yhpz yhpz) {
    this.hibernateTemplate.update(yhpz);
  }
  
  public Yhpz findYhpzById(Serializable id) {
    return (Yhpz)this.hibernateTemplate.get(Yhpz.class, id);
  }
}
