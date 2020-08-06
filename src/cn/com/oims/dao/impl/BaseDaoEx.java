package cn.com.oims.dao.impl;

import com.codesnet.common.Page;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

@Component
public class BaseDaoEx extends BaseDaoImpl {
  public enum IdType {
    Str, NotStr;
  }
  
  protected void delObject(final List idvalue, final String idname, final IdType it, final Class<?> c) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session arg0) throws HibernateException, SQLException {
          String ids = "";
          for (int i = 0; i < idvalue.size(); i++) {
            if (BaseDaoEx.IdType.Str == it) {
              if (i == 0) {
                ids = String.valueOf(ids) + "'" + idvalue.get(i) + "'";
              } else {
                ids = String.valueOf(ids) + ",'" + idvalue.get(i) + "'";
              } 
            } else if (i == 0) {
              ids = String.valueOf(ids) + idvalue.get(i);
            } else {
              ids = String.valueOf(ids) + "," + idvalue.get(i);
            } 
          } 
          String hql = "delete from " + c.getName() + " where " + idname + " in (";
          hql = String.valueOf(hql) + ids;
          hql = String.valueOf(hql) + ")";
          return Integer.valueOf(arg0.createQuery(hql).executeUpdate());
        }
      };
    this.hibernateTemplate.execute(hc);
  }
  
  protected List findObject4Page(Class<?> c, Page p) {
    p.setRowsCount(Integer.valueOf(count("select count(*) from " + c.getName())));
    p.init();
    return this.hibernateTemplate.findByCriteria(DetachedCriteria.forClass(c), p.getStartRow().intValue(), p.getPageSize().intValue());
  }
  
  protected List<Map<String, Object>> findObject4Page(final String mapHql, String countHql, final Page p) {
    if (countHql.indexOf("count") < 0)
      throw new RuntimeException("count Hql 语句有误"); 
    p.setRowsCount(Integer.valueOf(count(countHql)));
    p.init();
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session arg0) throws HibernateException, SQLException {
          return arg0.createQuery(mapHql).setFirstResult(p.getStartRow().intValue()).setMaxResults(p.getPageSize().intValue()).list();
        }
      };
    return this.hibernateTemplate.executeFind(hc);
  }
  
  protected List<Object> findByHql(final String hql) {
    if (hql == null || hql.equals(""))
      throw new RuntimeException("hql 语句有误"); 
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session arg0) throws HibernateException, SQLException {
          return arg0.createQuery(hql).list();
        }
      };
    return this.hibernateTemplate.executeFind(hc);
  }
  
  public void saveObject(Object o) {
    this.hibernateTemplate.save(o);
  }
  
  public void saveOrUpdateObject(Object o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public void updateObject(Object o) {
    this.hibernateTemplate.update(o);
  }
  
  public void delObject(Object o) {
    this.hibernateTemplate.delete(o);
  }
  
  public boolean save(Object entity) {
    boolean flag = false;
    try {
      this.hibernateTemplate.save(entity);
      flag = true;
    } catch (DataAccessException e) {
      e.printStackTrace();
    } 
    return flag;
  }
  
  public boolean update(Object entity) {
    boolean flag = false;
    try {
      this.hibernateTemplate.update(entity);
      flag = true;
    } catch (DataAccessException e) {
      e.printStackTrace();
    } 
    return flag;
  }
  
  public boolean delete(Object entity) {
    boolean flag = false;
    try {
      this.hibernateTemplate.delete(entity);
      flag = true;
    } catch (DataAccessException e) {
      e.printStackTrace();
    } 
    return flag;
  }
  
  public List getlistbyhql(String hql) {
    List list = new ArrayList();
    list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  public List listshow(final String hql, final Object[] obj) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session session) throws HibernateException, SQLException {
          Query query = session.createQuery(hql);
          List list = null;
          if (obj != null && obj.length > 0)
            for (int i = 0; i < obj.length; i++)
              query.setParameter(i, obj[i]);  
          list = query.list();
          return list;
        }
      };
    return this.hibernateTemplate.executeFind(hc);
  }
  
  public List getuniqbyhql(final String hql) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session session) throws HibernateException, SQLException {
          Query query = session.createQuery(hql);
          List list = null;
          list = query.list();
          return list;
        }
      };
    return (List)this.hibernateTemplate.execute(hc);
  }
  
  public Object getuniqbyhql(final String hql, final String[] parms) {
    Object o = this.hibernateTemplate.execute(new HibernateCallback() {
          public Object doInHibernate(Session session) throws HibernateException, SQLException {
            Query query = session.createQuery(hql);
            if (parms != null)
              for (int i = 0; i < parms.length; i++)
                query.setString(i, parms[i]);  
            return query.uniqueResult();
          }
        });
    return o;
  }
  
  public int exeupdatehql(final String hql) {
    int row = 0;
    row = ((Integer)this.hibernateTemplate.execute(new HibernateCallback() {
          public Object doInHibernate(Session session) throws HibernateException, SQLException {
            Query query = session.createQuery(hql);
            int row = query.executeUpdate();
            return Integer.valueOf(row);
          }
        })).intValue();
    return row;
  }
  
  public int exeupdatehql(final String hql, final String[] prams) {
    int row = 0;
    row = ((Integer)this.hibernateTemplate.execute(new HibernateCallback() {
          public Object doInHibernate(Session session) throws HibernateException, SQLException {
            Query query = session.createQuery(hql);
            if (prams != null)
              for (int i = 0; i < prams.length; i++)
                query.setString(i, prams[i]);  
            int row = query.executeUpdate();
            return Integer.valueOf(row);
          }
        })).intValue();
    return row;
  }
  
  public List showByPage(final String hql, final int pageSize, final int curPage) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session session) throws HibernateException, SQLException {
          List list = null;
          Query query = session.createQuery(hql);
          query.setFirstResult((curPage - 1) * pageSize);
          query.setMaxResults(pageSize);
          list = query.list();
          return list;
        }
      };
    return this.hibernateTemplate.executeFind(hc);
  }
  
  public Object get(final Class cla, final Serializable id) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session session) throws HibernateException, SQLException {
          Object items = null;
          items = session.get(cla, id);
          return items;
        }
      };
    return this.hibernateTemplate.execute(hc);
  }
}
