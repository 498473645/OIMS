package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyesjjc;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyesjjcDao extends BaseDao {
  void updateEyesjjc(Eyesjjc paramEyesjjc);
  
  Serializable saveEyesjjc(Eyesjjc paramEyesjjc);
  
  Eyesjjc selectEyesjjcByEyesjjc(Eyesjjc paramEyesjjc);
  
  void deleteEyesjjc(Eyesjjc paramEyesjjc);
}
