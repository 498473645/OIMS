package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyegcsy;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyegcsyService {
  void updateEyegcsy(Eyegcsy paramEyegcsy);
  
  Serializable saveEyegcsy(Eyegcsy paramEyegcsy);
  
  Eyegcsy selectEyegcsyByEyegcsy(Eyegcsy paramEyegcsy);
  
  void deleteEyegcsy(Eyegcsy paramEyegcsy);
}
