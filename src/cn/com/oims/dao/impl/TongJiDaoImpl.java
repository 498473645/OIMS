package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.ITongJiDao;
import cn.com.oims.web.form.ChartHql;
import com.codesnet.common.Page;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

@Component
public class TongJiDaoImpl extends BaseDaoImpl implements ITongJiDao {
  private HibernateTemplate hibernateTemplate;
  
  @Autowired
  public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
    this.hibernateTemplate = hibernateTemplate;
  }
  
  public List<Map<String, Object>> find4Chart(final String hql, final String doing, final Date s, final Date e) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session session) throws HibernateException, SQLException {
          String h = hql;
          h = (s == null) ? "" : (String.valueOf(h) + Utils.whereOrAnd(h) + " zcrq>:s ");
          h = (e == null) ? "" : (String.valueOf(h) + Utils.whereOrAnd(h) + " zcrq<:e ");
          h = String.valueOf(h) + doing;
          Query q = session.createQuery(h);
          if (s != null)
            q.setDate("s", s); 
          if (e != null)
            q.setDate("e", e); 
          return q.list();
        }
      };
    return (List<Map<String, Object>>)this.hibernateTemplate.execute(hc);
  }
  
  public List<Map<String, Object>> find4ChartEx(final String hql, final String timename, final String doing, final Date s, final Date e) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session session) throws HibernateException, SQLException {
          String h = hql;
          h = (s == null) ? "" : (String.valueOf(h) + Utils.whereOrAnd(h) + " " + timename + ">:s ");
          h = (e == null) ? "" : (String.valueOf(h) + Utils.whereOrAnd(h) + " " + timename + "<:e ");
          h = String.valueOf(h) + doing;
          Query q = session.createQuery(h);
          if (s != null)
            q.setDate("s", s); 
          if (e != null)
            q.setDate("e", e); 
          return q.list();
        }
      };
    return (List<Map<String, Object>>)this.hibernateTemplate.execute(hc);
  }
  
  public List<Map<String, Object>> find4ChartHql(final ChartHql db, final Map<String, Object> m) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session arg0) throws HibernateException, SQLException {
          String hql = String.valueOf(db.getSelect()) + db.getFrom() + db.getWhere() + db.getGroup() + db.getOrder();
          TongJiDaoImpl.this.log(hql);
          Query q = arg0.createQuery(hql);
          Map<String, Object> map = m;
          q.setProperties(map);
          return q.list();
        }
      };
    return this.hibernateTemplate.executeFind(hc);
  }
  
  public Integer count(final ChartHql db, final Map<String, Object> map) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session arg0) throws HibernateException, SQLException {
          String hql = "select count (*) " + db.getFrom() + db.getWhere();
          TongJiDaoImpl.this.log(hql);
          Query q = arg0.createQuery(hql);
          Map<String, Object> mp = map;
          q.setProperties(mp);
          return q.list().get(0);
        }
      };
    Long l = (Long)this.hibernateTemplate.execute(hc);
    return Integer.valueOf(l.intValue());
  }
  
  public List<Map<String, Object>> find4ListHql(final ChartHql db, final Map<String, Object> m, final Page p) {
    HibernateCallback hc = new HibernateCallback() {
        public Object doInHibernate(Session arg0) throws HibernateException, SQLException {
          String hql = String.valueOf(db.getSelect()) + db.getFrom() + db.getWhere() + db.getGroup() + db.getOrder();
          TongJiDaoImpl.this.log(hql);
          Query q = arg0.createQuery(hql);
          q.setMaxResults(p.getPageSize().intValue());
          q.setFirstResult(p.getStartRow().intValue());
          Map<String, Object> map = m;
          q.setProperties(map);
          return q.list();
        }
      };
    return this.hibernateTemplate.executeFind(hc);
  }
  
  private void log(String info) {
    Utils.tLog(info);
  }
  
  public List<Map<String, Object>> findYuanGongByBumen(String bumenId) {
    String hql = "select new map(y.xingming as text) from YuanGong y where y.bumenId=" + bumenId;
    return this.hibernateTemplate.find(hql);
  }
  
  public List<Map<String, Object>> findSheBieByBumen(String bumenId, String bgsId) {
    String hql = "select new map(sb.sbmc as text) from SheBei sb ,BuMen bm  where sb.bmId=bm.id ";
    if (Utils.strIsNotEmpty(bgsId))
      hql = String.valueOf(hql) + Utils.whereOrAnd(hql) + " sb.bgsId in ()"; 
    if (Utils.strIsNotEmpty(bumenId))
      hql = String.valueOf(hql) + Utils.whereOrAnd(hql) + " bm.id in (" + bumenId + ")"; 
    return this.hibernateTemplate.find(hql);
  }
}
