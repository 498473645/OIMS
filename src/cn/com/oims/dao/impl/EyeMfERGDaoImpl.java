package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeMfERGDao;
import cn.com.oims.dao.pojo.EyeMfERG;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeMfERGDaoImpl extends BaseDaoImpl implements IEyeMfERGDao {
  public void updateEyeMfErg(EyeMfERG eyeMfErg) {
    this.hibernateTemplate.update(eyeMfErg);
  }
  
  public Serializable saveEyeMfErg(EyeMfERG eyeMfErg) {
    return this.hibernateTemplate.save(eyeMfErg);
  }
  
  public EyeMfERG selectEyeMfErgByEyeMfErg(EyeMfERG eyeMfErg) {
    EyeMfERG eyeMfErgSelect = null;
    List<EyeMfERG> list = this.hibernateTemplate.findByExample(eyeMfErg);
    if (list.size() >= 1)
      eyeMfErgSelect = list.get(0); 
    return eyeMfErgSelect;
  }
  
  public void deleteEyeMfErg(EyeMfERG eyeMfErg) {
    this.hibernateTemplate.delete(eyeMfErg);
  }
}
