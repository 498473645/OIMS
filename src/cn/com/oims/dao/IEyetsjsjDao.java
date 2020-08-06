package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyetsjsj;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyetsjsjDao extends BaseDao {
  void updateEyetsjsj(Eyetsjsj paramEyetsjsj);
  
  Serializable saveEyetsjsj(Eyetsjsj paramEyetsjsj);
  
  Eyetsjsj selectEyetsjsjByEyetsjsj(Eyetsjsj paramEyetsjsj);
  
  void deleteEyetsjsj(Eyetsjsj paramEyetsjsj);
}
