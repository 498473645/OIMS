package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyeldcx;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IEyeldcxDao extends BaseDao {
  void updateEyeldcx(Eyeldcx paramEyeldcx);
  
  Serializable saveEyeldcx(Eyeldcx paramEyeldcx);
  
  Eyeldcx selectEyeldcxByEyeldcx(Eyeldcx paramEyeldcx);
  
  void deleteEyeldcx(Eyeldcx paramEyeldcx);
  
  List getTreatResult(String paramString);
}
