package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyebdx;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyebdxService {
  void updateEyebdx(Eyebdx paramEyebdx);
  
  Serializable saveEyebdx(Eyebdx paramEyebdx);
  
  Eyebdx selectEyebdxByEyebdx(Eyebdx paramEyebdx);
  
  void deleteEyebdx(Eyebdx paramEyebdx);
}
