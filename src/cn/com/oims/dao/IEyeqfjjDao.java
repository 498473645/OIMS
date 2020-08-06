package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeqfjj;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeqfjjDao extends BaseDao {
  void updateEyeqfjj(Eyeqfjj paramEyeqfjj);
  
  Serializable saveEyeqfjj(Eyeqfjj paramEyeqfjj);
  
  Eyeqfjj selectEyeqfjjByEyeqfjj(Eyeqfjj paramEyeqfjj);
  
  void deleteEyeqfjj(Eyeqfjj paramEyeqfjj);
}
