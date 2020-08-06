package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyetsjzlDao;
import cn.com.oims.dao.pojo.Eyetsjzl;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyetsjzlDaoImpl extends BaseDaoImpl implements IEyetsjzlDao {
  public void updateEyetsjzl(Eyetsjzl eyetsjzl) {
    this.hibernateTemplate.update(eyetsjzl);
  }
  
  public Serializable saveEyetsjzl(Eyetsjzl eyetsjzl) {
    return this.hibernateTemplate.save(eyetsjzl);
  }
  
  public Eyetsjzl selectEyetsjzlByEyetsjzl(Eyetsjzl eyetsjzl) {
    Eyetsjzl eyetsjzlSelect = null;
    List<Eyetsjzl> list = this.hibernateTemplate.findByExample(eyetsjzl);
    if (list.size() >= 1)
      eyetsjzlSelect = list.get(0); 
    return eyetsjzlSelect;
  }
  
  public void deleteEyetsjzl(Eyetsjzl eyetsjzl) {
    this.hibernateTemplate.delete(eyetsjzl);
  }
}
