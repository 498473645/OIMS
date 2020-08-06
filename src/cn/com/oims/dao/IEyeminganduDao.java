package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EyeMingandu;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeminganduDao extends BaseDao {
  void updateEyemingandu(EyeMingandu paramEyeMingandu);
  
  Serializable saveEyemingandu(EyeMingandu paramEyeMingandu);
  
  EyeMingandu selectEyemgdByEyemgd(EyeMingandu paramEyeMingandu);
  
  void deleteEyemgd(EyeMingandu paramEyeMingandu);
}
