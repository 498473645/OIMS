package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyetsliDao;
import cn.com.oims.dao.pojo.Eyetsli;
import cn.com.oims.service.IEyetsliService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyetsliServiceImpl implements IEyetsliService {
  @Autowired
  private IEyetsliDao eyetslidao = null;
  
  public void updateEyetsli(Eyetsli eyetsli) {
    this.eyetslidao.updateEyetsli(eyetsli);
  }
  
  public Serializable saveEyetsli(Eyetsli eyetsli) {
    return this.eyetslidao.saveEyetsli(eyetsli);
  }
  
  public Eyetsli selectEyetsliByEyetsli(Eyetsli eyetsli) {
    return this.eyetslidao.selectEyetsliByEyetsli(eyetsli);
  }
  
  public void deleteEyetsli(Eyetsli eyetsli) {
    this.eyetslidao.deleteEyetsli(eyetsli);
  }
}
