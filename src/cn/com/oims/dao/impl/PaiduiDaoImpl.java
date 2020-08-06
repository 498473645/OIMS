package cn.com.oims.dao.impl;

import cn.com.oims.dao.IPaiduiDao;
import cn.com.oims.dao.pojo.Paidui;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class PaiduiDaoImpl extends BaseDaoImpl implements IPaiduiDao {
  private String clazzName = Paidui.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Paidui.class);
  }
  
  public int counts() {
    int i = ((Integer)this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0)).intValue();
    return i;
  }
  
  public List<Paidui> findAllPaidui4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), p.getStartRow().intValue(), 
        p.getPageSize().intValue());
  }
  
  public List<Paidui> findAllPaidui() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable savePaidui(Paidui o) {
    return this.hibernateTemplate.save(o);
  }
  
  public void delPaidui(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdatePaidui(Paidui o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public Paidui findPaiduiById(Serializable id) {
    return (Paidui)this.hibernateTemplate.get(Paidui.class, id);
  }
  
  public void updatePaidui(Paidui o) {
    this.hibernateTemplate.update(o);
  }
  
  public boolean isBumenByIdToPaidui(Integer id) {
    String hql = "from Paidui p where p.officeId = " + id;
    List list = this.hibernateTemplate.find(hql);
    return (list.size() > 0);
  }
  
  public int getMaxXuHaoByBumenId(Integer bumenId) {
    String hql = "select Max(xuhao) from Paidui where officeId=" + bumenId;
    List list = this.hibernateTemplate.find(hql);
    int maXuhao = 0;
    if (list.get(0) != null)
      maXuhao = Integer.parseInt(list.get(0).toString()); 
    return maXuhao;
  }
}
