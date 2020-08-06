package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyejmspjsDao;
import cn.com.oims.dao.pojo.Eyejmspjs;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyejmspjsDaoImpl extends BaseDaoImpl implements IEyejmspjsDao {
  public void updateEyejmspjs(Eyejmspjs eyejmspjs) {
    this.hibernateTemplate.update(eyejmspjs);
  }
  
  public Serializable saveEyejmspjs(Eyejmspjs eyejmspjs) {
    return this.hibernateTemplate.save(eyejmspjs);
  }
  
  public Eyejmspjs selectEyejmspjsByEyejmspjs(Eyejmspjs eyejmspjs) {
    Eyejmspjs eyejmspjsSelect = null;
    List<Eyejmspjs> list = this.hibernateTemplate.findByExample(eyejmspjs);
    if (list.size() >= 1)
      eyejmspjsSelect = list.get(0); 
    return eyejmspjsSelect;
  }
  
  public void deleteEyejmspjs(Eyejmspjs eyejmspjs) {
    this.hibernateTemplate.delete(eyejmspjs);
  }
}
