package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyePVEPDao;
import cn.com.oims.dao.pojo.EyePVEP;
import cn.com.oims.service.IEyePVEPService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyePVEPServiceImpl implements IEyePVEPService {
  @Autowired
  private IEyePVEPDao eyePVEPdao = null;
  
  public void updateEyePVEP(EyePVEP eyePVEP) {
    this.eyePVEPdao.updateEyePVEP(eyePVEP);
  }
  
  public Serializable saveEyePVEP(EyePVEP eyePVEP) {
    return this.eyePVEPdao.saveEyePVEP(eyePVEP);
  }
  
  public EyePVEP selectEyePVEPByEyePVEP(EyePVEP eyePVEP) {
    return this.eyePVEPdao.selectEyePVEPByEyePVEP(eyePVEP);
  }
  
  public void deleteEyePVEP(EyePVEP eyePVEP) {
    this.eyePVEPdao.deleteEyePVEP(eyePVEP);
  }
}
