package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeqianfangshendu;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeqianfangshenduDao extends BaseDao {
  void updateEyeqianfangshendu(Eyeqianfangshendu paramEyeqianfangshendu);
  
  Serializable saveEyeqianfangshendu(Eyeqianfangshendu paramEyeqianfangshendu);
  
  Eyeqianfangshendu selectEyeqianfangshenduByEyeqianfangshendu(Eyeqianfangshendu paramEyeqianfangshendu);
  
  void deleteEyeqianfangshendu(Eyeqianfangshendu paramEyeqianfangshendu);
}
