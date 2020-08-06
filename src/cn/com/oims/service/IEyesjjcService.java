package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyesjjc;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyesjjcService {
  void updateEyesjjc(Eyesjjc paramEyesjjc);
  
  Serializable saveEyesjjc(Eyesjjc paramEyesjjc);
  
  Eyesjjc selectEyesjjcByEyesjjc(Eyesjjc paramEyesjjc);
  
  void deleteEyesjjc(Eyesjjc paramEyesjjc);
}
