package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyejmqlj;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyejmqljService {
  void updateEyejmqlj(Eyejmqlj paramEyejmqlj);
  
  Serializable saveEyejmqlj(Eyejmqlj paramEyejmqlj);
  
  Eyejmqlj selectEyejmqljByEyejmqlj(Eyejmqlj paramEyejmqlj);
  
  void deleteEyejmqlj(Eyejmqlj paramEyejmqlj);
}
