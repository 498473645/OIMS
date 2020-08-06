package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeFERGDao;
import cn.com.oims.dao.pojo.EyeFERG;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeFERGDaoImpl extends BaseDaoImpl implements IEyeFERGDao {
  public void updateEyeFERG(EyeFERG eyeFERG) {
    this.hibernateTemplate.update(eyeFERG);
  }
  
  public Serializable saveEyeFERG(EyeFERG eyeFERG) {
    return this.hibernateTemplate.save(eyeFERG);
  }
  
  public EyeFERG selectEyeFERGByEyeFERG(EyeFERG eyeFERG) {
    EyeFERG eyeFERGSelect = null;
    List<EyeFERG> list = this.hibernateTemplate.findByExample(eyeFERG);
    if (list.size() >= 1)
      eyeFERGSelect = list.get(0); 
    return eyeFERGSelect;
  }
  
  public void deleteEyeFERG(EyeFERG eyeFERG) {
    this.hibernateTemplate.delete(eyeFERG);
  }
}
