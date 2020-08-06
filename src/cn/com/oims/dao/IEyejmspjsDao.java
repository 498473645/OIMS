package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyejmspjs;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyejmspjsDao extends BaseDao {
  void updateEyejmspjs(Eyejmspjs paramEyejmspjs);
  
  Serializable saveEyejmspjs(Eyejmspjs paramEyejmspjs);
  
  Eyejmspjs selectEyejmspjsByEyejmspjs(Eyejmspjs paramEyejmspjs);
  
  void deleteEyejmspjs(Eyejmspjs paramEyejmspjs);
}
