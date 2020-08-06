package cn.com.oims.dao;

import cn.com.oims.dao.pojo.HistoryBaogaoRelation;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IHistoryBaogaoRelationDao {
  List<Map<String, Object>> getAllJCXM();
  
  HistoryBaogaoRelation getHistoryBaogaoRelationByid(int paramInt);
  
  List<HistoryBaogaoRelation> getHistoryBaogaoRelationByJCXM(String paramString);
}
