package cn.com.oims.service;

import cn.com.oims.dao.pojo.HistoryBaogaoRelation;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IHistoryBaogaoRelationService {
  List<Map<String, Object>> getAllJCXM();
  
  List<Map<String, Object>> getJCXMStateByBingLiHao(String paramString);
  
  Map<String, Object> getJCJGByBingLiHao(String paramString, int paramInt);
  
  Map<String, Object> getJCJGByBingLiHaoAndDate(String paramString1, String paramString2, int paramInt);
  
  HistoryBaogaoRelation getHistoryBaogaoRelationByJCXM(String paramString);
}
