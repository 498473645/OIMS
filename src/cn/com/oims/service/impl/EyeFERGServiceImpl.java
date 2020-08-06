package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeFERGDao;
import cn.com.oims.dao.pojo.EyeFERG;
import cn.com.oims.service.IEyeFERGService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeFERGServiceImpl implements IEyeFERGService {
  @Autowired
  private IEyeFERGDao eyefergdao = null;
  
  public void updateEyeFERG(EyeFERG eyeFERG) {
    this.eyefergdao.updateEyeFERG(eyeFERG);
  }
  
  public Serializable saveEyeFERG(EyeFERG eyeFERG) {
    return this.eyefergdao.saveEyeFERG(eyeFERG);
  }
  
  public EyeFERG selectEyeFERGByEyeFERG(EyeFERG eyeFERG) {
    return this.eyefergdao.selectEyeFERGByEyeFERG(eyeFERG);
  }
  
  public void deleteEyeFERG(EyeFERG eyeFERG) {
    this.eyefergdao.deleteEyeFERG(eyeFERG);
  }
}
