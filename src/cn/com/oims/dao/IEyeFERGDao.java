package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EyeFERG;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeFERGDao extends BaseDao {
  void updateEyeFERG(EyeFERG paramEyeFERG);
  
  Serializable saveEyeFERG(EyeFERG paramEyeFERG);
  
  EyeFERG selectEyeFERGByEyeFERG(EyeFERG paramEyeFERG);
  
  void deleteEyeFERG(EyeFERG paramEyeFERG);
}
