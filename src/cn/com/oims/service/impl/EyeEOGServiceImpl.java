package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeEOGDao;
import cn.com.oims.dao.pojo.EyeEOG;
import cn.com.oims.service.IEyeEOGService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeEOGServiceImpl implements IEyeEOGService {
  @Autowired
  private IEyeEOGDao eyeEOGdao = null;
  
  public void updateEyeEOG(EyeEOG eyeEOG) {
    this.eyeEOGdao.updateEyeEOG(eyeEOG);
  }
  
  public Serializable saveEyeEOG(EyeEOG eyeEOG) {
    return this.eyeEOGdao.saveEyeEOG(eyeEOG);
  }
  
  public EyeEOG selectEyeEOGByEyeEOG(EyeEOG eyeEOG) {
    return this.eyeEOGdao.selectEyeEOGByEyeEOG(eyeEOG);
  }
  
  public void deleteEyeEOG(EyeEOG eyeEOG) {
    this.eyeEOGdao.deleteEyeEOG(eyeEOG);
  }
}
