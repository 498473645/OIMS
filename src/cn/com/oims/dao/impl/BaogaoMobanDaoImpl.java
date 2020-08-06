package cn.com.oims.dao.impl;

import cn.com.oims.dao.IBaogaoMobanDao;
import cn.com.oims.dao.pojo.BaogaoMoban;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class BaogaoMobanDaoImpl extends BaseDaoImpl implements IBaogaoMobanDao {
  private String clazzName = BaogaoMoban.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(BaogaoMoban.class);
  }
  
  public int counts() {
    int i = ((Integer)this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0)).intValue();
    return i;
  }
  
  public List<BaogaoMoban> findAllBaogaoMoban4Page(Page p) {
    p.setRowsCount(Integer.valueOf(counts()));
    p.init();
    return this.hibernateTemplate.findByCriteria(getDC(), p.getStartRow().intValue(), 
        p.getPageSize().intValue());
  }
  
  public List<BaogaoMoban> findAllBaogaoMobans() {
    return this.hibernateTemplate.findByCriteria(getDC());
  }
  
  public Serializable saveBaogaoMoban(BaogaoMoban baogaomoban) {
    return this.hibernateTemplate.save(baogaomoban);
  }
  
  public void delBaogaoMoban(Serializable id) {
    String sql = "delete from  " + this.clazzName + " as o where o.id=" + id;
    executeUpdate(sql);
  }
  
  public void saveOrUpdateBaogaoMoban(BaogaoMoban o) {
    this.hibernateTemplate.saveOrUpdate(o);
  }
  
  public BaogaoMoban findBaogaoMobanById(Serializable id) {
    return (BaogaoMoban)this.hibernateTemplate.get(BaogaoMoban.class, id);
  }
  
  public void updateBaogaoMoban(BaogaoMoban baogaomoban) {
    this.hibernateTemplate.update(baogaomoban);
  }
  
  public List findAllBaogaoMobansByPage(Page page, BaogaoMoban baogaomoban) {
    String hql_count = "select count(baogaomoban.id)from BaogaoMoban as baogaomoban,BuMen as bumen,Category as oimscategory,Jcxm jcxm,YuanGong as yuangong ";
    String hql_map = "select new map(baogaomoban.id as baogaomobanid,baogaomoban.biaoti as biaoti,baogaomoban.bumenId as bumenId,bumen.bmmc as bmmc,baogaomoban.gonghao as gonghao,yuangong.xingming as xingming,baogaomoban.jcxmIds as jcxmids,jcxm.xmmc as xmmc,baogaomoban.jibie as jibie,oimscategory.category as jibieName,baogaomoban.moban as moban,baogaomoban.url as url ) from BaogaoMoban as baogaomoban,BuMen as bumen,Category as oimscategory,Jcxm jcxm,YuanGong as yuangong ";
    String strWhere = " where 1=1 ";
    if (baogaomoban.getBiaoti() != null && 
      !"".equals(baogaomoban.getBiaoti()))
      strWhere = String.valueOf(strWhere) + " and baogaomoban.biaoti like '%" + 
        baogaomoban.getBiaoti() + "%' "; 
    strWhere = String.valueOf(strWhere) + " and baogaomoban.bumenId=bumen.id ";
    strWhere = String.valueOf(strWhere) + " and baogaomoban.jibie=oimscategory.id ";
    strWhere = String.valueOf(strWhere) + " and baogaomoban.gonghao=yuangong.gonghao ";
    strWhere = String.valueOf(strWhere) + " and baogaomoban.jcxmIds=jcxm.id ";
    strWhere = String.valueOf(strWhere) + " order by baogaomoban.id desc";
    hql_count = String.valueOf(hql_count) + strWhere;
    hql_map = String.valueOf(hql_map) + strWhere;
    page.setRowsCount(Integer.valueOf(count(hql_count)));
    page.init();
    List list = getListForPage(hql_map, page.getStartRow().intValue(), 
        page.getPageSize().intValue());
    return list;
  }
  
  public List<BaogaoMoban> findBaogaoMobansByBaogaoMoban(BaogaoMoban baogaomoban) {
    return this.hibernateTemplate
      .findByExample(baogaomoban);
  }
}
