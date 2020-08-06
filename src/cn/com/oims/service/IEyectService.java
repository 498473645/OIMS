package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyect;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyectService {
  void updateEyect(Eyect paramEyect);
  
  Serializable saveEyect(Eyect paramEyect);
  
  Eyect selectEyectByEyect(Eyect paramEyect);
  
  void deleteEyect(Eyect paramEyect);
}
