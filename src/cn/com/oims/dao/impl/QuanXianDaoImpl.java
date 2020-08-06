package cn.com.oims.dao.impl;

import cn.com.oims.dao.IQuanXianDao;
import cn.com.oims.dao.pojo.QuanXian;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class QuanXianDaoImpl extends BaseDaoImpl implements IQuanXianDao {
  private String clazzName = QuanXian.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(QuanXian.class);
  }
  
  @Override
  public int countsOfQuanXian() {
    Long l = (Long)this.hibernateTemplate.findByCriteria(this.getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  @Override
  public List<QuanXian> findQuanXiansByPage(Page page) {
    page.setRowsCount(Integer.valueOf(countsOfQuanXian()));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC(), 
        page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<QuanXian> findAllQuanXians() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public void deleteQuanXianById(Serializable id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public Serializable saveQuanXian(QuanXian quanXian) {
    return this.hibernateTemplate.save(quanXian);
  }
  
  @Override
  public void saveOrUpdateQuanXian(QuanXian quanXian) {
    this.hibernateTemplate.saveOrUpdate(quanXian);
  }
  
  @Override
  public void updateQuanXian(QuanXian quanXian) {
    this.hibernateTemplate.update(quanXian);
  }
  
  @Override
  public QuanXian findQuanXianById(Serializable id) {
    return (QuanXian)this.hibernateTemplate.get(QuanXian.class, id);
  }
  
  @Override
  public List<Map<String, Object>> getMenuAndButtonByIds(String ids, Integer yuyan) {
    String hql = "select new map(q.id as id,q.cdjb as cdjb,q.fatherId as fatherId,q.css as css,q.func as func,y.wenzi as title,q.jsFileUrl as jsFileUrl) from QuanXian q,YuYan y where q.biaoqian=y.id and y.fenlei=" + 
      yuyan + " and q.id in (" + ids + ") order by paixu,id";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<QuanXian> findQuanXianByIds(List<Integer> userQx) {
    Integer[] l = new Integer[userQx.size()];
    for (int i = 0; i < userQx.size(); i++) {
      l[i] = userQx.get(i);
    }
    return this.hibernateTemplate.findByCriteria(getDC().add(
          Restrictions.in("id", (Object[])l)));
  }
  
  @Override
  public List<QuanXian> findCurLoginUserQuanXian(String quanxianIds, Integer cdjb, Integer fatherId) {
    List<QuanXian> list = new ArrayList<QuanXian>();
    List<Integer> list_quanxianId = new ArrayList<Integer>();
    String[] quanxianIdArray = quanxianIds.split(",");
    byte b;
    int i;
    String[] arrayOfString1;
    for (i = (arrayOfString1 = quanxianIdArray).length, b = 0; b < i; ) {
      String quanxianId = arrayOfString1[b];
      if (quanxianId != null && !"".equals(quanxianId)) {
        list_quanxianId.add(Integer.valueOf(quanxianId));
      }
      b++;
    } 
    if (cdjb != null) {
      list = this.hibernateTemplate.findByCriteria(getDC()
          .add((Criterion)Restrictions.eq("cdjb", cdjb))
          .add((Criterion)Restrictions.eq("fatherId", fatherId))
          .add(Restrictions.in("id", list_quanxianId)));
    } else {
      list = this.hibernateTemplate.findByCriteria(getDC()
          .add(Restrictions.isNull("cdjb"))
          .add((Criterion)Restrictions.eq("fatherId", fatherId))
          .add(Restrictions.in("id", list_quanxianId)));
    } 
    return list;
  }
  
  @Override
  public String findQuanXianNo1StrByQuanXianIds(String quanxianIds) {
    Integer cdjb = Integer.valueOf(1);
    String hql = "select fatherId from QuanXian where id in (" + quanxianIds + 
      ") and cdjb=" + cdjb + " group by fatherId";
    List<Integer> list = this.hibernateTemplate.find(hql);
    String fatherId = "-1";
    for (int i = 0; i < list.size(); i++) {
      fatherId = String.valueOf(fatherId) + "," + (Integer)list.get(i);
    }
    return fatherId;
  }
}
