package cn.com.oims.service;

import cn.com.oims.dao.pojo.EyeMingandu;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeMinganduService {
  void updateEyeMGD(EyeMingandu paramEyeMingandu);
  
  Serializable saveEyeMGD(EyeMingandu paramEyeMingandu);
  
  EyeMingandu selectEyeMGDByEyeMGD(EyeMingandu paramEyeMingandu);
  
  void deleteEyeMGD(EyeMingandu paramEyeMingandu);
}
