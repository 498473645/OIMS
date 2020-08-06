package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeFVEPDao;
import cn.com.oims.dao.pojo.EyeFVEP;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeFVEPDaoImpl extends BaseDaoImpl implements IEyeFVEPDao {
  public Serializable saveEyeFVEP(EyeFVEP eyeFVEP) {
    return this.hibernateTemplate.save(eyeFVEP);
  }
  
  public EyeFVEP selectEyeFVEPByEyeFVEP(EyeFVEP eyeFVEP) {
    EyeFVEP eyeFVEPSelect = null;
    List<EyeFVEP> list = this.hibernateTemplate.findByExample(eyeFVEP);
    if (list.size() >= 1)
      eyeFVEPSelect = list.get(0); 
    return eyeFVEPSelect;
  }
  
  public void deleteEyeFVEP(EyeFVEP eyeFVEP) {
    this.hibernateTemplate.delete(eyeFVEP);
  }
  
  public void updateEyeFVEP(EyeFVEP eyeFVEP) {
    this.hibernateTemplate.update(eyeFVEP);
  }
}
