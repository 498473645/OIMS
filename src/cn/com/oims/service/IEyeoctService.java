package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeoct;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeoctService {
  void updateEyeoct(Eyeoct paramEyeoct);
  
  Serializable saveEyeoct(Eyeoct paramEyeoct);
  
  Eyeoct selectEyeoctByEyeoct(Eyeoct paramEyeoct);
  
  void deleteEyeoct(Eyeoct paramEyeoct);
}
