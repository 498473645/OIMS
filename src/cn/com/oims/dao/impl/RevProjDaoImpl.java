package cn.com.oims.dao.impl;

import cn.com.oims.dao.IRevProjDao;
import cn.com.oims.dao.pojo.RevProj;
import cn.com.oims.web.form.RevProjForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class RevProjDaoImpl extends BaseDaoImpl implements IRevProjDao {
  private String clazzName = RevProj.class.getSimpleName();
  
  private String countHql = "select count(*) from RevProj rp";
  
  @Override
  public RevProj getRevProjById(Serializable id) {
    return (RevProj)this.hibernateTemplate.get(RevProj.class, id);
  }
  
  @Override
  public List<Map<String, Object>> findRevProjByUser(String uid) {
    String hql = "select new map(rp.id as id, rp.projName as revProjName) from RevProj rp where rp.userId='" + uid + "'";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Map<String, Object>> findRevProjByPage(Page page, RevProjForm form) {
    Map<String, Date> map = new HashMap<String, Date>();
    String factorSql = getQueryCondition(form, map);
    int size = count(String.valueOf(this.countHql) + " ,YuanGong yg,BuMen bm where yg.gonghao=rp.userId and bm.id=rp.bumenId and " + factorSql);
    page.setRowsCount(Integer.valueOf(size));
    page.init();
    String hql = "select new map(yg.xingming as xingming,bm.bmmc as bmmc,rp.id as id,rp.amnum as amnum,rp.checkAddr as checkAddr,rp.pmnum as pmnum,rp.projName as projName,rp.bumenId as bumenId,rp.userId as userId,rp.jcxmIds as jcxmIds,rp.opertm as opertm) from YuanGong yg, RevProj rp,BuMen bm where yg.gonghao=rp.userId and bm.id=rp.bumenId and " + 
      
      factorSql + " order by rp.opertm desc";
    int startRow = page.getStartRow().intValue();
    int pageSize = page.getPageSize().intValue();
    List<Map<String, Object>> list = getListForPage(hql, startRow, pageSize);
    return list;
  }
  
  @Override
  public Serializable saveRevProj(RevProj t) {
    return this.hibernateTemplate.save(t);
  }
  
  @Override
  public void updateRevProj(RevProj revProj) {
    this.hibernateTemplate.update(revProj);
  }
  
  @Override
  public void delRevProjById(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  @Override
  public List<RevProj> getRevProjByBumenId(int bumenId) {
    String hql = "from RevProj where bumenId=" + bumenId;
    return this.hibernateTemplate.find(hql);
  }
  
  private String getQueryCondition(RevProjForm searchForm, Map<String, Date> map) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String factorSql = " 1=1 ";
    if (searchForm.getSearch() != null && !searchForm.getSearch().isEmpty())
      factorSql = String.valueOf(factorSql) + " and (rp.projName like '%" + searchForm.getSearch() + "%')"; 
    return factorSql;
  }
}
