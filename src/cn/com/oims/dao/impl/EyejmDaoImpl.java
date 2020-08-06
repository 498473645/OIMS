package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyejmDao;
import cn.com.oims.dao.pojo.Eyejm;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyejmDaoImpl extends BaseDaoImpl implements IEyejmDao {
  public void updateEyejm(Eyejm eyejm) {
    this.hibernateTemplate.update(eyejm);
  }
  
  public Serializable saveEyejm(Eyejm eyejm) {
    return this.hibernateTemplate.save(eyejm);
  }
  
  public Eyejm selectEyejmByEyejm(Eyejm eyejm) {
    Eyejm eyejmSelect = null;
    List<Eyejm> list = this.hibernateTemplate.findByExample(eyejm);
    if (list.size() >= 1)
      eyejmSelect = list.get(0); 
    return eyejmSelect;
  }
  
  public void deleteEyejm(Eyejm eyejm) {
    this.hibernateTemplate.delete(eyejm);
  }
}
