package cn.com.oims.dao.impl;

import cn.com.oims.dao.IOutpOrdersDao;
import cn.com.oims.dao.pojo.OutpOrders;
import com.codesnet.common.MultiUtils;
import java.util.Date;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class OutpOrdersDaoImpl extends BaseDaoImpl implements IOutpOrdersDao {
  private Class<OutpOrders> clz = OutpOrders.class;
  
  public void save(Object entity) {
    this.hibernateTemplate.save(entity);
  }
  
  public void saveOrUpdate(Object entity) {
    this.hibernateTemplate.saveOrUpdate(entity);
  }
  
  public void delete(Object entity) {
    this.hibernateTemplate.delete(entity);
  }
  
  public List<OutpOrders> getOutpOrdersByPatient(Date visitDate, String visitNo) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    dc.add(Restrictions.between("visitDate", startTime, endTime));
    dc.add((Criterion)Restrictions.eq("visitNo", visitNo));
    return this.hibernateTemplate.findByCriteria(dc);
  }
}
