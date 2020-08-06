package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeywyj;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeywyjDao extends BaseDao {
  void updateEyeywyj(Eyeywyj paramEyeywyj);
  
  Serializable saveEyeywyj(Eyeywyj paramEyeywyj);
  
  Eyeywyj selectEyeywyjByEyeywyj(Eyeywyj paramEyeywyj);
  
  void deleteEyeywyj(Eyeywyj paramEyeywyj);
}
