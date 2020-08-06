package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyejmhdDao;
import cn.com.oims.dao.pojo.Eyejmhd;
import cn.com.oims.service.IEyejmhdService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyejmhdServiceImpl implements IEyejmhdService {
  @Autowired
  private IEyejmhdDao eyejmhddao = null;
  
  public void updateEyejmhd(Eyejmhd eyejmhd) {
    this.eyejmhddao.updateEyejmhd(eyejmhd);
  }
  
  public Serializable saveEyejmhd(Eyejmhd eyejmhd) {
    return this.eyejmhddao.saveEyejmhd(eyejmhd);
  }
  
  public Eyejmhd selectEyejmhdByEyejmhd(Eyejmhd eyejmhd) {
    return this.eyejmhddao.selectEyejmhdByEyejmhd(eyejmhd);
  }
  
  public void deleteEyejmhd(Eyejmhd eyejmhd) {
    this.eyejmhddao.deleteEyejmhd(eyejmhd);
  }
}
