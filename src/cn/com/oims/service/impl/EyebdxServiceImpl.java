package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyebdxDao;
import cn.com.oims.dao.pojo.Eyebdx;
import cn.com.oims.service.IEyebdxService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyebdxServiceImpl implements IEyebdxService {
  @Autowired
  private IEyebdxDao eyebdxdao = null;
  
  public void updateEyebdx(Eyebdx eyebdx) {
    this.eyebdxdao.updateEyebdx(eyebdx);
  }
  
  public Serializable saveEyebdx(Eyebdx eyebdx) {
    return this.eyebdxdao.saveEyebdx(eyebdx);
  }
  
  public Eyebdx selectEyebdxByEyebdx(Eyebdx eyebdx) {
    return this.eyebdxdao.selectEyebdxByEyebdx(eyebdx);
  }
  
  public void deleteEyebdx(Eyebdx eyebdx) {
    this.eyebdxdao.deleteEyebdx(eyebdx);
  }
}
