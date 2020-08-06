package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyetsjzl;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyetsjzlDao extends BaseDao {
  void updateEyetsjzl(Eyetsjzl paramEyetsjzl);
  
  Serializable saveEyetsjzl(Eyetsjzl paramEyetsjzl);
  
  Eyetsjzl selectEyetsjzlByEyetsjzl(Eyetsjzl paramEyetsjzl);
  
  void deleteEyetsjzl(Eyetsjzl paramEyetsjzl);
}
