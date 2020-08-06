package cn.com.oims.service;

import cn.com.oims.dao.pojo.EyeMfERG;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeMfERGService {
  void updateEyeMfErg(EyeMfERG paramEyeMfERG);
  
  Serializable saveEyeMfErg(EyeMfERG paramEyeMfERG);
  
  EyeMfERG selectEyeMfErgByEyeMfErg(EyeMfERG paramEyeMfERG);
  
  void deleteEyeMfErg(EyeMfERG paramEyeMfERG);
}
