package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyegcsyDao;
import cn.com.oims.dao.pojo.Eyegcsy;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyegcsyDaoImpl extends BaseDaoImpl implements IEyegcsyDao {
  public void updateEyegcsy(Eyegcsy eyegcsy) {
    this.hibernateTemplate.update(eyegcsy);
  }
  
  public Serializable saveEyegcsy(Eyegcsy eyegcsy) {
    return this.hibernateTemplate.save(eyegcsy);
  }
  
  public Eyegcsy selectEyegcsyByEyegcsy(Eyegcsy eyegcsy) {
    Eyegcsy eyegcsyaSelect = null;
    List<Eyegcsy> list = this.hibernateTemplate.findByExample(eyegcsy);
    if (list.size() >= 1)
      eyegcsyaSelect = list.get(0); 
    return eyegcsyaSelect;
  }
  
  public void deleteEyegcsy(Eyegcsy eyegcsy) {
    this.hibernateTemplate.delete(eyegcsy);
  }
}
