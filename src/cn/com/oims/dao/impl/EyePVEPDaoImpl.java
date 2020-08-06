package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyePVEPDao;
import cn.com.oims.dao.pojo.EyePVEP;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyePVEPDaoImpl extends BaseDaoImpl implements IEyePVEPDao {
  public void updateEyePVEP(EyePVEP eyePVEP) {
    this.hibernateTemplate.update(eyePVEP);
  }
  
  public Serializable saveEyePVEP(EyePVEP eyePVEP) {
    return this.hibernateTemplate.save(eyePVEP);
  }
  
  public EyePVEP selectEyePVEPByEyePVEP(EyePVEP eyePVEP) {
    EyePVEP eyePVEPSelect = null;
    List<EyePVEP> list = this.hibernateTemplate.findByExample(eyePVEP);
    if (list.size() >= 1)
      eyePVEPSelect = list.get(0); 
    return eyePVEPSelect;
  }
  
  public void deleteEyePVEP(EyePVEP eyePVEP) {
    this.hibernateTemplate.delete(eyePVEP);
  }
}
