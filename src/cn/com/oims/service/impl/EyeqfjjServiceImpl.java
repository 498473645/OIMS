package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeqfjjDao;
import cn.com.oims.dao.pojo.Eyeqfjj;
import cn.com.oims.service.IEyeqfjjService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeqfjjServiceImpl implements IEyeqfjjService {
  @Autowired
  private IEyeqfjjDao eyeqfjjdao = null;
  
  public void updateEyeqfjj(Eyeqfjj eyeqfjj) {
    this.eyeqfjjdao.updateEyeqfjj(eyeqfjj);
  }
  
  public Serializable saveEyeqfjj(Eyeqfjj eyeqfjj) {
    return this.eyeqfjjdao.saveEyeqfjj(eyeqfjj);
  }
  
  public Eyeqfjj selectEyeqfjjByEyeqfjj(Eyeqfjj eyeqfjj) {
    return this.eyeqfjjdao.selectEyeqfjjByEyeqfjj(eyeqfjj);
  }
  
  public void deleteEyeqfjj(Eyeqfjj eyeqfjj) {
    this.eyeqfjjdao.deleteEyeqfjj(eyeqfjj);
  }
}
