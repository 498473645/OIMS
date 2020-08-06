package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeygnew;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeygnewDao extends BaseDao {
  void updateEyeygnew(Eyeygnew paramEyeygnew);
  
  Serializable saveEyeygnew(Eyeygnew paramEyeygnew);
  
  Eyeygnew selectEyeygnewByEyeygnew(Eyeygnew paramEyeygnew);
  
  void deleteEyeygnew(Eyeygnew paramEyeygnew);
}
