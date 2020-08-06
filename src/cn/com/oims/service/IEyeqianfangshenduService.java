package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeqianfangshendu;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeqianfangshenduService {
  void updateEyeqianfangshendu(Eyeqianfangshendu paramEyeqianfangshendu);
  
  Serializable saveEyeqianfangshendu(Eyeqianfangshendu paramEyeqianfangshendu);
  
  Eyeqianfangshendu selectEyeqianfangshenduByEyeqianfangshendu(Eyeqianfangshendu paramEyeqianfangshendu);
  
  void deleteEyeqianfangshendu(Eyeqianfangshendu paramEyeqianfangshendu);
}
