package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeydzxDao;
import cn.com.oims.dao.pojo.Eyeydzx;
import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Component;

@Component
public class EyeydzxDaoImpl extends BaseDaoImpl implements IEyeydzxDao {
  private String clazzName = Eyeydzx.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Eyeydzx.class);
  }
  
  public void updateEyeydzx(Eyeydzx eyeydzx) {
    this.hibernateTemplate.update(eyeydzx);
  }
  
  public void saveEyeydzx(Eyeydzx eyeydzx) {
    this.hibernateTemplate.save(eyeydzx);
  }
  
  public Eyeydzx selectEyeydzxByEyeydzx(Eyeydzx eyeydzx) {
    Eyeydzx eyeydzxSelect = null;
    List<Eyeydzx> list = this.hibernateTemplate.findByExample(eyeydzx);
    if (list.size() >= 1)
      eyeydzxSelect = list.get(0); 
    return eyeydzxSelect;
  }
  
  public void deleteEyeydzx(Eyeydzx eyeydzx) {
    this.hibernateTemplate.delete(eyeydzx);
  }
}
