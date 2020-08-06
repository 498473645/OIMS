package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeRetcamDao;
import cn.com.oims.dao.pojo.EyeRetcam;
import cn.com.oims.service.IEyeRetcamService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeRetcamServiceImpl implements IEyeRetcamService {
  @Autowired
  private IEyeRetcamDao eyeRetcamdao = null;
  
  public void updateEyeRetcam(EyeRetcam eyeRetcam) {
    this.eyeRetcamdao.updateEyeRetcam(eyeRetcam);
  }
  
  public Serializable saveEyeRetcam(EyeRetcam eyeRetcam) {
    return this.eyeRetcamdao.saveEyeRetcam(eyeRetcam);
  }
  
  public EyeRetcam selectEyeRetcamByEyeRetcam(EyeRetcam eyeRetcam) {
    return this.eyeRetcamdao.selectEyeRetcamByEyeRetcam(eyeRetcam);
  }
  
  public void deleteEyeRetcam(EyeRetcam eyeRetcam) {
    this.eyeRetcamdao.deleteEyeRetcam(eyeRetcam);
  }
}
