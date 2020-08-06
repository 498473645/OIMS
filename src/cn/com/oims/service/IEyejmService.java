package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyejm;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyejmService {
  void updateEyejm(Eyejm paramEyejm);
  
  Serializable saveEyejm(Eyejm paramEyejm);
  
  Eyejm selectEyejmByEyejm(Eyejm paramEyejm);
  
  void deleteEyejm(Eyejm paramEyejm);
}
