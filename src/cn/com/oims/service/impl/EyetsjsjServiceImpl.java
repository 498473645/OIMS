package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyetsjsjDao;
import cn.com.oims.dao.pojo.Eyetsjsj;
import cn.com.oims.service.IEyetsjsjService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyetsjsjServiceImpl implements IEyetsjsjService {
  @Autowired
  private IEyetsjsjDao eyetsjsjdao = null;
  
  public void updateEyetsjsj(Eyetsjsj eyetsjsj) {
    this.eyetsjsjdao.updateEyetsjsj(eyetsjsj);
  }
  
  public Serializable saveEyetsjsj(Eyetsjsj eyetsjsj) {
    return this.eyetsjsjdao.saveEyetsjsj(eyetsjsj);
  }
  
  public Eyetsjsj selectEyetsjsjByEyetsjsj(Eyetsjsj eyetsjsj) {
    return this.eyetsjsjdao.selectEyetsjsjByEyetsjsj(eyetsjsj);
  }
  
  public void deleteEyetsjsj(Eyetsjsj eyetsjsj) {
    this.eyetsjsjdao.deleteEyetsjsj(eyetsjsj);
  }
}
