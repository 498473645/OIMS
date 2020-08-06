package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyexsjc;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyexsjcDao extends BaseDao {
  void updateEyexsjc(Eyexsjc paramEyexsjc);
  
  Serializable saveEyexsjc(Eyexsjc paramEyexsjc);
  
  Eyexsjc selectEyexsjcByEyexsjc(Eyexsjc paramEyexsjc);
  
  void deleteEyexsjc(Eyexsjc paramEyexsjc);
}
