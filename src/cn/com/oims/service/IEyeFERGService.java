package cn.com.oims.service;

import cn.com.oims.dao.pojo.EyeFERG;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeFERGService {
  void updateEyeFERG(EyeFERG paramEyeFERG);
  
  Serializable saveEyeFERG(EyeFERG paramEyeFERG);
  
  EyeFERG selectEyeFERGByEyeFERG(EyeFERG paramEyeFERG);
  
  void deleteEyeFERG(EyeFERG paramEyeFERG);
}
