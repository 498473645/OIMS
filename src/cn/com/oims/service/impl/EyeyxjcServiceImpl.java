package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeyxjcDao;
import cn.com.oims.dao.pojo.Eyeyxjc;
import cn.com.oims.service.IEyeyxjcService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeyxjcServiceImpl implements IEyeyxjcService {
  @Autowired
  private IEyeyxjcDao eyeyxjcdao = null;
  
  public void updateEyeyxjc(Eyeyxjc eyeyxjc) {
    this.eyeyxjcdao.updateEyeyxjc(eyeyxjc);
  }
  
  public Serializable saveEyeyxjc(Eyeyxjc eyeyxjc) {
    return this.eyeyxjcdao.saveEyeyxjc(eyeyxjc);
  }
  
  public Eyeyxjc selectEyeyxjcByEyeyxjc(Eyeyxjc eyeyxjc) {
    return this.eyeyxjcdao.selectEyeyxjcByEyeyxjc(eyeyxjc);
  }
  
  public void deleteEyeyxjc(Eyeyxjc eyeyxjc) {
    this.eyeyxjcdao.deleteEyeyxjc(eyeyxjc);
  }
}
