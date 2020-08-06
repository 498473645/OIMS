package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyedslzsqDao;
import cn.com.oims.dao.pojo.Eyedslzsq;
import cn.com.oims.service.IEyedslzsqService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyedslzsqServiceImpl implements IEyedslzsqService {
  @Autowired
  private IEyedslzsqDao eyedslzsqdao = null;
  
  public void updateEyedslzsq(Eyedslzsq eyedslzsq) {
    this.eyedslzsqdao.updateEyedslzsq(eyedslzsq);
  }
  
  public Serializable saveEyedslzsq(Eyedslzsq eyedslzsq) {
    return this.eyedslzsqdao.saveEyedslzsq(eyedslzsq);
  }
  
  public Eyedslzsq selectEyedslzsqByEyedslzsq(Eyedslzsq eyedslzsq) {
    return this.eyedslzsqdao.selectEyedslzsqByEyedslzsq(eyedslzsq);
  }
  
  public void deleteEyedslzsq(Eyedslzsq eyedslzsq) {
    this.eyedslzsqdao.deleteEyedslzsq(eyedslzsq);
  }
}
