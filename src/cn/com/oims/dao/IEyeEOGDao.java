package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EyeEOG;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeEOGDao extends BaseDao {
  void updateEyeEOG(EyeEOG paramEyeEOG);
  
  Serializable saveEyeEOG(EyeEOG paramEyeEOG);
  
  EyeEOG selectEyeEOGByEyeEOG(EyeEOG paramEyeEOG);
  
  void deleteEyeEOG(EyeEOG paramEyeEOG);
}
