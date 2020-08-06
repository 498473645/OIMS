package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyezsxz;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyezsxzDao extends BaseDao {
  void updateEyezsxz(Eyezsxz paramEyezsxz);
  
  Serializable saveEyezsxz(Eyezsxz paramEyezsxz);
  
  Eyezsxz selectEyezsxzByEyezsxz(Eyezsxz paramEyezsxz);
  
  void deleteEyezsxz(Eyezsxz paramEyezsxz);
}
