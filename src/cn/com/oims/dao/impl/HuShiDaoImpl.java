package cn.com.oims.dao.impl;

import cn.com.oims.dao.IHuShiDao;
import cn.com.oims.dao.pojo.YanYa;
import com.codesnet.common.Page;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class HuShiDaoImpl extends BaseDaoImpl implements IHuShiDao {
  private String clazzName = YanYa.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(YanYa.class);
  }
  
  public int counts() {
    Long i = (Long) this.hibernateTemplate.findByCriteria(getDC()
        .setProjection(Projections.rowCount())).get(0);
    return i.intValue();
  }
  
  public List<YanYa> findAllYanYaByPage(Page p) {
    return null;
  }
}
