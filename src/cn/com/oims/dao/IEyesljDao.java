package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeslj;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyesljDao extends BaseDao {
  void updateEyeslj(Eyeslj paramEyeslj);
  
  Serializable saveEyeslj(Eyeslj paramEyeslj);
  
  Eyeslj selectEyesljByEyeslj(Eyeslj paramEyeslj);
  
  void deleteEyeslj(Eyeslj paramEyeslj);
}
