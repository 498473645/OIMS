package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyezsxzDao;
import cn.com.oims.dao.pojo.Eyezsxz;
import cn.com.oims.service.IEyezsxzService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyezsxzServiceImpl implements IEyezsxzService {
  @Autowired
  private IEyezsxzDao eyezsxzdao = null;
  
  public void updateEyezsxz(Eyezsxz eyezsxz) {
    this.eyezsxzdao.updateEyezsxz(eyezsxz);
  }
  
  public Serializable saveEyezsxz(Eyezsxz eyezsxz) {
    return this.eyezsxzdao.saveEyezsxz(eyezsxz);
  }
  
  public Eyezsxz selectEyezsxzByEyezsxz(Eyezsxz eyezsxz) {
    return this.eyezsxzdao.selectEyezsxzByEyezsxz(eyezsxz);
  }
  
  public void deleteEyezsxz(Eyezsxz eyezsxz) {
    this.eyezsxzdao.deleteEyezsxz(eyezsxz);
  }
}
