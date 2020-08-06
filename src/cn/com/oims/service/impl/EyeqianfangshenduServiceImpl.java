package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeqianfangshenduDao;
import cn.com.oims.dao.pojo.Eyeqianfangshendu;
import cn.com.oims.service.IEyeqianfangshenduService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeqianfangshenduServiceImpl implements IEyeqianfangshenduService {
  @Autowired
  private IEyeqianfangshenduDao eyeqianfangshendudao = null;
  
  public void updateEyeqianfangshendu(Eyeqianfangshendu eyeqianfangshendu) {
    this.eyeqianfangshendudao.updateEyeqianfangshendu(eyeqianfangshendu);
  }
  
  public Serializable saveEyeqianfangshendu(Eyeqianfangshendu eyeqianfangshendu) {
    return this.eyeqianfangshendudao.saveEyeqianfangshendu(eyeqianfangshendu);
  }
  
  public Eyeqianfangshendu selectEyeqianfangshenduByEyeqianfangshendu(Eyeqianfangshendu eyeqianfangshendu) {
    return this.eyeqianfangshendudao.selectEyeqianfangshenduByEyeqianfangshendu(eyeqianfangshendu);
  }
  
  public void deleteEyeqianfangshendu(Eyeqianfangshendu eyeqianfangshendu) {
    this.eyeqianfangshendudao.deleteEyeqianfangshendu(eyeqianfangshendu);
  }
}
