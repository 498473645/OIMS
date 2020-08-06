package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyetsli;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyetsliDao extends BaseDao {
  void updateEyetsli(Eyetsli paramEyetsli);
  
  Serializable saveEyetsli(Eyetsli paramEyetsli);
  
  Eyetsli selectEyetsliByEyetsli(Eyetsli paramEyetsli);
  
  void deleteEyetsli(Eyetsli paramEyetsli);
}
