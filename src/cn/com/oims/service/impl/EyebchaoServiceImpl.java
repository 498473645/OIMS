package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyebchaoDao;
import cn.com.oims.dao.pojo.Eyebchao;
import cn.com.oims.service.IEyebchaoService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyebchaoServiceImpl implements IEyebchaoService {
  @Autowired
  private IEyebchaoDao eyebchaodao = null;
  
  public void updateEyebchao(Eyebchao eyebchao) {
    this.eyebchaodao.updateEyebchao(eyebchao);
  }
  
  public Serializable saveEyebchao(Eyebchao eyebchao) {
    return this.eyebchaodao.saveEyebchao(eyebchao);
  }
  
  public Eyebchao selectEyebchaoByEyebchao(Eyebchao eyebchao) {
    return this.eyebchaodao.selectEyebchaoByEyebchao(eyebchao);
  }
  
  public void deleteEyebchao(Eyebchao eyebchao) {
    this.eyebchaodao.deleteEyebchao(eyebchao);
  }
}
