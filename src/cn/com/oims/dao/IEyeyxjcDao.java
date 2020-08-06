package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeyxjc;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeyxjcDao extends BaseDao {
  void updateEyeyxjc(Eyeyxjc paramEyeyxjc);
  
  Serializable saveEyeyxjc(Eyeyxjc paramEyeyxjc);
  
  Eyeyxjc selectEyeyxjcByEyeyxjc(Eyeyxjc paramEyeyxjc);
  
  void deleteEyeyxjc(Eyeyxjc paramEyeyxjc);
}
