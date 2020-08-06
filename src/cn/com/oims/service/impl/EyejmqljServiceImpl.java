package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyejmqljDao;
import cn.com.oims.dao.pojo.Eyejmqlj;
import cn.com.oims.service.IEyejmqljService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyejmqljServiceImpl implements IEyejmqljService {
  @Autowired
  private IEyejmqljDao eyejmqljdao = null;
  
  public void updateEyejmqlj(Eyejmqlj eyejmqlj) {
    this.eyejmqljdao.updateEyejmqlj(eyejmqlj);
  }
  
  public Serializable saveEyejmqlj(Eyejmqlj eyejmqlj) {
    return this.eyejmqljdao.saveEyejmqlj(eyejmqlj);
  }
  
  public Eyejmqlj selectEyejmqljByEyejmqlj(Eyejmqlj eyejmqlj) {
    return this.eyejmqljdao.selectEyejmqljByEyejmqlj(eyejmqlj);
  }
  
  public void deleteEyejmqlj(Eyejmqlj eyejmqlj) {
    this.eyejmqljdao.deleteEyejmqlj(eyejmqlj);
  }
}
