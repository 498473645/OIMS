package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeywyjDao;
import cn.com.oims.dao.pojo.Eyeywyj;
import cn.com.oims.service.IEyeywyjService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeywyjServiceImpl implements IEyeywyjService {
  @Autowired
  private IEyeywyjDao eyeywyjdao = null;
  
  public void updateEyeywyj(Eyeywyj eyeywyj) {
    this.eyeywyjdao.updateEyeywyj(eyeywyj);
  }
  
  public Serializable saveEyeywyj(Eyeywyj eyeywyj) {
    return this.eyeywyjdao.saveEyeywyj(eyeywyj);
  }
  
  public Eyeywyj selectEyeywyjByEyeywyj(Eyeywyj eyeywyj) {
    return this.eyeywyjdao.selectEyeywyjByEyeywyj(eyeywyj);
  }
  
  public void deleteEyeywyj(Eyeywyj eyeywyj) {
    this.eyeywyjdao.deleteEyeywyj(eyeywyj);
  }
}
