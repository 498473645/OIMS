package cn.com.oims.dao.impl;

import cn.com.oims.dao.IJcxmFenleiDao;
import cn.com.oims.dao.pojo.JcxmFenlei;
import cn.com.oims.dao.pojo.YuYan;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Component;

@Component
public class JcxmFenleiDaoImpl extends BaseDaoImpl implements IJcxmFenleiDao {
  private String clazzName = JcxmFenlei.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(YuYan.class);
  }
  
  public Serializable saveJcxmFenlei(JcxmFenlei jcxmfenlei) {
    return this.hibernateTemplate.save(jcxmfenlei);
  }
  
  public void deleteJcxmFenlei(JcxmFenlei jcxmfenlei) {
    String hql = "delete JcxmFenlei as jcxmfenlei where jcxmfenlei.jcxmId=" + jcxmfenlei.getJcxmId();
    executeUpdate(hql);
  }
  
  public List findJcxmFenleisByJcxmId(Integer jcxmId) {
    String hql = "select new map(jcxmfenlei.jcxmId as jcxmId,jcxmfenlei.jbflId as jbflId,jcxmfenlei.xuhao as xunhao) from JcxmFenlei as jcxmfenlei where jcxmfenlei.jcxmId=" + jcxmId;
    return this.hibernateTemplate.find(hql);
  }
  
  public List<JcxmFenlei> findJcxmFenleisByJcxmFenlei(JcxmFenlei jcxmfenlei) {
    String hql = "from JcxmFenlei as jcxmfenlei where 1=1";
    if (jcxmfenlei.getJbflId() != null)
      hql = String.valueOf(hql) + " and jcxmfenlei.jbflId=" + jcxmfenlei.getJbflId(); 
    return this.hibernateTemplate.find(hql);
  }
}
