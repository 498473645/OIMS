package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyetsjjfwDao;
import cn.com.oims.dao.pojo.Eyetsjjfw;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyetsjjfwDaoImpl extends BaseDaoImpl implements IEyetsjjfwDao {
  public void updateEyetsjjfw(Eyetsjjfw eyetsjjfw) {
    this.hibernateTemplate.update(eyetsjjfw);
  }
  
  public Serializable saveEyetsjjfw(Eyetsjjfw eyetsjjfw) {
    return this.hibernateTemplate.save(eyetsjjfw);
  }
  
  public Eyetsjjfw selectEyetsjjfwByEyetsjjfw(Eyetsjjfw eyetsjjfw) {
    Eyetsjjfw eyetsjjfwSelect = null;
    List<Eyetsjjfw> list = this.hibernateTemplate.findByExample(eyetsjjfw);
    if (list.size() >= 1)
      eyetsjjfwSelect = list.get(0); 
    return eyetsjjfwSelect;
  }
  
  public void deleteEyetsjjfw(Eyetsjjfw eyetsjjfw) {
    this.hibernateTemplate.delete(eyetsjjfw);
  }
}
