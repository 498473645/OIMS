package cn.com.oims.dao.impl;

import cn.com.oims.dao.IRoleDao;
import cn.com.oims.dao.pojo.Role;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class RoleDaoImpl extends BaseDaoImpl implements IRoleDao {
  private String clazzName = Role.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Role.class);
  }
  
  public int countsOfRole() {
    Long count = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return count.intValue();
  }
  
  public List<Role> findRolesByPage(Page page) {
    page.setRowsCount(Integer.valueOf(countsOfRole()));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC(), page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public List<Role> findAllRoles() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public void deleteRoleById(Serializable id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public Serializable saveRole(Role role) {
    return this.hibernateTemplate.save(role);
  }
  
  public void saveOrUpdateRole(Role role) {
    this.hibernateTemplate.saveOrUpdate(role);
  }
  
  public void updateRole(Role role) {
    this.hibernateTemplate.update(role);
  }
  
  public Role findRoleById(Serializable id) {
    return (Role)this.hibernateTemplate.get(Role.class, id);
  }
}
