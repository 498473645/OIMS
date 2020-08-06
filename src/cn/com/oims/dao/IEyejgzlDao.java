package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyejgzl;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IEyejgzlDao extends BaseDao {
  void updateEyejgzl(Eyejgzl paramEyejgzl);
  
  Serializable saveEyejgzl(Eyejgzl paramEyejgzl);
  
  Eyejgzl selectEyejgzlByEyejgzl(Eyejgzl paramEyejgzl);
  
  void deleteEyejgzl(Eyejgzl paramEyejgzl);
  
  List getTreatResult(String paramString);
}
