package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyegcsyDao;
import cn.com.oims.dao.pojo.Eyegcsy;
import cn.com.oims.service.IEyegcsyService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IEyegcsyServiceImpl implements IEyegcsyService {
  @Autowired
  private IEyegcsyDao dao;
  
  public void updateEyegcsy(Eyegcsy eyegcsy) {
    this.dao.updateEyegcsy(eyegcsy);
  }
  
  public Serializable saveEyegcsy(Eyegcsy eyegcsy) {
    return this.dao.saveEyegcsy(eyegcsy);
  }
  
  public Eyegcsy selectEyegcsyByEyegcsy(Eyegcsy eyegcsy) {
    return this.dao.selectEyegcsyByEyegcsy(eyegcsy);
  }
  
  public void deleteEyegcsy(Eyegcsy eyegcsy) {
    this.dao.deleteEyegcsy(eyegcsy);
  }
}
