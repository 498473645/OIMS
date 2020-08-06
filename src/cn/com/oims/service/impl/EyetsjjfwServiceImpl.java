package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyetsjjfwDao;
import cn.com.oims.dao.pojo.Eyetsjjfw;
import cn.com.oims.service.IEyetsjjfwService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyetsjjfwServiceImpl implements IEyetsjjfwService {
  @Autowired
  private IEyetsjjfwDao eyetsjjfwdao = null;
  
  public void updateEyetsjjfw(Eyetsjjfw eyetsjjfw) {
    this.eyetsjjfwdao.updateEyetsjjfw(eyetsjjfw);
  }
  
  public Serializable saveEyetsjjfw(Eyetsjjfw eyetsjjfw) {
    return this.eyetsjjfwdao.saveEyetsjjfw(eyetsjjfw);
  }
  
  public Eyetsjjfw selectEyetsjjfwByEyetsjjfw(Eyetsjjfw eyetsjjfw) {
    return this.eyetsjjfwdao.selectEyetsjjfwByEyetsjjfw(eyetsjjfw);
  }
  
  public void deleteEyetsjjfw(Eyetsjjfw eyetsjjfw) {
    this.eyetsjjfwdao.deleteEyetsjjfw(eyetsjjfw);
  }
}
