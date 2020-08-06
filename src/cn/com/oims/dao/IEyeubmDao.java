package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeubm;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeubmDao extends BaseDao {
  void updateEyeubm(Eyeubm paramEyeubm);
  
  Serializable saveEyeubm(Eyeubm paramEyeubm);
  
  Eyeubm selectEyeubmByEyeubm(Eyeubm paramEyeubm);
  
  void deleteEyeubm(Eyeubm paramEyeubm);
}
