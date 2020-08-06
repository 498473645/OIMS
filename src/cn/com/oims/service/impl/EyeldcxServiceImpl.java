package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeldcxDao;
import cn.com.oims.dao.pojo.Eyeldcx;
import cn.com.oims.service.IEyeldcxService;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeldcxServiceImpl implements IEyeldcxService {
  @Autowired
  private IEyeldcxDao eyeldcxdao = null;
  
  public void updateEyeldcx(Eyeldcx eyeldcx) {
    this.eyeldcxdao.updateEyeldcx(eyeldcx);
  }
  
  public Serializable saveEyeldcx(Eyeldcx eyeldcx) {
    return this.eyeldcxdao.saveEyeldcx(eyeldcx);
  }
  
  public Eyeldcx selectEyeldcxByEyeldcx(Eyeldcx eyeldcx) {
    return this.eyeldcxdao.selectEyeldcxByEyeldcx(eyeldcx);
  }
  
  public void deleteEyeldcx(Eyeldcx eyeldcx) {
    this.eyeldcxdao.deleteEyeldcx(eyeldcx);
  }
  
  public List getTreatResult(String patientId) {
    return this.eyeldcxdao.getTreatResult(patientId);
  }
}
