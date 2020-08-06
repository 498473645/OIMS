package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyesmjDao;
import cn.com.oims.dao.pojo.Eyesmj;
import cn.com.oims.service.IEyesmjService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyesmjServiceImpl implements IEyesmjService {
  @Autowired
  private IEyesmjDao eyesmjdao = null;
  
  public void updateEyesmj(Eyesmj eyesmj) {
    this.eyesmjdao.updateEyesmj(eyesmj);
  }
  
  public Serializable saveEyesmj(Eyesmj eyesmj) {
    return this.eyesmjdao.saveEyesmj(eyesmj);
  }
  
  public Eyesmj selectEyesmjByEyesmj(Eyesmj eyesmj) {
    return this.eyesmjdao.selectEyesmjByEyesmj(eyesmj);
  }
  
  public void deleteEyesmj(Eyesmj eyesmj) {
    this.eyesmjdao.deleteEyesmj(eyesmj);
  }
}
