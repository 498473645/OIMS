package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyejgzlDao;
import cn.com.oims.dao.pojo.Eyejgzl;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class EyejgzlDaoImpl extends BaseDaoImpl implements IEyejgzlDao {
  public void updateEyejgzl(Eyejgzl eyejgzl) {
    this.hibernateTemplate.update(eyejgzl);
  }
  
  public Serializable saveEyejgzl(Eyejgzl eyejgzl) {
    return this.hibernateTemplate.save(eyejgzl);
  }
  
  public Eyejgzl selectEyejgzlByEyejgzl(Eyejgzl eyejgzl) {
    Eyejgzl eyejgzlSelect = null;
    List<Eyejgzl> list = this.hibernateTemplate.findByExample(eyejgzl);
    if (list.size() >= 1)
      eyejgzlSelect = list.get(0); 
    return eyejgzlSelect;
  }
  
  public void deleteEyejgzl(Eyejgzl eyejgzl) {
    this.hibernateTemplate.delete(eyejgzl);
  }
  
  public List getTreatResult(String patientId) {
    String hql = "select new map(e.result as result,e.type as type,e.cliDate as cliDate) from HuanZheXinXi h,Jcd j,Eyejgzl e where h.id=j.huanzheId and j.id=e.jcdId and h.binglihao='" + patientId + "' order by e.cliDate";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
}
