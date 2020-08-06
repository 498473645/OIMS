package cn.com.oims.dao.jdbc;

import cn.com.oims.dao.pojo.HistoryBaogaoRelation;
import java.util.List;
import java.util.Map;

public interface IHistoryInspectResultDao {
  void getJCXMStateByBingLiHao(Map<String, Object> paramMap, String paramString);
  
  List<Map<String, Object>> getJCJGByBingLiHao(String paramString, HistoryBaogaoRelation paramHistoryBaogaoRelation);
  
  List<Map<String, Object>> getJCJGByBingLiHaoAndDate(String paramString1, String paramString2, HistoryBaogaoRelation paramHistoryBaogaoRelation);
}
