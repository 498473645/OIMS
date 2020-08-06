package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyejm;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyejmDao extends BaseDao {
  void updateEyejm(Eyejm paramEyejm);
  
  Serializable saveEyejm(Eyejm paramEyejm);
  
  Eyejm selectEyejmByEyejm(Eyejm paramEyejm);
  
  void deleteEyejm(Eyejm paramEyejm);
}
