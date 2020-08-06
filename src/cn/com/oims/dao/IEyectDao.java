package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyect;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyectDao extends BaseDao {
  void updateEyect(Eyect paramEyect);
  
  Serializable saveEyect(Eyect paramEyect);
  
  Eyect selectEyectByEyect(Eyect paramEyect);
  
  void deleteEyect(Eyect paramEyect);
}
