package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyejmDao;
import cn.com.oims.dao.pojo.Eyejm;
import cn.com.oims.service.IEyejmService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyejmServiceImpl implements IEyejmService {
  @Autowired
  private IEyejmDao eyejmdao = null;
  
  public void updateEyejm(Eyejm eyejm) {
    this.eyejmdao.updateEyejm(eyejm);
  }
  
  public Serializable saveEyejm(Eyejm eyejm) {
    return this.eyejmdao.saveEyejm(eyejm);
  }
  
  public Eyejm selectEyejmByEyejm(Eyejm eyejm) {
    return this.eyejmdao.selectEyejmByEyejm(eyejm);
  }
  
  public void deleteEyejm(Eyejm eyejm) {
    this.eyejmdao.deleteEyejm(eyejm);
  }
}
