package cn.com.oims.dao.impl;

import cn.com.oims.dao.IBaogaoPicDao;
import cn.com.oims.dao.pojo.BaogaoPic;
import java.io.Serializable;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Component;

@Component
public class BaogaoPicDaoImpl extends BaseDaoImpl implements IBaogaoPicDao {
  private String clazzName = BaogaoPic.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(BaogaoPic.class);
  }
  
  public Serializable saveBaogaoPic(BaogaoPic baogaopic) {
    return this.hibernateTemplate.save(baogaopic);
  }
  
  public void deleteBaogaoPicByBaogaoPic(BaogaoPic baogaopic) {
    String hql = "delete from BaogaoPic as baogaopic where baogaopic.reportId=" + 
      baogaopic.getReportId();
    executeUpdate(hql);
  }
  
  public List<BaogaoPic> selectBaogaoPicsByBaogaoPic(BaogaoPic baogaopic) {
    return this.hibernateTemplate.findByExample(baogaopic);
  }
}
