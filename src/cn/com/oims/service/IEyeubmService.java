package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeubm;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeubmService {
  void updateEyeubm(Eyeubm paramEyeubm);
  
  Serializable saveEyeubm(Eyeubm paramEyeubm);
  
  Eyeubm selectEyeubmByEyeubm(Eyeubm paramEyeubm);
  
  void deleteEyeubm(Eyeubm paramEyeubm);
}
