package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyejmdxt;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyejmdxtDao extends BaseDao {
  void updateEyejmdxt(Eyejmdxt paramEyejmdxt);
  
  Serializable saveEyejmdxt(Eyejmdxt paramEyejmdxt);
  
  Eyejmdxt selectEyejmdxtByEyejmdxt(Eyejmdxt paramEyejmdxt);
  
  void deleteEyejmdxt(Eyejmdxt paramEyejmdxt);
}
