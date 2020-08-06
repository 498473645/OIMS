package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyejmdxt;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyejmdxtService {
  void updateEyejmdxt(Eyejmdxt paramEyejmdxt);
  
  Serializable saveEyejmdxt(Eyejmdxt paramEyejmdxt);
  
  Eyejmdxt selectEyejmdxtByEyejmdxt(Eyejmdxt paramEyejmdxt);
  
  void deleteEyejmdxt(Eyejmdxt paramEyejmdxt);
}
