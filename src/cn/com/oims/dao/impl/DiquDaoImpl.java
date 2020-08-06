package cn.com.oims.dao.impl;

import cn.com.oims.dao.IDiquDao;
import cn.com.oims.dao.pojo.Diqu;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class DiquDaoImpl extends BaseDaoImpl implements IDiquDao {

  public void save(Diqu dq) {
    this.hibernateTemplate.save(dq);
  }
  
  public void update(Diqu dq) {
    this.hibernateTemplate.update(dq);
  }
  
  public void del(Diqu dq) {
    this.hibernateTemplate.delete(dq);
  }
  
  public List<Diqu> findAll() {
    return this.hibernateTemplate.findByCriteria(DetachedCriteria.forClass(Diqu.class));
  }
  
  public Diqu findById(Serializable id) {
    return (Diqu)this.hibernateTemplate.get(Diqu.class, id);
  }
  
  public List<Diqu> findDiqus(Integer fatherId) {
    if (fatherId == null)
      return null; 
    return this.hibernateTemplate.findByCriteria(DetachedCriteria.forClass(Diqu.class).add((Criterion)Restrictions.eq("pid", fatherId)));
  }
  
  public String findChildDiquIDS(String name) {
    String hql = "select id from Diqu d where d.name like ?";
    List<Integer> list = this.hibernateTemplate.find(hql, "%" + name + "%");
    StringBuffer sb = new StringBuffer();
    int i = 0;
    for (Integer id : list) {
      if (i > 0)
        sb.append(","); 
      String ids = findIds("Diqu", "pid", id);
      if (ids == null || ids.isEmpty()) {
        hebing(sb, id+"");
        continue;
      } 
      hebing(sb, ids);
    } 
    return sb.toString();
  }
  
  private void hebing(StringBuffer sb, String ids) {
    String[] id = ids.split(",");
    String[] target = sb.toString().split(",");
    byte b;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = id).length, b = 0; b < i; ) {
      String str = arrayOfString1[b];
      boolean t = false;
      byte b1;
      int j;
      String[] arrayOfString;
      for (j = (arrayOfString = target).length, b1 = 0; b1 < j; ) {
        String n = arrayOfString[b1];
        if (str.equals(n)) {
          t = true;
          break;
        } 
        b1++;
      } 
      if (!t) {
        if (sb.length() > 0)
          sb.append(","); 
        sb.append(str);
      } 
      b++;
    } 
  }
}
