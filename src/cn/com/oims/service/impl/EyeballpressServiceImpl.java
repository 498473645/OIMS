package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeballpressDao;
import cn.com.oims.dao.pojo.Eyeballpress;
import cn.com.oims.service.IEyeballpressService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeballpressServiceImpl implements IEyeballpressService {
  @Autowired
  private IEyeballpressDao eyeballpressdao = null;
  
  public void updateEyeballpress(Eyeballpress eyeballpress) {
    this.eyeballpressdao.updateEyeballpress(eyeballpress);
  }
  
  public Serializable saveEyeballpress(Eyeballpress eyeballpress) {
    return this.eyeballpressdao.saveEyeballpress(eyeballpress);
  }
  
  public Eyeballpress selectEyeballpressByEyeballpress(Eyeballpress eyeballpress) {
    return this.eyeballpressdao.selectEyeballpressByEyeballpress(eyeballpress);
  }
  
  public void deleteEyeballpress(Eyeballpress eyeballpress) {
    this.eyeballpressdao.deleteEyeballpress(eyeballpress);
  }
}
