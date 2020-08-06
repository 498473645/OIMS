package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyejgzlDao;
import cn.com.oims.dao.pojo.Eyejgzl;
import cn.com.oims.service.IEyejgzlService;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyejgzlServiceImpl implements IEyejgzlService {
  @Autowired
  private IEyejgzlDao eyejgzldao = null;
  
  public void updateEyejgzl(Eyejgzl eyejgzl) {
    this.eyejgzldao.updateEyejgzl(eyejgzl);
  }
  
  public Serializable saveEyejgzl(Eyejgzl eyejgzl) {
    return this.eyejgzldao.saveEyejgzl(eyejgzl);
  }
  
  public Eyejgzl selectEyejgzlByEyejgzl(Eyejgzl eyejgzl) {
    return this.eyejgzldao.selectEyejgzlByEyejgzl(eyejgzl);
  }
  
  public void deleteEyejgzl(Eyejgzl eyejgzl) {
    this.eyejgzldao.deleteEyejgzl(eyejgzl);
  }
  
  public List getTreatResult(String patientId) {
    return this.eyejgzldao.getTreatResult(patientId);
  }
}
