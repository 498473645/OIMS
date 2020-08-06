package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyePERGDao;
import cn.com.oims.dao.pojo.EyePERG;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyePERGDaoImpl extends BaseDaoImpl implements IEyePERGDao {
  public void updateEyePERG(EyePERG eyePERG) {
    this.hibernateTemplate.update(eyePERG);
  }
  
  public Serializable saveEyePERG(EyePERG eyePERG) {
    return this.hibernateTemplate.save(eyePERG);
  }
  
  public EyePERG selectEyePERGByEyePERG(EyePERG eyePERG) {
    EyePERG eyePERGSelect = null;
    List<EyePERG> list = this.hibernateTemplate.findByExample(eyePERG);
    if (list.size() >= 1)
      eyePERGSelect = list.get(0); 
    return eyePERGSelect;
  }
  
  public void deleteEyePERG(EyePERG eyePERG) {
    this.hibernateTemplate.delete(eyePERG);
  }
}
