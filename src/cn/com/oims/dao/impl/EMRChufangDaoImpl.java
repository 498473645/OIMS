package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEMRChufangDao;
import cn.com.oims.dao.pojo.DrugDict;
import cn.com.oims.dao.pojo.DrugStock;
import cn.com.oims.dao.pojo.EMRChufang;
import cn.com.oims.dao.pojo.EMRChufangQindan;
import cn.com.oims.web.form.CommonSerchForm;
import com.codesnet.common.Page;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.SQLQuery;
import org.hibernate.classic.Session;
import org.springframework.stereotype.Component;

@Component
public class EMRChufangDaoImpl extends BaseDaoImpl implements IEMRChufangDao {
  @Override
  public List<EMRChufangQindan> findChufangQindanByJiuzhenId(Long jiuzhenId) {
    String hql = "from EMRChufangQindan where chufangId in (select id from EMRChufang where jiuzhenId=" + jiuzhenId + ")";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public DrugDict getEMRDrugDict(Long yaopinId) {
    return (DrugDict)this.hibernateTemplate.get(DrugDict.class, yaopinId);
  }
  
  @Override
  public void updateEMRChufangQindan(EMRChufangQindan qd) {
    this.hibernateTemplate.update(qd);
  }
  
  @Override
  public Long saveChufang(EMRChufang chufang) {
    return (Long)this.hibernateTemplate.save(chufang);
  }
  
  @Override
  public List<EMRChufang> findChufangList(Long jiuzhenId) {
    return this.hibernateTemplate.find("from EMRChufang where jiuzhenId=" + jiuzhenId);
  }
  
  @Override
  public int countChufangQindan(Long id) {
    return count("select count(*) from EMRChufangQindan where chufangId=" + id);
  }
  
  @Override
  public void saveChufangQindan(EMRChufangQindan qd) {
    this.hibernateTemplate.save(qd);
  }
  
  @Override
  public List<EMRChufangQindan> findChufangQindanByChufangId(Long chufangId) {
    return this.hibernateTemplate.find("from EMRChufangQindan where chufangId=" + chufangId);
  }
  
  @Override
  public EMRChufang getChufang(Long chufangId) {
    return (EMRChufang)this.hibernateTemplate.get(EMRChufang.class, chufangId);
  }
  
  @Override
  public void updateChufang(EMRChufang chufang) {
    this.hibernateTemplate.update(chufang);
  }
  
  @Override
  public void deleteChufangQindan(EMRChufangQindan qindan) {
    this.hibernateTemplate.delete(qindan);
  }
  
  @Override
  public void deleteChufang(EMRChufang chufang) {
    this.hibernateTemplate.delete(chufang);
  }
  
  @Override
  public void deleteChufangQindanAll(List<EMRChufangQindan> ql) {
    this.hibernateTemplate.deleteAll(ql);
  }
  
  @Override
  public List<EMRChufangQindan> findChufangQindan(Long jiuzhenId) {
    return this.hibernateTemplate.find("from EMRChufangQindan where chufangId in(select id from EMRChufang where jiuzhenId=" + jiuzhenId + ")");
  }
  
  @Override
  public List<DrugDict> findDrugDictList(Page page, String categoryIds, String search, String storename) {
    String hql = "from DrugDict d, DrugStock s where d.id=s.drugDictId ";
    if (search != null && !search.isEmpty()) {
      hql = String.valueOf(hql) + " and (d.drugCode='" + search + "' or d.drugName like '%" + search + "%' or d.inputCode like '%" + search.toUpperCase() + "%') and d.enableFlag=true ";
    }
    if (storename != null && !storename.equals("all")) {
      hql = String.valueOf(hql) + " and d.drugCode like '%@" + storename.trim() + "' ";
    }
    page.setRowsCount(Integer.valueOf(count("select count(distinct d) " + hql)));
    page.init();
    return getListForPage("select distinct d " + hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<DrugStock> findDrugStockList(Long drugDictId, boolean haveStore) {
    String hql = " from DrugStock where drugDictId=:drugDictId";
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("drugDictId", drugDictId);
    return findList(hql, map);
  }
  
  @Override
  public DrugDict getEMRDrugDictByCode(String drugCode) {
    String hql = " from DrugDict where drugCode='" + drugCode + "'";
    List<DrugDict> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public DrugStock getDrugStock(String id) {
    String hql = " from DrugStock where drugStockId='" + id + "'";
    List<DrugStock> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public void saveOrUpdateDrug(DrugStock stock) {
    this.hibernateTemplate.saveOrUpdate(stock);
  }
  
  @Override
  public DrugStock getDrugStockById(Long yaopinId) {
    return (DrugStock)this.hibernateTemplate.get(DrugStock.class, yaopinId);
  }
  
  @Override
  public List<EMRChufangQindan> findQINDANByJzAndYaoPin(Long chufangId, Long yaopinId) {
    String hql = "from EMRChufangQindan where chufangId=" + chufangId + " and yaopinId=" + yaopinId;
    List<EMRChufangQindan> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public List<DrugDict> findDrugDictPageList(Page page, String search) {
    String hql = "from DrugDict d, DrugStock s where d.id=s.drugDictId ";
    if (search != null && !search.isEmpty()) {
      hql = String.valueOf(hql) + " and (d.drugCode='" + search + "' or d.drugName like '%" + search + "%' or d.inputCode like '%" + search.toUpperCase() + "%')";
    }
    page.setRowsCount(Integer.valueOf(count("select count(distinct d) " + hql)));
    page.init();
    return getListForPage("select distinct d " + hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<Map<String, Object>> findDrugTJPageList(Page page, CommonSerchForm searchform) {
    String hql = " select new map(t1.yaoming as yaoming,(select t2.packageSpec from DrugStock t2 where t1.yaopinId = t2.id)as packageSpec, (select t2.packageUnits from DrugStock t2 where t1.yaopinId = t2.id)as packageUnits ,  (select t2.storeName from DrugStock t2 where t1.yaopinId = t2.id)as storeName , sum(t1.shuliang) as countyp, t1.yaopinId as yaopinId) from EMRChufangQindan t1,EMRChufang cf  where t1.chufangId=cf.id  ";
    if (searchform.getSearch() != null && searchform.getSearch() != "") {
      hql = String.valueOf(hql) + " and (t1.yaoming like '%" + searchform.getSearch() + "%')";
    }
    if (searchform.getCfDateStart() != null && searchform.getCfDateStart() != "") {
      hql = String.valueOf(hql) + " and to_char(cf.cfsj,'yyyy-MM-dd')>='" + searchform.getCfDateStart() + "'";
    }
    if (searchform.getCfDateEnd() != null && searchform.getCfDateStart() != "") {
      hql = String.valueOf(hql) + " and to_char(cf.cfsj,'yyyy-MM-dd')<='" + searchform.getCfDateEnd() + "'";
    }
    hql = String.valueOf(hql) + "  group by t1.yaoming, t1.yaopinId  order by countyp desc ";
    int size = 0;
    List list = this.hibernateTemplate.find(hql);
    if (list != null) {
      size = list.size();
    }
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<Object> findUseDocList(CommonSerchForm form) {
    String sql = " select p.yaoming as yaoming, sum(p.countsl) sumsl, p.cfys,p.gonghao from (select t.yaoming as yaoming,sum(t.shuliang) as countsl,   (select t2.xingming from emr_chufang t1, yuangong t2 where t1.id = t.chufang_id and t2.gonghao = t1.cfys) as cfys, (select t1.cfys from emr_chufang t1  where t1.id = t.chufang_id) as gonghao  from emr_chufang_mingxi t,emr_chufang cf where t.chufang_id=cf.id and t.yaopin_id =" + 
      
      form.getYaopinId();
    if (form.getCfDateStart() != null && 
      form.getCfDateStart() != "") {
      sql = String.valueOf(sql) + " and to_char(cf.cfsj,'yyyy-MM-dd')>='" +
        form.getCfDateStart() + "'";
    }
    if (form.getCfDateEnd() != null && 
      form.getCfDateStart() != "") {
      sql = String.valueOf(sql) + " and to_char(cf.cfsj,'yyyy-MM-dd')<='" +
        form.getCfDateEnd() + "'";
    }
    sql = String.valueOf(sql) + " group by t.yaoming, t.chufang_id) p  group by p.yaoming, p.cfys, p.gonghao order by sumsl desc ";
    Session session = this.hibernateTemplate.getSessionFactory()
      .openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql);
    List<Object> list = sQLQuery.list();
    session.close();
    return list;
  }
  
  @Override
  public List<Map<String, Object>> findZdByGh(CommonSerchForm form, String gonghao) {
    String sql = " select distinct (ds.disease)  from emr_chufang_mingxi t, emr_chufang cf, jiuzhen_zhenduan   zd, diseases ds where t.chufang_id = cf.id  and cf.jiuzhen_id = zd.jiuzhen_id and zd.zdfl_id = ds.id and cf.cfys='" + 
      
      gonghao + "'" + "  and t.yaopin_id =" + form.getYaopinId();
    if (form.getCfDateStart() != null && form.getCfDateStart() != "") {
      sql = String.valueOf(sql) + " and to_char(cf.cfsj,'yyyy-MM-dd')>='" +
        form.getCfDateStart() + "'";
    }
    if (form.getCfDateEnd() != null && form.getCfDateStart() != "") {
      sql = String.valueOf(sql) + " and to_char(cf.cfsj,'yyyy-MM-dd')<='" +
        form.getCfDateEnd() + "'";
    }
    Session session = this.hibernateTemplate.getSessionFactory()
      .openSession();
    SQLQuery sQLQuery = session.createSQLQuery(sql);
    List<Map<String, Object>> list = sQLQuery.list();
    session.close();
    return list;
  }
}
