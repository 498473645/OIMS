package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyejmhd;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyejmhdDao extends BaseDao {
  void updateEyejmhd(Eyejmhd paramEyejmhd);
  
  Serializable saveEyejmhd(Eyejmhd paramEyejmhd);
  
  Eyejmhd selectEyejmhdByEyejmhd(Eyejmhd paramEyejmhd);
  
  void deleteEyejmhd(Eyejmhd paramEyejmhd);
}
