package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyedslzsq;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyedslzsqService {
  void updateEyedslzsq(Eyedslzsq paramEyedslzsq);
  
  Serializable saveEyedslzsq(Eyedslzsq paramEyedslzsq);
  
  Eyedslzsq selectEyedslzsqByEyedslzsq(Eyedslzsq paramEyedslzsq);
  
  void deleteEyedslzsq(Eyedslzsq paramEyedslzsq);
}
