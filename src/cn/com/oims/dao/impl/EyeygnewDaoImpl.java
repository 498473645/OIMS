package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeygnewDao;
import cn.com.oims.dao.pojo.Eyeygnew;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeygnewDaoImpl extends BaseDaoImpl implements IEyeygnewDao {
  public void updateEyeygnew(Eyeygnew eyeygnew) {
    this.hibernateTemplate.update(eyeygnew);
  }
  
  public Serializable saveEyeygnew(Eyeygnew eyeygnew) {
    return this.hibernateTemplate.save(eyeygnew);
  }
  
  public Eyeygnew selectEyeygnewByEyeygnew(Eyeygnew eyeygnew) {
    Eyeygnew eyeygnewSelect = null;
    List<Eyeygnew> list = this.hibernateTemplate.findByExample(eyeygnew);
    if (list.size() >= 1)
      eyeygnewSelect = list.get(0); 
    return eyeygnewSelect;
  }
  
  public void deleteEyeygnew(Eyeygnew eyeygnew) {
    this.hibernateTemplate.delete(eyeygnew);
  }
}
