package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeydzx;
import org.springframework.stereotype.Component;

@Component
public interface IEyeydzxDao extends BaseDao {
  void updateEyeydzx(Eyeydzx paramEyeydzx);
  
  void saveEyeydzx(Eyeydzx paramEyeydzx);
  
  Eyeydzx selectEyeydzxByEyeydzx(Eyeydzx paramEyeydzx);
  
  void deleteEyeydzx(Eyeydzx paramEyeydzx);
}
