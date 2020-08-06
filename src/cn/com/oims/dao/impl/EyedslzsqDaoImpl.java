package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyedslzsqDao;
import cn.com.oims.dao.pojo.Eyedslzsq;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyedslzsqDaoImpl extends BaseDaoImpl implements IEyedslzsqDao {
  public void updateEyedslzsq(Eyedslzsq eyedslzsq) {
    this.hibernateTemplate.update(eyedslzsq);
  }
  
  public Serializable saveEyedslzsq(Eyedslzsq eyedslzsq) {
    return this.hibernateTemplate.save(eyedslzsq);
  }
  
  public Eyedslzsq selectEyedslzsqByEyedslzsq(Eyedslzsq eyedslzsq) {
    Eyedslzsq eyedslzsqSelect = null;
    List<Eyedslzsq> list = this.hibernateTemplate.findByExample(eyedslzsq);
    if (list.size() >= 1)
      eyedslzsqSelect = list.get(0); 
    return eyedslzsqSelect;
  }
  
  public void deleteEyedslzsq(Eyedslzsq eyedslzsq) {
    this.hibernateTemplate.delete(eyedslzsq);
  }
}
