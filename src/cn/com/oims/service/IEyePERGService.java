package cn.com.oims.service;

import cn.com.oims.dao.pojo.EyePERG;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyePERGService {
  void updateEyePERG(EyePERG paramEyePERG);
  
  Serializable saveEyePERG(EyePERG paramEyePERG);
  
  EyePERG selectEyePERGByEyePERG(EyePERG paramEyePERG);
  
  void deleteEyePERG(EyePERG paramEyePERG);
}
