package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeygzyDao;
import cn.com.oims.dao.pojo.Eyeygzy;
import cn.com.oims.service.IEyeygzyService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeygzyServiceImpl implements IEyeygzyService {
  @Autowired
  private IEyeygzyDao eyeygzydao = null;
  
  public void updateEyeygzy(Eyeygzy eyeygzy) {
    this.eyeygzydao.updateEyeygzy(eyeygzy);
  }
  
  public Serializable saveEyeygzy(Eyeygzy eyeygzy) {
    return this.eyeygzydao.saveEyeygzy(eyeygzy);
  }
  
  public Eyeygzy selectEyeygzyByEyeygzy(Eyeygzy eyeygzy) {
    return this.eyeygzydao.selectEyeygzyByEyeygzy(eyeygzy);
  }
  
  public void deleteEyeygzy(Eyeygzy eyeygzy) {
    this.eyeygzydao.deleteEyeygzy(eyeygzy);
  }
}
