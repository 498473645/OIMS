package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeygzy;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeygzyService {
  void updateEyeygzy(Eyeygzy paramEyeygzy);
  
  Serializable saveEyeygzy(Eyeygzy paramEyeygzy);
  
  Eyeygzy selectEyeygzyByEyeygzy(Eyeygzy paramEyeygzy);
  
  void deleteEyeygzy(Eyeygzy paramEyeygzy);
}
