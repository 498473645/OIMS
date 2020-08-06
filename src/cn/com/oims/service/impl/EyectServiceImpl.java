package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyectDao;
import cn.com.oims.dao.pojo.Eyect;
import cn.com.oims.service.IEyectService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyectServiceImpl implements IEyectService {
  @Autowired
  private IEyectDao eyectdao = null;
  
  public void updateEyect(Eyect eyect) {
    this.eyectdao.updateEyect(eyect);
  }
  
  public Serializable saveEyect(Eyect eyect) {
    return this.eyectdao.saveEyect(eyect);
  }
  
  public Eyect selectEyectByEyect(Eyect eyect) {
    return this.eyectdao.selectEyectByEyect(eyect);
  }
  
  public void deleteEyect(Eyect eyect) {
    this.eyectdao.deleteEyect(eyect);
  }
}
