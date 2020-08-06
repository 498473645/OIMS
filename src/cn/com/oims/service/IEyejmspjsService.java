package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyejmspjs;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyejmspjsService {
  void updateEyejmspjs(Eyejmspjs paramEyejmspjs);
  
  Serializable saveEyejmspjs(Eyejmspjs paramEyejmspjs);
  
  Eyejmspjs selectEyejmspjsByEyejmspjs(Eyejmspjs paramEyejmspjs);
  
  void deleteEyejmspjs(Eyejmspjs paramEyejmspjs);
}
