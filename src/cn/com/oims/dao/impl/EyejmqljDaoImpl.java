package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyejmqljDao;
import cn.com.oims.dao.pojo.Eyejmqlj;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyejmqljDaoImpl extends BaseDaoImpl implements IEyejmqljDao {
  public void updateEyejmqlj(Eyejmqlj eyejmqlj) {
    this.hibernateTemplate.update(eyejmqlj);
  }
  
  public Serializable saveEyejmqlj(Eyejmqlj eyejmqlj) {
    return this.hibernateTemplate.save(eyejmqlj);
  }
  
  public Eyejmqlj selectEyejmqljByEyejmqlj(Eyejmqlj eyejmqlj) {
    Eyejmqlj eyejmqljSelect = null;
    List<Eyejmqlj> list = this.hibernateTemplate.findByExample(eyejmqlj);
    if (list.size() >= 1)
      eyejmqljSelect = list.get(0); 
    return eyejmqljSelect;
  }
  
  public void deleteEyejmqlj(Eyejmqlj eyejmqlj) {
    this.hibernateTemplate.delete(eyejmqlj);
  }
}
