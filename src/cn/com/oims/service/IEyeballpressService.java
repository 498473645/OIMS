package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeballpress;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeballpressService {
  void updateEyeballpress(Eyeballpress paramEyeballpress);
  
  Serializable saveEyeballpress(Eyeballpress paramEyeballpress);
  
  Eyeballpress selectEyeballpressByEyeballpress(Eyeballpress paramEyeballpress);
  
  void deleteEyeballpress(Eyeballpress paramEyeballpress);
}
