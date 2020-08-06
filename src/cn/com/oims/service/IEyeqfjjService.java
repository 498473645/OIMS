package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeqfjj;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeqfjjService {
  void updateEyeqfjj(Eyeqfjj paramEyeqfjj);
  
  Serializable saveEyeqfjj(Eyeqfjj paramEyeqfjj);
  
  Eyeqfjj selectEyeqfjjByEyeqfjj(Eyeqfjj paramEyeqfjj);
  
  void deleteEyeqfjj(Eyeqfjj paramEyeqfjj);
}
