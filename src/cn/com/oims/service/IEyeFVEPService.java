package cn.com.oims.service;

import cn.com.oims.dao.pojo.EyeFVEP;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeFVEPService {
  void updateEyeFVEP(EyeFVEP paramEyeFVEP);
  
  Serializable saveEyeFVEP(EyeFVEP paramEyeFVEP);
  
  EyeFVEP selectEyeFVEPByEyeFVEP(EyeFVEP paramEyeFVEP);
  
  void deleteEyeFVEP(EyeFVEP paramEyeFVEP);
}
