package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyexsjcDao;
import cn.com.oims.dao.pojo.Eyexsjc;
import cn.com.oims.service.IEyexsjcService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyexsjcServiceImpl implements IEyexsjcService {
  @Autowired
  private IEyexsjcDao eyexsjcdao = null;
  
  public void updateEyexsjc(Eyexsjc eyexsjc) {
    this.eyexsjcdao.updateEyexsjc(eyexsjc);
  }
  
  public Serializable saveEyexsjc(Eyexsjc eyexsjc) {
    return this.eyexsjcdao.saveEyexsjc(eyexsjc);
  }
  
  public Eyexsjc selectEyexsjcByEyexsjc(Eyexsjc eyexsjc) {
    return this.eyexsjcdao.selectEyexsjcByEyexsjc(eyexsjc);
  }
  
  public void deleteEyexsjc(Eyexsjc eyexsjc) {
    this.eyexsjcdao.deleteEyexsjc(eyexsjc);
  }
}
