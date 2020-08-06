package cn.com.oims.dao.impl;

import cn.com.oims.dao.IOutpTreatRecDao;
import cn.com.oims.dao.pojo.OutpTreatRec;
import com.codesnet.common.MultiUtils;
import java.util.Date;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class OutpTreatRecDaoImpl extends BaseDaoImpl implements IOutpTreatRecDao {
  private Class<OutpTreatRec> clz = OutpTreatRec.class;
  
  public List<OutpTreatRec> getOutpTreatRecs(Date visitDate, String visitNo) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.eq("visit_date", visitDate));
    dc.add((Criterion)Restrictions.eq("visit_no", visitNo));
    return this.hibernateTemplate.findByCriteria(dc);
  }
  
  public List<OutpTreatRec> getOutpTreatRecs(Date visitDate, String visitNo, Integer category_id) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    Date startTime = MultiUtils.getStartTimeOfDay();
    Date endTime = MultiUtils.getEndTimeOfDay();
    dc.add(Restrictions.between("visit_date", startTime, endTime));
    dc.add((Criterion)Restrictions.eq("visit_no", visitNo));
    dc.add((Criterion)Restrictions.eq("category_id", category_id));
    dc.addOrder(Order.asc("id"));
    return this.hibernateTemplate.findByCriteria(dc);
  }
  
  public void save(OutpTreatRec outpTreatRec) {
    this.hibernateTemplate.save(outpTreatRec);
  }
  
  public void delete(OutpTreatRec outpTreatRec) {
    this.hibernateTemplate.delete(outpTreatRec);
  }
  
  public OutpTreatRec getOutpTreatRec(Long id) {
    return (OutpTreatRec)this.hibernateTemplate.get(OutpTreatRec.class, id);
  }
  
  public List<OutpTreatRec> getOutpTreatRecs(Long item_group, Integer category_id) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.eq("item_group", item_group));
    dc.add((Criterion)Restrictions.eq("category_id", category_id));
    return this.hibernateTemplate.findByCriteria(dc);
  }
}
