package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeballpress;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeballpressDao extends BaseDao {
  void updateEyeballpress(Eyeballpress paramEyeballpress);
  
  Serializable saveEyeballpress(Eyeballpress paramEyeballpress);
  
  Eyeballpress selectEyeballpressByEyeballpress(Eyeballpress paramEyeballpress);
  
  void deleteEyeballpress(Eyeballpress paramEyeballpress);
}
