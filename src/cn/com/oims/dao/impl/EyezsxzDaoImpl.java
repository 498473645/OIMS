package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyezsxzDao;
import cn.com.oims.dao.pojo.Eyezsxz;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyezsxzDaoImpl extends BaseDaoImpl implements IEyezsxzDao {
  public void updateEyezsxz(Eyezsxz eyezsxz) {
    this.hibernateTemplate.update(eyezsxz);
  }
  
  public Serializable saveEyezsxz(Eyezsxz eyezsxz) {
    return this.hibernateTemplate.save(eyezsxz);
  }
  
  public Eyezsxz selectEyezsxzByEyezsxz(Eyezsxz eyezsxz) {
    Eyezsxz eyezsxzSelect = null;
    List<Eyezsxz> list = this.hibernateTemplate.findByExample(eyezsxz);
    if (list.size() >= 1)
      eyezsxzSelect = list.get(0); 
    return eyezsxzSelect;
  }
  
  public void deleteEyezsxz(Eyezsxz eyezsxz) {
    this.hibernateTemplate.delete(eyezsxz);
  }
}
