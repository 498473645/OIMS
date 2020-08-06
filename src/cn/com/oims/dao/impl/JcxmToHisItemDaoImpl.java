package cn.com.oims.dao.impl;

import cn.com.oims.dao.IJcxmToHisItemDao;
import cn.com.oims.dao.pojo.JcxmToHisItem;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class JcxmToHisItemDaoImpl extends BaseDaoImpl implements IJcxmToHisItemDao {
  public List<JcxmToHisItem> getJcxmToHisItem(Integer jcxmId, String eye) {
    StringBuilder hql = new StringBuilder();
    hql.append("from JcxmToHisItem where 1=1 ");
    hql.append("and jcxm_id=").append(jcxmId).append(" ");
    if (eye != null && !"".equals(eye))
      hql.append("and eye='").append(eye).append("'"); 
    return this.hibernateTemplate.find(hql.toString());
  }
  
  public void save(JcxmToHisItem jcxmToHisItem) {
    this.hibernateTemplate.save(jcxmToHisItem);
  }
  
  public List<JcxmToHisItem> getJcxmToHisItem(String jcxmIds) {
    StringBuilder hql = new StringBuilder();
    hql.append("from JcxmToHisItem where 1=1 ");
    hql.append("and jcxm_id in(").append(jcxmIds).append(") ");
    return this.hibernateTemplate.find(hql.toString());
  }
}
