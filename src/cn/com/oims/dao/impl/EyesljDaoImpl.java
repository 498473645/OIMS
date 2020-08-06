package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyesljDao;
import cn.com.oims.dao.pojo.Eyeslj;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyesljDaoImpl extends BaseDaoImpl implements IEyesljDao {
  public void updateEyeslj(Eyeslj eyeslj) {
    this.hibernateTemplate.update(eyeslj);
  }
  
  public Serializable saveEyeslj(Eyeslj eyeslj) {
    return this.hibernateTemplate.save(eyeslj);
  }
  
  public Eyeslj selectEyesljByEyeslj(Eyeslj eyeslj) {
    Eyeslj eyesljSelect = null;
    List<Eyeslj> list = this.hibernateTemplate.findByExample(eyeslj);
    if (list.size() >= 1)
      eyesljSelect = list.get(0); 
    return eyesljSelect;
  }
  
  public void deleteEyeslj(Eyeslj eyeslj) {
    this.hibernateTemplate.delete(eyeslj);
  }
}
