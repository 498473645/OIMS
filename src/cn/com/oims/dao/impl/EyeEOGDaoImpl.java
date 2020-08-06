package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeEOGDao;
import cn.com.oims.dao.pojo.EyeEOG;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeEOGDaoImpl extends BaseDaoImpl implements IEyeEOGDao {
  public void updateEyeEOG(EyeEOG eyeEOG) {
    this.hibernateTemplate.update(eyeEOG);
  }
  
  public Serializable saveEyeEOG(EyeEOG eyeEOG) {
    return this.hibernateTemplate.save(eyeEOG);
  }
  
  public EyeEOG selectEyeEOGByEyeEOG(EyeEOG eyeEOG) {
    EyeEOG eyeEOGSelect = null;
    List<EyeEOG> list = this.hibernateTemplate.findByExample(eyeEOG);
    if (list.size() >= 1)
      eyeEOGSelect = list.get(0); 
    return eyeEOGSelect;
  }
  
  public void deleteEyeEOG(EyeEOG eyeEOG) {
    this.hibernateTemplate.delete(eyeEOG);
  }
}
