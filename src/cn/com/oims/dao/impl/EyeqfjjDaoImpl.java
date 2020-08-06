package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeqfjjDao;
import cn.com.oims.dao.pojo.Eyeqfjj;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeqfjjDaoImpl extends BaseDaoImpl implements IEyeqfjjDao {
  public void updateEyeqfjj(Eyeqfjj eyeqfjj) {
    this.hibernateTemplate.update(eyeqfjj);
  }
  
  public Serializable saveEyeqfjj(Eyeqfjj eyeqfjj) {
    return this.hibernateTemplate.save(eyeqfjj);
  }
  
  public Eyeqfjj selectEyeqfjjByEyeqfjj(Eyeqfjj eyeqfjj) {
    Eyeqfjj eyeqfjjSelect = null;
    List<Eyeqfjj> list = this.hibernateTemplate.findByExample(eyeqfjj);
    if (list.size() >= 1)
      eyeqfjjSelect = list.get(0); 
    return eyeqfjjSelect;
  }
  
  public void deleteEyeqfjj(Eyeqfjj eyeqfjj) {
    this.hibernateTemplate.delete(eyeqfjj);
  }
}
