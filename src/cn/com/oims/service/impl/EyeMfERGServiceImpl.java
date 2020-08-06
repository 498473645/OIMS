package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeMfERGDao;
import cn.com.oims.dao.pojo.EyeMfERG;
import cn.com.oims.service.IEyeMfERGService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeMfERGServiceImpl implements IEyeMfERGService {
  @Autowired
  private IEyeMfERGDao eyeMfERGdao;
  
  public void updateEyeMfErg(EyeMfERG eyeMfErg) {
    this.eyeMfERGdao.updateEyeMfErg(eyeMfErg);
  }
  
  public Serializable saveEyeMfErg(EyeMfERG eyeMfErg) {
    return this.eyeMfERGdao.saveEyeMfErg(eyeMfErg);
  }
  
  public EyeMfERG selectEyeMfErgByEyeMfErg(EyeMfERG eyeMfErg) {
    return this.eyeMfERGdao.selectEyeMfErgByEyeMfErg(eyeMfErg);
  }
  
  public void deleteEyeMfErg(EyeMfERG eyeMfErg) {
    this.eyeMfERGdao.deleteEyeMfErg(eyeMfErg);
  }
}
