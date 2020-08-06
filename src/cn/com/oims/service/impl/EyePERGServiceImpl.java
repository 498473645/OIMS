package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyePERGDao;
import cn.com.oims.dao.pojo.EyePERG;
import cn.com.oims.service.IEyePERGService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyePERGServiceImpl implements IEyePERGService {
  @Autowired
  private IEyePERGDao eyePERGdao = null;
  
  public void updateEyePERG(EyePERG eyePERG) {
    this.eyePERGdao.updateEyePERG(eyePERG);
  }
  
  public Serializable saveEyePERG(EyePERG eyePERG) {
    return this.eyePERGdao.saveEyePERG(eyePERG);
  }
  
  public EyePERG selectEyePERGByEyePERG(EyePERG eyePERG) {
    return this.eyePERGdao.selectEyePERGByEyePERG(eyePERG);
  }
  
  public void deleteEyePERG(EyePERG eyePERG) {
    this.eyePERGdao.deleteEyePERG(eyePERG);
  }
}
