package cn.com.oims.dao.impl;

import cn.com.oims.dao.IOutpPrescDao;
import cn.com.oims.dao.pojo.OutpPresc;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class OutpPrescDaoImpl extends BaseDaoImpl implements IOutpPrescDao {
  private Class<OutpPresc> clz = OutpPresc.class;
  
  @Override
  public void save(Object entity) {
    this.hibernateTemplate.save(entity);
  }
  
  @Override
  public void saveOrUpdate(Object entity) {
    this.hibernateTemplate.saveOrUpdate(entity);
  }
  
  @Override
  public void delete(Object entity) {
    this.hibernateTemplate.delete(entity);
  }
  
  @Override
  public List<OutpPresc> getOutpPrescs(Date visitDate, String visitNo) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.eq("visitDate", visitDate));
    dc.add((Criterion)Restrictions.eq("visitNo", visitNo));
    return this.hibernateTemplate.findByCriteria(dc);
  }
  
  @Override
  public List<OutpPresc> getOutpPrescsByOrderId(Long orderId) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.eq("outpOrdersId", orderId));
    return this.hibernateTemplate.findByCriteria(dc);
  }
  
  @Override
  public Map<String, Object> getPrescInfo(Date visitDate, String visitNo) {
    StringBuilder hql = new StringBuilder();
    hql.append("select new map(count(*) as total,max(prescNo) as num) ");
    hql.append("from ").append(this.clz.getName()).append(" where 1=1 ");
    hql.append("and visitDate=:visitDate");
    hql.append(" and visitNo=").append(visitNo);
    Map<String, Object> map = new HashMap<String, Object>();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date date1 = null;
    try {
      date1 = sdf.parse(visitDate.toString());
    } catch (Exception exception) {}
    map.put("visitDate", date1);
    return (Map)this.findList(hql.toString(), map).get(0);
  }
}
