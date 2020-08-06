package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EyeFVEP;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeFVEPDao extends BaseDao {
  void updateEyeFVEP(EyeFVEP paramEyeFVEP);
  
  Serializable saveEyeFVEP(EyeFVEP paramEyeFVEP);
  
  EyeFVEP selectEyeFVEPByEyeFVEP(EyeFVEP paramEyeFVEP);
  
  void deleteEyeFVEP(EyeFVEP paramEyeFVEP);
}
