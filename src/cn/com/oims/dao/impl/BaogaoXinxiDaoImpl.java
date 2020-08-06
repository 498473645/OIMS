package cn.com.oims.dao.impl;

import cn.com.oims.dao.IBaogaoXinxiDao;
import cn.com.oims.dao.pojo.Baogao;
import com.codesnet.common.Page;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class BaogaoXinxiDaoImpl extends BaseDaoImpl implements IBaogaoXinxiDao {
  private String clazzName = Baogao.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Baogao.class);
  }
  
  public int counts() {
    Long i = (Long) this.hibernateTemplate.findByCriteria(
        getDC().setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  public List findBaogaoXinxiByPage(Page p) {
    Baogao b = new Baogao();
    String countHql = "select count (*) from Baogao b ,BaogaoMoban bm  where 1=1 and b.mobanId=bm.id ";
    p.setRowsCount(Integer.valueOf(count(countHql)));
    p.init();
    String hql = "select new map(b.id as id, b.jcdId as jcdId ,b.bgys as bgys ,b.bgTime as bgTime,  b.shys as shys ,b.shTime as shTime ,b.jckj as jckj, b.jcts as jcts ,b.state as state,  b.mobanId as mobanId ,bg.biaoti as mobanIdValue)from Baogao as b ,BaogaoMoban as bg  where 1=1 and b.mobanId=bg.id ";
    return getListForPage(hql, p.getStartRow().intValue(), p.getPageSize().intValue());
  }
}
