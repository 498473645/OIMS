package cn.com.oims.dao.impl;

import cn.com.oims.dao.IOimsLogDao;
import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.web.form.LogSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class OimsLogDaoImpl extends BaseDaoImpl implements IOimsLogDao {
  private String clazzName = OimsLog.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(OimsLog.class);
  }
  
  public int counts() {
    Long i = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  public List<Map<String, Object>> getLogInfoList(LogSearchForm l) {
    String factorSql = getQueryCondition(l);
    String hql = "select new map(l.id as id,l.cznr as cznr ,l.rzjb as rzjb, l.czsj as czsj ,l.czr as czr,l.czjg as czjg) from OimsLog l where " + 
      
      factorSql;
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  public List<OimsLog> findAllOimsLog4Page(Page p, LogSearchForm l) {
    String factorSql = getQueryCondition(l);
    int size = count("select count(*) from OimsLog  l where " + 
        factorSql);
    p.setRowsCount(Integer.valueOf(size));
    p.init();
    String hql = " from OimsLog l where " + factorSql + "order by id desc";
    int startRow = p.getStartRow().intValue();
    int pageSize = p.getPageSize().intValue();
    List<OimsLog> list = getListForPage(hql, startRow, pageSize);
    return list;
  }
  
  private String getQueryCondition(LogSearchForm l) {
    String factorSql = "1=1";
    if (l.getSearch() != null && !l.getSearch().isEmpty())
      factorSql = String.valueOf(factorSql) + " and l.czr like '%" + l.getSearch() + 
        "%' or l.cznr like '%" + l.getSearch() + "%' "; 
    if (l.getCzr() != null && !l.getCzr().equals(""))
      factorSql = String.valueOf(factorSql) + " and l.czr like '%" + l.getCzr() + "%' "; 
    if (l.getCzjg() != null && !l.getCzjg().equals(""))
      factorSql = String.valueOf(factorSql) + " and l.czjg in (" + l.getCzjg() + ") "; 
    if (l.getCzsj() != null && !l.getCzsj().equals("") && 
      l.getCzsj2() != null && !l.getCzsj2().equals(""))
      factorSql = String.valueOf(factorSql) + " and l.czsj between '" + l.getCzsj() + "' and '" + 
        l.getCzsj2() + "' "; 
    if (l.getRzjb() != null && !l.getRzjb().equals(""))
      factorSql = String.valueOf(factorSql) + " and l.rzjb  in (" + l.getRzjb() + ") "; 
    if (l.getCznr() != null && !l.getCznr().equals(""))
      factorSql = String.valueOf(factorSql) + " and l.cznr like'%" + l.getCznr() + "%' "; 
    if (l.getState() != null && !l.getState().equals(""))
      factorSql = String.valueOf(factorSql) + " and l.state ='" + l.getState() + "' "; 
    return factorSql;
  }
  
  public Serializable saveOimsLog(OimsLog o) {
    return this.hibernateTemplate.save(o);
  }
  
  public void delOimsLog(Serializable id) {
    String sql = "delete from    " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdateOimsLog(OimsLog o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public OimsLog findOimsLogById(Serializable id) {
    return (OimsLog)this.hibernateTemplate.get(OimsLog.class, id);
  }
  
  public void updateOimsLog(OimsLog o) {
    this.hibernateTemplate.update(o);
  }
}
