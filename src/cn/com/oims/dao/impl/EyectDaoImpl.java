package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyectDao;
import cn.com.oims.dao.pojo.Eyect;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyectDaoImpl extends BaseDaoImpl implements IEyectDao {
  public void updateEyect(Eyect eyect) {
    this.hibernateTemplate.update(eyect);
  }
  
  public Serializable saveEyect(Eyect eyect) {
    return this.hibernateTemplate.save(eyect);
  }
  
  public Eyect selectEyectByEyect(Eyect eyect) {
    Eyect eyectSelect = null;
    List<Eyect> list = this.hibernateTemplate.findByExample(eyect);
    if (list.size() >= 1)
      eyectSelect = list.get(0); 
    return eyectSelect;
  }
  
  public void deleteEyect(Eyect eyect) {
    this.hibernateTemplate.delete(eyect);
  }
}
