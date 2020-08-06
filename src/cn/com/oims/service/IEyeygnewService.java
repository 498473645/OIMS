package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeygnew;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeygnewService {
  void updateEyeygnew(Eyeygnew paramEyeygnew);
  
  Serializable saveEyeygnew(Eyeygnew paramEyeygnew);
  
  Eyeygnew selectEyeygnewByEyeygnew(Eyeygnew paramEyeygnew);
  
  void deleteEyeygnew(Eyeygnew paramEyeygnew);
}
