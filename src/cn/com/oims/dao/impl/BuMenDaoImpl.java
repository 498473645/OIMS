package cn.com.oims.dao.impl;

import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.web.form.BuMenSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class BuMenDaoImpl extends BaseDaoImpl implements IBuMenDao {
  private String clazzName = BuMen.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(BuMen.class);
  }
  
  @Override
  public int counts() {
    Long i = (Long)this.hibernateTemplate.findByCriteria(this.getDC().setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  @Override
  public List<BuMen> findAllBuMen() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  @Override
  public Serializable saveBuMen(BuMen bumen) {
    return this.hibernateTemplate.save(bumen);
  }
  
  @Override
  public void delBuMen(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public void saveOrUpdateBuMen(BuMen o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  @Override
  public BuMen findBuMenById(Serializable id) {
    return (BuMen)this.hibernateTemplate.get(BuMen.class, id);
  }
  
  @Override
  public void updateBuMen(BuMen bumen) {
    this.hibernateTemplate.update(bumen);
  }
  
  @Override
  public List getBumenList(Page page, BuMenSearchForm bsf) {
    String hql_count = " select count(bumen.id) from BuMen as bumen ";
    String hql_map = " from BuMen as bumen ";
    String strWhere = " where 1=1 ";
    if (bsf.getSearch() != null && !bsf.getSearch().isEmpty())
      strWhere = String.valueOf(strWhere) + " and (bumen.bmmc like '%" + bsf.getSearch() + 
        "%' or bumen.lxr like '%" + bsf.getSearch() + "%')"; 
    strWhere = String.valueOf(strWhere) + " order by bumen.id desc";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  @Override
  public BuMen getBuMenByName(String name) {
    return null;
  }
  
  @Override
  public List findBuMenByBanGongShiID(Serializable id) {
    String hql = "from BuMen b where b.officeId like '%" + id + "%'";
    System.out.println(String.valueOf(hql) + "-----------------------------------");
    List list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public List<Map<String, Object>> getBuMenListInfo(BuMenSearchForm bsf) {
    String factorSql = getQueryCondition(bsf);
    String hql = "select new map(b.id as id,b.dwid as dwid,d.dwmc as dwidValue,b.officeId as officeId,b.bmbm as bmbm ,b.bmmc as bmmc ,b.lxr as lxr ,b.lxdh as lxdh,b.ywfw as ywfw) from BuMen b ,DanWei d where " + 
      
      factorSql + 
      " and b.dwid=d.id";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    String s = "";
    for (Map<String, Object> m : list) {
      String officeId = m.get("officeId").toString();
      if (officeId == null || officeId.equals(""))
        continue; 
      String hql2 = "select new map(b.bgs as officeIdValue) from BanGongShi  b where b.id in (" + 
        officeId + ")";
      List<Map<String, Object>> l = this.hibernateTemplate.find(hql2);
      for (int i = 0; i < l.size(); i++) {
        Map m2 = l.get(i);
        s = String.valueOf(s) + m2.get("officeIdValue").toString() + ",";
      } 
      s = s.substring(0, s.lastIndexOf(","));
      m.put("officeIdValue", s);
      s = "";
    } 
    return list;
  }
  
  private String getQueryCondition(BuMenSearchForm ygs) {
    String factorSql = " 1=1 ";
    if (ygs.getBmbm() != null && !ygs.getBmbm().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.bmbm='" + ygs.getBmbm() + "'"; 
    if (ygs.getBmmc() != null && !ygs.getBmmc().isEmpty())
      factorSql = String.valueOf(factorSql) + " and b.bmmc='" + ygs.getBmmc() + "'"; 
    return factorSql;
  }
  
  @Override
  public List<BuMen> getShebeiList(BuMen o) {
    List<BuMen> l = new ArrayList<BuMen>();
    String hql = "from SheBei where bmId = '" + o.getId() + "'";
    l = this.hibernateTemplate.find(hql);
    return l;
  }
  
  @Override
  public BuMen getBuMenByBmbm(String deptCode) {
    List<BuMen> list = this.hibernateTemplate.find(" from BuMen where bmbm='" + deptCode + "'");
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public BuMen getBuMenById(Integer id) {
    return (BuMen)this.hibernateTemplate.get(BuMen.class, id);
  }
}
