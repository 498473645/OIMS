package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyesjjcDao;
import cn.com.oims.dao.pojo.Eyesjjc;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyesjjcDaoImpl extends BaseDaoImpl implements IEyesjjcDao {
  public void updateEyesjjc(Eyesjjc eyesjjc) {
    this.hibernateTemplate.update(eyesjjc);
  }
  
  public Serializable saveEyesjjc(Eyesjjc eyesjjc) {
    return this.hibernateTemplate.save(eyesjjc);
  }
  
  public Eyesjjc selectEyesjjcByEyesjjc(Eyesjjc eyesjjc) {
    Eyesjjc eyesjjcSelect = null;
    List<Eyesjjc> list = this.hibernateTemplate.findByExample(eyesjjc);
    if (list.size() >= 1)
      eyesjjcSelect = list.get(0); 
    return eyesjjcSelect;
  }
  
  public void deleteEyesjjc(Eyesjjc eyesjjc) {
    this.hibernateTemplate.delete(eyesjjc);
  }
}
