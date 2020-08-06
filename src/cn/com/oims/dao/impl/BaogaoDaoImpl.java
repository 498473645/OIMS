package cn.com.oims.dao.impl;

import cn.com.oims.dao.IBaogaoDao;
import cn.com.oims.dao.pojo.Baogao;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class BaogaoDaoImpl extends BaseDaoImpl implements IBaogaoDao {
  private String clazzName = Baogao.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Baogao.class);
  }
  
  public int counts() {
    Long l = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  public List<Baogao> findAllBaogao4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), p.getStartRow().intValue(), 
        p.getPageSize().intValue());
  }
  
  public List<Baogao> findAllBaogao() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable saveBaogao(Baogao baogao) {
    return this.hibernateTemplate.save(baogao);
  }
  
  public void delBaogao(Serializable id) {
    String sql = "delete from  " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdateBaogao(Baogao o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public Baogao findBaogaoById(Serializable id) {
    return (Baogao)this.hibernateTemplate.get(Baogao.class, id);
  }
  
  public void updateBaogao(Baogao o) {
    this.hibernateTemplate.update(o);
  }
  
  public Baogao findBaogaoByJcdId(Long jcdId) {
    String hql = "from Baogao as baogao where baogao.jcdId=" + jcdId;
    List<Baogao> baogaos = this.hibernateTemplate.find(hql);
    return (baogaos.size() > 0) ? baogaos.get(0) : null;
  }
  
  public void deleteBaogaoByJcdId(Long jcdId) {
    String hql = "delete Baogao as baogao where baogao.jcdId=" + jcdId;
    executeUpdate(hql);
  }
  
  public void deleteBaogaoByBaogao(Baogao baogao) {
    this.hibernateTemplate.delete(baogao);
  }
  
  public void updateBaogaoByBaogao(Baogao baogao) {
    String hql = "update Baogao as baogao set baogao.jcdId=" + 
      baogao.getJcdId();
    if (baogao.getState() != null)
      hql = String.valueOf(hql) + ",baogao.state=" + baogao.getState(); 
    if (baogao.getBgys() != null)
      hql = String.valueOf(hql) + ",baogao.bgys='" + baogao.getBgys() + "'"; 
    if (baogao.getJckj() != null)
      hql = String.valueOf(hql) + ",baogao.jckj='" + baogao.getJckj() + "'"; 
    if (baogao.getJcts() != null)
      hql = String.valueOf(hql) + ",baogao.jcts='" + baogao.getJcts() + "'"; 
    hql = String.valueOf(hql) + " where 1=1 ";
    hql = String.valueOf(hql) + " and baogao.jcdId=" + baogao.getJcdId();
    executeUpdate(hql);
  }
  
  public Baogao findBaogaoByBaogao(Baogao baogao) {
    String hql = "from Baogao as baogao where 1=1 ";
    if (baogao.getJcdId() != null)
      hql = String.valueOf(hql) + " and baogao.jcdId=" + baogao.getJcdId(); 
    if (baogao.getId() != null)
      hql = String.valueOf(hql) + " and baogao.id=" + baogao.getId(); 
    List<Baogao> baogaos = this.hibernateTemplate.find(hql);
    return (baogaos.size() > 0) ? baogaos.get(0) : null;
  }
  
  public List<Baogao> findBaogaosByBaogao(Baogao baogao) {
    return this.hibernateTemplate.findByExample(baogao);
  }
  
  public void deleteBaogaoByBaogao(String className, Long jcdId) {
    String hql = "delete from " + className + " where jcdId= " + jcdId;
    executeUpdate(hql);
  }
}
