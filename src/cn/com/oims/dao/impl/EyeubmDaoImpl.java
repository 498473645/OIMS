package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeubmDao;
import cn.com.oims.dao.pojo.Eyeubm;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeubmDaoImpl extends BaseDaoImpl implements IEyeubmDao {
  public void updateEyeubm(Eyeubm eyeubm) {
    this.hibernateTemplate.update(eyeubm);
  }
  
  public Serializable saveEyeubm(Eyeubm eyeubm) {
    return this.hibernateTemplate.save(eyeubm);
  }
  
  public Eyeubm selectEyeubmByEyeubm(Eyeubm eyeubm) {
    Eyeubm eyeubmSelect = null;
    List<Eyeubm> list = this.hibernateTemplate.findByExample(eyeubm);
    if (list.size() >= 1)
      eyeubmSelect = list.get(0); 
    return eyeubmSelect;
  }
  
  public void deleteEyeubm(Eyeubm eyeubm) {
    this.hibernateTemplate.delete(eyeubm);
  }
}
