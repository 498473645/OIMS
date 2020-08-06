package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyesljDao;
import cn.com.oims.dao.pojo.Eyeslj;
import cn.com.oims.service.IEyesljService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyesljServiceImpl implements IEyesljService {
  @Autowired
  private IEyesljDao eyesljdao = null;
  
  public void updateEyeslj(Eyeslj eyeslj) {
    this.eyesljdao.updateEyeslj(eyeslj);
  }
  
  public Serializable saveEyeslj(Eyeslj eyeslj) {
    return this.eyesljdao.saveEyeslj(eyeslj);
  }
  
  public Eyeslj selectEyesljByEyeslj(Eyeslj eyeslj) {
    return this.eyesljdao.selectEyesljByEyeslj(eyeslj);
  }
  
  public void deleteEyeslj(Eyeslj eyeslj) {
    this.eyesljdao.deleteEyeslj(eyeslj);
  }
}
