package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeFVEPDao;
import cn.com.oims.dao.pojo.EyeFVEP;
import cn.com.oims.service.IEyeFVEPService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeFVEPServiceImpl implements IEyeFVEPService {
  @Autowired
  private IEyeFVEPDao eyeFVEPdao = null;
  
  public void updateEyeFVEP(EyeFVEP eyeFVEP) {
    this.eyeFVEPdao.updateEyeFVEP(eyeFVEP);
  }
  
  public Serializable saveEyeFVEP(EyeFVEP eyeFVEP) {
    return this.eyeFVEPdao.saveEyeFVEP(eyeFVEP);
  }
  
  public EyeFVEP selectEyeFVEPByEyeFVEP(EyeFVEP eyeFVEP) {
    return this.eyeFVEPdao.selectEyeFVEPByEyeFVEP(eyeFVEP);
  }
  
  public void deleteEyeFVEP(EyeFVEP eyeFVEP) {
    this.eyeFVEPdao.deleteEyeFVEP(eyeFVEP);
  }
}
