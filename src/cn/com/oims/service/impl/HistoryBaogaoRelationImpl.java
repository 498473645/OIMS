package cn.com.oims.service.impl;

import cn.com.oims.dao.IHistoryBaogaoRelationDao;
import cn.com.oims.dao.jdbc.IHistoryInspectResultDao;
import cn.com.oims.dao.pojo.HistoryBaogaoRelation;
import cn.com.oims.service.IHistoryBaogaoRelationService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryBaogaoRelationImpl implements IHistoryBaogaoRelationService {
  @Autowired
  private IHistoryBaogaoRelationDao baogaoRelationDao;
  
  @Autowired
  private IHistoryInspectResultDao historyInspectResultDao;
  
  public List<Map<String, Object>> getAllJCXM() {
    return this.baogaoRelationDao.getAllJCXM();
  }
  
  public List<Map<String, Object>> getJCXMStateByBingLiHao(String binglihao) {
    List<Map<String, Object>> list = this.baogaoRelationDao.getAllJCXM();
    for (Map<String, Object> map : list)
      this.historyInspectResultDao.getJCXMStateByBingLiHao(map, binglihao); 
    return list;
  }
  
  public Map<String, Object> getJCJGByBingLiHao(String binglihao, int jcxmId) {
    Map<String, Object> map = new HashMap<>();
    HistoryBaogaoRelation historyBaogaoRelation = this.baogaoRelationDao.getHistoryBaogaoRelationByid(jcxmId);
    map.put("hbr", historyBaogaoRelation);
    List<Map<String, Object>> list = this.historyInspectResultDao.getJCJGByBingLiHao(binglihao, historyBaogaoRelation);
    map.put("list", list);
    return map;
  }
  
  public Map<String, Object> getJCJGByBingLiHaoAndDate(String binglihao, String date, int jcxmId) {
    Map<String, Object> map = new HashMap<>();
    HistoryBaogaoRelation historyBaogaoRelation = this.baogaoRelationDao.getHistoryBaogaoRelationByid(jcxmId);
    map.put("hbr", historyBaogaoRelation);
    List<Map<String, Object>> list = this.historyInspectResultDao.getJCJGByBingLiHaoAndDate(binglihao, date, historyBaogaoRelation);
    map.put("list", list);
    return map;
  }
  
  public HistoryBaogaoRelation getHistoryBaogaoRelationByJCXM(String jcxm) {
    List<HistoryBaogaoRelation> list = this.baogaoRelationDao.getHistoryBaogaoRelationByJCXM(jcxm);
    return (list.size() > 0) ? list.get(0) : null;
  }
}
