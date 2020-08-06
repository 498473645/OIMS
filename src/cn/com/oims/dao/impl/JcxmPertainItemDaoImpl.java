package cn.com.oims.dao.impl;

import cn.com.oims.dao.IJcxmPertainItemDao;
import cn.com.oims.dao.pojo.JcxmPertainItem;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class JcxmPertainItemDaoImpl extends BaseDaoImpl implements IJcxmPertainItemDao {
  private Class<JcxmPertainItem> clz = JcxmPertainItem.class;
  
  public List<JcxmPertainItem> getJcxmPertainItemsByJcxmId(Integer jcxmId, Integer category_id) {
    DetachedCriteria dc = DetachedCriteria.forClass(this.clz);
    dc.add((Criterion)Restrictions.eq("jcxm_id", jcxmId));
    dc.add((Criterion)Restrictions.eq("category_id", category_id));
    return this.hibernateTemplate.findByCriteria(dc);
  }
}
