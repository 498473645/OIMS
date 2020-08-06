//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package cn.com.oims.dao.impl;

import cn.com.oims.dao.IBanGongShiDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.web.form.BanGongShiSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class BanGongShiDaoImpl extends BaseDaoImpl implements IBanGongShiDao {
  private String clazzName = BanGongShi.class.getSimpleName();

  public BanGongShiDaoImpl() {
  }

  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(BanGongShi.class);
  }

  @Override
  public int counts() {
    Long l = (Long)this.hibernateTemplate.findByCriteria(this.getDC().setProjection(Projections.rowCount())).get(0);
    return l.intValue();
  }

  @Override
  public List<BanGongShi> findAllBanGongShi4Page(Page page, BanGongShiSearchForm bgs) {
    String hql_count = " select count(bangongshi.id) from BanGongShi as bangongshi ";
    String hql_map = " from BanGongShi as bangongshi ";
    String strWhere = " where 1=1 ";
    if (bgs.getSearch() != null && !bgs.getSearch().isEmpty()) {
      strWhere = strWhere + " and (bangongshi.weizhi like '%" + bgs.getSearch() + "%' or bangongshi.bgs like '%" + bgs.getSearch() + "%')";
    }

    strWhere = strWhere + " order by bangongshi.id desc";
    hql_count = hql_count + strWhere;
    hql_map = hql_map + strWhere;
    page.setRowsCount(this.count(hql_count));
    page.init();
    List list = this.getListForPage(hql_map, page.getStartRow(), page.getPageSize());
    return list;
  }

  @Override
  public List<BanGongShi> findAllBanGongShi() {
    return this.hibernateTemplate.findByCriteria(this.getDC());
  }

  @Override
  public Serializable saveBanGongShi(BanGongShi bangongshi) {
    return this.hibernateTemplate.save(bangongshi);
  }

  @Override
  public void delBanGongShi(Serializable id) {
    String sql = "delete from " + this.clazzName + " as o where o.id=" + id;
    this.executeUpdate(sql);
  }

  @Override
  public void saveOrUpdateBanGongShi(BanGongShi o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }

  @Override
  public BanGongShi findBanGongShiById(Serializable id) {
    return (BanGongShi)this.hibernateTemplate.get(BanGongShi.class, id);
  }

  @Override
  public void updateBanGongShi(BanGongShi bangongshi) {
    this.hibernateTemplate.update(bangongshi);
  }

  @Override
  public List findAllBanGongShiByOfficeID(String officeid) {
    List<BanGongShi> list = new ArrayList();
    if (!officeid.equals("") && officeid != null) {
      String hql = "from BanGongShi bg where bg.id in(" + officeid + ")";
      list = this.hibernateTemplate.find(hql);
    }

    return (List)list;
  }

  @Override
  public BanGongShi findBangongshiId(String name) {
    String sql = "from BanGongShi b where b.bgs='" + name + "'";
    List rt = this.hibernateTemplate.find(sql);
    return rt != null && rt.size() > 0 ? (BanGongShi)rt.get(0) : null;
  }

  @Override
  public BanGongShi findBanGongShiByBgs(String bgs) {
    BanGongShi bangongshi = null;
    List list = this.hibernateTemplate.findByCriteria(this.getDC().add(Restrictions.eq("bgs", bgs)));
    if (list.size() > 0) {
      bangongshi = (BanGongShi)list.get(0);
    }

    return bangongshi;
  }

  @Override
  public BanGongShi findBanGongShiByBgsBm(String bgsBm) {
    String hql = " from BanGongShi where bgsBm='" + bgsBm + "' order by id";
    List<BanGongShi> list = this.hibernateTemplate.find(hql);
    return list.size() > 0 ? (BanGongShi)list.get(0) : null;
  }
}
