package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyezsxz;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyezsxzService {
  void updateEyezsxz(Eyezsxz paramEyezsxz);
  
  Serializable saveEyezsxz(Eyezsxz paramEyezsxz);
  
  Eyezsxz selectEyezsxzByEyezsxz(Eyezsxz paramEyezsxz);
  
  void deleteEyezsxz(Eyezsxz paramEyezsxz);
}
