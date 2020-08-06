package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyexsjcDao;
import cn.com.oims.dao.pojo.Eyexsjc;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyexsjcDaoImpl extends BaseDaoImpl implements IEyexsjcDao {
  public void updateEyexsjc(Eyexsjc eyexsjc) {
    this.hibernateTemplate.update(eyexsjc);
  }
  
  public Serializable saveEyexsjc(Eyexsjc eyexsjc) {
    return this.hibernateTemplate.save(eyexsjc);
  }
  
  public Eyexsjc selectEyexsjcByEyexsjc(Eyexsjc eyexsjc) {
    Eyexsjc eyexsjcSelect = null;
    List<Eyexsjc> list = this.hibernateTemplate.findByExample(eyexsjc);
    if (list.size() >= 1)
      eyexsjcSelect = list.get(0); 
    return eyexsjcSelect;
  }
  
  public void deleteEyexsjc(Eyexsjc eyexsjc) {
    this.hibernateTemplate.delete(eyexsjc);
  }
}
