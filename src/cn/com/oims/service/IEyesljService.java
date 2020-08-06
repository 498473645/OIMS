package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeslj;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyesljService {
  void updateEyeslj(Eyeslj paramEyeslj);
  
  Serializable saveEyeslj(Eyeslj paramEyeslj);
  
  Eyeslj selectEyesljByEyeslj(Eyeslj paramEyeslj);
  
  void deleteEyeslj(Eyeslj paramEyeslj);
}
