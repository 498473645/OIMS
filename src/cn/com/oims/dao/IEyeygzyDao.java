package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeygzy;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeygzyDao extends BaseDao {
  void updateEyeygzy(Eyeygzy paramEyeygzy);
  
  Serializable saveEyeygzy(Eyeygzy paramEyeygzy);
  
  Eyeygzy selectEyeygzyByEyeygzy(Eyeygzy paramEyeygzy);
  
  void deleteEyeygzy(Eyeygzy paramEyeygzy);
}
