package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyebdxDao;
import cn.com.oims.dao.pojo.Eyebdx;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyebdxDaoImpl extends BaseDaoImpl implements IEyebdxDao {
  public void updateEyebdx(Eyebdx eyebdx) {
    this.hibernateTemplate.update(eyebdx);
  }
  
  public Serializable saveEyebdx(Eyebdx eyebdx) {
    return this.hibernateTemplate.save(eyebdx);
  }
  
  public Eyebdx selectEyebdxByEyebdx(Eyebdx eyebdx) {
    Eyebdx eyebdxSelect = null;
    List<Eyebdx> list = this.hibernateTemplate.findByExample(eyebdx);
    if (list.size() >= 1)
      eyebdxSelect = list.get(0); 
    return eyebdxSelect;
  }
  
  public void deleteEyebdx(Eyebdx eyebdx) {
    this.hibernateTemplate.delete(eyebdx);
  }
}
