package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyelxdzxDao;
import cn.com.oims.dao.pojo.Eyelxdzx;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyelxdzxDaoImpl extends BaseDaoImpl implements IEyelxdzxDao {
  public void updateEyelxdzx(Eyelxdzx eyelxdzx) {
    this.hibernateTemplate.update(eyelxdzx);
  }
  
  public Serializable saveEyelxdzx(Eyelxdzx eyelxdzx) {
    return this.hibernateTemplate.save(eyelxdzx);
  }
  
  public Eyelxdzx selectEyelxdzxByEyelxdzx(Eyelxdzx eyelxdzx) {
    Eyelxdzx eyelxdzxSelect = null;
    List<Eyelxdzx> list = this.hibernateTemplate.findByExample(eyelxdzx);
    if (list.size() >= 1)
      eyelxdzxSelect = list.get(0); 
    return eyelxdzxSelect;
  }
  
  public void deleteEyelxdzx(Eyelxdzx eyelxdzx) {
    this.hibernateTemplate.delete(eyelxdzx);
  }
}
