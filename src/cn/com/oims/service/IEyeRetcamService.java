package cn.com.oims.service;

import cn.com.oims.dao.pojo.EyeRetcam;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeRetcamService {
  void updateEyeRetcam(EyeRetcam paramEyeRetcam);
  
  Serializable saveEyeRetcam(EyeRetcam paramEyeRetcam);
  
  EyeRetcam selectEyeRetcamByEyeRetcam(EyeRetcam paramEyeRetcam);
  
  void deleteEyeRetcam(EyeRetcam paramEyeRetcam);
}
