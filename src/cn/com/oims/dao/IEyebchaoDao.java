package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyebchao;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyebchaoDao extends BaseDao {
  void updateEyebchao(Eyebchao paramEyebchao);
  
  Serializable saveEyebchao(Eyebchao paramEyebchao);
  
  Eyebchao selectEyebchaoByEyebchao(Eyebchao paramEyebchao);
  
  void deleteEyebchao(Eyebchao paramEyebchao);
}
