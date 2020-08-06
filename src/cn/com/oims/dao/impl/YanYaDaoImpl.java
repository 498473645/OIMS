package cn.com.oims.dao.impl;

import cn.com.oims.dao.IYanYaDao;
import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class YanYaDaoImpl extends BaseDaoImpl implements IYanYaDao {
  private String clazzName = YanYa.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(YanYa.class);
  }
  
  public int counts() {
    Long i = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  public List<YanYa> findAllYanYa4Page(Page p, HzXxSearchForm hzxx) {
    return null;
  }
  
  public List<YanYa> findAllYanYa() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable saveYanYa(YanYa o) {
    return this.hibernateTemplate.save(o);
  }
  
  public void delYanYa(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdateYanYa(YanYa o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public YanYa findYanYaById(Serializable id) {
    String hql = "from YanYa as s  where  s.jcd_id=" + id;
    List<YanYa> l = this.hibernateTemplate.find(hql);
    return (l.size() > 0) ? l.get(0) : null;
  }
  
  public void updateYanYa(YanYa o) {
    this.hibernateTemplate.update(o);
  }
  
  public List<YanYa> getYanYaListByHzid(Long hzid) {
    return this.hibernateTemplate.findByCriteria(getDC().add(
          (Criterion)Restrictions.eq("huanzhe_id", hzid)));
  }
  
  public List<YanYa> selectYanYasByYanYa(YanYa yanya) {
    List<YanYa> list = this.hibernateTemplate.findByCriteria(getDC().add(
          (Criterion)Restrictions.eq("huanzhe_id", yanya.getHuanzhe_id())));
    return list;
  }
  
  public YanYa getYanYaByJiuzhenId(Long jiuzhenId) {
    List<YanYa> list = this.hibernateTemplate.find("from YanYa y where jiuzhen_Id=" + jiuzhenId + " order by ycsj desc");
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  public YanYa getYanYaByHzId(Long hzId) {
    List<YanYa> list = this.hibernateTemplate.find("from YanYa y where huanzhe_id=" + hzId + " order by ycsj desc");
    return (list.size() > 0) ? list.get(0) : null;
  }
}
