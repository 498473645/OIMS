package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyelxdzxDao;
import cn.com.oims.dao.pojo.Eyelxdzx;
import cn.com.oims.service.IEyelxdzxService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyelxdzxServiceImpl implements IEyelxdzxService {
  @Autowired
  private IEyelxdzxDao eyelxdzxdao = null;
  
  public void updateEyelxdzx(Eyelxdzx eyelxdzx) {
    this.eyelxdzxdao.updateEyelxdzx(eyelxdzx);
  }
  
  public Serializable saveEyelxdzx(Eyelxdzx eyelxdzx) {
    return this.eyelxdzxdao.saveEyelxdzx(eyelxdzx);
  }
  
  public Eyelxdzx selectEyelxdzxByEyelxdzx(Eyelxdzx eyelxdzx) {
    return this.eyelxdzxdao.selectEyelxdzxByEyelxdzx(eyelxdzx);
  }
  
  public void deleteEyelxdzx(Eyelxdzx eyelxdzx) {
    this.eyelxdzxdao.deleteEyelxdzx(eyelxdzx);
  }
}
