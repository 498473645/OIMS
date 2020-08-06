package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyetsjzlDao;
import cn.com.oims.dao.pojo.Eyetsjzl;
import cn.com.oims.service.IEyetsjzlService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyetsjzlServiceImpl implements IEyetsjzlService {
  @Autowired
  private IEyetsjzlDao eyetsjzldao = null;
  
  public void updateEyetsjzl(Eyetsjzl eyetsjzl) {
    this.eyetsjzldao.updateEyetsjzl(eyetsjzl);
  }
  
  public Serializable saveEyetsjzl(Eyetsjzl eyetsjzl) {
    return this.eyetsjzldao.saveEyetsjzl(eyetsjzl);
  }
  
  public Eyetsjzl selectEyetsjzlByEyetsjzl(Eyetsjzl eyetsjzl) {
    return this.eyetsjzldao.selectEyetsjzlByEyetsjzl(eyetsjzl);
  }
  
  public void deleteEyetsjzl(Eyetsjzl eyetsjzl) {
    this.eyetsjzldao.deleteEyetsjzl(eyetsjzl);
  }
}
