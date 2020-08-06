package cn.com.oims.dao.impl;

import cn.com.oims.dao.IHandleProjectDao;
import cn.com.oims.dao.pojo.HandleProject;
import java.util.Date;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class HandleProjectDaoImpl extends BaseDaoImpl implements IHandleProjectDao {
  private Class<HandleProject> clz = HandleProject.class;
  
  public HandleProject getHandleProject(Integer id) {
    return (HandleProject)this.hibernateTemplate.get(this.clz, id);
  }
  
  public HandleProject getByCodeAndSpecAndUnits(String code, String spec, String units) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.eq("project_code", code));
    dc.add((Criterion)Restrictions.eq("project_spec", spec));
    dc.add((Criterion)Restrictions.eq("project_units", units));
    List<HandleProject> list = this.hibernateTemplate.findByCriteria(dc);
    return (list.size() == 0) ? null : list.get(0);
  }
  
  public List<HandleProject> getAll() {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    return this.hibernateTemplate.findByCriteria(dc);
  }
  
  public List<HandleProject> getValid() {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.or(Restrictions.isNull("stop_date"), 
          (Criterion)Restrictions.ge("stop_date", new Date())));
    return this.hibernateTemplate.findByCriteria(dc);
  }
  
  public List<HandleProject> getInvalid() {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.lt("stop_date", new Date()));
    return this.hibernateTemplate.findByCriteria(dc);
  }
  
  public List<HandleProject> getByPinyin(String pinyin, boolean validable) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.like("input_code", (pinyin == null) ? "" : pinyin.toUpperCase(), MatchMode.ANYWHERE));
    if (validable) {
      dc.add((Criterion)Restrictions.or(Restrictions.isNull("stop_date"), 
            (Criterion)Restrictions.ge("stop_date", new Date())));
    } else {
      dc.add((Criterion)Restrictions.lt("stop_date", new Date()));
    } 
    return this.hibernateTemplate.findByCriteria(dc);
  }
  
  public void save(HandleProject entity) {
    this.hibernateTemplate.save(entity);
  }
  
  public void saveOrUpdate(HandleProject entity) {
    this.hibernateTemplate.saveOrUpdate(entity);
  }
  
  public void update(HandleProject entity) {
    this.hibernateTemplate.update(entity);
  }
}
