package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeydzxDao;
import cn.com.oims.dao.pojo.Eyeydzx;
import cn.com.oims.service.IEyeydzxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeydzxServiceImpl implements IEyeydzxService {
  @Autowired
  private IEyeydzxDao eyeydzxdao = null;
  
  public void updateEyeydzx(Eyeydzx eyeydzx) {
    this.eyeydzxdao.updateEyeydzx(eyeydzx);
  }
  
  public void saveEyeydzx(Eyeydzx eyeydzx) {
    this.eyeydzxdao.saveEyeydzx(eyeydzx);
  }
  
  public Eyeydzx selectEyeydzxByEyeydzx(Eyeydzx eyeydzx) {
    return this.eyeydzxdao.selectEyeydzxByEyeydzx(eyeydzx);
  }
  
  public void deleteEyeydzx(Eyeydzx eyeydzx) {
    this.eyeydzxdao.deleteEyeydzx(eyeydzx);
  }
}
