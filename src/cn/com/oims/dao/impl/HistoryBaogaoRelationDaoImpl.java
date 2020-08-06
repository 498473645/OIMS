package cn.com.oims.dao.impl;

import cn.com.oims.dao.IHistoryBaogaoRelationDao;
import cn.com.oims.dao.pojo.HistoryBaogaoRelation;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class HistoryBaogaoRelationDaoImpl extends BaseDaoImpl implements IHistoryBaogaoRelationDao {
  public List<Map<String, Object>> getAllJCXM() {
    String sql = "select new  map(id as id,tableName as tableName,jcxmName as jcxmName,patientId as patientId, tableDate as tableDate,url as url) from HistoryBaogaoRelation";
    List<Map<String, Object>> list = this.hibernateTemplate.find(sql);
    return list;
  }
  
  public HistoryBaogaoRelation getHistoryBaogaoRelationByid(int id) {
    return (HistoryBaogaoRelation)this.hibernateTemplate.get(HistoryBaogaoRelation.class, Integer.valueOf(id));
  }
  
  public List<HistoryBaogaoRelation> getHistoryBaogaoRelationByJCXM(String jcxmId) {
    String sql = "from HistoryBaogaoRelation where jcxmIds like '%," + jcxmId + "' " + 
      "or jcxmIds like '%," + jcxmId + ",%' " + "or jcxmIds like '" + 
      jcxmId + ",%' " + "or jcxmIds like '" + jcxmId + "' ";
    System.out.println(sql);
    return this.hibernateTemplate.find(sql);
  }
}
