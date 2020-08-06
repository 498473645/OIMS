package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyetsjjfw;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyetsjjfwService {
  void updateEyetsjjfw(Eyetsjjfw paramEyetsjjfw);
  
  Serializable saveEyetsjjfw(Eyetsjjfw paramEyetsjjfw);
  
  Eyetsjjfw selectEyetsjjfwByEyetsjjfw(Eyetsjjfw paramEyetsjjfw);
  
  void deleteEyetsjjfw(Eyetsjjfw paramEyetsjjfw);
}
