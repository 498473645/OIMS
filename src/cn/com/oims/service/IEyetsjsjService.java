package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyetsjsj;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyetsjsjService {
  void updateEyetsjsj(Eyetsjsj paramEyetsjsj);
  
  Serializable saveEyetsjsj(Eyetsjsj paramEyetsjsj);
  
  Eyetsjsj selectEyetsjsjByEyetsjsj(Eyetsjsj paramEyetsjsj);
  
  void deleteEyetsjsj(Eyetsjsj paramEyetsjsj);
}
