package cn.com.oims.dao.impl;

import cn.com.oims.dao.IUserOnlineDao;
import cn.com.oims.dao.pojo.UserOnline;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class UserOnlineDaoImpl extends BaseDaoImpl implements IUserOnlineDao {
  private String clazzName = UserOnline.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(UserOnline.class);
  }
  
  public int countsOfUserOnline() {
    Long l = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  public List<UserOnline> findUserOnlinesByPage(Page page) {
    page.setRowsCount(Integer.valueOf(countsOfUserOnline()));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC(), page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public List<UserOnline> findAllUserOnlines() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public void deleteUserOnlineById(Serializable id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public Serializable saveUserOnline(UserOnline useronline) {
    return this.hibernateTemplate.save(useronline);
  }
  
  public void saveOrUpdateUserOnline(UserOnline useronline) {
    this.hibernateTemplate.saveOrUpdate(useronline);
  }
  
  public void updateUserOnline(UserOnline useronline) {
    this.hibernateTemplate.update(useronline);
  }
  
  public UserOnline findUserOnlineById(Serializable id) {
    return (UserOnline)this.hibernateTemplate.get(UserOnline.class, id);
  }
}
