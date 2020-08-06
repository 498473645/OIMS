package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeywyjDao;
import cn.com.oims.dao.pojo.Eyeywyj;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeywyjDaoImpl extends BaseDaoImpl implements IEyeywyjDao {
  public void updateEyeywyj(Eyeywyj eyeywyj) {
    this.hibernateTemplate.update(eyeywyj);
  }
  
  public Serializable saveEyeywyj(Eyeywyj eyeywyj) {
    return this.hibernateTemplate.save(eyeywyj);
  }
  
  public Eyeywyj selectEyeywyjByEyeywyj(Eyeywyj eyeywyj) {
    Eyeywyj eyeywyjSelect = null;
    List<Eyeywyj> list = this.hibernateTemplate.findByExample(eyeywyj);
    if (list.size() >= 1)
      eyeywyjSelect = list.get(0); 
    return eyeywyjSelect;
  }
  
  public void deleteEyeywyj(Eyeywyj eyeywyj) {
    this.hibernateTemplate.delete(eyeywyj);
  }
}
