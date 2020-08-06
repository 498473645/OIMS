package cn.com.oims.service;

import cn.com.oims.dao.pojo.EyePVEP;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyePVEPService {
  void updateEyePVEP(EyePVEP paramEyePVEP);
  
  Serializable saveEyePVEP(EyePVEP paramEyePVEP);
  
  EyePVEP selectEyePVEPByEyePVEP(EyePVEP paramEyePVEP);
  
  void deleteEyePVEP(EyePVEP paramEyePVEP);
}
