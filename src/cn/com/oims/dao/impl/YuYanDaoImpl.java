package cn.com.oims.dao.impl;

import cn.com.oims.dao.IYuYanDao;
import cn.com.oims.dao.pojo.YuYan;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class YuYanDaoImpl extends BaseDaoImpl implements IYuYanDao {
  private String clazzName = YuYan.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(YuYan.class);
  }
  
  @Override
  public int countsOfYuYan() {
    Long l = (Long)this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }
  
  @Override
  public List<YuYan> findYuYansByPage(Page page) {
    page.setRowsCount(Integer.valueOf(countsOfYuYan()));
    page.init();
    return this.hibernateTemplate.findByCriteria(getDC(), 
        page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<YuYan> findAllYuYans() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public void deleteYuYanById(Serializable id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public Serializable saveYuYan(YuYan yuyan) {
    return this.hibernateTemplate.save(yuyan);
  }
  
  @Override
  public void saveOrUpdateYuYan(YuYan yuyan) {
    this.hibernateTemplate.saveOrUpdate(yuyan);
  }
  
  @Override
  public void updateYuYan(YuYan yuyan) {
    String hql = "update YuYan as yuyan set yuyan.mc='" + yuyan.getMc() + 
      "',yuyan.wenzi='" + yuyan.getWenzi() + "' where yuyan.id=" + 
      yuyan.getId() + " and yuyan.fenlei='" + yuyan.getFenlei() + 
      "'";
    executeUpdate(hql);
  }
  
  @Override
  public YuYan findYuYanById(Serializable id) {
    return (YuYan)this.hibernateTemplate.get(YuYan.class, id);
  }
  
  @Override
  public YuYan findYuYanByIdAndFenLei(Integer id, Integer fenlei) {
    String hql = "from YuYan where id=" + id + " and fenlei=" + fenlei;
    List<YuYan> yuyans = this.hibernateTemplate.find(hql);
    if (yuyans != null && yuyans.size() > 0) {
      return yuyans.get(0);
    }
    return null;
  }
  
  @Override
  public List findAllYuYansByPageAndYuYan(Page page, YuYan yuyan) {
    String hql_count = "select count(yuyan.id) from YuYan as yuyan, Category as categroy_fenlei, Category as category_leibie ";
    String hql_map = "select new map(yuyan.id as yuyanid, yuyan.fenlei as fenlei, categroy_fenlei.category as fenleiName, yuyan.mc as mc,yuyan.wenzi as wenzi, yuyan.leibie as leibie, category_leibie.category as leibieName )from YuYan as yuyan, Category as categroy_fenlei, Category as category_leibie ";
    String strWhere = " where 1=1 ";
    strWhere = String.valueOf(strWhere) + " and yuyan.fenlei=categroy_fenlei.id ";
    strWhere = String.valueOf(strWhere) + " and yuyan.leibie=category_leibie.id ";
    if (yuyan.getId() != null) {
      strWhere = String.valueOf(strWhere) + " and yuyan.id=" + yuyan.getId();
    }
    if (yuyan.getFenlei() != null) {
      strWhere = String.valueOf(strWhere) + " and yuyan.fenlei=" + yuyan.getFenlei();
    }
    if (yuyan.getLeibie() != null) {
      strWhere = String.valueOf(strWhere) + " and yuyan.leibie=" + yuyan.getLeibie();
    }
    if (yuyan.getWenzi() != null && yuyan.getWenzi() != "") {
      strWhere = String.valueOf(strWhere) + " and yuyan.wenzi like'%" + yuyan.getWenzi() + "%'";
    }
    strWhere = String.valueOf(strWhere) + " order by yuyan.id desc";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public void deleteYuYanByIdAndFenLei(Integer id, Integer fenlei) {
    String hql = "delete from YuYan as yuyan where yuyan.id=" + id + 
      " and yuyan.fenlei=" + fenlei;
    executeUpdate(hql);
  }
  
  @Override
  public List<YuYan> findAllYuYansByYuYan(YuYan yuyan) {
    String hql = "from YuYan where id=" + yuyan.getId() + " and fenlei=" + 
      yuyan.getFenlei();
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<YuYan> findAllYuYansByIdsAndFenlei(String ids, Integer fenlei) {
    String hql = "from YuYan as yuyan where yuyan.id in(" + ids + 
      ") and yuyan.fenlei=" + fenlei;
    return this.hibernateTemplate.find(hql);
  }
}
