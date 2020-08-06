package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyejmspjsDao;
import cn.com.oims.dao.pojo.Eyejmspjs;
import cn.com.oims.service.IEyejmspjsService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyejmspjsServiceImpl implements IEyejmspjsService {
  @Autowired
  private IEyejmspjsDao eyejmspjsdao = null;
  
  public void updateEyejmspjs(Eyejmspjs eyejmspjs) {
    this.eyejmspjsdao.updateEyejmspjs(eyejmspjs);
  }
  
  public Serializable saveEyejmspjs(Eyejmspjs eyejmspjs) {
    return this.eyejmspjsdao.saveEyejmspjs(eyejmspjs);
  }
  
  public Eyejmspjs selectEyejmspjsByEyejmspjs(Eyejmspjs eyejmspjs) {
    return this.eyejmspjsdao.selectEyejmspjsByEyejmspjs(eyejmspjs);
  }
  
  public void deleteEyejmspjs(Eyejmspjs eyejmspjs) {
    this.eyejmspjsdao.deleteEyejmspjs(eyejmspjs);
  }
}
