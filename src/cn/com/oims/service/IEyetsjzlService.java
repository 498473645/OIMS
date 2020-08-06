package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyetsjzl;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyetsjzlService {
  void updateEyetsjzl(Eyetsjzl paramEyetsjzl);
  
  Serializable saveEyetsjzl(Eyetsjzl paramEyetsjzl);
  
  Eyetsjzl selectEyetsjzlByEyetsjzl(Eyetsjzl paramEyetsjzl);
  
  void deleteEyetsjzl(Eyetsjzl paramEyetsjzl);
}
