package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyejmqlj;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyejmqljDao extends BaseDao {
  void updateEyejmqlj(Eyejmqlj paramEyejmqlj);
  
  Serializable saveEyejmqlj(Eyejmqlj paramEyejmqlj);
  
  Eyejmqlj selectEyejmqljByEyejmqlj(Eyejmqlj paramEyejmqlj);
  
  void deleteEyejmqlj(Eyejmqlj paramEyejmqlj);
}
