package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyetsjsjDao;
import cn.com.oims.dao.pojo.Eyetsjsj;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyetsjsjDaoImpl extends BaseDaoImpl implements IEyetsjsjDao {
  public void updateEyetsjsj(Eyetsjsj eyetsjsj) {
    this.hibernateTemplate.update(eyetsjsj);
  }
  
  public Serializable saveEyetsjsj(Eyetsjsj eyetsjsj) {
    return this.hibernateTemplate.save(eyetsjsj);
  }
  
  public Eyetsjsj selectEyetsjsjByEyetsjsj(Eyetsjsj eyetsjsj) {
    Eyetsjsj eyetsjsjSelect = null;
    List<Eyetsjsj> list = this.hibernateTemplate.findByExample(eyetsjsj);
    if (list.size() >= 1)
      eyetsjsjSelect = list.get(0); 
    return eyetsjsjSelect;
  }
  
  public void deleteEyetsjsj(Eyetsjsj eyetsjsj) {
    this.hibernateTemplate.delete(eyetsjsj);
  }
}
