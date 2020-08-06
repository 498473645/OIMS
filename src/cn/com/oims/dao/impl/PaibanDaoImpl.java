package cn.com.oims.dao.impl;

import cn.com.oims.dao.IPaibanDao;
import cn.com.oims.dao.pojo.Paiban;
import com.codesnet.common.MultiUtils;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class PaibanDaoImpl extends BaseDaoImpl implements IPaibanDao {
  @Override
  public List<Paiban> findPaibanValues(Date startDate, Date endDate, Integer category, Integer officeId, Integer child) {
    startDate = MultiUtils.getStartTimeOfDay(startDate);
    endDate = MultiUtils.getEndTimeOfDay(endDate);
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = "from Paiban where onDutyDate between :startDate and :endDate and category=:category and officeId=:officeId";
    if (child == null) {
      hql = String.valueOf(hql) + " and child is null";
    } else {
      hql = String.valueOf(hql) + " and child=:child";
      map.put("child", child);
    } 
    map.put("startDate", startDate);
    map.put("endDate", endDate);
    map.put("category", category);
    map.put("officeId", officeId);
    return findList(hql, map);
  }
  
  @Override
  public Long savePaiban(Paiban paiban) {
    return (Long)this.hibernateTemplate.save(paiban);
  }
  
  @Override
  public void deletePaiban(Long id) {
    this.hibernateTemplate.delete(this.hibernateTemplate.get(Paiban.class, id));
  }
  
  @Override
  public boolean paibanExist(Paiban p) {
    return (this.hibernateTemplate.findByExample("cn.com.oims.dao.pojo.Paiban", p).size() > 0);
  }
}
