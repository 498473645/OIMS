package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyetsjjfw;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyetsjjfwDao extends BaseDao {
  void updateEyetsjjfw(Eyetsjjfw paramEyetsjjfw);
  
  Serializable saveEyetsjjfw(Eyetsjjfw paramEyetsjjfw);
  
  Eyetsjjfw selectEyetsjjfwByEyetsjjfw(Eyetsjjfw paramEyetsjjfw);
  
  void deleteEyetsjjfw(Eyetsjjfw paramEyetsjjfw);
}
