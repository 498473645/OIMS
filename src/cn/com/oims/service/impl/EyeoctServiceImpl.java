package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeoctDao;
import cn.com.oims.dao.pojo.Eyeoct;
import cn.com.oims.service.IEyeoctService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeoctServiceImpl implements IEyeoctService {
  @Autowired
  private IEyeoctDao eyeoctdao = null;
  
  public void updateEyeoct(Eyeoct eyeoct) {
    this.eyeoctdao.updateEyeoct(eyeoct);
  }
  
  public Serializable saveEyeoct(Eyeoct eyeoct) {
    return this.eyeoctdao.saveEyeoct(eyeoct);
  }
  
  public Eyeoct selectEyeoctByEyeoct(Eyeoct eyeoct) {
    return this.eyeoctdao.selectEyeoctByEyeoct(eyeoct);
  }
  
  public void deleteEyeoct(Eyeoct eyeoct) {
    this.eyeoctdao.deleteEyeoct(eyeoct);
  }
}
