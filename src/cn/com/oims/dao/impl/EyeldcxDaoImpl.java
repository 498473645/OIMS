package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeldcxDao;
import cn.com.oims.dao.pojo.Eyeldcx;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class EyeldcxDaoImpl extends BaseDaoImpl implements IEyeldcxDao {
  public void updateEyeldcx(Eyeldcx eyeldcx) {
    this.hibernateTemplate.update(eyeldcx);
  }
  
  public Serializable saveEyeldcx(Eyeldcx eyeldcx) {
    return this.hibernateTemplate.save(eyeldcx);
  }
  
  public Eyeldcx selectEyeldcxByEyeldcx(Eyeldcx eyeldcx) {
    Eyeldcx eyeldcxSelect = null;
    List<Eyeldcx> list = this.hibernateTemplate.findByExample(eyeldcx);
    if (list.size() >= 1)
      eyeldcxSelect = list.get(0); 
    return eyeldcxSelect;
  }
  
  public void deleteEyeldcx(Eyeldcx eyeldcx) {
    this.hibernateTemplate.delete(eyeldcx);
  }
  
  public List getTreatResult(String patientId) {
    String hql = "select new map(e.demo as demo,e.cli_date as cli_date) from HuanZheXinXi hzxx,Eyeldcx e where e.huanzhexinxi_id=hzxx.id and hzxx.binglihao='" + patientId + "' order by e.cli_date";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
}
