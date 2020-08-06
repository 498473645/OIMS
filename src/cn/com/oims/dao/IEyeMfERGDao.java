package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EyeMfERG;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeMfERGDao extends BaseDao {
  void updateEyeMfErg(EyeMfERG paramEyeMfERG);
  
  Serializable saveEyeMfErg(EyeMfERG paramEyeMfERG);
  
  EyeMfERG selectEyeMfErgByEyeMfErg(EyeMfERG paramEyeMfERG);
  
  void deleteEyeMfErg(EyeMfERG paramEyeMfERG);
}
