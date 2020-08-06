package cn.com.oims.dao.impl;

import cn.com.oims.dao.IUserDao;
import cn.com.oims.dao.pojo.User;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

@Component
public class UserDaoImpl extends BaseDaoImpl implements IUserDao {
  private String clazzName = User.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(User.class);
  }
  
  @Override
  public int countsOfUser() {
    Long l = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  @Override
  public List<User> findUsersByPage(Page page) {
    page.setRowsCount(Integer.valueOf(countsOfUser()));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC(), 
        page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<User> findAllUsers() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public void deleteUserById(Serializable id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public void deleteUser(User u) {
    this.hibernateTemplate.delete(u);
  }
  
  @Override
  public Serializable saveUser(User user) {
    return this.hibernateTemplate.save(user);
  }
  
  @Override
  public void saveOrUpdateUser(User user) {
    this.hibernateTemplate.saveOrUpdate(user);
  }
  
  @Override
  public void updateUser(User user) {
    this.hibernateTemplate.update(user);
  }
  
  @Override
  public void updateUserByGonghao(User user) {
    String hql = "update User set uid='" + user.getUid() + "',email='" + 
      user.getEmail() + "',jiaose='" + user.getJiaose() + 
      "' where gonghao ='" + user.getGonghao() + "'";
    executeUpdate(hql);
  }
  
  @Override
  public User findUserById(Serializable id) {
    return (User)this.hibernateTemplate.get(User.class, id);
  }
  
  @Override
  public User findQiYongUserById(Serializable id) {
    List<User> list = this.hibernateTemplate.findByCriteria(getDC().add(
          (Criterion)Restrictions.eq("uid", id))
        .add((Criterion)Restrictions.eq("qiyong", Boolean.valueOf(true))));
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public User findUserByGh(String gonghao) {
    User user = null;
    List<User> list = this.hibernateTemplate.findByCriteria(getDC().add(
          (Criterion)Restrictions.eq("gonghao", gonghao)));
    if (list.size() > 0) {
      user = list.get(0);
    }
    return user;
  }
  
  @Override
  public User findQiYongUserByGh(String gonghao) {
    List<User> list = this.hibernateTemplate.findByCriteria(getDC().add(
          (Criterion)Restrictions.eq("gonghao", gonghao)).add(
          (Criterion)Restrictions.eq("qiyong", Boolean.valueOf(true))));
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public List<Map<String, Object>> findAllUserByPage(Page page) {
    String factors = page.getFactor();
    String search = null;
    Integer qiyongflag = null;
    if (factors != null) {
      search = factors.split(",")[0];
      qiyongflag = Integer.valueOf(Integer.parseInt(factors.split(",")[1]));
    } 
    String hql_count = "select count(u.id) from User as u , Role as r ";
    String hql_map = "select new map(u.uid as id, u.email as email, u.qiyong as qiyong , r.id as jsid, r.jiaose as jiaoseName, u.gonghao as gonghao, (select yg.xingming from YuanGong yg where yg.gonghao = u.gonghao) as xingming) from User as u , Role as r ";
    String strWhere = " where 1=1 ";
    if (search != null && !"null".equals(search)) {
      strWhere = String.valueOf(strWhere) + " and (u.gonghao like '%" + search +
        "%' or u.uid like '%" + search + "%') ";
    }
    if (qiyongflag != null) {
      strWhere = String.valueOf(strWhere) + " and u.qiyong=" + qiyongflag;
    }
    strWhere = String.valueOf(strWhere) + " and u.jiaose=r.id ";
    strWhere = String.valueOf(strWhere) + " order by u.uid desc";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<Map<String, Object>> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public List<Map<String, Object>> findAllUser4Page(final Page p, final String key) {
    String chql = "select count(*) from User u ,Role r where u.jiaose=r.id";
    if (key != null && !key.equals("")) {
      chql = String.valueOf(chql) + whereOrAdd(chql) + " (u.gonghao like '%" + key +
        "%' or u.uid like '%" + key + "%') ";
    }
    p.setRowsCount(Integer.valueOf(count(chql)));
    p.init();
    HibernateCallback hc = new HibernateCallback() {
        @Override
        public Object doInHibernate(Session arg0) throws HibernateException, SQLException {
          String hql = "select new map(u.uid as uid,r.jiaose as jiaoseName,u.gonghao as gonghao)  from User u ,Role r where u.jiaose=r.id";
          if (key != null && !"".equals(key)) {
            hql = String.valueOf(hql) + UserDaoImpl.this.whereOrAdd(hql) + " (u.gonghao like '%" + key +
              "%' or u.uid like '%" + key + "%') ";
          }
          p.init();
          return arg0.createQuery(hql).setFirstResult(p.getStartRow().intValue())
            .setMaxResults(p.getPageSize().intValue()).list();
        }
      };
    return this.hibernateTemplate.executeFind(hc);
  }
  
  private String whereOrAdd(String sql) {
    if (sql.toLowerCase().indexOf("where") > 0) {
      return " and ";
    }
    return " where ";
  }
  
  @Override
  public void deleteUserByUid(String uid) {
    String hql = "delete from User u where u.uid = '" + uid + "'";
    executeUpdate(hql);
  }
  
  @Override
  public void deleteUserByIds(Serializable id) {
    String hql = "delete from User u where u.uid in (" + id + ")";
    executeUpdate(hql);
  }
  
  @Override
  public boolean isQuanXianToUser(String gonghao, String qxId) {
    String hql = "select u.uid from User u,Role r where u.jiaose=r.id and u.gonghao='" + 
      gonghao + 
      "' and (u.quanxian like '%," + 
      qxId + 
      "' " + 
      "or u.quanxian like '%," + 
      qxId + 
      ",%' " + 
      "or u.quanxian like '" + 
      qxId + 
      ",%' " + 
      "or u.quanxian like '" + 
      qxId + 
      "' " + 
      "or r.quanxian like '%," + 
      qxId + 
      "' " + 
      "or r.quanxian like '%," + 
      qxId + 
      ",%' " + 
      "or r.quanxian like '" + 
      qxId + 
      ",%' " + 
      "or r.quanxian like '" + qxId + "')";
    List list = this.hibernateTemplate.find(hql);
    return (list.size() > 0);
  }
  
  @Override
  public boolean isExistUserToRoleId(Integer jiaoseId) {
    String hql = "from User u where u.jiaose = " + jiaoseId;
    List list = this.hibernateTemplate.find(hql);
    return (list.size() > 0);
  }
  
  @Override
  public List<User> selectUsersByUser(User user) {
    List<User> list = new ArrayList<User>();
    String hql = "from User user where 1=1 ";
    if (user.getJiaose() != null) {
      hql = String.valueOf(hql) + " and user.jiaose=" + user.getJiaose();
    }
    list = this.hibernateTemplate.find(hql);
    return list;
  }
}
