package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeygzyDao;
import cn.com.oims.dao.pojo.Eyeygzy;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeygzyDaoImpl extends BaseDaoImpl implements IEyeygzyDao {
  public void updateEyeygzy(Eyeygzy eyeygzy) {
    this.hibernateTemplate.update(eyeygzy);
  }
  
  public Serializable saveEyeygzy(Eyeygzy eyeygzy) {
    return this.hibernateTemplate.save(eyeygzy);
  }
  
  public Eyeygzy selectEyeygzyByEyeygzy(Eyeygzy eyeygzy) {
    Eyeygzy eyeygzySelect = null;
    List<Eyeygzy> list = this.hibernateTemplate.findByExample(eyeygzy);
    if (list.size() >= 1)
      eyeygzySelect = list.get(0); 
    return eyeygzySelect;
  }
  
  public void deleteEyeygzy(Eyeygzy eyeygzy) {
    this.hibernateTemplate.delete(eyeygzy);
  }
}
