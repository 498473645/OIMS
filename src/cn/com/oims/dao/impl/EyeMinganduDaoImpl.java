package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeminganduDao;
import cn.com.oims.dao.pojo.EyeMingandu;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeMinganduDaoImpl extends BaseDaoImpl implements IEyeminganduDao {
  public void updateEyemingandu(EyeMingandu eyemgd) {
    this.hibernateTemplate.update(eyemgd);
  }
  
  public Serializable saveEyemingandu(EyeMingandu eyemgd) {
    return this.hibernateTemplate.save(eyemgd);
  }
  
  public EyeMingandu selectEyemgdByEyemgd(EyeMingandu eyemgd) {
    EyeMingandu eyeMGDSelect = null;
    List<EyeMingandu> list = this.hibernateTemplate.findByExample(eyemgd);
    if (list.size() >= 1)
      eyeMGDSelect = list.get(0); 
    return eyeMGDSelect;
  }
  
  public void deleteEyemgd(EyeMingandu eyemgd) {
    this.hibernateTemplate.delete(eyemgd);
  }
}
