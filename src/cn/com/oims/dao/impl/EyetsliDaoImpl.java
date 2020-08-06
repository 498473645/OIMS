package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyetsliDao;
import cn.com.oims.dao.pojo.Eyetsli;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyetsliDaoImpl extends BaseDaoImpl implements IEyetsliDao {
  public void updateEyetsli(Eyetsli eyetsli) {
    this.hibernateTemplate.update(eyetsli);
  }
  
  public Serializable saveEyetsli(Eyetsli eyetsli) {
    return this.hibernateTemplate.save(eyetsli);
  }
  
  public Eyetsli selectEyetsliByEyetsli(Eyetsli eyetsli) {
    Eyetsli eyetsliSelect = null;
    List<Eyetsli> list = this.hibernateTemplate.findByExample(eyetsli);
    if (list.size() >= 1)
      eyetsliSelect = list.get(0); 
    return eyetsliSelect;
  }
  
  public void deleteEyetsli(Eyetsli eyetsli) {
    this.hibernateTemplate.delete(eyetsli);
  }
}
