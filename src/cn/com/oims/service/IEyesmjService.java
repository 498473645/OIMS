package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyesmj;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyesmjService {
  void updateEyesmj(Eyesmj paramEyesmj);
  
  Serializable saveEyesmj(Eyesmj paramEyesmj);
  
  Eyesmj selectEyesmjByEyesmj(Eyesmj paramEyesmj);
  
  void deleteEyesmj(Eyesmj paramEyesmj);
}
