package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EyePERG;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyePERGDao extends BaseDao {
  void updateEyePERG(EyePERG paramEyePERG);
  
  Serializable saveEyePERG(EyePERG paramEyePERG);
  
  EyePERG selectEyePERGByEyePERG(EyePERG paramEyePERG);
  
  void deleteEyePERG(EyePERG paramEyePERG);
}
