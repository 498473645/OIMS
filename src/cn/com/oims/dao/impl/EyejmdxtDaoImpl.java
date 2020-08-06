package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyejmdxtDao;
import cn.com.oims.dao.pojo.Eyejmdxt;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyejmdxtDaoImpl extends BaseDaoImpl implements IEyejmdxtDao {
  public void updateEyejmdxt(Eyejmdxt eyejmdxt) {
    this.hibernateTemplate.update(eyejmdxt);
  }
  
  public Serializable saveEyejmdxt(Eyejmdxt eyejmdxt) {
    return this.hibernateTemplate.save(eyejmdxt);
  }
  
  public Eyejmdxt selectEyejmdxtByEyejmdxt(Eyejmdxt eyejmdxt) {
    Eyejmdxt eyejmdxtSelect = null;
    List<Eyejmdxt> list = this.hibernateTemplate.findByExample(eyejmdxt);
    if (list.size() >= 1)
      eyejmdxtSelect = list.get(0); 
    return eyejmdxtSelect;
  }
  
  public void deleteEyejmdxt(Eyejmdxt eyejmdxt) {
    this.hibernateTemplate.delete(eyejmdxt);
  }
}
