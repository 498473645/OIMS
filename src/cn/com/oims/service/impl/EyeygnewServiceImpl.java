package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeygnewDao;
import cn.com.oims.dao.pojo.Eyeygnew;
import cn.com.oims.service.IEyeygnewService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeygnewServiceImpl implements IEyeygnewService {
  @Autowired
  private IEyeygnewDao eyeygnewdao = null;
  
  public void updateEyeygnew(Eyeygnew eyeygnew) {
    this.eyeygnewdao.updateEyeygnew(eyeygnew);
  }
  
  public Serializable saveEyeygnew(Eyeygnew eyeygnew) {
    return this.eyeygnewdao.saveEyeygnew(eyeygnew);
  }
  
  public Eyeygnew selectEyeygnewByEyeygnew(Eyeygnew eyeygnew) {
    return this.eyeygnewdao.selectEyeygnewByEyeygnew(eyeygnew);
  }
  
  public void deleteEyeygnew(Eyeygnew eyeygnew) {
    this.eyeygnewdao.deleteEyeygnew(eyeygnew);
  }
}
