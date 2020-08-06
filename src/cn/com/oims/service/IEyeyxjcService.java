package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeyxjc;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeyxjcService {
  void updateEyeyxjc(Eyeyxjc paramEyeyxjc);
  
  Serializable saveEyeyxjc(Eyeyxjc paramEyeyxjc);
  
  Eyeyxjc selectEyeyxjcByEyeyxjc(Eyeyxjc paramEyeyxjc);
  
  void deleteEyeyxjc(Eyeyxjc paramEyeyxjc);
}
