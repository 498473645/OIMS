package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeywyj;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyeywyjService {
  void updateEyeywyj(Eyeywyj paramEyeywyj);
  
  Serializable saveEyeywyj(Eyeywyj paramEyeywyj);
  
  Eyeywyj selectEyeywyjByEyeywyj(Eyeywyj paramEyeywyj);
  
  void deleteEyeywyj(Eyeywyj paramEyeywyj);
}
