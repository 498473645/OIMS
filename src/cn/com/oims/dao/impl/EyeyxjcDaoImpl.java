package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeyxjcDao;
import cn.com.oims.dao.pojo.Eyeyxjc;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeyxjcDaoImpl extends BaseDaoImpl implements IEyeyxjcDao {
  public void updateEyeyxjc(Eyeyxjc eyeyxjc) {
    this.hibernateTemplate.update(eyeyxjc);
  }
  
  public Serializable saveEyeyxjc(Eyeyxjc eyeyxjc) {
    return this.hibernateTemplate.save(eyeyxjc);
  }
  
  public Eyeyxjc selectEyeyxjcByEyeyxjc(Eyeyxjc eyeyxjc) {
    List<Eyeyxjc> eyexjcs = this.hibernateTemplate.findByExample(eyeyxjc);
    if (eyexjcs.size() >= 1)
      return eyexjcs.get(0); 
    return null;
  }
  
  public void deleteEyeyxjc(Eyeyxjc eyeyxjc) {
    this.hibernateTemplate.delete(eyeyxjc);
  }
}
