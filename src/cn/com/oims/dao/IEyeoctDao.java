package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeoct;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyeoctDao extends BaseDao {
  void updateEyeoct(Eyeoct paramEyeoct);
  
  Serializable saveEyeoct(Eyeoct paramEyeoct);
  
  Eyeoct selectEyeoctByEyeoct(Eyeoct paramEyeoct);
  
  void deleteEyeoct(Eyeoct paramEyeoct);
}
