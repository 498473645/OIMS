package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyegcsy;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyegcsyDao extends BaseDao {
  void updateEyegcsy(Eyegcsy paramEyegcsy);
  
  Serializable saveEyegcsy(Eyegcsy paramEyegcsy);
  
  Eyegcsy selectEyegcsyByEyegcsy(Eyegcsy paramEyegcsy);
  
  void deleteEyegcsy(Eyegcsy paramEyegcsy);
}
