package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeubmDao;
import cn.com.oims.dao.pojo.Eyeubm;
import cn.com.oims.service.IEyeubmService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeubmServiceImpl implements IEyeubmService {
  @Autowired
  private IEyeubmDao eyeubmdao = null;
  
  public void updateEyeubm(Eyeubm eyeubm) {
    this.eyeubmdao.updateEyeubm(eyeubm);
  }
  
  public Serializable saveEyeubm(Eyeubm eyeubm) {
    return this.eyeubmdao.saveEyeubm(eyeubm);
  }
  
  public Eyeubm selectEyeubmByEyeubm(Eyeubm eyeubm) {
    return this.eyeubmdao.selectEyeubmByEyeubm(eyeubm);
  }
  
  public void deleteEyeubm(Eyeubm eyeubm) {
    this.eyeubmdao.deleteEyeubm(eyeubm);
  }
}
