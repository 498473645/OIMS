package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EyePVEP;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyePVEPDao extends BaseDao {
  void updateEyePVEP(EyePVEP paramEyePVEP);
  
  Serializable saveEyePVEP(EyePVEP paramEyePVEP);
  
  EyePVEP selectEyePVEPByEyePVEP(EyePVEP paramEyePVEP);
  
  void deleteEyePVEP(EyePVEP paramEyePVEP);
}
