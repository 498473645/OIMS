package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyedslzsq;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyedslzsqDao extends BaseDao {
  void updateEyedslzsq(Eyedslzsq paramEyedslzsq);
  
  Serializable saveEyedslzsq(Eyedslzsq paramEyedslzsq);
  
  Eyedslzsq selectEyedslzsqByEyedslzsq(Eyedslzsq paramEyedslzsq);
  
  void deleteEyedslzsq(Eyedslzsq paramEyedslzsq);
}
