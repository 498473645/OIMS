package cn.com.oims.dao.impl;

import cn.com.oims.dao.IFollowedUpDao;
import cn.com.oims.dao.pojo.FollowedUp;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class FollowedUpDaoImpl extends BaseDaoImpl implements IFollowedUpDao {
  private Class<FollowedUp> clz = FollowedUp.class;
  
  public void save(FollowedUp followedUp) {
    this.hibernateTemplate.save(followedUp);
  }
  
  public void update(FollowedUp followedUp) {
    this.hibernateTemplate.update(followedUp);
  }
  
  public FollowedUp getFollowedUpByVisitId(Long visitId) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.eq("visit_id", visitId));
    List<FollowedUp> list = this.hibernateTemplate.findByCriteria(dc);
    if (list != null && list.size() > 0)
      return list.get(0); 
    return null;
  }
}
