package cn.com.oims.dao.impl;

import cn.com.oims.common.Utils;
import cn.com.oims.dao.IWaterconfigDao;
import cn.com.oims.dao.pojo.Waterconfig;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class WaterconfigDaoImpl extends BaseDaoImpl implements IWaterconfigDao {
  public Serializable add(Waterconfig waterconfig) {
    return this.hibernateTemplate.save(waterconfig);
  }
  
  public Serializable deleteWaterconfigById(Serializable id) {
    Waterconfig waterconfig = getById(id);
    this.hibernateTemplate.delete(waterconfig);
    return waterconfig.getId();
  }
  
  public Serializable update(Waterconfig waterconfig) {
    Waterconfig pojo = (Waterconfig)this.hibernateTemplate.get(Waterconfig.class, 
        waterconfig.getId());
    if (Utils.strIsEmpty(waterconfig.getWfilename()))
      waterconfig.setWfilename(pojo.getWfilename()); 
    if (Utils.strIsEmpty(waterconfig.getWthumbfilename()))
      waterconfig.setWthumbfilename(pojo.getWthumbfilename()); 
    this.hibernateTemplate.update(waterconfig);
    return waterconfig.getId();
  }
  
  public List<Map<String, Object>> findAll(Waterconfig waterconfig, Page page) {
    String hql_count = "select count(w.id) from Waterconfig as w,BuMen as b,Jcxm as j";
    String hql_map = "select new map(w.id as id ,w.alpha as alpha, w.beizhu as beizhu, w.glbmid as glbmid, w.jcxmid as jcxmid, w.thumbAlpha as thumbAlpha, w.thumbX as thumbX, w.thumbY as thumbY, w.title as title, w.wfilename as wfilename, w.wthumbfilename as wthumbfilename, w.x as x,w.y as y,j.xmmc as xmmc ,b.bmmc as bmmc )  from Waterconfig as w,BuMen as b,Jcxm as j";
    String strWhere = " where 1=1 ";
    strWhere = String.valueOf(strWhere) + " and w.glbmid=b.id";
    strWhere = String.valueOf(strWhere) + " and w.jcxmid=j.id";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List<Map<String, Object>> list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  public Waterconfig getById(Serializable id) {
    return (Waterconfig)this.hibernateTemplate.get(Waterconfig.class, id);
  }
  
  public Integer count() {
    List ls = this.hibernateTemplate.findByCriteria(
        DetachedCriteria.forClass(Waterconfig.class).setProjection(
          Projections.rowCount()));
    return Integer.valueOf(ls.get(0).toString());
  }
}
