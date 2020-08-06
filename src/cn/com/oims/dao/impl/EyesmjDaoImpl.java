package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyesmjDao;
import cn.com.oims.dao.pojo.Eyesmj;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyesmjDaoImpl extends BaseDaoImpl implements IEyesmjDao {
  public void updateEyesmj(Eyesmj eyesmj) {
    this.hibernateTemplate.update(eyesmj);
  }
  
  public Serializable saveEyesmj(Eyesmj eyesmj) {
    return this.hibernateTemplate.save(eyesmj);
  }
  
  public Eyesmj selectEyesmjByEyesmj(Eyesmj eyesmj) {
    Eyesmj eyesmjSelect = null;
    List<Eyesmj> list = this.hibernateTemplate.findByExample(eyesmj);
    if (list.size() >= 1)
      eyesmjSelect = list.get(0); 
    return eyesmjSelect;
  }
  
  public void deleteEyesmj(Eyesmj eyesmj) {
    this.hibernateTemplate.delete(eyesmj);
  }
}
