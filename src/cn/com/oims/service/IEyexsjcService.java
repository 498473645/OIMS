package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyexsjc;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyexsjcService {
  void updateEyexsjc(Eyexsjc paramEyexsjc);
  
  Serializable saveEyexsjc(Eyexsjc paramEyexsjc);
  
  Eyexsjc selectEyexsjcByEyexsjc(Eyexsjc paramEyexsjc);
  
  void deleteEyexsjc(Eyexsjc paramEyexsjc);
}
