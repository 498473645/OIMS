package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyesmj;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyesmjDao extends BaseDao {
  void updateEyesmj(Eyesmj paramEyesmj);
  
  Serializable saveEyesmj(Eyesmj paramEyesmj);
  
  Eyesmj selectEyesmjByEyesmj(Eyesmj paramEyesmj);
  
  void deleteEyesmj(Eyesmj paramEyesmj);
}
