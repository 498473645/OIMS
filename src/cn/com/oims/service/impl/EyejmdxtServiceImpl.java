package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyejmdxtDao;
import cn.com.oims.dao.pojo.Eyejmdxt;
import cn.com.oims.service.IEyejmdxtService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyejmdxtServiceImpl implements IEyejmdxtService {
  @Autowired
  private IEyejmdxtDao eyejmdxtdao = null;
  
  public void updateEyejmdxt(Eyejmdxt eyejmdxt) {
    this.eyejmdxtdao.updateEyejmdxt(eyejmdxt);
  }
  
  public Serializable saveEyejmdxt(Eyejmdxt eyejmdxt) {
    return this.eyejmdxtdao.saveEyejmdxt(eyejmdxt);
  }
  
  public Eyejmdxt selectEyejmdxtByEyejmdxt(Eyejmdxt eyejmdxt) {
    return this.eyejmdxtdao.selectEyejmdxtByEyejmdxt(eyejmdxt);
  }
  
  public void deleteEyejmdxt(Eyejmdxt eyejmdxt) {
    this.eyejmdxtdao.deleteEyejmdxt(eyejmdxt);
  }
}
