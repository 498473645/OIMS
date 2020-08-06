package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyelxdzx;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public interface IEyelxdzxDao extends BaseDao {
  void updateEyelxdzx(Eyelxdzx paramEyelxdzx);
  
  Serializable saveEyelxdzx(Eyelxdzx paramEyelxdzx);
  
  Eyelxdzx selectEyelxdzxByEyelxdzx(Eyelxdzx paramEyelxdzx);
  
  void deleteEyelxdzx(Eyelxdzx paramEyelxdzx);
}
