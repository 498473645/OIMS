package cn.com.oims.service;

import cn.com.oims.dao.pojo.EyeEOG;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeEOGService {
  void updateEyeEOG(EyeEOG paramEyeEOG);
  
  Serializable saveEyeEOG(EyeEOG paramEyeEOG);
  
  EyeEOG selectEyeEOGByEyeEOG(EyeEOG paramEyeEOG);
  
  void deleteEyeEOG(EyeEOG paramEyeEOG);
}
