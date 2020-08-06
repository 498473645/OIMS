package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyesjjcDao;
import cn.com.oims.dao.pojo.Eyesjjc;
import cn.com.oims.service.IEyesjjcService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyesjjcServiceImpl implements IEyesjjcService {
  @Autowired
  private IEyesjjcDao eyesjjcdao = null;
  
  public void updateEyesjjc(Eyesjjc eyesjjc) {
    this.eyesjjcdao.updateEyesjjc(eyesjjc);
  }
  
  public Serializable saveEyesjjc(Eyesjjc eyesjjc) {
    return this.eyesjjcdao.saveEyesjjc(eyesjjc);
  }
  
  public Eyesjjc selectEyesjjcByEyesjjc(Eyesjjc eyesjjc) {
    return this.eyesjjcdao.selectEyesjjcByEyesjjc(eyesjjc);
  }
  
  public void deleteEyesjjc(Eyesjjc eyesjjc) {
    this.eyesjjcdao.deleteEyesjjc(eyesjjc);
  }
}
